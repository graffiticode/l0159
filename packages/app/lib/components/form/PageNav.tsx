import React from "react"; React;
import { useEffect, useState } from "react";
import {
//  ArrowRightIcon,
//  ArrowLeftIcon,
  CheckIcon,
//  MinusIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'

import { RadioGroup } from '@headlessui/react'
import { FilterMenu } from "./FilterMenu";

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

const colors = {
  gray: "#DDDDDD",
  red: "#F78A72",
  yellow: "#EFCB4B",
  green: "#ACDC79",
  white: "#FFFFFF",
};

const bgClassname = mark =>
      mark === "#DDDDDD" && "bg-[#DDDDDD]" ||
      mark === "#F78A72" && "bg-[#F78A72]" ||
      mark === "#EFCB4B" && "bg-[#EFCB4B]" ||
      mark === "#ACDC79" && "bg-[#ACDC79]" ||
      "bg-[#FFFFFF] ring-1 ring-inset ring-gray-400";

const ringClassname = mark =>
      mark === "#DDDDDD" && "ring-[#DDDDDD]" ||
      mark === "#F78A72" && "ring-[#F78A72]" ||
      mark === "#EFCB4B" && "ring-[#EFCB4B]" ||
      mark === "#ACDC79" && "ring-[#ACDC79]" ||
      "bg-[#FFFFFF]";

const shuffle = unshuffled =>
      unshuffled.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

const RESHUFFLE = true;

export function PageNav({
  state,
  revealed,
  setRevealed,
  cards,
  setCards,
  cardIndex,
  setCardIndex,
}) {
  const rawMarks = [
    { id: 1, name: "Unmarked", color: colors.gray, count: 0 },
    { id: 2, name: "More practice", color: colors.red, count: 0 },
    { id: 3, name: "Got this!", color: colors.green, count: 0 },
    { id: 4, name: "All cards", color: colors.white, count: cards.length },
  ];
  const [ filterMark, setFilterMark ] = useState(colors.white);
  const [ selectedMark, setSelectedMark ] = useState(rawMarks[0]);
  const getMarkFromColor = color => rawMarks.find(mark => mark.color === color) || rawMarks[0];

  const handleFilterChange = filterMark => {
    const shuffledCards = RESHUFFLE && shuffle(cards);
    setCards(shuffledCards);
    setCardIndex(firstIndex(shuffledCards, filterMark));
    setFilterMark(filterMark);
  };

  useEffect(() => {
    handleFilterChange(colors.white);
  }, []);

  const marks = cards.reduce(
    (marks, card) =>
    marks.map(mark => (
      (mark.color === card.mark ||
       mark.color === colors.gray && card.mark === undefined) &&
        {...mark, count: mark.count + 1} ||
        mark
    )),
    rawMarks
  );

  // const prevIndex = () => {
  //   const reverseIndexMap = indexMap.reverse();
  //   const reverseCardIndex = cards.length - 1 - cardIndex;
  //   let index;
  //   index = reverseIndexMap.findIndex((val, index) => index > reverseCardIndex && val)
  //   if (index > -1) {
  //     return cards.length - 1 - index;
  //   }
  //   index = reverseIndexMap.findIndex((val, index) => index <= reverseCardIndex && val)
  //   if (index > -1) {
  //     return cards.length - 1 - index;
  //   }
  //   return -1;
  // }

  const nextIndex = () => {
    // Called when card.mark has changed, so recompute indexMap. Refactor.
    const indexMap =
          cards.map(card =>
            filterMark === colors.white ||
              filterMark === colors.gray && card.mark === undefined ||
              card.mark === filterMark);

    let index;
    index = indexMap.findIndex((val, index) => index > cardIndex && val)
    if (index > -1) {
      return index;
    }
    // index = indexMap.findIndex((val, index) => index <= cardIndex && val)
    // if (index > -1) {
    //   return index;
    // }
    return -1;
  }

  const firstIndex = (cards, filterMark) => {
    const indexMap = cards.map(card =>
      filterMark === colors.white ||
        filterMark === colors.gray && card.mark === undefined ||
        card.mark === filterMark
    );
    const index = indexMap.findIndex(val => val);
    if (index > -1) {
      return index;
    }
    return -1;
  }

  const filteredCount =
        cards.map(
          (card, index) =>
          (filterMark === colors.white ||
           filterMark === colors.gray && card.mark === undefined ||
           card.mark === filterMark) ?
            index :
            -1
        )
        .filter(index => index !== -1)
        .length;
  
  const filteredIndex =
        cards.map(
          (card, index) =>
          (filterMark === colors.white ||
           filterMark === colors.gray && card.mark === undefined ||
           card.mark === filterMark) ?
            index :
            -1
        )
        .filter(index => index !== -1)
        .findIndex(index => (
          index === cardIndex
        )) + 1;
  
  const { manualNav } = state.data;
  const handleChange = value => {
    if (manualNav) {
      setSelectedMark(value);
      setCards([...cards]);
      cards[cardIndex].selectedMark = value.color;
      state.apply({
        type: "update",
        args: {
          cards,
        }
      })
    } else {
      const card = cards[cardIndex];
      card.mark = value.color;
      setRevealed(false);
      setSelectedMark(marks[0]);
      setCards([...cards]);
      const newCardIndex = nextIndex();
      setCardIndex(newCardIndex);
      state.apply({
        type: "update",
        args: {
          cards,
          cardIndex: newCardIndex,
        }
      })
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-start bg-transparent px-4 sm:px-6 h-20 py-3 mt-2"
    >
      <div className="-mt-px flex flex-col w-0 flex-1 pt-0">
        <FilterMenu
          state={state}
          marks={marks}
          bgClassname={bgClassname}
          getMarkFromColor={getMarkFromColor}
          handleFilterChange={handleFilterChange}
          setRevealed={setRevealed}
        />
      </div>
      <div className="-mt-px flex items-center justify-center">
        {
          !revealed &&
            <a
              onClick={() => {
                if (filteredIndex === 0 && filteredCount > 0) {
                  handleFilterChange(filterMark)
                } else if (filteredIndex > 0) {
                  setRevealed(true);
                  state.apply({
                    type: "update",
                    args: {
                      cards,
                      cardIndex,
                    }
                  })
                }
              }}
            >
              <div
                className={classNames(
                  "font-light text-xs rounded-full px-6 p-2 mt-3",
                  filteredCount === 0 && "bg-gray-400 text-white" || "cursor-pointer text-white bg-indigo-600 hover:ring-2 ring-indigo-600"
                )}
              >
                {
                  filteredIndex === 0 && filteredCount > 0 &&
                    "Retry" ||
                    "Reveal"
                }
              </div>
            </a> ||
            <div className="flex-col justify-end w-48">
              <div className="-mt-px flex justify-end px-auto pt-1">
                <RadioGroup value={selectedMark} onChange={handleChange}>
                  <div className={
                         classNames(
                           "flex flex-col gap-2"
                         )}>
                    <RadioGroup.Option
                      key={rawMarks[1].name}
                      value={rawMarks[1]}
                      className={({ checked }) => (
                        classNames(
                          ringClassname(rawMarks[1].color),
                          checked ? 'ring ring-offset-1' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-start rounded-full p-0.5 focus:outline-none'
                        ))}>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          "bg-[#F78A72]",
                          "hover:bg-[#F77356]",
                          "active:bg-[#ED5B3B]",
                          'h-8 w-8 rounded-full')}
                      >
                        <XMarkIcon className="m-2 w-4 h-4" />
                      </span>
                      <RadioGroup.Label as="span" className="ml-2 text-xs font-normal">
                        I need more practice
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      key={rawMarks[2].name}
                      value={rawMarks[2]}
                      className={({ checked }) =>
                        classNames(
                          ringClassname(rawMarks[2].color),
                          checked ? 'ring ring-offset-1' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-start rounded-full p-0.5 focus:outline-none'
                        )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          "bg-[#ACDC79]",
                          "hover:bg-[#89C24E]",
                          "active:bg-[#669F2A]",
                          'h-8 w-8 rounded-full')}
                      >
                        <CheckIcon className="m-2 w-4 h-4" />
                      </span>
                      <RadioGroup.Label as="span" className="ml-2 text-xs front-normal">
                        I got this!
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                </div>
              </RadioGroup>
            </div>
          </div>
        }
    </div>
    <div className="-mt-px flex w-0 flex-1 justify-end">
      <p className="text-gray-700 text-center align-top pt-4 pr-2">
        {/*
          filteredCount < 1 &&
            <span className="text-sm font-normal">Stack empty. Pick another stack.</span> ||
          filteredIndex < 1 &&
            <span className="text-sm font-normal">All cards flipped</span> ||
            <>
              <span className="font-medium text-sm">{filteredIndex} / {' '}</span>
              <span className="font-medium text-sm">{filteredCount}</span>
            </>
         */}
        {
          filteredIndex > 0 && filteredCount > 0 &&
            <>
              <span className="font-normal text-sm">{filteredIndex} / {' '}</span>
              <span className="font-normal text-sm">{filteredCount}</span>
            </>
        }
      </p>
    {/*
      <a
        onClick={() => {
          if (cardIndex < 0) return;
          const card = cards[cardIndex];
          card.mark = card.selectedMark || card.mark;
          card.selectedMark = undefined;
          setRevealed(false);
          setSelectedMark(marks[0]);
          const newCardIndex = prevIndex();
          setCards([...cards]);
          setCardIndex(newCardIndex);
          state.apply({
            type: "update",
            args: {
              cards: [...cards],
              cardIndex: newCardIndex,
            }
          })
        }}
      >
        <ArrowLeftIcon aria-hidden="true" className={classNames(
                         "relative inline-flex items-center ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0 rounded-full mx-1 p-2 mt-6 h-8 w-8 cursor-pointer",
                         "hover:bg-gray-100 bg-white"
                       )} />
      </a>
      <a
        onClick={() => {
          if (cardIndex < 0) return;
          const card = cards[cardIndex];
          card.mark = card.selectedMark || card.mark;
          card.selectedMark = undefined;
          setRevealed(false);
          setSelectedMark(marks[0]);
          const newCardIndex = nextIndex();
          setCards([...cards]);
          setCardIndex(newCardIndex);
          state.apply({
            type: "update",
            args: {
              cards: [...cards],
              cardIndex: newCardIndex,
            }
          })
        }}
      >
        <ArrowRightIcon aria-hidden="true" className={classNames(
                          "relative inline-flex items-center ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0 rounded-full mx-1 p-2 mt-6 h-8 w-8 cursor-pointer",
                          "hover:bg-gray-100 bg-white"
                        )} />
      </a>
     */}
      </div>
    </nav>
  )
}
