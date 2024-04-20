"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
// import { rubikglitch } from "./font";
// import { orbitron } from "./font";
import NavLinks from "./nav-links";

export default function TopNav() {
  const [expandNav, setExpandNav] = useState(false);
  const navBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!navBarRef.current?.contains(event.target as Node)) {
        setExpandNav(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navBarRef}
      className="md:py-2 py-4 px-6 md:px-12 relative flex items-center w-full justify-between"
    >
      <Link href="/">
        <div
          className={`text-2xl md:text-4xl md:font-semibold text-onBackground font-bold hover:text-[#FFFFFF] font-linux-libertine`}
          data-text="STIMA"
        >
          WikiRace
        </div>
      </Link>

      <div
        className={`absolute md:static flex top-20 left-0 w-full md:w-auto z-5 bg-transparent duration-700 ease-in-out md:translate-x-0 md:transition-none px-6 md:px-0 ${
          expandNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul
          className={`flex flex-col gap-y-4 py-5 px-6 md:flex-row md:gap-x-14 bg-gray-700 md:bg-transparent md:px-0 w-full md:justify-end shadow-current shadow-md rounded-xl md:rounded-none md:shadow-none`}
        >
          <NavLinks />
        </ul>
      </div>
      <button
        aria-label="Menu"
        className="flex h-[27px] w-[30px] cursor-pointer flex-col gap-y-[6px] md:hidden"
        onClick={() => setExpandNav(!expandNav)}
      >
        <span
          className={`h-[5px] w-full origin-left rounded-full bg-onBackground opacity-100 transition duration-300 ease-in-out ${
            expandNav ? "rotate-45 scale-x-105" : "rotate-0 scale-x-100"
          }`}
        />
        <span
          className={`h-[5px] w-full rounded-full bg-onBackground transition duration-300 ease-in-out ${
            expandNav ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-[5px] w-full origin-left rounded-full bg-onBackground opacity-100 transition duration-300 ease-in-out ${
            expandNav ? "rotate-[-45deg] scale-x-105" : "rotate-0 scale-x-100"
          }`}
        />
      </button>
    </nav>
  );
}
