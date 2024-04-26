"use server";

import { error } from "console";

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
