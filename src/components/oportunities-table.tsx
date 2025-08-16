import { motion } from 'framer-motion';
import { DollarSign, Building2, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Opportunity } from '@/types';

interface OpportunitiesTableProps {
    opportunities: Opportunity[];
    isLoading?: boolean;
}

export default function OpportunitiesTable({
    opportunities,
    isLoading = false
}: OpportunitiesTableProps) {

    const getStageColor = (stage: Opportunity['stage']) => {
        const colors = {
            'Qualificação': 'bg-primary/10 text-primary border-primary/20',
            'Proposta': 'bg-warning/10 text-warning border-warning/20',
            'Negociação': 'bg-success/10 text-success border-success/20',
            'Fechado': 'bg-success/20 text-success border-success/30',
            'Perdido': 'bg-destructive/10 text-destructive border-destructive/20'
        };
        return colors[stage];
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="rounded-lg border bg-card shadow-soft">
                <div className="overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Oportunidade</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Conta</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Estágio</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(3)].map((_, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-muted animate-pulse rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-muted animate-pulse rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-6 bg-muted animate-pulse rounded-full"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-muted animate-pulse rounded"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
        <div className="rounded-lg border bg-card shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Oportunidade
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Conta
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Estágio
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Valor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {opportunities.map((opportunity, index) => (
                            <motion.tr
                                key={opportunity.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.3,
                                    delay: Math.min(index * 0.02, 0.2),
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="table-row-hover border-t"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary-foreground">
                                                {opportunity.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-foreground">{opportunity.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-foreground">{opportunity.accountName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={cn('border', getStageColor(opportunity.stage))}>
                                        {opportunity.stage}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-4 h-4 text-success" />
                                        <span className="text-sm font-medium text-success">
                                            {formatCurrency(opportunity.amount)}
                                        </span>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}