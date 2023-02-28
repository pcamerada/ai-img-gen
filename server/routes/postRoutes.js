import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET
});

// GET ALL POSTS
router.route('/').get( async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    try {
        const posts = await Post.find({}).sort({_id: -1})
            .skip(page > 0 ? (page - 1) * 10 : 0)
            .limit(page ? page * 10 : 10);
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).send({success: false, message: error})
    }
})

// FILTER POSTS
// PARAM : PARAM
router.route('/').post( async (req, res) => {
    const { param } = req.body
    try {
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(param);

        const posts = await Post.find({
            $or: [
                { name: { $regex: searchRgx, $options: "i" } },
                { prompt: { $regex: searchRgx, $options: "i" } },
            ],
        })
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).send({success: false, message: error})
    }
})

// CREATE A POST
// PARAMS : NAME, PROMPT, PHOTO
router.route('/upload').post( async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name, prompt, photo: photoUrl.url
        })

        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).send({success: false, message: error})
    }
})

export default router;