"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { ClockIcon, SyncIcon, SwapIcon, CheckIcon } from "./icons";

const TOTAL_SEC = 50 * 60;
const START_SEC = 34 * 60 + 12;

type Status = "focus" | "away" | "back";
const STATUS_LABEL: Record<Status, string> = { focus: "집중 중", away: "자리 비움", back: "복귀 완료" };
const STATUS_CLASS: Record<Status, string> = { focus: "st-focus", away: "st-away", back: "st-back" };

const INITIAL_PARTICIPANTS: { name: string; initial: string; status: Status }[] = [
  { name: "민지", initial: "민", status: "focus" },
  { name: "현우", initial: "현", status: "focus" },
  { name: "지훈", initial: "지", status: "away" },
  { name: "서연", initial: "서", status: "back" },
];

const FEATURES = [
  { Icon: ClockIcon, title: "50분 공부 / 10분 휴식", desc: "방 규칙에 따라 세션 길이가 고정 운영됩니다." },
  { Icon: SyncIcon, title: "시작 · 종료 자동 동기화", desc: "모든 참가자의 세션이 같은 시각에 시작하고 끝납니다." },
  { Icon: SwapIcon, title: "휴식 자동 전환", desc: "공부 시간이 끝나면 별도 조작 없이 휴식으로 전환됩니다." },
  { Icon: CheckIcon, title: "복귀 체크 자동 반영", desc: "휴식 후 복귀 여부가 상태 리스트에 자동으로 기록됩니다." },
];

function formatTime(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function TimerSection() {
  const [curSec, setCurSec] = useState(START_SEC);
  const [participants, setParticipants] = useState(INITIAL_PARTICIPANTS);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = setInterval(() => {
      setCurSec((s) => (s <= 0 ? TOTAL_SEC : s - 1));
    }, 1000);

    const statuses: Status[] = ["focus", "away", "back"];
    const cycle = setInterval(() => {
      setParticipants((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const next = statuses[Math.floor(Math.random() * statuses.length)];
        return prev.map((p, i) => (i === idx ? { ...p, status: next } : p));
      });
    }, 3800);

    return () => {
      clearInterval(tick);
      clearInterval(cycle);
    };
  }, []);

  const fillPct = (1 - curSec / TOTAL_SEC) * 100;

  return (
    <section id="timer">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">자동 타이머</div>
          <h2 className="section-title">
            방장이 누르지 않아도,
            <br />
            세션은 자동으로 같이 흘러갑니다
          </h2>
          <p className="section-desc">
            방마다 정해진 규칙에 따라 공부, 휴식, 복귀 시간이 자동으로 동기화됩니다.
          </p>
        </Reveal>

        <div className="timer-layout">
          <Reveal className="timer-feats">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div className="timer-feat" key={title}>
                <span className="fi">
                  <Icon />
                </span>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="timer-card">
            <div className="timer-card-top">
              <span className="timer-mode">
                <span className="live-dot" style={{ boxShadow: "0 0 0 3px var(--brand-soft)" }} />
                집중 세션
              </span>
              <span className="timer-round">3라운드 · 50분 공부</span>
            </div>
            <div className="timer-display mono">{formatTime(curSec)}</div>
            <div className="timer-track">
              <div className="timer-fill" style={{ width: `${fillPct}%` }} />
            </div>
            <div className="participant-list">
              {participants.map((p) => (
                <div className="participant-row" key={p.name}>
                  <span className="participant-name">
                    <span className="p-avatar">{p.initial}</span>
                    {p.name}
                  </span>
                  <span className={`p-status ${STATUS_CLASS[p.status]}`}>{STATUS_LABEL[p.status]}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
