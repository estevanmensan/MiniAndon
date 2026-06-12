
const API_URL = "https://script.google.com/macros/s/AKfycbysYsjVy69agHkz_9OARPEQN65OxE3r8ZnlvtOVIMOt11cA2ZgunOD-mZE1qY7X8Mqp/exec";

let chart;

async function atualizar(){

try{

    const resposta = await fetch(API_URL + "?modo=dashboard");

    console.log(resposta);

    const dados = await resposta.json();
    console.log(dados);

    document.getElementById("tempo").innerHTML =
    dados.tempo+" ms";

    document.getElementById("disp").innerHTML =
    dados.disponibilidade+" %";

    document.getElementById("criticidade").innerHTML =
    dados.criticidade;

    document.getElementById("total").innerHTML =
    dados.total;

    document.getElementById("verde").innerHTML =
    dados.verde;

    document.getElementById("amarelo").innerHTML =
    dados.amarelo;

    document.getElementById("vermelho").innerHTML =
    dados.vermelho;

    document.getElementById("ultimaAtualizacao").innerHTML =
    "Última atualização: "+new Date().toLocaleString();

    let status=document.getElementById("statusBox");

    status.innerHTML=dados.status;

    if(dados.status=="VERDE"){

    status.style.background="#16a34a";

    }

    else if(dados.status=="AMARELO"){

    status.style.background="#eab308";

    status.style.color="black";

    }

    else{

    status.style.background="#dc2626";

    status.style.color="white";

    }

    atualizarGrafico(dados);

    atualizarTabela(dados);

}
catch(e){

    console.error(e);

    alert(e);

}

}

function atualizarGrafico(d){

    if(chart){

    chart.destroy();

    }

    const ctx=document.getElementById("grafico");

    chart=new Chart(ctx,{

    type:"bar",

    data:{

    labels:["Verde","Amarelo","Vermelho"],

    datasets:[{

    label:"Ocorrências",

    data:[

    d.verde,

    d.amarelo,

    d.vermelho

    ]

    }]

    }

});

}

function atualizarTabela(d){

let tabela=document.getElementById("tabelaEventos");

tabela.innerHTML="";

for(let item of d.historico){{

tabela.innerHTML+=`

<tr>

<td>${item.hora}</td>

<td>${item.status}</td>

</tr>

`;

}

}
}
setInterval(atualizar,5000);

atualizar();