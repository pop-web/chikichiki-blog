import type { FC, ReactNode } from "react";
import { clsx } from "@mantine/core";
import { useRouter } from "next/router";
import { SITE_TITLE } from "@/constants";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children, ...pageProps }) => {
  const router = useRouter();

  return (
    <div className="bg-slate-100">
      <header className="py-1">
        <div
          className={clsx(
            "mx-auto w-fit cursor-pointer py-4",
            "hover:title-drop-shadow transition duration-1000 ease-in hover:text-white"
          )}
          onClick={() => router.push("/")}
        >
          <h1 className="font-baloo text-[42px] leading-none">{SITE_TITLE}</h1>
        </div>
      </header>
      <main className="relative z-10 mb-40 min-h-[calc(100vh-102px)] w-full bg-slate-100">
        <div className=" mx-auto max-w-[1280px]">{children}</div>
      </main>
    </div>
  );
};
