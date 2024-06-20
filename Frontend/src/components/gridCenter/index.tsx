import { Box, Typography, Button } from "@mui/material";
import {
  clickBox,
  prevIndex,
  nextIndex,
  newGame,
  fetchData,
} from "../../redux/slices/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { useState } from "react";

export default function GridCenter() {
  const [disabledSave,setDisabled] = useState(false);
  
  const dispatch = useAppDispatch();
  const numRowsCols = useAppSelector((state) => state.board.numRowsCols);
  const array = useAppSelector((state) => state.board.boxArray);
  const turn = useAppSelector((state) => state.board.turn);
  const winner = useAppSelector((state) => state.board.winner);
  const winHis = useAppSelector((state) => state.board.winHis);
  const selectedReplay = useAppSelector((state) => state.board.selectedReplay);
  const replayIndex = useAppSelector((state) => state.board.replayIndex);
  const replay = useAppSelector((state) => state.board.replay)
  const getBackgroundColor = (rowIndex: number, colIndex: number): string => {
    if (
      winner &&
      winHis.some((item: any) => item[0] === rowIndex && item[1] === colIndex)
    ) {
      if (winner === "x") {
        return "#0055B2";
      } else if (winner === "o") {
        return "red";
      } else {
        return "white";
      }
    } else if (
      selectedReplay &&
      replayIndex === JSON.parse(selectedReplay.replay).length &&
      JSON.parse(selectedReplay.winHis).some(
        (item: any) => item[0] === rowIndex && item[1] === colIndex
      )
    ) {
      if (selectedReplay.winner === "x") {
        return "#0055B2";
      } else if (selectedReplay.winner === "o") {
        return "red";
      } else {
        return "white";
      }
    } else {
      return "white";
    }
  };

  const handleSave = () =>{
    
    const saveReplay = {
      replay: replay,
      winner: winner,
      winHis: winHis,
    }
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_ENDPOINT}/replay`,
      data: saveReplay,
      
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        dispatch(fetchData())
        setDisabled(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "80%",
          }}
        >
          {numRowsCols &&
          numRowsCols !== 0 &&
          numRowsCols % 2 === 1 &&
          numRowsCols > 1
            ? numRowsCols &&
              Array.from({ length: numRowsCols }).map(
                (_, rowIndex) =>
                  numRowsCols &&
                  Array.from({ length: numRowsCols }).map((_, colIndex) => {
                    return (
                      <Box
                        key={`${rowIndex},${colIndex}`}
                        sx={{
                          ":hover": {
                            bgcolor:
                              winner || selectedReplay
                                ? ""
                                : turn === 1
                                ? "#0055B2"
                                : "red",
                          },

                          bgcolor: getBackgroundColor(rowIndex, colIndex),
                          width: `calc(100% / ${numRowsCols})`,
                          height: `calc(80vh / ${numRowsCols})`,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid black",
                          boxSizing: "border-box",
                        }}
                        onClick={() => {
                          if (!winner && !selectedReplay) {
                            dispatch(clickBox([rowIndex, colIndex]));
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: `${20 / numRowsCols!}vw`,
                            alignItems: "center",
                          }}
                        >
                          {array?.[rowIndex]?.[colIndex] === 0
                            ? ""
                            : array?.[rowIndex]?.[colIndex]}
                        </Typography>
                      </Box>
                    );
                  })
              )
            : null}
        </Box>
      </Box>
      {selectedReplay ? (
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              dispatch(prevIndex());
            }}
          >
            {"<<"}
          </Button>
          <Typography>{`Turn ${replayIndex} / ${
            JSON.parse(selectedReplay.replay).length
          }`}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(nextIndex());
            }}
          >
            {">>"}
          </Button>
        </Box>
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: winner && winner ? "space-around" : "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {dispatch(newGame());setDisabled(false)}}
          sx={{ mt: 1, textTransform: "none" }}
        >
          New Game
        </Button>
        {winner && winner ? (
          <Button
            disabled={disabledSave}
            variant="contained"
            onClick={handleSave}
            sx={{ mt: 1, textTransform: "none" }}
            color="error"
          >
            Save Replay
          </Button>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
