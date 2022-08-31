var celulas=[];
var tamanho_celulas=10;
var linhas;
var colunas;

function setup() {
  createCanvas(720,480);
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
  button.position(20,height+40);
}

function draw() {
  background(0);
  for(let i=0;i<linhas;i++){
    for(let j=0;j<colunas;j++){
      stroke(55);
      if(celulas[i][j]){
        fill(240);
      }else{
        noFill();
      }
      rect(j*tamanho_celulas,i*tamanho_celulas,tamanho_celulas);
    }
  }
  button.mousePressed(limpaCelulas);
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

