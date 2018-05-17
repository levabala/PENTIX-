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

    this.canPlaceFigure = function(figure){
        var clear = true;
        figureCellsIteration(figure, (cell) => {
            var res = board.cells[cell.x][cell.y] == 0;
            clear = res;
            return res;
        });
    }    

    this.placeFigure = function(figure, value){
        figureCellsIteration(figure, (cell) => {
            board.cells[cell.x][cell.y] = value;
            return true;
        });
    }

    var vectorsMap = {
        0: new P(1, 0),
        1: new P(0, 1),
        2: new P(-1, 0),
        3: new P(0, -1)
    }
    function figureCellsIteration(figure, action){
        var maxTranspose = 1 + figure.layers * 2;
        var cell = figure.center.clone();
        var i = 0;        
        var rotation = figure.rotation;

        if (figure.code.length <= i)
        return;
        
        //check center
        console.log(cell);
        if (figure.code[i])
            if (!action(cell))
                return;
        i++;

        for (var t = 1; t <= maxTranspose; t++){
            function processAxis(){                
                var step = vectorsMap[rotation].multiply(t);
                console.log("step:",step)
                while (step.x != 0 && figure.code.length > i){            
                    var delta = Math.sign(step.x);
                    cell.add(new P(delta, 0))
                    console.log(cell);           
                    if (figure.code[i])
                        if (!action(cell))
                            break;            
                    i++;     
                    step.x -= delta;           
                }
                while (step.y != 0 && figure.code.length > i){            
                    var delta = Math.sign(step.y);
                    cell.add(new P(0, delta))
                    console.log(cell);           
                    if (figure.code[i])
                        if (!action(cell))
                            break;            
                    i++;                
                    step.y -= delta;           
                }
            }

            //by first axis    
            processAxis();
            if (figure.code.length <= i)
                    break;

            //now rotate
            rotation += figure.mirrorState * 2 - 1; //0 -> -1 && 1 -> 1
            if (rotation > 3)
                rotation = 0;
            else if (rotation < 0)
                rotation = 3;

            //by second axis
            processAxis();
            if (figure.code.length <= i)
                    break;

            //now rotate
            rotation += figure.mirrorState * 2 - 1; 
            if (rotation > 3)
                rotation = 0;
            else if (rotation < 0)
                rotation = 3;
        }
    }
}