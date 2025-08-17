import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardCards from '@/components/dashboard-cards';

// Mock do framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}));

// Mock do contexto
vi.mock('@/contexts/LeadsContext', () => ({
  useLeads: () => ({
    stats: {
      totalLeads: 10,
      qualifiedLeads: 5,
      totalOpportunities: 3,
      totalOpportunityValue: 150000,
      conversionRate: 50,
      averageLeadScore: 78
    }
  })
}));

// Mock dos ícones do Lucide
vi.mock('lucide-react', () => ({
  Target: () => <div data-testid="target-icon" />,
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  Users: () => <div data-testid="users-icon" />,
}));

describe('DashboardCards', () => {
  it('deve renderizar todos os cards de estatísticas', () => {
    render(<DashboardCards />);

    expect(screen.getByText('Total Leads')).toBeInTheDocument();
    expect(screen.getByText('Opportunities')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('Average Score')).toBeInTheDocument();
  });

  it('deve exibir os valores corretos das estatísticas', () => {
    render(<DashboardCards />);

    expect(screen.getByText('10')).toBeInTheDocument(); // Total Leads
    expect(screen.getByText('3')).toBeInTheDocument(); // Total Opportunities
    expect(screen.getByText('50%')).toBeInTheDocument(); // Conversion Rate
    expect(screen.getByText('78')).toBeInTheDocument(); // Average Score
  });

  it('deve exibir descrições corretas', () => {
    render(<DashboardCards />);

    expect(screen.getByText('5 qualified')).toBeInTheDocument();
    expect(screen.getByText('$150,000 in pipeline')).toBeInTheDocument();
    expect(screen.getByText('Leads to qualified')).toBeInTheDocument();
    expect(screen.getByText('Lead quality')).toBeInTheDocument();
  });
});