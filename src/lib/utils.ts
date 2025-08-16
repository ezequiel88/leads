import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Lead, Opportunity } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Cores condicionais para status de leads
export const getStatusColor = (status: Lead['status']) => {
  const colors = {
    'Novo': 'bg-blue-500/10 text-white border-blue-500/20',
    'Em contato': 'bg-yellow-500/10 text-white border-yellow-500/20',
    'Qualificado': 'bg-green-500/10 text-white border-green-500/20',
    'Desqualificado': 'bg-red-500/10 text-white border-red-500/20'
  };
  return colors[status];
};

// Cores condicionais para scores
export const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-success';
  if (score >= 75) return 'text-warning';
  return 'text-muted-foreground';
};

// Cores condicionais para estágios de oportunidades
export const getStageColor = (stage: Opportunity['stage']) => {
  const colors = {
    'Qualificação': 'bg-blue-500/40 text-white border-blue-500/60',
    'Proposta': 'bg-green-500/50 text-white border-green-500/20',
    'Negociação': 'bg-gray-500/30 text-white border-gray-500/50',
    'Fechado': 'bg-foreground/40 text-background border-foreground/60',
    'Perdido': 'bg-destructive/10 text-destructive border-destructive/20'
  };
  return colors[stage];
};