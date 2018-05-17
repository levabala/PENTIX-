function Renderer(div, board){
    var r = this;
    this.div = div;
    this.board = board;
    this.draw = SVG(div);
    var mainGroup = this.draw.group();
    this.g = mainGroup;
    console.log(mainGroup)

    var scale = 1;        

    this.rescale = function(){
        scale = Math.min(div.offsetWidth / board.width, div.offsetHeight / board.height);                
        mainGroup.scale(scale, scale);
    }

    this.init = function(){
        r.draw.clear();
        mainGroup = this.draw.group();
        r.rescale();                   

        var rect = r.draw.rect(board.width, board.height).attr({fill: "red"});
        mainGroup.add(rect)
    }
}