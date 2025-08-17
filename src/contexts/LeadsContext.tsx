import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lead, Opportunity } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import leadsData from '@/@data/leads.json';
import opportunitiesData from '@/@data/oportunities.json';

interface LeadsContextType {
    // Estado dos dados
    leads: Lead[];
    opportunities: Opportunity[];
    isLoading: boolean;

    // Estatísticas
    stats: {
        totalLeads: number;
        qualifiedLeads: number;
        totalOpportunities: number;
        totalOpportunityValue: number;
        averageLeadScore: number;
        conversionRate: number;
    };

    // Ações
    updateLead: (updatedLead: Lead) => void;
    convertLeadToOpportunity: (leadId: number, opportunity: Opportunity) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

type LeadsProviderProps = {
    children: ReactNode;
}

export function LeadsProvider({ children }: LeadsProviderProps) {
    const [leads, setLeads] = useLocalStorage<Lead[]>('leads', leadsData as Lead[]);
    const [opportunities, setOpportunities] = useLocalStorage<Opportunity[]>('opportunities', opportunitiesData as Opportunity[]);
    const [isLoading, setIsLoading] = useState(true);


    // Simulate initial data loading
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setLeads(leadsData as Lead[]);
            setIsLoading(false);
        };

        loadData();
    }, []);


    // Stats calculations
    const stats = useMemo(() => {
        const totalLeads = leads.length;
        const qualifiedLeads = leads.filter(lead => lead.status === 'Qualified').length;
        const totalOpportunities = opportunities.length;
        const totalOpportunityValue = opportunities.reduce((sum, opp) => (sum + (opp.amount || 0)), 0);
        const averageLeadScore = leads.length > 0
            ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length)
            : 0;

        return {
            totalLeads,
            qualifiedLeads,
            totalOpportunities,
            totalOpportunityValue,
            averageLeadScore,
            conversionRate: totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0
        };
    }, [leads, opportunities]);

    // Ações
    const updateLead = (updatedLead: Lead) => {
        setLeads(prev => prev.map(lead =>
            lead.id === updatedLead.id ? updatedLead : lead
        ));
    };

    const convertLeadToOpportunity = (leadId: number, opportunity: Opportunity) => {
        // Adicionar oportunidade
        setOpportunities(prev => [...prev, opportunity]);

        // Atualizar status do lead para Qualified
        setLeads(prev => prev.map(lead =>
            lead.id === leadId ? { ...lead, status: 'Qualified' as Lead['status'] } : lead
        ));
    };

    const value: LeadsContextType = {
        leads,
        opportunities,
        isLoading,
        stats,
        updateLead,
        convertLeadToOpportunity
    };

    return (
        <LeadsContext.Provider value={value}>
            {children}
        </LeadsContext.Provider>
    );
}

export function useLeads() {
    const context = useContext(LeadsContext);
    if (context === undefined) {
        throw new Error('useLeads must be used within a LeadsProvider');
    }
    return context;
}