# CameraSection 목업 실사 캠 화면 리디자인 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `CameraSection`의 3종 미리보기 목업(책상/손 캠, 캐릭터/상태 표시, 캠 필수방/선택방)을 flat 벡터 일러스트에서 실제 화상 캠으로 찍은 듯한 사진적 톤(비네트, 베젤, REC 점)과 멀티 참가자 그리드 구성으로 재작업한다.

**Architecture:** 순수 CSS + 인라인 SVG로만 구현 (이미지 파일, 외부 라이브러리 없음). `components/icons.tsx`의 SVG 컴포넌트 2개(`DeskCamIllustration`, `CharacterCamIllustration`)를 수정하고, `components/CameraSection.tsx`의 room 목업 마크업을 4타일 그리드로 교체하고, `app/globals.css`에 공통 프레임 톤 클래스와 각 목업 전용 클래스를 추가/교체한다.

**Tech Stack:** Next.js 16, React 19, TypeScript, 순수 CSS (Tailwind 미사용, `globals.css` 커스텀 클래스 체계).

## Global Constraints

- 이 프로젝트에는 자동화 테스트 스위트가 없다 (`package.json`에 `test` 스크립트 없음). 각 태스크의 검증은 `npx tsc --noEmit` 타입 체크 + `npm run dev`로 브라우저에서 육안 확인으로 대체한다.
- 좌측 선택 카드(`cam-card`) 3개, `CamKey`/`CAM_CARDS`/`CAM_PREVIEW` 데이터 구조, 카드 클릭 전환 로직은 변경하지 않는다.
- 이미지 파일(png/jpg) 추가 금지, 전부 SVG/CSS로 구현한다.
- 다크/라이트 모드 별도 분기 불필요 (`.cam-preview` 배경은 기존처럼 고정 다크 톤 `#14161a` 유지).
- 스펙 문서: `docs/superpowers/specs/2026-07-06-camera-mockup-photoreal-redesign-design.md`

---

### Task 1: 공통 "실사 캠 프레임" 톤 (비네트 · 베젤 · REC 점)

**Files:**
- Modify: `components/CameraSection.tsx:83` (cam-frame 내부에 REC 점 추가)
- Modify: `app/globals.css:822-855` (`.cam-frame` 보강, `.rec-dot` 신규, `.cam-frame .badge` z-index 보강)

**Interfaces:**
- Produces: `.rec-dot` CSS 클래스, `.cam-frame::before`/`::after` 오버레이 — 이후 태스크의 desk/char/room 목업은 이 공통 프레임 위에 얹히므로 별도 z-index 처리 불필요 (z-index 1 이하로 유지).

- [ ] **Step 1: `app/globals.css`의 `.cam-frame` 블록을 아래로 교체**

`app/globals.css:822-829`의 기존 블록:

```css
.cam-frame {
  flex: 1;
  border-radius: 16px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}
```

를 아래로 교체:

```css
.cam-frame {
  flex: 1;
  border-radius: 16px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}
.cam-frame::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
  z-index: 1;
}
.cam-frame::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent);
  pointer-events: none;
  z-index: 1;
}
.rec-dot {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff4d4d;
  box-shadow: 0 0 4px rgba(255, 77, 77, 0.8);
  z-index: 3;
  animation: rec-blink 1.6s ease-in-out infinite;
}
@keyframes rec-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
```

- [ ] **Step 2: `.cam-frame .badge`에 z-index 추가**

`app/globals.css:830-841`의 기존 블록:

```css
.cam-frame .badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 6px;
}
```

를 아래로 교체 (z-index: 3 한 줄만 추가):

```css
.cam-frame .badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 3;
}
```

- [ ] **Step 3: `components/CameraSection.tsx`의 `.cam-frame` 안에 REC 점 추가**

`components/CameraSection.tsx:83`의 기존 코드:

```tsx
              <div className="cam-frame">
                {active === "desk" && (
```

를 아래로 교체:

```tsx
              <div className="cam-frame">
                <span className="rec-dot" />
                {active === "desk" && (
```

- [ ] **Step 4: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음 (`.tsx` 변경분은 순수 마크업 추가라 타입 영향 없음)

