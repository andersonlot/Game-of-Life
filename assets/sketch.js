var celulas=[];
var tamanho_celulas=10;
var linhas;
var colunas;
const COR_ESCURA="#151515";
const COR_CLARA="#c0b000";

function setup() {
  canva=createCanvas(600,480);
  canva.parent('canvas');
  linhas=height/tamanho_celulas;
  colunas=width/tamanho_celulas;
  for(let i=0;i<linhas;i++){
    celulas[i]=[];
    for(let j=0;j<colunas;j++){
      celulas[i][j]=false;
    }
  }
  print(celulas);
  button=[];
  button[0] = createButton('Limpar Tudo');
  button[0].parent('botoes');
  button[1] = createButton('Rodar!');
  button[1].parent('botoes');
  // alterando estilos div de botoes
  divBotoes=document.getElementById('botoes');
  divBotoes.style.margin="5px";
  //alterando estido botoes
  //criando uma classe para os botoes
  var style = document.createElement('style');
  style.type='text/css';
  style.innerHTML = '.create-button{ margin:10px;width:180px;height:40px;color:#cccccc;cursor:pointer;background:#202020;font-weight:600;border-color:gray;border-radius:4px;border-width:2px; }';
  document.getElementsByTagName('head')[0].appendChild(style);
  button[0].class('create-button');
  button[1].class('create-button');
}

function draw() {
  clear();
  background(COR_ESCURA);
  for(let i=0;i<linhas;i++){
    for(let j=0;j<colunas;j++){
      stroke(COR_ESCURA);
      if(celulas[i][j]){
        fill(COR_CLARA);
      }else{
        noFill();
      }
      rect(j*tamanho_celulas,i*tamanho_celulas,tamanho_celulas);
    }
  }
  let divCanvas=document.getElementById("canvas");
  button[0].mousePressed(limpaCelulas);
}

function mousePressed(){
  if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
    let celulaX=floor(mouseX/tamanho_celulas);
    let celulaY=floor(mouseY/tamanho_celulas);
    celulas[celulaY][celulaX]=!celulas[celulaY][celulaX];
  }
}

function limpaCelulas(){
  for(let i=0;i<linhas;i++){
    celulas[i]=[];
    for(let j=0;j<colunas;j++){
      celulas[i][j]=false;
    }
  }
}

