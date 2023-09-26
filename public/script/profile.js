import { writeDB } from "./firebase.js";
import { MenuItem } from "./menu-item.js";
import { getResults } from "./results.js";

export var profile;

export function setProfile(uid) {
    profile = new Profile(uid);
    profile.setName('Karl', 'Cridland');
    getResults();

    // const item = new MenuItem(null);
    // item.setTitles('Spaghetti Bolognese', 'Traditional Italian style.')
    // item.setIngredients(['Spaghetti', 'Beef', 'Bolognese Sauce', 'Parmesan']);
    // item.setCategory('Dinner');
}

export class Profile {

    constructor(uid) {
        this.uid = uid;
        this.getInformation();
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