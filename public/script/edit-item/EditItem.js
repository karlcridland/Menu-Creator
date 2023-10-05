import { createElement } from "../results.js";

let stylesheets = [];

export class EditItem{

    constructor(target, autosave){
        this.target = target;
        this.shouldAutosave = autosave;
        this.display = document.createElement('div');
    }
    
    stylesheet(id){
        if (stylesheets.includes(id)) return;
        stylesheets.push(id);
        
        const link = createElement(document.head, 'link');
        link.setAttribute('href', `./style/edit-item-${id}.css`);
        link.setAttribute('rel', `stylesheet`);
    }

    autosave(){

    }
    
    markCompleted(isCompleted){
        const self = this;
        if (isCompleted) self.headerButton.classList.add('completed');
        else self.headerButton.classList.remove('completed');
    }

}