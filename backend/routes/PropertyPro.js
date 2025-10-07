const { Router } = require("express");
const {
  getData,
  createData,
  deleteData,
  editData,
} = require("../controllers/PropertyPro.js");

const router = Router();

router.get("/PropertyPro", getData);
router.post("/PropertyPro", createData);
router.patch("/PropertyPro/:id", editData);
router.delete("/PropertyPro/:id", deleteData);

module.exports = router;
