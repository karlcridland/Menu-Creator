import { createElement } from "../results.js";

let stylesheets = [];

export class EditItem{

    constructor(target, autosave){
        this.target = target;
        this.target.shouldAutosave = this.target.shouldAutosave || autosave;
        this.display = document.createElement('div');

        if (!autosave) this.target.necessary = this.target.necessary || {
            category: false,
            titles: false,
            ingredients: false
        }
    }
    
    stylesheet(id){
        this.type = id;
        if (stylesheets.includes(id)) return;
        stylesheets.push(id);
        
        const link = createElement(document.head, 'link');
        link.setAttribute('href', `./style/edit-item-${id}.css`);
        link.setAttribute('rel', `stylesheet`);
    }

    shouldAutosave(){
        return this.target;
    }

    autosave(){
        console.log(this.shouldAutosave());
        const self = this;
        if (!this.shouldAutosave()){
            const isReady = Object.values(this.target.necessary).filter(x => x === false).length === 0;
            if (isReady){
                self.target.save();
                this.target.shouldAutosave = true;
            }
        }
    }
    
    markCompleted(isCompleted){
        const self = this;
        if (self.headerButton){
            if (isCompleted) self.headerButton.classList.add('completed');
            else self.headerButton.classList.remove('completed');

            if (Object.keys(self.target.necessary).includes(self.type)){
                self.target.necessary[self.type] = isCompleted;
            }
        }
    }

}