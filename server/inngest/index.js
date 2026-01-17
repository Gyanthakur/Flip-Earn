import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";
import sendEmail from "../configs/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "profile-marketplace" });

// Inngest function to save user data to a database
const syncUserCreation = inngest.createFunction(
	{ id: "sync-user-from-clerk" },
	{ event: "clerk/user.created" },
	async ({ event }) => {
		const { data } = event;

		// Check if user already exist in database
		const user = await prisma.user.findFirst({
			where: { id: data.id },
		});
		if (user) {
			// update user data if exist
			await prisma.user.update({
				where: { id: data.id },
				data: {
					email: data?.email_addresses[0]?.email_address,
					name: data?.first_name + " " + data?.last_name,
					image: data?.image_url,
				},
			});
			return;
		}
		await prisma.user.create({
			data: {
				id: data.id,
				email: data?.email_addresses[0]?.email_address,
				name: data?.first_name + " " + data?.last_name,
				image: data?.image_url,
			},
		});
	}
);

// Inngest function to delete user from database

const syncUserDeletion = inngest.createFunction(
	{ id: "delete-user-with-clerk" },
	{ event: "clerk/user.deleted" },
	async ({ event }) => {
		const { data } = event;

		const listings = await prisma.listing.findMany({
			where: { ownerId: data.id },
		});
		const chats = await prisma.chat.findMany({
			where: { OR: [{ ownerUserId: data.id }, { chatUserId: data.id }] },
		});

		const transactions = await prisma.transaction.findMany({
			where: { userId: data.id },
		});

		if (
			listings.length === 0 &&
			chats.length === 0 &&
			transactions.length === 0
		) {
			await prisma.user.delete({ where: { id: data.id } });
		} else {
			await prisma.listing.updateMany({
				where: { ownerId: data.id },
				data: { status: "inactive" },
			});
		}
	}
);

// inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
	{ id: "update-user-from-clerk" },
	{ event: "clerk/user.updated" },
	async ({ event }) => {
		const { data } = event;

		await prisma.user.update({
			where: { id: data.id },
			data: {
				email: data?.email_addresses[0]?.email_address,
				name: data?.first_name + " " + data?.last_name,
				image: data?.image_url,
			},
		});
	}
);

