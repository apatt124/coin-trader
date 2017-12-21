

function create(app) {
    app.use('/',         require('./routes/default'));
    app.use('/portfolio',    require('./routes/portfolio'));
    app.use('/database', require('./routes/database'));

    app.use((req, res, next) => {
        res.status(404);
        res.render('404', { title: '404', message: 'This page does not exist.' });
    });
}


module.exports = {
    create: create
};
