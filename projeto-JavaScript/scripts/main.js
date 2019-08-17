class Produto {
  constructor(nome, preco, quantidade, ID) {
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
    this.ID = ID;
  }
}

class Carrinho{
    constructor(nome, preco, quantidade, ID) {
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
    this.ID = ID;
  } 
}

function getQuantidade(indice)
{
    return myCarrinho[indice].quantidade;
}

var produto = [];
var myCarrinho = [];


var qt_carrinho = 0;
var qt_produtos = 0;

function viewCarrinho()
{
    
    document.getElementById('divView').innerHTML = "";
    for(i=0;i<qt_carrinho;i++)
        {
            var x = "adp_" + i;
            var y = "ddp_" + i;
            if(myCarrinho[i]!=null)
                { 
                    document.getElementById('divView').innerHTML += 
                 ('<ul>' + '<li id="idp_5" >' +myCarrinho[i].nome+' </li>'+
                 '<li id="idp_6" value='+myCarrinho[i].preco+'>' + 'PREÇO: '+myCarrinho[i].preco+' </li>' +
                 '<li id="idp_7" value='+myCarrinho[i].quantidade+'>' + 'QUANTIDADE: '+myCarrinho[i].quantidade+' </li>' +
                 '<li id="idp_8" value='+myCarrinho[i].ID+'>' + 'ID: '+myCarrinho[i].ID+' </li>' + '</ul>');
                    
                }
        }
}

function adicionarCarrinho()
{
    
    var aux_1 = document.getElementById('idp_1').value;
    var aux_2 = document.getElementById('idp_2').value;
    var aux_3 = document.getElementById('idp_3').value;
    var aux_4 = document.getElementById('idp_4').value;
    
    console.log(aux_1);
    var indice ;
    
    indice = findProductCar(aux_4);
    
    if(indice==-1)
        {
            myCarrinho[qt_carrinho] = new Object();
            myCarrinho[qt_carrinho] = new Carrinho(aux_1,aux_2,1,aux_4);
            
            qt_carrinho++;
        }
    else{
        var qt_atual = myCarrinho[indice].quantidade;
        myCarrinho[indice].quantidade = qt_atual + 1;
    }
   
    
}

function searchProducts()
{
    var form = document.getElementById("form4");
    var ID = form.ID_SEARCH.value;
    var nome = form.NOME_SEARCH.value;
    nome = nome.toUpperCase;
    
    document.getElementById('div1Search').innerHTML = "";
    
    var indice1; 
    var indice2;
    
    if(ID != "")
        {
            indice1 = findProduct(ID);
        }
    if(nome != "")
        {
            indice2 = findProduct(nome);
        }
        
    if(indice1==-1 && indice2==-1)
        {
            alert("Nenhum produto encontrado");
            return ;
        }
     if(indice1!=-1)
         {
             document.getElementById('div1Search').innerHTML += 
                 ('<input disabled id="idp_1" value= >' +
                 '<li id="idp_2" value='+produto[indice1].preco+'>' + 'PREÇO: '+produto[indice1].preco+' </li>' +
                 '<li id="idp_3" value='+produto[indice1].quantidade+'>' + 'QUANTIDADE: '+produto[indice1].quantidade+' </li>' +
                 '<li id="idp_4" value='+produto[indice1].ID+'>' + 'ID: '+produto[indice1].ID+' </li>');
             
             document.getElementById('idp_1').value = produto[indice1].nome;
             panelChanger("divClass");
             alert("Produto encontrado");
             
             resetFormulario();
             return ;
         }
     else if(indice2 != -1)
         {
              document.getElementById('div1Search').innerHTML += 
                  ('<li id="idp_1" value='+produto[indice2].nome+'>' + 'NOME: '+produto[indice2].nome+' </li>'  +
                 '<li id="idp_2" value='+produto[indice2].preco+'>' + 'PREÇO: '+produto[indice2].preco+' </li>' +
                 '<li id="idp_3" value='+produto[indice2].quantidade+'>' + 'QUANTIDADE: '+produto[indice2].quantidade+' </li>' +
                 '<li id="idp_4" value='+produto[indice2].ID+'>' + 'ID: '+produto[indice2].ID+' </li>');
             
             
             alert("Produto encontrado");
             panelChanger("divClass");
             resetFormulario();
             return ;
         }
    
}

function removeProducts()
{
    var form = document.getElementById("form2");
    var quantidade = parseInt(form.QUANTIDADE_REMOVE.value);
    var ID = form.ID_REMOVE.value;
    
    indice = findProduct(ID);
    
    if(indice==-1)
        {
            alert("O PRODUTO NÃO EXISTE!");
            return ; 
        }
    
    var qt_atual = parseInt(produto[indice].quantidade);
    
    
    produto[indice].quantidade= qt_atual - quantidade;
    
    if(produto[indice].quantidade <= 0)
        {
            alert("Não há mais "+produto[indice].nome+" na loja!");
            produto[indice].quantidade = 0;
            produto[indice] = null;
        }
    
    resetFormulario();
    
}

