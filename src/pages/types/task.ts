export interface ValidInitialQueryParams {
  initialCategory: string | string[];
  initialSort: string | string[];
}

export enum RequiredQueryParams {
  Sort = "sort",
  Category = "category",
  Page = "page",
  Limit = "limit"
}

export enum SortQueryParam {
  Desc = "-1",
  Asc = "1"
}