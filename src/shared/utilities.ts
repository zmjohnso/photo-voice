export const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
};

export enum LogicalOperators {
  And = "AND",
  Or = "OR",
  Not = "NOT",
  None = "NONE",
}

export enum DateLogicalOperators {
  Before = "BEFORE",
  After = "AFTER",
  None = "NONE",
}

export enum SearchState {
  Simple = "SIMPLE",
  Advanced = "ADVANCED",
}

export interface NameOrLocationData {
  value: string;
  operator: LogicalOperators;
}

export interface DateData {
  value: Date;
  operator: DateLogicalOperators;
}

export type Locale = "en-US" | "ja";
