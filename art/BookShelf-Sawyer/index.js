/*
@title: Book Shelf Generator
@author: Sawyer Kocourek
@snapshot: snapshot2.png
*/
// Book Shelf
const width = 125;
const height = 125;

setDocDimensions(width, height);
const BookShelfHeight = 115
const BookShelfWidth = 70
const t = new bt.Turtle();
//draws a book
function rect (width, height, Postition) {
  t.jump(Postition);
  t.forward(width);
  t.left(90);
  t.forward(height);
  t.left(90);
  t.forward(width);
  t.left(90);
  t.forward(height);
  t.left(90);
  drawLines(t.lines());
}
//draws a book with random height and width
function RandBook(Position) {
  let width = bt.randIntInRange(3, 8)
  let height = bt.randIntInRange(10, 25)
  rect(width,height,Position);
}
//draws a shelf worth of books
function shelf(Left, Right, Height){
  let i = Left;
  while (i < Right){
    let width2 = bt.randIntInRange(3, 8)
    let height2 = bt.randIntInRange(10, 25)
    rect(width2,height2,[i,Height]);
    i = i + width2;
  }
}

function DrawShelves() {
  let a = 2
  let offset = 0
  if(BookShelfHeight> 100){
    a = bt.randIntInRange(3, 4)
  } else {
    a = bt.randIntInRange(2, 3)
  }
  let j = 0
  while(j < a) {
    rect(BookShelfWidth, BookShelfHeight/a, [(125-BookShelfWidth)/2, 0 + offset])
    shelf((125-BookShelfWidth)/2,(112+BookShelfWidth)/2,offset);
    offset = offset + BookShelfHeight/a
    j = j + 1;
  }

}
DrawShelves()
// shelf (19,94,14)
// shelf (19,84,90)
// shelf (19,94,53)