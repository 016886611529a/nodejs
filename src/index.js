const path = require("path");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const server = http.createServer(app);
const axios = require("axios");
const multer = require("multer");
const upload = multer();
const port = 3001;

const route = require("./routes");
const db = require("./config/db");

//connect to db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));
//http logger
// app.use(morgan("combined"));

//templates engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
// console.log(path.join(__dirname, "resources/views"));

//Routes init
route(app);
app.use((req, res, next) => {
  return res.send("cc");
});
// app.listen(port, () => {
//   console.log(`app listening on port http://localhost:${port}`);
// });

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A client connected", 123);

  // Gọi API và gửi dữ liệu tới client mỗi 5 giây
  setInterval(async () => {
    try {
      // const response = await axios.get(
      //   "https://client-api.quanlyxe.vn/v3/tracking/GetVehicleStatus",
      //   {
      //     params: {
      //       plate: "75A-00.369",
      //       apikey: "tZyasIbAJpQJ5AbeTxFsM4Im18A1sKAq",
      //     },
      //   }
      // );
      const data = {
        CustomerCode: 71288,
        Key: "tXuR33jbVU",
      };

      axios
        .post("http://api.gps.binhanh.vn/api/gps/tracking", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const filteredData = response.data.Vehicles.filter((item) =>
            item.Address.includes("Thừa Thiên Huế")
          );
          socket.emit("newData", filteredData);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log("error", error);
        });

      // const newData = response.data.Data; // Dữ liệu từ API
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 20000);

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});
const admin = require("firebase-admin");
const serviceAccount = require("./appbus-huecit-firebase-adminsdk-ozhfr-b07e5cc4c0.json");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const { json } = require("express");
const cors = require("cors");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // Cấu hình khác của Firebase Admin SDK nếu cần
// });

// const message = {
//   notification: {
//     title: "Tiêu đề thông báo",
//     body: "Nội dung thông báo",
//   },
//   topic: "allDevices", // Gửi đến tất cả các thiết bị đã đăng ký trong chủ đề này
// };

// admin
//   .messaging()
//   .send(message)
//   .then((response) => {
//     console.log("Thông báo đã được gửi:", response);
//   })
//   .catch((error) => {
//     console.log("Lỗi khi gửi thông báo:", error);
//   });
// process.env.GOOGLE_APPLICATION_CREDENTIALS;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

// initializeApp({
//   credential: applicationDefault(),
//   projectId: "appbus-huecit",
// });
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Cấu hình khác của Firebase Admin SDK nếu cần
});
app.post("/send", upload.none(), function (req, res) {
  // const receivedToken = req.body.fcmToken;

  // const topic = "allDevices";
  // const message = {
  //   notification: {
  //     title: "Thông báo khẩn",
  //     body: "Test thông báo .......",
  //   },
  const title = req.body.title; // Trích xuất title từ form data
  const body = req.body.body; // Trích xuất body từ form data
  console.log(title, body);
  const message = {
    notification: {
      title: title,
      body: body,
    },
    android: {
      notification: {
        icon: "stock_ticker_update",
        color: "#7e55c3",
      },
    },

    topic: "allDevices", // Gửi đến tất cả các thiết bị đã đăng ký trong chủ đề này
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Thông báo đã được gửi:", response);
      res.status(200).json({
        message: "Thông báo đã được gửi thành công.",
        resultObj: response,
      });
    })
    .catch((error) => {
      console.log("Lỗi khi gửi thông báo:", error);
      res.status(500).json({ error: "Lỗi khi gửi thông báo." });
    });
  // getMessaging()
  //   .send(message)
  //   .then((response) => {
  //     res.status(200).json({
  //       message: "Successfully sent message",
  //       token: receivedToken,
  //     });
  //     console.log("Successfully sent message:", response);
  //   })
  //   .catch((error) => {
  //     res.status(400);
  //     res.send(error);
  //     console.log("Error sending message:", error);
  //   });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
