let router  = require('express').Router();


router.get('/', (req, res) => {
    res.render('portfolio', { title: 'Portfolio' });
});


module.exports = router;