var Model = (()=>{

    let stor = JSON.parse(localStorage.getItem('user'))

    const addUserToStore = (newUser)=>{
        localStorage.setItem("user", JSON.stringify(newUser))
    }

    const getUser = () =>{
        return stor;
    }



    return{
        addUserToStore,
        getUser
    };

})();


var View = (()=>{
// signup
    const registerUserName = document.querySelector('.Username')
    const registerEmail = document.querySelector('.email-sign-up')
    const registerPhone = document.querySelector('.phone')
    const registerPassword = document.querySelector('.password-sign-up')

// login

    const loginIcon = document.querySelector('.login')
    const loginUserEmail = document.querySelector('.email-login')
    const loginPassword = document.querySelector('.password-login')
    
    
    const labelSignup = document.querySelector('.label-sign-up')
    const labelLogin = document.querySelector('.label-login')




    const checkStor = (stor)=>{
        if(!stor){
            viewDangerErrorCreate("You Don't Have an Account. Please Register Now")
            loginIcon.style.transform = "translateY(-180px)";
            labelLogin.style.transform = 'scale(.6)'
            labelSignup.style.transform = "scale(1)"
            clearFieldLogin();


        }
        if(stor.email !== loginUserEmail.value){
            viewDangerErrorCreate('Wrong Please Enter the Correct Email')

   
        }
        if(stor.password !== loginPassword.value){
            viewDangerErrorCreate('Wrong Please Enter the Correct Password')

        }
        if(stor.email === loginUserEmail.value && stor.password === loginPassword.value){
            viewSuccessCreate("login");
            setTimeout(()=>{
                location.href = "index.html"
            },3000)
        }
    }



    const validationSignUp = (UserName, Email, Phone, Password)=>{
        let flag = true;
        if (UserName.value == '') {
            viewDangerErrorCreate('Please Enter the Username')
            flag = false;
        }

        if (Email.value == '') {
            viewDangerErrorCreate('Please Enter the Email')
            flag = false;
        }

        if (Phone.value == '') {
            viewDangerErrorCreate('Please Enter the Phone')
            flag = false;
        }
 
        if (Password.value == '') {
            viewDangerErrorCreate('Please Enter the Password')
            flag = false;
        }

        return flag;
    }


    const validationLogin = (UserName, Password)=>{
        let flag = true;
        if (UserName.value == '') {
            viewDangerErrorCreate('Please Enter the Email')
            flag = false;
        }

        if (Password.value == '') {
            viewDangerErrorCreate('Please Enter the Password')
            flag = false;
        }

        return flag;
    }

    
    

    const getUserInputSignUp=()=>{

        if(validationSignUp(registerUserName,registerEmail,registerPhone,registerPassword)){

            loginIcon.style.transform = "translateY(-500px)";
            
            let data ={
            username: registerUserName.value,
            email: registerEmail.value,
            phone: registerPhone.value,
            password: registerPassword.value,
            }
            return data
        }
        return false
  
    }


    const getUserInputLogin=()=>{

        if(validationLogin(loginUserEmail,loginPassword)){
            let data ={
            email: loginUserEmail.value,
            password: loginPassword.value,
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

    
    const clearFieldSignUp = ()=>{
        registerUserName.value = "" 
        registerEmail.value = ""
        registerPhone.value = ""
        registerPassword.value = ""
        setTimeout(()=>{
            location.reload()
        },3000)
    }
    

    const clearFieldLogin = ()=>{
        loginUserEmail.value = ""
        loginPassword.value = ""
    }



    
    
    return{
        getUserInputSignUp,
        viewSuccessCreate,
        getUserInputLogin,
        clearFieldSignUp,
        clearFieldLogin,
        checkStor,
        loginIcon,
        labelLogin,
        labelSignup,


    };
    
})();



var Controller = (()=>{

    const btnSignUp = document.querySelector('.btn-sign-up');
    const btnLogin = document.querySelector('.btn-login')



    const init= ()=>{

        // style sign-up and login
            View.labelLogin.addEventListener("click",()=>{
                View.loginIcon.style.transform = "translateY(-500px)";
                View.labelLogin.style.transform = 'scale(1)'
                View.labelSignup.style.transform = "scale(.6)"
            });

            View.labelSignup.addEventListener("click",()=>{
                View.loginIcon.style.transform = "translateY(-180px)";
                View.labelLogin.style.transform = 'scale(.6)'
                View.labelSignup.style.transform = "scale(1)"
            });

        // signUp
        document.addEventListener('DOMContentLoaded', () => {
            btnSignUp.addEventListener("click", (e)=>{
                e.preventDefault();
                var data = View.getUserInputSignUp();

                if (data) {
                    View.viewSuccessCreate("register");
                    Model.addUserToStore(data)
                    View.clearFieldSignUp()

                    
                }      
            });
        });

        //  login

        document.addEventListener('DOMContentLoaded', () => {
            btnLogin.addEventListener("click", (e)=>{
                e.preventDefault();
                var data = View.getUserInputLogin();
                if (data) {
                    var user = Model.getUser()
                    View.checkStor(user)
                }      
            });
        });

     
    }
    
    
    return{
        init
    };

})();



Controller.init()

