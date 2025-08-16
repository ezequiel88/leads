import { motion } from 'framer-motion';
import { Users, Mail, Building2, Trophy, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Lead } from '@/types';

interface LeadsTableProps {
    leads: Lead[];
    selectedLead: Lead | null;
    onLeadSelect: (lead: Lead) => void;
    isLoading?: boolean;
}

export default function LeadsTable({
    leads,
    selectedLead,
    onLeadSelect,
    isLoading = false
}: LeadsTableProps) {

    const getStatusColor = (status: Lead['status']) => {
        const colors = {
            'Novo': 'bg-primary/10 text-primary border-primary/20',
            'Em contato': 'bg-warning/10 text-warning border-warning/20',
            'Qualificado': 'bg-success/10 text-success border-success/20',
            'Desqualificado': 'bg-destructive/10 text-destructive border-destructive/20'
        };
        return colors[status];
    };

    const getSourceIcon = (source: Lead['source']) => {
        const icons = {
            'Web': <AlertCircle className="w-4 h-4" />,
            'Indicação': <Users className="w-4 h-4" />,
            'Feira': <Building2 className="w-4 h-4" />
        };
        return icons[source];
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-success';
        if (score >= 75) return 'text-warning';
        return 'text-muted-foreground';
    };

    if (isLoading) {
        return (
            <div className="rounded-lg border bg-card shadow-soft">
                <div className="overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Lead</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Empresa</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Fonte</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Score</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <tr key={i} className="border-t">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-muted animate-pulse rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-muted animate-pulse rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-muted animate-pulse rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-muted animate-pulse rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-muted animate-pulse rounded"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-6 bg-muted animate-pulse rounded-full"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
        <div className="rounded-lg border bg-card shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Lead
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Empresa
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Fonte
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Score
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, index) => (
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
                                    'table-row-hover cursor-pointer border-t',
                                    selectedLead?.id === lead.id && 'bg-accent/50'
                                )}
                                onClick={() => onLeadSelect(lead)}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary-foreground">
                                                {lead.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-foreground">{lead.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-foreground">{lead.company}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{lead.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        {getSourceIcon(lead.source)}
                                        <span className="text-sm text-foreground">{lead.source}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Trophy className="w-4 h-4 text-muted-foreground" />
                                        <span className={cn('text-sm font-medium', getScoreColor(lead.score))}>
                                            {lead.score}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={cn('border', getStatusColor(lead.status))}>
                                        {lead.status}
                                    </Badge>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}