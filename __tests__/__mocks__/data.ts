import type { Lead, Opportunity } from '@/types';

export const mockLeads: Lead[] = [
  {
    id: 1,
    name: 'João Silva',
    company: 'Tech Corp',
    email: 'joao@techcorp.com',
    source: 'Web',
    score: 85,
    status: 'New'
  },
  {
    id: 2,
    name: 'Maria Santos',
    company: 'Innovation Ltd',
    email: 'maria@innovation.com',
    source: 'Referral',
    score: 92,
    status: 'Qualified'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    company: 'StartupXYZ',
    email: 'pedro@startupxyz.com',
    source: 'Event',
    score: 67,
    status: 'Contacted'
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    name: 'Projeto Alpha',
    stage: 'Qualification',
    amount: 50000,
    accountName: 'Tech Corp'
  },
  {
    id: 2,
    name: 'Projeto Beta',
    stage: 'Proposal',
    amount: 75000,
    accountName: 'Innovation Ltd'
  }
];