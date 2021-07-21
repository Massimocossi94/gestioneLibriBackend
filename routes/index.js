const bookRoutes = require ('./books');
const authRoutes = require ('./auth');


module.exports = function (app){
    app.use('/books', bookRoutes);
    app.use('/auth', authRoutes);
}