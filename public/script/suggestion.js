import { ingredients } from "./ingredient.js";

class Suggestion {

    constructor() {
        this.display = document.getElementById('suggestion');
        this.shouldFollow = false;
        this.left = document.getElementById('suggest-left');
        this.right = document.getElementById('suggest-right');
        this.action = document.getElementById('current-suggestion');

        const self = this;
        this.left.addEventListener('click', function () {
            self.suggestLeft();
        });
        this.right.addEventListener('click', function () {
            self.suggestRight();
        });

        self.display.addEventListener('focus', () => {
            suggestion.display.style.display = 'flex';
        })
    }

    setText(input) {
        try{
            const value = ingredients[input].name;
            this.action.textContent = value;
        }
        catch(e){
            this.action.textContent = 'No suggestions.';
        }
    }

    reposition(element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left + (rect.width / 2);
        const y = rect.top - 12;
        const transform = `translate(calc(${x}px - 50%), calc(${y}px - 100%))`;
        this.display.style.transform = transform;
    }

    setSuggestions(suggestions) {
        this.suggestions = suggestions;
        this.currentSuggestion = 0;
        this.updateButtons();
    }

    suggestRight() {
        const self = this;
        self.currentSuggestion++;
        self.updateButtons();
    }

    suggestLeft() {
        const self = this;
        self.currentSuggestion--;
        self.updateButtons();
    }

    getCurrentSuggestion(){
        const self = this;
        return self.suggestions[self.currentSuggestion];
    }

    updateButtons() {
        const self = this;
        if (self.suggestions.length > 0) {
            self.left.style.display = 'block';
            self.right.style.display = 'block';
            self.setText(self.suggestions[self.currentSuggestion]);
            switch (this.currentSuggestion) {
                case 0:
                    self.left.classList.add('disable');
                    if (self.suggestions.length === 1) self.right.classList.add('disable');
                    break;
                case (self.suggestions.length - 1):
                    self.right.classList.add('disable');
                    break;
                default:
                    self.left.classList.remove('disable');
                    self.right.classList.remove('disable');
                    return;
            }
        }
        else {
            self.left.style.display = 'none';
            self.right.style.display = 'none';
            self.setText('No suggestions.');
        }
    }

}

const suggestion = new Suggestion();

HTMLElement.prototype.suggest = function (suggestions) {
    const self = this;
    suggestion.setSuggestions(suggestions);
    setTimeout(() => {
        suggestion.reposition(self);
        suggestion.display.style.display = 'flex';
    }, 200);
    return suggestion;
}

export function removeSuggestion() {
    suggestion.display.style.display = 'none';
}