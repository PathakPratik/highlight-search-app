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
  const searchTerm = term.toLowerCase().trim().split(" ");

  if (term === "") return data;

  const filteredData = data.filter((row) => {
    return keys.some((key) => {
      const currSearch = row[key]
        .toString()
        .replace(HtmlSanitizeRe, "")
        .toLowerCase();

      return searchTerm.some((each) => currSearch.includes(each));
    });
  });

  return highlight(filteredData, searchTerm, keys);
};

const highlight = (
  filteredData: MusicData,
  terms: Array<string>,
  keys: ReturnType<typeof getSearchKeys>
): MusicData => {
  const replacement = "<span class=HighlightText>$1</span>";

  const highlightedData = filteredData.map((row) => {
    let resRow = row;
    keys.forEach((key) => {
      if (key === "title") {
        resRow[key] = replaceWithRegex(
          row[key],
          getHighLightRegEx(terms),
          replacement
        );
      } else {
        resRow[key][0] = replaceWithRegex(
          row[key][0],
          getHighLightRegEx(terms),
          replacement
        );
      }
    });
    return resRow;
  });

  return highlightedData;
};

const getHighLightRegEx = (terms: Array<string>) =>
  new RegExp("(" + terms.join("|") + ")", "gi");

const replaceWithRegex = (
  value: string,
  re: ReturnType<typeof getHighLightRegEx>,
  replacement: string
) => {
  return value.replace(re, replacement);
};
