import { CameraFilledIcon, CameraOffIcon } from "./icons";

/*
 * 참고 사진(카페 캠스터디)의 구도를 재현한 풀블리드 장면 일러스트.
 * 모든 장면이 같은 팔레트(허니 오크 책상, 앰버 조명, 벽돌 배경)를 공유한다.
 */

export function DeskCamScene() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="cam-scene" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dcBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#33251b" />
          <stop offset="100%" stopColor="#221810" />
        </linearGradient>
        <linearGradient id="dcWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a87c52" />
          <stop offset="40%" stopColor="#7c5633" />
          <stop offset="100%" stopColor="#3a2617" />
        </linearGradient>
        <radialGradient id="dcPool" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#ffdca0" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffdca0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dcPageL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f7f2e5" />
          <stop offset="82%" stopColor="#efe8d6" />
          <stop offset="100%" stopColor="#ddd2b8" />
        </linearGradient>
        <linearGradient id="dcPageR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ddd2b8" />
          <stop offset="18%" stopColor="#f2ecdb" />
          <stop offset="100%" stopColor="#f7f2e5" />
        </linearGradient>
        <linearGradient id="dcSkin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0c79f" />
          <stop offset="100%" stopColor="#dda876" />
        </linearGradient>
        <linearGradient id="dcCoffee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a4a26" />
          <stop offset="100%" stopColor="#42250f" />
        </linearGradient>
        <filter id="dcBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="dcSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* 배경: 아웃포커스된 카페 */}
      <rect width="400" height="300" fill="url(#dcBg)" />
      <g filter="url(#dcBlur)">
        <rect x="246" y="-4" width="160" height="76" fill="#7c4530" opacity="0.3" />
        <g fill="#a05a3e" opacity="0.42">
          <rect x="252" y="2" width="34" height="13" rx="2" />
          <rect x="290" y="2" width="34" height="13" rx="2" />
          <rect x="328" y="2" width="34" height="13" rx="2" />
          <rect x="366" y="2" width="34" height="13" rx="2" />
          <rect x="266" y="19" width="34" height="13" rx="2" />
          <rect x="304" y="19" width="34" height="13" rx="2" />
          <rect x="342" y="19" width="34" height="13" rx="2" />
          <rect x="252" y="36" width="34" height="13" rx="2" />
          <rect x="290" y="36" width="34" height="13" rx="2" />
          <rect x="328" y="36" width="34" height="13" rx="2" />
          <rect x="366" y="36" width="34" height="13" rx="2" />
          <rect x="266" y="53" width="34" height="13" rx="2" />
          <rect x="304" y="53" width="34" height="13" rx="2" />
        </g>
        <rect x="10" y="24" width="66" height="15" rx="7" fill="#8a6242" opacity="0.35" transform="rotate(-6 43 31)" />
        <rect x="4" y="46" width="72" height="13" rx="6" fill="#8a6242" opacity="0.3" transform="rotate(-6 40 52)" />
        <ellipse cx="228" cy="10" rx="30" ry="12" fill="#ffd9a0" opacity="0.24" />
        <circle cx="150" cy="26" r="9" fill="#f2c87b" opacity="0.4" />
        <circle cx="196" cy="46" r="5" fill="#f2c87b" opacity="0.32" />
        <circle cx="106" cy="58" r="6" fill="#ffdca0" opacity="0.3" />
      </g>

      {/* 원목 책상 */}
      <path d="M0 118 L400 92 L400 300 L0 300 Z" fill="url(#dcWood)" />
      <path d="M0 118 L400 92" stroke="#c89a68" strokeWidth="1.5" opacity="0.45" />
      <g opacity="0.9">
        <path d="M0 138 Q120 128 252 122 T400 112" stroke="#3c2716" strokeWidth="1.6" opacity="0.24" />
        <path d="M0 166 Q140 158 260 152 T400 142" stroke="#3c2716" strokeWidth="2.2" opacity="0.2" />
        <path d="M0 205 Q150 198 280 192 T400 184" stroke="#3c2716" strokeWidth="1.4" opacity="0.22" />
        <path d="M0 252 Q160 246 300 242 T400 236" stroke="#3c2716" strokeWidth="2.4" opacity="0.18" />
        <path d="M0 284 Q170 280 320 276 T400 272" stroke="#3c2716" strokeWidth="1.6" opacity="0.16" />
        <path d="M0 150 Q130 142 250 136 T400 126" stroke="#c89a68" strokeWidth="4" opacity="0.1" />
        <path d="M0 232 Q160 226 300 220 T400 214" stroke="#c89a68" strokeWidth="5" opacity="0.08" />
        <ellipse cx="46" cy="176" rx="7" ry="3" stroke="#3c2716" strokeWidth="1.2" opacity="0.25" />
        <ellipse cx="352" cy="262" rx="8" ry="3.4" stroke="#3c2716" strokeWidth="1.2" opacity="0.2" />
      </g>
      <rect width="400" height="300" fill="url(#dcPool)" />

      {/* 아이스 아메리카노 */}
      <ellipse cx="66" cy="204" rx="27" ry="6.5" fill="#140b05" opacity="0.5" filter="url(#dcSoft)" />
      <rect x="76" y="88" width="5" height="52" rx="2.5" fill="#23201d" transform="rotate(9 78 114)" />
      <rect x="70" y="80" width="5" height="17" rx="2.5" fill="#23201d" transform="rotate(46 72 88)" />
      <path
        d="M47 142 L50.5 196 Q51 200 55 200 L77 200 Q81 200 81.5 196 L85 142 Z"
        fill="url(#dcCoffee)"
        opacity="0.95"
      />
      <g fill="#e8d8bf" opacity="0.32">
        <rect x="52" y="146" width="12" height="11" rx="3" transform="rotate(-12 58 151)" />
        <rect x="66" y="150" width="13" height="11" rx="3" transform="rotate(18 72 155)" />
        <rect x="58" y="164" width="12" height="10" rx="3" transform="rotate(7 64 169)" />
      </g>
      <path
        d="M44 136 L48 196 Q48 202 54 202 L78 202 Q84 202 84 196 L88 136 Z"
        fill="#efeae0"
        opacity="0.14"
        stroke="#f4f0e8"
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <rect x="50" y="146" width="5" height="48" rx="2.5" fill="#ffffff" opacity="0.14" />
      <ellipse cx="66" cy="136" rx="23" ry="6.5" fill="#e8e3d8" />
      <ellipse cx="66" cy="133.5" rx="23" ry="6.5" fill="#f4f0e8" />
      <ellipse cx="76" cy="133" rx="3.4" ry="1.6" fill="#5a534a" />
      <g fill="#ffffff" opacity="0.3">
        <circle cx="58" cy="158" r="1.3" />
        <circle cx="78" cy="168" r="1.1" />
        <circle cx="62" cy="182" r="1.2" />
        <circle cx="74" cy="150" r="1" />
      </g>

      {/* 이어폰 케이스 */}
      <ellipse cx="164" cy="146" rx="14" ry="4" fill="#140b05" opacity="0.4" filter="url(#dcSoft)" />
      <g transform="rotate(-8 164 133)">
        <rect x="152" y="124" width="24" height="19" rx="5" fill="#3f4a63" />
        <path d="M152 134 h24 v4 a5 5 0 01-5 5 h-14 a5 5 0 01-5-5 Z" fill="#d97a4e" />
        <rect x="152" y="133" width="24" height="1.4" fill="#2c3346" />
      </g>

      {/* 펼쳐진 문제집 */}
      <ellipse cx="235" cy="286" rx="132" ry="13" fill="#140b05" opacity="0.42" filter="url(#dcSoft)" />
      <g transform="rotate(-4 233 214)">
        <path d="M112 283 L110 158 Q170 149 230 155 L230 282 Q170 289 112 283 Z" fill="url(#dcPageL)" />
        <path d="M236 155 Q296 149 356 158 L354 283 Q296 289 236 282 Z" fill="url(#dcPageR)" />
        <path d="M230 155 L230 282 M236 155 L236 282" stroke="#b8ab8e" strokeWidth="1" opacity="0.6" />
        <path d="M114 287 Q170 293 230 286 M118 291 Q172 297 230 290" stroke="#d8d0bc" strokeWidth="1.4" fill="none" />
        <path d="M236 286 Q296 293 352 287 M236 290 Q294 297 348 291" stroke="#d8d0bc" strokeWidth="1.4" fill="none" />

        {/* 왼쪽 페이지 */}
        <rect x="122" y="168" width="58" height="5.5" rx="2.75" fill="#c8bfa4" />
        <rect x="118" y="203.5" width="88" height="9" rx="2" fill="#f0b45c" opacity="0.42" />
        <g fill="#b3a98f">
          <rect x="122" y="184" width="92" height="2.6" rx="1.3" />
          <rect x="122" y="195" width="86" height="2.6" rx="1.3" />
          <rect x="122" y="206" width="90" height="2.6" rx="1.3" />
          <rect x="122" y="217" width="64" height="2.6" rx="1.3" />
          <rect x="122" y="232" width="88" height="2.6" rx="1.3" />
          <rect x="122" y="243" width="78" height="2.6" rx="1.3" />
          <rect x="122" y="254" width="84" height="2.6" rx="1.3" />
          <rect x="122" y="265" width="58" height="2.6" rx="1.3" />
        </g>
        <rect x="122" y="248" width="34" height="2.6" rx="1.3" fill="#d96a4a" opacity="0.85" />

        {/* 오른쪽 페이지 */}
        <rect x="248" y="168" width="54" height="5.5" rx="2.75" fill="#c8bfa4" />
        <g fill="#b3a98f">
          <rect x="248" y="184" width="82" height="2.6" rx="1.3" />
          <rect x="248" y="195" width="74" height="2.6" rx="1.3" />
          <rect x="248" y="206" width="80" height="2.6" rx="1.3" />
        </g>
        <path className="note-line note-line-1" d="M248 232 h48" stroke="#8a8064" strokeWidth="2.6" strokeLinecap="round" />
        <path className="note-line note-line-2" d="M248 246 h36" stroke="#8a8064" strokeWidth="2.6" strokeLinecap="round" />
      </g>

      {/* 펜을 쥔 손 */}
      <ellipse cx="314" cy="260" rx="42" ry="9" fill="#140b05" opacity="0.32" filter="url(#dcSoft)" />
      <g className="write-hand">
        <rect x="336" y="222" width="112" height="44" rx="22" fill="url(#dcSkin)" transform="rotate(22 350 250)" />
        <ellipse cx="322" cy="238" rx="26" ry="20" fill="#ecbf95" transform="rotate(-16 322 238)" />
        <rect x="300" y="250" width="30" height="11" rx="5.5" fill="#dfab7e" transform="rotate(36 330 255)" />
        <rect x="292" y="240" width="36" height="12" rx="6" fill="#e4b285" transform="rotate(30 328 246)" />
        <rect x="286" y="230" width="40" height="13" rx="6.5" fill="#eaba90" transform="rotate(24 326 236)" />
        <rect x="311" y="197" width="8" height="60" rx="4" fill="#f2f0ea" transform="rotate(42.5 315 227)" />
        <rect x="297.5" y="238" width="8" height="7" fill="#b9bcc2" transform="rotate(42.5 301.5 241.5)" />
        <path d="M291 254 L299 244 L305 250 Z" fill="#c9ccd2" />
        <circle cx="291.5" cy="253.5" r="1.7" fill="#2e3138" />
        <rect x="280" y="218" width="42" height="13" rx="6.5" fill="#f2cba2" transform="rotate(30 322 224)" />
        <rect x="294" y="224" width="32" height="14" rx="7" fill="#f2cba2" transform="rotate(12 326 231)" />
        <rect x="283" y="238" width="7" height="6" rx="3" fill="#f8ddc2" opacity="0.8" transform="rotate(30 286.5 241)" />
        <g stroke="#d19a6b" strokeWidth="1.4" opacity="0.5" fill="none" strokeLinecap="round">
          <path d="M308 226 q4 -3 8 -1" />
          <path d="M312 236 q4 -2.6 8 -0.8" />
          <path d="M318 247 q3.6 -2.4 7.4 -0.8" />
        </g>
      </g>

      {/* 상단 창가 빛 */}
      <rect width="400" height="90" fill="url(#dcPool)" opacity="0.6" />
    </svg>
  );
}

