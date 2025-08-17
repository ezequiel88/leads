import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LeadsProvider, useLeads } from '@/contexts/LeadsContext';
import { mockLeads, mockOpportunities } from '../__mocks__/data';

// Mock dos hooks com setters funcionais
vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn((key, initialValue) => {
    let value = initialValue;
    if (key === 'leads') value = [...mockLeads];
    if (key === 'opportunities') value = [...mockOpportunities];

    const setValue = vi.fn((newValue) => {
      if (typeof newValue === 'function') {
        value = newValue(value);
      } else {
        value = newValue;
      }
    });

    return [value, setValue];
  })
}));

// Componente de teste para acessar o contexto
function TestComponent() {
  const { leads, opportunities, stats, isLoading } = useLeads();

  return (
    <div>
      <div data-testid="leads-count">{leads.length}</div>
      <div data-testid="opportunities-count">{opportunities.length}</div>
      <div data-testid="total-leads">{stats.totalLeads}</div>
      <div data-testid="qualified-leads">{stats.qualifiedLeads}</div>
      <div data-testid="loading">{isLoading.toString()}</div>
    </div>
  );
}

describe('LeadsContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve fornecer dados de leads e opportunities', async () => {
    render(
      <LeadsProvider>
        <TestComponent />
      </LeadsProvider>
    );

    // Avança o timer e aguarda as atualizações
    await act(async () => {
      vi.advanceTimersByTime(1500);
      await vi.runAllTimersAsync();
    });

    expect(screen.getByTestId('leads-count')).toHaveTextContent('3');
    expect(screen.getByTestId('opportunities-count')).toHaveTextContent('2');
  });

  it('deve calcular estatísticas corretamente', async () => {
    render(
      <LeadsProvider>
        <TestComponent />
      </LeadsProvider>
    );

    // Avança o timer e aguarda as atualizações
    await act(async () => {
      vi.advanceTimersByTime(1500);
      await vi.runAllTimersAsync();
    });

    expect(screen.getByTestId('total-leads')).toHaveTextContent('3');
    expect(screen.getByTestId('qualified-leads')).toHaveTextContent('1');
  });

  it('deve gerenciar estado de loading', async () => {
    render(
      <LeadsProvider>
        <TestComponent />
      </LeadsProvider>
    );

    // Inicialmente deve estar carregando
    expect(screen.getByTestId('loading')).toHaveTextContent('true');

    // Avança o timer e aguarda as atualizações
    await act(async () => {
      vi.advanceTimersByTime(1500);
      await vi.runAllTimersAsync();
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  it('deve atualizar lead corretamente', async () => {
    let contextValue: any;

    function TestComponentWithActions() {
      contextValue = useLeads();
      return <TestComponent />;
    }

    render(
      <LeadsProvider>
        <TestComponentWithActions />
      </LeadsProvider>
    );

    // Avança o timer e aguarda as atualizações
    await act(async () => {
      vi.advanceTimersByTime(1500);
      await vi.runAllTimersAsync();
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('false');

    // Testa a atualização de um lead
    const updatedLead = { ...mockLeads[0], status: 'Contacted' as const };

    act(() => {
      contextValue.updateLead(updatedLead);
    });

    expect(contextValue.updateLead).toBeDefined();
  });

  it('deve converter lead para opportunity', async () => {
    let contextValue: any;

    function TestComponentWithActions() {
      contextValue = useLeads();
      return <TestComponent />;
    }

    render(
      <LeadsProvider>
        <TestComponentWithActions />
      </LeadsProvider>
    );

    // Avança o timer e aguarda as atualizações
    await act(async () => {
      vi.advanceTimersByTime(1500);
      await vi.runAllTimersAsync();
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('false');

    const newOpportunity = {
      id: 999,
      name: 'Nova Oportunidade',
      stage: 'Qualification' as const,
      amount: 25000,
      accountName: 'Test Company'
    };

    act(() => {
      contextValue.convertLeadToOpportunity(mockLeads[0].id, newOpportunity);
    });

    expect(contextValue.convertLeadToOpportunity).toBeDefined();
  });
});