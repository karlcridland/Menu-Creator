import { updateCategories } from "./categories.js";
import { readDB, writeDB } from "./firebase.js";
import { profile } from "./profile.js";
import { createElement, displayCategories, results } from "./results.js";
import { months } from "./utilities.js";

export class MenuItem{

    constructor(id){
        this.id = id || this.createID();
        this.getData();
        this.hidden = true;
    }

    isReady(){
        if (this.ready) return true;
        const titleReady = this.title !== undefined;
        const categoryReady = this.category !== undefined;
        const ingredientsReady = this.ingredients !== undefined;
        if (titleReady && categoryReady && ingredientsReady){
            this.ready = true;
            return true;
        }
        return false;
    }

    display(){
        if (results.filter((x) => x.id === this.id) < 1) results.push(this);
        if (this.isReady()) displayCategories();
    }

    createID(){
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}:${month}:${day}:${hours}:${minutes}:${seconds}`;
    }

    setHidden(){
        writeDB(`menus/${uid}/${this.id}/hidden`, this.hidden);
    }

    getHidden(){
        const menuItem = this;
        const uid = profile.uid;
        readDB(`menus/${uid}/${this.id}/hidden`, (hidden) => {
            menuItem.hidden = hidden;
            menuItem.display();
        });
    }

    setTitles(title, subtitle){
        this.title = title;
        this.subtitle = subtitle;
        const uid = profile.uid;
        writeDB(`menus/${uid}/${this.id}/title`, this.title);
        writeDB(`menus/${uid}/${this.id}/subtitle`, this.subtitle);
    }

    getTitles(){
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

    setCategory(category){
        const uid = profile.uid;
        if (category) this.category = category;
        writeDB(`menus/${uid}/${this.id}/category`, this.category);
    }

    getCategory(){
        const menuItem = this;
        const uid = profile.uid;
        readDB(`menus/${uid}/${this.id}/category`, (category) => {
            menuItem.category = category;
            menuItem.display();
            updateCategories();
        });
    }

    setIngredients(ingredients, callback){
        const uid = profile.uid;
        if (ingredients) this.ingredients = ingredients;
        writeDB(`menus/${uid}/${this.id}/ingredients`, this.ingredients);
    }

    getIngredients(){
        const menuItem = this;
        const uid = profile.uid;
        readDB(`menus/${uid}/${this.id}/ingredients`, (ingredients) => {
            menuItem.ingredients = ingredients;
            menuItem.display();
        });
    }

    getData(){
        this.getTitles();
        this.getCategory();
        this.getIngredients();
    }

    getThumbnail(){
        const thumbnail = createElement(undefined, 'div', 'thumbnail');
        const header = createElement(thumbnail, 'div', 'header');
        const date = createElement(header, 'div', 'date');
        const settings = createElement(header, 'button', 'thumbnail-settings');
        const settingsImage = createElement(settings, 'img', 'thumbnail-settings');
        const title = createElement(thumbnail, 'h1');
        const subtitle = createElement(thumbnail, 'h2');
        const ingredients = createElement(thumbnail, 'h3');

        settingsImage.src = './resources/settings.svg';

        date.style.flexGrow = '1';
        title.textContent = this.title;
        subtitle.textContent = this.subtitle;
        ingredients.textContent = this.ingredients.join(', ');

        const ds = this.id.split(':');
        date.textContent = `${ds[3]}:${ds[4]} ${ds[2].ordinate()} ${months[Number(ds[1])-1]} ${ds[0]}`;

        return thumbnail;
    }

}

String.prototype.ordinate = function(){
    const n = Number(this);
    if (n >= 10 && n <= 20) return `${this}th`;
    switch (n % 10){
        case 1: return `${this}st`;
        case 2: return `${this}nd`;
        case 3: return `${this}rd`;
        default: return `${this}th`;
    }
}