"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { StarIcon } from "./icons";
import { trackEvent } from "@/lib/gtag";

const CHIPS = [
  { label: "같은 시험/자격증", row: "exam", note: "같은 시험/자격증 응시자만 매칭됩니다." },
  { label: "목표 시험일", row: "date", note: "목표 시험일 차이 14일 이내로 매칭됩니다." },
  { label: "현재 진도", row: "progress", note: "현재 진도 차이 ±10% 이내 그룹으로 매칭됩니다." },
  { label: "하루 목표 시간", row: "hours", note: "하루 목표 시간 4~6시간대 그룹으로 매칭됩니다." },
  { label: "선호 강도", row: "intensity", note: "선호 강도(느슨함/보통/빡셈)가 비슷한 그룹으로 매칭됩니다." },
  { label: "캠 공개 가능 여부", row: "cam", note: "타임랩스 업로드 허용 여부가 맞는 그룹으로 매칭됩니다." },
  { label: "질문/소통 원하는 정도", row: "", note: "소통을 적당히 원하는 그룹으로 매칭됩니다." },
];

const PREVIEW_ROWS = [
  { row: "exam", k: "시험", v: "9급 공무원" },
  { row: "date", k: "목표일", v: "2026.10.12" },
  { row: "progress", k: "평균 진도", v: "45%" },
  { row: "hours", k: "하루 목표", v: "5시간" },
  { row: "intensity", k: "강도", v: "보통" },
  { row: "cam", k: "캠 방식", v: "타임랩스" },
];

export function MatchingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CHIPS[activeIndex];

  return (
    <section id="matching">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">매칭 기준</div>
          <h2 className="section-title">
            공부 목표가 비슷해야,
            <br />
            같이 오래 갑니다
          </h2>
          <p className="section-desc">
            단순히 &apos;공부할 사람&apos;을 찾는 게 아니라, 나와 비슷한 속도와 목표를 가진 사람을
            찾습니다. 아래 기준을 눌러 매칭 방식을 확인해보세요.
          </p>
        </Reveal>

        <div className="match-layout">
          <Reveal>
            <div className="chip-list">
              {CHIPS.map((chip, i) => (
                <button
                  key={chip.label}
                  className={`chip ${i === activeIndex ? "active" : ""}`}
                  onClick={() => {
                    trackEvent("click_matching_chip", { label: chip.label });
                    setActiveIndex(i);
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
            <div className="chip-note">
              <StarIcon />
              <span>{active.note}</span>
            </div>
          </Reveal>

          <Reveal className="preview-card">
            <div className="pc-title">당신과 비슷한 스터디룸을 찾았어요</div>
            <div className="pc-fit">
              <span className="num">92</span>
              <span className="lbl">% 매칭 적합도</span>
            </div>
            {PREVIEW_ROWS.map((r) => (
              <div key={r.row} className={`pc-row ${active.row === r.row ? "hl" : ""}`}>
                <span className="k">{r.k}</span>
                <span className="v">{r.v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
