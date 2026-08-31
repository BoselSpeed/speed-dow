interface AdSenseProps {
  slot?: string
  className?: string
}

export default function AdSense({ slot = '3854956818', className = '' }: AdSenseProps) {
  return (
    <div className={`adsense-wrap ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8765388197634661"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      />
    </div>
  )
}
