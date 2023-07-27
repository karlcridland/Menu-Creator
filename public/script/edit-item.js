import { editor } from "./editing-panel.js";

export const editItemDiv = document.getElementById('edit-item');
export const editContainer = document.getElementById('edit-item-container');

export function editItem(){
    editContainer.style.transform = 'unset';
    setTimeout(() => {
        editContainer.style.opacity = '1';
    }, 20);
}

export function closeEditItem(){
    editContainer.style.opacity = '0';
    setTimeout(() => {
        editContainer.style.transform = 'translateX(100%)';
    }, 300);
}

editContainer.onclick = function(){
    closeEditItem();
};

editItemDiv.onclick = function(e){
    e.stopPropagation();
}