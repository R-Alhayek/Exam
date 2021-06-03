`use strict`;

let myForm = document.getElementById('myForm');
let orders = document.getElementById('orders');
let drinks=[];

function Coffee (userName, quantity){
    this.userName= userName;
    this.quantity= quantity;
    drinks.push(this);
    settingItems();

}

function settingItems(){
    let data = JSON.stringify(drinks);
    localStorage.setItem('coffee', data);
}

function gettingItems(){
    let stringObj = localStorage.getItem('coffee');
    let normalObj = JSON.parse(stringObj);
    let newObj;
    if(normalObj !== null){
        for(let i=0; i < normalObj.length; i++){
            newObj= new Coffee (normalObj[i].userName, normalObj[i].quantity); 
        }
        newObj.render();
    }
}


Coffee.prototype.render = function (){
    orders.textContent='';
    for (let i = 0; i < drinks.length; i++) {
        let liEl =document.createElement('li');
        orders.appendChild(liEl);
        liEl.textContent = `${drinks[i].userName} ordered ${drinks[i].quantity} cups`;

        
    }
    
}

function handelSubmit(event){
event.preventDefault();
let userName = event.target.userName.value;
let quantity = event.target.quantity.value;
let newOrder = new Coffee(userName,quantity);
newOrder.render();

}



gettingItems();
myForm.addEventListener('submit', handelSubmit);
