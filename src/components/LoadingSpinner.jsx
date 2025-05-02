import { ClockIcon } from "@heroicons/react/24/outline/index.js";

export default function LoadingSpinner({text="Please wait...", className=''}) {
	return (<div className={`flex flex-row gap-2 ${className}`}><ClockIcon className="w-4 animate-spin"/> {text}</div>);
}