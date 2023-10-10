
var Model = (()=>{

    let userStor= JSON.parse(localStorage.getItem("user"));


    const getUser = ()=>{
        return userStor;
    }



    return{
        getUser,
    };

})();


var View = (()=>{
    var infoUser= document.querySelector(".info-user")
    var loginIcon= document.querySelector(".login-icon")

    const showUser = (userStor)=>{
        loginIcon.remove()
        infoUser.innerHTML=`
            <div class="info-user">
                    <img src="https://images.freeimages.com/365/images/previews/85b/psd-universal-blue-web-user-icon-53242.jpg" alt="">
                    <h3>${userStor.username}</h3>
            </div>
    
        `;
    }


    return{
        showUser,
        infoUser
    };

})();



var Controller = (()=>{
    var user =Model.getUser();

    var logoutIcon = document.querySelector(".logout-icon");
    var btnCart = document.querySelector(".btn-cart");
    var viewCart = document.querySelector(".cart-view");
    var closeCart = document.querySelector(".close-cart");




    var inti=()=>{

        //show user
        if(user){
            View.showUser(user);
            // open cart
            btnCart.addEventListener("click", ()=>{
                viewCart.style.width= "30%";
            })

            // close cart
            closeCart.addEventListener("click", ()=>{
                viewCart.style.width= "0%";
            })


            logoutIcon.addEventListener("click", ()=>{
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
