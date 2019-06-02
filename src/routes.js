const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/songs',
    SongsController.getAllSongs)
  app.get('/songs/:songId',
    SongsController.showSong)
  app.post('/songs',
    SongsController.addSong)
  app.put('/songs/:songId',
    SongsController.editSong)

  app.get('/bookmarks',
    BookmarksController.showBookmarks)
  app.post('/bookmarks',
    BookmarksController.addBookmark)
  app.delete('/bookmarks/:bookmarkId',
    BookmarksController.deleteBookmark)
}
