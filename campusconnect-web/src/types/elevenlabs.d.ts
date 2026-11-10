import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-id": string;
        "always-expanded"?: string;
        transcript?: string;
      };
    }
  }
}