export function CharacterCamScene() {
  return (
    <svg viewBox="0 0 400 300" fill="none" className="cam-scene" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ccBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e2118" />
          <stop offset="100%" stopColor="#1e1610" />
        </linearGradient>
        <linearGradient id="ccTee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4efe6" />
          <stop offset="100%" stopColor="#dcd3c2" />
        </linearGradient>
        <linearGradient id="ccWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a6242" />
          <stop offset="100%" stopColor="#4c3018" />
        </linearGradient>
        <radialGradient id="ccFace" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#f8dba3" />
          <stop offset="100%" stopColor="#efc687" />
        </radialGradient>
        <filter id="ccBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="ccSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* 배경: 아웃포커스된 카페 */}
      <rect width="400" height="300" fill="url(#ccBg)" />
      <g filter="url(#ccBlur)">
        <rect x="288" y="-4" width="120" height="120" fill="#7c4530" opacity="0.3" />
        <g fill="#a05a3e" opacity="0.4">
          <rect x="296" y="4" width="32" height="12" rx="2" />
          <rect x="332" y="4" width="32" height="12" rx="2" />
          <rect x="368" y="4" width="32" height="12" rx="2" />
          <rect x="310" y="20" width="32" height="12" rx="2" />
          <rect x="346" y="20" width="32" height="12" rx="2" />
          <rect x="296" y="36" width="32" height="12" rx="2" />
          <rect x="332" y="36" width="32" height="12" rx="2" />
          <rect x="368" y="36" width="32" height="12" rx="2" />
          <rect x="310" y="52" width="32" height="12" rx="2" />
          <rect x="346" y="52" width="32" height="12" rx="2" />
          <rect x="296" y="68" width="32" height="12" rx="2" />
          <rect x="332" y="68" width="32" height="12" rx="2" />
        </g>
        <ellipse cx="64" cy="52" rx="52" ry="42" fill="#f2c87b" opacity="0.2" />
        <rect x="18" y="118" width="60" height="86" rx="14" fill="#7a5638" opacity="0.32" transform="rotate(-6 48 160)" />
        <rect x="330" y="132" width="56" height="90" rx="14" fill="#7a5638" opacity="0.28" transform="rotate(5 358 176)" />
        <circle cx="116" cy="34" r="8" fill="#ffdca0" opacity="0.35" />
        <circle cx="86" cy="86" r="6" fill="#f2c87b" opacity="0.3" />
        <circle cx="322" cy="118" r="7" fill="#f2c87b" opacity="0.26" />
      </g>

      {/* 인물: 뒷머리 → 상체 → 어깨로 흘러내린 머리 */}
      <ellipse cx="200" cy="115" rx="76" ry="88" fill="#241c17" />
      <path
        d="M118 300 L118 232 Q122 180 152 166 Q176 154 200 152 Q224 154 248 166 Q278 180 282 232 L282 300 Z"
        fill="url(#ccTee)"
      />
      <ellipse cx="200" cy="180" rx="26" ry="10" fill="#cfc4ae" opacity="0.45" filter="url(#ccSoft)" />
      <path d="M126 232 Q122 262 124 296 L142 296 Q138 260 142 230 Z" fill="#cfc4ae" opacity="0.4" filter="url(#ccSoft)" />
      <path d="M274 232 Q278 262 276 296 L258 296 Q262 260 258 230 Z" fill="#cfc4ae" opacity="0.4" filter="url(#ccSoft)" />
      <rect x="138" y="194" width="36" height="17" rx="8.5" fill="#e7dfd0" transform="rotate(14 156 202)" />
      <rect x="226" y="192" width="36" height="17" rx="8.5" fill="#e7dfd0" transform="rotate(-12 244 200)" />
      <path d="M136 96 Q116 152 120 216 Q138 227 156 218 Q147 162 152 112 Z" fill="#261d18" />
      <path d="M264 96 Q284 152 280 216 Q262 227 244 218 Q253 162 248 112 Z" fill="#261d18" />
      <g stroke="#4a382c" strokeWidth="1.6" opacity="0.55" fill="none" strokeLinecap="round">
        <path d="M134 118 Q128 164 131 204" />
        <path d="M144 108 Q138 160 141 210" />
        <path d="M266 118 Q272 164 269 204" />
        <path d="M256 108 Q262 160 259 210" />
      </g>
      <rect x="186" y="122" width="28" height="38" rx="9" fill="#e8b98c" />
      <ellipse cx="200" cy="146" rx="15" ry="6" fill="#c98f4e" opacity="0.35" />

      {/* 얼굴에만 씌워진 곰 캐릭터 */}
      <g transform="rotate(-5 200 106)">
        <ellipse cx="200" cy="106" rx="44" ry="41" fill="url(#ccFace)" />
        <path d="M152 88 Q150 34 200 30 Q250 34 248 88 Q240 66 200 74 Q160 66 152 88 Z" fill="#241c17" />
        <path d="M160 78 Q172 96 168 120 Q176 98 170 80 Z" fill="#241c17" opacity="0.9" />
        <circle cx="164" cy="63" r="15" fill="#f2c87b" />
        <circle cx="236" cy="63" r="15" fill="#f2c87b" />
        <circle cx="164" cy="64.5" r="7.5" fill="#e3ac5c" />
        <circle cx="236" cy="64.5" r="7.5" fill="#e3ac5c" />
        <ellipse cx="184" cy="107" rx="3.9" ry="4.7" fill="#3a2c10" />
        <ellipse cx="216" cy="107" rx="3.9" ry="4.7" fill="#3a2c10" />
        <circle cx="182.7" cy="105.2" r="1.2" fill="#fff" opacity="0.85" />
        <circle cx="214.7" cy="105.2" r="1.2" fill="#fff" opacity="0.85" />
        <path d="M178 100 q6 -3.4 12 -0.6" stroke="#d9a066" strokeWidth="1.5" opacity="0.6" fill="none" strokeLinecap="round" />
        <path d="M210 99.4 q6 -2.8 12 0.6" stroke="#d9a066" strokeWidth="1.5" opacity="0.6" fill="none" strokeLinecap="round" />
        <ellipse cx="200" cy="121" rx="13" ry="9.5" fill="#fbe7c0" />
        <path d="M195 115 Q200 111 205 115 Q203 120 200 121 Q197 120 195 115 Z" fill="#6b4a2c" />
        <path d="M195 127 Q200 131 205 127" stroke="#6b4a2c" strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse cx="171" cy="119" rx="6" ry="4" fill="#f2a67f" opacity="0.45" />
        <ellipse cx="229" cy="119" rx="6" ry="4" fill="#f2a67f" opacity="0.45" />
      </g>
      <path d="M154 86 Q147 130 156 168 Q161 130 159 92 Z" fill="#241c17" opacity="0.92" />
      <path d="M246 86 Q253 130 244 168 Q239 130 241 92 Z" fill="#241c17" opacity="0.92" />

      {/* 얼굴 트래킹 브래킷 */}
      <g className="track-frame" stroke="#6c87ff" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M142 62 L142 46 Q142 42 146 42 L162 42" />
        <path d="M238 42 L254 42 Q258 42 258 46 L258 62" />
        <path d="M258 148 L258 164 Q258 168 254 168 L238 168" />
        <path d="M162 168 L146 168 Q142 168 142 164 L142 148" />
      </g>

      {/* 책상과 문제집, 그 위의 손 */}
      <path d="M0 258 L400 246 L400 300 L0 300 Z" fill="url(#ccWood)" />
      <path d="M0 258 L400 246" stroke="#c89a68" strokeWidth="1.4" opacity="0.4" />
      <path d="M120 268 Q160 259 196 263 L196 300 L112 300 Z" fill="#f5efdf" />
      <path d="M204 263 Q240 259 280 268 L288 300 L204 300 Z" fill="#efe8d4" />
      <rect x="196" y="261" width="8" height="39" fill="#140b05" opacity="0.14" />
      <g fill="#b3a98f" opacity="0.55">
        <rect x="132" y="272" width="48" height="2.2" rx="1.1" />
        <rect x="132" y="280" width="40" height="2.2" rx="1.1" />
        <rect x="214" y="272" width="46" height="2.2" rx="1.1" />
        <rect x="214" y="280" width="52" height="2.2" rx="1.1" />
      </g>
      <rect x="142" y="212" width="24" height="58" rx="12" fill="#e8b98c" transform="rotate(16 154 240)" />
      <rect x="234" y="210" width="24" height="56" rx="12" fill="#e8b98c" transform="rotate(-13 246 236)" />
      <ellipse cx="172" cy="264" rx="14" ry="9.5" fill="#eec39a" transform="rotate(-10 172 264)" />
      <rect x="236" y="230" width="5" height="36" rx="2.5" fill="#f2f0ea" transform="rotate(34 238.5 248)" />
      <ellipse cx="230" cy="259" rx="14" ry="9.5" fill="#eec39a" transform="rotate(12 230 259)" />
      <circle cx="224" cy="270" r="1.6" fill="#2e3138" />
    </svg>
  );
}

