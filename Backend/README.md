
# XO Game - Backend

This is the XO Game Backend built with Node.js, Express, and Docker, with MySQL as the database.



## Tech Stack

**Backend:** Node, Express, Docker

**Database:** MySQL


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
```bash
DB_HOST= "localhost"
DB_USER= "root"
DB_PASS= "password"
DATABASE= "db"
PORT = 8080

```

## Run Locally

After you come to backend directory

Install dependencies

```bash
  npm install
```
Then you need to open Docker Desktop and continue

Create container for database
```bash
  docker-compose up -d
```
Start the project

```bash
  npm start
```


## Design

In the Replay table, it consists of the following columns

- id(number) -> It's the ID for each history, and it's the primary key.

- replay(text) -> It's a string that contains characters arranged in an array format, alternating between the moves of the two players, making it easy to convert back into an array.

- winner(varchar(255)) -> It's a string that stores the playback results.

- winHis(text) -> Store the positions where the winner has marked. Identify the rows, columns, or diagonals that indicate a win.

## API Reference

#### Get all replay

```http
  GET `${DB_HOST}:${PORT}/replays`
```
#### Create a replay

```http
  POST `${DB_HOST}:${PORT}/replays`
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `replay` | `string` |  String that contains characters arranged in an array format of player's move |
| `winner` | `string` | String that stores the playback results |
| `winHis` | `string` | String that contains characters arranged in an array format of the positions where the winner has marked. |

#### Delete replay

```http
  DELETE `${DB_HOST}:${PORT}/replays/${id}`
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------------------------  |
| `id`      | `string` | **Required**. Id of item to delete |


