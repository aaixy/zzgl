(function() {
    Game_Player.prototype.isMoveDiagonally = function(direction) {
        var dir8 = [1, 3, 7, 9];

        return dir8.some(function(dir) {
            return dir === direction;
        }, this);
    };

    Game_Player.prototype.isMoveStraight = function(direction) {
        var dir4 = [2, 4, 6, 8];

        return dir4.some(function(dir) {
            return dir === direction;
        }, this);
    };

    Game_Player.prototype.getDiagonallyMovement = function(direction) {
        var horz = 0,
            vert = 0;

        if (direction === 1) {
            horz = 4;
            vert = 2;
        } else if (direction === 3) {
            horz = 6;
            vert = 2;
        } else if (direction === 7) {
            horz = 4;
            vert = 8;
        } else if (direction === 9) {
            horz = 6;
            vert = 8;
        }

        return [horz, vert];
    };

    Game_Player.prototype.processMoveByInput = function(direction) {
        var diagonal = this.getDiagonallyMovement(direction);

        if (this.isMoveStraight(direction)) {
            this.moveStraight(direction);
        } else if (this.isMoveDiagonally(direction)) {
            this.moveDiagonally.apply(this, diagonal);
        }
    };

    Game_Player.prototype.moveByInput = function() {
        if (!this.isMoving() && this.canMove()) {
            var direction = Input.dir8;

            if (direction > 0) {
                $gameTemp.clearDestination();
            } else if ($gameTemp.isDestinationValid()){
                var x = $gameTemp.destinationX();
                var y = $gameTemp.destinationY();
                direction = this.findDirectionTo(x, y);
            }

            if (direction > 0) {
                this.processMoveByInput(direction);
            }
        }
    };
}());
