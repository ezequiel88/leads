import { motion } from 'framer-motion';
import { Users, Mail, Building2, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/components/ui/pagination';
import { cn, getStatusColor, getScoreColor } from '@/lib/utils';
import type { Lead, PaginationState } from '@/types';
import { getSourceIcon } from './dashboard-tables';

interface LeadsTableProps {
    leads: Lead[];
    selectedLead: Lead | null;
    onLeadSelect: (lead: Lead) => void;
    pagination: PaginationState;
    onPaginationChange: (pagination: PaginationState) => void;
    isLoading?: boolean;
}

export default function LeadsTable({
    leads,
    selectedLead,
    onLeadSelect,
    pagination,
    onPaginationChange,
    isLoading = false
}: LeadsTableProps) {

    // Calcular dados paginados
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedLeads = leads.slice(startIndex, endIndex);
    const totalPages = Math.ceil(leads.length / pagination.pageSize);

    const handlePageChange = (page: number) => {
        onPaginationChange({
            ...pagination,
            currentPage: page
        });
    };

    const handlePageSizeChange = (pageSize: number) => {
        onPaginationChange({
            ...pagination,
            pageSize,
            currentPage: 1
        });
    };

    if (isLoading) {
        return (
            <div className="rounded-lg border bg-card shadow-soft">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Lead</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Fonte</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><div className="h-4 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-4 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-4 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-4 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-4 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-6 bg-muted animate-pulse rounded-full"></div></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (leads.length === 0) {
        return (
            <div className="rounded-lg border bg-card shadow-soft">
                <div className="flex flex-col items-center justify-center py-16 px-6">
                    <div className="rounded-full bg-muted/20 p-4 mb-4">
                        <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Nenhum lead encontrado</h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                        Não foram encontrados leads que correspondam aos filtros aplicados.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border bg-card shadow-soft">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-6 py-4">Lead</TableHead>
                        <TableHead className="px-6 py-4">Empresa</TableHead>
                        <TableHead className="px-6 py-4">Email</TableHead>
                        <TableHead className="px-6 py-4">Fonte</TableHead>
                        <TableHead className="px-6 py-4">Score</TableHead>
                        <TableHead className="px-6 py-4">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedLeads.map((lead, index) => (
                        <motion.tr
                            key={lead.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: Math.min(index * 0.02, 0.3),
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className={cn(
                                'cursor-pointer hover:bg-muted/50 transition-colors',
                                selectedLead?.id === lead.id && 'bg-accent/50'
                            )}
                            onClick={() => onLeadSelect(lead)}
                        >
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(lead.status)}`}>
                                        <span className="text-sm font-medium">
                                            {lead.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-foreground">{lead.name}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <Building2 className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{lead.company}</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{lead.email}</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    {getSourceIcon(lead.source)}
                                    <span className="text-sm text-foreground">{lead.source}</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <Trophy className="w-4 h-4 text-muted-foreground" />
                                    <span className={cn('text-sm font-medium', getScoreColor(lead.score))}>
                                        {lead.score}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <Badge className={cn('border', getStatusColor(lead.status))}>
                                    {lead.status}
                                </Badge>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>

            <Pagination
                currentPage={pagination.currentPage}
                totalPages={totalPages}
                pageSize={pagination.pageSize}
                totalItems={leads.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    );
}