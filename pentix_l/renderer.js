function Renderer(div, board){
    var r = this;
    this.div = div;
    this.board = board;
    this.scaledWidth = 0;
    this.scaledHeight = 0;    
    this.draw = SVG(div);
    var mainGroup = this.draw.group();   
    var nested = this.draw.nested();
    mainGroup.add(nested);     

    var scale = 1;        

    this.rescale = function(){        
        scale = Math.min(div.offsetWidth / board.width, div.offsetHeight / board.height);                
        r.scaledWidth = div.offsetWidth / scale;
        r.scaledHeight = div.offsetHeight / scale;
        mainGroup.scale(scale, scale);
    }

    this.init = function(){
        r.draw.clear();
        mainGroup = this.draw.group();
        nested = this.draw.nested();
        mainGroup.add(nested);
        r.rescale();                   
        
        var rect = nested.rect(board.width, board.height).attr({stroke: "none", "stroke-width": 0.1, fill: "lightgray", "fill-opacity": 0.3});                
        nested.center(r.scaledWidth / 4, 0);//r.scaledHeight / 2);        
        //mainGroup.add(rect)

        drawCells();
        drawNet();        
    }

    function drawNet(){        
        for (var x = 0; x <= board.width; x++)
            nested.add(r.draw.line(x, 0, x, board.height).stroke({width: 0.1, opacity: 0.1}));//.attr({"stroke-opacity": 0.1}));
        for (var y = 0; y <= board.height; y++)
            nested.add(r.draw.line(0, y, board.width, y).stroke({width: 0.1, opacity: 0.1}));//.attr({"stroke-opacity": 0.1}));
    }

    function drawCells(){
        for (var x = 0; x < board.width; x++)
            for (var y = 0; y < board.height; y++){
                if (board.cells[x][y] != 1)
                    continue;
                var rect = nested.rect(1, 1).center(x + 0.5, y + 0.5).fill({color: "lightblue"});
            }
    }
}