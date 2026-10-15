import { logoColors, logoPaths, type LogoColors } from './logo-paths'

/** The pixel sea lion for React islands. Crisp pixels, never smoothed. */
export function PixelOtarie({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {(Object.keys(logoPaths) as (keyof LogoColors)[]).map((layer) => (
        <path key={layer} fill={logoColors[layer]} d={logoPaths[layer]} />
      ))}
    </svg>
  )
}
