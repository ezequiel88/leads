import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/header'
import DashboardCards from '@/components/dashboard-cards'
import DashboardTables from '@/components/dashboard-tables'
import { LeadsProvider } from '@/contexts/LeadsContext'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <LeadsProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <DashboardCards />
          <DashboardTables />
        </main>
      </div>
    </LeadsProvider>
  )
}