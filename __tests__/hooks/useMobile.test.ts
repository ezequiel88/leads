import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '@/hooks/useMobile';

// Mock do matchMedia
const mockMatchMedia = vi.fn();

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
  });

  it('deve retornar false para larguras maiores que 768px', () => {
    window.innerWidth = 1024;
    
    const { result } = renderHook(() => useIsMobile());
    
    expect(result.current).toBe(false);
  });

  it('deve retornar true para larguras menores que 768px', () => {
    window.innerWidth = 500;
    
    const { result } = renderHook(() => useIsMobile());
    
    expect(result.current).toBe(true);
  });

  it('deve responder a mudanças de tamanho da tela', () => {
    let changeHandler: () => void;
    
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event, handler) => {
        if (event === 'change') {
          changeHandler = handler;
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    
    expect(result.current).toBe(false);

    // Simula mudança para mobile
    act(() => {
      window.innerWidth = 500;
      if (changeHandler) changeHandler();
    });

    expect(result.current).toBe(true);
  });
});