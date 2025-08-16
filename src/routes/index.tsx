import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/header'
import DashboardCards from '@/components/dashboard-cards'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DashboardCards />
      </main>
    </div>
  )
}
