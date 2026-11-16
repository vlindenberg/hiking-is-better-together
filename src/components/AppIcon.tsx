export function AppIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 360 360" width={size} height={size} className={className} role="img" aria-label="HikeUp app icon">
      <rect width="360" height="360" rx="80" fill="#0A0A0A" />
      <path transform="translate(0,-16)" fill="#DBFF02" fillRule="nonzero" d="M28 250 L88 198 L108 212 L160 118 L190 158 L214 184 L254 132 L284 172 L294 166 L332 250 L289.1 181.8 L281.2 186.5 L253.9 150.2 L214.8 201 L181.5 165 L161.4 138.2 L111.7 228 L88.7 211.9 Z M160 118 L144 274 L108 212 Z M254 132 L240 254 L214 184 Z M88 198 L82 244 L28 250 Z M294 166 L300 220 L284 172 Z" />
    </svg>
  );
}
