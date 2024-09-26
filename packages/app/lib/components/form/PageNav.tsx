import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

function FilterDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-9 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
    className="block text-xs text-gray-700 m-2 rounded-full h-5 w-5 border border-1 border-gray-400 hover:ring-1 hover:border-0 ring-gray-400 bg-[#fff]"
            >
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block text-xs text-gray-700 m-2 rounded-full h-5 w-5 hover:ring-1 ring-[#F78A72] bg-[#F78A72]"
            >
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block text-xs text-gray-700 m-2 rounded-full h-5 w-5 hover:ring-1 ring-[#EFCB4B] bg-[#EFCB4B]"
            >
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block text-xs text-gray-700 m-2 rounded-full h-5 w-5 hover:ring-1 ring-[#ACDC79] bg-[#ACDC79]"
            >
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

export function PageNav({ state }) {
  const [ revealed, setRevealed ] = useState(false);
  const { cards, cardIndex } = state.data;
  const prevIndex = () =>
        cards.length - 1 !== 0 && (
          cardIndex === 0 && cards.length - 1 ||
            cardIndex - 1
        ) ||
        0;
  const nextIndex = () =>
        cardIndex !== cards.length - 1 && cardIndex + 1 ||
        0;
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between bg-white px-4 sm:px-6 h-12"
    >
      <div className="-mt-px flex w-0 flex-1">
        <p className="text-sm text-gray-700">
          <span className="font-medium">{cardIndex + 1}</span> /{' '}
          <span className="font-medium">{cards.length}</span>
      </p>
      <div className="pl-4">
        <FilterDropdown />
      </div>
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
        className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 p-2 h-8 w-11 hover:ring-2 ring-[#F78A72] bg-[#F78A72] text-center"
          >
          0
        </a>
          <a
        href="#"
        aria-current="page"
        className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 p-2 h-8 w-11 hover:ring-1 ring-[#EFCB4B] bg-[#EFCB4B] text-center align-middle"
          >
          &hellip;
        </a>
          <a
        href="#"
        className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 p-2 h-8 w-11 hover:ring-1 ring-[#ACDC79] bg-[#ACDC79] text-center align-middle"
          >
          100
        </a>
          </div>
          </div>
      }
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
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
