import { search } from "../utils";
import rawData from "../../CardDataset.json";

const {
  sections: [{ assets: data }],
} = rawData;

const HighlightedTitleHoly =
  "<span class=HighlightText>Holy</span>, <span class=HighlightText>Holy</span>, <span class=HighlightText>Holy</span>";
const HighlightedTitleSpan =
  "Let It Be Done Unto Me <span class=HighlightText>span</span>ish";

describe("Search functionality", () => {
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

  test.skip("should search in description field", () => {
    const result = search(data, "holy", "description");
    expect(result.some((each) => each.title === "Holy, Holy, Holy")).toBe(true);
    expect(result.some((each) => each.title === "Be With Us, Mary")).toBe(
      false
    );
  });

  test.skip("should search in keywords field", () => {
    const result = search(data, "holy", "keywords");
    expect(result.some((each) => each.title === "Holy, Holy, Holy")).toBe(true);
    expect(result.some((each) => each.title === "Be With Us, Mary")).toBe(
      false
    );
  });

  test.skip("should search multiple words seperately", () => {
    const result = search(data, "spanish rose");
    expect(
      result.some((each) => each.title === "Let It Be Done Unto Me spanish")
    ).toBe(true);
    expect(
      result.some((each) => each.title === "Holiness is Faithfulness")
    ).toBe(true);
  });
});

describe("HTML tags sanitisation", () => {
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
