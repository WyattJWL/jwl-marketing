import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  external?: boolean
}

export default function Button({
  children, href, variant = 'primary', size = 'md',
  className, onClick, type = 'button', external
}: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer'
  const variants = {
    primary: 'bg-terra text-white hover:bg-terra-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-ink text-white hover:bg-ink2 shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    outline: 'border-2 border-terra text-terra hover:bg-terra hover:text-white',
    ghost: 'text-terra hover:bg-terra/10',
  }
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  const cls = cn(base, variants[variant], sizes[size], className)

  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
    return <Link href={href} className={cls}>{children}</Link>
  }
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}
