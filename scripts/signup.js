
let btn = document.getElementById("btn");
btn.setAttribute("disabled", true);
btn.style.opacity = "40%";
let validaSignup = false;
let validaEmail = false;

//validando campo "nome"

  let inputName = document.getElementById("inputName");
  let nameRegistration = document.getElementById("nameRegistration");
  let validaNome = false;

  function normalizeInputName(nome){
    return nome.trim()
    
};

  inputName.addEventListener("focus", function () {
    inputName.style.backgroundColor = "#E2DCDC"
  });
  inputName.addEventListener("keyup", function () {
    inputName.value.toString()
    if (inputName.value == true) {
  
      nameRegistration.style.color = "#D53A3A";
      nameRegistration.style.fontWeight = "bold";
    }
    
    else if(inputName.value == ""){
      nameRegistration.innerText = "Campo obrigatório";
      inputName.style.border = "solid 1.5px #D8341B";
      nameRegistration.style.color = "#D53A3A"
      nameRegistration.style.fontWeight = "bold"
    }
  
    else if (inputName.value.length >= 3) {
      nameRegistration.innerText = ""
      validaNome = true
      inputName.style.border = "solid 1.5px #13A02D";
      
    }
  
  });

  /// validando campo "sobrenome"
  let lastName = document.getElementById("lastName");
  let lastNameRegistration = document.getElementById("lastNameRegistration");
  let validaLastName = false;

  function normalizeLastName(sobrenome){
    return sobrenome.trim()
    
};

  lastName.addEventListener("focus", function () {
    lastName.style.backgroundColor = "#E2DCDC"
  });

  lastName.addEventListener("keyup", function () {
    lastName.value.toString()
    if (lastName.value == true) {
  
      lastNameRegistration.style.color = "#D53A3A";
      lastNameRegistration.style.fontWeight = "bold";
    }
  
    else if (lastName.value.length >= 3) {
      lastNameRegistration.innerText = ""
      validaLastName = true
      lastName.style.border = "solid 1.5px #13A02D";
      
    }
    
    else if (lastName.value == ""){
      lastNameRegistration.innerText = "Campo obrigatório";
      lastNameRegistration.style.color = "#D53A3A"
      lastName.style.border = "solid 1.5px #D8341B";
      lastNameRegistration.style.fontWeight = "bold"
    }
  
  });

///validando campo "email"
  let inputEmailValidation = document.getElementById("inputEmailValidation");
  let validationEmail = document.getElementById("emailValidation");
  let validaEmailSignup = true;

  inputEmailValidation.addEventListener("focus", function () {
    inputEmailValidation.style.backgroundColor = "#E2DCDC"
  });
  
  inputEmailValidation.addEventListener("keyup", function () {
  
    if (!inputEmailValidation.value) {
      validationEmail.innerText = "Campo obrigatório"
      validationEmail.style.color = "#D53A3A"
      validationEmail.style.fontWeight = "bold"
  
    } else if (!inputEmailValidation.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) { //Testa o erro
  
      inputEmailValidation.style.border = "solid 1.5px #D8341B";
      validationEmail.innerText = "E-mail inválido"
      validationEmail.style.color = "#D53A3A"
      validationEmail.style.fontWeight = "bold"
  
    } else {

      validaEmail = true
      validationEmail.innerText = ""
      inputEmailValidation.style.border = "solid 1.5px #13A02D";
    }
  });


  ///validando campo "senha"
  let pwdRegistration = document.getElementById("pwdRegistration");
  let pwd = document.getElementById("pwd");
  let validaPwdRegistration = false;

    pwdRegistration.addEventListener("focus", function () {
    pwdRegistration.style.backgroundColor = "#E2DCDC"
  });
  
    pwdRegistration.addEventListener("keyup", function () {
    pwdRegistration.value.toString()

     if (pwdRegistration.value.length < 8){
      
      pwd.innerText = "Minimo 8 digitos"
      pwd.style.color = "#D53A3A"
      pwd.style.fontWeight = "bold"
      pwdRegistration.style.border = "solid 1.5px #D8341B";
    }
  
    else if (pwdRegistration.value.length >= 8) {
      pwd.innerText = ""
      validaPwdRegistration = true
      pwdRegistration.style.border = "solid 1.5px #13A02D"; 
    }
    
   else if ((pwdRegistration.value == "")) {
      
      pwd.innerText = "Campo obrigatório"
      pwd.style.color = "#D53A3A"
      pwd.style.fontWeight = "bold"
      pwdRegistration.style.border = "solid 1.5px #D8341B";
    }
  });

  ///validando campo "confirmar a senha"

  let pwdValidation = document.getElementById("pwdValidation");
  let pwdValidati = document.getElementById("pwdValidati");
  let validaPwd = false;

  pwdValidation.addEventListener("focus", function () {
    pwdValidation.style.backgroundColor = "#E2DCDC"
  });

  pwdValidation.addEventListener("keyup", function (event){

    if(pwdValidation.value === pwdRegistration.value){

      pwdValidation.value.toString()
      pwdValidati.innerText = ""
      validaPwd = true
      pwdValidation.style.border = "solid 1.5px #13A02D";
    }
    
    else if ((pwdValidation.value == "")) {
      
      pwdValidati.innerText = "Campo obrigatório"
      pwdValidati.style.color = "#D53A3A"
      pwdValidati.style.fontWeight = "bold"
      pwdValidation.style.border = "solid 1.5px #D8341B";
    
    }

    else if(pwdValidation.value !== pwdRegistration.value){
      
      pwdValidati.innerText = "Senha diferente"
      pwdValidati.style.color = "#D53A3A"
      pwdValidati.style.fontWeight = "bold"
      pwdValidation.style.border = "solid 1.5px #D8341B";
    }
    
     if(validaNome && validaLastName && validaEmailSignup && validaPwdRegistration && validaPwd){

      btn.removeAttribute("disabled")
      btn.style.opacity = null
      validaSignup = true;
    }

  });

  
// Criando Objeto json:

btn.addEventListener("click", function(evento){

  evento.preventDefault()
let objeto = {
  firstName : normalizeInputName(inputName.value),
  lastName : normalizeLastName(lastName.value),
  email : normalizaEmail(inputEmailValidation.value),
  password : normalizaSenha(pwdRegistration.value)
}
let objetoJs = JSON.stringify(objeto);
apiCadastro(objetoJs)
});

// função de conexão com a api
function apiCadastro(retornoJs){

  if(validaSignup == true){
  let requestInit = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: retornoJs
}
fetch(`${baseUrl()}/users`, requestInit)
.then(
    resposta =>{
      if(resposta.status == 200 || resposta.status == 201){
        return resposta.json()
      }else{
        throw resposta
      }
    }
)
.then(
  resposta =>{

  validaCadastro(resposta)
  }
) 
.catch(
  erro =>{
    naoValidaCadastro(erro)
  }
)}
}
// função de promisse com sucesso
function validaCadastro(resposta){
  sessionStorage.setItem("jwt", resposta.jwt)
  alert("Conta criada com sucesso!")
  
  window.location.reload()
}
//função de retorno validaçao do cadastrado/ insucesso de promisse
function naoValidaCadastro(resposta){
  if(resposta.status == 400){
    validationEmail.innerText = "Email já cadastrado"
  }
  else if(resposta.status == 404){
    alert("Servidor fora do ar")
  }
}


