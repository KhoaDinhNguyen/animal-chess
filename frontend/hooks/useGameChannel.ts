import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { create } from "zustand";
import { useGameStore } from "./useGame";

interface GameChannel {
  channel: null | RealtimeChannel,
  player1Online: boolean,
  player2Online: boolean,
  subscribe: (gameId: string | null, role: string, token: string) => void
  send: (action: string, payload: any) => Promise<void>
}

type PlayerPresence = {
  presence_ref: string;
  role: "player1" | "player2" | "spectator";
  token: string;
  joined_at: string;
};

export const useGameChannel = create<GameChannel>((set, get) => ({
  channel: null,
  player1Online: false,
  player2Online: false,
  async subscribe(gameId: string | null, role: string, token: string) {
    // cleanup old channel
    const old = get().channel;
    if (old) {
      await old.unsubscribe();
    }

    if (!gameId) return;

    // Listen channel
    const channel = supabase.channel(`game:${gameId}`, {
      config: {
        presence: {
          key: token
        }
      }
    });

    channel
      .on("broadcast", { event: "move" }, ({ payload }) => {
        useGameStore.getState().setGameConfig(payload)
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState() as Record<string, PlayerPresence[]>;

        const presences = Object.values(state).flat();

        set({
          player1Online: presences.some(p => p.role === "player1"),
          player2Online: presences.some(p => p.role === "player2"),
        });
      })

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          role: role,
          joined_at: new Date().toISOString(),
          token: token
        })
      }
    })
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