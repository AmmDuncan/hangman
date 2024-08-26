import data from "@/assets/data.json";

export type Category = keyof typeof data.categories;

export type CategoryOption = (typeof data.categories)[Category][number];
