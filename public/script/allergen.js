
export let allergens = {
    "celery": [],
    "cereals": [],
    "crustaceans": [],
    "eggs": [],
    "fish": [],
    "lupin": [],
    "milk": [],
    "molluscs": [],
    "mustard": [],
    "peanuts": [],
    "sesame": [],
    "soya": [],
    "sulphites": [],
    "tree nuts": []
};

export function setAllergen(allergen, ingredient){
    if (!allergens[allergen].includes(ingredient)) allergens[allergen].push(ingredient);
}

export function getAllergens(ingredient){
    let allAllergens = [];
    Object.entries(allergens).forEach(([allergen, ingredients]) => {
        if (ingredients.includes(ingredient)) allAllergens.push(allergen);
    })
    return allAllergens;
}