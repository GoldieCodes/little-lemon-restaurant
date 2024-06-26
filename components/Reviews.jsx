"use client"
import {
  BiSolidStar,
  BiSolidStarHalf,
  BiStar,
  BiSolidMap,
} from "react-icons/bi"
import Image from "next/image"

const customers = [
  {
    rating: (
      <span className="star-rating">
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
      </span>
    ),
    name: "Emma Johnson",
    locale: "Chicago, IL",
    pic: "/customer_emmaa.jpg",
    review:
      "Little Lemon is a hidden gem in Chicago! The ambiance is cozy. I had the lemon chicken and it was perfection! The staff are friendly and attentive. Definitely coming back.",
  },
  {
    rating: (
      <span className="star-rating">
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
        <BiStar />
      </span>
    ),
    name: "Michael Smith",
    locale: "Evanston, IL",
    pic: "/customer_smith.jpg",
    review:
      "The flavors at Little Lemon are exceptional. I loved the lemon risotto and the dessert. My only gripe was the wait time, but it was worth it.",
  },
  {
    rating: (
      <span className="star-rating">
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStarHalf />
        <BiStar />
      </span>
    ),
    name: "Olivia Martinez",
    locale: "Oak Park, IL",
    pic: "/customer_martinez.jpg",
    review:
      "Nice place with good food, but I expected more variety in the menu. The lemon garlic shrimp was delicious, but the service was a bit slow. Maybe I came on a busy night. Will give it another try.",
  },
  {
    rating: (
      <span className="star-rating">
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
        <BiSolidStar />
      </span>
    ),
    name: "Daniel Lee",
    locale: "Chicago, IL",
    pic: "/customer_lee.jpg",
    review:
      "The atmosphere is perfect for a date night or a casual dinner with friends. Excellent service and a delightful menu.",
  },
]

export default function Reviews() {
  const testimonials = customers.map((review) => (
    <article key={review.pic} className="bg-[#ebe4db57] p-4 space-y-4">
      <div>{review.rating}</div>
      <div className="flex justify-around items-center">
        <Image
          width={100}
          height={100}
          objectFit="cover"
          src={review.pic}
          alt={`${review.name} profile pic`}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-bold">{review.name}</p>
          <p className="text-sm italic flex items-center">
            <BiSolidMap />
            {review.locale}.
          </p>
        </div>
      </div>
      <p className="paragraph p-2">{review.review}</p>
    </article>
  ))
  return testimonials
}
