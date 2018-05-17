var g = new Game();

var f = new Figure(new P(7,7), [1, 1, 0, 1, 1, 1], 0, 0);
g.board.placeFigure(f, 1);  

var renderer = new Renderer(document.getElementById("gameboard_div"), g.board);
renderer.init();
