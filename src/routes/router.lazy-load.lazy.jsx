import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/router/lazy-load')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<>
    <p>This route was code-split from the rest, and loaded on demand.</p>
  </>);
}
