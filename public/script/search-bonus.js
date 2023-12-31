import { readDB } from "./firebase.js";

export class SearchBonus{

    constructor(){
        this.results = {};
        this.getResults();
        this.max = 0;
    }

    getResults(){
        const self = this;
        readDB('search/ingredients', (users) => {
            Object.values(users).forEach((results) => {
                Object.entries(results).forEach(([key, ings]) => {
                    if (!self.results[key]) self.results[key] = {};
                    Object.entries(ings).forEach(([ing, value]) => {
                        if (!self.results[key][ing]) self.results[key][ing] = 0;
                        self.results[key][ing] += value;
                        if (value > self.max) self.max = value;
                    });
                });
            });
            self.normalise();
        });
    }

    normalise(){
        const self = this;
        let temp = {};
        Object.entries(self.results).forEach(([key, ings]) => {
            let result = {};
            Object.entries(ings).forEach(([ing, value]) => {
                result[ing] = value / self.max;
            })
            temp[key] = result;
        })
        self.results = temp;
    }

    result(chars){

    }

}