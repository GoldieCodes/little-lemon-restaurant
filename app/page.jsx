import Image from "next/image"
import MenuItems from "@/components/MenuItems"
import { menus } from "@/components/MenuItems"
import { Button } from "@/components/MenuItems"
import Reviews from "@/components/Reviews"

export default function Home() {
  return (
    <>
      <main className="py-[15vh] md:py-0 md:h-[70vh] bg-green">
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
          <Image
            src="/restaurantfood.jpg"
            width={300}
            height={400}
            placeholder="blur"
            blurDataURL="/restaurantfood.jpg"
            alt="restaurant food"
            className="hidden md:block mt-16 h-[70vh] w-[35%] object-cover rounded-3xl mr-20"
          />
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
      <section className="wrapper">
        <h2 className="mb-10 text-center">Testimonials</h2>
        <Reviews />
      </section>
      <section className="wrapper !mt-32 md:!mt-60 md:grid grid-cols-12 md:h-[50vh]">
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

        <div className="relative h-[40vh] md:h-[63vh] md:w-[32vw]">
          <Image
            layout="fill"
            src="/Mario and Adrian A.jpg"
            alt="Mario and Adrian in the kitchen"
            className="col-span-3 mt-6 md:mt-[-10vh] md:mr-[-40px] object-cover border-4 border-dark justify-self-end z-10"
          />
        </div>
        <div
          aria-label="hidden"
          className="hidden md:block relative h-[63vh] w-[31vw] mt-[-14vh] col-span-3 border-[3px] border-dark self-start justify-self-start"
        ></div>
      </section>
    </>
  )
}
