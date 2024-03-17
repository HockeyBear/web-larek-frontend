import { CategoryType } from "../types"; 
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const category: {[key: CategoryType]: string} = {
  "софт-скилл": "card_soft-skill",
  "хард-скилл": "card_hard-skill",
  "другое": "card_other",
  "кнопка": "card_button",
  "доп": "card_additional"
}