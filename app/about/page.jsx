import Image from "next/image"

export default function About() {
  return (
    <main className="wrapper mt-4">
      <h1 className="border-b-2 border-yellow/45 text-green">
        About Little Lemon
      </h1>
      <div className="mt-8 text-justify lg:flex gap-10 flex-row-reverse">
        <Image
          width={400}
          height={400}
          src="/restaurant.jpg"
          alt="Restaurant pic"
          className="w-full lg:w-[47%] mb-6 lg:mb-0 object-cover"
        />
        <p className="lg:w-[53%]">
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
      </div>
      <div className="mt-12 lg:flex gap-10">
        <Image
          width={400}
          height={400}
          src="/restaurantfood.jpg"
          alt="Restaurant food pic"
          className="w-full lg:w-[53%] mb-6 lg:mb-0 h-[revert-layer] object-cover"
        />
        <p className="lg:w-[47%] text-justify">
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
