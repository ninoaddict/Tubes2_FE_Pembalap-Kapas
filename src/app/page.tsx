import { ParticleContainer } from "./components/particle-containers";
import Search from "./components/ui/search";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-[90vh] px-4">
      {/* Background */}
      <div className="absolute top-0 left-0">
        <ParticleContainer />
      </div>

      {/* Title */}
      <div className="md:-mt-2">
        <h1 className="relative -z-10 font-bold m-0 p-0 text-4xl md:text-5xl lg:text-7xl text-white drop-shadow-lg">
          WIKIPEDIA RACE
        </h1>
      </div>

      {/* description */}
      <div className="mt-3 md:mt-6 text-center px-5 md:px-0">
        <h3 className="text-xl lg:text-3xl text-white m-0 p-0 ">
          Find shortest paths between two wikipedia pages using IDS or BFS
        </h3>
      </div>

      <Search />
    </main>
  );
}
