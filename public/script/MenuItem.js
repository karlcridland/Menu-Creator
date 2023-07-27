import { createElement } from "./results.js";

export class MenuItem{

    constructor(id, name, category){
        this.id = id;
        this.name = name;
        this.category = category;
        // this.ingredients = ingredients;
    }

    getData(){

    }

    getThumbnail(){
        const thumbnail = createElement(undefined, 'div', 'thumbnail');
        const header = createElement(thumbnail, 'div', 'header');
        const date = createElement(header, 'div', 'date');
        const settings = createElement(header, 'button', 'thumbnail-settings');
        const settingsImage = createElement(settings, 'img', 'thumbnail-settings');
        const title = createElement(thumbnail, 'h1');

        settingsImage.src = './resources/settings.svg';

        date.style.flexGrow = '1';
        title.textContent = this.name;

        return thumbnail;
    }

}

export class Ingredient{

    constructor(name){
        this.name = name;
    }

}