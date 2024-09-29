import { useState, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react'

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  MinusIcon,
  XMarkIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid'

import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

const colors = {
  gray: "#DDDDDD",
  red: "#F78A72",
  yellow: "#EFCB4B",
  green: "#ACDC79",
};

const bgClassname = mark =>
      mark === "#F78A72" && "bg-[#F78A72]" ||
      mark === "#EFCB4B" && "bg-[#EFCB4B]" ||
      mark === "#ACDC79" && "bg-[#ACDC79]" ||
      "bg-[#DDDDDD]";

const ringClassname = mark =>
      mark === "#F78A72" && "ring-[#F78A72]" ||
      mark === "#EFCB4B" && "ring-[#EFCB4B]" ||
      mark === "#ACDC79" && "ring-[#ACDC79]" ||
      "bg-[#DDDDDD]";

const rawMarks = [
  { id: 1, name: "Unmarked", color: colors.gray, count: 0 },
  { id: 2, name: "Low", color: colors.red, count: 0 },
  { id: 3, name: "Medium", color: colors.yellow, count: 0 },
  { id: 4, name: "High", color: colors.green, count: 0 },
];

const getMarkFromColor = color => rawMarks.find(mark => mark.color === color) || rawMarks[0];

function FilterMenu({ state, marks }) {
  const [ selected, setSelected ] = useState(getMarkFromColor(state.data.filterMark));
  useEffect(() => {
    const { color: filterMark } = selected;
    state.apply({
      type: "update",
      args: {
        filterMark,
      },
    })
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {/*<Label className="block text-xs font-medium leading-6 text-gray-900">Assigned to</Label>*/}
      <div className="relative mt-1">
        <ListboxButton className="w-36 relative cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-xs sm:leading-6">

              <span className={classNames(
                "absolute inset-y-0 left-0 w-4 h-4 m-2 rounded-full",
                bgClassname(selected.color)
              )}/>
              <span className="ml-4 p-2 text-xs font-light group-data-[selected]:font-semibold">
              {selected.name}
              </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs font-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-xs"
        >
          {marks.map((mark) => (
            <ListboxOption
              key={mark.id}
              value={mark}
              className="w-36 h-8 group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-100 data-[focus]:text-gray-700"
              >
              <span className="w-32 ml-2 pl-2">
              <span className={classNames(
                "absolute inset-y-0 left-0 w-4 h-4 m-2 rounded-full",
                bgClassname(mark.color)
              )}/>
              <span className="p-2 text-xs font-light group-data-[selected]:font-semibold">
              {mark.name}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 group-data-[focus]:text-gray-700">
              {mark.count}
              </span>
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export function PageNav({ state }) {
  const [ revealed, setRevealed ] = useState(false);
  const [ selectedMark, setSelectedMark ] = useState(rawMarks[0]);
  const { cards, cardIndex, filterMark } = state.data;
  const indexMap = cards.map(card => filterMark === colors.gray && !card.mark || card.mark === filterMark);
  const marks = cards.reduce(
    (marks, card) =>
      marks.map(mark => (
        (mark.color === card.mark || mark.color === colors.gray && !card.mark) &&
          {...mark, count: mark.count + 1} ||
          mark
      )),
    rawMarks
  );
  const prevIndex = () =>
        cards.length - 1 !== 0 && (
          cardIndex === 0 && cards.length - 1 ||
            cardIndex - 1
        ) ||
        0;
  const nextIndex = () => {
    let index;
    index = indexMap.findIndex((val, index) => index > cardIndex && val)
    if (index > -1) {
      return index;
    }
    index = indexMap.findIndex((val, index) => index <= cardIndex && val)
    if (index > -1) {
      return index;
    }
    return 0;
  }
  const filteredCount = indexMap.filter(val => val).length;
  const filteredIndex = cards
        .map((card, index) => (filterMark === colors.gray || card.mark === filterMark) && index)
        .filter(index => index !== undefined)
        .findIndex(index => index === cardIndex) + 1;

  const handleChange = value => {
    console.log("handleChange() value=" + JSON.stringify(value, null, 2));
    setSelectedMark(value);
    cards[cardIndex].mark = value.color;
    state.apply({
      type: "update",
      args: {
        cards,
      }
    })
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between bg-white px-4 sm:px-6 h-12"
    >
      <div className="-mt-px flex flex-col w-0 flex-1">
        <div className="text-xs text-left font-light text-gray-600 pb-2 pt-1">
          Cards by confidence level
        </div>
        <FilterMenu state={state} marks={marks} />
      </div>
      <div className="-mt-px flex">
      {
        !revealed &&
          <div className="font-light text-xs text-white ring-indigo-600 hover:ring-1 bg-gray-600 rounded-full px-6 p-2 mt-7">
          <a
          href="#"
          onClick={() => {
            cards[cardIndex].flipped = true;
            setRevealed(true);
            state.apply({
              type: "update",
              args: {
                cards,
                cardIndex,
              }
            })
          }}
        >
          Reveal
        </a>
          </div> ||
          <div className="flex-col">
          <div className="text-xs text-center font-light text-gray-600 pb-3 pt-1">
            Confidence level
          </div>
          <div className="-mt-px flex justify-center items-center px-auto">
          <RadioGroup value={selectedMark} onChange={handleChange}>
            <div className={
             classNames(
               "flex items-center space-x-3"
             )}>
              <RadioGroup.Option
                key={rawMarks[1].name}
                value={rawMarks[1]}
                className={({ checked }) => (
                  console.log("checked=" + checked),
                  classNames(
                    ringClassname(rawMarks[1].color),
                    checked ? 'ring ring-offset-1' : '',
                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                  ))}>
                <RadioGroup.Label as="span" className="sr-only">
                  {rawMarks[1].name}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={classNames(
                    bgClassname(rawMarks[1].color),
                    'h-8 w-8 rounded-full')}
                >
                  <XMarkIcon className="m-2 w-4 h-4" />
                </span>
              </RadioGroup.Option>
              <RadioGroup.Option
                key={rawMarks[2].name}
                value={rawMarks[2]}
                className={({ checked }) =>
                  classNames(
                    ringClassname(rawMarks[2].color),
                    checked ? 'ring ring-offset-1' : '',
                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                  )}
              >
                <RadioGroup.Label as="span" className="sr-only">
                  {rawMarks[2].name}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={classNames(
                    bgClassname(rawMarks[2].color),
                    'h-8 w-8 rounded-full')}
                >
                  <MinusIcon className="m-2 w-4 h-4" />
                </span>
              </RadioGroup.Option>
              <RadioGroup.Option
                key={rawMarks[3].name}
                value={rawMarks[3]}
                className={({ checked }) =>
                  classNames(
                    ringClassname(rawMarks[3].color),
                    checked ? 'ring ring-offset-1' : '',
                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                  )}
              >
                <RadioGroup.Label as="span" className="sr-only">
                  {rawMarks[3].name}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={classNames(
                    bgClassname(rawMarks[3].color),
                    'h-8 w-8 rounded-full')}
                >
                  <CheckIcon className="m-2 w-4 h-4" />
                </span>
              </RadioGroup.Option>
              </div>
            </RadioGroup>
        </div>
      </div>
      }
    </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
      <p className="text-xs text-gray-700 pt-8 pr-2">
        <span className="font-medium">{filteredIndex}</span> /{' '}
        <span className="font-medium">{filteredCount}</span>
      </p>
      <a
        href="#"
        onClick={() => {
          setSelectedMark(marks[0]);
        cards[cardIndex].flipped = false;
        setRevealed(false);
        state.apply({
          type: "update",
          args: {
            cards,
            cardIndex: prevIndex(),
          }
        })
        }}
      >
      <ArrowLeftIcon aria-hidden="true" className={classNames(
        "relative inline-flex items-center ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0 rounded-full mx-1 p-2 mt-6 h-8 w-8",
        "hover:bg-gray-100 bg-white"
      )} />
        </a>
        <a
          href="#"
          onClick={() => {
            setSelectedMark(marks[0]);
            cards[cardIndex].flipped = false;
            setRevealed(false);
            state.apply({
              type: "update",
              args: {
                cards,
                cardIndex: nextIndex(),
              }
            })
          }}
        >
      <ArrowRightIcon aria-hidden="true" className={classNames(
        "relative inline-flex items-center ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0 rounded-full mx-1 p-2 mt-6 h-8 w-8",
        "hover:bg-gray-100 bg-white"
      )} />
        </a>
      </div>
   </nav>
  )
}
