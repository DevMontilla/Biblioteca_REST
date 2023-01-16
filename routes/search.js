const { Router } = require("express");
const { searchBook } = require("../controllers/search");

const router = Router();

router.get("/", searchBook);

module.exports = router;
