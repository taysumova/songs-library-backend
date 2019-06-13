const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoryController = require('./controllers/HistoryController')
const isAuthenticated = require('./policies/isAuthenticated')

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
    isAuthenticated,
    BookmarksController.showBookmarks)
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.addBookmark)
  app.delete('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.deleteBookmark)

  app.get('/history',
    isAuthenticated,
    HistoryController.showHistory)
  app.post('/history',
    isAuthenticated,
    HistoryController.addHistory)
}
