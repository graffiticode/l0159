import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

export function PageNav({ state }) {
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
  let revealed = false;
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between bg-white px-4 sm:px-6"
    >
      <div className="-mt-px flex w-0 flex-1">
        <p className="text-sm text-gray-700">
          <span className="font-medium">{cardIndex + 1}</span> /{' '}
          <span className="font-medium">{cards.length}</span>
        </p>
      </div>
      <div className="-mt-px flex">
      {
        !revealed &&
          <div className="font-light text-xs text-white ring-indigo-600 hover:ring-1 bg-indigo-600 rounded-full px-6 py-2">
            Reveal
          </div> ||
          <div className="flex-col">
          <div className="text-xs font-light text-gray-600 pb-2">
          How well do you know this?
          </div>
          <div className="-mt-px flex justify-center items-center px-auto">
          <a
        href="#"
        className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 p-2 h-8 w-8 hover:ring-2 ring-[#F78A72] bg-[#F78A72] text-center"
          >
          1
        </a>
          <a
        href="#"
        aria-current="page"
        className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 p-2 h-8 w-8 hover:ring-1 ring-[#EFCB4B] bg-[#EFCB4B] text-center align-middle"
          >
          2
        </a>
          <a
        href="#"
        className="font-medium text-xs text-gray-700 focus-visible:outline-offset-0 rounded-full mx-1 p-2 h-8 w-8 hover:ring-1 ring-[#ACDC79] bg-[#ACDC79] text-center align-middle"
          >
          3
        </a>
          </div>
          </div>
      }
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
          <a
          href="#"
          onClick={() => {
            if (!cards[cardIndex].checked) {
              cards[cardIndex].flipped = false;
            }
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
            if (!cards[cardIndex].checked) {
              cards[cardIndex].flipped = false;
            }
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
