"use client";

import { useEffect, useState } from "react";
import { FitMarkIcon } from "./icons";
import { trackEvent } from "@/lib/gtag";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="logo">
          <span className="logo-mark">
            <FitMarkIcon />
          </span>
          StudyFit
        </div>
        <button
          className="nav-cta"
          onClick={() => {
            trackEvent("click_nav_cta", { label: "사전 신청" });
            scrollToId("cta-final");
          }}
        >
          사전 신청
        </button>
      </div>
    </nav>
  );
}
