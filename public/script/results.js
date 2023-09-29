import { readDBKeys } from "./firebase.js";
import { getIngredients } from "./ingredient.js";
import { MenuItem } from "./menu-item.js";
import { profile } from "./profile.js";

export let results = [];
let openCategory = 'All';

const categoryPanel = document.getElementById('category-results');
const resultsDiv = document.getElementById('results');

export function getResults(){
    getIngredients(() => {
        readDBKeys(`menus/${profile.uid}/`, (keys) => {
            keys.forEach((id) => {
                const menuItem = new MenuItem(id);
                if (results.filter((x) => x.id === id) < 1) results.push(menuItem);
                menuItem.getData();
            });
        })
    })
}

function displayResults(res){
    resultsDiv.innerHTML = '';
    let y;
    let thumbnails = [];

    function adaptResultSizes(){
        let y = undefined;
        let onlyTopRow = true;
        thumbnails.forEach((thumbnail) => {
            if (y === undefined) y = thumbnail.getBoundingClientRect().bottom;
            if (thumbnail.getBoundingClientRect().bottom !== y) onlyTopRow = false;
        })
        resultsDiv.style.gridTemplateColumns = `repeat(auto-fit, minmax(300px, ${onlyTopRow ? '400px' : '1fr'}))`;
    }

    res.forEach((result) => {
        const thumbnail = result.getThumbnail()
        resultsDiv.appendChild(thumbnail);
        thumbnails.push(thumbnail);
    })

    adaptResultSizes();
    window.onresize = adaptResultSizes;
}

export function displayCategories(){
    let categories = {"All": [], "Visible": [], "Hidden": []};
    let buttons = {};

    categoryPanel.innerHTML = '';

    results.forEach((result) => {
        if (!Object.keys(categories).includes(result.category)) categories[result.category] = [];
        categories["All"].push(result);
        categories[result.hidden ? 'Hidden' : 'Visible'].push(result);
        categories[result.category].push(result);
    })

    Object.entries(categories).forEach(([category, res]) => {
        const button = createElement(categoryPanel, 'button', 'category');
        buttons[category] = button;
        button.innerHTML = `<div>${category} (${res.length})</div><span>${res.map(x => x.title).join(', ')}</span>`;
        button.addEventListener('click', () => {
            openCategory = category;
            displayResults(res);

            Object.values(buttons).forEach((button) => {
                button.classList.remove('selected-category');
            })
            button.classList.add('selected-category');

        })
    })

    buttons[openCategory].click();
}

export function createElement(target, type, elementClass, id){
    const element = document.createElement(type);
    if (elementClass) element.setAttribute('class', elementClass);
    if (id) element.setAttribute('id', id);
    if (target) target.appendChild(element);
    return element;
}