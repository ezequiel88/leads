import { motion } from 'framer-motion';
import { DollarSign, Building2, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/components/ui/pagination';
import { cn, formatCurrency } from '@/lib/utils';
import type { Opportunity, PaginationState } from '@/types';

interface OpportunitiesTableProps {
    opportunities: Opportunity[];
    pagination: PaginationState;
    onPaginationChange: (pagination: PaginationState) => void;
    isLoading?: boolean;
}

export default function OpportunitiesTable({
    opportunities,
    pagination,
    onPaginationChange,
    isLoading = false
}: OpportunitiesTableProps) {

    const getStageColor = (stage: Opportunity['stage']) => {
        const colors = {
            'Qualificação': 'bg-primary/10 text-primary border-primary/20',
            'Proposta': 'bg-green-500/50 text-white border-green-500/20',
            'Negociação': 'bg-green/10 text-success border-green/20',
            'Fechado': 'bg-success/20 text-success border-success/30',
            'Perdido': 'bg-destructive/10 text-destructive border-destructive/20'
        };
        return colors[stage];
    };

    // Calcular dados paginados
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedOpportunities = opportunities.slice(startIndex, endIndex);
    const totalPages = Math.ceil(opportunities.length / pagination.pageSize);

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
                            <TableHead>Oportunidade</TableHead>
                            <TableHead>Conta</TableHead>
                            <TableHead>Estágio</TableHead>
                            <TableHead>Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(3)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><div className="h-4 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-4 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-6 bg-muted animate-pulse rounded-full"></div></TableCell>
                                <TableCell><div className="h-4 bg-muted animate-pulse rounded"></div></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (opportunities.length === 0) {
        return (
            <div className="rounded-lg border bg-card shadow-soft">
                <div className="flex flex-col items-center justify-center py-16 px-6">
                    <div className="rounded-full bg-muted/20 p-4 mb-4">
                        <Target className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Nenhuma oportunidade</h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                        Comece convertendo leads qualificados em oportunidades de negócio.
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
                        <TableHead className="px-6 py-4">Oportunidade</TableHead>
                        <TableHead className="px-6 py-4">Conta</TableHead>
                        <TableHead className="px-6 py-4">Estágio</TableHead>
                        <TableHead className="px-6 py-4">Valor</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedOpportunities.map((opportunity, index) => (
                        <motion.tr
                            key={opportunity.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: Math.min(index * 0.02, 0.2),
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className="hover:bg-muted/50 transition-colors"
                        >
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getStageColor(opportunity.stage)}`}>
                                        <span className="text-sm font-medium text-primary-foreground">
                                            {opportunity.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-foreground">{opportunity.name}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <Building2 className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{opportunity.accountName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <Badge className={cn('border', getStageColor(opportunity.stage))}>
                                    {opportunity.stage}
                                </Badge>
                            </TableCell>
                            <TableCell className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <DollarSign className="w-4 h-4 text-success" />
                                    <span className="text-sm font-medium text-success">
                                        {formatCurrency(opportunity.amount)}
                                    </span>
                                </div>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
            
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={totalPages}
                pageSize={pagination.pageSize}
                totalItems={opportunities.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    );
}