// Inngest function to send purchase email to the customer
const sendPurchseEmail = inngest.createFunction(
	{ id: "send-purchase-email" },
	{ event: "app/purchase" },
	async ({ event }) => {
		const { transaction } = event.data;
		const customer = await prisma.user.findFirst({
			where: { id: transaction.userId },
		});
		const listing = await prisma.listing.findFirst({
			where: { id: transaction.listingId },
		});
		const credential = await prisma.credential.findFirst({
			where: { listingId: transaction.listingId },
		});

		// await sendEmail({
		//     to:customer.email,
		//     subject: "Your Credential for the account you purchased",
		//     html: `
		//     <h2>Thank you for purchasing acoount @${listing.username} of ${listing.platform} platform </h2>
		//     <p>Here are your credentials for thre listing you purchased.</p>
		//     <h3>New Credentials</h3>
		//     <div>
		//     ${credential.updatedCredential.map((cred)=> `<p>${cred.name} : ${cred.value} </p>`).join("")}
		//     </div>
		//     <p>If you have any question, please contact us at <a href="mailto:gps.96169@gmail.com">support@flipearn.com</a></p>
		//     `
		// })
		await sendEmail({
			to: customer.email,
			subject: "🎉 Your FlipEarn Account Credentials Are Ready!",
			html: `
            <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                        <!-- Banner -->
                        <tr>
                        <td style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:30px;text-align:center;">
                            <h1 style="margin:0;color:#ffffff;font-size:28px;letter-spacing:0.5px;">
                            FlipEarn
                            </h1>
                            <p style="margin:8px 0 0;color:#e0e7ff;font-size:14px;">
                            Buy • Sell • Earn Securely
                            </p>
                        </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                        <td style="padding:30px;color:#1f2937;">
                            <h2 style="margin-top:0;color:#111827;">
                            🎉 Purchase Successful!
                            </h2>

                            <p style="font-size:15px;line-height:1.6;color:#374151;">
                            Thank you for purchasing the account
                            <strong style="color:#4f46e5;">@${
															listing.username
														}</strong>
                            on the <strong>${
															listing.platform
														}</strong> platform.
                            </p>

                            <p style="font-size:15px;line-height:1.6;color:#374151;">
                            Below are your updated credentials. Please keep them safe and do not share them with anyone.
                            </p>

                            <!-- Credentials Box -->
                            <div style="margin:25px 0;padding:20px;background:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;">
                            <h3 style="margin-top:0;color:#4f46e5;">🔐 Account Credentials</h3>

                            ${credential.updatedCredential
															.map(
																(cred) => `
                                <p style="margin:8px 0;font-size:14px;color:#111827;">
                                    <strong>${cred.name}:</strong>
                                    <span style="color:#374151;">${cred.value}</span>
                                </p>
                                `
															)
															.join("")}
                            </div>

                            <p style="font-size:14px;color:#4b5563;line-height:1.6;">
                            If you have any questions or need assistance, feel free to contact our support team.
                            </p>

                            <p style="margin-top:20px;">
                            <a href="mailto:gps.96169@gmail.com"
                                style="display:inline-block;padding:12px 22px;background:#4f46e5;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;">
                                Contact Support
                            </a>
                            </p>

                             <!-- Signature -->
                            <div style="margin-top:40px;text-align:right;">
                                <img
                                src="https://private-user-images.githubusercontent.com/98226958/530554865-3124acc2-198b-4abe-9dc8-3e0b90e717a7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njc4ODI5NTUsIm5iZiI6MTc2Nzg4MjY1NSwicGF0aCI6Ii85ODIyNjk1OC81MzA1NTQ4NjUtMzEyNGFjYzItMTk4Yi00YWJlLTlkYzgtM2UwYjkwZTcxN2E3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjAxMDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwMTA4VDE0MzA1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMxNWU4NGMyMDA1MTdiYTI3YzI5NmI1NWNhMmZjYmMxN2YzMDY4Y2FjNTZjYTExZWZhODk2Y2M5MTQxZDExMjMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.2MPniEFoQyaOQLEv1OK6o1WUjrcB14LIk_ryjN66SpU"
                                alt="Gyan Pratap Singh Signature"
                                style="width:180px;height:auto;object-fit:contain;"
                                />
                            </div>
                        </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                        <td style="background:#f3f4f6;padding:20px;text-align:center;">
                            <p style="margin:0;font-size:12px;color:#6b7280;">
                            © ${new Date().getFullYear()} FlipEarn. All rights reserved.
                            </p>
                            <p style="margin:6px 0 0;font-size:12px;color:#6b7280;">
                            Built with ❤️ by Gyan Pratap Singh
                            </p>
                        </td>
                        </tr>

                    </table>
                    </td>
                </tr>
                </table>
            </div>
            `,
		});
	}
);

