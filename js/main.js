const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


// FAKE AUTHIFICATION

const buttonAuth = document.querySelector('.button-auth');
const modalAuth  = document.querySelector('.modal-auth');
const closeAuth  = document.querySelector('.close-auth');
const logInForm  = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName   = document.querySelector('.user-name');
const buttonOut  = document.querySelector('.button-out');

let login = localStorage.getItem('delivery');

function toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}

function authorized(){
  function logOut(){
    login = null ;
    localStorage.removeItem('delivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function notAuthorized(){
  function logIn(event){
    event.preventDefault();
    login = loginInput.value;
    if(login){
      localStorage.setItem('delivery', login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
    }else{
      let warning = document.createElement('div');
      warning.classList.add('warning');
      warning.innerHTML = '<strong>Please enter your login and password</strong>';
      if(!document.querySelector('.warning')){
        logInForm.append(warning);
      }
    }
    
  }
  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth(){
  if(login){
    authorized();
  }else{
    notAuthorized();
  }
}   
checkAuth();
 
