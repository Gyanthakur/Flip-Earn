import React, { useState } from "react";
import { ChevronDown, Home, Zap, ShoppingCart, FileText, MessageCircle, DollarSign, Upload, Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Documentation = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();

  const sections = [
    {
      id: "home",
      icon: Home,
      title: "Home Page",
      emoji: "🏠",
      color: "from-blue-500 to-cyan-500",
      description: "The Home page is the entry point of FlipEarn. Here you can search for social media accounts by platform name (Instagram, YouTube, Twitter, etc.), explore featured and latest listings, and quickly navigate to Marketplace, Messages, and My Listings.",
      details: [
        "Search for social media accounts by platform name (Instagram, YouTube, Twitter, etc.)",
        "Explore featured and latest listings",
        "Quickly navigate to Marketplace, Messages, and My Listings",
        "Simply type a platform name in the search input and click Search to find relevant listings"
      ]
    },
    {
      id: "getstarted",
      icon: Zap,
      title: "Get Started – Sell Your Social Accounts",
      emoji: "🚀",
      color: "from-purple-500 to-pink-500",
      description: "Sell your Social Accounts With Confidence & Earn Money. Clicking the Get Started Today button redirects you to the Marketplace page where all listings are displayed.",
      details: [
        "Click the 'Get Started Today' button to access the marketplace",
        "View all available listings with details about platform, followers, and price",
        "Start exploring opportunities to buy or sell immediately",
        "Get started with a simple click and begin your trading journey"
      ]
    },
    {
      id: "marketplace",
      icon: ShoppingCart,
      title: "Marketplace",
      emoji: "🛒",
      color: "from-blue-600 to-purple-600",
      description: "The Marketplace is where all social media account listings are displayed. Browse through various accounts, filter by your preferences, and find the perfect account to purchase.",
      details: [
        "Browse all listings with platform, followers, and price information",
        "Filter listings by niche, platform, or price range",
        "Click 'More Details' to view full information about each listing",
        "See seller ratings and account engagement metrics",
        "Compare multiple listings side by side"
      ]
    },
    {
      id: "details",
      icon: FileText,
      title: "Listing Details",
      emoji: "📄",
      color: "from-indigo-600 to-purple-600",
      description: "When you click on a listing, you'll see the complete details page with all information about the social media account. This is where you can review everything before deciding to purchase.",
      details: [
        "Account platform and engagement details (followers, engagement rate, etc.)",
        "Price and uploaded screenshots as proof",
        "Seller information and contact details",
        "Detailed description of the account niche and audience",
        "Use the 'Chat' button to talk with the seller before purchasing",
        "Review any previous reviews or ratings from other buyers"
      ]
    },
    {
      id: "chat",
      icon: MessageCircle,
      title: "Chat & Communication",
      emoji: "💬",
      color: "from-indigo-500 to-blue-500",
      description: "Secure messaging system allows buyers and sellers to communicate directly. Build trust and resolve any questions before completing a transaction.",
      details: [
        "Ask questions about the account details, history, and authenticity",
        "Clear any doubts or concerns before making a purchase decision",
        "Build trust with the seller through transparent dialogue",
        "Negotiate terms if needed",
        "Share screenshots and additional proof during conversation",
        "Keep a record of all communications for reference"
      ]
    },
    {
      id: "buying",
      icon: DollarSign,
      title: "Buying an Account",
      emoji: "💰",
      color: "from-purple-600 to-indigo-600",
      description: "Follow these simple steps to purchase a social media account securely. The process is straightforward and designed to protect both buyers and sellers.",
      details: [
        "Step 1: Browse listings in the Marketplace to find accounts you're interested in",
        "Step 2: Click 'More Details' to review the complete listing information",
        "Step 3: Chat with the seller to ask questions and clarify details",
        "Step 4: Review the account one final time to ensure it meets your needs",
        "Step 5: Proceed with secure payment through our payment gateway",
        "Step 6: Receive account credentials and access after payment confirmation",
        "Step 7: Transfer account ownership following platform guidelines"
      ]
    },
    {
      id: "selling",
      icon: Upload,
      title: "How to Post Your Social Media Account for Sale",
      emoji: "📤",
      color: "from-indigo-600 to-blue-600",
      description: "Follow these steps carefully to make your account visible to buyers. The process is simple and only takes a few minutes to complete.",
      details: [
        "Step 1: Login to your FlipEarn account with your credentials",
        "Step 2: Go to 'My Listings' from the navigation bar at the top",
        "Step 3: Click on the 'New Listing' button (shown in the interface)",
        "Step 4: Fill all the details in the listing form with accurate information:",
        "    • Platform (Instagram, YouTube, TikTok, Twitter, Telegram, etc.)",
        "    • Username / Handle of the account",
        "    • Niche / Category (lifestyle, gaming, business, etc.)",
        "    • Number of followers and engagement rate",
        "    • Price in your preferred currency",
        "    • Account description and highlights",
        "Step 5: After filling all details, click on the 'Create Listing' button",
        "Step 6: Your listing is created and ready for the next phase"
      ]
    },
    {
      id: "credentials",
      icon: Lock,
      title: "Very Important: Add Credentials",
      emoji: "🔒",
      color: "from-red-500 to-rose-500",
      description: "This is a CRITICAL step. You must add credentials to your listing for admin approval. Without credentials, your listing will NOT be visible to buyers.",
      details: [
        "After creating the listing, you will see a LOCK ICON on your listing",
        "Hover over or click the lock icon to see options",
        "Select 'Add Credentials' from the menu",
        "Submit the account credentials (username and password, or access details)",
        "The admin team will verify your credentials and approve the listing",
        "⚠️ WARNING: If you do not add credentials, the admin will NOT approve your listing",
        "Once credentials are submitted, wait for admin approval (usually 24-48 hours)",
        "Only approved listings are visible for buying and selling",
        "Always upload images/screenshots as proof to increase trust and visibility",
        "Approved listings appear in the marketplace immediately for potential buyers"
      ],
      important: true
    },
    {
      id: "safety",
      icon: Shield,
      title: "Safety & Trust",
      emoji: "🛡️",
      color: "from-teal-500 to-cyan-500",
      description: "FlipEarn prioritizes the safety and security of all transactions. We have multiple safeguards in place to protect both buyers and sellers.",
      details: [
        "Admin verification of all listings before they go live",
        "Credentials are securely stored and only shared with verified buyers",
        "Secure payment system with encryption and fraud protection",
        "Transparent buyer–seller communication through our messaging system",
        "Verification badges for trusted sellers with a good track record",
        "Dispute resolution process in case of any issues",
        "User reviews and ratings to help build community trust",
        "Privacy protection - personal information is never shared publicly",
        "All transactions are recorded for accountability and support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          <span className="text-blue-600">Flip</span><span className="text-black/90">earn</span><span className="text-blue-600">.</span> Documentation
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to use FlipEarn to buy and sell social media accounts securely, communicate with buyers and sellers, and complete transactions with confidence.
        </p>
      </div>

      {/* Main Content - Full Width Column */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;

            return (
              <div
                key={section.id}
                className="group"
              >
                {/* Card */}
                <div className={`relative border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${
                  isExpanded ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}>
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                    className="w-full text-left p-6 focus:outline-none"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color} flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-3xl">{section.emoji}</p>
                            <h2 className="text-2xl font-bold text-gray-900">
                              {section.title}
                            </h2>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-4 border-t border-gray-200">
                      {section.important && (
                        <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
                          <p className="text-red-800 font-bold text-base flex items-center gap-2">
                            <span className="text-2xl">⚠️</span> IMPORTANT
                          </p>
                          <p className="text-red-700 text-sm mt-2">Without completing this step, your listing will not be approved by admin.</p>
                        </div>
                      )}
                      <ul className="space-y-3">
                        {section.details.map((detail, idx) => (
                          <li key={idx} className="flex gap-4 text-gray-700 text-base">
                            <span className={`text-xs flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r ${section.color}`}>
                              {idx + 1}
                            </span>
                            <span className="pt-0.5 leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-lg">
            Explore the marketplace, connect with traders, and start your journey today. All transactions are secure and verified.
          </p>
          <button onClick={()=> {navigate('/marketplace'); scrollTo(0,0)}} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-400/50 transition-all duration-300 transform hover:scale-105">
            Go to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documentation;