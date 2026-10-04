import { Icon } from '@iconify/react'

/**
 * One island for the whole strip.
 *
 * Every icon here comes from the same runtime, so rendering them together
 * costs one hydration instead of one per logo.
 */
const items = [
  { icon: 'simple-icons:kubernetes', label: 'Kubernetes' },
  { icon: 'simple-icons:rust', label: 'Rust' },
  { icon: 'simple-icons:postgresql', label: 'PostgreSQL' },
  { icon: 'simple-icons:keycloak', label: 'Keycloak' },
  { icon: 'simple-icons:openid', label: 'OpenID Connect' },
  { icon: 'simple-icons:argo', label: 'Argo CD' },
  { icon: 'simple-icons:letsencrypt', label: "Let's Encrypt" },
  { icon: 'simple-icons:amazons3', label: 'S3 storage' },
  { icon: 'simple-icons:vault', label: 'OpenBao' },
]

export function TechStrip() {
  const row = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      <div className="marquee flex items-center gap-12">
        {row.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex shrink-0 items-center gap-2.5 text-muted-foreground"
          >
            <Icon icon={item.icon} className="size-5" />
            <span className="whitespace-nowrap text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}