// inngest function to send new credential for deleted listings
const sendNewCredentials = inngest.createFunction(
	{ id: "send-new-credentials" },
	{ event: "app/listing-deleted" },
	async ({ event }) => {
		const { listing, listingId } = event.data;

		const newCredential = await prisma.credential.findFirst({
			where: { listingId },
		});
		if (newCredential) {
			// await sendEmail({
			//     to: listing.owner.email,
			//     subject: "New Credentials for your deleted listing",
			//     html: `

			//     h2
			//     <h2>Your new credentials for your deleted listing :</h2>
			//     title : ${listing.title}
			//     <br />
			//     username : ${listing.username}
			//     <br />
			//     platfoem : ${listing.platform}
			//     <br />
			//     <h3>new credentials</h3>
			//     <div>
			//     ${newCredential.updatedCredential.map((cred)=> `<p>${cred.name} : ${cred.value} </p>`).join("")}
			//     </div>

			//     <h3>Old Credentials</h3>
			//      <div>
			//     ${newCredential.originalCredential.map((cred)=> `<p>${cred.name} : ${cred.value} </p>`).join("")}
			//     </div>

			//      <p>If you have any question, please contact us at <a href="mailto:gps.96169@gmail.com">support@flipearn.com</a></p>
			//     `
			// })
			await sendEmail({
				to: listing.owner.email,
				subject: "🔔 New Credentials for Your Deleted FlipEarn Listing",
				html: `
            <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                        <!-- Banner -->
                        <tr>
                        <td style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:30px;text-align:center;">
                            <h1 style="margin:0;color:#ffffff;font-size:28px;">FlipEarn</h1>
                            <p style="margin:8px 0 0;color:#e0e7ff;font-size:14px;">
                            Secure Account Marketplace
                            </p>
                        </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                        <td style="padding:30px;color:#1f2937;">
                            <h2 style="margin-top:0;color:#111827;">
                            🔐 Credentials Update Notice
                            </h2>

                            <p style="font-size:15px;line-height:1.6;color:#374151;">
                            Your listing has been removed from FlipEarn. Below are the
                            <strong>updated credentials</strong> generated for your account.
                            </p>

                            <!-- Listing Info -->
                            <div style="margin:20px 0;padding:18px;background:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;">
                            <p style="margin:6px 0;font-size:14px;">
                                <strong>Title:</strong> ${listing.title}
                            </p>
                            <p style="margin:6px 0;font-size:14px;">
                                <strong>Username:</strong> @${listing.username}
                            </p>
                            <p style="margin:6px 0;font-size:14px;">
                                <strong>Platform:</strong> ${listing.platform}
                            </p>
                            </div>

                            <!-- New Credentials -->
                            <div style="margin:25px 0;padding:20px;background:#ecfeff;border-radius:10px;border:1px solid #67e8f9;">
                            <h3 style="margin-top:0;color:#0369a1;">🆕 New Credentials</h3>
                            ${newCredential.updatedCredential
															.map(
																(cred) => `
                                <p style="margin:8px 0;font-size:14px;color:#0f172a;">
                                    <strong>${cred.name}:</strong> ${cred.value}
                                </p>
                                `
															)
															.join("")}
                            </div>

                            <!-- Old Credentials -->
                            <div style="margin:25px 0;padding:20px;background:#fff7ed;border-radius:10px;border:1px solid #fed7aa;">
                            <h3 style="margin-top:0;color:#c2410c;">📁 Old Credentials</h3>
                            ${newCredential.originalCredential
															.map(
																(cred) => `
                                <p style="margin:8px 0;font-size:14px;color:#1f2937;">
                                    <strong>${cred.name}:</strong> ${cred.value}
                                </p>
                                `
															)
															.join("")}
                            </div>

                            <p style="font-size:14px;color:#4b5563;line-height:1.6;">
                            For security reasons, please update your account details wherever necessary.
                            </p>

                            <p style="margin-top:20px;">
                            <a href="mailto:support@flipearn.com"
                                style="display:inline-block;padding:12px 22px;background:#4f46e5;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;">
                                Contact FlipEarn Support
                            </a>
                            </p>
                            <!-- Signature -->
                        <div style="margin-top:40px;text-align:right;">
                            <img
                            src="https://private-user-images.githubusercontent.com/98226958/530554865-3124acc2-198b-4abe-9dc8-3e0b90e717a7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njc4ODI5NTUsIm5iZiI6MTc2Nzg4MjY1NSwicGF0aCI6Ii85ODIyNjk1OC81MzA1NTQ4NjUtMzEyNGFjYzItMTk4Yi00YWJlLTlkYzgtM2UwYjkwZTcxN2E3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjAxMDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwMTA4VDE0MzA1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMxNWU4NGMyMDA1MTdiYTI3YzI5NmI1NWNhMmZjYmMxN2YzMDY4Y2FjNTZjYTExZWZhODk2Y2M5MTQxZDExMjMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.2MPniEFoQyaOQLEv1OK6o1WUjrcB14LIk_ryjN66SpU"
                            alt="Gyan Pratap Singh Signature"
                            style="width:180px;height:auto;object-fit:contain;"
                            />
                        </div>
                        </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                        <td style="background:#f3f4f6;padding:20px;text-align:center;">
                            <p style="margin:0;font-size:12px;color:#6b7280;">
                            © ${new Date().getFullYear()} FlipEarn. All rights reserved.
                            </p>
                            <p style="margin:6px 0 0;font-size:12px;color:#6b7280;">
                            Built with ❤️ by Gyan Pratap Singh
                            </p>
                        </td>
                        </tr>

                    </table>
                    </td>
                </tr>
                </table>
            </div>
            `,
			});
		}
	}
);


