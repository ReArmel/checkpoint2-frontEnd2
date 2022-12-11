// captando elementos DOM

let nomeUsuario = document.getElementById("userName");
let encerrar = document.getElementById("closeApp");
let inserirTarefa = document.getElementById("novaTarefa");
let btnInserir = document.getElementById("inserir");
let tarefasPendentes = document.querySelector(".tarefas-pendentes")
let token = sessionStorage.getItem("jwt")
let blocoTarefa = document.getElementById("tarefas-pendentes2")

// Função de inicio da pagina(não deixa abrir sem o token; carrega a lista de tarefas do usuário)
document.addEventListener("DOMContentLoaded", function (){
    if(!token){
        window.location.href = "index.html"
    }else{
        capturaDados() 
        capturaTarefa()
}
// função de conexao api para captar dados
async function capturaDados(){
    let requestDados ={
        headers:{
            "authorization": token
        }
    }
    let dadosUser = await fetch(`${baseUrl()}/users/getMe`, requestDados);
    let dadosUser2 = await dadosUser.json();
    insereNome(dadosUser2)
    
    
    }
// função que insere o nome do usuário
 function insereNome(nome){
    nomeUsuario.innerText = `${nome.firstName} ${nome.lastName}`
 } 

})
// botao de confirmacao de saida
encerrar.addEventListener("click", function(){
    let confirma = confirm("Tem certeza que deseja sair?")
    if(confirma){
    sessionStorage.removeItem("jwt")
    window.location.href = "index.html"}
})

// função que captura lista de tarefas e as lista no html
async function capturaTarefa(){
    let requestTarefa = {
        headers :{
            "authorization": token
        }
    }
    let taskResponse = await fetch(`${baseUrl()}/tasks`, requestTarefa);
    let taskResponse2 = await taskResponse.json();
    
    for (let i = 0; i < taskResponse2.length; i++) {
        if(taskResponse2[i].completed == false){
     blocoTarefa.innerHTML += `
        <li class="tarefa" id="${taskResponse2[i].id}">
        <div class="not-done" onclick="atualizaTask(${taskResponse2[i].id})"></div>
            <div class="descricao">
              <p class="nome">${taskResponse2[i].description}</p>
              <p class="timestamp">Criada em: ${taskResponse2[i].createdAt}</p>
              <div class="apagarTarefa" id="apagar" onclick="apagarTask(${taskResponse2[i].id})"> Apagar Tarefa</div>
            </div>`
        }else{
            let tarefaTerminada01 = document.getElementById("tarefasTerminadas");
       tarefaTerminada01.innerHTML += `
       <li class="tarefa" id="${taskResponse2[i].id}">
        <div class="not-done" onclick="atualizaTask(${taskResponse2[i].id})"></div>
            <div class="descricao">
              <p class="nome">${taskResponse2[i].description}</p>
              <p class="timestamp">Criada em: ${taskResponse2[i].createdAt}</p>
              <div class="apagarTarefa" id="apagar" onclick="apagarTask(${taskResponse2[i].id})"> Apagar Tarefa</div>
            </div>`

        }}

}

// funçao atualiza task

async function atualizaTask(id){
    let objetoJs = {
        completed : true
    }
   let objetoJss = JSON.stringify(objetoJs)
    console.log(objetoJss)
   let requestAtualiza = {
        method : "PUT",
        headers : {
            "authorization": token,
            "Content-Type": "application/json"
        },
        body: objetoJss
    }
    let resposta = await fetch(`${baseUrl()}/tasks/${id}`, requestAtualiza)
    let resposta2 = await resposta.json()
    // console.log(resposta2)
    if(resposta2.completed){
        let tarefaTerminada01 = document.getElementById("tarefasTerminadas");
       tarefaTerminada01.innerHTML += `
       <li class="tarefa" id="${resposta2.id}">
        <div class="not-done" onclick="tarefaTerminada(${resposta2.id})"></div>
            <div class="descricao">
              <p class="nome">${resposta2.description}</p>
              <p class="timestamp">Criada em: ${resposta2.createdAt}</p>
              <div class="apagarTarefa" id="apagar" onclick="apagarTask(${resposta2.id})"> Apagar Tarefa</div>
            </div>`
            window.location.reload()
    }
}

// evento inserir tarefa
btnInserir.addEventListener("click", function(event){
    event.preventDefault()
    let tarefaInsere = {
        description : `${inserirTarefa.value}`,
        completed : false
    }
    let tarefaInsereJs = JSON.stringify(tarefaInsere)
    insereTask(tarefaInsereJs);
})

// funçao conecta api para cadastrar nova tarefa
async function insereTask(recebe){
    let requestInsere = {
        method: "POST",
        headers :{
            "authorization": token,
            "Content-Type": "application/json"
        },
        body : recebe
    }
    
    let retorno01 = await fetch(`${baseUrl()}/tasks`, requestInsere);
    let retorno02 = await retorno01.json();

// insere tarefa no bloco

    blocoTarefa.innerHTML += `
        <li class="tarefa">
        <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">${retorno02.description}</p>
              <p class="timestamp">Criada em: ${retorno02.createdAt}</p>
              <div class="apagarTarefa" id="apagar" onclick="apagarTask(${retorno02.id})"> Apagar Tarefa</div>
            </div>`
            
    }
// função assincrona para apagar tarefa

async function apagarTask(id){
    let confirmacao = confirm("Tem certeza que deseja apagar?")
    if(confirmacao){
    let requestDelete = {
        method : "DELETE",
        headers : {
            "authorization": token
        }
    }
    try{
    let solicita1 = await fetch(`${baseUrl()}/tasks/${id}`, requestDelete);
    if(solicita1.status == 200){
    let solicita2 = await solicita1.json();
    alert(solicita2)
    window.location.reload()
    }else{
        throw solicita1;
    }
}catch{
alert("Tarefa não eliminada")
}}
}






