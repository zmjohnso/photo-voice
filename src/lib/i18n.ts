import type { Locale } from "./domain/content";

const copy = {
  "en-US": {
    languageName: "English",
    nav: {
      home: "Home",
      search: "Search",
      about: "About",
      contact: "Contact",
    },
    controls: {
      menu: "Open navigation",
      github: "View source on GitHub",
      language: "Change language",
      theme: "Change color theme",
      close: "Close",
    },
    search: {
      simple: "Simple",
      advanced: "Advanced",
      submit: "Search",
      location: "Photo Location",
      date: "Date of Photo",
      author: "Author/Photographer Name",
      startDate: "Start Date",
      endDate: "End Date",
      operator: "Operator",
      add: "Add",
      removeAll: "Remove All Conditions",
      criteria: "Search Criteria",
      none: "None yet.",
      noResults:
        "No voices found for your search parameters. Please alter your search and try again.",
      and: "And",
      or: "Or",
      not: "Not",
      before: "Before",
      after: "After",
    },
    author: {
      group: "Group",
      viewVoices: "View all my Voices",
    },
    contact: {
      address: "Address",
      message: "Message",
      sendEmail: "Send email",
      sendMessage: "Send message",
      fullName: "Full Name",
      email: "Email Address",
      yourMessage: "Your Message",
      required: "Field is required.",
    },
    errors: {
      title: "Oops, something went wrong.",
      description: "Please return to the home page and try again.",
      home: "Return home",
    },
  },
  ja: {
    languageName: "日本語",
    nav: {
      home: "ホーム",
      search: "検索",
      about: "事業概要",
      contact: "お問い合わせ",
    },
    controls: {
      menu: "ナビゲーションを開く",
      github: "GitHubでソースを見る",
      language: "言語を変更",
      theme: "カラーテーマを変更",
      close: "閉じる",
    },
    search: {
      simple: "シンプル",
      advanced: "高度",
      submit: "検索",
      location: "撮影場所",
      date: "撮影年月",
      author: "撮影者・筆者名",
      startDate: "開始日",
      endDate: "終了日",
      operator: "演算子",
      add: "追加",
      removeAll: "条件をすべて削除",
      criteria: "検索条件",
      none: "まだありません。",
      noResults:
        "検索結果がありません。ご検索条件を変更して、再試行してください。",
      and: "かつ",
      or: "または",
      not: "除外",
      before: "以前",
      after: "以後",
    },
    author: {
      group: "グループ",
      viewVoices: "自分のボイスをすべて見る",
    },
    contact: {
      address: "住所",
      message: "メッセージ",
      sendEmail: "メールを送る",
      sendMessage: "メッセージを送る",
      fullName: "お名前",
      email: "メールアドレス",
      yourMessage: "メッセージ",
      required: "必須項目です。",
    },
    errors: {
      title: "エラーが発生しました。",
      description: "ホームページに戻って、もう一度お試しください。",
      home: "ホームに戻る",
    },
  },
} as const;

export const copyFor = (locale: Locale) => copy[locale];

export const localeFromLanguage = (language?: string | null): Locale =>
  language?.toLocaleLowerCase().startsWith("ja") ? "ja" : "en-US";
