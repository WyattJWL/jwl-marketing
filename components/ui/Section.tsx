import { cn } from '@/lib/utils'
export default function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn('py-20 lg:py-28', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
