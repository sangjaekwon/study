import { Reveal } from "./Reveal";
import { LateIcon, ExitIcon, BarChartIcon, AlertIcon } from "./icons";

const AUTOMATIONS = [
  {
    Icon: LateIcon,
    cls: "c1",
    title: "지각 체크",
    desc: "세션 시작 이후 입장 시 지각으로 자동 기록됩니다.",
  },
  {
    Icon: ExitIcon,
    cls: "c2",
    title: "중도 이탈 기록",
    desc: "세션 종료 전 퇴장하면 이탈 이력으로 남습니다.",
  },
  {
    Icon: BarChartIcon,
    cls: "c3",
    title: "목표 시간 미달 표시",
    desc: "하루 목표 시간에 못 미치면 리포트에 표시됩니다.",
  },
  {
    Icon: AlertIcon,
    cls: "c4",
    title: "반복 미참여자 자동 알림",
    desc: "반복적으로 미참여하면 그룹 이탈 전 자동 알림이 발송됩니다.",
  },
];

const REPORT_STATS = [
  { num: "92%", lbl: "완주율" },
  { num: "4.6h", lbl: "평균 집중 시간" },
  { num: "2회", lbl: "자동 감지된 이탈" },
];

export function AutomationSection() {
  return (
    <section className="section-alt">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">운영 자동화</div>
          <h2 className="section-title">
            스터디 관리는 자동으로,
            <br />
            공부 리듬은 더 단단하게
          </h2>
        </Reveal>

        <div className="auto-grid">
          {AUTOMATIONS.map(({ Icon, cls, title, desc }, i) => (
            <Reveal key={title} className="auto-card" delayMs={i * 90}>
              <span className={`auto-icon ${cls}`}>
                <Icon />
              </span>
              <h4>{title}</h4>
              <p>{desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="report-strip">
          <div className="rs-label">세션 종료 후 완주율 리포트</div>
          <div className="report-stats">
            {REPORT_STATS.map((s) => (
              <div className="report-stat" key={s.lbl}>
                <div className="num mono">{s.num}</div>
                <div className="lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
