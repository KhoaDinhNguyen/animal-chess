"use client";

import { useEffect } from "react";
import { connectWithSocketServer } from "./socketConnection";

export default function SocketProvider() {
  useEffect(() => {
    connectWithSocketServer();
  }, []);

  return <></>;
}
