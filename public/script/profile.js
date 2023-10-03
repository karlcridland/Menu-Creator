import { writeDB } from "./firebase.js";
import { setSearchBonus } from "./ingredient.js";
import { MenuItem } from "./menu-item.js";
import { getResults } from "./results.js";

export var profile;

export function setProfile(uid) {
    profile = new Profile(uid);
    getResults();
    setSearchBonus();

    // const item = new MenuItem(null);
    // item.setTitles('Cheesy beans on toast', 'Classic English Breakfast.')
    // item.setIngredients(['ING000204','ING000205', 'ING000071']);
    // item.setCategory('Breakfast');

    // document.getElementById('new-item').click();

}

export class Profile {

    constructor(uid) {
        this.uid = uid;
        this.getInformation();
        this.language = 'en';
    }

    getInformation() {
        const p = this;
        const uid = p.uid;
    }

    setName(first, last) {
        const p = this;
        const uid = p.uid;
        return new Promise((resolve, reject) => {
            writeDB(`users/${uid}/information/first_name`, first).then(() => {
                writeDB(`users/${uid}/information/last_name`, last).then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        })
    }

}