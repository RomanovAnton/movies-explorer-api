const router = require('express').Router();
const auth = require('../middlewares/auth');
const notFoundPath = require('../middlewares/handle-not-found-path');

router.use('/', require('./auth'));
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use(notFoundPath);

module.exports = router;
