import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Keyboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QUESTION_INPUT_ID, TextAsk } from "@/components/campus/TextAsk";
import { VoiceCard } from "@/components/campus/VoiceCard";
import { VideoCard } from "@/components/campus/VideoCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusConnect Multimodal Help" },
      {
        name: "description",
        content:
          "Get approved campus IT help by text, voice, or a short orientation video, with a human hand-off when needed.",
      },
      { property: "og:title", content: "CampusConnect Multimodal Help" },
      {
        property: "og:description",
        content: "Approved campus IT help by text, voice, or video — with a human hand-off when needed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TRANSCRIPT =
  "Hello. I am an AI-generated CampusConnect presenter, not a live staff member. You can use CampusConnect for approved campus IT help. Ask about password resets, secure campus Wi-Fi, or the IT Service Desk. Please do not share passwords, recovery codes, student records, or other private information. If the chatbot cannot support an answer from its approved guide, it will direct you to a human. This video is a prerecorded introduction. You can read the same script in our GitHub project.";

function Index() {
  const [showTranscript, setShowTranscript] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  function focusTextInput() {
    const input = document.getElementById(QUESTION_INPUT_ID);
    input?.scrollIntoView({ block: "center" });
    input?.focus({ preventScroll: true });
  }

  function toggleTranscript() {
    const next = !showTranscript;
    setShowTranscript(next);
    if (next) requestAnimationFrame(() => transcriptRef.current?.focus());
  }

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="campus-hero border-b border-border">
        <div className="mx-auto max-w-3xl px-5 pb-10 pt-12 sm:pt-16">
          <p className="campus-eyebrow">CampusConnect · Campus IT help</p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
            CampusConnect Multimodal Help
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Type, talk, or watch. Every answer comes from the approved guide, and anything it can’t
            support goes to a person.
          </p>
        </div>
      </header>

      <main id="main" className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-10">
        <TextAsk />
        <VoiceCard />
        <VideoCard />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" size="lg" onClick={focusTextInput}>
            <Keyboard aria-hidden /> Use text instead
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={toggleTranscript}
            aria-expanded={showTranscript}
            aria-controls="video-transcript"
          >
            <FileText aria-hidden /> Read video transcript
          </Button>
        </div>

        {showTranscript && (
          <div
            id="video-transcript"
            ref={transcriptRef}
            tabIndex={-1}
            role="region"
            aria-label="Video transcript"
            className="campus-card p-6"
          >
            <h2 className="text-xl font-semibold">Video transcript</h2>
            <p className="mt-2">{TRANSCRIPT}</p>
          </div>
        )}

        <p
          role="note"
          className="rounded-lg border border-notice-border bg-notice p-4 text-notice-foreground"
        >
          If voice or video is unavailable, type your question. Unsupported questions are referred to
          a human.
        </p>
      </main>
    </div>
  );
}
