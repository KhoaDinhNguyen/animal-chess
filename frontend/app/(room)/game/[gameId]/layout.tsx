import { PageLogo } from "@/app/layout";
import HelpButton from "@/components/button/HelpButton";
import QuitButton from "@/components/button/QuitButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RoomHeader />
      {children}
    </>
  );
}

function RoomHeader() {
  return (
    <header
      className="relative z-50 flex items-center justify-between px-8 py-5 border-b"
      style={{ borderBottomColor: "#c8892a50" }}>
      <PageLogo />

      {/** Button lists */}
      <div className="flex items-center gap-2">
        <HelpButton />
        <QuitButton />
      </div>
    </header>
  );
}
