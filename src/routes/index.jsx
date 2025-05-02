import { createFileRoute } from "@tanstack/react-router"
import tanStackLogo from '/public/10stack.png';

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<section>
			<h1>Welcome</h1>
			<article>
				<p>The purpose of this app is to demonstrate the use of <strong>TanStack Router</strong>, <strong>TanStack
					Query</strong>, <strong>TanStack Virtual</strong>, <strong>Headless UI</strong> component library,
					and <strong>Tailwind CSS</strong>.</p>
				<p>Use navigation on top of the page to see little demos of TanStack functionality in action.</p>
				<img src={tanStackLogo} alt="TanStack Logo"/>
			</article>
		</section>)
}