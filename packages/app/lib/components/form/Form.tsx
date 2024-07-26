import { Palette } from "./Palette";
import "../../index.css";
import { useState } from "react";

// import { ThemeToggle } from "./ThemeToggle";

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  console.log("classNames() className=" + className);
  return className;
}

// function renderJSON(data) {
//   delete data.schema;
//   delete data.theme;
//   return (
//     <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
//   );
// }

// function render({ state }) {
//   const { data } = state;
//   if (typeof data?.hello === "string") {
//     return <span className="text-sm">{`hello, ${data.hello}!`}</span>;
//   } else {
//     return renderJSON(data);
//   }
// }

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

export const Form = ({ state }) => {
  const { cards, source } = state.data;
  const [ player, setPlayer ] = useState({color: "gray"});

  const choosePlayer = (player) => {
    /*
    setHotBand(band);
    const newBands = [
      ...bands,
      band,
    ];
    */
    setPlayer(player);
    state.apply({
      type: "update",
      args: {
        player: player,
      },
    });
  }

  const flipCard = index => {
    cards[index].flipped = !cards[index].flipped;
    cards[index].color = player.color;
    state.apply({
      type: "update",
      args: {
        cards,
      },
    });
  };

  return (
    <div className="grid grid-cols-12">
      <Palette player={player} choosePlayer={choosePlayer} />
      <div className="col-span-11">
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 xl:gap-x-8">
      {cards.map((card, index) => (
          <li key={index} className="relative">
          <div
            onClick={() => flipCard(index)}
            className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden"
          >
          {
            card.flipped &&
              <div
               className={classNames(
                 "flex items-center justify-center my-auto py-auto",
                 `bg-${card.color}-50`
               )}>
              {card.title}
              </div> ||
              <img alt="" src={source} className="pointer-events-none object-cover group-hover:opacity-75" />
          }
          <button
        type="button"
        className="absolute inset-0 focus:outline-none"
          >
          <span className="sr-only">View details for {card.title}</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
      </div>
      </div>
  )
}
