const { History, Song } = require('../models')
const _ = require('lodash')

module.exports = {
  async showHistory (req, res) {
    try {
      const userId = req.user.id
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))
      res.send(_.uniqBy(histories, history => history.SongId))
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the history'
      })
    }
  },
  async addHistory (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.body
      const newHistory = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newHistory)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to create the history'
      })
    }
  }
}
