const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Find all Route
// Find all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // be sure to include its associated Products
});

// Finf by ID Route
router.get("/:id", async (req, res) => {
  // Find one category by its ID
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err.message);
  }
  // be sure to include its associated Products
});


// Post Route
// Creates a new category
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


// Update Route
router.put("/:id", async (req, res) => {
  // Update a category by its ID
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err.message);
  }
});


// Delete Route
router.delete("/:id", async (req, res) => {
  // delete a category by its ID
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
