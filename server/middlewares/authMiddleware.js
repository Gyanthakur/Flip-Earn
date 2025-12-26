import {clerkClient} from "@clerk/express"


export const protect = async (req, res, next) => {
    try {
        const {userId, has} = await req.auth();

        if(!userId){
            return res.status(401).json({message: "Unauthorized Access"})
        }

        const hasPremiupPlan = await has({plan: "premium"});
        req.plan = hasPremiupPlan ? "premium" : "free";
        return next();

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({message: error.code || error.message });
    }
}

export const protectAdmin = async (req, res, next) => {
    try {
        const user = await clerkClient.users.getUser(await req.auth().userId)

       const isAdmin = process.env.ADMIN_EMAIL.split(",").includes(user.emailAddresses[0].emailAddress);
       if(!isAdmin){
        return res.status(401).json({message: "Unauthorized"})
       }

       return next();

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({message: error.code || error.message });
    }
}