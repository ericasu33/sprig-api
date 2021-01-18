const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    const query1 = `
      SELECT * 
      FROM timers
    `;

    const query2 = `
      SELECT *
      FROM audio_alerts
    `;

    Promise.all([db.query(query1), db.query(query2)])
      .then(([timersData, audiosData]) => {
        const timers = timersData.rows;
        const audios = audiosData.rows;

        for (const timer of timers) {
          for (const audio of audios) {
            if (timer.shortbr_start_audio_alert_id === audio.id) {
              timer.shortbr_start_audio_alert_id = audio.file_name;
            }

            if (timer.shortbr_end_audio_alert_id === audio.id) {
              timer.shortbr_end_audio_alert_id = audio.file_name;
            }

            if (timer.longbr_start_audio_alert_id === audio.id) {
              timer.longbr_start_audio_alert_id = audio.file_name;
            }
            
            if (timer.longbr_end_audio_alert_id === audio.id) {
              timer.longbr_end_audio_alert_id = audio.file_name;
            }
          }
        }
        console.log(audios);
        res.json(timers);
      });
  });


  return router;

};