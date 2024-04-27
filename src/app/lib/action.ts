"use server";

import { error } from "console";

const dns = process.env.NEXT_PUBLIC_HOST;

export async function findPath(
  base: string,
  goal: string,
  isIds: boolean,
  isMulti: boolean
) {
  const request = {
    origin: base,
    target: goal,
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
  return data;
}

export async function fetchWikipedia(term: string) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${term}`
    );
    const data = await response.json();
    if (data.length > 1) {
      return data[1];
    }
    return [];
  } catch (error) {
    // handle error
    return [];
  }
}

export async function getWikiUrl(title: string) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${title}&prop=info&inprop=url`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];

  if (pageId === "-1") {
    throw error;
  }

  const url = pages[pageId].fullurl;
  return url;
}
