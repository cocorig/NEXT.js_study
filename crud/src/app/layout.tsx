// 기본적인 레이아웃 골격

import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "생활코딩",
  description: "Generated by create next app",
};

interface Topic {
  id: number;
  title: string;
  // Add any other properties present in your topic object
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resp = await fetch("http://localhost:9999/topics");
  const topics = await resp.json();
  // 데이터를 가져오는데 시간이 걸림 , 비효율적, 자바스크립트를 끄면 , 서버와통신하는 서비스는 표현이 x -> 어떻게 해결할까 -> 서버쪽에서 fetch하고, 실행이 끝날때 까지 await , 끝나면 json 으로 바꿔서 topics가져와서 글 목록을 동적으로 가져와 .next폴더에 저장해 정적인 내용만 client로 전달 (이 과정에서 javascript의 코드는 빼고 전달) -> 때문에 용량이 적음,
  console.log(topics);
  return (
    <html>
      <body>
        <Header />
        <ul>
          {topics.map((topic: Topic) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ul>
        {children}
      </body>
    </html>
  );
}

//서버 사이드에서 데이터를 미리 가져오고, 클라이언트에 정적 파일로 전달하는 방식으로 구현된 서버 사이드 렌더링 (SSR),fetch를 사용하여 서버 측에서 데이터를 가져오고, 가져온 데이터를 동적으로 화면에 렌더링하는 것은 좋은 접근이야. 클라이언트에게는 이미 처리된 데이터만 전달하여 용량을 줄일 수 있어서 효율적임
