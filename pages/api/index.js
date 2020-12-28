import multer from "multer";

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  await runMiddleware(req, res, upload.single("file"));
  console.log(req.files, storage);
  res.send({ a: 1 });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

/*
const Busboy = require("busboy");
module.exports = (req, res) => {
  const busboy = new Busboy({ headers: req.headers });

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    console.log("File [" + fieldname + "]: filename: " + filename);

    file.on("data", function (data) {
      console.log("File [" + fieldname + "] got " + data.length + " bytes");
    });

    file.on("end", function () {
      console.log("File [" + fieldname + "] Finished");
    });
  });

  busboy.on(
    "field",
    function (fieldname, val, fieldnameTruncated, valTruncated) {
      console.log("Field [" + fieldname + "]: value: " + val);
    }
  );

  busboy.on("finish", function () {
    console.log("Done parsing form!");
    res.send(JSON.stringify({ ok: 1 }));
  });

  req.pipe(busboy);
};
*/
