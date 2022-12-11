////////Validando O E-MAIL
let btn = document.getElementById("botao");
btn.setAttribute("disabled", true);
btn.style.opacity = "40%"
let email = document.getElementById("inputEmail")
let validaEmail = false;
let validaTotal = false;

email.addEventListener("focus", function () {
  email.style.backgroundColor = "#E2DCDC"
});

//Blur ou KeyUp
email.addEventListener("keyup", function () {
  

  //Pega o elemento Small
  let emailValidation = document.getElementById('emailValidation');


  //Altera o fundo do campo ao sair do click 
  email.style.backgroundColor = "#FFFFFF"

  //Valida se o campo É VAZIO
  if (!email.value) { //Se não foi preenchido
    // troca o fundo
    //   email.style.border = "solid 1.5px #13A02D";

    //Seta a mensage no small (e configura)
    emailValidation.innerText = "Campo obrigatório"
    emailValidation.style.color = "#D53A3A"
    emailValidation.style.fontWeight = "bold"

//Valida de o email está em um formato correto
  } else if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) { //Testa o erro

    // troca o fundo
    email.style.border = "solid 1.5px #D8341B";

    //Seta a mensage no small (e configura)
    emailValidation.innerText = "E-mail inválido"
    emailValidation.style.color = "#D53A3A"
    emailValidation.style.fontWeight = "bold"

    } else {
    validaEmail = true
    //Se o campo estiver ok
    //Retira a mensage do small
    emailValidation.innerText = ""

    //Seta o BG do input como Sucesso
    email.style.border = "solid 1.5px #13A02D";  
  }
});

// validando senha:

let validaSenha = document.getElementById("senhaValidation")
let senha = document.getElementById("inputPassword");
let validacaoSenha = false;

senha.addEventListener("focus", function () {
  senha.style.backgroundColor = "#E2DCDC"
});
senha.addEventListener("keyup", function () {
  senha.value.toString()
  if ((senha.value.length < 8)) {

    validaSenha.innerText = "Campo obrigatório"
    validaSenha.style.color = "#D53A3A"
    validaSenha.style.fontWeight = "bold"
    // console.log(senha.value.length > 8)
    validacaoSenha = false;
  }

  if (senha.value.length >= 8) {
    validaSenha.innerText = ""
    validacaoSenha = true;
    
  }
    
  if (validaEmail  && validacaoSenha){
    btn.removeAttribute("disabled")
    btn.style.opacity = null
    validaTotal = true;
  }
})

//normalizando as entradas

// Criando Objeto json:

btn.addEventListener("click", function(evento){
  evento.preventDefault()
let objeto = {
  email : normalizaEmail(email.value),
  password : normalizaSenha(senha.value)
}
let objetoJs = JSON.stringify(objeto);
console.log(objetoJs)
apiLogin(objetoJs)
})

// função de conexão com a api
function apiLogin(retornoJs){

  if(validaTotal){
  let requestInit = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: retornoJs
}
startSpinner()

  fetch(`${baseUrl()}/users/login`, requestInit)
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
  
    validalogin(resposta)
    }
  ) 
  .catch(
    erro =>{
      stopSpinner()
      naoValidaLogin(erro)
    }
  )}
}

// função de promisse com sucesso
function validalogin(resposta){
  sessionStorage.setItem("jwt", resposta.jwt)
  window.location.href = "tarefas.html"
  // console.log(resposta)
}
//função de retorno de senha invalida/ insucesso de promisse
function naoValidaLogin(resposta){
  if(resposta.status == 400 || resposta.status == 404){
    validaSenha.innerText = "Login e/ou senha incorreta"
  }else{
    alert("Servidor fora do ar")
  }
}