import React from "react"; React;  // for emacs jsx mode

import { Flashcards } from "./Flashcards";
import { Match } from "./Match";
import { Memory } from "./Memory";

import "../../index.css";
import { useEffect } from "react";

const shuffle = unshuffled =>
      unshuffled.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

export const Form = ({ state }) => {
  const { type, pairs } = state.data;
  useEffect(() => {
    // Shuffle the deck with each reload.
    const keyCards = shuffle(pairs.map(pair => pair[0]));
    const valCards =
          type === "flashcards" && [] ||
          shuffle(pairs.map(pair => pair[1]));
    const cards = keyCards.concat(valCards);
    state.apply({
      type: "update",
      args: {
        cards,
      },
    });
  }, []);

  return (
    state.data.cards && (
      type === "flashcards" && <Flashcards state={state} /> ||
        type === "match" && <Match state={state} /> ||
        type === "memory" && <Memory state={state} /> ||
        <div />
    )
  )
}
