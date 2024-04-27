import Image from "next/image";
import Link from "next/link";

import pp1 from "/public/pp1.jpg";
import pp2 from "/public/pp2.jpg";
import pp3 from "/public/pp3.jpg";

export default function Page() {
  return (
    <main className="min-h-[90vh] px-8 flex flex-col items-center">
      <div className="md:-mt-2">
        <h1 className="relative -z-10 font-bold m-0 p-0 text-4xl md:text-5xl lg:text-7xl text-white drop-shadow-lg">
          ABOUT US
        </h1>
      </div>

      {/* description */}
      <div className="mt-3 md:mt-6 text-center px-5 md:px-0">
        <h3 className="text-xl lg:text-3xl text-white m-0 p-0 max-w-[800px]">
          We are a group of undergraduate computer science students from Bandung
          Institute Of Technology (ITB). This website aims to fulfill assignment
          from algorithm strategy course.
        </h3>
      </div>
      <div className="flex flex-col md:flex-row gap-20 mt-20 md:justify-center">
        <Link
          href={"https://github.com/qrst0"}
          className="flex flex-col items-center gap-5"
          target="blank"
        >
          <Image
            src={pp1}
            alt="PP1"
            className="rounded-full ring-2 ring-gray-300 dark:ring-gray-500 p-1 lg:max-w-72 transition duration-300 ease-in-out hover:scale-110"
            priority={true}
          ></Image>
          <h1 className="text-3xl lg:text-4xl text-white font-bold">Kristo</h1>
        </Link>
        <Link
          href={"https://github.com/Farhannr28"}
          className="flex flex-col items-center gap-5"
          target="blank"
        >
          <Image
            src={pp2}
            alt="PP2"
            className="rounded-full ring-2 ring-gray-300 dark:ring-gray-500 p-1 lg:max-w-72 transition duration-300 ease-in-out hover:scale-110"
          ></Image>
          <h1 className="text-3xl lg:text-4xl text-white font-bold">Farhan</h1>
        </Link>
        <Link
          href={"https://github.com/ninoaddict"}
          className="flex flex-col items-center gap-5"
          target="blank"
        >
          <Image
            src={pp3}
            alt="PP3"
            className="rounded-full ring-2 ring-gray-300 dark:ring-gray-500 p-1 lg:max-w-72 transition duration-300 ease-in-out hover:scale-110"
          ></Image>
          <h1 className="text-3xl lg:text-4xl text-white font-bold">Adril</h1>
        </Link>
      </div>
    </main>
  );
}
