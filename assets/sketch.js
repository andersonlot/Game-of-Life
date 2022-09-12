var celulas=[];
var tamanho_celulas=10;
var linhas;
var colunas;
var _loop;
const canva_width=600;
const COR_ESCURA="#151515";
const COR_CLARA="#c0b000";

function setup() {
  canva=createCanvas(canva_width,480);
  canva.parent('canvas');
  linhas=height/tamanho_celulas;
  colunas=width/tamanho_celulas;
  for(let i=0;i<linhas;i++){
    celulas[i]=[];
    for(let j=0;j<colunas;j++){
      celulas[i][j]=false;
    }
  }
  //criando uma classe para os botoes
  var style = document.createElement('style');
  //style.type='text/css';
  style.innerHTML = '.create-button{ margin:10px;width:180px;height:40px;color:#cccccc;cursor:pointer;background:#202020;font-weight:600;border-color:gray;border-radius:4px;border-width:2px; }';
  document.getElementsByTagName('head')[0].appendChild(style);
  button=[];
  button[0] = createButton('Limpar Tudo');
  //button[0].parent('botoes');
  button[1] = createButton('Rodar!');
  //button[1].parent('botoes');
  button[2] = createButton('Pause');
  //button[1].parent('botoes');
  button.forEach(element => {
    element.parent('botoes');
    element.class('create-button');
  });
  // alterando estilos div de botoes
  divBotoes=document.getElementById('botoes');
  divBotoes.style.width=canva_width+"px";
  _loop=false;
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
  button[1].mousePressed(rodar);
  if(_loop){
    console.log("oi loop");
    return;
  }
  console.log("oi");
  noLoop();
  
}

function mousePressed(){
  if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
    let celulaX=floor(mouseX/tamanho_celulas);
    let celulaY=floor(mouseY/tamanho_celulas);
    celulas[celulaY][celulaX]=!celulas[celulaY][celulaX];
  }
  loop();
}

function limpaCelulas(){
  for(let i=0;i<linhas;i++){
    celulas[i]=[];
    for(let j=0;j<colunas;j++){
      celulas[i][j]=false;
    }
  }
  pausar();
}

function rodar(){
  _loop=true;
}
function pausar(){
  _loop=false;
}

