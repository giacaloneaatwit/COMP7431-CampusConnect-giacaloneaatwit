import { useState, type FormEvent } from "react";
import { BookOpenCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { answerQuestion, HUMAN_HANDOFF, type GuideAnswer } from "@/lib/campus-guide";

export const QUESTION_INPUT_ID = "campus-question";

const EXAMPLES = [
  "How do I reset my password?",
  "How do I connect to secure campus Wi-Fi?",
  "How do I reach the IT Service Desk?",
];

export function TextAsk() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [result, setResult] = useState<GuideAnswer | null>(null);

  function ask(q: string) {
    setAsked(q.trim());
    setResult(answerQuestion(q));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(question);
  }

  return (
    <section aria-labelledby="text-ask-heading" className="campus-card p-6 sm:p-8">
      <p className="campus-eyebrow">Primary path</p>
      <h2 id="text-ask-heading" className="mt-1 text-2xl font-semibold sm:text-3xl">
        Ask a question
      </h2>
      <p className="mt-2 text-muted-foreground">
        Answers come only from the approved CampusConnect IT guide, with the source and owner shown.
      </p>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor={QUESTION_INPUT_ID} className="sr-only">
          Your question
        </label>
        <input
          id={QUESTION_INPUT_ID}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. How do I reset my password?"
          autoComplete="off"
          maxLength={300}
          className="h-12 flex-1 rounded-lg border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground"
        />
        <Button type="submit" size="lg" className="h-12">
          Ask
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2" aria-label="Example questions">
        {EXAMPLES.map((ex) => (
          <Button
            key={ex}
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              setQuestion(ex);
              ask(ex);
            }}
          >
            {ex}
          </Button>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Please don’t type passwords, recovery codes, student records, or other private information.
      </p>

      <div aria-live="polite" className="mt-5">
        {result && <AnswerPanel question={asked} result={result} />}
      </div>
    </section>
  );
}

function AnswerPanel({ question, result }: { question: string; result: GuideAnswer }) {
  if (result.kind === "handoff") {
    const message =
      result.reason === "sensitive"
        ? "For your safety, I didn’t process that message because it looks like it contains private information. Please remove it and ask again, or contact the IT Service Desk."
        : result.reason === "empty"
          ? "Type a question first."
          : HUMAN_HANDOFF;
    return (
      <div className="rounded-lg border border-notice-border bg-notice p-5 text-notice-foreground">
        <p className="flex items-center gap-2 font-semibold">
          <UserRound aria-hidden className="size-5" /> Referred to a human
        </p>
        <p className="mt-2">{message}</p>
      </div>
    );
  }

  const { source, isActionRequest } = result;
  return (
    <article className="rounded-lg border border-border bg-background p-5">
      {question && <p className="text-sm text-muted-foreground">You asked: “{question}”</p>}
      <h3 className="mt-1 text-xl font-semibold">{source.title}</h3>
      {isActionRequest && (
        <p className="mt-2 rounded-md bg-notice p-3 text-sm text-notice-foreground">
          I can’t take actions on your account. Here is the approved guidance so you can do it yourself.
        </p>
      )}
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {source.guidance.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
      <dl className="mt-4 grid gap-x-6 gap-y-1 border-t border-border pt-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold">Source</dt>
          <dd className="flex items-center gap-1 text-muted-foreground">
            <BookOpenCheck aria-hidden className="size-4" /> {source.file}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Owner</dt>
          <dd className="text-muted-foreground">{source.owner}</dd>
        </div>
        <div>
          <dt className="font-semibold">Reviewed</dt>
          <dd className="text-muted-foreground">{source.reviewed}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">
        Synthetic classroom data — not real university policy. Still stuck? Contact the IT Service Desk.
      </p>
    </article>
  );
}
