// controller for adding Listing to database

import imagekit from "../configs/imageKit.js";
import prisma from "../configs/prisma.js";
import fs from "fs";


export const addListing = async(req,res) => {
    try {
        const {userId} = await req.auth();
        if(req.plan !== "premium"){
            const listingCount = await prisma.listing.count({
                where: {ownerId: userId}
            })
            if(listingCount >= 5){
                return res.status(400).json({message: "Yu have reached the free listings limit"})
            }
            
        }
        const accountDetails = JSON.parse(req.body.accountDetails);

        accountDetails.followers_count = parseInt(accountDetails.followers_count);
        accountDetails.engagement_rate = parseFloat(accountDetails.engagement_rate);
        accountDetails.monthely_views = parseFloat(accountDetails.monthely_views);
        accountDetails.price = parseFloat(accountDetails.price);
        accountDetails.platform = accountDetails.platform.toLowerCase();
        accountDetails.niche = accountDetails.niche.toLowerCase();

        accountDetails.username.startsWith("@") ? accountDetails.username = accountDetails.username.slice(1) : null;

        const uploadImages = req.files.map(async (file)=>{
            const response = await imagekit.files.upload({
                file: fs.createReadStream(file.path),
                fileName: `${Date.now()}-${file.originalname}.png`,
                folder: "flip-earn",
                transformation: {pre: "w-1280, h-auto"}
            });
            return response.url;
        })

        // wait for all images to be uploaded
        const images = await Promise.all(uploadImages);

        const listing = await prisma.listing.create({
            data: {
                ownerId: userId,
                images,
                ...accountDetails
            }
        })
        return res.status(201).json({message: "Account Listed successfully", listing});

    } catch (error) {
        console.error("Add Listing Error:", error);
        return res.status(500).json({message: error.code || error.message });
    }
}