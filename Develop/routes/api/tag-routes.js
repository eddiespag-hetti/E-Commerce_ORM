const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Find all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // be sure to include its associated Product data
});

// Find a tag by it's ID

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      inclue: [
        {
          model: Product,
        },
      ],
    });
    if (!tag) {
      res.status(404).json({ message: "There was no tag found with that id!" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // be sure to include its associated Product data
});

// Create NEW tag route
router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update tag Route
// Update a tag's name by its ID
router.put("/:id", async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(200).json(tag).json({message:"This tag was updated!"});
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Delete tag from it's ID
router.delete("/:id", async (req, res) => {
  try {
    const tagDeleted = await Tag.destroy({ where: { id: req.params.id } });
    res.status(200).json(tagDeleted);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
