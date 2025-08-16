import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { AlertCircle, Building2, Plus, Target, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import type { Lead, Opportunity, TableFilters, PaginationState } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import leadsData from '@/@data/leads.json';
import opportunitiesData from '@/@data/oportunities.json';
import SearchAndFilters from "./search-filters";
import LeadsTable from "./leads-table";
import OpportunitiesTable from "./oportunities-table";
import LeadDetailPanel from "./lead-detail";
import { Button } from "./ui/button";

// Ícones condicionais para fontes de leads
export const getSourceIcon = (source: Lead['source']) => {
    const icons = {
        'Web': <AlertCircle className="w-4 h-4" />,
        'Indicação': <Users className="w-4 h-4" />,
        'Feira': <Building2 className="w-4 h-4" />
    };
    return icons[source];
};

export default function DashboardTables() {

    const [leads, setLeads] = useState<Lead[]>([]);
    const [opportunities, setOpportunities] = useLocalStorage<Opportunity[]>('opportunities', opportunitiesData as Opportunity[]);
    const [activeTab, setActiveTab] = useState('leads');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Estados de paginação
    const [leadsPagination, setLeadsPagination] = useState<PaginationState>({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
    });

    const [opportunitiesPagination, setOpportunitiesPagination] = useState<PaginationState>({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0
    });

    // Filters state with localStorage persistence
    const [filters, setFilters] = useLocalStorage<TableFilters>('table-filters', {
        search: '',
        status: '',
        sortBy: 'score',
        sortOrder: 'desc'
    });

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

    // Filter and sort leads
    const filteredLeads = useMemo(() => {
        let filtered = [...leads];

        // Search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(lead =>
                lead.name.toLowerCase().includes(searchTerm) ||
                lead.company.toLowerCase().includes(searchTerm) ||
                lead.email.toLowerCase().includes(searchTerm)
            );
        }

        // Status filter
        if (filters.status) {
            filtered = filtered.filter(lead => lead.status === filters.status);
        }

        // Sort
        filtered.sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;

            switch (filters.sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'company':
                    aValue = a.company.toLowerCase();
                    bValue = b.company.toLowerCase();
                    break;
                case 'score':
                default:
                    aValue = a.score;
                    bValue = b.score;
                    break;
            }

            if (filters.sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

        return filtered;
    }, [leads, filters]);

    // Atualizar total de itens quando os dados filtrados mudarem
    useEffect(() => {
        setLeadsPagination(prev => ({
            ...prev,
            totalItems: filteredLeads.length,
            currentPage: 1 // Reset para primeira página quando filtros mudarem
        }));
    }, [filteredLeads]);

    useEffect(() => {
        setOpportunitiesPagination(prev => ({
            ...prev,
            totalItems: opportunities.length,
            currentPage: 1
        }));
    }, [opportunities]);

    // Stats calculations
    const stats = useMemo(() => {
        const totalLeads = leads.length;
        const qualifiedLeads = leads.filter(lead => lead.status === 'Qualificado').length;
        const totalOpportunities = opportunities.length;
        const totalOpportunityValue = opportunities.reduce((sum, opp) => sum + opp.amount, 0);
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

    const handleLeadSelect = (lead: Lead) => {
        setSelectedLead(lead);
        setIsPanelOpen(true);
    };

    const handleLeadSave = (updatedLead: Lead) => {
        setLeads(prev => prev.map(lead =>
            lead.id === updatedLead.id ? updatedLead : lead
        ));
        setSelectedLead(updatedLead);
    };

    const handleConvertToOpportunity = (opportunity: Opportunity) => {
        setOpportunities(prev => [...prev, opportunity]);

        // Update lead status to indicate conversion
        if (selectedLead) {
            const updatedLead = { ...selectedLead, status: 'Qualificado' as Lead['status'] };
            setLeads(prev => prev.map(lead =>
                lead.id === updatedLead.id ? updatedLead : lead
            ));
        }
    };

    const handleNewLead = () => {
        setSelectedLead(null);
        setIsPanelOpen(true);
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <TabsList className="grid w-full max-w-md grid-cols-2 h-10">
                            <TabsTrigger value="leads" className="flex items-center space-x-2">
                                <Users className="w-4 h-4" />
                                <span>Leads</span>
                            </TabsTrigger>
                            <TabsTrigger value="opportunities" className="flex items-center space-x-2">
                                <Target className="w-4 h-4" />
                                <span>Oportunidades</span>
                            </TabsTrigger>
                        </TabsList>
                        
                        <Button className="w-full sm:w-auto gap-1 h-10" onClick={handleNewLead}>
                            <Plus className="w-4 h-4" />
                            <span className="inline">Novo Lead</span>
                        </Button>
                    </div>


                    <TabsContent value="leads" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Leads</h3>
                                <p className="text-muted-foreground">
                                    {filteredLeads.length} leads • {stats.qualifiedLeads} qualificados
                                </p>
                            </div>
                        </div>
                        <SearchAndFilters filters={filters} onFiltersChange={setFilters} leadCount={filteredLeads.length} />
                        <LeadsTable
                            leads={filteredLeads}
                            selectedLead={selectedLead}
                            onLeadSelect={handleLeadSelect}
                            pagination={leadsPagination}
                            onPaginationChange={setLeadsPagination}
                            isLoading={isLoading}
                        />
                    </TabsContent>

                    <TabsContent value="opportunities" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Pipeline de Oportunidades</h3>
                                <p className="text-muted-foreground">
                                    {opportunities.length} oportunidades • {formatCurrency(stats.totalOpportunityValue)} total
                                </p>
                            </div>
                        </div>
                        <OpportunitiesTable
                            opportunities={opportunities}
                            pagination={opportunitiesPagination}
                            onPaginationChange={setOpportunitiesPagination}
                            isLoading={isLoading}
                        />
                    </TabsContent>
                </Tabs>
            </motion.div>

            <LeadDetailPanel
                lead={selectedLead}
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                onSave={handleLeadSave}
                onConvertToOpportunity={handleConvertToOpportunity}
            />
        </div>
    );
}