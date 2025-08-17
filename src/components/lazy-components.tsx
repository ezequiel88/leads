import { lazy } from 'react';

export const LazyLeadsTable = lazy(() => import('./leads-table'));
export const LazyOpportunitiesTable = lazy(() => import('./oportunities-table'));
export const LazyDashboardTables = lazy(() => import('./dashboard-tables'));