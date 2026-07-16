"use client";

import { SearchX, RotateCcw, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import AppButton from "@/components/button/AppButton";

// Not found page
export default function NotFoundGame() {
  const router = useRouter();

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative">
        {/** Background watermark */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden select-none flex items-center justify-center"
          aria-hidden="true">
          <SearchX size={320} style={{ color: "#c8892a", opacity: 0.03 }} />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <ErrorCode />

          <ErrorIcon />

          <ErrorHeading />

          <DividerIndicator />

          <ErrorBody />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AppButton
              variant="primary"
              type="button"
              className="flex items-center gap-2 px-7 py-3 text-sm tracking-[0.15em] duration-200 hover:scale-105 active:scale-100"
              onClick={() => router.refresh()}>
              <RotateCcw size={15} />
              Try Again
            </AppButton>
            <AppButton
              variant="secondary"
              type="button"
              className="flex items-center gap-2 px-7 py-3 text-sm tracking-[0.15em] duration-200 hover:scale-105 active:scale-100"
              onClick={() => router.push("/")}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(143,168,138,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <Home size={15} />
              Return Home
            </AppButton>
          </div>
        </div>
      </main>
    </>
  );
}

function ErrorCode() {
  return (
    <p
      className="text-8xl font-bold mb-2"
      style={{
        fontFamily: "'Cinzel Decorative', serif",
        color: "#c8892a",
        opacity: 0.18,
        lineHeight: 1,
        letterSpacing: "0.05em",
      }}>
      404
    </p>
  );
}

function ErrorIcon() {
  return (
    <div
      className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 -mt-6"
      style={{ background: "rgba(184,52,27,0.12)", border: "1px solid rgba(184,52,27,0.3)" }}>
      <SearchX size={28} style={{ color: "#b8341b" }} />
    </div>
  );
}

function ErrorHeading() {
  return (
    <h1 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#f0e4c2" }}>
      Game Not Found
    </h1>
  );
}

function DividerIndicator() {
  return (
    <div className="flex items-center justify-center gap-4 mb-5">
      <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #b8341b)" }} />
      <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif", color: "#8fa88a" }}>
        The jungle has no record of this game
      </span>
      <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #b8341b, transparent)" }} />
    </div>
  );
}

function ErrorBody() {
  return (
    <p className="text-sm leading-relaxed mb-10" style={{ color: "#8fa88a" }}>
      The game you are looking for may have ended, never existed, or the ID was entered incorrectly.
    </p>
  );
}
