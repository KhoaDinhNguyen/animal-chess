import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { create } from "zustand";
import { useGameStore } from "./useGame";

interface GameChannel {
  channel: null | RealtimeChannel,
  subscribe: (gameId: string | null) => void
  send: (action: string, payload: any) => void
}

export const useGameChannel = create<GameChannel>((set, get) => ({
  channel: null,
  async subscribe(gameId: string | null) {
    // cleanup old channel
    const old = get().channel;
    if (old) {
      await old.unsubscribe();
    }

    if (!gameId) return;

    // Listen channel
    const channel = supabase.channel(`game:${gameId}`).on("broadcast", { event: "move" }, ({ payload }) => {
      useGameStore.getState().setGameConfig(payload)
    }).subscribe();

    set({ channel });
  },

  async send(action: string, payload: any) {
    const channel = get().channel;

    if (channel) {
      await channel.send({
        type: "broadcast",
        event: action,
        payload: payload
      })
    }
  }
}));