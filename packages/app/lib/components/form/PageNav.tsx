import { CheckIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

export function PageNav({ state, cards }) {
  const { cardIndex } = state.data;
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
      className="flex items-center justify-between bg-white px-4 py-3 sm:px-6"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          <span className="font-medium">{cardIndex + 1}</span> of{' '}
          <span className="font-medium">{cards.length}</span>
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          onClick={() => {
            cards[cardIndex].checked = !cards[cardIndex].checked
             state.apply({
             type: "update",
             args: {
              cards,
             },
          });
        }}
      >
      <CheckIcon aria-hidden="true" className={classNames(
        "relative inline-flex items-center ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0 rounded-full mx-4 p-2 h-8 w-8",
        cards[cardIndex].checked &&
          "hover:bg-green-100 bg-green-200" ||
          "hover:bg-gray-100 bg-white"
      )} />
        </a>
        <a
          href="#"
          onClick={() => { state.apply({
            type: "update",
            args: {
              cardIndex: prevIndex(),
            }
          })}}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={() => { state.apply({
            type: "update",
            args: {
              cardIndex: nextIndex(),
            }
          })}}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </a>
      </div>
    </nav>
  )
}
