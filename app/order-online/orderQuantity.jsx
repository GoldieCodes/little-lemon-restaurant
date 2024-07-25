export function orderQuantity(orderNum, setOrderNum) {
  // this is the part of the dish display on the order pages where there is a plus and minus icon
  // to increase or reduce the displayed order quantity
  return (
    <p>
      Quantity:{"  "}
      <span
        onClick={() =>
          orderNum === 0 ? null : setOrderNum((prev) => prev - 1)
        }
        className="cursor-pointer bg-ash py-[1px] px-2 rounded-lg mr-4 ml-2 hover:bg-pinkish"
      >
        -
      </span>{" "}
      <span className="font-bold">{orderNum} </span>
      <span
        onClick={() => setOrderNum((prev) => prev + 1)}
        className="cursor-pointer bg-ash py-[1px] px-2 rounded-lg ml-4 hover:bg-pinkish"
      >
        +
      </span>{" "}
    </p>
  )
}
