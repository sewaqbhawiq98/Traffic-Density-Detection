import type React from "react"

interface PageBackgroundProps {
  imageUrl: string
  opacity?: number
  children: React.ReactNode
}

export function PageBackground({ imageUrl, opacity = 0.2, children }: PageBackgroundProps) {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: opacity,
        }}
      />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  )
}

