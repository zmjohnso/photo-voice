import type { VoiceEntry } from "./content";

export enum LogicalOperator {
  And = "AND",
  Or = "OR",
  Not = "NOT",
  None = "NONE",
}

export enum DateLogicalOperator {
  Before = "BEFORE",
  After = "AFTER",
}

export enum SearchMode {
  Simple = "SIMPLE",
  Advanced = "ADVANCED",
}

export interface TextCriterion {
  value: string;
  operator: LogicalOperator;
}

export interface DateCriterion {
  value: string;
  operator: DateLogicalOperator;
}

export interface SearchCriteria {
  mode: SearchMode;
  locations: TextCriterion[];
  authors: TextCriterion[];
  dates: DateCriterion[];
  startDate: string | null;
  endDate: string | null;
}

export const emptySearchCriteria = (): SearchCriteria => ({
  mode: SearchMode.Simple,
  locations: [],
  authors: [],
  dates: [],
  startDate: null,
  endDate: null,
});

const textCriterionFromParam = (value: string): TextCriterion => {
  const [possibleOperator, ...parts] = value.split(":");
  const operator = Object.values(LogicalOperator).includes(
    possibleOperator as LogicalOperator,
  )
    ? (possibleOperator as LogicalOperator)
    : LogicalOperator.None;

  return {
    operator,
    value: operator === LogicalOperator.None ? value : parts.join(":").trim(),
  };
};

const dateCriterionFromParam = (value: string): DateCriterion | null => {
  const [possibleOperator, ...parts] = value.split(":");
  if (
    possibleOperator !== DateLogicalOperator.Before &&
    possibleOperator !== DateLogicalOperator.After
  ) {
    return null;
  }

  return {
    operator: possibleOperator,
    value: parts.join(":").trim(),
  };
};

export const searchCriteriaFromParams = (
  params: URLSearchParams,
): SearchCriteria => {
  const mode =
    params.get("mode") === "advanced" ? SearchMode.Advanced : SearchMode.Simple;

  if (mode === SearchMode.Simple) {
    return {
      ...emptySearchCriteria(),
      locations: params.get("location")
        ? [
            {
              value: params.get("location")!,
              operator: LogicalOperator.None,
            },
          ]
        : [],
      authors: params.get("author")
        ? [
            {
              value: params.get("author")!,
              operator: LogicalOperator.None,
            },
          ]
        : [],
      startDate: params.get("start"),
      endDate: params.get("end"),
    };
  }

  return {
    ...emptySearchCriteria(),
    mode,
    locations: params
      .getAll("location")
      .map(textCriterionFromParam)
      .filter(({ value }) => value),
    authors: params
      .getAll("author")
      .map(textCriterionFromParam)
      .filter(({ value }) => value),
    dates: params
      .getAll("date")
      .map(dateCriterionFromParam)
      .filter(
        (value): value is DateCriterion => value !== null && !!value.value,
      ),
  };
};

const normalizedMonth = (value: string) => value.slice(0, 7);

const locationMatches = (entry: VoiceEntry, value: string) => {
  const query = value.toLocaleLowerCase();
  const location = entry.photoLocation;

  return [location.prefecture, location.city, location.detail]
    .filter(Boolean)
    .some((part) => part!.toLocaleLowerCase().includes(query));
};

const authorMatches = (entry: VoiceEntry, value: string) =>
  entry.voiceAuthor.name === value;

const filterSimple = (entry: VoiceEntry, criteria: SearchCriteria) => {
  const locationsMatch = criteria.locations.every(({ value }) =>
    locationMatches(entry, value),
  );
  const authorsMatch = criteria.authors.every(({ value }) =>
    authorMatches(entry, value),
  );
  const entryMonth = normalizedMonth(entry.photoDate);
  const startsInRange =
    !criteria.startDate || entryMonth >= normalizedMonth(criteria.startDate);
  const endsInRange =
    !criteria.endDate || entryMonth <= normalizedMonth(criteria.endDate);

  return locationsMatch && authorsMatch && startsInRange && endsInRange;
};

const filterAdvanced = (entry: VoiceEntry, criteria: SearchCriteria) => {
  const textCriteria = [
    ...criteria.locations.map((criterion) => ({
      ...criterion,
      matches: locationMatches(entry, criterion.value),
    })),
    ...criteria.authors.map((criterion) => ({
      ...criterion,
      matches: authorMatches(entry, criterion.value),
    })),
  ];

  const andMatches = textCriteria
    .filter(({ operator }) => operator === LogicalOperator.And)
    .every(({ matches }) => matches);
  const notMatches = textCriteria
    .filter(({ operator }) => operator === LogicalOperator.Not)
    .every(({ matches }) => !matches);
  const orCriteria = textCriteria.filter(
    ({ operator }) => operator === LogicalOperator.Or,
  );
  const orMatches =
    orCriteria.length === 0 || orCriteria.some(({ matches }) => matches);

  const entryMonth = normalizedMonth(entry.photoDate);
  const datesMatch = criteria.dates.every(({ value, operator }) => {
    const criterionMonth = normalizedMonth(value);
    return operator === DateLogicalOperator.Before
      ? entryMonth < criterionMonth
      : entryMonth > criterionMonth;
  });

  return andMatches && notMatches && orMatches && datesMatch;
};

export const filterVoiceEntries = (
  entries: VoiceEntry[],
  criteria: SearchCriteria,
) =>
  entries.filter((entry) =>
    criteria.mode === SearchMode.Simple
      ? filterSimple(entry, criteria)
      : filterAdvanced(entry, criteria),
  );
