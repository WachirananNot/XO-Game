import { Typography, Box, TextField } from "@mui/material";
import { resize } from "../../redux/slices/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function GridLeft(){
  const dispatch = useAppDispatch();
  const numRowsCols = useAppSelector((state) => state.board.numRowsCols);
  const turn = useAppSelector((state) => state.board.turn);
  const winner = useAppSelector((state) => state.board.winner);
  const selectedReplay = useAppSelector((state) => state.board.selectedReplay);
  return <>
  <Typography>Size : AxA</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>A = </Typography>
            <TextField
              disabled={selectedReplay ? true : false}
              value={numRowsCols || null}
              size="small"
              onChange={(e: any) => dispatch(resize(parseInt(e.target.value)))}
              sx={{ bgcolor: "white", ml: 1, width: "80%" }}
            />
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              mt: 5,
              color:
                winner === "draw" ? "black" : turn !== 1 ? "#0055B2" : "red",
              fontSize: "24px",
            }}
          >
            {winner && winner !== "draw"
              ? `${winner.toUpperCase()} is the winner!`
              : winner === "draw"
              ? "Draw!"
              : ""}
          </Typography>
  </>
}