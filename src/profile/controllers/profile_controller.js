const Person = require("../models/person");
const Company = require("../models/company");
const Profile = require("../models/profile");

const { getUrl } = require("../../../utils/getter");
const { removeFields } = require("../../../utils/remover");

const createProfile = async (req, res) => {
    const profiles = await Profile.find({ owner: req.account });
    if (profiles.length >= 5) {
        return res.status(400).json({ error: "Only 5 profiles max per account" });
    }

    const { kind, ...body } = req.body;
    let profile;

    try {
        switch (kind) {
            case "person":
                profile = new Person({ body, owner: req.account} );
                break;
            case "company":
                profile = new Company({ body, owner: req.account});
                break;
            default:
                return res.status(400).json({ msg: "Invalid kind" });
        }

        await profile.save();

        res.header("Location", getUrl(req, profile.id));
        res.status(201).json(removeFields(profile.toObject()));
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const getAllProfiles = async (req, res) => {
    const profiles = await Profile.find({owner: req.account});

    res.status(200).json(removeFields(profiles));
};

const getProfileById = async (req, res) => {
    const { id } = req.params;

    try {
        const profile = await Profile.findOne({ id: id }).lean().exec();
        if (!profile) {
            return res
                .status(404)
                .json({ msg: RESPONSE_MESSAGES.POST_NOT_FOUND });
        }

        res.status(200).json(removeFields(profile));
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { kind, ...update } = req.body;

    try {
        const profile = await Profile.findOneAndUpdate({ id, kind }, update, {
            new: true,
            runValidators: true,
        })
            .lean()
            .exec();

        res.header("Location", getUrl(req, id));
        res.status(200).json({ profile: removeFields(profile) });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const deleteProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const profile = await Profile.findOneAndDelete({ id, owner: req.account });

        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

    return res.status(204).end();
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

module.exports = {
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
};
