import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children, ...pageProps }) => {
  return (
    <div className="bg-slate-100">
      <main className="relative z-10 mb-40 min-h-[calc(100vh-102px)] w-full bg-slate-100">
        <div className=" mx-auto max-w-[1280px]">{children}</div>
      </main>
    </div>
  );
};
