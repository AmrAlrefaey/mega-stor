var btnCart = document.querySelector(".btn-cart");
var viewCart = document.querySelector(".cart-view");
var closeCart = document.querySelector(".close-cart");
var logoutIcon = document.querySelector(".logout-icon");



var mainArray = [];
var cartProducts=[]

let userStor= JSON.parse(localStorage.getItem("user"));

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
        // console.log(data.products)
        // for (let index = 0; index < data.products.length; index++) {
        //     mainArray.push(data.products[index]);
            
        // }   
        
        // showData(mainArray)
        
        
    })
}


api()




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
            totalPriceProducts()
            showCountCart(cartProducts)

            let total = getTotal(cartProducts)
            totalPriceProducts(total)

            return cartProducts

            
}



const deleteElement = (id) =>{
    cartProducts = cartProducts.filter(element => element.id != id); 
    localStorage.cartProducts = JSON.stringify(cartProducts)
    showDataInCart(cartProducts)
    viewSuccessCreate("delete")
    totalPriceProducts()
    showBtnDeleteAll()
    showCountCart(cartProducts)

    let total = getTotal(cartProducts)
    totalPriceProducts(total)

    return  cartProducts;
    
}




const delete_All = () =>{
    localStorage.removeItem('cartProducts')


    cartProducts.splice(0);

    showCountCart(cartProducts)


    let total = getTotal(cartProducts)
    totalPriceProducts(total)

    // while (products_list.length > 0) {
    //     products_list.pop();
    // }

    return cartProducts;
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
    var data = findElement(idElement)

    if(!findElementInCart(idElement)){
        addElement(data)

    }else{
        viewDangerErrorCreate("You have already selected this item")
    }

    showBtnDeleteAll()

    //show data       
    showDataInCart(cartProducts) 
}



const getTotal =(list)=>{
    const totalPrice = document.querySelector(".total");
    var total = 0;
    list.forEach(element=>{
        if(list.length != 0){
            total += (element.price * element.quantity)
            totalPrice.innerHTML=`Total: $ ${total}`
            return total

        }
    })
    return total
}




const increment =(id)=>{
    
    for (let i = 0; i < cartProducts.length; i++) {
        if(cartProducts[i].id == id){
            cartProducts[i].quantity++
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            showDataInCart(cartProducts)

            let total = getTotal(cartProducts)
            totalPriceProducts(total)

            
        }
    }
}


const decrement =(id)=>{
    
    for (let i = 0; i < cartProducts.length; i++) {
        if(cartProducts[i].id == id){
            if (cartProducts[i].quantity <= 1) { 
                cartProducts[i].quantity= 1
            }else{

                cartProducts[i].quantity--
            }
            
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            showDataInCart(cartProducts)
            
            
            let total = getTotal(cartProducts)
            totalPriceProducts(total)
            
        }
    }
}










const modalDescription = document.querySelector(".modalDescription")

const getModal =(id)=>{
   
    modalDescription.style.display = "flex"

    let data = findElement(id);

    showModalDescription(data)

}

const closeModal =()=>{
   
    modalDescription.style.display = "none"

}


//view


    


const showModalDescription = (obj) =>{
    var el =`
    <div class="image">
        <img src="${obj.img1}" alt="">
    </div>
    <div class="details">
        <h1>${obj.title}</h1>

        <p>${obj.description}</p>
        <hr>
        <div class="price-and-evaluation">
            <h3 class="price-modal">${obj.price} <span>$</span></h3>
            <div class="evaluation">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
        </div>
        <hr>
        <div class="btn-size">
            <button class="btn-small btn-model">S</button>
            <button class="btn-medium btn-model">M</button>
            <button class="btn-large btn-model">L</button>
            <button class="btn-xlarge btn-model">XL</button>
        </div>

        <div class="btn-action-modal">
            <button id="${obj.id}" class="btn-add-to-cart-modal btn-model">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
            <button onClick="closeModal()" class="btn-close-modal btn-model">Close</button>
        </div>

    </div>    

    `
    modalDescription.innerHTML = el;
}



const totalPrice = document.querySelector(".total");

