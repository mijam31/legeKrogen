import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Modeller og data
import Review from "./models/Review.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import products from "./data/Products.js";
import Accordion from "./models/Accordion.js";
import accordions from "./data/Accordions.js";
import reviews from "./data/Reviews.js";

dotenv.config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route for API frontpage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Initialiser produkter og accordions, hvis de ikke allerede findes
const initializeData = async () => {
  try {
    const existingProducts = await Product.find({
      title: { $in: products.map((p) => p.title) },
    });

    const existingAccordions = await Accordion.find({
      title: { $in: accordions.map((a) => a.title) },
    });

    const existingReviews = await Review.find({
      description: { $in: reviews.map((a) => a.description) },
    });

    if (existingProducts.length !== products.length) {
      await Product.insertMany(products);
      console.log("Standardprodukter tilføjet til databasen");
    }

    if (existingAccordions.length !== accordions.length) {
      await Accordion.insertMany(accordions);
      console.log("Standardaccordions tilføjet til databasen");
    }

    if (existingReviews.length !== reviews.length) {
      await Review.insertMany(reviews);
      console.log("Standardreviews tilføjet til databasen");
    }
  } catch (error) {
    console.error("Fejl ved initialisering af data:", error);
  }
};

// Opret forbindelse til MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    initializeData();
  })
  .catch((error) => console.error("MongoDB connection error:", error));

// Registrering af ny bruger
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Brugernavn allerede i brug" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "Bruger oprettet" });
  } catch (error) {
    res.status(500).json({ message: "Fejl ved oprettelse af bruger", error });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Brugernavn eller password er forkert" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Brugernavn eller password er forkert" });
    }

    // Opret en JWT-token og returnér den til klienten
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Fejl ved login", error });
  }
});

/* PRODUKTER */

// GET route - Hent alle produkter
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Fejl ved hentning af produkter", error });
  }
});

// GET route - Hent et enkelt produkt
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produkt ikke fundet" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Fejl ved hentning af produkt", error });
  }
});

// POST route - Opret produkt
app.post("/api/products", upload.single("image"), async (req, res) => {
  const { title, description, price, discountInPercent, recommended } =
    req.body;

  try {
    let image = "";

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    } else {
      return res
        .status(400)
        .json({ message: "Billede eller URL skal angives" });
    }

    const newProduct = new Product({
      title,
      description,
      image,
      price,
      discountInPercent,
      recommended,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Fejl ved oprettelse af produkt", error });
  }
});

// PUT route - Opdater produkt
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, image, price, discountInPercent, recommended } =
    req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
        price,
        discountInPercent,
        recommended,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produkt ikke fundet" });
    }

    res.status(200).json({ message: "Produkt opdateret!", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Fejl ved opdatering af produkt", error });
  }
});

// DELETE route - Slet et produkt
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Produkt ikke fundet" });
    }

    res.status(200).json({ message: "Produktet blev slettet" });
  } catch (error) {
    res.status(500).json({ message: "Fejl ved sletning af produkt", error });
  }
});

/* REVIEWS */

// GET route - Hent alle reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Fejl ved hentning af produkter", error });
  }
});

// GET route - Hent et enkelt review
app.get("/api/reviews/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review ikke fundet" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Fejl ved hentning af review", error });
  }
});

// POST route - Opret review
app.post("/api/reviews", async (req, res) => {
  try {
    const newReview = new Review({
      name: req.body.name,
      description: req.body.description,
    });

    const savedReview = await newReview.save();
    console.log("Review gemt:", savedReview);

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Fejl ved oprettelse af review:", error);
    res.status(500).json({ message: "Fejl ved oprettelse af review", error });
  }
});

// PUT route - Opdater et review
app.put("/api/reviews/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review ikke fundet" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Fejl ved opdatering af review:", error);
    res.status(500).json({ message: "Fejl ved opdatering af review", error });
  }
});

// DELETE route - Slet et review
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review ikke fundet" });
    }

    res.status(200).json({ message: "Reviewet blev slettet" });
  } catch (error) {
    console.error("Fejl ved sletning af review:", error);
    res.status(500).json({ message: "Fejl ved sletning af review", error });
  }
});

// Start serveren
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
