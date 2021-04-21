import { search } from "../utils";
import rawData from "../../CardDataset.json";

const {
  sections: [{ assets: musicData }],
} = rawData;

const HighlightedTitleHoly =
  "<span class=HighlightText>Holy</span>, <span class=HighlightText>Holy</span>, <span class=HighlightText>Holy</span>";
const HighlightedTitleAll =
  "<span class=HighlightText>All</span> Who Enter Here are strong";
const HighlightedTitleSpan =
  "Let It Be Done Unto Me <span class=HighlightText>span</span>ish";
const HighlightedTitleSpanish =
  "Let It Be Done Unto Me <span class=HighlightText>spanish</span>";

let data: typeof musicData;

describe("Search functionality", () => {
  afterEach(() => {
    data = JSON.parse(JSON.stringify(musicData));
  });

  test("should show all cards if search term empty", () => {
    const result = search(data, "");
    expect(result).toStrictEqual(data);
  });

  test("should not match with wrong search term", () => {
    const result = search(data, "ijks");
    expect(result).toStrictEqual([]);
  });

  test("should search in all fields", () => {
    const result = search(data, "holy");
    expect(result.some((each) => each.title === HighlightedTitleHoly)).toBe(
      true
    );
    expect(result.some((each) => each.title === "Be With Us, Mary")).toBe(true);
  });

  test("should search in title field", () => {
    const result = search(data, "holy", "title");
    expect(result.some((each) => each.title === HighlightedTitleHoly)).toBe(
      true
    );
    expect(result.some((each) => each.title === "Be With Us, Mary")).toBe(
      false
    );
  });

  test("should search in description field", () => {
    const result = search(data, "hou", "description");
    expect(
      result.some((each) => each.title === "All Who Enter Here are strong")
    ).toBe(true);
  });

  test("should search in keywords field", () => {
    const result = search(data, "holy", "keywords");
    expect(result.some((each) => each.title === "Be With Us, Mary")).toBe(true);
  });

  test("should search multiple words seperately", () => {
    const result = search(data, "spanish rose");
    expect(result.some((each) => each.title === HighlightedTitleSpanish)).toBe(
      true
    );
    expect(
      result.some((each) => each.title === "Holiness is Faithfulness")
    ).toBe(true);
  });
});

describe("Multiple words search", () => {
  afterEach(() => {
    data = JSON.parse(JSON.stringify(musicData));
  });

  test("should search for & highlight each word individually", () => {
    const result = search(data, "holy christ");
    expect(result.some((each) => each.title === HighlightedTitleHoly)).toBe(
      true
    );
    expect(result.some((each) => each.title === "Be With Us, Mary")).toBe(true);
  });
  test("should ignore html tag - span", () => {
    const result = search(data, "all span");
    expect(result.some(({ title }) => title === HighlightedTitleSpan)).toBe(
      true
    );
    expect(result.some(({ title }) => title === HighlightedTitleAll)).toBe(
      true
    );
  });
});

describe("HTML tags sanitisation", () => {
  afterEach(() => {
    data = JSON.parse(JSON.stringify(musicData));
  });

  test("should ignore html tag - italic", () => {
    const result = search(data, "italic");
    expect(result).toStrictEqual([]);
  });
  test("should ignore html tag - span", () => {
    const result = search(data, "span");
    expect(result.some(({ title }) => title === HighlightedTitleSpan)).toBe(
      true
    );
  });
});
