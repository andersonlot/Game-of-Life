var celulas=[];
var tamanho_celulas=10;
var linhas;
var colunas;
var _loop;
var geracao=0;
const canva_width=600;
var COR_ESCURA;
const COR_CLARA="#FEBF2C";
var FR=3;


function setup() {
  COR_ESCURA=color(254,191,44);
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
  style.innerHTML = '.create-button{ margin:10px;width:186.66px;height:40px;color:#cccccc;cursor:pointer;background:#202020;font-weight:600;border-color:gray;border-radius:4px;border-width:2px; }';
  document.getElementsByTagName('head')[0].appendChild(style);
  button=[];
  button[0] = createButton('Play');
  button[1] = createButton('Pause');
  button[2] = createButton('Limpa Tudo');
  button[3] = createButton('+ Gen/s');
  button[4] = createButton('- Gen/s');
  button[3].style("width","290px");
  button[4].style("width","290px");
  button.forEach(element => {
    element.parent('botoes');
    element.class('create-button');
  });
  divBotoes=document.getElementById('botoes');
  divBotoes.style.width=(canva_width+20)+"px";
  _loop=false;

}
function draw() {
  frameRate(FR);
  var spacing=1.5;
  clear();
  for(let i=0;i<linhas;i++){
    for(let j=0;j<colunas;j++){
      noStroke();
      if(celulas[i][j]){
        fill(COR_CLARA);
      }else{
        COR_ESCURA.setAlpha(8);
        fill(COR_ESCURA);
      }
      rect(j*tamanho_celulas+spacing,i*tamanho_celulas+spacing,tamanho_celulas-2*spacing,tamanho_celulas-2*spacing,1.2);
    }
  }
  stroke("black");
  fill('white');
  textSize(15);
  text("Gen: "+geracao,10,20);
  text("Gen/s: "+FR,10,40);
  let divCanvas=document.getElementById("canvas");
  button[0].mousePressed(rodar);
  button[1].mousePressed(pausar);
  button[2].mousePressed(limpaCelulas);
  button[3].mousePressed(increaseFrameRate);
  button[4].mousePressed(decreaseFrameRate);
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


function mouseClicked(){
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

function decreaseFrameRate(){
  if(FR>1){
    FR--;
    return;
  }
  FR=1;
  return;
}
function increaseFrameRate(){
  if(FR<30){
    FR++;
    return;
  }
  FR=30;
  return;

}