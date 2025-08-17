import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

// Importações condicionais para devtools (apenas em desenvolvimento)
const TanStackRouterDevtoolsPanel = import.meta.env.DEV
  ? await import('@tanstack/react-router-devtools').then(d => d.TanStackRouterDevtoolsPanel)
  : () => null

const TanstackDevtools = import.meta.env.DEV
  ? await import('@tanstack/react-devtools').then(d => d.TanstackDevtools)
  : () => null

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mini Seller Console" },
    ]
  }),
  component: () => (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <Outlet />
      <Toaster
        position="top-center"
        duration={4000}
      />
      {import.meta.env.DEV && (
        <TanstackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      )}
    </ThemeProvider>
  ),
})
