import { Reveal } from "./Reveal";

const PROBLEMS = [
  {
    num: "01",
    title: "목표가 다른 사람들과 섞입니다",
    desc: "같은 공부방에 있어도 시험, 진도, 압박감이 다르면 리듬이 맞지 않습니다.",
  },
  {
    num: "02",
    title: "방장에게 운영이 몰립니다",
    desc: "타이머, 출석, 지각 체크를 사람이 직접 관리하면 금방 느슨해집니다.",
  },
  {
    num: "03",
    title: "캠 공개가 부담스럽습니다",
    desc: "얼굴 전체 공개가 부담스러워 시작조차 망설이게 됩니다.",
  },
  {
    num: "04",
    title: "이탈 관리가 어렵습니다",
    desc: "지각, 중도 이탈, 목표 미달이 쌓여도 명확하게 관리되지 않습니다.",
  },
];

export function ProblemSection() {
  return (
    <section className="section-alt">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">문제 제기</div>
          <h2 className="section-title">
            캠스터디, 왜 시작은 쉬운데
            <br />
            오래 못 갈까요?
          </h2>
        </Reveal>
        <div className="problem-grid">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.num} className="problem-card" delayMs={i * 90}>
              <div className="problem-num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
