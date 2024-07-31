import { Palette } from "./Palette";
import "../../index.css";
import { useEffect, useState } from "react";

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

const shuffle = unshuffled =>
    unshuffled.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const nextPlayer = player => (
  player.color === "red" && {color: "blue"} || {color: "red"}
);

export const Form = ({ state }) => {
  const [ cards, setCards ] = useState(state.data.cards);
  const [ player, setPlayer ] = useState({color: "red"});

  const choosePlayer = (player) => {
    console.log("choosePlayer() player=" + JSON.stringify(player));
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
      if (flippedCards[0].factId === flippedCards[1].factId) {
        flippedCards[0].matched = true;
        flippedCards[1].matched = true;
        if (cards[index].factId !== flippedCards[0].factId) {
          // Clicked on already matched card (flipped card count is still two).
          flippedCards.forEach(card => (
            card.flipped = false
          ));
        } else {
          cards[index].color = player.color;
        }
      } else {
        cards[index].color = player.color;
        setPlayer(nextPlayer(player));
      }
    } else {
      // Turn flipped cards over.
      flippedCards.forEach(card => (
        card.color = card.matched && card.color || null,
        card.flipped = false
      ));
      // Flip current card face up.
      cards[index].color = player.color;
      cards[index].flipped = !cards[index].flipped;
    }
    setCards(cards);
    state.apply({
      type: "update",
      args: {
        cards,
      },
    });
  };

  useEffect(() => {
    // Shuffle the deck with each reload.
    const cards = shuffle(state.data.cards);
    setCards(cards);
    state.apply({
      type: "update",
      args: {
        cards,
      },
    });
  }, []);

  return (
    <div className="grid grid-cols-12 border-green-300 border-blue-300 border-red-300">
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
                 "flex items-center justify-center my-auto py-auto rounded-lg",
                 card.matched && "border border-2 border-green-300" || `border border-2 border-${card.color}-300`
                )}>
              {
                card.face.indexOf("https") >= 0 &&
                  <img alt="" src={card.face} className="p-2 pointer-events-none object-cover group-hover:opacity-75" /> ||
                  card.face
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
                    card.back ||
                    letters[index]
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
