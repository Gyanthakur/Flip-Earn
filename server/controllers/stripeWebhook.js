
// Orignal 

// // import { request, response } from "express";
// // import { err } from "inngest/types";
// // import Stripe from "stripe";
// // import prisma from "../configs/prisma.js";
// // import { inngest } from "../inngest/index.js";

// // export const stripeWebhook = async(request, response) => {
// //     const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
// //     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// //     let event;
// //     if (endpointSecret) {
// //         // Get the signature sent by Stripe
// //             const signature = request.headers['stripe-signature'];
// //             try {
// //             event = stripe.webhooks.constructEvent(
// //                 request.body,
// //                 signature,
// //                 endpointSecret
// //             );
// //         } catch (err) {
// //         console.log(`⚠️ Webhook signature verification failed.`, err.message);
// //         return response.sendStatus(400);
// //         }

// //         try {
// //             switch (event.type) {
// //             case 'payment_intent.succeeded':
// //             const paymentIntent = event.data.object;
// //             const sessionList = await stripeInstance.checkout.sessions.list({
// //                 payment_intent: paymentIntent.id
// //             })
// //             const session = sessionList.data[0];

// //             const {transactionId, appId} = session.metadata;

// //             if(appId === 'flipearn' && transactionId){
// //                 const transaction = await prisma.transaction.update({
// //                     where: {id: transactionId},
// //                     data: {isPaid: true}
// //                 })

// //                 // send new credential to purchaser or buyer using the email address

// //                 await inngest.send({
// //                     name: "app/purchase",
// //                     data: {transaction}
// //                 })



// //                 // mark listing as sold

// //                 await prisma.listing.update({
// //                     where: {id: transaction.listingId},
// //                     data: {status: "sold"}
// //                 })

// //                 // add the amount to the user's earned balance
// //                 await prisma.user.update({
// //                     where: {id: transaction.ownerId},
// //                     data: {earned: {increment: transaction.amount}}
// //                 })
// //             }

// //             break;
            
// //             default:
// //             console.log(`Unhandled event type ${event.type}`);
// //         }

// //         // Return a response to acknowledge receipt of the event
// //             response.json({received: true});
// //         } catch (error) {
// //             console.error("Webhook processing error:", error)
// //             response.status(500).send("Internol server error")
// //         }
// //     }
// // }

// ChatGPT

// import Stripe from "stripe";
// import prisma from "../configs/prisma.js";
// import { inngest } from "../inngest/index.js";

// export const stripeWebhook = async (req, res) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//   const signature = req.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body, // raw body
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send("Invalid signature");
//   }

//   // ❗ Ignore everything except Checkout completion
//   if (event.type !== "checkout.session.completed") {
//     return res.status(200).json({ ignored: true });
//   }

//   try {
//     const session = event.data.object;
//     const { transactionId, appId } = session.metadata || {};

//     if (appId !== "flipearn" || !transactionId) {
//       return res.status(200).json({ ignored: true });
//     }

//     const transaction = await prisma.transaction.findUnique({
//       where: { id: transactionId },
//     });

//     if (!transaction || transaction.isPaid) {
//       return res.status(200).json({ ignored: true });
//     }

//     const updatedTransaction = await prisma.transaction.update({
//       where: { id: transactionId },
//       data: { isPaid: true },
//     });

//     await Promise.all([
//       inngest.send({
//         name: "app/purchase",
//         data: { transaction: updatedTransaction },
//       }),
//       prisma.listing.update({
//         where: { id: updatedTransaction.listingId },
//         data: { status: "sold" },
//       }),
//       prisma.user.update({
//         where: { id: updatedTransaction.ownerId },
//         data: { earned: { increment: updatedTransaction.amount } },
//       }),
//     ]);

//     return res.status(200).json({ received: true });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return res.status(200).json({ received: true });
//   }
// };

import Stripe from "stripe";
import prisma from "../configs/prisma.js";
import { inngest } from "../inngest/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  // ✅ Signature verification
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // RAW BUFFER
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return res.status(400).send("Invalid signature");
  }

  // ✅ Only handle checkout completion
  if (event.type !== "checkout.session.completed") {
    return res.status(200).json({ ignored: true });
  }

  try {
    const session = event.data.object;
    const { transactionId, appId } = session.metadata || {};

    if (appId !== "flipearn" || !transactionId) {
      return res.status(200).json({ ignored: true });
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    // ✅ Idempotency protection
    if (!transaction || transaction.isPaid) {
      return res.status(200).json({ ignored: true });
    }

    // ✅ Update transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { isPaid: true },
    });

    // ✅ Parallel updates
    await Promise.all([
      prisma.listing.update({
        where: { id: updatedTransaction.listingId },
        data: { status: "sold" },
      }),
      prisma.user.update({
        where: { id: updatedTransaction.ownerId },
        data: {
          earned: { increment: updatedTransaction.amount },
        },
      }),
      inngest.send({
        name: "app/purchase",
        data: { transaction: updatedTransaction },
      }),
    ]);

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("🔥 Webhook processing error:", error);

    // ⚠️ Always return 200 to stop Stripe retries
    return res.status(200).json({ received: true });
  }
};
