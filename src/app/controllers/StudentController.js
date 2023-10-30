var { conn, sql } = require("../../connect");

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
