import * as express from "express";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

import { index } from "../be-src/lib/algolia";
import { Mascota, User, Auth } from "./models/index";

const SECRET = "odsjfiofjaspoij";

function getSHA256ofString(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// const port = process.env.PORT || 5656;
const port = 5656;
const app = express();

app.use(express.json());

//signup
app.post("/auth", async (req, res) => {
  const { email, name, birthdate, password } = req.body;
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      name,
      birthdate,
    },
  });
  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email,
      password: getSHA256ofString(password),
      user_id: user.get("id"),
    },
  });
  res.json(auth);
});

//sign in
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const passwordHasheado = getSHA256ofString(password);

  const auth = await Auth.findOne({
    where: { email, password: passwordHasheado },
  });
  const token = jwt.sign({ id: auth.get("user_id") }, SECRET);

  if (auth) {
    res.json({ token });
  } else {
    res.status(400).json({ error: "email or pass incorrect " });
  }
});

app.post("/mascotas", async (req, res) => {
  const { lat, lng } = req.body;
  const newMascota = await Mascota.create(req.body);
  const algoliaRes = await index
    .saveObject({
      objectID: newMascota.get("id"),
      name: newMascota.get("name"),
      state: newMascota.get("state"),
      _geoloc: {
        lat: newMascota.get("lat"),
        lng: newMascota.get("lng"),
      },
    })
    .catch((error) => {
      res.status(404).json(error.message);
    });

  res.json(newMascota);
});

app.get("/mascotas", async (req, res) => {
  const mascotas = await Mascota.findAll();
  res.json(mascotas);
});

app.get("/mascotas-cerca-de", async (req, res) => {
  const { lat, lng } = req.query;
  const { hits } = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 10000,
  });

  res.json(hits);
});

//authorization
function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: "not allowed" });
  }
}

app.get("/me", authMiddleware, async (req, res) => {
  res.json({ token: "valido" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
