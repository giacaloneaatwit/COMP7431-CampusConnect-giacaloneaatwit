import { useEffect } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { Mic } from "lucide-react";

// Public widget agent ID (safe to ship in the browser — not a secret).
const AGENT_ID = "agent_8401m5x6ky6mfe1t6bfrf1hh9f25";
const WIDGET_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";

function VoiceWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = WIDGET_SRC;
    s.async = true;
    s.type = "text/javascript";
    document.body.appendChild(s);
  }, []);

  return <elevenlabs-convai agent-id={AGENT_ID} always-expanded="true" transcript="true" />;
}

export function VoiceCard() {
  return (
    <section aria-labelledby="voice-heading" className="campus-card p-6 sm:p-8">
      <h2 id="voice-heading" className="flex items-center gap-2 text-2xl font-semibold">
        <Mic aria-hidden className="size-6 text-primary" /> Ask by voice
      </h2>
      <p className="mt-2 text-muted-foreground">
        Press the voice button to start talking. Nothing plays until you start a conversation, and
        your browser will ask before using your microphone.
      </p>
      <div className="voice-widget-frame mt-5">
        <ClientOnly
          fallback={<p className="p-4 text-sm text-muted-foreground">Loading voice assistant…</p>}
        >
          <VoiceWidget />
        </ClientOnly>
      </div>
    </section>
  );
}
