'use strict';
const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const User = require('../models/user');
const moment = require('moment-timezone');

/* GET home page. */
router.get('/', (req, res, next) => {
  const title = '予定調整くんmod'
  if (req.user) {
    Schedule.findAll({
      where: {
        createdBy: req.user.id
      },
      order: [['"updatedAt"', 'DESC']]
    }).then((schedules) => {
      schedules.forEach((schedule)=>{
        schedule.formattedUpdatedAt = moment(schedule.updatedAt).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm');
      });
      Schedule.findAll({
        include: [{
          model: User,
          attributes: ["userId", "username"]
        }],
        where: {
          openFlag: true
        },
        order: [['"updatedAt"', 'DESC']]
      }).then((openSchedules) => {
        const userName = req.user.username || req.user.name.givenName || req.user.name.familyName;
        openSchedules.forEach((schedule)=>{
          schedule.formattedUpdatedAt = moment(schedule.updatedAt).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm');
        });
        res.render('index', {
          title: title,
          user: req.user,
          userName: userName,
          schedules: schedules,
          openSchedules: openSchedules
        });
      });
    });
  } else {
    res.render('index', { title: title, user: req.user });
  }
});

module.exports = router;
