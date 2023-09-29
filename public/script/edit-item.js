import { editor } from "./editing-panel.js";
import { MenuItem } from "./menu-item.js";
import { createElement } from "./results.js";

export const editItemDiv = document.getElementById('edit-item');
export const editContainer = document.getElementById('edit-item-container');
export const editItemClose = document.getElementById('edit-item-close');

const title = document.getElementById('edit-item-title');
const hidden = document.getElementById('edit-item-hidden');
const eyeball = document.getElementById('eyeball');

const headers = ['category', 'titles', 'ingredients', 'nutrition', 'allergens'];
const headersDiv = document.getElementById('edit-item-toolbar');
const headerButtons = {};

headers.forEach((header) => {
    const button = document.createElement('button');
    headerButtons[header] = button;
    button.innerHTML = `<div>${header}</div><span></span>`;
    headersDiv.appendChild(button);

    button.addEventListener('click', () => {
        Object.values(headerButtons).forEach((b) => {
            b.classList.remove('selected');
        });
        button.classList.add('selected');
    })
})

export function closeEditItem(){
    editContainer.style.opacity = '0';
    setTimeout(() => {
        editContainer.style.transform = 'translateX(100%)';
        markCompleted('category', false);
        markCompleted('titles', false);
        markCompleted('ingredients', false);
        headerButtons['category'].classList.remove('selected');
        headerButtons['titles'].classList.remove('selected');
        headerButtons['ingredients'].classList.remove('selected');
        headerButtons['nutrition'].classList.remove('selected');
    }, 300);
}

editItemDiv.onclick = function(e){
    e.stopPropagation();
}

editContainer.onclick = closeEditItem;
editItemClose.onclick = closeEditItem;

function markCompleted(target, isCompleted){
    if (isCompleted){
        headerButtons[target].classList.add('completed');
    }
    else{
        headerButtons[target].classList.remove('completed');
    }
}

export function editItem(target){
    editContainer.style.transform = 'unset';
    setTimeout(() => {
        editContainer.style.opacity = '1';
    }, 20);

    const item = target || new MenuItem(undefined);
    title.textContent = item.title;
    markCompleted('category', item.category !== null);
    markCompleted('titles', item.title !== null);
    markCompleted('ingredients', item.ingredients.length > 0);

    headerButtons['category'].classList.add('selected');

    function blink(){
        eyeball.src = `../resources/${item.hidden ? 'hidden' : 'visible'}.svg`;
    }
    
    hidden.onclick = function(){
        item.hidden = !item.hidden;
        item.setHidden();
        blink();
    }

    blink();

}