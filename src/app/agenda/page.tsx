"use client";

import { AgendaPage } from "@/components/Agenda";
import { useEffect, useState } from "react";

const Agenda = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Só renderiza o AgendaPage no cliente
  if (!isClient) return null;

  return <AgendaPage />;
};

export default Agenda;
