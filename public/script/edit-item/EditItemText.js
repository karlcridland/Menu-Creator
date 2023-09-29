import { EditItem } from "./EditItem.js";

export class EditItemText extends EditItem{

    constructor(info){
        super();
        const x = this;
        Object.entries(info).forEach(([key, value]) => {
            const input = createElement(x.display, 'input', 'edit-item-text-input', `input-${key}`);
            input.value = value;
        })
    }
    
}