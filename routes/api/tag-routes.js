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
    .then((dbData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "id has no user data" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((dbData) => res.json(dbData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // make sure to include the req.body so you can tie it to it's specific tag name!
  Tag.update({
      tag_name: req.body.tag_name,
    },
    { where: {
        id: req.params.id,
      },
    },
  )
  .then((dbData) => {
    if (!dbUserData) {
      res.status(404).json({ message: "id has no user data" });
      return;
    }
    res.json(dbData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })

  .then((dbData) => {
    if (!dbUserData) {
      res.status(404).json({ message: "id has no user data" });
      return;
    }
    res.json(dbData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
