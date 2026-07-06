# CameraSection 미리보기 목업 리디자인 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `components/CameraSection.tsx`의 우측 미리보기(`.cam-frame`) 안에 있는 3종 목업(책상/손 캠, 캐릭터/상태, 캠 필수방/선택방)을 단순 div/그라디언트에서 정교한 SVG 일러스트 + 미묘한 CSS 애니메이션으로 교체한다.

**Architecture:** `components/icons.tsx`에 새 SVG 일러스트/아이콘 컴포넌트를 추가하고, `components/CameraSection.tsx`의 3개 분기(`active === "desk" | "char" | "room"`) 내부 마크업만 교체한다. `app/globals.css`에 목업 전용 스타일과 `@keyframes` 애니메이션을 추가한다. 좌측 `cam-card` 리스트, `CAM_CARDS`/`CAM_PREVIEW` 데이터 구조, 전체 그리드 레이아웃(`cam-layout`)은 변경하지 않는다.

**Tech Stack:** Next.js 16 / React 19 / TypeScript, 순수 CSS (`app/globals.css`), 인라인 SVG. 추가 라이브러리 없음.

## Global Constraints

- 이 저장소에는 테스트 러너가 없다(`package.json`의 스크립트는 `dev`/`build`/`start`뿐). 각 태스크의 검증은 `npm run build` 타입체크 + `npm run dev`를 통한 브라우저 육안 확인으로 대체한다.
- 애니메이션은 순수 CSS `@keyframes`만 사용한다 (spec: "추가 라이브러리 없음").
- `.cam-preview` 배경은 라이트/다크 테마와 무관하게 항상 `#14161a` 고정이므로, 새 컴포넌트에 별도 다크모드 분기는 만들지 않는다 (spec 결정 사항).
- 기존 `CamKey`/`CAM_CARDS`/`CAM_PREVIEW` 데이터 구조, 좌측 `cam-card` 리스트, `cam-layout` 그리드는 변경하지 않는다 (spec 범위: "우측 미리보기 목업 3종만").

---

## 참고: 현재 코드 상태

- `components/icons.tsx` — 24x24 viewBox, `stroke="currentColor"` 패턴을 쓰는 아이콘 컴포넌트들이 정의된 파일. 새 컴포넌트는 이 파일 끝에 추가한다.
- `components/CameraSection.tsx` — 41~101번 줄에 `.cam-frame` 내부 3개 조건부 렌더링 블록(`active === "desk"`, `"char"`, `"room"`)이 있다.
- `app/globals.css` — 743~926번 줄이 `/* ---------- Camera section ---------- */` 블록이다. `.desk-mock`, `.char-mock`, `.char-avatar`, `.room-mock`, `.room-tile`, `.room-icon`이 여기 정의되어 있다.
- 브랜드 컬러 변수(`:root`, `app/globals.css:3~24`): `--brand: #3d5fff`, `--brand-deep: #2743db`, `--brand-soft: #eaeeff`, `--brand-soft-2: #dce3ff`.

---

### Task 1: 책상/손 캠 일러스트

**Files:**
- Modify: `components/icons.tsx` (파일 끝에 추가)
- Modify: `components/CameraSection.tsx:73-77`
- Modify: `app/globals.css:857-882` (`.desk-mock`, `.desk-mock::before`, `.desk-mock .hand` 블록 교체)

**Interfaces:**
- Produces: `DeskCamIllustration()` — props 없는 React 컴포넌트, `<svg viewBox="0 0 220 170" className="desk-illust">`를 반환. `CameraSection.tsx`에서 `<DeskCamIllustration />`로 사용.

- [ ] **Step 1: `components/icons.tsx` 파일 끝에 `DeskCamIllustration` 추가**

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

      {/* 머그컵 */}
      <g transform="translate(150 26)">
        <path d="M0 12a17 17 0 0034 0V2H0v10z" fill="#e7e2d6" />
        <path d="M34 8h6a6 6 0 010 12h-6" stroke="#e7e2d6" strokeWidth="3" fill="none" />
      </g>

      {/* 노트 */}
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

      {/* 손 + 펜 */}
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

- [ ] **Step 2: `components/CameraSection.tsx` import 수정**

`components/CameraSection.tsx:5`의 기존 줄:

```tsx
import { DeskIcon, CharacterIcon, RoomIcon } from "./icons";
```

다음으로 교체:

```tsx
import { DeskIcon, CharacterIcon, RoomIcon, DeskCamIllustration } from "./icons";
```

- [ ] **Step 3: `components/CameraSection.tsx:73-77`의 desk-mock 마크업 교체**

기존:

```tsx
                {active === "desk" && (
                  <div className="desk-mock">
                    <div className="hand" />
                  </div>
                )}
```

다음으로 교체:

```tsx
                {active === "desk" && (
                  <div className="desk-mock">
                    <DeskCamIllustration />
                  </div>
                )}
```

