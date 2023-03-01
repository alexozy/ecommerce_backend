const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,

      },
    ],
  })
  // .thens and .catches for any errors
  .then((dbData) => res.json(dbData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{
      model: Product,
    }],
  })
.then((dbData) => res.json(dbData))
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});


});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy
});

module.exports = router;
