export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2-6.3-4.5-6.3 4.5 2.3-7.2-6-4.4h7.6L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DeskIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="14" width="18" height="3" rx="1" fill="currentColor" />
      <path d="M6 17v3M18 17v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="7" y="5" width="10" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function CharacterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RoomIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="4" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="4" width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="18" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SyncIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3M15 5h5V0M9 19H4v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SwapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function LateIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v6h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ExitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 19h16M8 19V9m4 10V5m4 14v-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 9v4m0 4h.01M4.9 4.9l14.2 14.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function DeskCamIllustration() {
  return (
    <svg viewBox="0 0 220 170" fill="none" className="desk-illust">
      <defs>
        <linearGradient id="deskWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d2f26" />
          <stop offset="100%" stopColor="#221a15" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="208" height="158" rx="18" fill="url(#deskWood)" />

      <g transform="translate(150 26)">
        <path d="M0 12a17 17 0 0034 0V2H0v10z" fill="#e7e2d6" />
        <path d="M34 8h6a6 6 0 010 12h-6" stroke="#e7e2d6" strokeWidth="3" fill="none" />
      </g>

      <g transform="rotate(-3 100 90)">
        <rect x="44" y="44" width="98" height="72" rx="6" fill="#f4f1e9" />
        <rect x="44" y="44" width="10" height="72" rx="4" fill="#d8d2c0" />
        <circle cx="49" cy="60" r="2" fill="#a29d8c" />
        <circle cx="49" cy="76" r="2" fill="#a29d8c" />
        <circle cx="49" cy="92" r="2" fill="#a29d8c" />
        <circle cx="49" cy="108" r="2" fill="#a29d8c" />
        <path className="note-line note-line-1" d="M64 64h58" stroke="#b9b3a0" strokeWidth="3" strokeLinecap="round" />
        <path className="note-line note-line-2" d="M64 80h48" stroke="#b9b3a0" strokeWidth="3" strokeLinecap="round" />
        <path className="note-line note-line-3" d="M64 96h54" stroke="#b9b3a0" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g transform="translate(94 100)">
        <ellipse cx="30" cy="30" rx="34" ry="19" fill="#d9a066" />
        <rect x="2" y="4" width="16" height="26" rx="8" fill="#d9a066" />
        <rect x="18" y="-2" width="15" height="30" rx="7.5" fill="#d9a066" />
        <rect x="34" y="0" width="15" height="28" rx="7.5" fill="#d9a066" />
        <rect x="49" y="6" width="14" height="24" rx="7" fill="#d9a066" />
        <g className="pen">
          <rect x="30" y="-16" width="7" height="46" rx="3.5" fill="#3d5fff" transform="rotate(18 33.5 7)" />
          <circle cx="45" cy="26" r="2.4" fill="#232a4a" />
        </g>
      </g>
    </svg>
  );
}

export function CharacterCamIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="char-illust">
      <circle className="focus-ring focus-ring-1" cx="80" cy="80" r="46" stroke="#6c87ff" strokeWidth="2" />
      <circle className="focus-ring focus-ring-2" cx="80" cy="80" r="46" stroke="#6c87ff" strokeWidth="2" />
      <ellipse cx="56" cy="48" rx="13" ry="13" fill="#f2c87b" />
      <ellipse cx="104" cy="48" rx="13" ry="13" fill="#f2c87b" />
      <circle cx="80" cy="84" r="42" fill="#f6d497" />
      <circle cx="66" cy="80" r="4.5" fill="#3a2c10" />
      <circle cx="94" cy="80" r="4.5" fill="#3a2c10" />
      <ellipse cx="80" cy="94" rx="8" ry="6" fill="#e3ac5c" />
      <path d="M74 100q6 5 12 0" stroke="#3a2c10" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function CameraFilledIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="7" width="14" height="11" rx="2.4" fill="currentColor" />
      <path d="M16.5 10.2l5-3v9.6l-5-3z" fill="currentColor" />
      <rect x="7" y="4" width="5" height="3" rx="1.2" fill="currentColor" />
    </svg>
  );
}

export function CameraOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="7" width="14" height="11" rx="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.5 10.2l5-3v9.6l-5-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MiniBearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="6" r="2.6" fill="currentColor" />
      <circle cx="17" cy="6" r="2.6" fill="currentColor" />
      <circle cx="12" cy="13" r="8" fill="currentColor" />
    </svg>
  );
}

export function PersonDotIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="3" fill="currentColor" />
      <path d="M2 15c0-3.5 2.7-6 6-6s6 2.5 6 6" fill="currentColor" />
    </svg>
  );
}
