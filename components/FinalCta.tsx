"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return (
    <section id="cta-final">
      <div className="wrap">
        <Reveal className="final-cta">
          <div>
            <h2>
              지금 사전 신청하고,
              <br />
              나와 맞는 스터디 매칭 받기
            </h2>
            <p>
              출시 소식과 매칭 우선권을 가장 먼저 알려드려요. 스팸 없이 딱 필요한 소식만
              보내드립니다.
            </p>
          </div>
          <form className="final-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="준비 중인 시험/자격증을 입력해 주세요." required />
            <input type="text" placeholder="연락처 또는 이메일을 입력해 주세요." required />
            <label className="agree-row">
              <input type="checkbox" required />
              개인정보 수집 및 이용에 동의합니다.
            </label>
            <button type="submit" className="final-submit">
              사전 신청하기
            </button>
            <div className={`toast ${submitted ? "show" : ""}`}>
              신청이 접수됐어요. 매칭 오픈 시 가장 먼저 알려드릴게요.
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
