export function formatTitle(s: string) {
  let decodeUrl = decodeURIComponent(s);
  return decodeUrl.slice(30).replaceAll("_", " ");
}
