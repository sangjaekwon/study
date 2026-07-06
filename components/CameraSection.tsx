"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { TimelapseIcon, CharacterIcon, RoomIcon, ClockIcon, PlayIcon } from "./icons";
import { DeskCamScene, CharacterCamScene, RoomCamGrid } from "./cam-illustrations";
import { trackEvent } from "@/lib/gtag";

type CamKey = "timelapse" | "char" | "room";

const CAM_CARDS: { key: CamKey; title: string; desc: string; Icon: typeof TimelapseIcon }[] = [
  {
    key: "timelapse",
    title: "공부 타임랩스 업로드",
    desc: "실시간 캠 대신, 공부하는 모습을 타임랩스로 찍어 업로드할 수 있습니다.",
    Icon: TimelapseIcon,
  },
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
  timelapse: { label: "타임랩스 업로드 미리보기", badge: "badge-good", badgeText: "집중 중" },
  char: { label: "캐릭터/상태 표시 미리보기", badge: "badge-good", badgeText: "집중 중" },
  room: { label: "캠 필수방 / 선택방 미리보기", badge: "badge-warn", badgeText: "휴식 중" },
};

export function CameraSection() {
  const [active, setActive] = useState<CamKey>("timelapse");
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
                onClick={() => {
                  trackEvent("click_cam_card", { label: title });
                  setActive(key);
                }}
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
                <span className="mono">{active === "timelapse" ? "TIMELAPSE" : "LIVE"}</span>
              </div>
              <div className="cam-frame">
                {active === "timelapse" ? (
                  <span className="timelapse-play-dot">
                    <PlayIcon />
                  </span>
                ) : (
                  <span className="rec-dot" />
                )}
                {active === "timelapse" && (
                  <>
                    <DeskCamScene />
                    <span className="char-status-chip">
                      <PlayIcon />
                      0:42 · 8배속 업로드됨
                    </span>
                  </>
                )}
                {active === "char" && (
                  <>
                    <CharacterCamScene />
                    <span className="char-status-chip">
                      <ClockIcon />
                      공부 중
                    </span>
                  </>
                )}
                {active === "room" && <RoomCamGrid />}
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
