import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/header'
import { LeadsProvider } from '@/contexts/LeadsContext'
import { Suspense } from 'react'
import { LazyDashboardTables } from '@/components/lazy-components'
import DashboardCards from '@/components/dashboard-cards'
import { PageLoadingSpinner } from '@/components/loading-spinner'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <LeadsProvider>
      <Suspense fallback={<PageLoadingSpinner  />}>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <DashboardCards />
            <LazyDashboardTables />
          </main>
        </div>
      </Suspense>
    </LeadsProvider>
  )
}