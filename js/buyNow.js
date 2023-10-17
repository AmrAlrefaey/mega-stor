var Model = (()=>{

    let userStor= JSON.parse(localStorage.getItem("user"));
    const listUserBill = [];

    let cartProducts =JSON.parse(localStorage.getItem("cartProducts"));


    const getUser = ()=>{
        return userStor;
    }

    const getListUserBill = ()=>{
        return listUserBill;
    }


    const getCartProducts = ()=>{
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





    return{
        getUser,
        getListUserBill,
        getCartProducts,
        getTotal
    };

})();


var View = (()=>{

    const btnResponsiveNav = document.querySelector(".btn-responsive-nav");
    const linksNav = document.querySelector(".links-nav");

    const btnContinue =document.querySelector(".btn-continue")
    const btnCompleted =document.querySelector(".btn-buy-completed")


    let cardLogo =document.querySelector(".card-logo")
    let contentLogo =document.querySelector(".content-logo")
    let visa =document.querySelector(".visa")
    let cardForm =document.querySelector(".cardForm")
    let billModal =document.querySelector(".bill-modal")


    
    let nameForm =document.querySelector(".nameForm")
    let phoneForm =document.querySelector(".phoneForm")
    let anotherPhone =document.querySelector(".anotherPhone")
    let address =document.querySelector(".address")
    let comments =document.querySelector(".comments")


    let cardNumber =document.querySelector(".cardNumber")
    let cardPassword =document.querySelector(".cardPassword")


    const nameUser = document.querySelector(".name-user")
    const phoneUser = document.querySelector(".phone-user")
    const addressUser = document.querySelector(".address-user")
    const showItemBill = document.querySelector(".showItemBill")
    const btnCloseModalBill = document.querySelector(".btn-close-modal-bill")
    const codeBill = document.querySelector(".code-bill")


    var infoUser= document.querySelector(".info-user")
    var loginIcon= document.querySelector(".login-icon")
    var logoutIcon = document.querySelector(".logout-icon");




    const validationForm = (name, phoneForm, address)=>{
        let flag = true;
        if (name.value == '') {
            viewDangerErrorCreate('Please Enter the name')
            flag = false;
        }
    
        if (phoneForm.value == '') {
            viewDangerErrorCreate('Please Enter the phone')
            flag = false;
        }
    
        if (address.value == '') {
            viewDangerErrorCreate('Please Enter the address')
            flag = false;
        }
        
        
        return flag;
    }
    
    
    
    const validationVisaCard = (number, password)=>{
        let flag = true;
        if (number.value == '') {
            viewDangerErrorCreate('Please Enter the Card Number')
            flag = false;
        }
    
        if (password.value == '') {
            viewDangerErrorCreate('Please Enter the Password')
            flag = false;
        }
        
        
        return flag;
    }



    const defaultValue =(user)=>{
        nameForm.value = user.username
        phoneForm.value = user.phone
        
        }
    
    
    
    const getDataInForm = (listUserBill) =>{
        if(validationForm(nameForm, phoneForm, address)){
            // nameForm.value = user.username
            var data = {
                name: nameForm.value,
                phone: phoneForm.value,
                anotherPhone: anotherPhone.value,
                address: address.value,
                comments: comments.value,
        
            }
            listUserBill.push(data)
            return data
        }
        return false
        
    }
    
    
    
    
    const getDataInFormVisa = () =>{
        if(validationVisaCard(cardNumber, cardPassword)){
            var data = {
                cardNumber: cardNumber.value,
                password: cardPassword.value,
        
            }
            return data
        }
        return false
        
    }
    
    
    
    
    
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
    
    
    
    
    const clearFieldCompleted = ()=>{
        cardNumber.value = "" 
        cardPassword.value = ""
    }
    
    
    
    const clearFieldContinue = ()=>{
        nameForm.value = "" 
        phoneForm.value = ""
        anotherPhone.value = ""
        address.value = ""
        comments.value = ""
    }
    
    
    
    const showBuySuccess = () =>{
        cardForm.innerHTML = ""
        var data = `
            <h1 class="buySuccess">SUCCESS</h1>
            <div class="bell">
            </div>
        `
    
        cardForm.innerHTML += data
    }



    const showBill = (listUserBill,cartProducts) =>{
        listUserBill.forEach(element =>{
            nameUser.innerHTML= `Name: ${element.name}`
            phoneUser.innerHTML= `Phone: ${element.phone}`
            addressUser.innerHTML= `Address: ${element.address}`
            codeBill.innerHTML= `Code: ${Math.floor(Math.random() * (100000000 - 1 + 1) + 1)}`
            
        })
    
        cartProducts.forEach(element=>{
            var data =`
                <li>${element.title} (${element.quantity})</li>
            `
            showItemBill.innerHTML += data
        })
    
        
       
        
    }

    const showUser = (userStor)=>{
        loginIcon.remove()
        infoUser.innerHTML=`
            <div class="info-user">
                    <img src="https://images.freeimages.com/365/images/previews/85b/psd-universal-blue-web-user-icon-53242.jpg" alt="">
                    <h3>${userStor.username}</h3>
            </div>
    
        `;
    }


    
const totalPrice = document.querySelector(".totalProducts");

const totalPriceProducts = (total)=>{
    numTotal = parseInt(total)        
    totalPrice.innerHTML=`Total: $ ${numTotal}`
}






    return{

        defaultValue,
        getDataInForm,
        clearFieldContinue,
        getDataInFormVisa,
        clearFieldCompleted,
        showBuySuccess,
        showBill,
        viewSuccessCreate,
        showUser,
        btnContinue,
        btnCompleted,
        btnCloseModalBill,
        cardLogo,
        contentLogo,
        visa,
        cardForm,
        billModal,
        logoutIcon,
        totalPriceProducts,
        btnResponsiveNav,
        linksNav

        

        

    };

})();



var Controller = (()=>{
    let user =Model.getUser();
    let listUserBill = Model.getListUserBill()

    let CartProducts =Model.getCartProducts()

    View.defaultValue(user)
    
    
    var inti=()=>{

       View.btnResponsiveNav.addEventListener("click" , ()=>{
            if( View.linksNav.style.display == "none"){
                
                View.linksNav.style.display = "flex"
            }else{
                View.linksNav.style.display = "none"
            }
        })

        

        if (user) {

            View.showUser(user);
            
            View.btnContinue.addEventListener("click", (e)=>{
                e.preventDefault()
                let data = View.getDataInForm(listUserBill);
                if(data){
                    View.viewSuccessCreate()
                    View.cardLogo.style.transform = "scale(0, 1)";
                    setTimeout(()=>{
                        View.contentLogo.style.display ="none"
                        View.cardLogo.style.transform = "scale(1, 1)";
                        View.visa.style.display ="block"
                        View.clearFieldContinue()
                        
            
                    },1000)
                }else{
                    View.visa.style.display ="none"
                    View.contentLogo.style.display ="flex"
            
                }
            
                
            
            })
            
            
            
            
            
            View.btnCompleted.addEventListener("click", (e)=>{
                e.preventDefault()    
                
            
                    let data = View.getDataInFormVisa();
            
                    if (data) {
                        View.viewSuccessCreate()
    
                        View.cardForm.style.transform = "scale(0, 1)";
                    
                        View.clearFieldCompleted()
                    
                        setTimeout(()=>{
                            View.cardForm.style.transform = "scale(1, 1)";
                    
                            View.showBuySuccess()
                        },1000)
                    
            
                        setTimeout(()=>{
                            View.billModal.style.display = "block";
                            View.showBill(listUserBill,CartProducts)
                        },3000)

                        let CartProducts =Model.getCartProducts()

                        var total = Model.getTotal(CartProducts)
                        console.log(total)
                        View.totalPriceProducts(total)

                   }
                
            
            
            
            })




                let cartProducts = Model.getCartProducts() 
                let total = Model.getTotal(cartProducts)
                View.totalPriceProducts(total)
            
            
            
            
            View.btnCloseModalBill.addEventListener("click", ()=>{
            
                        View.billModal.style.display = "none"
                        setTimeout(()=>{
                            window.location.href ="index.html"
                        },3000)

            })



            View.logoutIcon.addEventListener("click", ()=>{
                localStorage.clear();
                setTimeout(()=>{
                    window.location.reload()
                },3000)
            })
       
       

            
        }


    }


    return{
        inti
    };

})();



Controller.inti()






