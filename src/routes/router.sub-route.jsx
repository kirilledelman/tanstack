import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/router/sub-route')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useSearch();
  return (<>
    <p>Hello from Sub-Route! <strong>TanStack Router</strong> makes it easy to display paths as pages or inside nested layouts.
      This page for example is displayed inside nested layout of <em>router.jsx</em></p>
    { Object.keys(params).length > 0 &&
        (<p className="mt-2 pt-2 border-t border-gray-600">Search parameters passed to this page were <strong>{JSON.stringify(params)}</strong></p>)}
  </>)
}
