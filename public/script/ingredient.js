import { readDB, writeDB } from "./firebase.js";

export let ingredients = {};
export let dishes = {};

export class Ingredient {

    constructor(name, locales, tags) {
        this.name = name;
        this.locales = locales;
        this.tags = tags;
    }

    isVegetarian() {
        return !this.tags.includes('meat') && !this.tags.includes('fish') && !this.tags.includes('seafood');
    }

    isVegan(){
        return this.isVegetarian() && !this.tags.includes('dairy');
    }

}

export function getIngredients(callback){
    if (Object.keys(ingredients) > 0){
        callback();
        return;
    }
    readDB('ingredients', (data) => {
        Object.entries(data).forEach(([key, value]) => {
            const ingredient = new Ingredient(value.name, value.locales, value.tags);
            if (value.tags !== undefined && !value.tags.includes('meal')) ingredients[key] = ingredient;
            else dishes[key] = ingredient;
        })
        console.log(getIngredient('cheddar'));
        callback();
    })
}

export function getIngredient(name){
    const ing = Object.keys(ingredients).filter(x => ingredients[x].name.toLowerCase().includes(name));
    if (ing.length === 1) return ing[0];
    return null;
}