- [ ] **Step 4: `app/globals.css:857-882`의 `.desk-mock` 관련 블록 교체**

기존:

```css
.desk-mock {
  width: 82%;
  height: 72%;
  border-radius: 12px;
  background: linear-gradient(160deg, #2b2e36, #1b1d22);
  position: relative;
  display: grid;
  place-items: center;
}
.desk-mock::before {
  content: "";
  position: absolute;
  width: 60%;
  height: 6px;
  background: #3a3d46;
  bottom: 26%;
  border-radius: 4px;
}
.desk-mock .hand {
  width: 46%;
  height: 30%;
  background: #c99a73;
  border-radius: 40% 40% 30% 30%;
  position: absolute;
  bottom: 14%;
}
```

다음으로 교체:

```css
.desk-mock {
  width: 88%;
  height: 82%;
  display: grid;
  place-items: center;
}
.desk-illust {
  width: 100%;
  height: 100%;
}

@keyframes note-write {
  0%,
  15% {
    stroke-dashoffset: var(--len);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  45%,
  70% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  85%,
  100% {
    stroke-dashoffset: var(--len);
    opacity: 0;
  }
}
.note-line {
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
  animation: note-write 3.6s ease-in-out infinite;
}
.note-line-1 {
  --len: 58;
  animation-delay: 0s;
}
.note-line-2 {
  --len: 48;
  animation-delay: 0.5s;
}
.note-line-3 {
  --len: 54;
  animation-delay: 1s;
}

@keyframes pen-write {
  0%,
  100% {
    transform: rotate(18deg) translateX(0);
  }
  50% {
    transform: rotate(18deg) translateX(-4px);
  }
}
.pen {
  transform-origin: 33.5px 7px;
  animation: pen-write 1.4s ease-in-out infinite;
}
```

- [ ] **Step 5: 타입체크로 검증**

Run: `npm run build`
Expected: 에러 없이 빌드 성공 (경고만 있어도 무방, `Failed to compile` 같은 에러가 없어야 함)

- [ ] **Step 6: 육안 확인**

Run: `npm run dev` 후 브라우저에서 카메라 섹션의 "책상/손 캠" 카드를 클릭. 노트북 위 손과 펜, 필기 줄이 순차적으로 그려지는 애니메이션이 자연스럽게 반복되는지 확인.

- [ ] **Step 7: 커밋**

```bash
git add components/icons.tsx components/CameraSection.tsx app/globals.css
git commit -m "$(cat <<'EOF'
feat: redesign desk/hand cam preview with animated SVG illustration

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: 캐릭터/상태 표시 일러스트

**Files:**
- Modify: `components/icons.tsx` (파일 끝에 추가)
- Modify: `components/CameraSection.tsx:5, 78-82`
- Modify: `app/globals.css:884-898` (`.char-mock`, `.char-avatar` 블록 교체)

**Interfaces:**
- Produces: `CharacterCamIllustration()` — props 없는 React 컴포넌트, `<svg viewBox="0 0 160 160" className="char-illust">`를 반환.

- [ ] **Step 1: `components/icons.tsx` 파일 끝에 `CharacterCamIllustration` 추가**

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

- [ ] **Step 2: `components/CameraSection.tsx` import에 `CharacterCamIllustration`, `ClockIcon` 추가**

`components/CameraSection.tsx:5`의 (Task 1에서 수정된) 줄:

```tsx
import { DeskIcon, CharacterIcon, RoomIcon, DeskCamIllustration } from "./icons";
```

다음으로 교체:

```tsx
import { DeskIcon, CharacterIcon, RoomIcon, DeskCamIllustration, CharacterCamIllustration, ClockIcon } from "./icons";
```

- [ ] **Step 3: `components/CameraSection.tsx:78-82`의 char-mock 마크업 교체**

기존:

```tsx
                {active === "char" && (
                  <div className="char-mock">
                    <div className="char-avatar">🐻</div>
                  </div>
                )}
```

다음으로 교체:

```tsx
                {active === "char" && (
                  <div className="char-mock">
                    <CharacterCamIllustration />
                    <span className="char-status-chip">
                      <ClockIcon />
                      공부 중
                    </span>
                  </div>
                )}
```

- [ ] **Step 4: `app/globals.css:884-898`의 `.char-mock`/`.char-avatar` 블록 교체**

기존:

```css
.char-mock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.char-avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: var(--brand-soft-2);
  display: grid;
  place-items: center;
  font-size: 30px;
}
```

다음으로 교체:

```css
.char-mock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.char-illust {
  width: 120px;
  height: 120px;
}
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
.char-status-chip svg {
  width: 14px;
  height: 14px;
}

