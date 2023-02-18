const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
// const post = require("../../blog/models/post");

const baseSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
        },
        bio: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        email: {
            type: String,
        },
        id: {
            type: String,
            default: uuidv4,
        },
        // ⚠️
        owner: {
            type: String,
        },
        username: {
            type: String,
        },
        updateAt: {
            type: Date,
            default: Date.now,
        }
    },

    {
        discriminatorKey: "kind",
    }
);

module.exports = mongoose.model("Profile", baseSchema);