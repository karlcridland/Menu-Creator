import { EditItem } from "./EditItem.js";
import "../utilities.js";
import { createElement } from "../results.js";

export class EditItemNutrition extends EditItem {

    constructor(target, autosave) {

        super(target, autosave);

        this.display.setAttribute('id', 'edit-item-nutrition-display');

        this.selection = 'Calories';

        this.macros = {
            'Calories': 'kcal',
            'Carbohydrates': 'grams',
            'of which Sugars': 'grams',
            'Protein': 'grams',
            'Fat': 'grams',
            'Fibre': 'grams',
            'Salt': 'grams'
        };

        this.scrollList = createElement(this.display, 'div', 'grey-area', 'edit-item-nutrition-scroll');
        this.result = createElement(this.display, 'div', 'grey-area', 'edit-item-nutrition-result');

        this.displayMacros();
    }

    displayMacros() {
        const self = this;
        this.scrollList.innerHTML = '';

        let buttons = [];

        Object.entries(this.macros).forEach(([macro, unit]) => {
            const button = createElement(self.scrollList, 'button', 'edit-item-nutrition-button');
            buttons.push(button);
            const title = createElement(button, 'h1');
            title.textContent = macro;

            let shouldClickButton = true;

            button.addEventListener('click', () => {
                buttons.map(x => x.classList.remove('selected'));
                button.classList.add('selected');

                this.result.innerHTML = '';

                const input = createElement(this.result, 'input');
                const u = createElement(this.result, 'div');
                u.textContent = unit.shorthand();
                
                input.value = self.target.macros[macro] || '0';

                input.addEventListener('input', function () {
                    this.value = this.value.replace(/[^0-9.]/g, '').replace(/^0+(\d+)/, '$1');
                    var parts = this.value.split('.');
                    if (parts.length > 2) this.value = parts[0] + '.' + parts.slice(1, 2).join('');
                    if (parts[1] && parts[1].length > 2) this.value = parts[0] + '.' + parts[1].slice(0, 2);
                    if (this.value === '.') this.value = '0.';

                    self.selection = 
                    self.target.macros[macro] = Number(this.value) === 0 ? null : input.value;
                    self.autosave();
                });

                input.focus();
                input.select();

            })

            buttons[0].click();
        })
    }

    autosave() {
        super.autosave();
        const self = this;
        if (self.shouldAutosave()) {
            console.log(this.target.macros);
            self.target.setNutrition();
        }
    }

}

