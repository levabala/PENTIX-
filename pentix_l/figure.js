function Figure(code, rotation = 0, mirrorState = 0){
    var figure = this;
    this.code = code;
    this.rotation = rotation;
    this.mirrorState = mirrorState;
    this.layers = 1 + ((code.length > 8) ? 1 : 0);

    this.rotate = function(delta){
        figure.rotation += delta;
        figure.rotation = inRange(figure.rotation, 0, 3);
    }

    this.mirror = function(){
        figure.mirrorState = Math.abs(figure.mirrorState - 1);
    }
}