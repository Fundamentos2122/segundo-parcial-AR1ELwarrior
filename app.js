 const formReceta = document.getElementById("form-recipe");
 const recipeList = document.getElementById("view");
 const ingredients = document.getElementById("ingredient-name");
 const keylist="recipeList";
 const keying="ingredients";

document.addEventListener("DOMContentLoaded", function(){
    formReceta.addEventListener("submit", submitRecipe);
    formReceta.addEventListener("button", saveIng);
    paintRecipeList();
});


function submitRecipe(e){
    e.preventDefault();
    e.stopPropagation();

    let recipe = {
        id: Date.now(),
        title: formReceta["title"].value,
        description: formReceta["img_url"].value,
        img_url: formReceta["description"].value
       // ingredientes: formReceta["ingredient-name"].value
    };


    let list= getRecipes();

    list.push(recipe);

     localStorage.setItem(keylist, JSON.stringify(list));

     paintRecipeList();

}


function paintRecipeList(){
    let list = getRecipes();

    let html = '';

    for(var i=0; i < list.length; i++){
        html +=
        `<div class="[ row ] [ flex ]" data-state="wrap">
            <div class="[ col ]">
                <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${i.id}">
                    <img src="${i.img_url}" alt="">
                    <div class="[ flow ]">
                        <h5>${i.title}</h5>
                        <div class="[ flex ]" data-state="justify-between">
                            <button class="[ btn ]" data-state="white" onclick="getRecipe(${i.id})">Ver</button>
                            <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${i.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    recipeList.innerHTML= html;
}

function getRecipes(){
    let list = JSON.parse(localStorage.getItem(keylist));

    if(list === null){
        return [];
    }
    else{
        return list;
    }

}

function deleteRecipe(id){
     let list = getRecipes();

     list = list.filter(i => i.id !== id);

     localStorage.setItem(keylist, JSON.stringify(list));

    let recipe = document.getElementById(id);

    recipe.className += '[ hide ]';

    setTimeout(() => {    
     recipe.remove(); 
    }, 1000);


}

function saveIng(e){
    e.preventDefault();
    e.stopPropagation();

    let ing = {
        id: Date.now(),
        ingredientes: formReceta["ingredient-name"].value
    };


    let listing= getIng();

    listing.push(ing);

     localStorage.setItem(keying, JSON.stringify(ing));

     addIng();

}

function addIng(){
    let listing = getIng();

    let html = '';

    for(var i=0; i < listing.length; i++){
        html +=
        `<li class="[ bg-white color-gray ]">
        Ingrediente ${i.id} 
        <button class="close" type="button" onclick="deleteIng(${i.id} >X</button>
    </li>`;
    }

    ingredients.innerHTML= html;
}
function getIng(){
    let listing = JSON.parse(localStorage.getItem(keying));

    if(listing === null){
        return [];
    }
    else{
        return listing;
    }

}

function deleteIng(id){
     let listing = getIng();

     listing = listing.filter(i => i.id !== id);

     localStorage.setItem(keying, JSON.stringify(listing));

    let ingredient = document.getElementById(id);

    ingredient.className += 'hide';

    setTimeout(() => {    
        ingredient.remove(); 
    }, 1000);

}

