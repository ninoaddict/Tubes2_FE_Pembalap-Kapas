"use client";

import { useState } from "react";
import TitleInput from "./title-input";
import { ResultData } from "@/app/lib/interface";
import { getWikiUrl, findPath } from "@/app/lib/action";
import Swal from "sweetalert2";
import Result from "./result";
import error from "next/error";

export default function Search() {
  const [base, setBase] = useState<string>("Apple");
  const [goal, setGoal] = useState<string>("Orange");
  const [isIds, setIsIds] = useState<boolean>(false);
  const [isMulti, setIsMulti] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  function handleExchange() {
    let currBase = base;
    let currGoal = goal;

    setBase(currGoal);
    setGoal(currBase);
  }

  const dns = "localhost";
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResultData(null);
    setLoading(true);

    // get base url
    var urlBase;
    try {
      urlBase = await getWikiUrl(base);
    } catch (error) {
      let timerInterval;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `Tidak ada page dengan judul <b>${base}</b>`,
        background: "rgb(55 65 81)",
        color: "#f3f3f3",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval!);
        },
      });
      setLoading(false);
      return;
    }

    var urlGoal;
    // get goal url
    try {
      urlGoal = await getWikiUrl(goal);
    } catch (error) {
      // TODO: pake swal
      let timerInterval;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `Tidak ada page dengan judul <b>${goal}</b>`,
        background: "rgb(55 65 81)",
        color: "#f3f3f3",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval!);
        },
      });
      setLoading(false);
      return;
    }

    // find path
    try {
      const request = {
        origin: urlBase,
        target: urlGoal,
      };
      let response;

      if (isIds) {
        if (isMulti) {
          response = await fetch(`http://${dns}:8080/ids?solution=multi`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          });
        } else {
          response = await fetch(`http://${dns}:8080/ids?solution=single`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          });
        }
      } else {
        if (isMulti) {
          response = await fetch(`http://${dns}:8080/bfs?solution=multi`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          });
        } else {
          response = await fetch(`http://${dns}:8080/bfs?solution=single`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
          });
        }
      }

      if (!response.ok) {
        throw error;
      }

      const data = await response.json();
      setResultData(data);
    } catch (error) {
      let timerInterval;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `Unexpected error occured`,
        background: "rgb(55 65 81)",
        color: "#f3f3f3",
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval!);
        },
      });
    }
    setLoading(false);
  }

  return (
    <div className="mt-8 md:mt-12 lg:mt-16 flex flex-col gap-8 box-border">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8"
      >
        <div className="flex gap-4 justify-center items-center flex-col lg:flex-row flex-wrap">
          <TitleInput url={base} setUrl={setBase} />
          <svg
            viewBox="0 0 100 100"
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[52px] lg:h-[52px] fill-white hover:fill-green-400"
            onClick={handleExchange}
          >
            <path d="m76.654 33.16c-0.023-0.116-0.064-0.225-0.102-0.335-0.021-0.059-0.031-0.121-0.056-0.179-0.052-0.122-0.118-0.235-0.187-0.349-0.023-0.04-0.041-0.084-0.066-0.123-0.101-0.149-0.215-0.289-0.342-0.416l-12.49-12.49c-1.074-1.074-2.814-1.074-3.889 0-1.074 1.073-1.074 2.814 0 3.889l7.797 7.798h-40.694c-1.519 0-2.75 1.231-2.75 2.75s1.231 2.75 2.75 2.75h40.694l-7.799 7.799c-1.074 1.073-1.074 2.814 0 3.889 0.537 0.537 1.24 0.806 1.944 0.806s1.407-0.269 1.944-0.806l12.493-12.492c0.127-0.127 0.241-0.267 0.342-0.416 0.025-0.039 0.043-0.083 0.066-0.123 0.068-0.113 0.135-0.227 0.187-0.349 0.024-0.058 0.035-0.12 0.056-0.179 0.037-0.11 0.078-0.219 0.102-0.335 0.035-0.178 0.055-0.359 0.055-0.544s-0.02-0.367-0.055-0.545zm-3.279 30.386h-40.694l7.799-7.799c1.074-1.073 1.074-2.814 0-3.889s-2.814-1.074-3.889 0l-12.493 12.493c-0.127 0.127-0.241 0.267-0.342 0.416-0.024 0.038-0.041 0.08-0.063 0.118-0.069 0.114-0.138 0.229-0.189 0.354-0.023 0.057-0.034 0.118-0.055 0.176-0.037 0.111-0.079 0.221-0.103 0.338-0.036 0.178-0.055 0.359-0.055 0.544s0.019 0.366 0.055 0.544c0.023 0.117 0.065 0.227 0.103 0.338 0.021 0.058 0.031 0.119 0.055 0.176 0.052 0.124 0.12 0.239 0.189 0.354 0.022 0.038 0.039 0.08 0.063 0.118 0.101 0.149 0.215 0.289 0.342 0.416l12.491 12.491c0.537 0.537 1.24 0.806 1.944 0.806s1.407-0.269 1.944-0.806c1.074-1.073 1.074-2.814 0-3.889l-7.797-7.798h40.694c1.519 0 2.75-1.231 2.75-2.75s-1.23-2.751-2.749-2.751z"></path>
          </svg>
          <TitleInput url={goal} setUrl={setGoal} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <label className="flex gap-3 items-center cursor-pointer text-white text-2xl">
            <span>BFS</span>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isIds}
              onChange={() => {
                setIsIds((prev) => !prev);
              }}
            />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span>IDS</span>
          </label>
          <label className="flex gap-3 items-center cursor-pointer text-white text-2xl">
            <span>Single</span>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isMulti}
              onChange={() => {
                setIsMulti((prev) => !prev);
              }}
            />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="mr-1">Multi</span>
          </label>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="relative flex items-center justify-center p-0.5 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          {loading ? (
            <span className="text-2xl lg:min-w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin bg"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </span>
          ) : (
            <span className="text-2xl lg:w-36 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Search
            </span>
          )}
        </button>
      </form>
      {/* If result data exist */}
      {resultData && (
        <Result
          paths={resultData.paths}
          time={resultData.time}
          visitedNum={resultData.visitedNum}
        />
      )}
    </div>
  );
}
