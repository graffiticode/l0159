import { Palette } from "./Palette";
import "../../index.css";
import { useState } from "react";

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

export const Form = ({ state }) => {
  const { cards } = state.data;
  const [ player, setPlayer ] = useState({color: "gray"});

  const choosePlayer = (player) => {
    setPlayer(player);
    state.apply({
      type: "update",
      args: {
        player: player,
        cards: cards.map(card => (card.flipped = false, card)),
      },
    });
  }

  const flipCard = index => {
    if (!cards[index].matched) {
      cards[index].flipped = !cards[index].flipped;
    }
    const flippedCards = cards.filter(card => card.flipped);
    const count = flippedCards.length;
    if (count === 0) {
    } else if (count === 1) {
      cards[index].color = player.color;
    } else if (count === 2) {
      cards[index].color = player.color;
      if (flippedCards[0].factId === flippedCards[1].factId) {
        flippedCards[0].matched = true;
        flippedCards[1].matched = true;
      }
    } else {
      flippedCards.forEach(card => card.flipped = false);
      cards[index].flipped = !cards[index].flipped;
    }
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
                 card.matched && "bg-green-200" || `bg-${card.color}-100`
                )}>
              {
                card.face.indexOf("https") >= 0 &&
                  <img alt="" src={card.face} className="pointer-events-none object-cover group-hover:opacity-75" /> ||
                  card.face
              }
              </div> ||
              <div
                className={classNames(
                 "flex items-center justify-center my-auto py-auto",
                 card.matched && `bg-${card.color}-100`
                )}>
              {
                !card.matched && (
                  card.back.indexOf("https") >= 0 &&
                    <img alt="" src={card.back} className="pointer-events-none object-cover group-hover:opacity-75" /> ||
                    card.back
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
