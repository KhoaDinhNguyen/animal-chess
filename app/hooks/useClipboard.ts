"use client";
import { useState } from "react";

type UseClipboardReturn = [
  copied: boolean,
  copyToClipboard: (copyText: string) => Promise<void>
]

const COPIED_FEEDBACK_MS = 2000;

/** Copies text and briefly marks the copy action as successful for UI feedback. */
export function useClipboard(): UseClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (copyText: string) => {
    try {
      await navigator.clipboard.writeText(copyText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, COPIED_FEEDBACK_MS);

    } catch (err) {
      console.log(err);
    }
  }

  return [copied, copyToClipboard];
}