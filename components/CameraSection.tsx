"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { DeskIcon, CharacterIcon, RoomIcon } from "./icons";

type CamKey = "desk" | "char" | "room";

const CAM_CARDS: { key: CamKey; title: string; desc: string; Icon: typeof DeskIcon }[] = [
  { key: "desk", title: "책상/손 캠", desc: "얼굴 대신 책상, 손, 필기 화면 일부만 공유합니다.", Icon: DeskIcon },
  {
    key: "char",
    title: "캐릭터/상태 표시",
    desc: "캠이 부담스러운 사용자는 캐릭터와 상태 표시로 참여할 수 있습니다.",
    Icon: CharacterIcon,
  },
  {
    key: "room",
    title: "캠 필수방 / 캠 선택방",
    desc: "캠 공개 성향에 맞는 방을 선택할 수 있습니다.",
    Icon: RoomIcon,
  },
];

const CAM_PREVIEW: Record<CamKey, { label: string; badge: "badge-good" | "badge-warn"; badgeText: string }> = {
  desk: { label: "책상/손 캠 미리보기", badge: "badge-good", badgeText: "집중 중" },
  char: { label: "캐릭터/상태 표시 미리보기", badge: "badge-good", badgeText: "집중 중" },
  room: { label: "캠 필수방 / 선택방 미리보기", badge: "badge-warn", badgeText: "휴식 중" },
};

export function CameraSection() {
  const [active, setActive] = useState<CamKey>("desk");
  const preview = CAM_PREVIEW[active];

  return (
    <section className="section-alt">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">캠 부담 완화</div>
          <h2 className="section-title">
            얼굴을 다 보여주지 않아도,
            <br />
            함께 공부하는 느낌은 유지됩니다
          </h2>
        </Reveal>

        <div className="cam-layout">
          <Reveal className="cam-cards">
            {CAM_CARDS.map(({ key, title, desc, Icon }) => (
              <button
                key={key}
                className={`cam-card ${active === key ? "active" : ""}`}
                onClick={() => setActive(key)}
              >
                <span className="cam-icon">
                  <Icon />
                </span>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </button>
            ))}
          </Reveal>

          <Reveal>
            <div className="cam-preview">
              <div className="cam-preview-top">
                <span>{preview.label}</span>
                <span className="mono">LIVE</span>
              </div>
              <div className="cam-frame">
                {active === "desk" && (
                  <div className="desk-mock">
                    <div className="hand" />
                  </div>
                )}
                {active === "char" && (
                  <div className="char-mock">
                    <div className="char-avatar">🐻</div>
                  </div>
                )}
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
                <span className={`badge ${preview.badge}`}>
                  <i className="badge-dot" />
                  {preview.badgeText}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
