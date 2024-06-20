import { Typography, Box, Button } from "@mui/material";
import { fetchData, setSelectedReplay } from "../../redux/slices/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { HOST } from "../variables";
import { Popconfirm } from "antd";
import { useState } from "react";

export default function GridRight() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<any>([]);

  const handleOpen = (index: number) => {
    setOpen((prevOpen: any) => ({
      ...prevOpen,
      [index]: true,
    }));
  };
  const handleClose = (index: number) => {
    setOpen((prevOpen: any) => ({
      ...prevOpen,
      [index]: false,
    }));
  };
  const data = useAppSelector((state) => state.board.replayArray);
  function deleteReplay(id: number, i: number) {
    axios({
      method: "delete",
      url: `${HOST}/replay/${id}`,
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        dispatch(fetchData());
        handleClose(i);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Typography sx={{ fontSize: `40px`, fontWeight: 600 }}>
        Replays
      </Typography>
      <Box
        sx={{
          overflow: "auto",
          maxHeight: 500,
          bgcolor: "white",
          height:  500,
        }}
      >
        {data && data.length !== 0 ? (
          data.map((item: any, i: number) => (
            <Box sx={{ border: 1, bgcolor: "white", py: 1, px: 2 }} key={i}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>
                  {item.winner !== "draw"
                    ? `${i + 1}. Size ${JSON.parse(item.winHis).length}x${
                        JSON.parse(item.winHis).length
                      } ${item.winner.toUpperCase()} win`
                    : `${i + 1}. Size ${
                        JSON.parse(item.replay).length ** 0.5
                      }x${JSON.parse(item.replay).length ** 0.5} Draw`}
                </Typography>
                <Box sx={{ display: "block", width: "30%" }}>
                  <Button
                    variant="contained"
                    sx={{ textTransform: "none", width: "100%" }}
                    onClick={() => {
                      dispatch(setSelectedReplay(item));
                    }}
                  >
                    View
                  </Button>
                  <Popconfirm
                    key={i}
                    title="Delete"
                    description="Are you sure to delete this replay?"
                    open={open[i] || false}
                    onConfirm={() => deleteReplay(item.id, i)}
                    onCancel={() => handleClose(i)}
                    onOpenChange={() => handleClose(i)}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ textTransform: "none", width: "100%", mt: 1 }}
                      onClick={() => {
                        handleOpen(i);
                      }}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              height: "100%",
              display:"flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>No Replay</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
