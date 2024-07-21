import Image from "next/image"
import MenuItems from "@/components/MenuItems"
import { Button } from "@/components/MenuItems"
import Reviews from "@/components/Reviews"

export default function Home() {
  return (
    <>
      <main className="h-[70vh] bg-green">
        <div className="wrapper flex gap-10 justify-between">
          <div className="w-[40%] place-self-center">
            <h1 className="text-yellow leading-7">Little Lemon</h1>
            <h3 className="text-ash">Chicago</h3>
            <p className="text-ash mt-4 mb-[3rem]">
              We are a family owned Mediterranean restaurant focused on
              traditional recipes served with a modern twist.
            </p>
            <Button
              url="/reservation"
              text="Reserve a table"
              styles="hover:bg-[#ffe567]"
            />
          </div>
          <Image
            src="/restaurantfood.jpg"
            width={300}
            height={400}
            placeholder="blur"
            blurDataURL="/restaurantfood.jpg"
            alt="restaurant food"
            className="mt-16 h-[70vh] w-[35%] object-cover rounded-3xl mr-20"
          />
        </div>
      </main>
      <section className="w-[1120px] mt-28 mx-auto grid grid-cols-7 items-center">
        <h2 className="col-span-5">This Week's Specials!</h2>
        <Button
          url="/menu"
          text="Online Menu"
          styles="col-span-1 justify-self-end"
        />
        <div className="mt-14 col-span-full grid grid-cols-3 gap-10">
          <MenuItems />
        </div>
      </section>
      <section className="w-[1120px] mt-36 mb-48 mx-auto">
        <h2 className="mb-10 text-center">Testimonials</h2>

        <Reviews />
      </section>
      <section className="wrapper grid grid-cols-12 h-[50vh] grid-rows-[10vh]">
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

        <Image
          width={350}
          height={350}
          src="/Mario and Adrian A.jpg"
          alt="Mario and Adrian in the kitchen"
          className="col-span-3 h-[50vh] mt-[-70px] mr-[-40px] object-cover border-4 border-dark justify-self-end"
        />
        <Image
          width={350}
          height={350}
          src="/Mario and Adrian B.jpg"
          alt="Mario and Adrian baking together"
          className="col-span-3 h-[50vh] object-cover border-4 border-dark self-start justify-self-start"
        />
      </section>
    </>
  )
}
