import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
    text?: string
    className?: string
}

export function LoadingSpinner({
    size = 'md',
    text = 'Loading...',
    className
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
        '2xl': 'h-16 w-16',
        '3xl': 'h-24 w-24',
        '4xl': 'h-32 w-32'
    }

    return (
        <div className={cn(
            'flex flex-col items-center justify-center gap-2 p-8',
            className
        )}>
            <Loader2 className={cn(
                'animate-spin text-muted-foreground',
                sizeClasses[size]
            )} />
            {text && (
                <p className="text-sm text-muted-foreground animate-pulse">
                    {text}
                </p>
            )}
        </div>
    )
}

// Variações específicas para diferentes contextos
export function PageLoadingSpinner() {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <LoadingSpinner
                size="2xl"
                text="Loading application..."
                className="p-12"
            />
        </div>
    )
}

export function TableLoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-8">
            <LoadingSpinner
                size="md"
                text="Loading data..."
            />
        </div>
    )
}

export function ComponentLoadingSpinner() {
    return (
        <div className="flex items-center justify-center p-4">
            <LoadingSpinner
                size="sm"
                text="Loading component..."
            />
        </div>
    )
}