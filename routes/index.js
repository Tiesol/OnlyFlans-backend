module.exports = app => {
    require('./auth.routes')(app);
    require('./creator.routes')(app);
}