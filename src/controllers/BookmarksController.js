const { Bookmark } = require('../models')

module.exports = {
  async showBookmarks (req, res) {
    try {
      const {songId, userId} = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
    
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the bookmark'
      })
    }
  },
  async addBookmark (req, res) {
    try {
      const {songId, userId} = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to create the bookmark'
      })
    }
  },
  async deleteBookmark (req, res) {
    try {
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId
        }
      })
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete the bookmark'
      })
    }
  }
}