function panelChanger(panel){
    var btn = [];
    //1 -> add
    //2 -> edit
    //3 -> remove
    //4 -> searchProduto
    //6 -> view
    //5 -> divSearch
    //7 -> viewProducts
    btn[1] = document.getElementById("form").classList;
    btn[2] = document.getElementById("form1").classList;
    btn[3] = document.getElementById("form2").classList;
    btn[4] = document.getElementById("form4").classList;
    btn[5] = document.getElementById("divSearch").classList;
    btn[6] = document.getElementById("divView").classList;
    btn[7] = document.getElementById("divViewProducts").classList;
    
    for(i=1;i<=7;i++)
        {       
            btn[i].add("hidden");
        }
    
    if(panel == "add")
        btn[1].remove("hidden");
    else if(panel== "edit")
        btn[2].remove("hidden");
    else if(panel == "remove")
        btn[3].remove("hidden");
    else if (panel == "search")
        btn[4].remove("hidden");
    else if (panel == "divClass")
        btn[5].remove("hidden");
    else if (panel == "view")
        {
        viewCarrinho();
        btn[6].remove("hidden");   
        }
    else if (panel == "viewProducts")
        {
        viewProducts();
        btn[7].remove("hidden");
        }
    
}
function findProduct(finder)
{
    
    if(isNumber(finder))
        {
            for(i=0;i<qt_produtos;i++)
                {
                   if(produto[i]!=null)
                       {
                          if(produto[i].ID==finder && finder!=0)
                            {
                              return i;
                            }
                       }
                }

            return -1;  
        }
    else{
        {
            for(i=0;i<qt_produtos;i++)
                {
                   if(produto[i]!=null)
                       {
                          if(produto[i].nome==finder && finder!="")
                            {
                              return i;
                            }
                       }
                }

            return -1;  
        }
    }
}

function findProductCar(finder)
{
    
    if(isNumber(finder))
        {
            for(i=0;i<qt_carrinho;i++)
                {
                   if(myCarrinho[i]!=null)
                       {
                          if(myCarrinho[i].ID==finder && finder!=0)
                            {
                              return i;
                            }
                       }
                }

            return -1;  
        }
    else{
        {
            for(i=0;i<qt_carrinho;i++)
                {
                   if(myCarrinho[i]!=null)
                       {
                          if(myCarrinho[i].nome==finder && finder!="")
                            {
                              return i;
                            }
                       }
                }

            return -1;  
        }
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function viewProducts()
{
    document.getElementById('divViewProducts').innerHTML = "";
    for(i=0;i<qt_produtos;i++)
        {
            var x = "adp_" + i;
            var y = "ddp_" + i;
            if(produto[i]!=null)
                { 
                    document.getElementById('divViewProducts').innerHTML += 
                 ('<ul>' + '<li id="idp_5" >' +produto[i].nome+' </li>'+
                 '<li id="idp_6" value='+produto[i].preco+'>' + 'PREÇO: '+produto[i].preco+' </li>' +
                 '<li id="idp_7" value='+produto[i].quantidade+'>' + 'QUANTIDADE: '+produto[i].quantidade+' </li>' +
                 '<li id="idp_8" value='+produto[i].ID+'>' + 'ID: '+produto[i].ID+' </li>' + '</ul>');
                }
        }
}

function saveChanges()
{
  var form = document.getElementById("form");
  var nome = form.NOME.value;
  var preco = form.PRECO.value;
  var quantidade = form.QUANTIDADE.value;
  var ID = form.ID.value;
}

function editDetails()
{
  var form = document.getElementById("form1");
  var nome = form.NOME_CHANGE.value;
  var preco = form.PRECO_CHANGE.value;
  var quantidade = parseInt(form.QUANTIDADE_CHANGE.value);
  var ID = form.ID_CHANGE.value;
  nome = nome.toUpperCase();
  indice = findProduct(ID);
    
    if(indice==-1)
        {
            alert("O PRODUTO NÃO EXISTE!");
            return ;
        }

    var qt_atual = parseInt(produto[indice].quantidade);
    
    if(nome != "")    
       produto[indice].nome=nome;
    
    if(preco != "")
       produto[indice].preco=preco;
    
    if(quantidade != "")
       produto[indice].quantidade= qt_atual + quantidade;
    
    alert("Produto alterado para:" + 
      "\nNOME: " + produto[indice].nome + 
      "\nPREÇO: " + produto[indice].preco+
      "\nQUANTIDADE: " + produto[indice].quantidade +
      "\nID na loja: " + produto[indice].ID);
    
    resetFormulario();
    
}

function saveFormulario()
{
  var form = document.getElementById("form");
  var nome = form.NOME.value;
  var preco = form.PRECO.value;
  var quantidade = form.QUANTIDADE.value;
  var ID = form.ID.value;
  nome = nome.toUpperCase();
    
    if(nome == "" || preco == "" || quantidade == "" || ID == ""){
      alert("Todos os dados devem ser preenchidos!");
      return;
  } 
    
  try{
      produto[qt_produtos] = new Object();
     produto[qt_produtos] = new Produto(nome,preco,quantidade,ID);
      
      if(produto[qt_produtos] instanceof Produto){
      alert("Produto adicionado com os dados:" + 
      "\nNOME: " + produto[qt_produtos].nome + 
      "\nPREÇO: " + produto[qt_produtos].preco+
      "\nQUANTIDADE: " + produto[qt_produtos].quantidade +
      "\nID na loja: " + produto[qt_produtos].ID);
          
    }
  }
 catch(e)
    {
            
  }
    
    qt_produtos++;
    resetFormulario();
}
function resetFormulario(){
 
  document.getElementById("NOME").value = "";
  document.getElementById("PRECO").value = "";
  document.getElementById("QUANTIDADE").value = "";
  document.getElementById("ID").value = "";
  document.getElementById("NOME_CHANGE").value = "";
  document.getElementById("PRECO_CHANGE").value = "";
  document.getElementById("QUANTIDADE_CHANGE").value = "";
  document.getElementById("ID_CHANGE").value = "";
  document.getElementById("ID_REMOVE").value = "";
  document.getElementById("QUANTIDADE_REMOVE").value = "";
  document.getElementById("NOME_SEARCH").value = "";
  document.getElementById("ID_SEARCH").value ="";
    
}