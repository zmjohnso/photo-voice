interface SearchTextConstants {
  searchText: string;
  photoLocationText: string;
  dateOfPhotoText: string;
  authorNameText: string;
  startDateText: string;
  endDateText: string;
}

export const getSearchTextConstants = (
  languageMode: string
): SearchTextConstants => {
  return {
    searchText: languageMode === "en-US" ? "Search" : "検索",
    photoLocationText: languageMode === "en-US" ? "Photo Location" : "撮影場所",
    dateOfPhotoText: languageMode === "en-US" ? "Date of Photo" : "撮影年月",
    authorNameText:
      languageMode === "en-US" ? "Author/Photographer Name" : "撮影者・筆者名",
    startDateText: languageMode === "en-US" ? "Start Date" : "開始日",
    endDateText: languageMode === "en-US" ? "End Date" : "終了日",
  };
};
