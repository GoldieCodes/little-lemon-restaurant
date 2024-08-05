"use client"
import MenuItems from "@/components/MenuItems"
import { useState, useEffect } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { menus } from "@/components/MenuItems"
import { FaSadCry } from "react-icons/fa"

export default function Menu() {
  //I used the two consts below to implement the search bar
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])

  //I used useEffect to nest the search bar logic because without it, React will have too many rerenders
  //and throw an error (I don't understand why yet).
  //The search bar logic is very simple. It just uses the .includes() function to check if the phrase
  //in the search bar matches any part of the titles in the menu array. Then the filter function returns
  //any results that are found by the .includes(). We can also use .match() but that will only match exact
  //it won't do partial matching.
  useEffect(() => {
    if (search != "") {
      const searchResult = menus.filter((menu) =>
        menu.title.toLowerCase().includes(search.toLowerCase())
      )
      setSearchResult(searchResult)
    }
  }, [search])

  return (
    <div className="wrapper">
      <header className="md:flex justify-between items-center md:border-b-2 md:border-yellow/45">
        <h1 className="text-2xl text-green border-b-2 md:border-b-0 border-yellow/45">
          Our Menu
        </h1>

        {/* this is the search bar */}
        <aside role="search bar" className="relative group">
          <input
            name="searchbar"
            placeholder="Search the menu"
            className="w-full xl:w-[23vw] rounded-full py-3 px-5 mt-5 md:mt-0 md:mb-4 shadow border-[1px]
                 border-ash bg-[white]/15 outline-1 outline-[#9fb3a9]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute right-2 bottom-[12%] md:bottom-[40%] text-[2rem] text-[#82958b96] group-focus-within:text-[#9fb3a9] group-focus-within:hover:text-brownish">
            <BiSearchAlt />
          </span>
        </aside>
      </header>

      <main>
        <div className="mt-14 col-span-full space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[50vh]">
          {searchResult.length == 0 && search ? ( // && search adds a check to ensure that the search bar is not empty
            <p className="text-xl text-[#9cab99] place-self-center col-span-full flex gap-6 items-center">
              <span className="text-3xl text-brownish/60">
                <FaSadCry />
              </span>
              So sorry, we don't have that.
            </p>
          ) : searchResult.length && search ? ( //so if the search bar is empty, the searchResult array will not render
            <MenuItems menus={searchResult} /> // this is using the array gotten from the search bar result
          ) : (
            <>
              {/*this is using the original menus array as the prop */}
              <MenuItems menus={menus} />
              <MenuItems menus={menus} />
              <MenuItems menus={menus} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
