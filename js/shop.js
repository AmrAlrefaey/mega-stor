var mainArray = [];
var cartProducts=[]

if(localStorage.getItem('cartProducts') != null){
    cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
}else{
    cartProducts = [];
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}




//Model


function api() {
    var result =fetch("data.json")
    .then(response => response.json())
    .then(data => {
        showData(data.products)
        mainArray = data.products
        console.log(data.products)
        // for (let index = 0; index < data.products.length; index++) {
        //     mainArray.push(data.products[index]);
            
        // }   
        
        // showData(mainArray)
        
        
    })
}


api()


console.log(mainArray)


// action

const findElement = (id) =>{
    
    for (let i = 0; i < mainArray.length; i++) {
        if(mainArray[i].id == id){
            const data = mainArray[i]
            return data;
        }
    }
}



const findElementInCart = (id) =>{
    
    for (let i = 0; i < cartProducts.length; i++) {
        if(cartProducts[i].id == id){
            const data = cartProducts[i]
            return data;
        }
    }
}


const addElement = (new_el) =>{

            cartProducts.push(new_el);
            localStorage.setItem('cartProducts',JSON.stringify(cartProducts));
            viewSuccessCreate("add to cart")
            return cartProducts
            
}



const deleteElement = (id) =>{
    cartProducts = cartProducts.filter(element => element.id != id); 
    localStorage.cartProducts = JSON.stringify(cartProducts)
    showDataInCart(cartProducts)
    viewSuccessCreate("delete")
    return  cartProducts;
    
}



const searchByCategory = (categoryItem) =>{
    const data =[];
    for (let i = 0; i < mainArray.length; i++) {
        if(mainArray[i].categoryTow == categoryItem){
                data.push(mainArray[i])
        }
    }
    return data
}


const searchByTitle = (title) =>{
    const data =[];
    for (let i = 0; i < mainArray.length; i++) {
        if(mainArray[i].title.toLowerCase().includes(title.toLowerCase())){
             data.push(mainArray[i])
            }
        }
        console.log(data)
    return data


}
        


    // filter

const filterAllItem = () => {
    var allData = mainArray
        if(allData){
            contentShopping.innerHTML = ""
            showData(allData);
        }
}


const filterElectronic = () => {
    var categoryElectronic = "electronic"
    var data = searchByCategory(categoryElectronic);
        if(data){
            contentShopping.innerHTML = ""
            showData(data);
        }
}

const filterClothes = () => {
    var categoryClothes = "clothes"
    var data = searchByCategory(categoryClothes);
        if(data){
            contentShopping.innerHTML = ""
            showData(data);
        }
}

const filterFurniture = () => {
    var categoryFurniture = "furniture"
    var data = searchByCategory(categoryFurniture);
        if(data){
            contentShopping.innerHTML = ""
            showData(data);
        }
}



    

//add to cart 
const addToCart = (id) =>{
    let idElement = id
    
    //find data
    data = findElement(idElement)

    if(!findElementInCart(idElement)){
        addElement(data)

    }else{
        
    }


    
    
    //show data       
    showDataInCart(cartProducts) 
}


//view

const formFilter = document.querySelector(".form-filter");

const showFormFilter =()=>{
    formFilter.innerHTML = `
    <input type="radio" onclick="filterAllItem()" id="all" name="filter" value="furniture">
    <label for="furniture">all</label><br>
    <input type="radio" onclick="filterElectronic()" id="electronic" name="filter" value="electronic">
    <label for="electronic">electronic</label><br>
    <input type="radio" onclick="filterClothes()" id="clothes" name="filter" value="clothes">
    <label for="clothes"> clothes</label><br>
    <input type="radio" onclick="filterFurniture()" id="furniture" name="filter" value="furniture">
    <label for="furniture"> furniture</label><br>
    `
}



const contentShopping = document.querySelector(".content-shopping");
    
    
const showData = (list) => {
    list.forEach(element => {
        let data = `
        <div class="card">
        <div class="image">
        <img src="${element.img1}" alt="">
            <div class="more-details">
            <a href="https://www.google.com/"><i class="fa-solid fa-circle-info"></i></a>
            </div>
            </div>
            <div class="card-body">
            <h2>${element.title}</h2>
            <h4>${element.categoryTow}</h4>
            <div class="price-and-evaluation">
            <h3>${element.price}</h3>
            <div class="evaluation">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            </div>
            </div>
            <div class="action">
            <button id="${element.id}" class="btn-add-to-cart"'>Add To Cart</button>
            </div>
            
            </div>
            </div>
            `;
            contentShopping.innerHTML += data ;
        }); 
}



const contentCart = document.querySelector(".content-cart");


const showDataInCart = (list) => {
    contentCart.innerHTML =""
    list.forEach(element => {
        let data = `
        <div class="boxContent">
        <div class="description">
            <img src="${element.img1}" alt="">
            <div class="desc-text">
                <div class="title">${element.title}</div>
                <div class="price">${element.price}</div>
                <input type="number" class="el-quantity" value=1>
            </div>
        </div>
        <button onClick="deleteElement(${element.id})" class="btn-delete"> <i class="fa-solid fa-trash"></i> </button>
    </div>
        `;
        contentCart.innerHTML += data ;
    }); 
    
}
            

//alert

const viewSuccessCreate=(val)=>{
    var str= val;
    let Settings = {
        duration: 3000,
        showProgress: true,
        toastLocation: 'top'
     };
     Toast.success('Success! This is a '+ str, Settings);
}


const viewDangerErrorCreate=(mass)=>{
    var massage = mass;
    let Settings = {
        duration: 3000,
        showProgress: true,
        toastLocation: 'top'
     };
     Toast.danger(massage, Settings);
}


//view search

const contentSearch =document.querySelector(".content-search")
const btnSearch = document.querySelector(".btn-search")
const btnSearchField = document.querySelector(".btn-search-field")
const inputSearch = document.querySelector(".input-search")


btnSearch.addEventListener("click", ()=>{
    if(contentSearch.style.display =="none"){
        
        contentSearch.style.display = "block"
        inputSearch.focus()
    }else{
        contentSearch.style.display = "none"
    }
})


btnSearchField.addEventListener("click", ()=>{
    contentSearch.style.display = "none"
})

inputSearch.addEventListener("keyup", ()=>{
    var data = inputSearch.value
    var list = searchByTitle(data)
    if(list){
        contentShopping.innerHTML = ""
        showData(list);
    }
})


contentShopping.addEventListener("click",(e)=>{
    if(e.target.classList.contains('btn-add-to-cart')){
        const target_id = e.target.id;
        addToCart(target_id)

     }
})

const main = () => {
    showDataInCart(cartProducts) 
    showFormFilter()
        
}


main()



