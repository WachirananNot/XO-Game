const queryDB = require("../config/db");
class ReplayModel {
  async getAllReplay() {
    let sql = "SELECT * FROM `replays`";
    try {
      let result = await queryDB(sql, undefined);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async createReplay(replay, winner, winHis) {
    let sql =
      "INSERT INTO replays (replay, winner, winHis) VALUES (?,?,?)";
    try {
      await queryDB(sql, [replay, winner, winHis]);
      let msg = { message: "created replay successfully." };
      return msg;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async deleteReplay(id) {
    let sql = "DELETE FROM replays WHERE id =?";
    try {
      const result = await queryDB(sql, [id]);
      if (result.affectedRows === 0) {
        let msg = { message: "no data found" };
        return msg;
      }
      let msg = { message: "deleted replay successfully." };
      return msg;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
module.exports = ReplayModel;
