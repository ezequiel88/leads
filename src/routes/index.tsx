import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { LazyDashboardTables } from '@/components/LazyComponents'

export const Route = createFileRoute('/')({ 
  component: () => (
    <div className="container mx-auto p-6">
      <Suspense fallback={<div>Carregando...</div>}>
        <LazyDashboardTables />
      </Suspense>
    </div>
  ),
})