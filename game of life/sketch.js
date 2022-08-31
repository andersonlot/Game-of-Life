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
}

function draw() {
  background(40);
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
}

function mousePressed(){
  let celulaX=floor(mouseX/tamanho_celulas);
  let celulaY=floor(mouseY/tamanho_celulas);
  celulas[celulaY][celulaX]=true;
}