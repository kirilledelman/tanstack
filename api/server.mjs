import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import fs from "fs";
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const PORT = 10001;

app.use(cors()); // enable CORS
app.use(express.json()); // parse JSON encoded payloads
app.use(express.urlencoded({ extended: true })); // parse URL encoded payloads
app.use(function(req, res, next) {
	res.setHeader('pid', process.pid); next();
});

// connect to Mongo database hosted on free tier at https://cloud.mongodb.com/
const mdbc = new MongoClient("mongodb+srv://testuser:Z7H5xEDj57HbXLPR@testcluster.ad3m8om.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster");
mdbc.connect().then(() => { console.log('Connected to MongoDB'); }); // connect to sample database

// artificial delay
function delay(time=1000) {
	return new Promise(resolve => setTimeout(resolve, time));
}

// returns a post from Mongo db
app.get('/post/:postId', async (req, res) => {
	await delay(); // delay to see effects
	const postId = new ObjectId(req.params.postId);
	const result = await mdbc.db("10stack").collection("posts").findOne({ _id: postId });
	if (result) res.json(result);
	else res.status(404).json({ error: 'post not found', id: postId });
});

// returns 5 recent posts per page, sorted by created date
app.get('/posts/:page', async (req, res) => {
	const limit = 5, skip = (parseInt(req.params.page) || 0) * limit;
	const collection = mdbc.db("10stack").collection("posts");
	const total = await collection.countDocuments();
	const cursor = await collection.find().sort({ created: -1 }).skip(skip).limit(limit);
	const results = await cursor.toArray();
	if (results) res.json({posts:results, pages:Math.ceil(total / limit)});
	else res.status(404).json({ error: 'nothing found' });
});

app.patch('/post', async (req, res) => {
	if (!req.body || !req.body._id) {
		res.status(400).json({error: "Bad request"});
	} else {
		// prepare post
		let post = req.body;
		const postId = new ObjectId(post._id);
		delete post['_id'];
		// delay to see effects
		await delay(1000);
		// reject if post includes the word "goat"
		if (post.title.match(/\bgoat\b/ig) || post.body.match(/\bgoat\b/ig)) {
			return res.status(403).json({error: "Forbidden animal detected"});
		}
		// update
		const result = await mdbc.db("10stack").collection("posts").updateOne({_id: postId}, {$set: req.body});
		// done
		if (result) return res.json({result, obj: req.body});
		res.status(404).json({error: 'post not found', obj: req.body});
	}
});

// used in TanStack Virtual example to display infinite loading
app.get('/virtual/:page',  async (req, res) => {
	// delay to see effects
	await delay(1000);
	// generate 30 rows per page, up to 10 pages
	const page = parseInt(req.params.page),
		perPage = 30, maxPages = 10,
		startIndex = page * perPage;
	const arr = page < maxPages ? new Array(perPage).fill(0).map((_, index) => { return {
		id: (startIndex + index),
		value: `This is a row with index ${startIndex + index}.`
	}}) : [];
	res.json({rows: arr, hasMore: (page < maxPages - 1)} );
});



/* ==================================================================================================== */

// on dev environment we're running on http
if ( process.env.NODE_ENV === 'dev' ) {
	http.createServer(app).listen(PORT, ()=>{
		console.log(`Server running on http://localhost:${PORT}`);
	});
// in production - use https
} else {
	const options = {
		key: fs.readFileSync('/etc/pki/tls/private/gogoat.key'),
		cert: fs.readFileSync('/etc/pki/tls/certs/gogoat.crt')
	};
	https.createServer(options, app).listen(PORT, ()=>{
		console.log(`Server running on https://localhost:${PORT}`);
	});
}
process.title = "NodeJS Server";
console.log(`To terminate, call \x1b[1;31mkill -9 ${process.pid}\x1b[0m`);
