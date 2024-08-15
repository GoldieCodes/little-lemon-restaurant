"use client"
import {
  BiSolidStar,
  BiSolidStarHalf,
  BiStar,
  BiSolidMap,
} from "react-icons/bi"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const customerReviews = [
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
  //this code renders and styles the UI for the testimonials from the customerReviews array and saves
  //it in the const testimonials. Then I passed it into the Slider component (scroll down to see that).
  const testimonials = customerReviews.map((review) => (
    <article
      key={review.pic}
      className="h-full bg-ash/5 p-4 rounded-lg space-y-4 shadow-md"
    >
      <div className="grid justify-center">{review.rating}</div>
      <div className="flex justify-around items-center">
        <Image
          width={100}
          height={100}
          src={review.pic}
          alt={`${review.name} profile pic`}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-bold text-green">{review.name}</p>
          <p className="text-sm italic text-brownish flex items-center">
            <BiSolidMap />
            {review.locale}.
          </p>
        </div>
      </div>
      <p className="text-sm p-2">{review.review}</p>
    </article>
  ))

  //I had to write these two functions because without them the buttons for the carousel refused to work
  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return <div className={className} style={{ ...style }} onClick={onClick} />
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return <div className={className} style={{ ...style }} onClick={onClick} />
  }

  //These codes are for the Reack Slick carousel library, plus the two functions above
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 8000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          autoplaySpeed: 5000,
          arrows: false,
        },
      },
    ],
  }

  return <Slider {...settings}>{testimonials}</Slider> //this Slider component is from the React Slick library
}
