import { ResultData } from "@/app/lib/interface";
import ResultGraph from "./graph";

export default function Result({ visitedNum, paths, time }: ResultData) {
  return (
    <div>
      {/* Result Text */}
      <div className="text-center text-white text-3xl">
        Found <b>{paths.length} paths</b> in <b>{visitedNum} articles</b> with{" "}
        <b>{paths[0].length - 1} degrees</b> of separation in{" "}
        <b>{time} seconds!</b>
      </div>

      {/* Graph */}
      <ResultGraph paths={paths} />
    </div>
  );
}