/* ---------- 캠필수방 / 캠선택방 미니 타일 ---------- */

function MiniDeskScene({ variant }: { variant: "honey" | "rose" }) {
  const p = variant === "honey" ? "mdh" : "mdr";
  const woodTop = variant === "honey" ? "#96683f" : "#7c5240";
  const woodBottom = variant === "honey" ? "#462c16" : "#3c2620";
  return (
    <svg viewBox="0 0 160 100" fill="none" className="tile-scene" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${p}Wood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={woodTop} />
          <stop offset="100%" stopColor={woodBottom} />
        </linearGradient>
        <filter id={`${p}Blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      <rect width="160" height="100" fill="#231910" />
      <g filter={`url(#${p}Blur)`}>
        <circle cx={variant === "honey" ? 30 : 130} cy="10" r="10" fill="#f2c87b" opacity="0.35" />
        <circle cx={variant === "honey" ? 120 : 46} cy="8" r="6" fill="#ffdca0" opacity="0.3" />
      </g>
      <path d="M0 26 L160 18 L160 100 L0 100 Z" fill={`url(#${p}Wood)`} />
      <path d="M0 40 Q60 36 160 30 M0 66 Q70 62 160 56 M0 88 Q80 85 160 80" stroke="#2c1c0e" strokeWidth="1.2" opacity="0.25" fill="none" />
      {variant === "rose" && <circle cx="20" cy="30" r="16" fill="#f2c87b" opacity="0.24" filter={`url(#${p}Blur)`} />}
      {variant === "honey" && (
        <g>
          <path d="M14 44 L15.5 66 Q15.7 68 18 68 L26 68 Q28.3 68 28.5 66 L30 44 Z" fill="#4a2b17" opacity="0.9" />
          <ellipse cx="22" cy="44" rx="9" ry="2.6" fill="#f4f0e8" />
          <rect x="24" y="26" width="2.5" height="20" rx="1.25" fill="#23201d" transform="rotate(8 25 36)" />
        </g>
      )}
      <g transform="rotate(-3 80 66)">
        <ellipse cx="80" cy="90" rx="52" ry="5" fill="#140b05" opacity="0.4" filter={`url(#${p}Blur)`} />
        <path d="M38 44 Q58 40 78 43 L78 88 Q58 91 39 88 Z" fill="#f6f0e2" />
        <path d="M82 43 Q102 40 122 44 L121 88 Q102 91 82 88 Z" fill="#efe8d6" />
        <rect x="78" y="42" width="4" height="47" fill="#140b05" opacity="0.12" />
        {variant === "rose" && <rect x="86" y="58" width="26" height="5" rx="1.5" fill="#f0b45c" opacity="0.5" />}
        <g fill="#b3a98f">
          <rect x="46" y="52" width="26" height="2" rx="1" />
          <rect x="46" y="60" width="22" height="2" rx="1" />
          <rect x="46" y="68" width="25" height="2" rx="1" />
          <rect x="88" y="52" width="24" height="2" rx="1" />
          <rect x="88" y="60" width="21" height="2" rx="1" />
        </g>
      </g>
      <g className="write-hand-mini">
        <rect x="118" y="60" width="52" height="20" rx="10" fill="#e8b482" transform="rotate(24 140 70)" />
        <ellipse cx="118" cy="66" rx="12" ry="9" fill="#eec39a" transform="rotate(-14 118 66)" />
        <rect x="104" y="46" width="4" height="30" rx="2" fill="#f2f0ea" transform="rotate(40 106 61)" />
        <circle cx="96" cy="72" r="1.3" fill="#2e3138" />
      </g>
    </svg>
  );
}

function MiniCharScene() {
  return (
    <svg viewBox="0 0 160 100" fill="none" className="tile-scene" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mcBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b2018" />
          <stop offset="100%" stopColor="#1c1510" />
        </linearGradient>
        <filter id="mcBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      <rect width="160" height="100" fill="url(#mcBg)" />
      <circle cx="26" cy="18" r="9" fill="#f2c87b" opacity="0.3" filter="url(#mcBlur)" />
      <circle cx="136" cy="70" r="11" fill="#f2c87b" opacity="0.22" filter="url(#mcBlur)" />
      <path d="M34 100 Q80 62 126 100 Z" fill="#f0ebe0" />
      <ellipse cx="80" cy="70" rx="26" ry="24" fill="#241c17" />
      <circle cx="66" cy="38" r="7" fill="#f2c87b" />
      <circle cx="94" cy="38" r="7" fill="#f2c87b" />
      <circle cx="66" cy="39" r="3.5" fill="#e3ac5c" />
      <circle cx="94" cy="39" r="3.5" fill="#e3ac5c" />
      <ellipse cx="80" cy="55" rx="19" ry="18" fill="#f6d497" />
      <path d="M60 47 Q60 30 80 29 Q100 30 100 47 Q92 38 80 41.5 Q68 38 60 47 Z" fill="#241c17" />
      <ellipse cx="73.5" cy="56" rx="1.9" ry="2.3" fill="#3a2c10" />
      <ellipse cx="86.5" cy="56" rx="1.9" ry="2.3" fill="#3a2c10" />
      <ellipse cx="80" cy="62.5" rx="6" ry="4.4" fill="#fbe7c0" />
      <path d="M77.6 60 Q80 58.2 82.4 60 Q81.4 62.4 80 62.8 Q78.6 62.4 77.6 60 Z" fill="#6b4a2c" />
      <path d="M77.6 65.4 Q80 67.2 82.4 65.4" stroke="#6b4a2c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <g className="track-frame-mini" stroke="#6c87ff" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d="M52 34 L52 27 Q52 25 54 25 L61 25" />
        <path d="M99 25 L106 25 Q108 25 108 27 L108 34" />
        <path d="M108 76 L108 83 Q108 85 106 85 L99 85" />
        <path d="M61 85 L54 85 Q52 85 52 83 L52 76" />
      </g>
    </svg>
  );
}

const ROOM_TILES = {
  required: [
    { name: "지수", status: "집중 중", dot: "dot-good" },
    { name: "민준", status: "필기 중", dot: "dot-good" },
  ],
  optional: [
    { name: "하은", status: "공부 중", dot: "dot-good" },
    { name: "서연", status: "휴식 중", dot: "dot-warn" },
  ],
};

export function RoomCamGrid() {
  return (
    <div className="room-scene">
      <div className="room-cols">
        <div className="room-col">
          <span className="room-col-chip room-col-chip-required">
            <CameraFilledIcon />캠 필수
          </span>
          <div className="room-tile">
            <MiniDeskScene variant="honey" />
            <span className="room-tile-bar">
              <i className={`room-tile-dot ${ROOM_TILES.required[0].dot}`} />
              {ROOM_TILES.required[0].name} · {ROOM_TILES.required[0].status}
            </span>
          </div>
          <div className="room-tile">
            <MiniDeskScene variant="rose" />
            <span className="room-tile-bar">
              <i className={`room-tile-dot ${ROOM_TILES.required[1].dot}`} />
              {ROOM_TILES.required[1].name} · {ROOM_TILES.required[1].status}
            </span>
          </div>
        </div>
        <div className="room-col">
          <span className="room-col-chip">
            <CameraOffIcon />캠 선택
          </span>
          <div className="room-tile">
            <MiniCharScene />
            <span className="room-tile-bar">
              <i className={`room-tile-dot ${ROOM_TILES.optional[0].dot}`} />
              {ROOM_TILES.optional[0].name} · {ROOM_TILES.optional[0].status}
            </span>
          </div>
          <div className="room-tile room-tile-off">
            <span className="room-tile-off-icon">
              <CameraOffIcon />
            </span>
            <span className="room-tile-off-text">상태만 공유</span>
            <span className="room-tile-bar">
              <i className={`room-tile-dot ${ROOM_TILES.optional[1].dot}`} />
              {ROOM_TILES.optional[1].name} · {ROOM_TILES.optional[1].status}
            </span>
          </div>
        </div>
      </div>
      <span className="room-count">4명 접속 중</span>
    </div>
  );
}
