import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import satori from 'satori'
import { logoColors, logoPaths } from './logo'

const __dirname = dirname(fileURLToPath(import.meta.url))

const font = (weight: number) => readFileSync(resolve(__dirname, `assets/InstrumentSans-${weight}.woff`))
const fonts = [400, 500, 600, 700].map((weight) => ({
  name: 'Instrument Sans',
  data: font(weight),
  weight: weight as 400 | 500 | 600 | 700,
  style: 'normal' as const,
}))

// The site's tokens (apps/website/src/styles/globals.css), as hex.
const PRIMARY = '#634ecf'
const BACKGROUND = '#fdfdfe'
const INK = '#0f0f15'
const MUTED = '#686871'
const BORDER = '#dfdfe3'
const SURFACE = '#f6f6f9'

export const BRAND_WIDTH = 1200
export const BRAND_HEIGHT = 630

export interface BrandThumbnailOptions {
  /** Small uppercase label above the title, e.g. "Product". */
  eyebrow?: string
  title: string
  /** Second line of the title, drawn in the brand colour. */
  accent?: string
  description?: string
  locale?: 'en' | 'fr'
}

const flag = (
  <div style={{ display: 'flex', width: 24, height: 16, borderRadius: 3, overflow: 'hidden' }}>
    <div style={{ width: 8, height: 16, background: '#0055a4' }} />
    <div style={{ width: 8, height: 16, background: '#ffffff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }} />
    <div style={{ width: 8, height: 16, background: '#ef4135' }} />
  </div>
)

const logo = (size: number) => (
  <svg width={size} height={size} viewBox="0 0 24 24" shapeRendering="crispEdges">
    <path fill={logoColors.body} d={logoPaths.body} />
    <path fill={logoColors.shade} d={logoPaths.shade} />
    <path fill={logoColors.belly} d={logoPaths.belly} />
    <path fill={logoColors.outline} d={logoPaths.outline} />
  </svg>
)

// Cut at a word boundary, never in the middle of a word.
const clamp = (text: string | undefined, max: number) => {
  if (!text || text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '')}…`
}

function Row({ name, kind, status }: { name: string; kind: string; status: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 19, fontWeight: 600, color: INK }}>{name}</div>
        <div style={{ fontSize: 15, color: MUTED, marginTop: 2 }}>{kind}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '5px 11px', borderRadius: 7, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', fontSize: 15, fontWeight: 600 }}>
        {status}
        <div style={{ width: 7, height: 7, borderRadius: 4, background: '#22c55e', marginLeft: 8 }} />
      </div>
    </div>
  )
}

export async function generateBrandThumbnail(options: BrandThumbnailOptions): Promise<string> {
  const { eyebrow, accent, locale = 'en' } = options
  const title = options.title
  const total = title.length + (accent?.length ?? 0)
  // Longer titles get smaller type, and the description is dropped when there is no room for it.
  const titleSize = total <= 40 ? 66 : total <= 60 ? 58 : 50
  const description = total > 64 ? undefined : clamp(options.description, total > 48 ? 90 : 130)
  const copy =
    locale === 'fr'
      ? { deployments: 'Déploiements', action: 'Nouveau déploiement', status: 'En cours', made: 'Conçu en France · 100 % européen' }
      : { deployments: 'Deployments', action: 'New deployment', status: 'Running', made: 'Made in France · 100% European' }

  return satori(
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: BRAND_WIDTH,
        height: BRAND_HEIGHT,
        background: BACKGROUND,
        fontFamily: 'Instrument Sans',
        overflow: 'hidden',
      }}
    >
      {/* The grid, fading out toward the bottom, and a soft brand glow */}
      <svg
        width={BRAND_WIDTH}
        height={BRAND_HEIGHT}
        viewBox={`0 0 ${BRAND_WIDTH} ${BRAND_HEIGHT}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {Array.from({ length: Math.ceil(BRAND_WIDTH / 72) + 1 }, (_, i) => (
          <line key={`v${i}`} x1={i * 72} y1={0} x2={i * 72} y2={BRAND_HEIGHT} stroke={BORDER} strokeWidth={1} />
        ))}
        {Array.from({ length: Math.ceil(BRAND_HEIGHT / 72) + 1 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 72} x2={BRAND_WIDTH} y2={i * 72} stroke={BORDER} strokeWidth={1} />
        ))}
      </svg>
      <div
        style={{
          position: 'absolute',
          top: -300,
          left: 60,
          width: 1000,
          height: 700,
          backgroundImage: 'radial-gradient(circle, rgba(99,78,207,0.22) 0%, rgba(99,78,207,0) 66%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: BRAND_WIDTH,
          height: BRAND_HEIGHT,
          backgroundImage: `radial-gradient(circle at 40% 0%, rgba(253,253,254,0) 0%, rgba(253,253,254,0.35) 40%, ${BACKGROUND} 80%)`,
        }}
      />

      {/* Brand */}
      <div style={{ position: 'absolute', top: 52, left: 72, display: 'flex', alignItems: 'center' }}>
        {logo(48)}
        <div style={{ marginLeft: 12, fontSize: 32, fontWeight: 600, color: INK, letterSpacing: -0.6 }}>Autharie</div>
      </div>

      {/* Title block */}
      <div style={{ position: 'absolute', top: 120, left: 72, width: 650, height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {eyebrow && (
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 600, letterSpacing: 3, color: PRIMARY, textTransform: 'uppercase', marginBottom: 22 }}>
            {eyebrow}
          </div>
        )}
        <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 600, lineHeight: 1.06, letterSpacing: -2, color: INK }}>
          {title}
        </div>
        {accent && (
          <div style={{ display: 'flex', fontSize: titleSize, fontWeight: 600, lineHeight: 1.06, letterSpacing: -2, color: PRIMARY }}>
            {accent}
          </div>
        )}
        {description && (
          <div style={{ display: 'flex', marginTop: 28, fontSize: 25, lineHeight: 1.35, color: MUTED, maxWidth: 600 }}>
            {description}
          </div>
        )}
      </div>

      {/* A console panel, cropped by the bottom edge like the hero */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          left: 760,
          width: 440,
          height: 560,
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          border: `1px solid ${BORDER}`,
          borderRadius: 18,
          boxShadow: '0 30px 60px -20px rgba(40,30,110,0.28), 0 2px 6px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', height: 58, padding: '0 20px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 7, background: PRIMARY, color: '#fff', fontSize: 16, fontWeight: 600 }}>A</div>
          <div style={{ margin: '0 11px', color: '#b5b5bd', fontSize: 18 }}>/</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 12, fontWeight: 500, color: INK }}>A</div>
          <div style={{ marginLeft: 8, fontSize: 17, fontWeight: 600, color: INK }}>Acme</div>
          <div style={{ margin: '0 11px', color: '#b5b5bd', fontSize: 18 }}>/</div>
          <div style={{ fontSize: 17, color: MUTED }}>{copy.deployments}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '22px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: INK, letterSpacing: -0.6 }}>{copy.deployments}</div>
            <div style={{ display: 'flex', padding: '8px 14px', borderRadius: 8, background: PRIMARY, color: '#fff', fontSize: 15, fontWeight: 600 }}>{copy.action}</div>
          </div>
          <Row name="acme-production" kind="Ferriskey · 1.4.2" status={copy.status} />
          <Row name="acme-staging" kind="Ferriskey · 1.4.2" status={copy.status} />
          <Row name="partners" kind="Keycloak · 26.1" status={copy.status} />
          <Row name="sandbox" kind="Ferriskey · 1.4.2" status={copy.status} />
        </div>
      </div>

      {/* Footer line */}
      <div style={{ position: 'absolute', left: 72, bottom: 48, display: 'flex', alignItems: 'center' }}>
        {flag}
        <div style={{ marginLeft: 12, fontSize: 21, fontWeight: 500, color: MUTED }}>
          {copy.made}
        </div>
        <div style={{ marginLeft: 22, paddingLeft: 22, borderLeft: `1px solid ${BORDER}`, fontSize: 21, fontWeight: 500, color: INK }}>autharie.fr</div>
      </div>
    </div>,
    { width: BRAND_WIDTH, height: BRAND_HEIGHT, fonts },
  )
}
