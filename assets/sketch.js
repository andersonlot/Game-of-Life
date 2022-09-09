var celulas=[];
var tamanho_celulas=10;
var linhas;
var colunas;
const COR_ESCURA="#001c15";
const COR_CLARA="#0Fc411";

function setup() {
  canvas=createCanvas(720,480);
  canvas.parent('canvas');
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
  button.size(150,40);
  
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
  button.mousePressed(limpaCelulas);
  button.position(windowWidth/2-button.width/2,height+120);
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

