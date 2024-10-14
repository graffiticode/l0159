import React from "react"; React;   // for emacs jsx mode
import katex from 'katex';
import 'katex/dist/katex.min.css';

import { PageNav } from "./PageNav";

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

const BlankCard = () =>
<li key={-1} className="relative">
  <div className="group aspect-h-5 aspect-w-10 block w-full overflow-hidden">
    <div className="flex items-center justify-center my-auto py-auto">
      <div className="flex flex-col items-center justify-center rounded-lg m-4 border-gray-50 border border-0.5 shadow-lg w-11/12 h-5/6">
        <div className="text-xl font-medium tracking-wide text-slate-500">
          All done!
        </div>
        <div className="text-sm font-medium tracking-wide text-slate-500">
          Pick a new stack.
        </div>
      </div>
    </div>
  </div>
</li>

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
        len < 12 && "text-5xl" ||
        "text-4xl";
  return textSize;
}

export const Flashcards = ({ state }) => {
  const [ revealed, setRevealed ] = useState(false);
  const [ cards, setCards ] = useState([]);
  const [ cardIndex, setCardIndex ] = useState(0);
  useEffect(() => {
    const { cards, cardIndex } = state.data;
    setCards(cards);
    setCardIndex(cardIndex);
  }, []);
  const flipCard = () => {
    setRevealed(!revealed);
    setCards([...cards]);
  };
  return (
    cards.length === 0 && <div></div> ||
      <div className="grid grid-cols-12 border-green-300 border-blue-300 border-red-300">
        <div className="col-span-12">
          <ul role="list" className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 sm:gap-x-6 xl:gap-x-8">
            {
              cardIndex === -1 && <BlankCard /> ||
                cards.slice(cardIndex, cardIndex + 1).map((card, index) => (
                  <li key={index} className="relative">
                    <div
                      onClick={() => flipCard()}
                      className="group aspect-h-5 aspect-w-10 block w-full overflow-hidden"
                    > {
                      revealed &&
                        <div
                          className={classNames(
                            "flex items-center justify-center my-auto py-auto"
                          )}>
                          <div className="flex items-center justify-center rounded-lg m-4 border-gray-50 border border-0.5 shadow-lg w-11/12 h-5/6">
                            {
                              card.face.indexOf("https") >= 0 &&
                                <img alt="" src={card.face} className="p-2 pointer-events-none object-cover group-hover:opacity-75" /> ||
                                <div
                                  className={classNames(
                                    "font-bold text-slate-700",
                                    getTextSize(card.face)
                                  )}
                                >
                                  <KaTeX latex={card.face} />
                                </div>
                            }
                          </div>
                        </div> ||
                        <div
                          className={classNames(
                            "flex items-center justify-center py-auto my-auto"
                          )}>
                          <div className="flex items-center justify-center rounded-lg m-4 border-gray-50 border border-0.5 shadow-lg w-11/12 h-5/6">
                            {
                              !card.matched && (
                                card.back.indexOf("https") >= 0 &&
                                  <img alt="" src={card.back} className="pointer-events-none group-hover:opacity-75" /> ||
                                  <div
                                    className={classNames(
                                      "font-bold text-slate-700",
                                      getTextSize(card.back)
                                    )}
                                  >
                                    <KaTeX latex={card.back} />
                                  </div>
                              ) ||
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
                ))}
          </ul>
          <div className="mx-4">
            <PageNav
              state={state}
              revealed={revealed}
              setRevealed={setRevealed}
              cards={cards}
              setCards={setCards}
              cardIndex={cardIndex}
              setCardIndex={setCardIndex}
            />
          </div>
        </div>
      </div>
  )
}

