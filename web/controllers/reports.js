const express = require('express');

const router = express.Router();
const Report = require('../models/Report');

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  Report.find(limit, offset).then((reports) => {
    if (!reports || !reports.length) {
      res.status(404).json(`No reports found.`);
    } else {
      res.json(reports);
    }
  });
});

router.post('/', (req, res) => {
  const { title, start_date, end_date, sensitivity, user_id, sensors } = req.body;
  console.log(req.body)

  Report.create(title, start_date, end_date, sensitivity, user_id, sensors).then((report) => {
    res.json(report);
  }).catch((err)=>{
    res.status(404).json(err)
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Report.findOne(id).then((report) => {
    if (!report) {
      res.status(404).json(`Report ${id} is not found.`);
    } else {
      res.json(report);
    }
  });
});

module.exports = router;
