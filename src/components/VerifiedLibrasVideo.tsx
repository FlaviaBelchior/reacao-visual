type VideoSource =
  | { kind: 'drive'; id: string }
  | { kind: 'youtube'; id: string };

type VerifiedLibrasVideoProps = {
  source: VideoSource;
  ariaLabel: string;
  compact?: boolean;
};

export function VerifiedLibrasVideo({ source, ariaLabel, compact = false }: VerifiedLibrasVideoProps) {
  const src =
    source.kind === 'drive'
      ? `https://drive.google.com/file/d/${source.id}/preview`
      : `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&mute=1&loop=1&playlist=${source.id}&controls=0&rel=0&playsinline=1&fs=0&disablekb=1`;

  return (
    <div className={compact ? 'verified-libras-video compact' : 'verified-libras-video'}>
      <iframe
        src={src}
        title={ariaLabel}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
