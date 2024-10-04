import React from "react"; React;  // for emacs jsx mode
import katex from 'katex';
import 'katex/dist/katex.min.css';
import "../../index.css";
import { useEffect, useRef, useState } from "react";

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

export const Match = ({ state }) => {
  const [ cards, setCards ] = useState([]);
  useEffect(() => {
    const { cards } = state.data;
    setCards(cards);
  }, []);
  const flipCard = (index) => {
    if (!cards[index].matched) {
      cards[index].flipped = !cards[index].flipped;
    }
    const flippedCards = cards.filter(card => card.flipped);
    const count = flippedCards.length;
    if (count === 0) {
    } else if (count === 1) {
      cards[index].color = "blue";
    } else if (count === 2) {
      if (flippedCards[0].factId === flippedCards[1].factId) {
        flippedCards[0].matched = true;
        flippedCards[1].matched = true;
        if (cards[index].factId !== flippedCards[0].factId) {
          // Clicked on already matched card (flipped card count is still two).
          flippedCards.forEach(card => (
            card.flipped = false
          ));
        } else {
          cards[index].color = "blue";
        }
      } else {
        cards[index].color = "blue";
      }
    } else {
      // Turn flipped cards over.
      flippedCards.forEach(card => (
        card.color = card.matched && card.color || null,
        card.flipped = false
      ));
      // Flip current card face up.
      cards[index].color = "blue";
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
  return (
    cards.length === 0 &&
      <div /> ||
      <div className="grid grid-cols-12 border-green-300 border-blue-300 border-red-300">
        <div className="col-span-10">
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 xl:gap-x-8"> {
            cards.map((card, index) => {
              const { face, back, flipped, matched } = card;
              return (
                <li key={index} className="relative">
                  <div
                    onClick={() => flipCard(index)}
                    className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden"
                  > {
                    flipped &&
                      <div
                        className={classNames(
                          "flex items-center justify-center my-auto py-auto rounded-lg border border-2",
                          matched && "border-green-300" || "border-blue-600"
                        )}>
                        <div className="text-xl font-bold text-slate-700">
                          <KaTeX latex={face} />
                        </div>
                      </div> ||
                      <div
                        className={classNames(
                          "flex items-center justify-center my-auto py-auto rounded-lg border border-2",
                          matched && `bg-green-50 border-green-100`
                        )}> {
                          <div className="text-xl font-bold text-slate-700">
                            <KaTeX latex={back} />
                          </div>
                        }
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
      </div>
  )
}
