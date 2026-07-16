import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { create } from "zustand";
import { useGameStore } from "./useGame";
import { GameConfig } from "@/game/core/GameConfig";
import { PlayerRole } from "@game/types";

// ---- Type & Interface ------------------------------------------------------
type GameBroadcastEvent = "move";
type GameBroadcastPayload = GameConfig

type PlayerPresence = {
  presence_ref: string;
  role: PlayerRole;
  token: string;
  joined_at: string;
};

interface GameChannel {
  channel: null | RealtimeChannel,
  player1Online: boolean,
  player2Online: boolean,
  subscribe: (gameId: string | null, role: PlayerRole, token: string) => Promise<void>
  send: (action: GameBroadcastEvent, payload: GameBroadcastPayload) => Promise<void>
}

// ---- Zustand's function ---------------------------------------------------
export const useGameChannel = create<GameChannel>((set, get) => ({
  channel: null,
  player1Online: false,
  player2Online: false,
  async subscribe(gameId: string | null, role: PlayerRole, token: string) {
    // Leave the previous game's realtime channel before joining another one.
    const old = get().channel;
    if (old) {
      await old.unsubscribe();
    }

    if (!gameId) return;

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

  async send(event: GameBroadcastEvent, payload: GameBroadcastPayload) {
    const channel = get().channel;

    if (channel) {
      await channel.send({
        type: "broadcast",
        event,
        payload,
      })
    }
  }
}));