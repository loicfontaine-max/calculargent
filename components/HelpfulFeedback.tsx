"use client";

import { useState } from "react";

export function HelpfulFeedback({ title }: { title: string }) {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  if (answer) return <div className="feedback"><b>Merci pour votre retour.</b>{answer === "no" && <a className="textLink" href={`https://github.com/loicfontaine-max/calculargent/issues/new?title=${encodeURIComponent(`Amélioration : ${title}`)}`} target="_blank" rel="noreferrer">Décrire ce qui manque sur GitHub →</a>}</div>;
  return <div className="feedback"><b>Ce calcul vous a-t-il aidé ?</b><div><button type="button" onClick={() => setAnswer("yes")}>Oui</button><button type="button" onClick={() => setAnswer("no")}>Pas encore</button></div><small>Réponse conservée uniquement dans cette page.</small></div>;
}
