import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { Target, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import type { Lead, Opportunity, TableFilters, PaginationState } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import SearchAndFilters from "./search-filters";
import LeadsTable from "./leads-table";
import OpportunitiesTable from "./oportunities-table";
import LeadDetailPanel from "./lead-detail";
import { useLeads } from "@/contexts/LeadsContext";

export default function DashboardTables() {
    const { leads, opportunities, isLoading, updateLead, convertLeadToOpportunity } = useLeads();
    const [activeTab, setActiveTab] = useState('leads');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

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

    // Filter and sort leads
    const filteredLeads = useMemo(() => {
        let filtered = [...leads];

        // Search filter - name, email and company
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

    const handleLeadSelect = (lead: Lead) => {
        setSelectedLead(lead);
        setIsPanelOpen(true);
    };

    const handleCloseDetail = () => {
        setSelectedLead(null);
        setIsPanelOpen(false);
    }

    const handleLeadSave = (lead: Lead) => {
        updateLead(lead);
    };

    const handleConvertToOpportunity = (opportunity: Opportunity) => {
        if (selectedLead) {
            convertLeadToOpportunity(selectedLead.id, opportunity);
            updateLead({ ...selectedLead, status: 'Qualified' as Lead['status'] });
        }
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full max-w-md grid-cols-2 h-10">
                        <TabsTrigger value="leads" className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Leads</span>
                        </TabsTrigger>
                        <TabsTrigger value="opportunities" className="flex items-center space-x-2">
                            <Target className="w-4 h-4" />
                            <span>Oportunities</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="leads" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Leads</h3>
                                <p className="text-muted-foreground">
                                    {filteredLeads.length} leads • {leads.filter(lead => lead.status === 'Qualified').length} qualified
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
                                <h3 className="text-lg font-semibold">Opportunities</h3>
                                <p className="text-muted-foreground">
                                    {opportunities.length} opportunities • {formatCurrency(opportunities.reduce((acc, opp) => acc + (opp.amount || 0), 0))} total
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

            {selectedLead && isPanelOpen && <LeadDetailPanel
                lead={selectedLead}
                isOpen={isPanelOpen}
                onClose={handleCloseDetail}
                onSave={handleLeadSave}
                onConvertToOpportunity={handleConvertToOpportunity}
            />}
        </div>
    );
}