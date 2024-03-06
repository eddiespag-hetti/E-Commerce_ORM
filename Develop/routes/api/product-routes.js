const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Get all products Route
router.get("/", async (req, res) => {
  // Find all products
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          Tag,
        },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // be sure to include its associated Category and Tag data
});

// Get one product
// Find a product by its `id`
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, Tag }],
    });
    if (!product) {
      res.status(404).json({ message: "No product was found with that id!" });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // be sure to include its associated Category and Tag data
});

// create new product Route
router.post("/", async (req, res) => {
  Product.create({
    id: req.body.id,
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tag_id,
  })
    .then((product) => {
      // if there's product tags exist, need to create pairings
      if (req.body.tagIds.length) {
        const productTagId = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagId);
      }
      // when theres no product tags, just respond with a status '200'
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product Route
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // This creates a new 'filtered' list of tag-id's
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsDelete = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsDelete } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// Delete product Route
router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
