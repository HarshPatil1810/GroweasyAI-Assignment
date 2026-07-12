const fs = require("fs");

const { parseCSV } = require("../services/csvService");

const { extractCRM } = require("../services/aiService");

exports.previewCSV = async (req, res) => {

    try {

        const rows = await parseCSV(req.file.path);

        fs.unlinkSync(req.file.path);

        res.json({

            success: true,

            totalRows: rows.length,

            preview: rows.slice(0, 20)

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

exports.importCSV = async (req, res) => {

  try {

    const rows = await parseCSV(req.file.path);

    fs.unlinkSync(req.file.path);

    const result = await extractCRM(rows);

    res.json({

      success: true,

      ...result

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};

exports.importBatch = async (req, res) => {

    try {

        const rows = req.body.rows;

        if (!rows || !Array.isArray(rows)) {

            return res.status(400).json({
                success: false,
                message: "Rows are required"
            });

        }

        const result = await extractCRM(rows);

        res.json({

            success: true,

            ...result

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};