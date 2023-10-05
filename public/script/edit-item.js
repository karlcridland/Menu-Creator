import { EditItemCategory } from "./edit-item/EditItemCategory.js";
import { EditItemTitles } from "./edit-item/EditItemTitles.js";
import { EditItemIngredients } from "./edit-item/EditItemIngredients.js";
import { editor } from "./editing-panel.js";
import { MenuItem } from "./menu-item.js";
import { createElement } from "./results.js";
import "../script/helper.js";
import { EditItemAllergens } from "./edit-item/EditItemAllergens.js";
import { EditItemNutrition } from "./edit-item/EditItemNutrition.js";

export const editItemDiv = document.getElementById('edit-item');
export const editContainer = document.getElementById('edit-item-container');
export const editItemClose = document.getElementById('edit-item-close');

const footerDiv = document.getElementById('edit-item-footer-2');

const title = document.getElementById('edit-item-title');
const camera = document.getElementById('edit-item-camera');
const hidden = document.getElementById('edit-item-hidden');
const eyeball = document.getElementById('eyeball');
const favourite = document.getElementById('edit-item-favourite');
const remove = document.getElementById('edit-item-delete');
const close = document.getElementById('edit-item-close');

camera.help('update picture');
favourite.help('favourite');
remove.help('remove');
close.help('close');

const headers = {
    'category': true, 
    'titles': true, 
    'ingredients': true, 
    // 'customise': false, 
    'nutrition': false, 
    'allergens': false, 
    // 'price': false
};

const headersDiv = document.getElementById('edit-item-toolbar');
const headerButtons = {};

Object.entries(headers).forEach(([header, necessary]) => {
    const button = createElement(headersDiv, 'button', null, `edit-item-header-${header}`);
    headerButtons[header] = button;
    button.innerHTML = `<div>${header}</div>${necessary ? '<span></span>' : ''}`;

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
    if (isCompleted) headerButtons[target].classList.add('completed');
    else headerButtons[target].classList.remove('completed');
}

function blink(item){
    eyeball.src = `../resources/${item.hidden ? 'hidden' : 'visible'}.svg`;
    document.getElementById('edit-item-hidden').help(item.hidden ? 'hidden' : 'visible');
}

export function editItem(target, autosave){
    editContainer.style.transform = 'unset';
    setTimeout(() => {
        editContainer.style.opacity = '1';
    }, 20);

    const item = target || new MenuItem(undefined);
    title.textContent = item.title;
    markCompleted('category', item.category !== null && item.category !== undefined && item.category !== '');
    markCompleted('titles', item.title !== null && item.title !== undefined && item.title !== '');
    markCompleted('ingredients', item.ingredients.length > 0);
    
    hidden.onclick = function(){
        item.hidden = !item.hidden;
        item.setHidden();
        blink(item);
    }
    blink(item);

    let displays = {};

    function openSection(id, editItem){
        headerButtons[id].onclick = function(){
            if (!displays[id]) displays[id] = editItem.display;
            footerDiv.innerHTML = '';
            footerDiv.appendChild(displays[id]);
            editItem.headerButton = headerButtons[id];
            editItem.stylesheet(id);
        }
    }

    openSection('category', new EditItemCategory(item, autosave));
    openSection('titles', new EditItemTitles(item, autosave));
    openSection('ingredients', new EditItemIngredients(item, autosave));
    openSection('nutrition', new EditItemNutrition(item, autosave));
    openSection('allergens', new EditItemAllergens(item, autosave));

    headerButtons['category'].click();

}