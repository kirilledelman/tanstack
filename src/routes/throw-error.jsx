import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/throw-error')({
  component: RouteComponent,
})

function RouteComponent() {
	throw new Error('Simulated error thrown in component');
}
