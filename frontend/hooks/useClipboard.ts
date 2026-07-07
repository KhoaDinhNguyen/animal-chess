"use client";
import { useState } from "react";

type UseClipBoardReturn = [
  copied: boolean,
  handleCopy: (copyText: string) => void
]

export function useClipBoard(): UseClipBoardReturn {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (copyText: string) => {
    try {
      await navigator.clipboard.writeText(copyText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (err) {
      console.log(err);
    }
  }

  return [copied, handleCopy];
}