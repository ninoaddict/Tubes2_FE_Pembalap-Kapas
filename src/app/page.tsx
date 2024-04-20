import { ParticleContainer } from "./components/particle-containers";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-[90vh]">
      <div className="absolute top-0 left-0">
        <ParticleContainer />
      </div>
    </main>
  );
}
