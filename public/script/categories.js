import { results } from "./results.js";

export let categories = [];

export function updateCategories(){
    results.forEach((menuItem) => {
        if (!categories.includes(menuItem.category))categories.push(menuItem.category);
    })
}