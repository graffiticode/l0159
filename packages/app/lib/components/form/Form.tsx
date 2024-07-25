import "../../index.css";
// import { useState, useEffect } from "react";

// import { ThemeToggle } from "./ThemeToggle";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

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
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 xl:gap-x-8">
      {cards.map((card, index) => (
        <li key={index} className="relative">
          <div
        onClick={() => flipCard(index)}
        className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100">
          {
            card.flipped &&
              <div className="flex items-center justify-center my-auto py-auto">{card.title}</div> ||
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
  )
}
