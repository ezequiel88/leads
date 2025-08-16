import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, ArrowRight, Mail, Building2, Trophy, Tag, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn, getStatusColor, getScoreColor } from '@/lib/utils';
import type { Lead, Opportunity } from '@/types';
import { toast } from 'sonner';

interface LeadDetailPanelProps {
    lead: Lead | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (lead: Lead) => void;
    onConvertToOpportunity: (opportunity: Opportunity) => void;
}

export default function LeadDetailPanel({
    lead,
    isOpen,
    onClose,
    onSave,
    onConvertToOpportunity
}: LeadDetailPanelProps) {

    const [editedLead, setEditedLead] = useState<Lead | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const [opportunityAmount, setOpportunityAmount] = useState<number>(0);
    const [opportunityStage, setOpportunityStage] = useState<Opportunity['stage']>('Qualificação');

    useEffect(() => {
        if (lead) {
            setEditedLead({ ...lead });
        }
    }, [lead]);

    const handleSave = async () => {
        if (!editedLead) return;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editedLead.email)) {
            toast('Email inválido', {
                description: 'Por favor, insira um email válido.'
            });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        onSave(editedLead);
        setIsLoading(false);

        toast('Lead atualizado', {
            description: 'As informações do lead foram salvas com sucesso.'
        });
    };

    const handleConvert = async () => {
        if (!editedLead) return;

        setIsConverting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newOpportunity: Opportunity = {
            id: Date.now(), // Simple ID generation for demo
            name: editedLead.name,
            stage: opportunityStage,
            amount: opportunityAmount,
            accountName: editedLead.company
        };

        onConvertToOpportunity(newOpportunity);
        setIsConverting(false);

        toast('Lead convertido', {
            description: `${editedLead.name} foi convertido em uma oportunidade.`
        });

        onClose();
    };

    // Remove as funções duplicadas:
    // const getStatusColor = (status: Lead['status']) => { ... };
    // const getScoreColor = (score: number) => { ... };

    return (
        <AnimatePresence>
            {isOpen && editedLead && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40"

                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l shadow-strong z-50 overflow-hidden"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b bg-muted/30">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(editedLead.status)}`}>
                                        <span className="text-sm font-medium">
                                            {editedLead.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">{editedLead.name}</h2>
                                        <p className="text-sm text-muted-foreground">{editedLead.company}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={onClose}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Lead Info */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-foreground">Informações do Lead</h3>
                                        <div className="flex items-center space-x-2">
                                            <Trophy className="w-4 h-4 text-muted-foreground" />
                                            <span className={cn('text-sm font-medium', getScoreColor(editedLead.score))}>
                                                Score: {editedLead.score}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor="source" className="text-sm text-muted-foreground">Fonte</Label>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm text-foreground">{editedLead.source}</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor="status" className="text-sm text-muted-foreground">Status</Label>
                                            <Badge className={cn('border mt-1', getStatusColor(editedLead.status))}>
                                                {editedLead.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <SelectSeparator className='my-4' />

                                {/* Editable Fields */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-foreground">Editar Informações</h3>

                                    <div className="space-y-3">
                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor="email">Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={editedLead.email}
                                                    onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                                                    className="pl-10"
                                                    placeholder="email@empresa.com"
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label htmlFor="status">Status</Label>
                                            <Select
                                                value={editedLead.status}
                                                onValueChange={(value: Lead['status']) =>
                                                    setEditedLead({ ...editedLead, status: value })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <div className="flex items-center space-x-2">
                                                        <Tag className="w-4 h-4 text-muted-foreground" />
                                                        <SelectValue />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Novo">Novo</SelectItem>
                                                    <SelectItem value="Em contato">Em contato</SelectItem>
                                                    <SelectItem value="Qualificado">Qualificado</SelectItem>
                                                    <SelectItem value="Desqualificado">Desqualificado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* Convert to Opportunity */}
                                {editedLead.status === 'Qualificado' && (
                                    <div className="space-y-4 pt-4 border-t">
                                        <h3 className="text-sm font-medium text-foreground">Converter para Oportunidade</h3>

                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="opportunity-stage">Estágio da Oportunidade</Label>
                                                <Select value={opportunityStage} onValueChange={(value: Opportunity['stage']) => setOpportunityStage(value)}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Qualificação">Qualificação</SelectItem>
                                                        <SelectItem value="Proposta">Proposta</SelectItem>
                                                        <SelectItem value="Negociação">Negociação</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label htmlFor="opportunity-amount">Valor Estimado (R$)</Label>
                                                <Input
                                                    id="opportunity-amount"
                                                    type="number"
                                                    value={opportunityAmount}
                                                    onChange={(e) => setOpportunityAmount(Number(e.target.value))}
                                                    placeholder="0"
                                                    min="0"
                                                />
                                            </div>

                                            <Button
                                                onClick={handleConvert}
                                                disabled={isConverting}
                                                className="w-full"
                                                variant="default"
                                            >
                                                {isConverting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        Convertendo...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ArrowRight className="w-4 h-4 mr-2" />
                                                        Converter Lead
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t bg-muted/30">
                                <div className="flex space-x-3">
                                    <Button variant="outline" onClick={onClose} className="flex-1">
                                        Cancelar
                                    </Button>
                                    <Button onClick={handleSave} disabled={isLoading} className="flex-1">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Salvando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                Salvar
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};