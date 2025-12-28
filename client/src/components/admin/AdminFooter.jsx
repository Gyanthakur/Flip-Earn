import React, { useState } from "react";
import { toast } from "react-toastify";
import { Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import Logger from "../Logger";

const AdminFooter = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email) {
			alert("Please enter an email");
			return;
		}
		toast.success(`Subscribed email: ${email}`);
		setEmail("");
	};
	return (
		<>
			<footer className="mt-24 px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm bg-slate-50 pt-10 border-t border-slate-200">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
					<div className="sm:col-span-2 lg:col-span-1">
						<h1 className="text-2xl font-bold text-slate-900 mb-2">flipεarn</h1>
						<p className="text-sm/7 mt-6 text-slate-600">
							Manage and monitor your social media marketplace. Oversee brands,
							customers, and platform analytics with our comprehensive admin
							dashboard.
						</p>
					</div>
					<div className="flex flex-col lg:items-center lg:justify-center">
						<div className="flex flex-col text-sm space-y-2.5">
							<h2 className="font-semibold mb-5 text-slate-900">Admin Links</h2>
							<a
								className="hover:text-indigo-600 transition text-slate-700"
								href="#"
							>
								Dashboard
							</a>
							<a
								className="hover:text-indigo-600 transition text-slate-700"
								href="#"
							>
								Users Management
							</a>
							<a
								className="hover:text-indigo-600 transition text-slate-700"
								href="#"
							>
								Analytics
							</a>
							<a
								className="hover:text-indigo-600 transition text-slate-700"
								href="#"
							>
								Settings
							</a>
							<a
								className="hover:text-indigo-600 transition text-slate-700"
								href="#"
							>
								Reports
							</a>
							<a
								className="hover:text-indigo-600 transition text-slate-700"
								href="#"
							>
								Support
							</a>
						</div>
					</div>
					<div>
						<div className=" flex items-center justify-center bg-slate-100 rounded-lg px-1 py-2 gap-2 w-fit">
							<h2 className="flex font-semibold text-slate-900  mb-">
								Flipearn
							</h2>
							<Logger />
						</div>
						<div className="mt-6">
							<h3 className="font-semibold text-slate-900 mb-4">Contact</h3>
							<div className="flex gap-3">
								<a
									href="https://github.com/Gyanthakur"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-2 rounded-full border border-slate-300 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition"
									title="GitHub"
								>
									<Github size={20} />
								</a>

								<a
									href="https://www.linkedin.com/in/gyan-pratap-singh-275785236/"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-2 rounded-full border border-slate-300 text-slate-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition"
									title="LinkedIn"
								>
									<Linkedin size={20} />
								</a>

								<a
									href="https://wa.me/918957818597?text=Hey%20%F0%9F%91%8B%2C%20how%20can%20I%20help%20you%3F"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-2 rounded-full border border-slate-300 text-slate-600 hover:border-green-600 hover:bg-green-600 hover:text-white transition"
									title="WhatsApp"
								>
									<MessageCircle size={20} />
								</a>

								<a
									href="https://www.instagram.com/gyanpratapsingh_"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-2 rounded-full border border-slate-300 text-slate-600 hover:border-pink-600 hover:bg-pink-600 hover:text-white transition"
									title="Instagram"
								>
									<Instagram size={20} />
								</a>

								<a
									href="mailto:gps.96169@gmail.com"
									className="group p-2 rounded-full border border-slate-300 text-slate-600 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition"
									title="Email"
								>
									<Mail size={20} />
								</a>
							</div>
						</div>
					</div>
				</div>
				<p className="py-4 text-center border-t mt-6 border-slate-200 text-slate-600">
					Copyright 2025 © GPS Admin Panel. All Rights Reserved.
				</p>
			</footer>
		</>
	);
};

export default AdminFooter;
