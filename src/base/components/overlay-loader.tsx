import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';

interface OverlayLoaderProps {
  isLoading: boolean;
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  backdrop?: 'light' | 'dark' | 'blur';
}

export function OverlayLoader({
  isLoading,
  message = 'Loading...',
  className,
  size = 'md',
  backdrop = 'light',
}: OverlayLoaderProps) {
  if (!isLoading) {
    return null;
  }

  const spinnerSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const backdrops = {
    light: 'bg-white/80',
    dark: 'bg-black/50',
    blur: 'bg-white/90',
  };

  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center', backdrops[backdrop], className)}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className={cn('animate-spin text-primary', spinnerSizes[size])} />
        {message && <p className="font-medium text-muted-foreground text-sm">{message}</p>}
      </div>
    </div>
  );
}

// Component-specific overlay loader
interface ComponentOverlayLoaderProps {
  isLoading: boolean;
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ComponentOverlayLoader({
  isLoading,
  message = 'Loading...',
  className,
  size = 'md',
}: ComponentOverlayLoaderProps) {
  if (!isLoading) {
    return null;
  }

  const spinnerSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('absolute inset-0 z-10 flex items-center justify-center', 'bg-background/90', className)}>
      <div className="flex flex-col items-center gap-2">
        <Loader2 className={cn('animate-spin text-primary', spinnerSizes[size])} />
        {message && <p className="font-medium text-muted-foreground text-xs">{message}</p>}
      </div>
    </div>
  );
}

// Inline loader for smaller spaces
interface InlineLoaderProps {
  isLoading: boolean;
  message?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function InlineLoader({ isLoading, message = 'Loading...', size = 'sm', className }: InlineLoaderProps) {
  if (!isLoading) {
    return null;
  }

  const spinnerSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-muted-foreground', spinnerSizes[size])} />
      {message && <span className="text-muted-foreground text-sm">{message}</span>}
    </div>
  );
}
