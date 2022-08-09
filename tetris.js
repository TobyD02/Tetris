
function get_random_type() {

    let choice_len = Object.keys(types).length
    let choice = Math.floor(Math.random() * choice_len)

    for (let i = 0; i < Object.keys(types).length; i++) {
        if (i == choice) {
            return(types[Object.keys(types)[i]])
        }
    }
}


class Tetris {
    constructor(x, y, size, type = null) {
        this.x = x
        this.y = y
        if (type != null) this.type = types[type]
        else this.type = get_random_type()
        this.size = size
        this.rotation = 0
        this.active = true

    }

    get_height() {
        return this.type.shape.length
    }

    get_width() {
        return this.type.shape[0].length
    }

    check_position(board, dir = 0) {

        this.active = true
        if (this.y + this.get_height() > Height)
            this.y = Height - this.get_height()

        if (this.x + this.get_width() > Width)
            this.x = Width - this.get_width()

        if (this.x < 0)
            this.x = 0

        if (this.y + this.get_height() == Height)
            this.active = false

        // Check can move down
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (y >= this.y && y <= this.y + this.get_height() - 1 && x >= this.x && x <= this.x + this.get_width() - 1) { 
                    if (board[y+1]) {
                        if (board[y + 1][x] == '1' && this.type.shape[y - this.y][x - this.x] == '1') this.active = false
                    }
                }
            }
        }

        return true
    }

    draw(ctx, board) {
        ctx.lineWidth=1
        ctx.fillStyle=this.type.color
        ctx.strokeStyle='black'
        for (let col = 0; col < this.type.shape.length; col ++) {
            for (let row = 0; row < this.type.shape[col].length; row ++) {
                if (this.type.shape[col][row] == '0') continue
                ctx.fillRect((this.x + row) * this.size, (this.y + col) * this.size, this.size, this.size)
                ctx.strokeRect((this.x + row) * this.size, (this.y + col) * this.size, this.size, this.size)
            }
        }

        this.check_position(board)
    }

    update(board) {
        if (this.active)
            this.y ++
    }

    move(dir) {

        let can = true
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (y >= this.y && y <= this.y + this.get_height() - 1 && x >= this.x && x <= this.x + this.get_width() - 1) { 
                    if (board[y+1]) {
                        if (board[y][x + dir] == '1' && this.type.shape[y - this.y][x - this.x] == '1') can = false
                    }
                }
            }
        }
        if (can) this.x += dir
    }

    rotate(board, clockwise = true) {

        let new_shape = []
        
        let s = this.type.shape
        for (let row = 0; row < s[0].length; row ++) {
            let new_row = []
            for (let col = 0; col < s.length; col ++) {
                if (!clockwise)
                    new_row.push(s[col][s[0].length - 1 -row])
                else 
                    new_row.push(s[s.length - 1 - col][row])
            }
            new_shape.push(new_row)
        }

        let clear_space = null
        // Clear empty space
        for (let col = new_shape.length-1; col >= 0; col--) {
            if (col == new_shape.length - 1 && new_shape[col].indexOf('1') < 0) {
                // Empty space has been found at the bottom
                clear_space = new_shape.pop()
            }
            if (clear_space != null && col == 0) {
                new_shape.unshift(clear_space)
            }
        }


        // If rotation = no conflicts

        let can_rotate = true
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (y >= this.y && y <= this.y + new_shape.length - 1 && x >= this.x && x <= this.x + new_shape[0].length - 1) { 
                    if (board[y][x]) {
                        if (board[y][x] == '1' && new_shape[y - this.y][x - this.x] == '1') can_rotate = false
                    }
                }
            }
        }

        if (can_rotate){
            this.type.shape = new_shape
            this.check_position(board)
        }
    }
}