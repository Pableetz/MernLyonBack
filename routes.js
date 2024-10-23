const express = require("express");
const {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
  updateUser,
  createPublication,
  getPublicationByUserId,
  getPublications,
  deletePublication,
  updatePublication,
} = require("./controllers");
const router = express.Router();

router.post("/users/register", registerUser);
router.get("/users/getusers", getUsers);
router.post("/users/login", loginUser);
router.delete("/users/delete/:id", deleteUser);
router.put("/users/update/:id", updateUser);
//  PUBLICATION ROUTES
router.post("/publication/create", createPublication);
router.get("/publications/get/:id", getPublicationByUserId);
router.get("/publications/get", getPublications);
router.delete("/publication/delete/:id", deletePublication);
router.put("/publication/update/:id", updatePublication);

module.exports = router;
