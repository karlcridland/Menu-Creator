import { EditItem } from "./EditItem.js";
import "../utilities.js";

export class EditItemNutrition extends EditItem {

    constructor(target){
        super(target);
        this.macros = {
            'Calories': 'kcal',
            'Carbohydrates' : 'grams', 
            'of which Sugars': 'grams', 
            'Protein': 'grams', 
            'Fat': 'grams', 
            'Fibre': 'grams', 
            'Salt': 'grams'
        };

    }

}

