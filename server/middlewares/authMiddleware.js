
export const protect = async (req,res, next) => {
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