const sendListingCreatedEmail = inngest.createFunction(
  { id: "send-listing-created-email" },
  { event: "app/listing.created" },
  async ({ event }) => {
    const { listingId } = event.data;

    const listing = await prisma.listing.findFirst({
      where: { id: listingId },
      include: { owner: true },
    });

    if (!listing) return;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    /* ================= OWNER EMAIL ================= */
    await sendEmail({
      to: listing.owner.email,
      subject: "✅ Your FlipEarn Listing Has Been Created",
      html: `
      <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                <!-- Banner -->
                <tr>
                  <td style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:30px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:28px;">FlipEarn</h1>
                    <p style="margin:8px 0 0;color:#e0e7ff;font-size:14px;">
                      Buy • Sell • Earn Securely
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:30px;color:#1f2937;">
                    <h2 style="margin-top:0;color:#111827;">🎉 Listing Created Successfully!</h2>

                    <p style="font-size:15px;line-height:1.6;color:#374151;">
                      Hi <strong>${listing.owner.name}</strong>,<br />
                      Your listing has been successfully created on FlipEarn.
                    </p>

                    <!-- Listing Info -->
                    <div style="margin:25px 0;padding:20px;background:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;">
                      <h3 style="margin-top:0;color:#4f46e5;">📄 Listing Details</h3>
                      <p><strong>Title:</strong> ${listing.title}</p>
                      <p><strong>Username:</strong> @${listing.username}</p>
                      <p><strong>Platform:</strong> ${listing.platform}</p>
                      <p><strong>Status:</strong>
                        <span style="color:#f59e0b;font-weight:bold;">Pending Verification</span>
                      </p>
                    </div>

                    <p style="font-size:14px;color:#4b5563;">
                      Our admin team will review and verify your listing shortly.
                    </p>

                    <p style="margin-top:20px;">
                      <a href="mailto:support@flipearn.com"
                        style="display:inline-block;padding:12px 22px;background:#4f46e5;color:#ffffff;text-decoration:none;border-radius:999px;font-size:14px;">
                        Contact Support
                      </a>
                    </p>

                    <!-- Signature -->
                    <div style="margin-top:40px;text-align:right;">
                      <img
                        src="https://private-user-images.githubusercontent.com/98226958/530554865-3124acc2-198b-4abe-9dc8-3e0b90e717a7.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njc4ODI5NTUsIm5iZiI6MTc2Nzg4MjY1NSwicGF0aCI6Ii85ODIyNjk1OC81MzA1NTQ4NjUtMzEyNGFjYzItMTk4Yi00YWJlLTlkYzgtM2UwYjkwZTcxN2E3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjAxMDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwMTA4VDE0MzA1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTMxNWU4NGMyMDA1MTdiYTI3YzI5NmI1NWNhMmZjYmMxN2YzMDY4Y2FjNTZjYTExZWZhODk2Y2M5MTQxZDExMjMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.2MPniEFoQyaOQLEv1OK6o1WUjrcB14LIk_ryjN66SpU"
                        alt="Gyan Pratap Singh Signature"
                        style="width:180px;height:auto;object-fit:contain;"
                      />
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f3f4f6;padding:20px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#6b7280;">
                      © ${new Date().getFullYear()} FlipEarn. All rights reserved.
                    </p>
                    <p style="margin:6px 0 0;font-size:12px;color:#6b7280;">
                      Built with ❤️ by Gyan Pratap Singh
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
      `,
    });

    /* ================= ADMIN EMAIL ================= */
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: "🚨 New Listing Created on FlipEarn",
      html: `
      <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                <!-- Banner -->
                <tr>
                  <td style="background:linear-gradient(135deg,#ef4444,#f97316);padding:30px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:28px;">FlipEarn Admin</h1>
                    <p style="margin:8px 0 0;color:#fee2e2;font-size:14px;">
                      New Listing Alert
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:30px;color:#1f2937;">
                    <h2 style="margin-top:0;color:#111827;">🚨 New Listing Added</h2>

                    <div style="margin:25px 0;padding:20px;background:#fef2f2;border-radius:10px;border:1px solid #fecaca;">
                      <p><strong>Owner:</strong> ${listing.owner.name}</p>
                      <p><strong>Email:</strong> ${listing.owner.email}</p>
                      <p><strong>Title:</strong> ${listing.title}</p>
                      <p><strong>Username:</strong> @${listing.username}</p>
                      <p><strong>Platform:</strong> ${listing.platform}</p>
                    </div>

                    <p style="font-size:14px;color:#4b5563;">
                      Please review and verify this listing from the admin dashboard.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f3f4f6;padding:20px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#6b7280;">
                      © ${new Date().getFullYear()} FlipEarn Admin Panel
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
      `,
    });
  }
);




