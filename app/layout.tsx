import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "진도싱크 — 나랑 진도 맞는 캠스터디 매칭",
  description:
    "같은 시험, 비슷한 목표일, 비슷한 진도의 사람들과 자동으로 매칭되는 캠스터디 서비스. 진도싱크에서 나와 맞는 스터디를 찾아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
