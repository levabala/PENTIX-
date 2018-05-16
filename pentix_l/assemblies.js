function inRange(num, from, to){
    if (from >= num)
        return from;
    if (to <= num)
        return to;
    return num;
}

function P(x, y){
    var P = this;
    this.x = x;
    this.y = y;    

    this.add = function(p2){
        P.x += p2.x;
        P.y += p2.y;
    }

    this.clone = function(){
        return new P(p.x, p.y);
    }
}