// mail to the admin when user submitted credentials
const sendCredentialSubmittedEmail = inngest.createFunction(
  { id: "send-credential-submitted-email" },
  { event: "app/credential.submitted" },
  async ({ event }) => {
    const { listingId } = event.data;

    const listing = await prisma.listing.findFirst({
      where: { id: listingId },
      include: {
        owner: true,
      },
    });

    if (!listing) return;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const VERIFY_URL = `${process.env.ADMIN_DASHBOARD_URL}/admin/verify-credentials?listingId=${listingId}`;

    await sendEmail({
      to: ADMIN_EMAIL,
      subject: "🔐 Credentials Submitted – Verification Required",
      html: `
      <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0"
                style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                <!-- Banner -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0ea5e9,#2563eb);padding:30px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:28px;">FlipEarn Admin</h1>
                    <p style="margin:8px 0 0;color:#dbeafe;font-size:14px;">
                      Credential Verification Required
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:30px;color:#1f2937;">
                    <h2 style="margin-top:0;color:#111827;">
                      🔐 Credentials Submitted
                    </h2>

                    <p style="font-size:15px;line-height:1.6;color:#374151;">
                      A user has submitted credentials for the following listing.
                      Please review and verify them.
                    </p>

                    <!-- Listing Info -->
                    <div style="margin:25px 0;padding:20px;background:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;">
                      <p><strong>Owner:</strong> ${listing.owner.name}</p>
                      <p><strong>Email:</strong> ${listing.owner.email}</p>
                      <p><strong>Title:</strong> ${listing.title}</p>
                      <p><strong>Username:</strong> @${listing.username}</p>
                      <p><strong>Platform:</strong> ${listing.platform}</p>
                    </div>

                    <!-- Verify Button -->
                    <div style="text-align:center;margin:35px 0;">
                      <a href="${VERIFY_URL}"
                        style="display:inline-block;padding:14px 30px;
                        background:#2563eb;color:#ffffff;
                        text-decoration:none;border-radius:999px;
                        font-size:15px;font-weight:bold;">
                        ✅ Verify Credentials
                      </a>
                    </div>

                    <p style="font-size:13px;color:#6b7280;text-align:center;">
                      Please ensure credentials are valid before approving.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f3f4f6;padding:20px;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#6b7280;">
                      © ${new Date().getFullYear()} FlipEarn Admin Panel
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
      `,
    });
  }
);




// Create an empty array where we'll export future Inngest functions
export const functions = [
	syncUserCreation,
	syncUserDeletion,
	syncUserUpdation,
	sendPurchseEmail,
	sendNewCredentials,
  sendListingCreatedEmail,
  sendCredentialSubmittedEmail,
];
