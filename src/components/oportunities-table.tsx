import { motion } from 'framer-motion';
import { DollarSign, Building2, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/components/ui/pagination';
import { cn, formatCurrency, getStageColor } from '@/lib/utils';
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
                            <TableHead>Opportunity</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(3)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><div className="h-10 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-10 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-10 bg-muted animate-pulse rounded"></div></TableCell>
                                <TableCell><div className="h-10 bg-muted animate-pulse rounded"></div></TableCell>
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
                    <h3 className="text-lg font-medium text-foreground mb-2">No opportunities found</h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                        Create a new opportunity to start tracking your business.
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
                        <TableHead className="px-6 py-4">Opportunity</TableHead>
                        <TableHead className="px-6 py-4">Account</TableHead>
                        <TableHead className="px-6 py-4">Stage</TableHead>
                        <TableHead className="px-6 py-4">Value</TableHead>
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
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStageColor(opportunity.stage)}`}>
                                        <span className="text-sm font-medium">
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
                                        {formatCurrency(opportunity.amount || 0)}

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