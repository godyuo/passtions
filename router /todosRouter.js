const express = require('express');
const router = express.Router();
const { getimg, getid, putid, deleteid, postid, get, logintodo } = require('../controllers/todosController');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 }
});

router.get('/:id', getid);
router.put('/:id', putid);
router.delete('/:id', deleteid);
router.post('/', postid);
router.get('/', get);
router.post('/:id', logintodo)
router.post('/getimg/:id', upload.single('image'), getimg);


module.exports = router;