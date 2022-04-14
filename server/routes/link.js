const express = require('express');

const router = express.Router();

// controllers
const { requireSignin } = require('../controllers/auth');
const {
	postLink,
	links,
	viewCount,
	like,
	unlike,
	linkDelete,
} = require('../controllers/link');

router.post('/post-link', requireSignin, postLink);
router.get('/links', links);
router.put('/view-count/:linkId', viewCount);
router.put('/like', requireSignin, like);
router.put('/unlike', requireSignin, unlike);
router.delete('/link-delete/:linkId', requireSignin, linkDelete);

module.exports = router;
