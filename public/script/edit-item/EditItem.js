export class EditItem{

    constructor(target, autosave){
        this.target = target;
        this.shouldAutosave = autosave;
        this.display = document.createElement('div');
    }

    autosave(){

    }
    
    markCompleted(isCompleted){
        const self = this;
        if (isCompleted) self.headerButton.classList.add('completed');
        else self.headerButton.classList.remove('completed');
    }

}