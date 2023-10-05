import { EditItem } from "./EditItem.js";
import "../utilities.js";
import { createElement } from "../results.js";
import { allergens, getAllergens } from "../allergen.js";

export class EditItemAllergens extends EditItem {

    constructor(target) {

        super(target);

        this.display.setAttribute('id', 'edit-item-allergen-display');
        this.target.allergens = this.target.allergens || []

        const left = createElement(this.display, 'div', 'edit-item-allergen-section');
        const right = createElement(this.display, 'div', 'edit-item-allergen-section');

        const doesNot = createElement(left, 'h1');
        const does = createElement(right, 'h1');

        doesNot.textContent = 'Doesn\'t contain:';
        does.textContent = 'Contains:';

        this.left = createElement(left, 'div', 'grey-area', 'edit-item-allergen-doesnt');
        this.right = createElement(right, 'div', 'grey-area', 'edit-item-allergen-contains');

        this.displayAllergens();
    }

    displayAllergens() {
        const self = this;
        let targetAllergens = [];
        self.left.innerHTML = '';
        self.right.innerHTML = '';
        this.target.ingredients.forEach((ingredient) => {
            getAllergens(ingredient.id).forEach((allergen) => {
                if (!targetAllergens.includes(allergen)) targetAllergens.push(allergen);
            })
        })

        const a = [
            {
                'ingredients': targetAllergens,
                'class': 'unmutable',
                'target': self.right
            },
            {
                'ingredients': self.target.allergens,
                'target': self.right
            },
            {
                'ingredients': Object.keys(allergens).filter(x => !targetAllergens.includes(x) && !self.target.allergens.includes(x)),
                'target': self.left
            }];

        a.forEach((data) => {
            data.ingredients.forEach((allergen) => {
                let classes = ['edit-item-allergen'];
                if (data.class) classes.push(data.class);
                const block = createElement(data.target, 'div', classes.join(' '));
                block.textContent = allergen;

                block.onclick = function () {
                    if (self.target.allergens.includes(allergen)) {
                        const index = self.target.allergens.indexOf(allergen);
                        self.target.allergens.splice(index, 1);
                    }
                    else {
                        self.target.allergens.push(allergen);
                    }
                    self.autosave();
                    self.displayAllergens();
                }

            })
        })
    }

    autosave() {
        super.autosave();
        const self = this;
        if (self.shouldAutosave()) {
            self.target.setAllergens();
        }
    }

}

