import { updateCategories } from "./categories.js";
import { editItem } from "./edit-item.js";
import { readDB, writeDB } from "./firebase.js";
import { ingredients } from "./ingredient.js";
import { profile } from "./profile.js";
import { createElement, displayCategories, results } from "./results.js";
import { months } from "./utilities.js";
import "../script/helper.js";
import { removeHelper } from "../script/helper.js";

export class MenuItem {

    constructor(id) {
        this.id = id || this.createID();
        this.ingredients = [];
        this.hidden = true;

        this.titleReady = false;
        this.categoryReady = false;
        this.ingredientsReady = false;
    }

    isReady() {
        if (this.ready) return true;
        this.titleReady = this.title !== null && this.title !== undefined && this.title !== '';
        this.categoryReady = this.category !== null && this.category !== undefined && this.category !== '';
        this.ingredientsReady = this.ingredients.length > 0;
        if (this.titleReady && this.categoryReady && this.ingredientsReady) {
            this.ready = true;
            return true;
        }
        return false;
    }

    display() {
        if (this.isReady()){
            if (results.filter((x) => x.id === this.id) < 1) results.push(this);
            displayCategories();
        }
    }

    createID() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}:${month}:${day}:${hours}:${minutes}:${seconds}`;
    }

    setHidden() {
        const uid = profile.uid;
        writeDB(`menus/${uid}/${this.id}/hidden`, this.hidden);
    }

    getHidden() {
        const menuItem = this;
        const uid = profile.uid;
        readDB(`menus/${uid}/${this.id}/hidden`, (hidden) => {
            menuItem.hidden = hidden;
            menuItem.display();
        });
    }

    setTitles() {
        const uid = profile.uid;
        writeDB(`menus/${uid}/${this.id}/title`, this.title);
        writeDB(`menus/${uid}/${this.id}/subtitle`, this.subtitle);
    }

    getTitles() {
        const menuItem = this;
        const uid = profile.uid;
        readDB(`menus/${uid}/${this.id}/title`, (title) => {
            menuItem.title = title;
            readDB(`menus/${uid}/${this.id}/subtitle`, (subtitle) => {
                menuItem.subtitle = subtitle;
                menuItem.display();
            });
            menuItem.display();
        });
    }

    setCategory() {
        const uid = profile.uid;
        writeDB(`menus/${uid}/${this.id}/category`, this.category);
    }

    getCategory() {
        const menuItem = this;
        const uid = profile.uid;
        readDB(`menus/${uid}/${this.id}/category`, (category) => {
            menuItem.category = category;
            menuItem.display();
            updateCategories();
        });
    }

    setIngredients(ingredients, callback) {
        const uid = profile.uid;
        if (ingredients) this.ingredients = ingredients;
        writeDB(`menus/${uid}/${this.id}/ingredients`, this.ingredients);
    }

    getIngredients() {
        const menuItem = this;
        const uid = profile.uid;
        readDB(`menus/${uid}/${this.id}/ingredients`, (ingr) => {
            menuItem.ingredients = ingr ? ingr.map(x => ingredients[x]) : [];
            menuItem.display();
        });
    }

    getData() {
        this.getTitles();
        this.getCategory();
        this.getIngredients();
        this.getHidden();
    }

    symbols() {
        const menuItem = this;
        const entries = { 
            'vegetarian': menuItem.isVegetarian(),
            'vegan': menuItem.isVegan(),
            'favourite': menuItem.isFavourited(),
        };

        let all_symbols = [];
        Object.entries(entries).forEach(([id, shouldContinue]) => {
            if (shouldContinue){
                const symbol = createElement(undefined, 'button', 'thumbnail-symbol');
                symbol.setAttribute('style', 'margin-left: unset');
                const image = createElement(symbol, 'img', 'thumbnail-symbol');
                image.src = `../resources/${id}.png`;
                all_symbols.push(symbol);

                symbol.help(id);
            }
        })

        return all_symbols;
    }

    getThumbnail() {
        const menuItem = this;
        const thumbnail = createElement(undefined, 'div', 'thumbnail');
        const header = createElement(thumbnail, 'div', 'header');
        const date = createElement(header, 'button', 'date');
        const dateImage = createElement(date, 'img', 'date');

        this.symbols().forEach((symbol) => {
            header.appendChild(symbol);
        })

        createElement(header, 'div', 'buffer');
        const settings = createElement(header, 'button', 'thumbnail-settings');
        const settingsImage = createElement(settings, 'img', 'thumbnail-settings');
        const text = createElement(thumbnail, 'div', 'text-section');
        const title = createElement(text, 'h1');
        const subtitle = createElement(text, 'h2');
        const ingredients = createElement(text, 'h3');

        settings.help('edit');
        settingsImage.src = './resources/settings.svg';

        title.textContent = this.title;
        subtitle.textContent = this.subtitle;
        ingredients.textContent = this.ingredients.map(x => x.locales[profile.language]).join(', ') + '.';

        const ds = this.id.split(':');
        const timestamp = `${ds[3]}:${ds[4]} ${ds[2].ordinate()} ${months[Number(ds[1]) - 1]} ${ds[0]}`;
        dateImage.src = `../resources/sortbycreated.svg`;
        date.help(timestamp);

        settings.addEventListener('click', () => {
            editItem(menuItem, true);
            removeHelper();
        });

        // settingsImage.click();

        return thumbnail;
    }

    isVegetarian() {
        let isVeggie = true;
        this.ingredients.forEach((ingredient) => {
            if (!ingredient.isVegetarian()) isVeggie = false;
        })
        return isVeggie;
    }

    isVegan() {
        let isVeggie = true;
        this.ingredients.forEach((ingredient) => {
            if (!ingredient.isVegan()) isVeggie = false;
        })
        return isVeggie;
    }

    isFavourited() {
        return false;
    }

}

String.prototype.ordinate = function () {
    const n = Number(this);
    if (n >= 10 && n <= 20) return `${this}th`;
    switch (n % 10) {
        case 1: return `${this}st`;
        case 2: return `${this}nd`;
        case 3: return `${this}rd`;
        default: return `${this}th`;
    }
}