import { cn } from '@/lib/utils'
export default function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase', className)}>
      {children}
    </span>
  )
}
