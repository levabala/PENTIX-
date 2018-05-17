var g = new Game();

var f = new Figure(new P(7,7), [1, 1, 0, 1, 1, 1], 0, 0);
console.log(g.board.cells);
g.board.placeFigure(f, 1);  
console.log(g.board.cells);
