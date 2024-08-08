export function OrderQuantity({ orderNum, setOrderNum, text }) {
  // this is the part of the dish display on the order pages where there is a plus and minus icon
  // to increase or reduce the displayed order quantity

  return (
    <p>
      <span
        onClick={() =>
          orderNum === 0 ? null : setOrderNum((prev) => prev - 1)
        }
        className="cursor-pointer bg-ash px-4 py-2 rounded-lg mr-4 hover:bg-green/30"
      >
        -
      </span>{" "}
      <span className="font-bold">{orderNum} </span>
      <span
        onClick={() => setOrderNum((prev) => prev + 1)}
        className="cursor-pointer bg-ash px-4 py-2 rounded-lg ml-4 hover:bg-green/30"
      >
        +
      </span>{" "}
    </p>
  )
}
