import katex from 'katex';
import 'katex/dist/katex.min.css';

import { PageNav } from "./PageNav";

import "../../index.css";
import { useEffect, useRef } from "react";

const KaTeX = ({ latex }) => {
  const ref = useRef();
  useEffect(() => {
    katex.render(latex, ref.current, {
      displayMode: true,
      output: "html",
      throwOnError: true
    });
  }, [latex]);
  return <div ref={ref} />;
}

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

export const Flashcards = ({ state, cards }) => {
  const { cardIndex } = state.data;
  const flipCard = index => {
    cards[index].flipped = !cards[index].flipped;
    state.apply({
      type: "update",
      args: {
        cards,
      },
    });
  };
  return (
    <div className="grid grid-cols-12 border-green-300 border-blue-300 border-red-300">
      <div className="col-span-12">
      <ul role="list" className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 sm:gap-x-6 xl:gap-x-8">
      {
        cards.slice(cardIndex, cardIndex + 1).map((card, index) => (
          <li key={index} className="relative">
          <div
            onClick={() => flipCard(cardIndex)}
            className="group aspect-h-5 aspect-w-10 block w-full overflow-hidden"
          >
          {
            card.flipped &&
              <div
                className={classNames(
                 "flex items-center justify-center my-auto py-auto rounded-lg",
                 card.matched && "border border-2 border-green-300" || `border border-2 border-${card.color}-600`
                )}>
              {
                card.face.indexOf("https") >= 0 &&
                  <img alt="" src={card.face} className="p-2 pointer-events-none object-cover group-hover:opacity-75" /> ||
                  <div className="text-5xl font-bold text-slate-700">
                  <KaTeX latex={card.face} />
                  </div>
              }
              </div> ||
              <div
                className={classNames(
                 "flex items-center justify-center my-auto py-auto rounded-lg border border-2",
                  card.matched && `bg-${card.color}-100 border-${card.color}-300`
                )}>
              {
                !card.matched && (
                  card.back.indexOf("https") >= 0 &&
                    <img alt="" src={card.back} className="pointer-events-none group-hover:opacity-75" /> ||
                  <div className="text-5xl font-bold text-slate-700">
                  <KaTeX latex={card.back} />
                  </div>
                ) ||
                  <div />
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
      ))}
    </ul>
      <PageNav state={state} cards={cards} />
    </div>
      </div>
  )
}