@keyframes focus-pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.55;
  }
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}
.focus-ring {
  transform-origin: 80px 80px;
  animation: focus-pulse 2.4s ease-out infinite;
}
.focus-ring-2 {
  animation-delay: 1.2s;
}
```

- [ ] **Step 5: 타입체크로 검증**

Run: `npm run build`
Expected: 에러 없이 빌드 성공

- [ ] **Step 6: 육안 확인**

Run: `npm run dev` 후 "캐릭터/상태 표시" 카드를 클릭. 곰 캐릭터 주위 링이 은은하게 퍼져나가는 pulse 애니메이션과 하단 "공부 중" 상태 칩이 잘 보이는지 확인.

- [ ] **Step 7: 커밋**

```bash
git add components/icons.tsx components/CameraSection.tsx app/globals.css
git commit -m "$(cat <<'EOF'
feat: redesign character/status preview with animated bear illustration

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: 캠 필수방 / 캠 선택방 타일 아이콘

**Files:**
- Modify: `components/icons.tsx` (파일 끝에 추가)
- Modify: `components/CameraSection.tsx:5, 83-94`
- Modify: `app/globals.css:900-925` (`.room-mock`, `.room-tile`, `.room-tile span`, `.room-icon` 블록 교체)

**Interfaces:**
- Produces: `CameraFilledIcon()`, `CameraOffIcon()`, `MiniBearIcon()`, `PersonDotIcon()` — 모두 props 없는 24x24(또는 16x16) viewBox React 컴포넌트.

- [ ] **Step 1: `components/icons.tsx` 파일 끝에 4개 아이콘 추가**

```tsx
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
```

- [ ] **Step 2: `components/CameraSection.tsx` import에 4개 아이콘 추가**

`components/CameraSection.tsx:5`의 (Task 2에서 수정된) 줄:

```tsx
import { DeskIcon, CharacterIcon, RoomIcon, DeskCamIllustration, CharacterCamIllustration, ClockIcon } from "./icons";
```

다음으로 교체:

```tsx
import {
  DeskIcon,
  CharacterIcon,
  RoomIcon,
  DeskCamIllustration,
  CharacterCamIllustration,
  ClockIcon,
  CameraFilledIcon,
  CameraOffIcon,
  MiniBearIcon,
  PersonDotIcon,
} from "./icons";
```

- [ ] **Step 3: `components/CameraSection.tsx:83-94`의 room-mock 마크업 교체**

기존:

```tsx
                {active === "room" && (
                  <div className="room-mock">
                    <div className="room-tile">
                      <div className="room-icon" style={{ background: "var(--brand-soft-2)" }} />
                      <span>캠 필수</span>
                    </div>
                    <div className="room-tile">
                      <div className="room-icon" style={{ background: "#3A3D46" }} />
                      <span>캠 선택</span>
                    </div>
                  </div>
                )}
```

다음으로 교체:

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

- [ ] **Step 4: `app/globals.css:900-925`의 room 관련 블록 교체**

기존:

```css
.room-mock {
  display: flex;
  gap: 12px;
}
.room-tile {
  width: 90px;
  height: 100px;
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
  width: 26px;
  height: 26px;
  border-radius: 8px;
}
```

다음으로 교체:

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

- [ ] **Step 5: 타입체크로 검증**

Run: `npm run build`
Expected: 에러 없이 빌드 성공

- [ ] **Step 6: 육안 확인**

Run: `npm run dev` 후 "캠 필수방 / 캠 선택방" 카드를 클릭. 필수방 타일에 카메라 아이콘 + 4명 점 아이콘과 브랜드 컬러 pulse 테두리, 선택방 타일에 카메라-off 아이콘 + 곰 아이콘이 보이는지 확인.

- [ ] **Step 7: 커밋**

```bash
git add components/icons.tsx components/CameraSection.tsx app/globals.css
git commit -m "$(cat <<'EOF'
feat: redesign room-select preview tiles with icon illustrations

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: 반응형/최종 육안 QA

**Files:**
- 없음 (수정 없음, 확인만). 문제 발견 시 Task 1~3에서 수정한 파일(`app/globals.css`)에 후속 수정.

- [ ] **Step 1: 반응형 확인**

Run: `npm run dev`. 브라우저 창을 `app/globals.css:1298` 근처의 `.cam-layout` 모바일 브레이크포인트 폭 이하로 줄여서, 3개 목업(desk/char/room)이 좁은 폭에서도 찌그러지거나 넘치지 않는지 확인.

- [ ] **Step 2: 3개 카드 전환 확인**

브라우저에서 좌측 3개 `cam-card`를 순서대로 클릭하며 우측 미리보기가 각각 올바른 일러스트로 전환되는지, 애니메이션이 끊기지 않고 반복되는지 확인.

- [ ] **Step 3: 문제 발견 시 수정 후 커밋**

이상이 없으면 이 태스크는 커밋 없이 종료. 조정이 필요하면 `app/globals.css`를 수정하고:

```bash
git add app/globals.css
git commit -m "$(cat <<'EOF'
fix: adjust CameraSection mockup visual QA issues

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
