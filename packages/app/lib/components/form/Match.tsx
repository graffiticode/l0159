import katex from 'katex';
import 'katex/dist/katex.min.css';
import "../../index.css";
import React, { useEffect, useRef, useState } from "react";

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
    cards[index].flipped = !cards[index].flipped;
    setCards([...cards]);
    state.apply({
      type: "update",
      args: {
        cards,
      },
    });
  };
  return (
    cards.length === 0 && <div></div> ||
      <div className="grid grid-cols-12 border-green-300 border-blue-300 border-red-300">
        <div className="col-span-10">
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 xl:gap-x-8">
            { cards.map((card, index) => (
              <li key={index} className="relative">
                <div
                  onClick={() => flipCard(index)}
                  className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden"
                >
                  {
                    card.flipped &&
                      <div
                        className={classNames(
                          "flex items-center justify-center my-auto py-auto rounded-lg",
                          card.matched &&
                            "border border-2 border-green-300" ||
                            "border border-2 border-blue-600"
                        )}>
                        {
                          card.face.indexOf("https") >= 0 &&
                            <img alt="" src={card.face} className="p-2 pointer-events-none object-cover group-hover:opacity-75" /> ||
                            <div className="text-xl font-bold text-slate-700">
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
                              <div className="text-xl font-bold text-slate-700">
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
        </div>
      </div>
  )
}
