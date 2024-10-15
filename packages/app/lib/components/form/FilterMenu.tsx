import React from "react"; React;  // For emacs mode
import { useState } from "react";
import {
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid'

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react'

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

export function FilterMenu({
  state,
  marks,
  bgClassname,
  getMarkFromColor,
  handleFilterChange,
  setRevealed,
}) {
  const [ selected, setSelected ] = useState(getMarkFromColor(state.data.filterMark));
  const handleChange = selected => {
    const { color: filterMark } = selected;
    handleFilterChange(filterMark);
    setRevealed(false);
    setSelected(selected)
  };
  return (
    <Listbox value={selected} onChange={handleChange}>
      <Label className="block text-xs font-normal leading-6 text-gray-900">
        Current card stack
      </Label>
      <div className="relative mt-1">
        <ListboxButton className="w-48 relative cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-xs sm:leading-6">
          <span
            className={classNames(
              "absolute inset-y-0 left-0 w-4 h-4 m-2 rounded-full",
              bgClassname(selected.color)
            )}
          />
          <span className="ml-4 px-2 text-xs font-light group-data-[selected]:font-semibold">
            {selected.name}
          </span>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-xs font-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-xs"
        >
          {marks.map(mark => (
            <ListboxOption
              key={mark.id}
              value={mark}
              className="w-48 h-8 group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-100 data-[focus]:text-gray-700"
            >
              <span className="w-48 ml-2 pl-2">
                <span
                  className={classNames(
                    "absolute inset-y-0 left-0 w-4 h-4 m-2 rounded-full",
                    bgClassname(mark.color)
                  )}/>
                <span className="p-2 text-xs font-light group-data-[selected]:font-semibold">
                  {mark.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 group-data-[focus]:text-gray-700 group-data-[selected]:font-semibold">
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

