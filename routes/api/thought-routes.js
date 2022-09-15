const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReact,
  removeReact,
  getAllThought,
  getThoughtById,
  updateThought
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/
router.route('/').get(getAllThought)

// /api/thought/:thoughtId
router.route('/:id')
.get(getThoughtById)
.put(updateThought)

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addReact)
  .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<ReactId>
router.route('/:userId/:thoughtId/:reactId').delete(removeReact);

module.exports = router;
