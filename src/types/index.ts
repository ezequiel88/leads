export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: 'Web' | 'Indicação' | 'Feira';
  score: number;
  status: 'Novo' | 'Em contato' | 'Qualificado' | 'Desqualificado';
}

export interface Opportunity {
  id: number;
  name: string;
  stage: 'Qualificação' | 'Proposta' | 'Negociação' | 'Fechado' | 'Perdido';
  amount: number;
  accountName: string;
}

export type SortOrder = 'asc' | 'desc';

export interface TableFilters {
  search: string;
  status: string;
  sortBy: 'score' | 'name' | 'company';
  sortOrder: SortOrder;
}