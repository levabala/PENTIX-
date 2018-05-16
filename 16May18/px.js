$(document).ready(function() {    
    window.Game = window.Game || {};
    Game.row = 25;
    Game.column = 14;
    Game.LEFT = "Left";
    Game.RIGHT = "Right";
    Game.UP = "Up";
    Game.DOWN = "Down";
    Game.EMPTY = 0;
    Game.FULL = 1;
    Game.shape = 0;
    Game.fill = 0;
    Game.level = 5;
    Game.shapes = 0;
    Game.gameset = new Array();
    Game.gameset[0] = 1;

    $('#gamestart').click(function() {
        if (Game.score == -1) {
            newgame();
            //				$("#gamestart").html("<BUTTON>START/STOP&nbsp;GAME!</BUTTON>");
        } else finishGame();
    });

    $('#cr').click(function() {
        cshowhide('cshort');
    });

    $('#sr').click(function() {
        cshowhide('tshort');
    });

    Game.drawGameMap = function() {
        var html = "";
        for (var i = 0; i < Game.row; i++) {
            html += "<tr>";
            for (var j = 0; j < Game.column; j++) html += "<td id='r" + i + "c" + j + "' class='cell'></td>";
            html += "</tr>";
        };
        $("#gameMap").html(html);

        html = "";
        for (var i = 0; i < 5; i++) {
            html += "<tr>";
            for (var j = 0; j < 5; j++) html += "<td id='pr" + i + "pc" + j + "' class='cell'></td>";
            html += "</tr>";
        };
        $("#gamePreviewMap").html(html);

        //			$("#gamestart").html("<BUTTON>START/STOP&nbsp;GAME!</BUTTON>");
    };
    Game.next = 0; //Store preview block
    Game.cur = 0;

    Game.Board = function() {
        this.cells = [];

        for (var row = 0; row < Game.row; row++) {
            var rowObject = [];
            for (var column = 0; column < Game.column; column++) {
                rowObject[column] = Game.EMPTY; // 0 mean empty cell, 1 mean cell occupy a block
            };
            this.cells[row] = rowObject;
        };

        this.resetGameBoard = function(fill) {
            for (var row = 0; row < Game.row; row++) {
                var rowObject = [];
                for (var column = 0; column < Game.column; column++) {
                    if (Game.row - fill - 1 < row) {
                        var random = Math.floor(Math.random() * 2);
                        rowObject[column] = random;
                    } else
                        rowObject[column] = Game.EMPTY; // 0 mean empty cell, 1 mean cell occupy a block
                };
                this.cells[row] = rowObject;
            };
        };

        this.clearGameBoard = function() {
            for (var row = 0; row < Game.row; row++) {
                for (var column = 0; column < Game.column; column++) {
                    $("#r" + row + "c" + column).removeClass("cell");
                    $("#r" + row + "c" + column).removeClass("block");
                    $("#r" + row + "c" + column).removeClass("animate");
                    $("#r" + row + "c" + column).removeClass("blockhelp");
                };
            };
        };

        this.animateRow = function(row) {
            for (var column = 0; column < Game.column; column++) $("#r" + row + "c" + column).addClass("animate");
        };

        this.drawGameBoard = function() {
            this.clearGameBoard();
            for (var row = 0; row < Game.row; row++) {

                for (var column = 0; column < Game.column; column++) {

                    var className;
                    if (this.cells[row][column] == Game.EMPTY) {
                        className = "cell";
                    } else {
                        className = "block";
                    }
                    $("#r" + row + "c" + column).addClass(className);
                };

            };
        };

    };
    Game.gameBoard = new Game.Board();

    var blocks = new Array();

    blocks[1] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[2] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[3] = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[4] = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[5] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[6] = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[7] = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[8] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[9] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[10] = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[11] = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    blocks[12] = [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];

    Game.Block = function() {
        this.currentRow = 0;
        this.currentColumn = 4; //To start at the middle
        this.blockCells = [];
        this.blocktemp = [];

        this.init = function() {
            for (var row = 0; row < 5; row++) {
                var rowObject = [];

                for (var column = 0; column < 5; column++) {
                    rowObject[column] = 0; // 0 mean empty cell, 1 mean cell occupy a block
                };
                this.blockCells[row] = rowObject;
            };
            //				$("#xinfo").append("createarandom");
            this.createARadomBlock();
            //				$("#xinfo").append("drawblock");
            this.drawBlock();
            //				$("#xinfo").append("done");

            Game.shapes++;
        };

        this.createARadomBlock = function() {
            var random = Math.floor(Math.random() * (11 - 0 + 1)) + 1;
            Game.cur = Game.next;
            //				alert(Game.shape +' -> '+Game.cur);
            //				$("#xinfo").append("gameshape:"+Game.shape);

            if (Game.shape == 0) Game.blocknext = blocks[Game.next];

            this.blockCells = Game.blocknext;

            Game.shape++;
            Game.next = Game.gameset[Game.shape];
            Game.blocknext = blocks[Game.next];
            this.showPreview();
        };

        this.showPreview = function() {
            var blockCells;
            //				blockCells = blocks[Game.next];
            blockCells = Game.blocknext;
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    //console.log("r "+r+" c "+c + " "+ this.blockCells[r][c]);
                    //$("#pr"+y+"pc"+x).removeClass("block");
                    if (blockCells[r][c] == 1) {
                        var y = r;
                        var x = c;
                        $("#pr" + y + "pc" + x).addClass("block");
                        //							console.log("#pr"+y+"pc"+x);
                    } else {
                        var y = r;
                        var x = c;
                        $("#pr" + y + "pc" + x).removeClass("block");
                    };

                };
            };
        };

        this.isOrigin = function() {
            if (this.currentRow == 0 && this.currentColumn == 4) return true;
            else return false;
        };

        this.drawBlock = function() {
            //current x ,current y is the first corner of block cell[0,0]
            //				this.drawhelpBlock();

            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    if (this.blockCells[r][c] == 1) {
                        var y = this.currentRow + r;
                        var x = this.currentColumn + c;
                        //							$("#r"+y+"c"+x).removeClass("blockhelp");
                        $("#r" + y + "c" + x).addClass("block");
                    };

                };
            };
        };

        this.drawhelpBlock = function() {
            var r1 = 0;
            while (Game.current.isAvail(r1, 0)) r1++;
            r1--;
            //current x ,current y is the first corner of block cell[0,0]
            Game.helpy = r1;
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    if (this.blockCells[r][c] == 1) {
                        var y = this.currentRow + r + r1;
                        var x = this.currentColumn + c;
                        $("#r" + y + "c" + x).addClass("blockhelp");
                    };
                };
            };
        };

        this.isSafeToMirror = function() {
            var newBlock = [];
            for (var r = 0; r < 5; r++) {
                newBlock[r] = [];
                for (var c = 0; c < 5; c++) newBlock[r][c] = 0;
            };
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) newBlock[r][4 - c] = this.blockCells[r][c];
            };

            var ok = true;
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    if (newBlock[r][c] == Game.FULL) {
                        // Then game board must be empty
                        var y = this.currentRow + r;
                        var x = this.currentColumn + c;

                        if (Game.gameBoard.cells[y][x] != Game.EMPTY) return false;
                    };
                };
            };
            return ok;
        };

        this.mirror = function() {
            if (!this.isSafeToMirror()) return;

            this.clearOldDrawing();
            var newBlock = [];
            for (var r = 0; r < 5; r++) {
                newBlock[r] = [];
                for (var c = 0; c < 5; c++) newBlock[r][c] = 0;
            };
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) newBlock[r][4 - c] = this.blockCells[r][c];
            };

            Game.mirrors++;
            Game.actions++;
            this.blockCells = newBlock;
            // record game
            var delay = dt.getTime() - Game.start;
            Game.action++;
            Game.delays[Game.action] = delay;
            Game.moves[Game.action] = 'm';

            this.drawBlock();
        };


        this.isSafeToRotate = function(nx = 0) {
            //						$("#info").append('nx='+nx+'<br>');
            var newBlock = [];
            for (var r = 0; r < 5; r++) {
                newBlock[r] = [];
                for (var c = 0; c < 5; c++) newBlock[r][c] = 0;
            }
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) newBlock[c][r] = this.blockCells[r][4 - c];
            }

            var ok = true;
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    if (newBlock[r][c] == Game.FULL) {
                        // Then game board must be empty
                        var y = this.currentRow + r;
                        var x = this.currentColumn + c + nx;

                        if (Game.gameBoard.cells[y][x] != Game.EMPTY) {
                            //							$("#info").append('x='+x+' / '+Game.gameBoard.cells[y][x]+' | ');
                            return false;
                        };
                    };
                };
            };
            return ok;
        };

        this.rotate = function() {
            if (!this.isSafeToRotate()) {
                if (this.currentColumn < 3) {
                    if (this.isSafeToRotate(1))
                        Game.current.moveRight();
                    else
                    if (this.isSafeToRotate(2)) {
                        Game.current.moveRight();
                        Game.current.moveRight();
                    } else return;
                } else
                if (this.currentColumn > 9) {
                    if (this.isSafeToRotate(-1))
                        Game.current.moveLeft();
                    else
                    if (this.isSafeToRotate(-2)) {
                        Game.current.moveLeft();
                        Game.current.moveLeft();
                    } else return;
                } else return false;
            };

            this.clearOldDrawing();

            var newBlock = [];
            for (var r = 0; r < 5; r++) {
                newBlock[r] = [];
                for (var c = 0; c < 5; c++) newBlock[r][c] = 0;
            };
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) newBlock[c][r] = this.blockCells[r][4 - c];
            };

            var delay = dt.getTime() - Game.start;
            Game.rotates++;
            Game.actions++;
            this.blockCells = newBlock;
            // record game
            Game.action++;
            Game.delays[Game.action] = delay;
            Game.moves[Game.action] = 's';

            this.drawBlock();
        };

        this.exchange = function() {
            var next = Game.next;

            if (!this.isAvail(0, 0, Game.blocknext)) {
                if (this.currentColumn < 3) {
                    if (this.isAvail(0, 1, Game.blocknext))
                        Game.current.moveRight();
                    else
                    if (this.isAvail(0, 2, Game.blocknext)) {
                        Game.current.moveRight();
                        Game.current.moveRight();
                    } else return;
                } else
                if (this.currentColumn > 10) {
                    if (this.isAvail(0, -1, Game.blocknext))
                        Game.current.moveLeft();
                    else
                    if (this.isAvail(0, -2, Game.blocknext)) {
                        Game.current.moveLeft();
                        Game.current.moveLeft();
                    } else return;
                } else return false;
            };

            //				if (this.isAvail(0, 0, Game.blocknext))
            {
                this.clearOldDrawing();
                this.blocktemp = this.blockCells;
                this.blockCells = Game.blocknext;
                Game.blocknext = this.blocktemp;

                //					blocks[Game.next] = newBlock;
                Game.next = Game.cur;
                Game.cur = next;

                Game.exchanges++;
                Game.actions++;

                // record game
                var delay = dt.getTime() - Game.start;
                Game.action++;
                Game.delays[Game.action] = delay;
                Game.moves[Game.action] = 'e';

                this.showPreview();
                this.drawBlock();
            };
        };

        this.clearhelpblock = function() {
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    if (this.blockCells[r][c] == 1) {
                        var y = this.currentRow + r + Game.helpy;
                        var x = this.currentColumn + c;
                        $("#r" + y + "c" + x).removeClass("blockhelp");
                    };
                };
            };
        };

        this.clearOldDrawing = function() {
            //				this.clearhelpblock();

            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    if (this.blockCells[r][c] == 1) {
                        var y = this.currentRow + r;
                        var x = this.currentColumn + c;
                        $("#r" + y + "c" + x).removeClass("block");
                    };
                };
            };
        };

        this.isAvail = function(nr, nc, bc = 0) {
            var ok = true;
            if (bc);
            else bc = this.blockCells;

            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    if (bc[r][c] == Game.FULL) {
                        var y = this.currentRow + r + nr;
                        var x = this.currentColumn + c + nc;
                        //last row, reach the end stop and return false, cannot move further down
                        if (y >= Game.row) return false;
                        if (x < 0) return false;
                        if (this.x + 4 >= Game.column) return false;
                        if (Game.gameBoard.cells[y][x] != Game.EMPTY) return false;
                    };
                };
            };
            return ok;
        };

        this.moveDown = function() {
            if (this.isAvail(1, 0)) {
                //Move down
                // record game
                var delay = dt.getTime() - Game.start;
                Game.action++;
                Game.delays[Game.action] = delay;
                Game.moves[Game.action] = 'f';

                this.clearOldDrawing();
                this.currentRow++;
                this.drawBlock();

                return true;
            } else // Set the game board cell
            {
                this.storeGameBoardData();
                this.processGameRow();
                Game.current = new Game.Block();
                Game.current.init();
                // record game
                var delay = dt.getTime() - Game.start;
                Game.action++;
                Game.delays[Game.action] = delay;
                Game.moves[Game.action] = 'n';

                return false;
            };
        };
        this.storeGameBoardData = function() {
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {

                    var y = this.currentRow + r;
                    var x = this.currentColumn + c;
                    if (this.blockCells[r][c] == Game.FULL) {
                        Game.gameBoard.cells[y][x] = Game.FULL;
                        //								console.log("Set row "+y +" column "+x +" to 1");
                        if (Game.replay) Game.gameBoard.drawGameBoard();
                    };
                };
            };
        };
        this.processGameRow = function() {
            //start from the last row
            var rowIndexToRemove = [];
            for (var last = Game.row - 1; last >= 0; last--) {
                var ok = true;
                for (var col = 0; col < Game.column; col++) {
                    ok = ok && Game.gameBoard.cells[last][col] == Game.FULL;
                }

                if (ok) // This row is full
                {
                    Game.lines++;
                    if (Game.lines == 17) {
                        $('#p17').addClass("fon");
                        $('#p18').addClass("green");
                        $('#p19').addClass("green");
                        $('#p20').addClass("green");
                        $('#r17').addClass("fon");
                        $('#r18').addClass("green");
                        $('#r19').addClass("green");
                        $('#r20').addClass("green");
                    } else if (Game.lines == 18) {
                        $('#p18').removeClass("green");
                        $('#p18').addClass("fon");
                        $('#p19').removeClass("green");
                        $('#p19').addClass("orange");
                        $('#p20').removeClass("green");
                        $('#p20').addClass("orange");
                        $('#r18').removeClass("green");
                        $('#r18').addClass("fon");
                        $('#r19').removeClass("green");
                        $('#r19').addClass("orange");
                        $('#r20').removeClass("green");
                        $('#r20').addClass("orange");
                    } else if (Game.lines == 19) {
                        $('#p19').removeClass("orange");
                        $('#p20').removeClass("orange");
                        $('#p19').addClass("fon");
                        $('#p20').addClass("red");
                        $('#r19').removeClass("orange");
                        $('#r20').removeClass("orange");
                        $('#r19').addClass("fon");
                        $('#r20').addClass("red");
                    } else if (Game.lines == 20) {
                        $('#p20').removeClass("red");
                        $('#p20').addClass("fon");
                        $('#r20').removeClass("red");
                        $('#r20').addClass("fon");
                    } else {
                        $('#p' + Game.lines).addClass("fon");
                        $('#r' + Game.lines).addClass("fon");
                    };
                    var delay = (dt.getTime() - Game.start) / 1000;
                    if (Game.replay) {
                        delay = Game.playtime / 1000;
                    };
                    delay1 = delay - Game.lastline;
                    Game.lastline = delay;
                    $('#b' + Game.lines).html(delay.toFixed(1));
                    $('#bx' + Game.lines).html(delay1.toFixed(1));

                    //						console.log("Checking row "+last+" full "+ok);
                    rowIndexToRemove.unshift(last);
                };
            };
            // For each remove row shit the row from top
            for (var lastIndex = 0; lastIndex < rowIndexToRemove.length; lastIndex++) {
                var rowIndex = rowIndexToRemove[lastIndex];
                var animateRow = rowIndex;
                //shift the one row down
                //					console.log("Shifting down row "+rowIndex);
                for (var c = 0; c < Game.column; c++) {
                    //						console.log("remove row "+rowIndex +" column "+c +" with row "+(rowIndex-1)+" column "+c);
                    Game.gameBoard.cells[rowIndex][c] = Game.gameBoard.cells[rowIndex - 1][c];
                }
                rowIndex--;
                while (rowIndex > 0) {
                    for (var c = 0; c < Game.column; c++) {
                        Game.gameBoard.cells[rowIndex][c] = Game.gameBoard.cells[rowIndex - 1][c];
                    }
                    rowIndex--;
                }
                for (var col = 0; col < Game.column; col++) {
                    //Add the empty row at top
                    Game.gameBoard.cells[0][col] = Game.EMPTY;
                }
                Game.gameBoard.animateRow(animateRow);
                setTimeout(function() {
                    Game.gameBoard.drawGameBoard();
                }, 10);
                Game.score += 1000;
            }
            //Add bonus if more than one row
            if (rowIndexToRemove.length > 1) {
                Game.score += (rowIndexToRemove.length - 1) * 500;
            }

            Game.displayScore();

            if (Game.lines >= 20 && !Game.replay) {
                finishGame();
            };

        };

        this.moveLeft = function() {
            if (this.isAvail(0, -1)) {
                this.clearOldDrawing();
                this.currentColumn--;
                this.drawBlock();
                Game.leftmoves++;
                Game.actions++;
                // record game
                var delay = dt.getTime() - Game.start;
                Game.action++;
                Game.delays[Game.action] = delay;
                Game.moves[Game.action] = 'l';
            }
        };

        this.moveRight = function() {
            if (this.isAvail(0, +1)) {
                this.clearOldDrawing();
                this.currentColumn++;
                this.drawBlock();
                Game.rightmoves++;
                Game.actions++;
                // record game
                var delay = dt.getTime() - Game.start;
                Game.action++;
                Game.delays[Game.action] = delay;
                Game.moves[Game.action] = 'r';
            }
        };


    };

    Game.displayScore = function() {
        $("#gameScore").text(Game.score);
        $("#gameLines").text(Game.lines);
    };

    function base64_encode(data) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            enc = '';
        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + '==';
                break;
            case 2:
                enc = enc.slice(0, -1) + '=';
                break;
        }
        return enc;
    }

    function code(data) {
        var hl = Game.hash.length;
        var dx = '';

        for (var c = 0; c < data.length; c++) {
            //				dx = dx+String.fromCharCode(data.charCodeAt(c)+Game.hash.charCodeAt(c % hl));
            dx = dx + String.fromCharCode(data.charCodeAt(c) - Number(Game.hash.charAt(c % hl)));
        };
        var data = base64_encode(dx);
        return data;
    }

    function saveGame() {
        var dx = 'sc=' + Game.score + '&gl=' + Game.lines + '&pt=' + Game.playtime + '&ac=' + Game.actions + '&ex=' + Game.exchanges + '&ro=' + Game.rotates + '&mi=' + Game.mirrors + '&lm=' + Game.leftmoves + '&rm=' + Game.rightmoves + '&sh=' + Game.shapes + '&gs=' + Game.gameset + '&pf=' + Game.playfield + '&de=' + Game.ddelays + '&dm=' + Game.dmoves + '&pf2=' + Game.playfield2 + '&fill=' + Game.fill + '&level=' + Game.level;
        var dx2 = 'dx=' + code(dx);
        var dx = dx + '&' + dx2;
        //			$('#xinfo').append(dx + '<br>');
        //			$('#xinfo').append(dx2);
        $.ajax({
            url: "/results/post/",
            type: "POST",
            data: dx,
            cache: false,
            success: function(responce) {
                $('#info').append(responce);
            }
        });
    }

    function finishGame() {
        clearInterval(timer);
        clearInterval(timer1);

        var current = (dt.getTime() - Game.start) / 1000;
        current = current.toFixed(3);
        Game.playtime = current;
        $("#gameTime").text(current);
        if (Game.lines >= 20) {
            $("#result").fadeIn();
            $("#result").html('<span style="padding: 10px; background-color: #316ac5; color: yellow">YOUR RESULT: ' + current + '</span><br><br>');
            $("#game").html('');
        } else {
            $("#result").hide();
            $("#game").html('GAME OVER');
        };
        $("#lines").text(Game.lines);



        // packing recorded game
        //			$('#info').append('packing..<br>');

        for (i = 0; i < Game.moves.length; i++) Game.dmoves += Game.moves[i];
        Game.ddelays[0] = Game.delays[0];
        for (i = 1; i < Game.delays.length; i++) Game.ddelays[i] = Game.delays[i] - Game.delays[i - 1];

        // saving final playfield

        var fr = '';
        for (var i = 0; i < Game.row; i++) {
            fr = b2h(Game.gameBoard.cells[i]);
            Game.playfield2 += fr;
        };

        Game.score = -1;

        if (Game.lines > 3) saveGame();

        $('#help').hide(0);
        $('#resultinfo').fadeIn(200);
        $('#resultinfo1').fadeIn(200);
        $('#topresults').fadeIn(500);
        $('#chat').fadeIn(500);


        $.ajax({
            url: "/chat/playfield/refresh/",
            cache: false,
            success: function(responce) {
                $('#chat').html(responce);
            }
        });

        Game.lines = 0;
    }

    var $_GET = {};
    var params = document.getElementById("jsparams").getAttribute("src");

    params.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });


    var convertBase = function() {
        function convertBase(baseFrom, baseTo) {
            return function(num) {
                return parseInt(num, baseFrom).toString(baseTo);
            };
        }
        convertBase.bin2dec = convertBase(2, 10);
        convertBase.bin2hex = convertBase(2, 16);
        convertBase.dec2bin = convertBase(10, 2);
        convertBase.dec2hex = convertBase(10, 16);
        convertBase.hex2bin = convertBase(16, 2);
        convertBase.hex2dec = convertBase(16, 10);
        return convertBase;
    }();

    function bin2hex(s) {
        var v, i, f = 0,
            a = [];
        s += '';
        f = s.length;

        for (i = 0; i < f; i++) {
            a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/, "0$1");
        }

        return a.join('');
    }

    function b2h(str) {
        var s = '';
        for (var i = 0; i < str.length; i++) s += str[i];
        s = convertBase.bin2hex(s);
        if (s.length < 2) s = '000' + s;
        else if (s.length < 3) s = '00' + s;
        else if (s.length < 4) s = '0' + s;
        return s;
    };

    function newgame() {
        $('#resultinfo').css('display', 'none');
        $('#help').hide(0);
        $('#chat').hide(0);
        $('#topresults').hide(0);
        $("#replayinfo").html('');
        for (i = 1; i < 21; i++) {
            $('#p' + i).removeClass("green");
            $('#p' + i).removeClass("orange");
            $('#p' + i).removeClass("red");
            $('#p' + i).removeClass("fon");
            $('#r' + i).removeClass("green");
            $('#r' + i).removeClass("orange");
            $('#r' + i).removeClass("red");
            $('#r' + i).removeClass("fon");
            $('#b' + i).html('');
            $('#bx' + i).html('');
        };

        Game.moves = new Array();
        Game.delays = new Array();
        Game.ddelays = new Array();
        Game.action = 0;
        Game.dmoves = '';
        Game.shape = 0;
        Game.lastline = 0;

        Game.moves[0] = 'b';
        Game.delays[0] = '0';

        Game.drawGameMap();
        Game.gameBoard.resetGameBoard(Game.fill);
        Game.gameBoard.drawGameBoard();

        $("#info").html('');
        //$("#xinfo").html('crc: '+CRC);

        var playfield = '';
        Game.playfield2 = '';
        for (var i = 0; i < Game.row; i++) playfield += b2h(Game.gameBoard.cells[i]);
        Game.playfield = playfield;

        Game.shapes = 0;
        var finish = 0;
        var random = parseInt(Math.random() * 11) + 1;

        var rnd = 0;
        var gamesethtml = '';

        Game.ld = $_GET["ld"];
        Game.fd = $_GET["fd"];
        Game.nd = $_GET["nd"];
        Game.rd = $_GET["rd"];
        Game.timer1 = $_GET["bt"];

        for (var i = 0; i < 120; i++) {
            rnd = Math.floor(Math.random() * (11 - 0 + 1)) + 1;
            Game.gameset[i] = rnd;
            gamesethtml += ' . ' + rnd;
        };
        Game.next = Game.gameset[Game.shape];
        Game.current = new Game.Block();
        Game.current.init();

        Game.score = 0;
        Game.lines = 0;
        Game.leftmoves = 0;
        Game.rightmoves = 0;
        Game.mirrors = 0;
        Game.rotates = 0;
        Game.exchanges = 0;
        Game.actions = 0;

        dt = new Date();
        var start = dt.getTime();
        var current;
        Game.start = start;
        Game.lastleft = 0;
        Game.lastright = 0;
        Game.shape = 1;
        if (Game.level != 5) Game.ld = (21 - Game.level) * 50;

        keyState.Numpad9 = -1;
        keyState.Numpad6 = -1;
        keyState.ArrowLeft = -1;
        keyState.Numpad4 = -1;
        keyState.ArrowRight = -1;
        keyState.Numpad7 = -1;

        window.timer = window.setInterval(function() {
            dt = new Date();
            current = (dt.getTime() - start) / 1000;
            current = current.toFixed(3);
            Game.playtime = current;
            $("#gameTime").text(current);
            $("#shapes").text(Game.shapes);

            if (Game.current.isAvail(1, 0)) {
                Game.current.moveDown();
            } else if (!Game.current.isOrigin()) {
                Game.current.storeGameBoardData();
                Game.current.processGameRow();
                Game.current = new Game.Block();
                Game.current.init();
                // record game
                var delay = dt.getTime() - Game.start;
                Game.action++;
                Game.delays[Game.action] = delay;
                Game.moves[Game.action] = 'n';
            } else {
                finishGame();
            }
        }, Game.ld);

        var first;

        window.timer1 = window.setInterval(function() {
            dt = new Date();
            current = dt.getTime();
            var cl = current - Game.lastleft;
            var cr = current - Game.lastright;

            if (cl > Game.fd || keyState.Numpad7 == 'up') Game.nextleft = 0;
            if (cr > Game.fd || keyState.Numpad9 == 'up') Game.nextright = 0;
            if (cl > Game.fd || keyState.Numpad4 == 'up') Game.nextleft = 0;
            if (cr > Game.fd || keyState.Numpad6 == 'up') Game.nextright = 0;
            if (cl > Game.fd || keyState.ArrowLeft == 'up') Game.nextleft = 0;
            if (cr > Game.fd || keyState.ArrowRight == 'up') Game.nextright = 0;
            if (Game.nextleft == 1) Game.delayleft = Game.rd;
            else Game.delayleft = Game.nd;
            if (Game.nextright == 1) Game.delayright = Game.rd;
            else Game.delayright = Game.nd;
            if (Game.moved) {
                Game.delayleft = 200;
                Game.delayright = 200;
                Game.moved = 0;
            };

            if (keyState.Numpad7 == 'down' || keyState.Numpad4 == 'down' || keyState.ArrowLeft == 'down') {
                if (cl > Game.delayleft) {
                    Game.lastleft = current;
                    Game.current.moveLeft();
                    Game.nextleft++;
                }

            }
            if (keyState.Numpad9 == 'down' || keyState.Numpad6 == 'down' || keyState.ArrowRight == 'down') {
                if (cr > Game.delayright) {
                    Game.lastright = current;
                    Game.current.moveRight();
                    Game.nextright++;
                }
            }
        }, Game.timer1);
    };

    function explode(delimiter, string) { // Split a string by string
        var emptyArray = {
            0: ''
        };
        if (arguments.length != 2 || typeof arguments[0] == 'undefined' || typeof arguments[1] == 'undefined') return null;
        if (delimiter === '' || delimiter === false || delimiter === null) return false;
        if (typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object') return emptyArray;
        if (delimiter === true) delimiter = '1';
        return string.toString().split(delimiter.toString());
    }

    function viewreplay(id) {
        var data = "/replay/load/" + id + "/";
        var dx = '';
        $.ajax({
            async: false,
            url: data,
            cache: false,
            success: function(responce) {
                dx = responce;
            }
        });

        var gd = explode('|', dx);
        var pf = gd[1];
        var gs = gd[2];
        var ms = gd[3];
        var ds = gd[4];
        Game.replayplayer = gd[5];

        var pf1 = explode(',', pf);
        var fr = '';
        var fr1 = '';
        for (var i = 0; i < Game.row; i++) {
            fr = convertBase.hex2bin(pf1[i]);
            fr1 = fr;
            for (var j = 0; j < 14 - fr.length; j++) fr1 = '0' + fr1;
            for (var j = 0; j < fr1.length; j++) Game.gameBoard.cells[i][j] = Number(fr1.charAt(j));
        };
        Game.GB = Game.gameBoard;
        Game.gameset = explode(',', gs);
        Game.moves = explode(',', ms);
        Game.delays = explode(',', ds);
        Game.drawGameMap();
        Game.gameBoard.drawGameBoard();
        $('#resultinfo').css('display', 'none');
        //			startreplay();
    };

    function replaymove(c) {
        if (c >= Game.moves.length) {
            clearInterval(timerreplay);
            Game.current.storeGameBoardData();
            Game.current.processGameRow();
            Game.current = new Game.Block();
            Game.current.init();
            Game.gameBoard.drawGameBoard();
            Game.score = '-1';
            Game.replay = false;
        } else {
            var ac = Game.moves[c];
            Game.delay = Game.delays[c];
            Game.playtime += Number(Game.delay);
            //						if (Game.delay == 0) Game.delay = 1;
            Game.playtime = Game.playtime;

            Game.pt = Game.playtime / 1000;
            Game.pt = Game.pt.toFixed(3);
            $("#gameTime").text(Game.pt);
            $("#shapes").text(Game.shapes);

            if (ac == 'n') // new block
            {
                Game.current.storeGameBoardData();
                Game.current.processGameRow();
                Game.current = new Game.Block();
                Game.current.init();
                Game.gameBoard.drawGameBoard();
            } else if (ac == 'f')
                Game.current.moveDown();
            else if (ac == 'l')
                Game.current.moveLeft();
            else if (ac == 'r')
                Game.current.moveRight();
            else if (ac == 'e')
                Game.current.exchange();
            else if (ac == 's')
                Game.current.rotate();
            else if (ac == 'm')
                Game.current.mirror();
        };
    }


    function startreplay() {
        Game.gameBoard = Game.GB;
        Game.drawGameMap();
        Game.gameBoard.drawGameBoard();
        Game.action = 0;
        Game.dmoves = '';
        Game.shapes = 0;
        Game.shape = 0;
        var finish = 0;
        var ac = '';
        dt = new Date();
        Game.next = Game.gameset[Game.shape];
        Game.current = new Game.Block();
        Game.current.init();
        $("#xinfo").append(Game.moves.length);
        Game.score = 0;
        Game.lines = 0;
        var c = 0;
        Game.delay = 150;
        Game.playtime = 0;
        Game.pt = 0;
        Game.lastline = 0;
        $("#replayinfo").html('PLAYBACK!<BR>Player: ' + Game.replayplayer + ' actions: ' + Game.moves.length);
        /*			
        			window.timerreplay = window.setInterval(function()
        			{
        				c++;
        				replaymove(c);
        			},25);
        */
        c = 1;
        var tm = 7;
        var timer1 = 0;
        Game.delay = Game.delays[c];
        window.timerreplay = window.setInterval(function() {
            //				c++;
            //				timer1 = timer1+tm*13.3;
            timer1 = timer1 + tm * 2;
            //				$('#xinfo').html('c: '+c+' t: '+timer1+' d: '+Game.delay+'<br>');
            if (timer1 >= Game.delay) {
                replaymove(c);
                c++;
                Game.delay = Game.delays[c];
                if (!Game.delay) Game.delay = 0;

                while (Game.delay == 0) {
                    replaymove(c);
                    c++;
                    Game.delay = Game.delays[c];
                    if (!Game.delay) Game.delay = 0;
                };
                timer1 = 0;
                if (c > 20)
                    $('#xinfo').html('c: ' + c + ' t: ' + timer1 + ' d: ' + Game.delay + '<br>');
            };
            if (c > Game.moves.length) {
                Game.current.storeGameBoardData();
                Game.current.processGameRow();
                Game.gameBoard.drawGameBoard();
                clearInterval(timerreplay);
            };

        }, tm);



    };

    function stopreplay() {
        //			alert('stopreplay');
        clearInterval(timerreplay);
        Game.score = '-1';
        Game.replay = false;
    };

    Game.drawGameMap();
    Game.score = -1;

    var keyState = {};
    document.addEventListener('keydown', function(e) {
        keyState[e.code] = "down";
    }, true);

    document.addEventListener('keyup', function(e) {
        keyState[e.code] = "up";
    }, true);


    $(document).keydown(function(e) {
        //			alert(e.keyCode);
        try {
            if (e.keyCode == 27) //esc
            {
                if (Game.replay) stopreplay();
                else
                if (Game.score != -1) finishGame();
            }
            if (e.keyCode == 13) //enter
            {
                if (Game.replay) {
                    stopreplay();
                    Game.replay = false;
                    newgame();
                } else
                if (Game.score == -1) newgame();
            }

            if (!Game.replay) {
                if (e.keyCode == 49 || e.keyCode == 65 || e.keyCode == 81) //1 mirror
                {
                    if (Game.score != -1) {
                        //Game.nextleft = 0; Game.nextright = 0; Game.delayleft = Game.nd; Game.delayright = Game.nd;
                        Game.moved = 1;
                        Game.current.mirror();
                    };
                }

                if (e.keyCode == 50 || e.keyCode == 83 || e.keyCode == 87) // 2 exchage
                {
                    if (Game.score != -1) {
                        //						Game.nextleft = 0; Game.nextright = 0; Game.delayleft = Game.nd; Game.delayright = Game.nd;
                        Game.moved = 1;
                        Game.current.exchange();
                    };
                }

                if ((e.keyCode == 32 || e.keyCode == 68) && Game.score != -1) //space
                {
                    if (Game.score != -1) {
                        while (Game.current.isAvail(1, 0)) {
                            Game.current.moveDown();
                        }
                        Game.current.storeGameBoardData();
                        Game.current.processGameRow();
                        Game.current = new Game.Block();
                        Game.current.init();
                        // record game
                        var delay = dt.getTime() - Game.start;
                        Game.action++;
                        Game.delays[Game.action] = delay;
                        Game.moves[Game.action] = 'n';

                    };
                }
                if (e.keyCode == 35) //енд
                {
                    if (Game.score != -1) {
                        while (Game.current.isAvail(1, 0)) Game.current.moveDown();
                        Game.current.moveLeft();
                    };
                }

                if (e.keyCode == 34) //енд
                {
                    if (Game.score != -1) {
                        while (Game.current.isAvail(1, 0)) Game.current.moveDown();
                        Game.current.moveRight();
                    }
                }


                if (e.keyCode == 38 || e.keyCode == 12) //space
                {
                    if (Game.score == -1) {
                        if (Game.row - Game.fill > 10) {
                            Game.fill++;
                            $("#fill").html(Game.fill);

                            Game.gameBoard.resetGameBoard(Game.fill);
                            Game.gameBoard.drawGameBoard();
                        };
                    } else {
                        //						Game.nextleft = 0; Game.nextright = 0; Game.delayleft = Game.nd; Game.delayright = Game.nd;
                        Game.moved = 1;

                        Game.current.rotate();
                    };
                }


                if (Game.score == -1 && e.keyCode == 109) {
                    if (Game.level > 1) Game.level--;
                    $("#level").html(Game.level);
                };

                if (Game.score == -1 && e.keyCode == 107) {
                    if (Game.level < 20) Game.level++;
                    $("#level").html(Game.level);
                };


                /*
                				if (e.keyCode == 1137 || e.keyCode == 1136) //left
                				{
                					Game.current.moveLeft();
                				}
                				if (e.keyCode == 1139 || e.keyCode == 1133) //Right
                				{
                					Game.current.moveRight();
                				}
                */
                if (e.keyCode == 40) //Down
                {
                    if (Game.score == -1) {
                        if (Game.fill > 0) {
                            Game.fill--;
                            $("#fill").html(Game.fill);

                            Game.gameBoard.resetGameBoard(Game.fill);
                            Game.gameBoard.drawGameBoard();
                        };
                    } else {
                        if (Game.current.isAvail(1, 0)) {
                            Game.current.moveDown();
                        } else if (!Game.current.isOrigin()) {
                            Game.clearOldDrawing();
                            Game.current.storeGameBoardData();
                            Game.current.processGameRow();
                            Game.current = new Game.Block();
                            Game.current.init();
                            // record game
                            var delay = dt.getTime() - Game.start;
                            Game.action++;
                            Game.delays[Game.action] = delay;
                            Game.moves[Game.action] = 'n';

                        } else {
                            //						alert("123 Game over, please refresh the page to start new game");
                            finishGame();
                        }
                    };
                };
            }
        } catch (e) {
            //alert("456 Game is over,Please refresh to start new game ");

        }
    });

    var myMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (myMobile.Android() ||
                myMobile.BlackBerry() ||
                myMobile.iOS() ||
                myMobile.Opera() ||
                myMobile.Windows());
        }
    };

    if (myMobile.any()) {
        // 		var Game.mobile = true;
    };

    Game.fill = $_GET["fill"];
    Game.level = $_GET["level"];
    $("#level").html(Game.level);
    $("#fill").html(Game.fill);

    Game.hash = $_GET["hash"];

    var id = $_GET["id"];
    if (id) {
        Game.replay = true;
        viewreplay(id);
        startreplay();
    };
});