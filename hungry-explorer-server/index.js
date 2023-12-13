const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// middleware v1
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hungry-explorer.web.app",
      "https://hungry-explorer.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
//custom middlewares
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2dfdg2c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const TopFoodCollections = client
      .db("hungry-explorer")
      .collection("top-selling");
    const AllFoodCollections = client
      .db("hungry-explorer")
      .collection("all-foods");
    const OrderCollection = client.db("hungry-explorer").collection("Orders");
    const RegisterAccountsCollections = client
      .db("hungry-explorer")
      .collection("register-accounts");

    app.get("/api/v1/top_items", async (req, res) => {
      const result = await TopFoodCollections.find().toArray();
      res.send(result);
    });
    //Getting all foods

    // /api/v1/all-foods?quantity=food-name
    app.get("/api/v1/all-foods", async (req, res) => {
      try {
        let query = {}; // Default empty query

        if (req.query.strMeal) {
          const strMeal = req.query.strMeal;
          const regexPattern = new RegExp(strMeal, "i");
          query.strMeal = { $regex: regexPattern };
        }
        const page = Number(req.query.page);
        const size = Number(req.query.size);

        const result = await AllFoodCollections.find(query)
          .skip(page * size)
          .limit(size)
          .toArray();

        const total = await AllFoodCollections.countDocuments();

        res.send({ result, total });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
    //get data by id
    app.get("/api/v1/all-foods/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await AllFoodCollections.findOne(query);
      res.send(result);
    });
    // add data to all foods
    app.post("/api/v1/all-foods", async (req, res) => {
      const add = req.body;
      const result = await AllFoodCollections.insertOne(add);
      res.send(result);
    });
    // get my added foods by email address
    app.get("/api/v1/find", logger, verifyToken, async (req, res) => {
      const email = req.query.email;
      // console.log(email);
      console.log("my token owner info", req.user);
      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await AllFoodCollections.find({ email: email }).toArray();
      res.send(result);
    });
    app.delete("/api/v1/find/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await AllFoodCollections.deleteOne(query);
      res.send(result);
    });
    // ///////// update data
    app.put("/api/v1/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const data = req.body;
      const options = { upsert: true };
      const updateData = {
        $set: {
          strMeal: data.strMeal,
          strCategory: data.strCategory,
          strArea: data.strArea,
          strMealThumb: data.strMealThumb,
          description: data.description,
          price: data.price,
          email: data.email,
          quantity: data.quantity,
        },
      };

      const result = await AllFoodCollections.updateOne(
        filter,
        updateData,
        options
      );
      res.send(result);
    });

    // post Order data///////////////////////////////////

    app.post("/api/v1/orders", async (req, res) => {
      const order = req.body;
      const result = await OrderCollection.insertOne(order);
      res.send(result);
    });

    //get data by email
    app.get("/api/v1/orders", logger, verifyToken, async (req, res) => {
      const email = req.query.email;
      // console.log(email);
      console.log("my token owner info", req.user);
      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      // console.log(email);
      const result = await OrderCollection.find({ buyer: email }).toArray(); // Assuming 'buyerEmail' is the field in your database
      res.send(result);
    });

    app.delete("/api/v1/delete-card", async (req, res) => {
      const email = req.query.email;
      const result = await OrderCollection.deleteMany({ buyer: email });
      res.send(result);
    });
    // delete data by id
    app.delete("/api/v1/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await OrderCollection.deleteOne(query);
      res.send(result);
    });
    // store register accounts data
    app.post("/api/v1/register", async (req, res) => {
      const user = req.body;
      const result = await RegisterAccountsCollections.insertOne(user);
      res.send(result);
    });
    //jwt
    app.post("/api/v1/jwt", async (req, res) => {
      const user = req.body;
      console.log(user, "user email jwt");

      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ success: true });
    });
    //remove token
    app.post("/api/v1/logout", async (req, res) => {
      const user = req.body;
      console.log("logout user ", user);
      res.clearCookie("token", { maxAge: 0 }).send({ success: true });
    });

    //////////////////////
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("ASSIGNMENT 11 is running ...!!!!");
});

app.listen(port, () => {
  console.log(`ema john server is running on port: ${port}`);
});
