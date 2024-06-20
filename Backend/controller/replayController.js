const replayDMC = require("../model/replay")
class ReplayController{
  constructor(){
    this.replayDMC = new replayDMC()
  }
  async getAllReplay(req, res) {
    let result = await this.replayDMC.getAllReplay();
    if (result instanceof Error) {
      res.send(result, 500);
      return;
    } else if (result.length === 0) {
      res.send({ msg: "no data found" ,values: []}, 200);
      return;
    } else {
      res.send({ msg: "no data found",values: result}, 200);
      return;
    }
  }
  async createReplay(req,res){
    let replay = JSON.stringify(req.body.replay);
    let winner = req.body.winner;
    let winHis = JSON.stringify(req.body.winHis);
    try {
      let response = await this.replayDMC.createReplay(
        replay,winner,winHis
      );
      if (response instanceof Error) {
        res.send(response, 500);
        return;
      } else {
        res.status(200).send(response);
        return;
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
      return;
    }
  }
  async deleteReplay(req,res){
    let id = req.params.id;
    try {
      let response = await this.replayDMC.deleteReplay(id);
      if (response instanceof Error) {
        res.send(response, 500);
        return;
      } 
      else {
        res.status(200).send(response);
        return;
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
      return;
    }
  }
}
module.exports = ReplayController;