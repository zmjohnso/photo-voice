import { describe, expect, test } from "vitest";
import {
  DateLogicalOperator,
  LogicalOperator,
  SearchMode,
  filterVoiceEntries,
  searchCriteriaFromParams,
  type SearchCriteria,
} from "./search";
import type { VoiceEntry } from "./content";

const entries: VoiceEntry[] = [
  {
    id: "tokyo-taro",
    title: "Tokyo in spring",
    voice: "A Tokyo story",
    photos: [
      {
        title: "Tokyo",
        description: "Tokyo in spring",
        url: "https://images.example/tokyo.jpg",
        width: 1200,
        height: 800,
      },
    ],
    photoDate: "2023-04-15",
    photoLocation: {
      prefecture: "Tokyo",
      city: "Shinjuku",
      detail: "Shinjuku Gyoen",
    },
    voiceAuthor: {
      id: "taro",
      name: "Taro Yamada",
      groupLocation: "Tokyo",
    },
  },
  {
    id: "miyagi-hanako",
    title: "Miyagi coast",
    voice: "A Miyagi story",
    photos: [
      {
        title: "Miyagi",
        description: "Miyagi coast",
        url: "https://images.example/miyagi.jpg",
        width: 1200,
        height: 800,
      },
    ],
    photoDate: "2024-01-10",
    photoLocation: {
      prefecture: "Miyagi",
      city: "Ishinomaki",
    },
    voiceAuthor: {
      id: "hanako",
      name: "Hanako Suzuki",
      groupLocation: "Miyagi",
    },
  },
];

const emptyCriteria = (mode = SearchMode.Simple): SearchCriteria => ({
  mode,
  locations: [],
  authors: [],
  dates: [],
  startDate: null,
  endDate: null,
});

describe("filterVoiceEntries", () => {
  test("returns every voice when no criteria are selected", () => {
    expect(filterVoiceEntries(entries, emptyCriteria())).toEqual(entries);
  });

  test("matches simple location, author, and inclusive month boundaries", () => {
    const criteria: SearchCriteria = {
      ...emptyCriteria(),
      locations: [{ value: "Shinjuku", operator: LogicalOperator.None }],
      authors: [{ value: "Taro Yamada", operator: LogicalOperator.None }],
      startDate: "2023-04",
      endDate: "2023-04",
    };

    expect(filterVoiceEntries(entries, criteria).map(({ id }) => id)).toEqual([
      "tokyo-taro",
    ]);
  });

  test("applies advanced AND, OR, and NOT criteria consistently", () => {
    const criteria: SearchCriteria = {
      ...emptyCriteria(SearchMode.Advanced),
      locations: [
        { value: "Tokyo", operator: LogicalOperator.And },
        { value: "Miyagi", operator: LogicalOperator.Not },
      ],
      authors: [
        { value: "Taro Yamada", operator: LogicalOperator.Or },
        { value: "Nobody", operator: LogicalOperator.Or },
      ],
      dates: [
        { value: "2024-01", operator: DateLogicalOperator.Before },
        { value: "2023-01", operator: DateLogicalOperator.After },
      ],
    };

    expect(filterVoiceEntries(entries, criteria).map(({ id }) => id)).toEqual([
      "tokyo-taro",
    ]);
  });
});

describe("searchCriteriaFromParams", () => {
  test("parses shareable advanced search parameters", () => {
    const params = new URLSearchParams();
    params.set("mode", "advanced");
    params.append("location", "AND:Tokyo");
    params.append("author", "NOT:Nobody");
    params.append("date", "AFTER:2023-01");

    expect(searchCriteriaFromParams(params)).toMatchObject({
      mode: SearchMode.Advanced,
      locations: [{ value: "Tokyo", operator: LogicalOperator.And }],
      authors: [{ value: "Nobody", operator: LogicalOperator.Not }],
      dates: [{ value: "2023-01", operator: DateLogicalOperator.After }],
    });
  });
});
