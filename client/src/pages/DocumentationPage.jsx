import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Signature from "./Signature";

const DocumentationPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="max-w-7xl mx-auto px-4 py-8">
				{/* Title */}
				<h1 className="text-5xl font-bold text-center mb-4">
					<span className="text-blue-600">Flip</span>
					<span className="text-black/90">earn</span>
					<span className="text-blue-600">.</span> Documentation
				</h1>
				<Link
					to="/docs"
					className="flex items-center justify-center gap-2 mb-5 text-xl sm:text-2xl font-semibold
             text-violet-600 hover:text-blue-600 transition-all duration-150
             hover:scale-105"
				>
					Docs 2
				</Link>

				<p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
					Learn how to use FlipEarn to buy and sell social media accounts
					securely, communicate with buyers and sellers, and complete
					transactions with confidence.
				</p>

				{/* Home Page */}
				<section className="mb-16">
					<h2 className="text-2xl font-semibold mb-4">🏠 Home Page</h2>
					<p className="text-gray-700 leading-relaxed">
						The Home page is the entry point of FlipEarn. Here you can:
					</p>
					<ul className="list-disc ml-6 mt-3 text-gray-700">
						<li>
							Search for social media accounts by platform name (Instagram,
							YouTube, Twitter, etc.).
						</li>
						<li>Explore featured and latest listings.</li>
						<li>Quickly navigate to Marketplace, Messages, and My Listings.</li>
					</ul>
					<p className="mt-3 text-gray-700">
						Simply type a platform name in the search input and click{" "}
						<b>Search</b>
						to find relevant listings.
					</p>
				</section>

				{/* Get Started */}
				<section className="mb-16">
					<h2 className="text-2xl font-semibold mb-4">
						🚀 Get Started – Sell Your Social Accounts
					</h2>
					<blockquote className="border-l-4 border-indigo-500 pl-4 my-4 text-gray-700 italic">
						“Sell your Social Accounts With Confidence & Earn Money”
					</blockquote>
					<p className="text-gray-700">
						Clicking the <b>Get Started Today</b> button redirects you to the
						<b> Marketplace</b> page where all listings are displayed.
					</p>
				</section>

				{/* Marketplace */}
				<section className="mb-16">
					<h2 className="text-2xl font-semibold mb-4">🛒 Marketplace</h2>
					<ul className="list-disc ml-6 mt-3 text-gray-700">
						<li>Browse all listings with platform, followers, and price.</li>
						<li>Filter listings by niche, platform, or price.</li>
						<li>
							Click <b>More Details</b> to view full information.
						</li>
					</ul>
				</section>

				{/* Listing Details */}
				<section className="mb-16">
					<h2 className="text-2xl font-semibold mb-4">📄 Listing Details</h2>
					<ul className="list-disc ml-6 mt-3 text-gray-700">
						<li>Account platform and engagement details.</li>
						<li>Price and uploaded screenshots.</li>
						<li>Seller information.</li>
					</ul>
					<p className="mt-3 text-gray-700">
						Use the <b>Chat</b> button to talk with the seller before
						purchasing.
					</p>
				</section>

				{/* Chat */}
				<section className="mb-16">
					<h2 className="text-2xl font-semibold mb-4">
						💬 Chat & Communication
					</h2>
					<ul className="list-disc ml-6 mt-3 text-gray-700">
						<li>Ask questions about the account.</li>
						<li>Clear doubts before buying.</li>
						<li>Build trust with the seller.</li>
					</ul>
				</section>

				{/* Buying */}
				<section className="mb-16">
					<h2 className="text-2xl font-semibold mb-4">💰 Buying an Account</h2>
					<ol className="list-decimal ml-6 mt-3 text-gray-700">
						<li>Browse listings in the Marketplace.</li>
						<li>Open listing details.</li>
						<li>Chat with the seller.</li>
						<li>Proceed with secure payment.</li>
					</ol>
				</section>

				{/* Selling - Detailed */}
				<section className="mb-16">
					<h2 className="text-2xl font-semibold mb-4">
						📤 How to Post Your Social Media Account for Sale
					</h2>
					<p className="text-gray-700 leading-relaxed">
						Follow these steps carefully to make your account visible to buyers:
					</p>

					<ol className="list-decimal ml-6 mt-4 text-gray-700 space-y-2">
						<li>Login to your FlipEarn account.</li>
						<li>
							Go to <b>My Listings</b> from the navigation bar.
						</li>
						<li>
							Click on the <b>New Listing</b> button (shown in the first image).
						</li>
						<li>
							Fill all the details shown in the listing form (second image),
							such as:
							<ul className="list-disc ml-6 mt-2">
								<li>Platform (Instagram, YouTube, etc.)</li>
								<li>Username / Handle</li>
								<li>Niche / Category</li>
								<li>Followers & engagement</li>
								<li>Price</li>
							</ul>
						</li>
						<li>
							After filling all details, click on the <b>Create Listing</b>{" "}
							button.
						</li>
					</ol>
				</section>

				{/* Important Credential Section */}
				<section className="mb-16">
					<h2 className="text-2xl font-semibold mb-4 text-red-600">
						🔒 Very Important: Add Credentials
					</h2>
					<ul className="list-disc ml-6 text-gray-700 space-y-2">
						<li>
							After creating the listing, you will see a <b>lock icon</b> on
							your listing.
						</li>
						<li>
							Hover over or click the lock icon and select{" "}
							<b>Add Credentials</b>.
						</li>
						<li>
							<b>
								If you do not add credentials, the admin will NOT approve your
								listing.
							</b>
						</li>
						<li>
							Once credentials are submitted, wait for <b>admin approval</b>.
						</li>
						<li>Only approved listings are visible for buying and selling.</li>
						<li>
							If available, always upload <b>images/screenshots</b> as proof to
							increase trust.
						</li>
					</ul>
				</section>

				{/* Safety */}
				<section>
					<h2 className="text-2xl font-semibold mb-4">🛡️ Safety & Trust</h2>
					<ul className="list-disc ml-6 mt-3 text-gray-700">
						<li>Admin verification of listings.</li>
						<li>Secure payment system.</li>
						<li>Transparent buyer–seller communication.</li>
					</ul>
				</section>

				{/* CTA Section */}
				<div className="mt-16 text-center p-8 rounded-xl  border-blue-200">
					<button
						onClick={() => {
							navigate("/create-listing");
							scrollTo(0, 0);
						}}
						className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-400/50 transition-all duration-300 transform hover:scale-105"
					>
						Sell your Platform
					</button>
				</div>
			</div>
			<Signature />
		</>
	);
};

export default DocumentationPage;
