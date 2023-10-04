import { readDB, readOnceDB, writeDB } from "../firebase.js";
import { ingredientMatch, ingredients } from "../ingredient.js";
import { profile } from "../profile.js";
import { createElement } from "../results.js";
import { removeSuggestion } from "../suggestion.js";
import { EditItem } from "./EditItem.js";

export class EditItemIngredients extends EditItem {

    constructor(target, autosave) {
        super(target, autosave);
        const self = this;
        this.display.setAttribute('id', 'edit-item-ingredients-display')
        this.results = createElement(this.display, 'div', 'edit-item-ingredient-results');
        this.settings = createElement(this.display, 'div', null, 'edit-item-ingredient-settings');
        this.input = createElement(this.settings, 'input', null, 'edit-item-ingredient-input');
        this.suggestion = createElement(this.settings, 'button', null, 'edit-item-ingredients-suggestion');
        this.help = createElement(this.settings, 'button', null, 'edit-item-ingredients-help');
        self.displayIngredients();
        self.path = [];

        this.input.setAttribute('placeholder', 'new ingredient');

        const helpIcon = createElement(this.help, 'img');
        helpIcon.src = `../../resources/help.svg`;
        this.help.help('Can\'t see an ingredient?');

        this.newIngredient();

    }

    newIngredient() {
        const self = this;

        let suggestion;
        let mouseover = false;

        suggestion = self.promptSuggestion();
        this.suggestion.appendChild(suggestion.display);

        this.input.addEventListener('focus', () => {
            
            suggestion.display.onmouseover = function () {
                mouseover = true;
            }
            suggestion.display.onmouseout = function () {
                mouseover = false;
            }

            suggestion.action.onclick = function () {
                self.selectIngredient(suggestion);
            }

            this.input.addEventListener('blur', () => {
                if (!mouseover) removeSuggestion();
            });

            this.input.addEventListener('keypress', (e) => {
                self.updatePath();
            });

            this.input.addEventListener('keyup', (e) => {
                self.updatePath();
                suggestion = self.promptSuggestion();
                if (e.key === 'Enter' || e.keyCode === 13) suggestion.action.click();
            });

        });

        return this.input;
    }

    selectIngredient(suggestion) {
        const self = this;
        const currentSuggestion = suggestion.getCurrentSuggestion();
        self.path.forEach((chars) => {
            readOnceDB(`search/ingredients/${profile.uid}/${chars}`, (dbResults) => {
                let newResults = dbResults;
                if (!Object.keys(newResults).includes(currentSuggestion)) newResults[currentSuggestion] = 0;
                newResults[currentSuggestion]++;
                writeDB(`search/ingredients/${profile.uid}/${chars}`, newResults);
            })
        })
        self.target.ingredients.push(ingredients[currentSuggestion]);
        self.displayIngredients();
        self.removeSuggestion();
        self.autosave();
    }

    removeSuggestion() {
        const self = this;
        self.input.value = '';
        self.input.blur();
        removeSuggestion();
        self.autosave();
    }

    updatePath() {
        const self = this;
        if (!self.path.includes(self.input.value)) self.path.push(self.input.value);
        self.path = self.path.filter(x => x.length <= self.input.value.length);
        if (self.input.value.length === 0) self.path = [];
    }

    promptSuggestion() {
        const self = this;
        const results = sortByValue(ingredientMatch(self.input.value));

        const currentKeys = self.target.ingredients.map(x => x.id);
        const names = Object.keys(results).filter(x => !currentKeys.includes(x));
        let s = self.input.suggest(names);
        return s;
    }

    // createNewIngredient() {
    //     const display = createElement(this.display, 'div', 'edit-item-new-ingredient');
    //     this.input = createElement(display, 'input');
    //     this.input.setAttribute('placeholder', 'New ingredient');
    //     return display;
    // }

    displayIngredients() {
        const self = this;
        self.results.innerHTML = '';
        self.target.ingredients.forEach((ingredient) => {
            const block = createElement(self.results, 'div', 'edit-item-ingredient', `ingredient-${ingredient}`);
            block.textContent = ingredient.name;
            block.onclick = function () {
                const index = self.target.ingredients.map(x => x.id).indexOf(ingredient.id);
                self.target.ingredients.splice(index, 1);
                self.displayIngredients();
                self.removeSuggestion();
            }
        });
        // self.results.appendChild(self.newIngredient());
    }

    autosave(){
        super.autosave();
        const self = this;
        if (self.shouldAutosave){
            self.target.setIngredients();
        }
    }

}

function sortByValue(obj) {
    const keyValueArray = Object.entries(obj);
    keyValueArray.sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(keyValueArray);
}