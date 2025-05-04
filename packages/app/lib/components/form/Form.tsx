import React from "react"; React;  // for emacs jsx mode

import { Flashcards } from "./Flashcards";
import { Match } from "./Match";
import { Memory } from "./Memory";

import "../../index.css";
import { useEffect, useRef } from "react";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import backgroundImage from '../../images/blue-texture.png';

const BG_SKY = "bg-[#B5DDFF]";

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

const KaTeX = ({ latex }) => {
  const ref = useRef();
  useEffect(() => {
    katex.render(latex, ref.current, {
      displayMode: true,
      output: "html",
      throwOnError: false,
    });
  }, [latex]);
  return <div ref={ref} />;
}

const shuffle = unshuffled =>
      unshuffled.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

export const Form = ({ state }) => {
  const { type, pairs, title } = state.data;
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

  const { useBgTexture } = state.data;
  return (
    state.data.cards && (
      <div
        className={classNames(
          "p-10 min-h-screen w-full bg-repeat bg-auto bg-center",
          BG_SKY
        )}
        style={
          useBgTexture && {
            backgroundImage: `url(${backgroundImage})`
          } || {}
        }
      >
        {title &&
          <div className="mb-4 text-center flex items-center justify-center h-20">
            <div className="text-5xl font-garamond">
              <KaTeX latex={title} />
            </div>
          </div>
        }
        {type === "flashcards" && <Flashcards state={state} /> ||
          type === "match" && <Match state={state} /> ||
          type === "memory" && <Memory state={state} /> ||
          <div />}
      </div>
    )
  )
}
