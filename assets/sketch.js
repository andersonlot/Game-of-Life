var celulas=[];
var tamanho_celulas=10;
var linhas;
var colunas;
var _loop;
var geracao=0;
const canva_width=600;
const COR_ESCURA="#151515";
const COR_CLARA="#c0b000";


function setup() {
  frameRate(3);
  canva=createCanvas(canva_width,400);
  canva.parent('canvas');
  linhas=height/tamanho_celulas;
  colunas=width/tamanho_celulas;
  for(let i=0;i<linhas;i++){
    celulas[i]=[];
    for(let j=0;j<colunas;j++){
      celulas[i][j]=random()>0.95;
    }
  }
  var style = document.createElement('style');
  style.innerHTML = '.create-button{ margin:10px;width:180px;height:40px;color:#cccccc;cursor:pointer;background:#202020;font-weight:600;border-color:gray;border-radius:4px;border-width:2px; }';
  document.getElementsByTagName('head')[0].appendChild(style);
  button=[];
  button[0] = createButton('Limpar Tudo');
  button[1] = createButton('Play');
  button[2] = createButton('Pause');
  button.forEach(element => {
    element.parent('botoes');
    element.class('create-button');
  });
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
  fill('white');
  textSize(15);
  text("Gen: "+geracao,10,20);
  let divCanvas=document.getElementById("canvas");
  button[0].mousePressed(limpaCelulas);
  button[1].mousePressed(rodar);
  button[2].mousePressed(pausar);
  if(_loop){
    geracao++;
    var celulas_futuro=[];
    for(let i=0;i<linhas;i++){
      celulas_futuro[i]=[];
      for(let j=0;j<colunas;j++){
        celulas_futuro[i][j]=calculaProxGeracao(celulas,i,j)
      }
    }
    celulas=celulas_futuro;
    return;
  }
  noLoop();
}
function touchMoved() {
  if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
    let celulaX=floor(mouseX/tamanho_celulas);
    let celulaY=floor(mouseY/tamanho_celulas);
    celulas[celulaY][celulaX]=true;
  }
  loop();
}
function touchStarted() {
  if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
    let celulaX=floor(mouseX/tamanho_celulas);
    let celulaY=floor(mouseY/tamanho_celulas);
    celulas[celulaY][celulaX]=true;
  }
  loop();
}
/*
function mousePressed(){
  if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
    let celulaX=floor(mouseX/tamanho_celulas);
    let celulaY=floor(mouseY/tamanho_celulas);
    celulas[celulaY][celulaX]=!celulas[celulaY][celulaX];
  }
  loop();
}
*/
function limpaCelulas(){
  for(let i=0;i<linhas;i++){
    celulas[i]=[];
    for(let j=0;j<colunas;j++){
      celulas[i][j]=false;
    }
  }
  geracao=0;
  pausar();
}
function rodar(){
  _loop=true;
}
function pausar(){
  _loop=false;
}
function calculaProxGeracao(_celulas_antigas,i,j){
  var _celulas_antigas_=_celulas_antigas.slice();
  if(_celulas_antigas[i][j]===true){
    if(vizinhosVivos(_celulas_antigas_,i,j)>=4){
      return false;
    }
    if(vizinhosVivos(_celulas_antigas_,i,j)<=1){
      return false;
    }
    return true;
  }
  if(vizinhosVivos(_celulas_antigas_,i,j)===3){
    return true;
  }
  return false;
}
function vizinhosVivos(_celulas_antigas,i,j){
  var _vizinhosVivos=0;
  var _celulas_antigas_=_celulas_antigas.slice();
  if(i>0 &&        j>0        ){if(_celulas_antigas_[i-1][j-1]){_vizinhosVivos++;}}
  if(i>0                      ){if(_celulas_antigas_[i-1][j]){_vizinhosVivos++;}}
  if(i>0 &&        j<colunas-1){if(_celulas_antigas_[i-1][j+1]){_vizinhosVivos++;}}
  if(              j<colunas-1){if(_celulas_antigas_[i][j+1]){_vizinhosVivos++;}}
  if(i<linhas-1 && j<colunas-1){if(_celulas_antigas_[i+1][j+1]){_vizinhosVivos++;}}
  if(i<linhas-1               ){if(_celulas_antigas_[i+1][j]){_vizinhosVivos++;}}
  if(i<linhas-1 && j>0        ){if(_celulas_antigas_[i+1][j-1]){_vizinhosVivos++;}}
  if(              j>0        ){if(_celulas_antigas_[i][j-1]){_vizinhosVivos++;}}
  return _vizinhosVivos;
}