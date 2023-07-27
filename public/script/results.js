import { MenuItem } from "./MenuItem.js";

let results = [];
let openCategory = 'All';

const categoryPanel = document.getElementById('category-panel');
const resultsDiv = document.getElementById('results');

function getResults(){
    //TODO: this is temporary code, create a call to a database to get information through

    const menuItemA = new MenuItem("", "Chicken Wrap", "Lunch");
    const menuItemB = new MenuItem("", "Chocolate Pudding", "Dessert");
    const menuItemC = new MenuItem("", "BLT Sandwich", "Lunch");
    const menuItemD = new MenuItem("", "Full English", "Breakfast");
    const menuItemE = new MenuItem("", "Full English", "Breakfast");
    const menuItemF = new MenuItem("", "Full English", "Breakfast");
    const menuItemG = new MenuItem("", "Full English", "Breakfast");
    const menuItemH = new MenuItem("", "Full English", "Breakfast");
    const menuItemI = new MenuItem("", "Full English", "Breakfast");
    const menuItemJ = new MenuItem("", "Full English", "Breakfast");

    [menuItemA, menuItemB, menuItemC, menuItemD, menuItemE, menuItemF, menuItemG, menuItemH, menuItemI, menuItemJ].forEach(function(item){
        results.push(item);
    })

    displayCategories();

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

function displayCategories(){
    let categories = {"All": [], "Visible": [], "Hidden": []};
    let buttons = {};

    categoryPanel.innerHTML = '';

    results.forEach((result) => {
        if (!Object.keys(categories).includes(result.category)) categories[result.category] = [];
        categories["All"].push(result);
        categories[result.category].push(result);
    })

    Object.entries(categories).forEach(([category, res]) => {
        const button = createElement(categoryPanel, 'button', 'category');
        buttons[category] = button;
        button.innerHTML = `<div>${category} (${res.length})</div><span>${res.map(x => x.name).join(', ')}</span>`;
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

getResults();

export function createElement(target, type, elementClass, id){
    const element = document.createElement(type);
    if (elementClass) element.setAttribute('class', elementClass);
    if (id) element.setAttribute('id', id);
    if (target) target.appendChild(element);
    return element;
}