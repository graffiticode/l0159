import { useState } from "react";
import {
  //Label,
  Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

import {
  ArrowRightIcon,
  ArrowLeftIcon,
//  EllipsisVerticalIcon,
  CheckIcon,
  MinusIcon,
  XMarkIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid'

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

const bgClassname = mark =>
      mark === "#F78A72" && "bg-[#F78A72]" ||
      mark === "#EFCB4B" && "bg-[#EFCB4B]" ||
      mark === "#ACDC79" && "bg-[#ACDC79]" ||
      "bg-[#DDDDDD]";

// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// const ringClassname = mark =>
//       mark === "#F78A72" && "ring-[#F78A72]" ||
//       mark === "#EFCB4B" && "ring-[#EFCB4B]" ||
//       mark === "#ACDC79" && "ring-[#ACDC79]" ||
//       "ring-[#DDDDDD]";

// function FilterDropdown({ state }) {
//   const [ filterMark, setFilterMark ] = useState(state.data.filterMark || "#DDDDDD");
//   const updateFilter = filterMark => (
//     setFilterMark(filterMark),
//     state.apply({
//       type: "update",
//       args: {
//         filterMark,
//       },
//     })
//   );
//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <div>
//         <MenuButton
//           className={classNames(
//             "flex items-center rounded-full bg-white text-gray-400 hover:text-gray-600 focus:outline-none ring-2 ring-offset-2",
//             ringClassname(filterMark)
//           )}
//         >
//           <span className="sr-only">Open options</span>
//           <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
//         </MenuButton>
//       </div>

//       <MenuItems
//         transition
//         className="absolute right-0 z-10 mt-2 w-9 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//       >
//         <div className="py-1">
//           <MenuItem>
//             <a
//               href="#"
//               className="block text-xs text-gray-700 m-2 rounded-full h-5 w-5 hover:ring-1 ring-[#DDDDDD] bg-[#DDDDDD]"
//               onClick={() => updateFilter("#DDDDDD")}
//             >
//             </a>
//           </MenuItem>
//           <MenuItem>
//             <a
//               href="#"
//               className="block text-xs text-gray-700 m-2 rounded-full h-5 w-5 hover:ring-1 ring-[#F78A72] bg-[#F78A72]"
//               onClick={() => updateFilter("#F78A72")}
//             >
//             </a>
//           </MenuItem>
//           <MenuItem>
//             <a
//               href="#"
//               className="block text-xs text-gray-700 m-2 rounded-full h-5 w-5 hover:ring-1 ring-[#EFCB4B] bg-[#EFCB4B]"
//               onClick={() => updateFilter("#EFCB4B")}
//             >
//             </a>
//           </MenuItem>
//           <MenuItem>
//             <a
//               href="#"
//               className="block text-xs text-gray-700 m-2 rounded-full h-5 w-5 hover:ring-1 ring-[#ACDC79] bg-[#ACDC79]"
//               onClick={() => updateFilter("#ACDC79")}
//             >
//             </a>
//           </MenuItem>
//         </div>
//       </MenuItems>
//     </Menu>
//   )
// }

const colors = {
  gray: "#DDDDDD",
  red: "#F78A72",
  yellow: "#EFCB4B",
  green: "#ACDC79",
};

const marks = [
  { id: 1, name: "All", color: colors.gray, count: 10 },
  { id: 2, name: "Low", color: colors.red, count: 2 },
  { id: 3, name: "Medium", color: colors.yellow, count: 4 },
  { id: 4, name: "High", color: colors.green, count: 4 },
]

function FilterMenu({ state }) {
  state;
  const [selected, setSelected] = useState(marks[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {/*<Label className="block text-xs font-medium leading-6 text-gray-900">Assigned to</Label>*/}
      <div className="relative mt-1">
        <ListboxButton className="w-36 relative cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-xs sm:leading-6">

    {/*      <span className="block truncate">{selected.name}</span>*/}
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
              className="w-36 h-8 group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-200 data-[focus]:text-gray-700"
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
  const { cards, cardIndex, filterMark } = state.data;
  const indexMap = cards.map(card => filterMark === "#DDDDDD" || card.mark === filterMark);
  console.log("PageNav() indexMap=" + JSON.stringify(indexMap));
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
        .map((card, index) => (filterMark === "#DDDDDD" || card.mark === filterMark) && index)
        .filter(index => (console.log("filter() " + index), index !== undefined))
        .findIndex(index => (console.log("findIndex() " + JSON.stringify(index)), index === cardIndex)) + 1;
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between bg-white px-4 sm:px-6 h-12"
    >
      <div className="-mt-px flex w-0 flex-1">
        <FilterMenu state={state} />
      </div>
      <div className="-mt-px flex">
      {
        !revealed &&
          <div className="font-light text-xs text-white ring-indigo-600 hover:ring-1 bg-indigo-600 rounded-full px-6 py-2">
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
          <div className="text-xs text-center font-light text-gray-600 pb-2">
          How well do you know this?
          </div>
          <div className="-mt-px flex justify-center items-center px-auto">
          <a
            href="#"
            className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 h-8 w-8 hover:ring-2 ring-[#F78A72] bg-[#F78A72] text-center"
            onClick={() => {
              cards[cardIndex].mark = "#F78A72";
              state.apply({
                type: "update",
                args: {
                  cards,
                }
              })
            }}
          >
          <XMarkIcon className="m-2 w-4 h-4" />
        </a>
          <a
            href="#"
            aria-current="page"
            className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 h-8 w-8 hover:ring-1 ring-[#EFCB4B] bg-[#EFCB4B] text-center align-middle"
            onClick={() => {
              cards[cardIndex].mark = "#EFCB4B";
              state.apply({
                type: "update",
                args: {
                  cards,
                }
              })
            }}
          >
          <MinusIcon className="m-2 w-4 h-4" />
        </a>
          <a
            href="#"
            className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 h-8 w-8 hover:ring-1 ring-[#ACDC79] bg-[#ACDC79] text-center align-middle"
            onClick={() => {
              cards[cardIndex].mark = "#ACDC79";
              state.apply({
                type: "update",
                args: {
                  cards,
                }
              })
            }}
          >
          <CheckIcon className="m-2 w-4 h-4" />
        </a>
          </div>
          </div>
      }
    </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
      <p className="text-xs text-gray-700 pt-2 pr-2">
        <span className="font-medium">{filteredIndex}</span> /{' '}
        <span className="font-medium">{filteredCount}</span>
      </p>
      <a
    href="#"
    onClick={() => {
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
        "relative inline-flex items-center ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0 rounded-full mx-1 p-2 h-8 w-8",
        "hover:bg-gray-100 bg-white"
      )} />
        </a>
        <a
          href="#"
          onClick={() => {
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
        "relative inline-flex items-center ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0 rounded-full mx-1 p-2 h-8 w-8",
        "hover:bg-gray-100 bg-white"
      )} />
        </a>
      </div>
    </nav>
  )
}
