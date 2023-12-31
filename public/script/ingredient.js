import { allergens, setAllergen } from "./allergen.js";
import { readDB, writeDB } from "./firebase.js";
import { SearchBonus } from "./search-bonus.js";

export let ingredients = {};
export let dishes = {};

let searchBonus;

export function setSearchBonus() {
    searchBonus = new SearchBonus();
}

export class Ingredient {

    constructor(id, name, locales, tags) {
        this.id = id;
        this.name = name;
        this.locales = locales;
        this.tags = tags;
    }

    isVegetarian() {
        return !this.tags.includes('meat') && !this.tags.includes('fish') && !this.tags.includes('seafood');
    }

    isVegan() {
        return this.isVegetarian() && !this.tags.includes('dairy');
    }

    allergens(){
        let temp = [];
        Object.entries(allergens).forEach(([allergen, ingredients]) => {
            if (ingredients.includes(self.id)) temp.push(allergen);
        })
        return temp;
    }

    searchable() {
        let results = [];
        results.push(this.name);
        this.tags.map(x => results.push(x));
        return results;
    }

    stringSimilarity(text1, text2) {
        const tokenize = (text) => text.toLowerCase().split('');

        const tokens1 = new Set(tokenize(text1));
        const tokens2 = new Set(tokenize(text2));

        const intersection = new Set([...tokens1].filter(token => tokens2.has(token)));
        const union = new Set([...tokens1, ...tokens2]);

        const similarity = intersection.size / union.size;

        return similarity;
    }

    textMatch(inputText) {
        const self = this;
        const normalizedInput = inputText.toLowerCase();
        const normalizedName = this.name.toLowerCase();
        const searchableItems = this.searchable().map(item => item.toLowerCase());

        if (normalizedName === normalizedInput) return 5;

        let score = 0;
        searchableItems.forEach((item) => {
            score += this.stringSimilarity(normalizedInput, item);
        })

        return score;
    }


}

export function getIngredients(callback) {
    if (Object.keys(ingredients) > 0) {
        callback();
        return;
    }
    readDB('ingredients', (data) => {
        Object.entries(data).forEach(([key, value]) => {
            const ingredient = new Ingredient(key, value.name, value.locales, value.tags);
            if (value.tags !== undefined && !value.tags.includes('meal')) ingredients[key] = ingredient;
            else dishes[key] = ingredient;

            if (value.name.includes('lettuce')){
                console.log(ingredient.id+" "+ingredient.name);
            }

            if (value.allergens) {
                value.allergens.forEach((allergen) => {
                    setAllergen(allergen, key);
                })
            }

        })
        // console.log(allergens);
        callback();
    })
}

export function getIngredient(name) {
    const ing = Object.keys(ingredients).filter(x => ingredients[x].name.toLowerCase().includes(name));
    if (ing.length === 1) return ing[0];
    return null;
}

export function ingredientMatch(text) {
    const bonus = searchBonus.results[text];
    let results = {};
    Object.entries(ingredients).forEach(([key, ingredient]) => {
        const textMatch = ingredient.textMatch(text);
        const score = bonus ? textMatch + bonus[key] : textMatch;
        if (score > 0.1) results[key] = score;
    })
    return results;
}