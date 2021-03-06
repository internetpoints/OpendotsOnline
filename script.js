function Dot(x, y) {
  this.x = x;
  this.y = y;
  this.r = 10;
  this.selected = false;
  
  this.display = function() {
    fill(this.selected ? color(255, 0, 0) : color(255, 255, 255));
    circle(this.x, this.y, this.r);
  }
  
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.r) {
      this.selected = !this.selected;   
    }
  }
}

function Line(x1, y1, x2, y2) {
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;

  this.display = function() {
    stroke(color(255, 255, 255));
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

const h = 500;
const w = 500;
const rows = 15;
const cols = 15;

var dots = [];
var horizaontalLines = [];
var verticalLines = [];

function setup() {
  createCanvas(w, h);
  var colSpacing = w / cols;
  var rowSpacing = h / rows;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (j === 0) {
        dots[i] = [];
        horizaontalLines[i] = [];
        verticalLines[i] = [];
      }
      dots[i][j] = new Dot(i * colSpacing + colSpacing / 2, j * rowSpacing + rowSpacing / 2);
      if (i < rows - 1) {
        horizaontalLines[i][j] = new Line(
          i * colSpacing + colSpacing / 2, j * rowSpacing + rowSpacing / 2,
          (i+1) * colSpacing + colSpacing / 2, j * rowSpacing + rowSpacing / 2
        );
      }
      if (j < cols - 1) {
        verticalLines[i][j] = new Line(
          i * colSpacing + colSpacing / 2, j * rowSpacing + rowSpacing / 2,
          i * colSpacing + colSpacing / 2, (j+1) * rowSpacing + rowSpacing / 2
        );
      }
    }
  }
}

function mousePressed() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      dots[i][j].clicked();
    }
  }
}

function draw() {
  background(0);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      dots[i][j].display();
      if (i < rows - 1) {
        horizaontalLines[i][j].display();
      }
      if (j < cols - 1) {
        verticalLines[i][j].display();
      }
    }
  }
}
