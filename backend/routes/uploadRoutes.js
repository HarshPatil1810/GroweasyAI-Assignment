const express = require("express");
const multer = require("multer");

const {
    previewCSV,
    importCSV,
    importBatch
} = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads");

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

const upload = multer({

    storage,

    fileFilter(req, file, cb) {

        if (!file.originalname.endsWith(".csv")) {

            return cb(new Error("Only CSV files allowed"));

        }

        cb(null, true);

    }

});

router.post("/preview", upload.single("file"), previewCSV);

router.post("/import", upload.single("file"), importCSV);

router.post("/import-batch", importBatch);

module.exports = router;