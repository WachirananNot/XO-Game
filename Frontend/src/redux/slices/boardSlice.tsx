import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST } from "../../components/variables";

function checkWinner(
  boxArray: any[],
  rowIndex: number,
  columnIndex: number
): [string | null, any] {
  let rowWinner = true;
  let colWinner = true;
  let leftToRight = true;
  let rightToLeft = true;
  const currentTurn = boxArray[rowIndex][columnIndex];
  let winHis: { row: any[]; col: any[]; left: any[]; right: any[] } = {
    row: [],
    col: [],
    left: [],
    right: [],
  };

  //check row
  for (let i = 0; i < boxArray[rowIndex].length; i++) {
    if (boxArray[rowIndex][i] !== currentTurn) {
      rowWinner = false;
      winHis.row = [];
      break;
    } else {
      winHis.row.push([rowIndex, i]);
    }
  }

  //check col
  for (let i = 0; i < boxArray.length; i++) {
    if (boxArray[i][columnIndex] !== currentTurn) {
      colWinner = false;
      winHis.col = [];
      break;
    } else {
      winHis.col.push([i, columnIndex]);
    }
  }

  //top-left to bottom-right
  if (rowIndex === columnIndex) {
    for (let i = 0; i < boxArray.length; i++) {
      if (boxArray[i][i] !== currentTurn) {
        leftToRight = false;
        winHis.left = [];
        break;
      } else {
        winHis.left.push([i, i]);
      }
    }
  } else {
    leftToRight = false;
    winHis.left = [];
  }

  //top-right to bottom-left
  if (rowIndex + columnIndex === boxArray.length - 1) {
    for (let i = 0; i < boxArray.length; i++) {
      if (boxArray[i][boxArray.length - 1 - i] !== currentTurn) {
        rightToLeft = false;
        winHis.right = [];
        break;
      } else {
        winHis.right.push([i, boxArray.length - 1 - i]);
      }
    }
  } else {
    rightToLeft = false;
    winHis.right = [];
  }

  if (rowWinner) {
    return [currentTurn, winHis.row];
  } else if (colWinner) {
    return [currentTurn, winHis.col];
  } else if (leftToRight) {
    return [currentTurn, winHis.left];
  } else if (rightToLeft) {
    return [currentTurn, winHis.right];
  } else {
    let draw = Array(boxArray.length).fill(0);
    for (let i = 0; i < boxArray.length; i++) {
      if (boxArray[i].indexOf(0) === -1) {
        draw[i] = -1;
      }
    }
    if (draw.filter((x) => x === -1).length === boxArray.length) {
      return ["draw", []];
    } else {
      return ["", null];
    }
  }
}
export const fetchData = createAsyncThunk("data/fetch", async () => {
  try {
    const response = await axios.get(
      `${HOST}/replay`,
    );
    return response.data.values;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
interface boardState {
  numRowsCols: number;
  boxArray: any;
  turn: number;
  replay: any;
  winner: string | null;
  winHis: any;
  selectedReplay: any;
  replayIndex: number;
  replayArray:any
}

const initialState: boardState = {
  turn: 1,
  numRowsCols: 3,
  boxArray: Array(3)
    .fill(null)
    .map(() => Array(3).fill(0)),
  replay: [],
  winner: null,
  winHis: [],
  selectedReplay: null,
  replayIndex: 0,
  replayArray:[]
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    nextIndex: (state) => {
      if (
        state.replayIndex + 1 <=
        JSON.parse(state.selectedReplay.replay).length
      ) {
        state.replayIndex++;
        const replayArray = JSON.parse(state.selectedReplay.replay);
        const currentMove = replayArray[state.replayIndex - 1];

        if (currentMove) {
          const rowIndex = currentMove[0];
          const columnIndex = currentMove[1];

          if (!state.boxArray[rowIndex]) {
            state.boxArray[rowIndex] = [];
          }

          if (state.replayIndex % 2 === 0) {
            state.boxArray[rowIndex][columnIndex] = "o";
          } else {
            state.boxArray[rowIndex][columnIndex] = "x";
          }
        }
      }
    },
    prevIndex: (state) => {
      if (state.replayIndex !== 0) {
        const replayArray = JSON.parse(state.selectedReplay.replay);
        const currentMove = replayArray[state.replayIndex - 1];

        if (currentMove) {
          const rowIndex = currentMove[0];
          const columnIndex = currentMove[1];
          state.boxArray[rowIndex][columnIndex] = 0;
        }
        state.replayIndex--;
      } else {
        state.replayIndex = 0;
        state.boxArray = [];
      }
    },
    setSelectedReplay: (state, action) => {
      state.selectedReplay = action.payload;
      if (JSON.parse(action.payload.winHis).length === 0) {
        state.numRowsCols = JSON.parse(action.payload.replay).length ** 0.5;
      } else {
        state.numRowsCols = JSON.parse(action.payload.winHis).length;
      }

      state.boxArray = [];
      state.replayIndex = 0;
      state.replay = [];
      state.winHis = [];
      state.winner = "";
    },
    newGame: (state) => {
      if (!state.numRowsCols) {
        state.numRowsCols = 3;
      }
      state.replayIndex = 0;
      state.selectedReplay = null;
      state.turn = 1;
      state.boxArray = Array(state.numRowsCols)
        .fill(null)
        .map(() => Array(state.numRowsCols).fill(0));
      state.replay = [];
      state.winHis = [];
      state.winner = null;
    },
    clickBox: (state, action) => {
      if (state.boxArray[action.payload[0]][action.payload[1]] === 0) {
        if (state.turn === 1) {
          state.boxArray[action.payload[0]][action.payload[1]] = "x";
        } else {
          state.boxArray[action.payload[0]][action.payload[1]] = "o";
        }
        state.replay.push([action.payload[0], action.payload[1]]);
        state.turn === 1 ? (state.turn = 2) : (state.turn = 1);
      }
      const winner = checkWinner(
        current(state.boxArray),
        action.payload[0],
        action.payload[1]
      )[0];

      if (winner) {
        state.winner = winner;
        state.winHis = checkWinner(
          current(state.boxArray),
          action.payload[0],
          action.payload[1]
        )[1];
      }
    },
    resize: (state, action) => {
      state.replay = [];
      state.winHis = [];
      state.numRowsCols = action.payload;
      state.turn = 1;
      state.winner = null;
      if (
        action.payload &&
        action.payload !== 0 &&
        action.payload % 2 === 1 &&
        action.payload > 1
      ) {
        state.boxArray = Array(action.payload)
          .fill(null)
          .map(() => Array(action.payload).fill(0));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {

      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.replayArray = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {

      });
  },
});

export const {
  clickBox,
  resize,
  newGame,
  setSelectedReplay,
  nextIndex,
  prevIndex,
} = boardSlice.actions;
export default boardSlice;
