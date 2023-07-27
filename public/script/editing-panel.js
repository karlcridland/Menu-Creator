import { editItem } from "./edit-item.js";
import { createElement } from "./results.js";

let allButtons = {};

export const editor = document.getElementById('editor');
export const panel = document.getElementById('editing-panel');
export const searchBar = document.getElementById('search');

['select', 'search', '', 'sort by created', 'sort by alphabet', '', 'new item', 'export'].forEach(function (id) {
    if (id === '') {
        panel.appendChild(document.createElement('div'));
    }
    else {
        const button = createElement(panel, 'button', 'panel', id.replaceAll(' ', '-'));
        allButtons[id] = button;

        const image = getButtonImage(id.replaceAll(' ', ''));
        const text = document.createElement('div');
        text.textContent = id;

        createElement(button, 'section');
        button.appendChild(image);
        createElement(button, 'section');
        createElement(button, 'section');
        button.appendChild(text);
        createElement(button, 'section');
    }

})

function groupButtons(buttons) {
    let selected;
    buttons.map(x => allButtons[x]).forEach((button) => {
        button.isSelected = false;
        button.addEventListener('click', () => {
            if (selected === button) {
                button.classList.remove('selected');
                selected = undefined;
                button.isSelected = false;
                return;
            }
            if (selected !== undefined) {
                selected.classList.remove('selected');
                selected.isSelected = false;
            }
            button.classList.add('selected');
            selected = button;
            button.isSelected = true;

        })
    })
}

const select = allButtons['select'];
const search = allButtons['search'];
const newItem = allButtons['new item'];

function getButtonImage(id) {
    const image = document.createElement('img');
    image.src = `./resources/${id}.svg`;
    image.setAttribute('height', '30');
    image.setAttribute('width', '30');
    return image;
}

select.addEventListener('click', () => {
    searchItem(true);
})

search.addEventListener('click', () => {
    if (search.isSelected) searchItem(false);
})

allButtons['search'].addEventListener('click', () => {
    if (allButtons['search'].isSelected) searchItem(true);
    else searchItem(false);
})

function searchItem(isOpen) {
    if (isOpen) {
        searchBar.classList.add('not-searching');
        searchBar.blur();
    }
    else {
        searchBar.classList.remove('not-searching');
        searchBar.focus();
    }
}

newItem.addEventListener('click', () => {
    editItem();
})

groupButtons(['select', 'search']);
groupButtons(['sort by created', 'sort by alphabet']);