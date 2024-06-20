
# XO Game - Frontend

This is the XO Game Frontend built with React Typescript, Redux Toolkit, Material UI and Ant design.



## Tech Stack

**Frontend:** React, Redux, Material UI, Ant Design



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
```bash
REACT_APP_API_ENDPOINT = 'http://localhost:8080'

```

## Run Locally

After you come to frontend directory

Install dependencies

```bash
  npm install
```

Start the project

```bash
  npm start
```


## Design

I have designed 1 page on the website as a 3-section grid as follows.

- GridLeft
    - Textfield for entering the board size information. Only odd numbers can be entered.
    - Indicates whose turn it is while playing.
    - Display the game results at the end.

- GridCenter
    - Show the game grid box, which can be pressed if the game is not finished. It will display a table showing the playing history if you choose to view it.
    - There is a button to start a new game under the table. After the game ends, there will be a button to save your playing history. When you click to view the playing history, there will be buttons to navigate forward and backward through the turns.

- GridRight
    - The Play History Box shows the order of playing history, the size of the table, and the winner of each game. It includes buttons to view playing history or delete history.

## Algorithm
- Retrieve the game results Separated into 3 cases.
    - Row -> First, check the latest player's turn. Then, iterate through the row where the player just clicked to determine if there are any different values. If all values in the row are the same, it means that player wins.
    - Column -> After seeing which player just took their turn, the game checks the column where the player placed their mark. It goes through that column to see if all the marks in it are the same. If they are, that player wins.
    - Diagonal -> After seeing which player just played, the game checks the diagonal where that player put their mark. It looks through that diagonal to see if all the marks in it are the same. If they are, that player wins.

- Save game history once the game concludes.
    
    Record the moves of both players in an array during each turn. When the game ends, save the positions where each player won in another array. When the player chooses to save the game history, send both arrays along with the game results to the backend. Convert the arrays to strings and store them in the database.
