/*
    TODO:
        - Keep track of current block
        - Keep track of cemented blocks
        - Function that takes a block and integrates it into the cemented blocks
            - A new block should then be instantiated
*/

let tick = 0
let total_score = 0
let current_board_height = Height
let fill_color = 'rgb(0, 255, 0)'
let running = true

let board = Array(Height).fill(Array(Width).fill('0'))

canvas.width = cellSize * Width
canvas.height = cellSize * Height

let update_frame = true


let c = new Tetris(Width / 2, 0, cellSize)

function draw() {
    
    ctx.fillStyle='black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    if (running) {
        c.draw(ctx, board)
        
        // Fill Spaces
        for (let col = 0; col < board.length; col++) {
            for (let row = 0; row < board[col].length; row ++ ) {
                if (board[col][row] == '1'){
                    ctx.lineWidth=1
                    ctx.strokeStyle='rgba(100, 100, 100, 1)'
                    ctx.fillStyle=get_new_fill(col)
                    ctx.fillRect(row * cellSize, col*cellSize, cellSize, cellSize)
                    ctx.strokeRect(row * cellSize, col*cellSize, cellSize, cellSize)
                } else {
                    ctx.strokeStyle = 'rgba(200, 200, 200, .2)'
                    ctx.lineWidth=0.2
                    ctx.strokeRect(row * cellSize, col*cellSize, cellSize, cellSize)
                }
                
            }
        }
    
        tick --
        if (tick <= 0) {
            tick = tickMax
            update_frame = true
        } else {
            update_frame = false
        }
    
        if(update_frame) {
            if (c.active)
                c.update(board)    
            else {
                addToBoard(c)
                check_board()
            }
        }
    } else {
        ctx.textAlign='center'
        ctx.fillStyle='Red'
        ctx.font = '50px Arial'
        ctx.fillText('Game Over', canvas.width / 2, canvas.height/2)
    }
    requestAnimationFrame(draw)
}

function addToBoard(piece) {

    for (let y = 0; y < board.length; y++) {
        let row = []
        for (let x = 0; x < board[y].length; x++) {
            if (y >= piece.y && y <= piece.y + piece.get_height() - 1 && x >= piece.x && x <= piece.x + piece.get_width() - 1){
                if (piece.type.shape[y - piece.y][x - piece.x] == '1') row[x] = piece.type.shape[y - piece.y][x - piece.x]
                else row[x] = board[y][x]
            } else {
                row[x] = board[y][x]
            }
        }
        board[y] = row
    }

    // console.log(board)
    fill_color = get_new_fill()
    c = new Tetris(Width / 2, 0, cellSize)
}

function check_board() {

    let line_clear_count = 0

    let height_found = false

    for (let row = 0; row < board.length; row++) {
        let full = true
        let empty = true
        for (let i = 0; i < board[row].length; i++) {
            if (board[row][i] != '1') full = false
            if (board[row][i] != '0') {
                if (row == 0) running = false
                if (!height_found) {
                    current_board_height = row
                    height_found = true
                }
            }
        }
        // Remove row and fill board at the top
        if (full) {
            line_clear_count ++
            board.splice(row,1)
            board.unshift(Array(Width).fill('0'))

        }
    }

    score(line_clear_count)

}

function score(line_clears) {
    if (line_clears == 4) total_score += 800
    else total_score += line_clears * 100

    score_div.innerHTML = `Score: ${total_score}`
}

function get_new_fill(h = current_board_height) {
    let mapped_val = h / Height * 200
    return `rgba(${255 - mapped_val}, ${mapped_val}, 60, 0.8)`
}

draw()

window.addEventListener('keydown', (e) => {

    switch(e.code) {
        case 'ArrowLeft':
            c.move(-1)
            break;

        case 'ArrowRight':
            c.move(1)
            break;

        case 'Space':
            c.rotate(board)
            break;
            
        }
})