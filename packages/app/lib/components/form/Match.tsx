import React from "react"; React;  // for emacs jsx mode
import katex from 'katex';
import 'katex/dist/katex.min.css';
import "../../index.css";
import { useEffect, useRef, useState } from "react";
import backgroundImage from '../../images/blue-texture.png';

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

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

const shuffle = unshuffled =>
      unshuffled.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

const getTextSize = text => {
  const rawText = text
        .replace(/\\times/g, "x")
        .replace(/\\div/g, "/")
        .replace(/\\times/g, "x")
        .replace(/\\text/g, "")
        .replace(/\\underline/g, "")
        .replace(/{/g, "")
        .replace(/}/g, "")
        .replace(/\\,/g, "")
        .replace(/\\\s/g, "")
  const len = rawText.length;
  const textSize =
        len <= 4 && "text-xl"||
        len < 8 && "text-lg" ||
        len < 12 && "text-sm" ||
        "text-xs";
  return textSize;
}

const matchFacts = ({facts, flippedCards}) => (
  // It's a match if they have the same factId or they have the same fact value
  // but don't have the same face value (i.e. they aren't identical cards) and
  // aren't both the first fact of its pair.
  flippedCards[0].factId === flippedCards[1].factId || (
    facts[flippedCards[0].factId][0] === facts[flippedCards[1].factId][0] ||
      facts[flippedCards[0].factId][1] === facts[flippedCards[1].factId][1]
  ) && flippedCards[0].face !== flippedCards[1].face &&
    flippedCards[0].id % 2 !== flippedCards[1].id % 2
);

const BG_RED = "bg-[#FBC4B8]";
const BG_GREEN = "bg-[#D5EDBC]";
const BG_SKY = "bg-[#B5DDFF]";
const TEXT_BLACK = "text-[#364153]";

const RESHUFFLE = false;

export const Match = ({ state }) => {
  const [ cards, setCards ] = useState([]);
  const [ flippedCount, setFlippedCount ] = useState(0);
  useEffect(() => {
    const { cards } = state.data;
    const shuffledCards = RESHUFFLE && shuffle(cards) || cards;
    setCards(shuffledCards);
  }, []);

  const flipCards = index => {
    // index === -1 on blur.
    if (index >= 0 && !cards[index].matched) {
      cards[index].flipped = !cards[index].flipped;
    }
    const flippedCards = cards.filter(card => card.flipped);
    const count = flippedCards.length;
    setFlippedCount(count);
    if (count === 2) {
      const { facts } = state.data;
      if (matchFacts({facts, flippedCards})) {
        flippedCards[0].matched = true;
        flippedCards[1].matched = true;
        if (index < 0 ||
            cards[index].id !== flippedCards[0].id &&
            cards[index].id !== flippedCards[1].id) {
          // If clicked card is not a flipped card then flip it. This happens
          // when an already matched card is clicked so the flip count is still
          // two.
          flippedCards.forEach(card => (
            card.flipped = false
          ));
        }
      }
    } else if (index >= 0 && count > 2) {
      // If more than two cards are flipped then turn them all over.
      flippedCards.forEach(card => (
        card.flipped = false
      ));
      // And then flip current card face up again.
      cards[index].flipped = !cards[index].flipped;
    }
    setCards([...cards]);
    state.apply({
      type: "update",
      args: {
        cards,
      },
    });
  };

  const { useBgTexture } = state.data;
  return (
    cards.length === 0 &&
      <div /> ||
      <div
        className={classNames(
          "p-10 min-h-screen w-full bg-repeat bg-auto bg-center",
          BG_SKY
        )}
        style={
          useBgTexture && {
            backgroundImage: `url(${backgroundImage})`,
          } || {}
        }
      >
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 xl:gap-x-8">
          {
            cards.map((card, index) => {
              const { face, back, flipped, matched } = card;
              return (
                <li key={index} className="relative">
                  <div
                    onBlur={() => flipCards(-1)}
                    onClick={() => flipCards(index)}
                    className={classNames(
                      matched && !flipped && "hidden",
                      "group aspect-h-7 aspect-w-10 block w-full overflow-hidden"
                    )}
                  > {
                    flipped &&
                      <div
                        className={classNames(
                          "flex items-center justify-center my-auto py-auto"
                        )}>
                        <div
                          className={classNames(
                            "flex items-center justify-center w-11/12 h-5/6 font-bold text-slate-700 rounded-xl m-4 border-gray-50 border border-0.5 shadow-lg",
                            flippedCount !== 2 &&
                              "ring ring-4 ring-indigo-600 bg-white" ||
                              matched && BG_GREEN || BG_RED,
                            getTextSize(face)
                          )}>
                          <KaTeX latex={face} />
                        </div>
                      </div> ||
                      <div
                        className={classNames(
                          "flex items-center justify-center my-auto py-auto",
                        )}>
                        <div className={classNames(
                               "flex items-center justify-center w-11/12 h-5/6 font-bold rounded-xl m-4 border-gray-50 border border-0.5 shadow-lg",
                               TEXT_BLACK,
                               matched && BG_GREEN || "bg-white",
                               getTextSize(back)
                             )}
                        > {
                          !matched &&
                            <KaTeX latex={back} /> ||
                            <div />
                        }
                        </div>
                      </div>
                  }
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    >
                      <span className="sr-only">View details for {card.face}</span>
                    </button>
                  </div>
                </li>
              )})
          }
        </ul>
      </div>
  )
}
