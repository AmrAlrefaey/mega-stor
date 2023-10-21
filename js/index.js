
var Model = (()=>{

    let userStor= JSON.parse(localStorage.getItem("user"));
    
    var cartProducts=[]

    if(localStorage.getItem('cartProducts') != null){
        cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    }else{
        cartProducts = [];
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
    
    
    const getCartProducts = ()=>{
        return cartProducts;
    }


    const getUser = ()=>{
        return userStor;
    }



    const deleteElement = (id) =>{

            cartProducts = cartProducts.filter(element => element.id != id); 
            localStorage.cartProducts = JSON.stringify(cartProducts)
            return  cartProducts;
        
        
    }
    
    
    
    
    const delete_All = () =>{

            localStorage.removeItem('cartProducts')
        
        
            cartProducts.splice(0);    
            // while (products_list.length > 0) {
            //     products_list.pop();
            // }
        
            return cartProducts;
    }
    




    const getTotal =(list)=>{
        var total = 0;
        list.forEach(element=>{
            if(list.length != 0){
                total += (element.price * element.quantity)
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
                // showDataInCart(cartProducts)
    
                // let total = getTotal(cartProducts)
                // totalPriceProducts(total)
    
                
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
                
            }
        }
    }
    
    
    



    return{
        getUser,
        getCartProducts,
        deleteElement,
        delete_All,
        increment,
        decrement,
        getTotal
    };

})();


var View = (()=>{
var infoUser= document.querySelector(".info-user")
var loginIcon= document.querySelector(".login-icon")


const btnDeleteAll = document.querySelector(".btn-delete-all");
const notAddProducts = document.querySelector(".not-add-products");


const showUser = (userStor)=>{
    loginIcon.remove()
    infoUser.innerHTML=`
        <div class="info-user">
                <img src="https://images.freeimages.com/365/images/previews/85b/psd-universal-blue-web-user-icon-53242.jpg" alt="">
                <h3>${userStor.username}</h3>
        </div>

    `;
}





let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 2 seconds
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
                <button id=${element.id} class="btn-increment"><i class="fa-solid fa-plus"></i></button>
                <div class="show-quantity">${element.quantity}</div>
                <button id=${element.id} class="btn-decrement"><i class="fa-solid fa-minus"></i></button>
            </div>
        </div>
        </div>
        <button id=${element.id} class="btn-delete"> <i class="fa-solid fa-trash"></i> </button>
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




const showBtnDeleteAll = (cartProducts) =>{
    if(cartProducts.length != 0){
        btnDeleteAll.style.display="block"
        notAddProducts.style.display = "none"

    }else{
        notAddProducts.style.display = "block"
        btnDeleteAll.style.display="none"

    }
}






const totalPrice = document.querySelector(".total");

const totalPriceProducts = (total)=>{
        numTotal = parseInt(total)        
        totalPrice.innerHTML=`Total: $ ${numTotal}`
}



    return{
        showUser,
        infoUser,
        showSlides,
        showDataInCart,
        showCountCart,
        contentCart,
        showBtnDeleteAll,
        btnDeleteAll,
        viewSuccessCreate,
        showBtnDeleteAll,
        totalPriceProducts
    };

})();



var Controller = (()=>{
    var user =Model.getUser();
    

    var logoutIcon = document.querySelector(".logout-icon");
    var btnCart = document.querySelector(".btn-cart");
    var viewCart = document.querySelector(".cart-view");
    var closeCart = document.querySelector(".close-cart");
    var btnResponsiveNav = document.querySelector(".btn-responsive-nav");
    var linksNav = document.querySelector(".links-nav");
    const btnBuyNow = document.querySelector(".btn-buy-now")






    let cartProducts = Model.getCartProducts() 
    View.showDataInCart(cartProducts)
    View.showCountCart(cartProducts)


    View.showBtnDeleteAll(cartProducts)

    let total = Model.getTotal(cartProducts)
    View.totalPriceProducts(total)
    
    
    var inti=()=>{




        getCartProducts = Model.getCartProducts()

        
        btnResponsiveNav.addEventListener("click" , ()=>{
            if( linksNav.style.display == "none"){
                
                linksNav.style.display = "flex"
            }else{
                linksNav.style.display = "none"
            }
        })


        
        
        //cart
        btnCart.style.display ="none"

        //show user
        if(user){


            View.contentCart.addEventListener("click" , (e)=>{
                if(e.target.classList.contains('btn-delete')){
                    const target_id = e.target.id;
                    var alert = confirm('are you sour deleted')
                    if (alert) {
                        let data = Model.deleteElement(target_id)
                        View.showDataInCart(data)
                        View.showCountCart(data)
                        View.viewSuccessCreate("Delete")
                    }
    
                    let cartProducts = Model.getCartProducts() 
                    
                    View.showCountCart(cartProducts)
                    View.showBtnDeleteAll(cartProducts)
                    View.showDataInCart(cartProducts)

                                        
                    let total = Model.getTotal(cartProducts)
                    View.totalPriceProducts(total)
                
    
                 }
    
    
    
                if(e.target.classList.contains('btn-increment')){
                    const target_id = e.target.id;
                    console.log(target_id)
                    Model.increment(target_id)
                    let cartProducts = Model.getCartProducts() 
                    View.showDataInCart(cartProducts)
                    let total = Model.getTotal(cartProducts)
                    View.totalPriceProducts(total)
                 }
    
    
    
                 if(e.target.classList.contains('btn-decrement')){
                    const target_id = e.target.id;
                    console.log(target_id)
                    Model.decrement(target_id)
                    let cartProducts = Model.getCartProducts() 
                    View.showDataInCart(cartProducts)
                    let total = Model.getTotal(cartProducts)
                    View.totalPriceProducts(total)
                 }
    
    
            })
           
           
           
            View.btnDeleteAll.addEventListener("click" , ()=>{
                var alert = confirm('are you sour deleted')
                if (alert) {
                    let data = Model.delete_All()
                    View.showDataInCart(data)
                    View.showCountCart(data)
                    View.viewSuccessCreate("Delete All")
                }
                    
                    let cartProducts = Model.getCartProducts() 
    
                    View.showCountCart(cartProducts)
                    View.showBtnDeleteAll(cartProducts)

                    let total = Model.getTotal(cartProducts)
                    View.totalPriceProducts(total)
    
    
                 
            })



            // cart
            btnCart.style.display ="block"
            
            View.showUser(user);
            // open cart
            btnCart.addEventListener("click", ()=>{
                viewCart.style.width= "70%";
            })
            
            // close cart
            closeCart.addEventListener("click", ()=>{
                viewCart.style.width= "0%";
            })
            
            btnBuyNow.addEventListener("click", ()=>{
                setTimeout(()=>{
                    
                    location.href= "buyNow.html"
                },1000)
                
            })
            
            logoutIcon.addEventListener("click", ()=>{
                localStorage.clear();
                setTimeout(()=>{
                    window.location.reload()
                },3000)
            })
        }
        
        View.showSlides();



    }


    return{
        inti
    };

})();



Controller.inti()






