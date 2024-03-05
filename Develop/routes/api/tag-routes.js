const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      inclue: {
        all: true,
        nested: true,
      },
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {
      inclue: {
        model: Product,
        through: ProductTag,
      },
    });
  } catch (err) {
    res.status(500).json(err.message);
  }

  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.json(tag);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
  } catch (error) {
    res.status(400).json(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value

  try {
    const tag = await Tag.destroy({ where: { id: req.params.id } });
    res.json(tag);
  } catch (error) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
