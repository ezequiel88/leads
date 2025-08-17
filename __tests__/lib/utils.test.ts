import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, getStatusColor, getScoreColor, getStageColor } from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('deve combinar classes corretamente', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('deve lidar com classes condicionais', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional');
    });
  });

  describe('formatCurrency', () => {
    it('deve formatar valores monetários corretamente', () => {
      expect(formatCurrency(1000)).toBe('$1,000');
      expect(formatCurrency(50000)).toBe('$50,000');
      expect(formatCurrency(0)).toBe('$0');
    });
  });

  describe('getStatusColor', () => {
    it('deve retornar cores corretas para cada status', () => {
      expect(getStatusColor('New')).toContain('bg-blue-100');
      expect(getStatusColor('Contacted')).toContain('bg-yellow-100');
      expect(getStatusColor('Qualified')).toContain('bg-green-100');
      expect(getStatusColor('Disqualified')).toContain('bg-red-100');
    });
  });

  describe('getScoreColor', () => {
    it('deve retornar cores baseadas no score', () => {
      expect(getScoreColor(95)).toContain('text-green-600');
      expect(getScoreColor(80)).toContain('text-yellow-600');
      expect(getScoreColor(60)).toContain('text-gray-500');
    });
  });

  describe('getStageColor', () => {
    it('deve retornar cores corretas para cada estágio', () => {
      expect(getStageColor('Qualification')).toContain('bg-blue-100');
      expect(getStageColor('Proposal')).toContain('bg-purple-100');
      expect(getStageColor('Negotiation')).toContain('bg-orange-100');
      expect(getStageColor('Closed')).toContain('bg-green-100');
      expect(getStageColor('Lost')).toContain('bg-red-100');
    });
  });
});