- [ ] **Step 5: 브라우저 육안 확인**

Run: `npm run dev`, 브라우저에서 CameraSection으로 스크롤 후 3개 카드를 각각 클릭.
확인 항목: 프레임 가장자리가 은은하게 어두워지는지(비네트), 상단이 살짝 밝아지는지(렌즈 하이라이트), 좌상단에 빨간 점이 깜빡이는지, 기존 하단 좌측 배지("집중 중"/"휴식 중")가 오버레이에 가려지지 않고 선명하게 보이는지.

- [ ] **Step 6: 커밋**

```bash
git add components/CameraSection.tsx app/globals.css
git commit -m "$(cat <<'EOF'
feat: add shared realistic cam-frame tone (vignette, bezel, REC dot)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: 책상/손 캠 일러스트 사진 톤 보강

**Files:**
- Modify: `components/icons.tsx:150-191` (`DeskCamIllustration`)

**Interfaces:**
- Consumes: 없음 (독립 SVG 컴포넌트)
- Produces: `DeskCamIllustration` 컴포넌트 시그니처 변경 없음 (`components/CameraSection.tsx`에서의 `<DeskCamIllustration />` 호출부 그대로 유지)

- [ ] **Step 1: `components/icons.tsx`의 `DeskCamIllustration` 전체 교체**

`components/icons.tsx:150-191`의 기존 코드:

```tsx
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
```

를 아래로 교체:

```tsx
export function DeskCamIllustration() {
  return (
    <svg viewBox="0 0 220 170" fill="none" className="desk-illust">
      <defs>
        <linearGradient id="deskWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3a2e" />
          <stop offset="45%" stopColor="#3d2f26" />
          <stop offset="100%" stopColor="#1c1510" />
        </linearGradient>
        <radialGradient id="deskGlow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="6" y="6" width="208" height="158" rx="18" fill="url(#deskWood)" />
      <rect x="6" y="6" width="208" height="158" rx="18" fill="url(#deskGlow)" />

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
```

(변경점: `deskWood` 그라디언트를 2-stop → 3-stop으로 늘려 중앙 하이라이트를 자연스럽게 만들고, `deskGlow` radial 하이라이트 레이어를 추가. 손/펜/노트 마크업은 동일 유지 — 공통 비네트는 Task 1에서 프레임 레벨에 이미 적용되어 있으므로 이 SVG 자체에는 중복 비네트를 넣지 않는다.)

- [ ] **Step 2: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: 브라우저 육안 확인**

Run: `npm run dev`, "책상/손 캠" 카드 클릭.
확인 항목: 책상 중앙 부분이 은은하게 밝아 보이는지(조명 반사 느낌), 기존 펜 필기 애니메이션과 노트 줄 애니메이션이 그대로 작동하는지.

- [ ] **Step 4: 커밋**

```bash
git add components/icons.tsx
git commit -m "$(cat <<'EOF'
feat: add photographic highlight gradient to desk cam illustration

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: 캐릭터/상태 표시 — 얼굴 클로즈업 합성 톤

**Files:**
- Modify: `components/icons.tsx:193-207` (`CharacterCamIllustration`)
- Modify: `app/globals.css:930-944` (`.char-status-chip`)

**Interfaces:**
- Consumes: 없음 (독립 SVG 컴포넌트)
- Produces: `CharacterCamIllustration` 컴포넌트 시그니처 변경 없음

- [ ] **Step 1: `components/icons.tsx`의 `CharacterCamIllustration` 전체 교체**

`components/icons.tsx:193-207`의 기존 코드:

```tsx
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
```

를 아래로 교체:

```tsx
export function CharacterCamIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="char-illust">
      <defs>
        <filter id="bokehBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <circle cx="26" cy="32" r="24" fill="#d9a066" opacity="0.35" filter="url(#bokehBlur)" />
      <circle cx="136" cy="118" r="32" fill="#f2c87b" opacity="0.3" filter="url(#bokehBlur)" />
      <circle cx="128" cy="26" r="16" fill="#6c87ff" opacity="0.18" filter="url(#bokehBlur)" />
      <circle className="focus-ring focus-ring-1" cx="80" cy="80" r="46" stroke="#6c87ff" strokeWidth="2" />
      <circle className="focus-ring focus-ring-2" cx="80" cy="80" r="46" stroke="#6c87ff" strokeWidth="2" />
      <ellipse cx="80" cy="128" rx="30" ry="8" fill="#000000" opacity="0.18" filter="url(#bokehBlur)" />
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
```

(변경점: `bokehBlur` 필터로 흐린 배경 원 3개를 캐릭터 뒤에 배치해 "얕은 심도로 찍힌 실내" 느낌을 암시하고, 캐릭터 턱 아래 반투명 드롭섀도우 타원을 추가해 배경 위에 합성된 느낌을 준다. 기존 `focus-ring` 펄스 애니메이션과 캐릭터 얼굴 마크업은 동일 유지.)

- [ ] **Step 2: `app/globals.css`의 `.char-status-chip` 블록을 글래스 스타일로 교체**

`app/globals.css:930-940`의 기존 블록:

```css
.char-status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--brand-soft);
  color: var(--brand-deep);
  font-size: 12px;
  font-weight: 700;
}
```

를 아래로 교체:

```css
.char-status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #eef1ff;
  font-size: 12px;
  font-weight: 700;
}
```

- [ ] **Step 3: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: 브라우저 육안 확인**

Run: `npm run dev`, "캐릭터/상태 표시" 카드 클릭.
확인 항목: 캐릭터 뒤로 흐릿한 색 얼룩(보케)이 보이는지, 캐릭터 아래 은은한 그림자로 입체감이 생겼는지, "공부 중" 칩이 반투명 유리 느낌으로 보이는지, 기존 브리딩 링 애니메이션이 정상 작동하는지.

- [ ] **Step 5: 커밋**

```bash
git add components/icons.tsx app/globals.css
git commit -m "$(cat <<'EOF'
feat: add bokeh backdrop and glass status chip to character cam illustration

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: 캠 필수방 / 캠 선택방 — 2x2 비디오 그리드로 교체

**Files:**
- Modify: `components/CameraSection.tsx:98-121` (room 목업 마크업)
- Modify: `app/globals.css:964-1033` (`.room-mock` 등 기존 room 클래스 제거, 신규 `.room-grid` 등 추가)

**Interfaces:**
- Consumes: `CameraFilledIcon`, `CameraOffIcon`, `MiniBearIcon`, `PersonDotIcon` (모두 `components/icons.tsx`에 기존 정의된 컴포넌트, 시그니처 변경 없음)
- Produces: 없음 (이 태스크가 마지막)

- [ ] **Step 1: `components/CameraSection.tsx`의 room 분기 마크업 교체**

`components/CameraSection.tsx:98-121`의 기존 코드:

```tsx
                {active === "room" && (
                  <div className="room-mock">
                    <div className="room-tile room-tile-selected">
                      <span className="room-icon room-icon-cam">
                        <CameraFilledIcon />
                      </span>
                      <span className="room-people">
                        <PersonDotIcon />
                        <PersonDotIcon />
                        <PersonDotIcon />
                        <PersonDotIcon />
                      </span>
                      <span>캠 필수</span>
                    </div>
                    <div className="room-tile">
                      <span className="room-icon room-icon-off">
                        <CameraOffIcon />
                      </span>
                      <span className="room-avatar">
                        <MiniBearIcon />
                      </span>
                      <span>캠 선택</span>
                    </div>
                  </div>
                )}
```

를 아래로 교체:

```tsx
                {active === "room" && (
                  <div className="room-grid">
                    <div className="room-col">
                      <div className="room-mini-tile room-mini-selected">
                        <span className="room-mini-icon room-mini-icon-cam">
                          <CameraFilledIcon />
                        </span>
                      </div>
                      <div className="room-mini-tile">
                        <span className="room-mini-icon room-mini-icon-cam">
                          <PersonDotIcon />
                        </span>
                      </div>
                      <span className="room-col-label">캠 필수</span>
                    </div>
                    <div className="room-col">
                      <div className="room-mini-tile room-mini-off">
                        <span className="room-mini-icon room-mini-icon-off">
                          <CameraOffIcon />
                        </span>
                        <span className="room-mini-avatar">
                          <MiniBearIcon />
                        </span>
                      </div>
                      <div className="room-mini-tile room-mini-off">
                        <span className="room-mini-icon room-mini-icon-off">
                          <CameraOffIcon />
                        </span>
                        <span className="room-mini-avatar">
                          <MiniBearIcon />
                        </span>
                      </div>
                      <span className="room-col-label">캠 선택</span>
                    </div>
                    <span className="room-count">4명 접속 중</span>
                  </div>
                )}
```

- [ ] **Step 2: `app/globals.css`에서 기존 room 클래스 블록을 신규 그리드 클래스로 교체**

`app/globals.css:964-1033`의 기존 블록:

```css
.room-mock {
  display: flex;
  gap: 12px;
}
.room-tile {
  width: 92px;
  height: 116px;
  border-radius: 12px;
  background: #23262e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1.5px solid #34373f;
}
.room-tile span {
  font-size: 11px;
  color: #c7cbd3;
  font-weight: 700;
}
.room-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
}
.room-icon svg {
  width: 18px;
  height: 18px;
}
.room-icon-cam {
  background: var(--brand-soft-2);
  color: var(--brand);
}
.room-icon-off {
  background: #3a3d46;
  color: #9aa1ac;
}
.room-people {
  display: flex;
  gap: 2px;
  color: var(--brand);
}
.room-people svg {
  width: 10px;
  height: 10px;
}
.room-avatar {
  color: #c99a73;
}
.room-avatar svg {
  width: 20px;
  height: 20px;
}

@keyframes room-select-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(61, 95, 255, 0.35);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(61, 95, 255, 0);
  }
}
.room-tile-selected {
  border-color: var(--brand);
  animation: room-select-pulse 2.4s ease-out infinite;
}
```

를 아래로 교체:

```css
.room-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  width: 88%;
}
.room-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
.room-mini-tile {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  background: #23262e;
  border: 1.5px solid #34373f;
  display: grid;
  place-items: center;
  position: relative;
}
.room-mini-tile.room-mini-off {
  background: #1c1e24;
  border-color: #2b2e35;
}
.room-mini-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: grid;
  place-items: center;
}
.room-mini-icon svg {
  width: 14px;
  height: 14px;
}
.room-mini-icon-cam {
  background: var(--brand-soft-2);
  color: var(--brand);
}
.room-mini-icon-off {
  background: #3a3d46;
  color: #9aa1ac;
}
.room-mini-avatar {
  position: absolute;
  bottom: 4px;
  right: 4px;
  color: #c99a73;
}
.room-mini-avatar svg {
  width: 14px;
  height: 14px;
}
.room-col-label {
  font-size: 11px;
  color: #c7cbd3;
  font-weight: 700;
  margin-top: 2px;
}
.room-count {
  grid-column: 1 / -1;
  text-align: center;
  font-size: 11px;
  color: #7a8090;
  margin-top: 4px;
}

