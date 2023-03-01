const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll ({
    // be sure to include its associated Category and Tag data
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
    .then ((dbData) => res.json(dbData))
    .catch((err)=> {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value to find it using WHERE
  // be sure to include its associated Products
  // we'll use req.params here
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      }
    ],
  })
    // your .thens and .catches!
    .then(dbUserData => {
      if(!dbUserData[0]){
        res.status(404).json({ message: "User not found"})
        return;
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      res.status(200).json(category);
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id,
    },
  })
    .then(dbData => {
      if(!dbData){
        res.status(404).json({ message: "User not found"})
        return;
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
