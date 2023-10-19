import { createElement } from "../results.js";
import { EditItem } from "./EditItem.js";

const title = document.getElementById('edit-item-title');

export class EditItemTitles extends EditItem {

    constructor(target, autosave) {
        
        super(target, autosave);
        
        const self = this;

        const infoPack = { 
            'title': 'e.g. Spaghetti Bolognese', 
            'subtitle': 'e.g. Rich, meaty, and utterly satisfying Italian classic.' 
        }

        const inputs = {};

        Object.entries(infoPack).forEach(([key, value]) => {
            const title = createElement(self.display, 'h1', 'edit-item-text-title');
            title.textContent = key;
            const input = createElement(self.display, 'input', 'edit-item-text-input', `input-${key}`);
            inputs[key] = input;
            input.setAttribute('placeholder', value);
        })

        inputs['title'].value = target.title || '';
        inputs['subtitle'].value = target.subtitle || '';

        inputs['title'].addEventListener('keyup', () => {
            const val = inputs['title'].value;
            title.textContent = val;
            target.title = val;
            self.markCompleted(val.length > 0);
            self.autosave();
        })

        inputs['subtitle'].addEventListener('keyup', () => {
            target.subtitle = inputs['subtitle'].value;
            console.log('test 2')
            self.autosave();
        })

    }

    autosave(){
        super.autosave();
        const self = this;
        if (self.shouldAutosave()){
            self.target.setTitles();
        }
    }

}