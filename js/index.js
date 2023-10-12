
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



    return{
        showUser,
        infoUser,
        showSlides
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

    
    
    
    var inti=()=>{
        
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
            // cart
            btnCart.style.display ="block"

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
        
        View.showSlides();



    }


    return{
        inti
    };

})();



Controller.inti()
