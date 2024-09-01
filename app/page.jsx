import Image from "next/image"
import MenuItems, { Button, menus } from "@/components/MenuItems"
import Reviews from "@/components/Reviews"

export default function Home() {
  return (
    <>
      <main className="py-[13vh] md:py-0 md:h-[70vh] bg-[#314b29] bg-[url('/lemon-icon-littlelemon.png'),url('/lemon-icon-littlelemon.png'),url('/lemon-icon-littlelemon.png')] md:bg-[url('/lemon-icon-littlelemon.png'),url('/lemon-icon-littlelemon.png'),url('/lemon-icon-littlelemon.png'),url('/lemon-icon-littlelemon.png')] bg-blend-color-burn bg-[length:15vh] lg:bg-[length:12%] bg-no-repeat bg-position-4">
        <div className="wrapper flex gap-10 justify-between items-center">
          <div className="md:w-[40%] text-center md:text-start md:place-self-center">
            <h1 className="text-yellow leading-7 text-[4rem] lg:text-3xl">
              Little Lemon
            </h1>
            <h3 className="text-ash">Chicago</h3>
            <p className="text-ash mt-4 mb-5 lg:mb-[3rem]">
              We are a family owned Mediterranean restaurant focused on
              traditional recipes served with a modern twist.
            </p>
            <Button
              url="/reservation"
              text="Reserve a table"
              styles="bg-yellow hover:!bg-[#ffe252]"
            />
          </div>
          <div className="relative hidden md:block mt-16 h-[55vh] lg:h-[70vh] w-[45%] object-cover shadow-2xl  md:after:w-full md:after:h-full after:border-[3px] after:border-yellow after:absolute after:bottom-5 after:right-5">
            <Image
              src="/Vibrant Ceviche Dish.jpg"
              layout="fill"
              placeholder="blur"
              blurDataURL="/restaurantfood.jpg"
              alt="restaurant food"
              className="z-10"
            />
          </div>
        </div>
      </main>
      <section className="wrapper">
        <div className="md:flex justify-between items-center">
          <h2 className="text-center">This Week's Specials</h2>
          <Button url="/menu" text="Online Menu" styles="hidden md:block" />
        </div>
        <div className="mt-14 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[50vh]">
          <MenuItems menus={menus} />
        </div>
      </section>
      <section className="py-20 md:py-24 bg-ash bg-[url('/lemon-icon-littlelemon.png'),url('/lemon-icon-littlelemon.png'),url('/lemon-icon-littlelemon.png')] bg-blend-multiply bg-[length:15vh] lg:bg-[length:10%] bg-no-repeat bg-position-5">
        <div className="wrapper">
          <h2 className="mb-9 md:mb-12 text-center text-dark">Testimonials</h2>
          <Reviews />
        </div>
      </section>
      <section className="wrapper relative md:!mt-60 md:grid grid-cols-12 md:h-[50vh]">
        <div className="col-span-6">
          <h2 className="mb-1">Little Lemon</h2>
          <h5 className="text-brownish mb-5">Chicago</h5>
          <p className="">
            Little Lemon is a vibrant Mediterranean restaurant founded by Mario
            and Adrian, two culinary enthusiasts with a passion for blending
            traditional flavors with innovative twists. Nestled in the heart of
            Chicago, Little Lemon brings a fresh perspective to classic
            Mediterranean cuisine, offering a tantalizing array of dishes
            inspired by the rich culinary heritage of the region.
          </p>
        </div>

        <div className="relative h-[40vh] md:h-[63vh] md:w-[32vw] col-start-8 col-end-13 mt-6 md:mt-[-10vh] md:mr-[-40px] z-10 md:shadow-2xl md:after:w-full md:after:h-full after:border-[3px] after:border-brownish after:absolute after:bottom-7 after:left-7 after:-z-10">
          <Image
            fill
            src="/Mario and Adrian A.jpg"
            alt="Mario and Adrian in the kitchen"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
    </>
  )
}
