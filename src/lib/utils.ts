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

// Updated status colors for new values
export const getStatusColor = (status: Lead['status']) => {
  const colors = {
    'New': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    'Contacted': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    'Qualified': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    'Disqualified': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
  };
  return colors[status];
};

// Updated source icons
export const getSourceIcon = (source: Lead['source']) => {
  const icons = {
    'Web': 'Globe',
    'Referral': 'Users', 
    'Event': 'Building2'
  };
  return icons[source];
};

// Conditional colors for scores
export const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600 dark:text-green-400';
  if (score >= 75) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-gray-500 dark:text-gray-400';
};

// Conditional colors for opportunity stages
export const getStageColor = (stage: Opportunity['stage']) => {
  const colors = {
    'Qualification': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    'Proposal': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
    'Negotiation': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    'Closed': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    'Lost': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
  };
  return colors[stage];
};