const totalPriceProducts = (total)=>{
        numTotal = parseInt(total)         
        totalPrice.innerHTML=`Total: $ ${numTotal}`
}





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
            <div onClick="getModal(${element.id})" class="btn-description" ><i class="fa-solid fa-circle-info"></i></div>
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
            <button id="${element.id}" class="btn-add-to-cart">Add To Cart</button>
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
            <div class="price">${element.price} $</div>
            <div class="quantity">
                <button onClick="increment(${element.id})" class="btn-increment"><i class="fa-solid fa-plus"></i></button>
                <div class="show-quantity">${element.quantity}</div>
                <button onClick="decrement(${element.id})" class="btn-decrement"><i class="fa-solid fa-minus"></i></button>
            </div>
        </div>
        </div>
        <button onClick="deleteElement(${element.id})" class="btn-delete"> <i class="fa-solid fa-trash"></i> </button>
    </div>
        `;
        contentCart.innerHTML += data ;
    }); 
    
}



const countCart = document.querySelector(".count-cart");

const showCountCart= (list) => {
    var count = list.length
    countCart.innerHTML = count
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


const notAddProducts = document.querySelector('.not-add-products')

const showBtnDeleteAll = () =>{
    if(cartProducts.length != 0){
        btnDeleteAll.style.display="block"
        notAddProducts.style.display = "none"

    }else{
        notAddProducts.style.display = "block"
        btnDeleteAll.style.display="none"

    }
}





var infoUser= document.querySelector(".info-user")
var loginIcon= document.querySelector(".login-icon")
var logoutIcon = document.querySelector(".logout-icon");

const showUser = (userStor)=>{
    loginIcon.style.display = "none";
    infoUser.innerHTML=`
        <div class="info-user">
                <img src="https://images.freeimages.com/365/images/previews/85b/psd-universal-blue-web-user-icon-53242.jpg" alt="">
                <h3>${userStor.username}</h3>
        </div>

    `;
}

//view search

const contentSearch =document.querySelector(".content-search")
const btnSearch = document.querySelector(".btn-search")
const btnSearchField = document.querySelector(".btn-search-field")
const inputSearch = document.querySelector(".input-search")
const btnDeleteAll = document.querySelector(".btn-delete-all")
const foundSearch = document.querySelector(".foundSearch")
const btnBuyNow = document.querySelector(".btn-buy-now")






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





modalDescription.addEventListener("click" ,()=>{
          console.log("target_id");

})



btnDeleteAll.addEventListener("click", ()=>{
    delete_All()
    showBtnDeleteAll()
    totalPriceProducts()
    showDataInCart(cartProducts)
})


 if(cartProducts.length != 0){
        btnDeleteAll.style.display="block"
        notAddProducts.style.display = "none"

}else{
    notAddProducts.style.display = "block"
    btnDeleteAll.style.display="none"

}



btnBuyNow.addEventListener("click", ()=>{
    setTimeout(()=>{
        
        location.href= "buyNow.html"
    },1000)
    
})




var btnResponsiveNav = document.querySelector(".btn-responsive-nav");
var linksNav = document.querySelector(".links-nav");

btnResponsiveNav.addEventListener("click" , ()=>{
    if( linksNav.style.display == "none"){
        
        linksNav.style.display = "flex"
    }else{
        linksNav.style.display = "none"
    }
})










const main = () => {
    
    
    showFormFilter()



    if (userStor) {


        modalDescription.addEventListener("click",(e)=>{
            if(e.target.classList.contains('btn-add-to-cart-modal')){
                const target_id = e.target.id;
                addToCart(target_id)
        
             }
            })




        contentShopping.addEventListener("click",(e)=>{
            if(e.target.classList.contains('btn-add-to-cart')){
                const target_id = e.target.id;
                addToCart(target_id)
        
             }
            
            
            //  if(e.target.classList.contains('btn-description')){
            //     const target_id = e.target.id;
            
            //     console.log(target_id);
        
            //  }
        })


        showBtnDeleteAll()
        showDataInCart(cartProducts) 
        showCountCart(cartProducts)
        
        let total = getTotal(cartProducts)
        totalPriceProducts(total)


        // cart
        btnCart.style.display ="block"

        showUser(userStor);
        // open cart
        btnCart.addEventListener("click", ()=>{
            viewCart.style.width= "70%";
        })
        
        // close cart
        closeCart.addEventListener("click", ()=>{
            viewCart.style.width= "0%";
        })
        
        //logout
        logoutIcon.addEventListener("click", ()=>{
            loginIcon.style.display = "block";
            localStorage.clear();
            setTimeout(()=>{
                window.location.reload()
            },3000)
        })
    }else{

        contentShopping.addEventListener("click",(e)=>{
            if(e.target.classList.contains('btn-add-to-cart')){
                viewDangerErrorCreate("Please register to activate the addition process")
                setTimeout(()=>{
                    window.location.href ="login-register.html"
                },3000)

        
             }
        })


        modalDescription.addEventListener("click",(e)=>{
            if(e.target.classList.contains('btn-add-to-cart-modal')){
                viewDangerErrorCreate("Please register to activate the addition process")
                setTimeout(()=>{
                    window.location.href ="login-register.html"
                },3000)
             }
            })
    }

        
}



main()



