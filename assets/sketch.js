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
  button = createButton('Limpar Tudo');
  button.parent('botoes');
  button.size(150,40);
  // alterando estilos div de botoes
  divBotoes=document.getElementById('botoes');
  divBotoes.style.margin="20px";
  //alterando estido botoes
  button.style('color','#cccccc');
  button.style('cursor', 'pointer');
  button.style('background','#202020');
  button.style('font-weight','600');
  button.style('font-size','15pt');
  button.style('border-color','gray');
  button.style('border-radius','5px');
  button.style('border-width','2px');
  
  
  
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
  button.mousePressed(limpaCelulas);
  //button.position(divCanvas.offsetLeft,divCanvas.offsetTop+height);
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

