import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { Switch, Field, Label } from '@headlessui/react'
import { CircleStackIcon } from '@heroicons/react/24/solid'
import { AppContext } from "./AppContextProvider.jsx";

export default function Header() {
	const context = useContext(AppContext);

	return (<nav>
		<Link to="/" className="no-line"><CircleStackIcon className="w-8 h-8 min-w-8" /></Link>
		<Link to="/">Home</Link>
		<Link to="/router">Router</Link>
		<Link to="/query">Query</Link>
		<Link to="/virtual">Virtual</Link>

		<span className="flex-1/2"/>

		<Field className="switch-field">
			<Label>{context.theme}</Label>
			<Switch className="switch group"
				onChange={context.toggleTheme}
				checked={context.theme === 'light'}>
				<span/>
			</Switch>
		</Field>
	</nav>);
}