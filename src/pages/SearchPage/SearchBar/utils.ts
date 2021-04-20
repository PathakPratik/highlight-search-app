import { MusicData } from "../index";

const Options = ["title", "description", "keywords"] as const;

type Option = typeof Options[number] | "all";

const getSearchKeys = (option: Option) =>
  option === "all" ? Options : [option];

export const search = (
  data: MusicData,
  term: string,
  option: Option = "all"
) => {
  if (term === "") return data;

  const searchTerm = term.toLowerCase();

  const keys = getSearchKeys(option);

  return data.filter((row) => {
    return keys.some((key) => {
      const currSearch = row[key].toString().replace(/<\/?[^>]+(>|$)/g, "").toLowerCase();

      return currSearch.includes(searchTerm);
    });
  });
};
