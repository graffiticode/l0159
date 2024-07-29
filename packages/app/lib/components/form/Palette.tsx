function classNames(...classes) {
  const className = classes.filter(Boolean).join(' ')
  return className;
}

export function Palette({ player, choosePlayer }) {
  return (
    <div className="w-15 border flex flex-col gap-1 mr-2 p-1">
      <div className={
             classNames(
               "h-6",
               player.color === "red" && "bg-red-100"
             )}
      >
        <button
          type="button"
          className="w-4 h-4 m-1 transition bg-red-400"
          onClick={() => choosePlayer({
            color: "red",
          })}
        >
        </button>
      </div>
      <div className={
             classNames(
               "h-6",
               player.color === "green" && "bg-green-100"
             )}
      >
        <button
          type="button"
          className="w-4 h-4 m-1 transition bg-green-400"
          onClick={() => choosePlayer({
            color: "green",
          })}
        >
        </button>
      </div>
      <div className={
             classNames(
               "h-6",
               player.color === "blue" && "bg-blue-100"
             )}
      >
        <button
          type="button"
          className="w-4 h-4 m-1 transition bg-blue-400"
          onClick={() => choosePlayer({
            color: "blue",
          })}
        >
        </button>
      </div>
    </div>
  )
}
