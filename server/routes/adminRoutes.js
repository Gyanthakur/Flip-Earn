import express from "express";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { changeCredential, changeStatus, getAllListing, getAllTransacrtion, getAllUnChangedListings, getAllUnverifiedListings, getAllWithdrawRequest, getCredential, getDashboard, isAdmin, markCredentialVerified, markWithdrawlAsPaid } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get('/isAdmin', protectAdmin, isAdmin);
adminRouter.get('/dashboard', protectAdmin, getDashboard);
adminRouter.get('/all-listings', protectAdmin, getAllListing);
adminRouter.put('/change-status/:listingId', protectAdmin, changeStatus);
adminRouter.get('/unverified-listings', protectAdmin, getAllUnverifiedListings);
adminRouter.get('/credential/:listingId', protectAdmin, getCredential);
adminRouter.put('/verify-credential/:listingId', protectAdmin, markCredentialVerified);
adminRouter.get('/unchanged-listings', protectAdmin, getAllUnChangedListings);
adminRouter.put('/change-credential/:listingId', protectAdmin, changeCredential);
adminRouter.get('/transactions', protectAdmin, getAllTransacrtion);
adminRouter.get('/withdrawl-requests', protectAdmin, getAllWithdrawRequest);
adminRouter.put('/withdrawl-mark/:id', protectAdmin, markWithdrawlAsPaid);

export default adminRouter