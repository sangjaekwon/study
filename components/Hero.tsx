"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "./icons";
import { trackEvent } from "@/lib/gtag";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const AVATARS = [
  { label: "민", delay: 0.1 },
  { label: "현", delay: 0.25 },
  { label: "지", delay: 0.4 },
  { label: "서", delay: 0.55 },
  { label: "+1", delay: 0.7 },
];

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            if (reduced) {
              setFit(92);
              return;
            }
            let n = 0;
            const step = () => {
              n += 3;
              if (n >= 92) {
                setFit(92);
                return;
              }
              setFit(n);
              requestAnimationFrame(step);
            };
            step();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="hero">
      <div className="wrap hero-inner">
        <div>
          <div className="eyebrow fade-item">진도·목표 기반 매칭 캠스터디</div>
          <h1 className="fade-item">
            아무 캠스터디 말고,
            <br />
            <span>나랑 진도 맞는</span> 스터디
          </h1>
          <p className="hero-sub fade-item">
            같은 시험, 비슷한 목표일, 비슷한 진도의 사람들과 자동으로 매칭됩니다. 캠 부담은 줄이고,
            타이머와 출석 관리는 자동으로 운영하세요.
          </p>
          <div className="cta-row fade-item">
            <button
              className="btn-primary"
              onClick={() => {
                trackEvent("click_hero_primary_cta", { label: "내 스터디 매칭 받아보기" });
                scrollToId("cta-final");
              }}
            >
              내 스터디 매칭 받아보기
            </button>
            <button
              className="btn-ghost"
              onClick={() => {
                trackEvent("click_hero_secondary_cta", { label: "어떻게 매칭되는지 보기" });
                scrollToId("matching");
              }}
            >
              어떻게 매칭되는지 보기 →
            </button>
          </div>
          <div className="check-row fade-item">
            <span className="check-item">
              <CheckIcon />
              진도·목표 기반 매칭
            </span>
            <span className="check-item">
              <CheckIcon />
              자동 타이머 운영
            </span>
            <span className="check-item">
              <CheckIcon />
              캠 부담 최소화
            </span>
          </div>
        </div>

        <div className="phone-stage" ref={stageRef}>
          <div className="phone phone-back">
            <div className="phone-screen">
              <div className="phone-statusbar">
                <span>9:41</span>
                <span>●●● 100%</span>
              </div>
              <div className="phone-app-logo">
                <span className="dot" />
                진도싱크 · 스터디룸
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="app-card" style={{ marginBottom: 0 }}>
                  <div className="k">추천 스터디룸 1</div>
                  <div className="v">9급 공무원 · 적합도 92%</div>
                </div>
                <div className="app-card" style={{ marginBottom: 0 }}>
                  <div className="k">추천 스터디룸 2</div>
                  <div className="v">9급 공무원 · 적합도 88%</div>
                </div>
                <div className="app-card" style={{ marginBottom: 0 }}>
                  <div className="k">추천 스터디룸 3</div>
                  <div className="v">7급 공무원 · 적합도 81%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="phone phone-front">
            <div className="phone-screen">
              <div className="phone-statusbar">
                <span>9:41</span>
                <span>●●● 100%</span>
              </div>
              <div className="phone-app-logo">
                <span className="dot" />
                진도싱크
              </div>

              <div className="app-card">
                <div className="k">공무원 시험</div>
                <div className="v">
                  <span className="dday-badge">D-84</span>
                </div>
                <div style={{ marginTop: 9, fontSize: 11, color: "var(--ink-faint)", fontWeight: 600 }}>
                  현재 진도 · 행정법
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: "42%" }} />
                </div>
                <div style={{ marginTop: 4, fontSize: 11, fontWeight: 800 }}>42%</div>
              </div>

              <div className="stat-grid">
                <div className="stat-chip">
                  <div className="k">오늘 목표</div>
                  <div className="v">5시간</div>
                </div>
                <div className="stat-chip">
                  <div className="k">선호 강도</div>
                  <div className="v">보통</div>
                </div>
                <div className="stat-chip">
                  <div className="k">캠 방식</div>
                  <div className="v">책상캠</div>
                </div>
              </div>

              <div className="match-card">
                <div className="k">매칭 적합도</div>
                <div className="match-fit">
                  <span>{fit}</span>
                  <span>%</span>
                </div>
                <div className="match-sub">추천 스터디룸 3개 · 지금 바로 입장 가능</div>
              </div>

              <div className="session-card">
                <div className="session-top">
                  <span className="k">
                    <span className="live-dot" />
                    50분 집중 세션 진행 중
                  </span>
                </div>
                <div className="session-timer">34:12</div>
                <div className="session-progress">
                  <i style={{ width: "68%" }} />
                </div>
                <div className="avatar-row">
                  {AVATARS.map((a) => (
                    <div key={a.label} className="avatar" style={{ animationDelay: `${a.delay}s` }}>
                      {a.label}
                    </div>
                  ))}
                  <span className="avatar-label">참가자 5명</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
