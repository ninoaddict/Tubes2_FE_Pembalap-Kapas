"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
];

export default function NavLinks() {
  const pathName = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <li
            key={link.name}
            className={`list-none text-xl font-semibold font-linux-libertine`}
          >
            <Link
              href={link.href}
              className={clsx(
                "lg:duration-300 lg:ease-in-out text-gray-400 hover:text-[#F9F9F9] active:text-[#F9F9F9]",
                { "text-white": pathName === link.href }
              )}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );
}
