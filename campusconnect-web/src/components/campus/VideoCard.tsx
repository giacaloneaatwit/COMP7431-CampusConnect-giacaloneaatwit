import { PlayCircle } from "lucide-react";

const HEYGEN_EMBED = "https://app.heygen.com/embeds/9525446eb7324cd88b262523e492dc62";

export function VideoCard() {
  return (
    <section aria-labelledby="video-heading" className="campus-card p-6 sm:p-8">
      <h2 id="video-heading" className="flex items-center gap-2 text-2xl font-semibold">
        <PlayCircle aria-hidden className="size-6 text-primary" /> Watch the orientation
      </h2>
      <p className="mt-2 text-muted-foreground">A short prerecorded introduction. Press play when ready.</p>
      <div className="mt-5 aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
        {/* No autoplay: the allow list omits "autoplay" and the src has no autoplay flag. */}
        <iframe
          src={HEYGEN_EMBED}
          title="CampusConnect orientation video with an AI-generated presenter"
          allow="encrypted-media; fullscreen"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
      <p className="mt-3 font-semibold text-foreground">
        AI-generated presenter — not a live staff member.
      </p>
    </section>
  );
}
