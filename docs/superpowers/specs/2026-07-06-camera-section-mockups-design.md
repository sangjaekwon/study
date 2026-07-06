# CameraSection 미리보기 목업 리디자인

## 배경
`components/CameraSection.tsx`의 우측 미리보기 프레임(`.cam-frame`)에 들어가는 3종 목업(`desk-mock`, `char-mock`, `room-mock`)이 단순 div + 그라디언트/단색 사각형으로만 구성되어 있어 성의 없어 보인다는 피드백. 좌측 선택 카드(`cam-card`) 3개와 전체 섹션 레이아웃(`cam-layout`)은 변경하지 않는다.

## 범위
- `components/icons.tsx`에 목업 전용 SVG 일러스트 컴포넌트 3개 추가
- `components/CameraSection.tsx`에서 기존 목업 div 마크업을 새 일러스트 컴포넌트로 교체
- `app/globals.css`에 각 일러스트용 애니메이션(keyframes) 및 스타일 보강

## 디자인

### 1. 책상/손 캠 (`DeskCamIllustration`)
- 탑뷰 책상: 스프링노트, 펜, 머그컵을 배치한 SVG 장면
- 손(손가락이 구분된 실루엣)이 노트 위에 놓여 있고, 펜 끝이 좌우로 미세하게 움직이는 필기 애니메이션 (`@keyframes pen-write`)
- 노트 위 필기 줄이 순차적으로 나타나는 보조 디테일

### 2. 캐릭터/상태 표시 (`CharacterCamIllustration`)
- 이모지 대신 벡터로 그린 둥근 곰 캐릭터(귀/눈/코)
- 캐릭터 주변에 브랜드 컬러 링이 은은하게 커졌다 작아지는 breathing pulse 애니메이션 (`@keyframes focus-pulse`)
- 캐릭터 아래 "공부 중" 텍스트 + 타이머 아이콘이 담긴 작은 상태 칩

### 3. 캠 필수방 / 캠 선택방 (`RoomCamIllustration`)
- 기존 밋밋한 사각 타일 2개 유지하되 내부에 미니 아이콘 추가
  - 필수방 타일: 카메라 아이콘 + 사람 실루엣 여러 명
  - 선택방 타일: 카메라-off 아이콘 + 캐릭터 아바타
- 활성(선택) 타일에 브랜드 컬러 테두리 + 살짝 커지는 select 애니메이션

## 구현 방식
- 기존 `CamKey`/`CAM_CARDS`/`CAM_PREVIEW` 데이터 구조는 그대로 유지
- `active === "desk" | "char" | "room"` 분기 내부의 div만 새 일러스트 컴포넌트 렌더링으로 교체
- 애니메이션은 순수 CSS `@keyframes`로 구현 (추가 라이브러리 없음)
- 다크 모드 대응: 기존 `.cam-preview` 배경(#14161a 고정)을 유지하므로 별도 다크/라이트 분기 불필요

## 테스트 계획
- `npm run dev`로 로컬 구동 후 브라우저에서 3개 카드를 각각 클릭해 목업이 올바르게 전환되는지, 애니메이션이 자연스러운지 육안 확인
- 반응형 브레이크포인트(`.cam-layout` 모바일 스택 지점)에서 목업이 찌그러지지 않는지 확인
