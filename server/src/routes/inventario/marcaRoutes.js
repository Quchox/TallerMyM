const express = require("express");
const { getAllMarcas, getMarcaById } = require("../../controllers/inventario/marcaController.js");

const router = express.Router();

router.get("/", getAllMarcas); // GET /marca
router.get("/:id", getMarcaById); // GET /marca/:id

module.exports = router;
