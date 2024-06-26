import Image from "next/image"

export default function About() {
  return (
    <main className="wrapper">
      <h1 className="border-b-2 border-yellow/45 text-2xl text-green">
        About Little Lemon
      </h1>
      <div className="mt-12 flex gap-7">
        <p className="w-[57%]">
          Little Lemon is a vibrant Mediterranean restaurant founded by Mario
          and Adrian, two culinary enthusiasts with a passion for blending
          traditional flavors with innovative twists. Nestled in the heart of
          Chicago, Little Lemon brings a fresh perspective to classic
          Mediterranean cuisine, offering a tantalizing array of dishes inspired
          by the rich culinary heritage of the region.
          <br />
          <br />
          In addition to its delectable cuisine, Little Lemon prides itself on
          its warm and inviting atmosphere, where guests can unwind and savor
          the moment amidst stylish decor and impeccable service.
          <br /> <br />
          Whether you're dining with friends, family, or that special someone,
          Little Lemon promises an unforgettable dining experience that
          celebrates the timeless allure of Mediterranean cuisine with a modern
          twist.
        </p>
        <Image
          width={400}
          height={400}
          src="/restaurant.jpg"
          alt="Restaurant pic"
          className="w-[43%]"
        />
      </div>
      <div className="mt-16 flex gap-7">
        <Image
          width={400}
          height={400}
          src="/restaurantfood.jpg"
          alt="Restaurant food pic"
          className="w-[50%] mt-[-20px] h-[57vh] object-cover"
        />

        <p className="w-[50%]">
          With a commitment to using only the freshest ingredients sourced from
          local farmers and producers, Little Lemon ensures that every dish
          bursts with flavor and authenticity.
          <br /> <br />
          Whether you're craving a hearty bowl of homemade hummus or a
          mouthwatering seafood paella, the menu at Little Lemon offers
          something to delight every palate. <br />
          <br />
          At Little Lemon, guests can expect an immersive dining experience
          where every bite tells a story of tradition and creativity. From
          succulent kebabs to zesty salads, each dish is meticulously crafted to
          tantalize the taste buds and evoke a sense of culinary adventure.
        </p>
      </div>
    </main>
  )
}
