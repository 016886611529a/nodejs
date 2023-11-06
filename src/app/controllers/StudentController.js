var { conn, sql } = require("../../connect");
const multer = require("multer");
const path = require("path");
exports.getList = async function (req, res) {
  var pool = await conn;
  var sqlString = "SELECT * FROM Student";
  return await pool.request().query(sqlString, function (err, data) {
    if (data.recordset.length > 0) {
      res.send({
        message: "Lấy danh sách thành công",
        result: data.recordset,
      });
    } else {
      res.send({ result: null });
    }
  });
};
exports.getById = async function (req, res) {
  var id = req.params.id;
  var pool = await conn;
  var sqlString = "SELECT * FROM Student WHERE Id= @varId";
  return await pool
    .request()
    .input("varId", sql.Int, id)
    .query(sqlString, function (err, data) {
      if (data.recordset.length > 0) {
        res.send({ result: data.recordset[0] });
      } else {
        res.send({ result: null });
      }
    });
};
exports.addNew = async function (req, res) {
  var pool = await conn;
  var sqlString =
    "INSERT INTO Student (Name,Email,Phone) Values (@name,@email,@phone)";
  return await pool
    .request()
    .input("name", sql.NVarChar, req.body.Name)
    .input("email", sql.VarChar, req.body.Email)
    .input("phone", sql.VarChar, req.body.Phone)
    .query(sqlString, function (err, data) {
      res.send({ result: req.body });
    });
};
exports.update = async function (req, res) {
  var pool = await conn;
  var sqlString =
    "UPDATE Student SET Name = @name,Email= @email,Phone= @phone WHERE Id = @varId";
  return await pool
    .request()
    .input("varId", sql.Int, req.body.id)
    .input("name", sql.NVarChar, req.body.Name)
    .input("email", sql.NVarChar, req.body.Email)
    .input("phone", sql.NVarChar, req.body.Phone)
    .query(sqlString, function (err, data) {
      res.send({ result: req.body });
    });
};
exports.delete = async function (req, res) {
  var pool = await conn;
  var id = req.params.id;
  console.log(id);
  var sqlString = "DELETE FROM Student WHERE Id= @varId";
  return await pool
    .request()
    .input("varId", sql.Int, id)
    .query(sqlString, function (err, data) {
      if (!err) {
        res.send({ result: "xóa thành công" });
      } else {
        res.send({ result: "Xóa thất bại" });
      }
    });
};

const upload = multer().single("file");
exports.handleUploadFile = function (req, res) {
  // if (!req.file) {
  //   return res.status(400).send("Vui lòng chọn một tệp để tải lên.");
  // }
  if (req.files.length <= 0) {
    return res.status(400).send("Vui lòng chọn ít nhất một tệp để tải lên.");
  }
  res.status(200).send({ result: "Tải lên thành công." });
  // upload(req, res, function (err) {
  //   console.log(res);
  //   if (req.fileValidationError) {
  //     return res.send(req.fileValidationError);
  //   } else if (!req.file) {
  //     return res.send("Please select an image to upload");
  //   } else if (err instanceof multer.MulterError) {
  //     return res.send(err);
  //   } else if (err) {
  //     return res.send(err);
  //   }
  //   res.status(200).send("File uploaded successfully");
  // });
};
