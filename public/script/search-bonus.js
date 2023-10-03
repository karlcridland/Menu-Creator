export class SearchBonus{

    constructor(){
        this.results = {};
    }

    getResults(){
        const self = this;
        readDB('search/ingredients', (users) => {
            Object.values(users).forEach((results) => {
                Object.entries(results).forEach((key, value) => {
                    self.results[key] = value;
                });
            });
        });
    }
}