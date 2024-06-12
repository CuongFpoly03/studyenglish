const auth = require("./authRoute")
const users = require("./userRoute")
const vocabularys = require("./vocabularyRoute")
const categorys = require("./categoryRoute")
const historys = require("./historyRoute")
const favorites = require("./favoriteRoute")
const ratings = require("./ratingsRoute")
const RouteAll = (app) => {
    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/categorys', categorys);
    app.use('/vocabularys', vocabularys);
    app.use('/historys', historys);
    app.use('/favorites', favorites);
    app.use('/ratings', ratings);
}
module.exports = RouteAll;