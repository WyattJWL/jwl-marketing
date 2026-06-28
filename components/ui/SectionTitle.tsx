import { cn } from '@/lib/utils'
interface SectionTitleProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
  className?: string
}
export default function SectionTitle({ badge, title, highlight, subtitle, centered = true, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-16', centered && 'text-center', className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 bg-terra/10 text-terra px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
          {badge}
        </div>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight mb-4">
        {title}
        {highlight && <span className="gradient-text block">{highlight}</span>}
      </h2>
      {subtitle && <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
