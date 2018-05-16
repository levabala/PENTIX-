function Board(width = 14, height = 25){
    var board = this;
    this.width = width;
    this.height = height;    
    this.cells = [];
    
    this.initMap = function(){
        board.cells = [];
        for (var x = 0; x < board.width; x++){
            board.cells[x] = [];
            for (var y = 0; y < board.height; y++)
                board.cells[x][y] = 0;
        }
    }    

    this.placeFigure = function(center, figure, value){

    }

    var vectorsMap = {
        0: new P(1, 0),
        1: new P(0, 1),
        2: new P(-1, 0),
        3: new P(0, -1)
    }
    function figureCellsIteration(center, figure, action){
        var maxTranspose = 1 + figure.layer * 2;
        var cell = center.clone();
        var i = 0;
        var rotation = figure.rotation;
        for (var t = 0; t <= maxTranspose; t++){
            //by first axis            
            cell.add(vectorsMap[rotation] * t)
            if (figure.code <= i);
                break;
            if (figure.code[i])
                if (!action(cell))
                    break;            
            i++;
            if (figure.code <= i)
                break;

            //now rotate
            rotation++;
            if (rotation > 3)
                rotation = 0;

            //by second axis
            cell.add(vectorsMap[rotation] * t)            
            if (figure.code[i])
                if (!action(cell))
                    break;
            i++;
            if (figure.code <= i)
                break;
        }
    }
}