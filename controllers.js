const bcrypt = require("bcryptjs");
const User = require("./userModel");
const Publication = require("./publicationModel");

const registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).send(userWithoutPassword);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // const user = await User.findOne({ email: req.body.email }).select(
    //   "+password"
    // );
    // const user = await User.findOne({ name: req.body.name });

    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }

    const correspondance = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correspondance) {
      return res.status(401).send({ error: "Mot de pass incorrect" });
    }

    return res
      .status(200)
      .json({ message: "Connexion réussie", userId: user._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).send(users).select("-password");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "Utilisateur introuvable" });
    }
    res.status(200).send("Utilisateur supprimé avec succès");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// CONTROLLER POUR LES PUBLICATIONS

const createPublication = async (req, res) => {
  try {
    const publication = new Publication({
      ...req.body,
    });

    await publication.save();

    res.status(201).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPublicationByUserId = async (req, res) => {
  try {
    const publications = await Publication.find({ author: req.params.id });

    res.status(200).send(publications);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate(
      "author",
      "name email age"
    );

    res.status(200).send(publications);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (!publication) {
      return res.status(404).send({ error: "Publication introuvable" });
    }
    res.status(200).send("Publication supprimée avec succès");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!publication) {
      return res.status(404).send({ error: "Publication introuvable" });
    }
    res.status(200).send(publication);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  createPublication,
  getPublicationByUserId,
  getPublications,
  deletePublication,
  updatePublication,
};
