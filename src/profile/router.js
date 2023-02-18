const router = require("express").Router();

const { createProfile, deleteProfile } = require("./controllers/profile_controller");
const { getAllProfiles } = require("./controllers/profile_controller");
const { getProfileById } = require("./controllers/profile_controller");
const { updateProfile } = require("./controllers/profile_controller");

// @route   GET /
// TODO:  Get authenticated account.profile
router.get("/", getAllProfiles);

// @route   POST /
router.post("/", createProfile);

// @route   PATCH /
// TODO:  Update authenticated account.profile
router.patch("/", updateProfile);

// @route   DELETE /delete
// TODO: Delete authenticated account.profile
router.delete('/delete', deleteProfile);

// @route   GET /:id
// TODO: Get a profile by id
router.get("/:id", getProfileById);

// @route   GET /:id/posts
// TODO: Get all posts from a profile
router.get("/:id/posts", (req, res) => {});

// @route   GET /:id/comments
// TODO: Get all comments from a profile
router.get("/:id/comments", (req, res) => {});

module.exports = router;