@keyframes room-select-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(61, 95, 255, 0.35);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(61, 95, 255, 0);
  }
}
.room-mini-selected {
  border-color: var(--brand);
  animation: room-select-pulse 2.4s ease-out infinite;
}
```

- [ ] **Step 3: 타입 체크**

Run: `npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: 브라우저 육안 확인**

Run: `npm run dev`, "캠 필수방 / 캠 선택방" 카드 클릭.
확인 항목: 2x2 그리드(좌측 캠 필수 2칸, 우측 캠 선택 2칸)가 올바르게 배치되는지, 좌측 상단 칸에 브랜드 컬러 테두리 + 펄스 애니메이션이 보이는지, 우측 두 칸에 곰 아바타가 우하단에 겹쳐 보이는지, 하단에 "4명 접속 중" 텍스트가 보이는지.

- [ ] **Step 5: 반응형 확인**

브라우저 개발자 도구에서 모바일 너비(예: 390px)로 뷰포트를 좁혀 `.cam-layout`이 세로 스택으로 전환되는 지점에서 `.room-grid`가 찌그러지거나 텍스트가 잘리지 않는지 확인.

- [ ] **Step 6: 커밋**

```bash
git add components/CameraSection.tsx app/globals.css
git commit -m "$(cat <<'EOF'
feat: replace room cam mock with 2x2 video tile grid

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
