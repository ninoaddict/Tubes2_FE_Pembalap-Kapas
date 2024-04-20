"use server";

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
