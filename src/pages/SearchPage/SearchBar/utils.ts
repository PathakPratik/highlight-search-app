import { MusicData } from "../index";

const Options = ["title", "description", "keywords"] as const;

type Option = typeof Options[number] | "all";

const getSearchKeys = (option: Option) =>
  option === "all" ? Options : [option];

const HtmlSanitizeRe = /<\/?[^>]+(>|$)/g;

export const search = (
  data: MusicData,
  term: string,
  option: Option = "all"
): MusicData => {
  const keys = getSearchKeys(option);

  const cleanHighlight = highlight(data, term, keys, true);

  if (term === "") return cleanHighlight;

  const searchTerm = term.toLowerCase();

  const filteredData = cleanHighlight.filter((row) => {
    return keys.some((key) => {
      const currSearch = row[key]
        .toString()
        .replace(HtmlSanitizeRe, "")
        .toLowerCase();

      return currSearch.includes(searchTerm);
    });
  });

  return highlight(filteredData, term, keys);
};

const highlight = (
  filteredData: MusicData,
  term: string,
  keys: ReturnType<typeof getSearchKeys>,
  remove = false
): MusicData => {
  const re = remove
    ? new RegExp(HtmlSanitizeRe)
    : new RegExp("(" + term + ")", "gi");
  const replacement = remove ? "" : "<span class=HighlightText>$1</span>";

  const highlightedData = filteredData.map((row) => {
    let resRow = row;
    keys.forEach((key) => {
      if (key === "title") {
        resRow[key] = row[key].replace(re, replacement);
      } else {
        resRow[key][0] = row[key][0].replace(re, replacement);
      }
    });
    return resRow;
  });

  return highlightedData;
};
