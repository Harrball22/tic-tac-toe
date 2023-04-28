// Created By: Harrison Dutson 
// 4/18/2023
//
// Runs the backend for a tic-tac-toe game

let ticTacToeButtons = document.querySelectorAll(".tic-tac-toe-button")
let messageText = document.getElementById("message")
let resetButton = document.getElementById("reset-button")

for(let i = 0; i < ticTacToeButtons.length; i++){
    ticTacToeButtons[i].addEventListener("click", ticTacToeButtonPressed)
}

resetButton.addEventListener("click", resetGame)

let positions = [["", "", ""], ["", "", ""], ["", "", ""]] // A 3 x 3 array for the tic-tac-toe board
let playerPieces = ["", "x", "o"]
let turnNumber = 1
let playerTurn = 1 // Which player's turn it is
let gameOver = false // If the game has ended

function ticTacToeButtonPressed(event){
    if (gameOver){ // If the game has ended
        return // Do not do anything
    }

    let posX = Number(event.target.getAttribute("grid-pos-x"))
    let posY = Number(event.target.getAttribute("grid-pos-y"))
    console.log(`posX: ${posX}, posY: ${posY}`)
    
    if (positions[posX][posY] === ""){
        event.target.textContent = playerPieces[playerTurn]
        placePiece(posX, posY)
    } else {
        console.log("That space has already been taken")
    }
}

// Set the value of position x y to the given player's piece

function placePiece(posX, posY){ 
    positions[posX][posY] = playerPieces[playerTurn] // Place a piece
    console.log(`${positions[0][2]} | ${positions[1][2]} | ${positions[2][2]} \n${positions[0][1]} | ${positions[1][1]} | ${positions[2][1]} \n${positions[0][0]} | ${positions[1][0]} | ${positions[2][0]}`)
    endTurn() // End the turn
}

// Check if there is three in a row of any symbol
function checkForGameEnd(){
    console.log("turn number: " + turnNumber)
    // If there are three in a row in any of these configurations, a player has won
    // The position coorinates are x then y
    // Top row
    if (positions[0][2] === positions[1][2] && positions[0][2] === positions[2][2] && positions[0][2] !== "" /*positions[0[2]] === positions[1[2]] === positions[2[2]] !== ""*/){
        declareWinner(positions[0][2]) // Pass the symbol to declareWinner
    }
    // Middle row
    else if (positions[0][1] === positions[1][1] && positions[0][1] === positions[2][1] && positions[0][1] !== ""){
        declareWinner(positions[0][1]) // Pass the symbol to declareWinner
    }
    // Bottem row
    else if (positions[0][0] === positions[1][0] && positions[0][0] === positions[2][0] && positions[0][0] !== ""){
        declareWinner(positions[0][0]) // Pass the symbol to declareWinner
    }
    // Left column
    else if (positions[0][0] === positions[0][1] && positions[0][0] === positions[0][2] && positions[0][0] !== ""){
        declareWinner(positions[0][0]) // Pass the symbol to declareWinner
    }
    // Center column
    else if (positions[1][0] === positions[1][1] && positions[1][0] === positions[1][2] && positions[1][0] !== ""){
        declareWinner(positions[1][0]) // Pass the symbol to declareWinner
    }
    // Right column
    else if (positions[2][0] === positions[2][1] && positions[2][0] === positions[2][2] && positions[2][0] !== ""){
        declareWinner(positions[2][0]) // Pass the symbol to declareWinner
    }
    // Top left to bottem right
    else if (positions[0][2] === positions[1][1] && positions[0][2] === positions[2][0] && positions[0][2] !== ""){
        declareWinner(positions[0][2]) // Pass the symbol to declareWinner
    }
    // Bottem left to to top right
    else if (positions[0][0] === positions[1][1] && positions[0][0] === positions[2][2] && positions[0][0] !== ""){
        declareWinner(positions[0][0]) // Pass the symbol to declareWinner
    }
    
    // Stale Mate
    else if (turnNumber === 9){
        declareDraw()
    }
}

function endTurn(){
    if (playerTurn === 1){ // Switch who's turn it is and display it in the message text
        playerTurn = 2
    } else {
        playerTurn = 1
    }

    messageText.textContent = `Player ${playerPieces[playerTurn].toUpperCase()}'s turn`

    checkForGameEnd()
    console.log("")
    
    turnNumber++ // Increase the turn number
}

// Ends the game 
function declareWinner(player){
    gameOver = true
    messageText.textContent = `Player ${player.toUpperCase()} wins!`
    console.log(`Player ${player} wins!`)
}

function declareDraw(){
    gameOver = true
    messageText.textContent = "Draw"
    console.log("Draw")
}

function resetGame(){
    for(i = 0; i < ticTacToeButtons.length; i++){
        ticTacToeButtons[i].textContent = ""
        positions[ticTacToeButtons[i].getAttribute("grid-pos-x")][ticTacToeButtons[i].getAttribute("grid-pos-y")] = ""
    }

    gameOver = false
    turnNumber = 1
    messageText.textContent = `Click to place a peice. ${playerPieces[playerTurn].toUpperCase()}'s turn.`
    console.log("Game Reset")
}

