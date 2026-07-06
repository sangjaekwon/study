"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { trackEvent } from "@/lib/gtag";
import { supabase } from "@/lib/supabase";

export function FinalCta() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const exam = formData.get("exam") as string;
    const contact = formData.get("contact") as string;
    const request = formData.get("request") as string;

    const { error: insertError } = await supabase.from("signups").insert({ exam, contact, request });
    if (insertError) {
      setError(true);
      return;
    }

    trackEvent("submit_final_cta", { label: "사전 신청하기" });
    setError(false);
    setSubmitted(true);
    form.reset();
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
            <input name="exam" type="text" placeholder="준비 중인 시험/자격증을 입력해 주세요." required />
            <input name="contact" type="text" placeholder="연락처 또는 이메일을 입력해 주세요." required />
            <textarea
              name="request"
              placeholder="서비스에 꼭 있었으면 하는 기능이나 하고 싶은 말을 자유롭게 남겨주세요. (선택)"
              rows={3}
            />
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
            {error && (
              <div className="toast show" style={{ background: "var(--warn-soft)", color: "var(--warn)" }}>
                신청 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
