import { createElement, results } from "../results.js";
import { EditItem } from "./EditItem.js";

export class EditItemCategory extends EditItem {

    constructor(target, autosave) {
        super(target, autosave);
        const self = this;
        this.display.setAttribute('id', 'edit-item-category-display')
        this.allCategories = [...new Set(results.map(x => x.category))].sort();

        this.choices = createElement(this.display, 'div', 'edit-item-category-choices');
        const settings = createElement(this.display, 'div', 'edit-item-category-settings');
        const input = createElement(settings, 'input', 'edit-item-category-input');
        input.setAttribute('placeholder', 'New category');
        const submit = createElement(settings, 'button', 'hidden');
        const plus = createElement(submit, 'img');
        plus.src = '../../resources/menuitem.svg';

        this.displayCategories();

        input.addEventListener('keyup', (e) => {
            const legal = input.value.length > 0 && !this.allCategories.includes(input.value);
            if (legal) submit.classList.remove('hidden');
            else submit.classList.add('hidden');

            if (legal && (e.key === 'Enter' || e.keyCode === 13)) submit.click();

        });

        submit.addEventListener('click', () => {
            target.category = input.value;
            self.allCategories.push(target.category);
            self.allCategories.sort();
            submit.classList.add('hidden');
            input.value = '';
            self.displayCategories();
            self.autosave();
            self.markCompleted(true);
        })

    }

    displayCategories() {
        const self = this;
        let options = [];
        let i = 0;
        this.choices.innerHTML = '';
        this.allCategories.forEach((category) => {
            const option = createElement(this.choices, 'button', 'edit-item-category', `category-${category}`);
            options.push(option);
            option.textContent = category;
            if (i++ % 2 === 1) option.classList.add('alternating');
            if (this.target.category === category) option.classList.add('selected');
            option.onclick = function () {
                options.forEach((o) => {
                    o.classList.remove('selected');
                })
                option.classList.add('selected');
                self.target.category = category;
                self.autosave();
                self.markCompleted(true);
            }
        })
        if (this.allCategories.length === 0){
            this.choices.classList.add('edit-item-category-no-choices');
        }
    }

    autosave(){
        super.autosave();
        const self = this;
        if (self.shouldAutosave){
            self.target.setCategory();
        }
    }

}