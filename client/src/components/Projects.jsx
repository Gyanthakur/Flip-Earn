import React, { useState } from "react";
import { Github, Linkedin, Mail, MessageCircleCode, ExternalLink, Code2, Zap, Globe, ArrowRight } from "lucide-react";

export default function Portfolio() {
	const [hoveredProject, setHoveredProject] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState("all");

	
	const projects = [
		{
			name: "Edemy LMS",
			description:
			"Edemy LMS is a full-featured Learning Management System designed for educators and learners. It enables course creation, student management, progress tracking, and efficient content delivery with a modern, responsive, and user-friendly interface.",
			image: "/projectImg/edemylms.png",
			repo: "https://github.com/Gyanthakur/Edemy-LMS",
			demo: "https://edemy-lms-gps.vercel.app/",
			tags: ["React", "Node.js", "MongoDB"],
			icon: "📚",
			category: "education"
		},
		{
			name: "Clear Background",
			description:
			"Clear Background is an AI-powered tool that removes image backgrounds seamlessly. It offers fast processing, high-quality results, and an intuitive interface, making it ideal for designers, creators, and professional visual workflows.",
			image: "/projectImg/clearbackground.png",
			repo: "https://github.com/Gyanthakur/ClearBg",
			demo: "https://clear-bg.vercel.app/",
			tags: ["ClipDrop", "React", "AI"],
			icon: "🎨",
			category: "ai"
		},
		{
			name: "Cure Connect",
			description:
			"Cure Connect is a healthcare platform that connects patients and medical professionals. It provides features such as appointment scheduling, medical consultations, and health tracking to improve accessibility and streamline healthcare communication.",
			image: "/projectImg/cureconnect.png",
			repo: "https://github.com/Gyanthakur/CureConnect",
			demo: "https://cureconnect-6t81.onrender.com/",
			tags: ["MERN", "Stripe", "MongoDB"],
			icon: "⚕️",
			category: "healthcare"
		},
		{
			name: "Image Generator",
			description:
			"Image Generator is an AI-driven application that creates high-resolution images from text prompts. It supports customizable styles and creative flexibility, making it useful for designers, marketers, and content creators.",
			image: "/projectImg/imagegenerator.png",
			repo: "https://github.com/Gyanthakur/ImageGenesis",
			demo: "https://image-genesis.onrender.com/",
			tags: ["AI/ML", "React", "Stable Diffusion"],
			icon: "🖼️",
			category: "ai"
		},
		{
			name: "Dev Profiles",
			description:
			"Dev Profiles is a developer portfolio and profile management platform that allows users to showcase their skills, projects, and social links, helping them build a strong and professional online presence.",
			image: "/projectImg/devprofiles.png",
			repo: "https://github.com/Gyanthakur/Dev_Profiles",
			demo: "https://dev-profile-smoky.vercel.app",
			tags: ["Html", "Css", "JavaScript"],
			icon: "👨‍💻",
			category: "portfolio"
		},
		{
			name: "Career Mentorship App",
			description:
			"A next-generation mentorship platform that connects learners with industry professionals worldwide. Experts can share knowledge and grow revenue, while learners explore categories, follow roadmaps, and advance their careers.",
			image: "/projectImg/careermentorshipapp.png",
			repo: "https://github.com/Gyanthakur/career-mentorship-app",
			demo: "https://career-mentorship-app.vercel.app/",
			tags: ["React", "Express", "MongoDB"],
			icon: "🎓",
			category: "education"
		},
		{
			name: "AgriConnect",
			description:
			"AgriConnect is a full-stack agricultural platform built to streamline services for farmers and merchants. It features role-based logins with tailored functionalities to improve agricultural trade and communication.",
			image: "/projectImg/agriconnect.png",
			repo: "https://github.com/Gyanthakur/AgriConnect",
			demo: "https://agri-connect-nu.vercel.app/",
			tags: ["MERN", "Stripe", "Twilio"],
			icon: "🌾",
			category: "saas"
		},
		{
			name: "Notes Store",
			description:
			"Notes Store is a modern notes management application that allows users to create, edit, delete, and share notes seamlessly. Built with modern web technologies, it focuses on productivity and ease of use.",
			image: "/projectImg/notesstore.png",
			repo: "https://github.com/Gyanthakur/notes_store",
			demo: "https://notes-store-app.vercel.app/",
			tags: ["Next.js", "Tailwind", "Convex"],
			icon: "📝",
			category: "tools"
		},
		{
			name: "User Stats",
			description:
			"User Stats is a GitHub achievements finder that lets users explore GitHub profiles, repositories, and achievements. It provides an engaging way to visualize a developer’s GitHub journey.",
			image: "/projectImg/userstats.png",
			repo: "https://github.com/Gyanthakur/User-Stats",
			demo: "https://user-stats-zeta.vercel.app/",
			tags: ["React", "GitHub API", "Chart.js"],
			icon: "📊",
			category: "tools"
		},
		{
			name: "My Certificates",
			description:
			"My Certificates is a secure certificate management platform where users can view certificates and admins can authenticate, upload, and manage records efficiently with a responsive user interface.",
			image: "/projectImg/mycertificates.png",
			repo: "https://github.com/Gyanthakur/My-Certificates",
			demo: "https://my-certificates-mu.vercel.app/",
			tags: ["Next.js", "JWT", "Cloudinary"],
			icon: "🏆",
			category: "saas"
		},
		{
			name: "Git Practice",
			description:
			"Git Practice is an interactive learning tool designed to help users master Git commands through a guided CLI experience with instant feedback and clear explanations.",
			image: "/projectImg/gitpractice.png",
			repo: "https://github.com/Gyanthakur/Git-Practice",
			demo: "https://git-practice-umber.vercel.app/",
			tags: ["Node.js", "CLI", "Git"],
			icon: "🔧",
			category: "tools"
		},
		{
			name: "Chat App",
			description:
			"A real-time chat application supporting one-on-one and group conversations, notifications, and media sharing. It delivers a smooth and interactive communication experience.",
			image: "/projectImg/chatapp.png",
			repo: "https://github.com/Gyanthakur/chat-app",
			demo: "https://chat-app-sable-delta.vercel.app/",
			tags: ["Socket.io", "React", "Firebase"],
			icon: "💬",
			category: "saas"
		}
	];


	const categories = ["all", "education", "portfolio", "saas", "tools", "ai", "healthcare"];
	const filteredProjects = selectedCategory === "all" 
		? projects 
		: projects.filter(p => p.category === selectedCategory);

	return (
		<>
			{/* ================= PROJECTS SECTION ================= */}
			<section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-20 px-4 overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
					<div className="absolute top-1/2 -left-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
				</div>

				<div className="relative max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<div className="inline-flex items-center gap-2 bg-blue-100/50 px-4 py-2 rounded-full mb-6 border border-blue-200">
							<Code2 size={16} className="text-blue-600" />
							<span className="text-sm font-semibold text-blue-600">Featured Work</span>
						</div>
						<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
							My Projects
						</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Crafted with precision and passion, each project demonstrates my expertise in modern web development
						</p>
					</div>

					{/* Category Filter */}
					<div className="flex justify-center gap-2 mb-12 flex-wrap">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`px-4 py-2 rounded-full font-semibold transition capitalize text-sm ${
									selectedCategory === cat
										? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
										: "bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-400"
								}`}
							>
								{cat}
							</button>
						))}
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredProjects.map((project) => (
							<div
								key={project.name}
								onMouseEnter={() => setHoveredProject(project.name)}
								onMouseLeave={() => setHoveredProject(null)}
								className="group bg-white rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
							>
								{/* Image Container */}
								<div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
									<img
										src={project.image}
										alt={project.name}
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>

									{/* Icon Badge */}
									<div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xl shadow-lg">
										{project.icon}
									</div>

									{/* Dark Overlay - Desktop Hover */}
									<div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-end justify-between p-4">
										<a
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-blue-50 hover:text-teal-500 transition transform hover:scale-105"
										>
											<Globe size={16} className="text-green-500"/>
											Live Demo
										</a>
										<a
											href={project.repo}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition transform hover:scale-105"
										>
											<Github size={16} />
										</a>
									</div>
								</div>

								{/* Content */}
								<div className="p-6 flex flex-col flex-grow">
									<h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
										{project.name}
									</h2>

									<p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
										{project.description}
									</p>

									{/* Tags */}
									<div className="flex flex-wrap gap-2 mb-4">
										{project.tags.map((tag) => (
											<span
												key={tag}
												className="inline-block px-2 py-1 bg-blue-100/50 text-blue-700 text-xs font-medium rounded-md border border-blue-200 transition hover:bg-blue-100"
											>
												{tag}
											</span>
										))}
									</div>

									{/* Mobile Action Buttons */}
									<div className="flex gap-2 md:hidden">
										<a
											href={project.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
										>
											<Globe size={16} className="text-green-500" />
											Live Demo
										</a>
										<a
											href={project.repo}
											target="_blank"
											rel="noopener noreferrer"
											className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition"
										>
											<Github size={16} />
											Code
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ================= STATS SECTION ================= */}
			<section className="relative bg-white py-16 px-4 border-t-2 border-b-2 border-gray-200">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-4 gap-8">
						{[
							{ number: "12+", label: "Projects Completed" },
							{ number: "100%", label: "Code Quality" },
							{ number: "9+", label: "Technologies" },
							{ number: "2+", label: "Years Experience" }
						].map((stat, idx) => (
							<div key={idx} className="text-center p-4">
								<div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
									{stat.number}
								</div>
								<div className="text-gray-700 font-semibold">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ================= ABOUT ME SECTION ================= */}
			<section className="relative bg-white py-24 px-4 overflow-hidden">
				{/* Background Elements */}
				<div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30 -z-10"></div>

				<div className="relative max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Left Content */}
						<div className="space-y-8 order-2 md:order-1">
							<div>
								<div className="inline-flex items-center gap-2 bg-indigo-100/50 px-4 py-2 rounded-full mb-6 border border-indigo-200">
									<Zap size={16} className="text-indigo-600" />
									<span className="text-sm font-semibold text-indigo-600">About Me</span>
								</div>
								<h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
									Gyan Pratap <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Singh</span>
								</h2>
							</div>

							<div className="space-y-4">
								<p className="text-lg text-gray-700 leading-relaxed">
									I'm a Computer Science undergraduate and passionate Full-Stack Web Developer focused on building scalable, user-centric applications using modern technologies.
								</p>

								<p className="text-lg text-gray-700 leading-relaxed">
									With hands-on experience in real-world projects, internships, and open-source contributions, I emphasize clean code, performance optimization, and intuitive UI/UX design.
								</p>
							</div>

							{/* Skills Grid */}
							<div className="grid grid-cols-2 gap-4 pt-4">
								<div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-4">
									<div className="text-sm font-semibold text-blue-900 mb-1">Frontend</div>
									<div className="text-xs text-blue-700">React, Next.js, Tailwind</div>
								</div>
								<div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200 rounded-xl p-4">
									<div className="text-sm font-semibold text-indigo-900 mb-1">Backend</div>
									<div className="text-xs text-indigo-700">Node.js, Express, MongoDB</div>
								</div>
								<div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-xl p-4">
									<div className="text-sm font-semibold text-purple-900 mb-1">Tools</div>
									<div className="text-xs text-purple-700">Git, Docker, AWS</div>
								</div>
								<div className="bg-gradient-to-br from-pink-50 to-pink-100/50 border border-pink-200 rounded-xl p-4">
									<div className="text-sm font-semibold text-pink-900 mb-1">Databases</div>
									<div className="text-xs text-pink-700">PostgreSQL, Firebase, Supabase</div>
								</div>
							</div>

							{/* Social Icons */}
							<div className="flex gap-3 pt-6 hidden md:flex">
								<a
									href="https://github.com/Gyanthakur"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-3 rounded-full border border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition"
									title="GitHub"
								>
									<Github size={20} />
								</a>

								<a
									href="https://www.linkedin.com/in/gyan-pratap-singh-275785236/"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-3 rounded-full border border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition"
									title="LinkedIn"
								>
									<Linkedin size={20} />
								</a>

								<a
									href="https://wa.me/918957818597?text=Hey%20%F0%9F%91%8B%2C%20how%20can%20I%20help%20you%3F"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-3 rounded-full border border-gray-300 text-gray-700 hover:border-green-600 hover:bg-green-600 hover:text-white transition"
									title="WhatsApp"
								>
									<MessageCircleCode size={20} />
								</a>

								<a
									href="mailto:gps.96169@gmail.com"
									className="group p-3 rounded-full border border-gray-300 text-gray-700 hover:border-red-600 hover:bg-red-600 hover:text-white transition"
									title="Email"
								>
									<Mail size={20} />
								</a>
							</div>
						</div>

						{/* Right - Profile Image */}
						<div className="flex justify-center md:justify-end relative order-1 md:order-2">
							{/* Animated Background */}
							<div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

							<div className="relative">
								<img
									src="/profile.png"
									alt="Gyan Pratap Singh"
									className="w-72 h-72 rounded-3xl object-cover border-4 border-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
								/>

								{/* Decorative Elements */}
								<div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-2xl blur-xl"></div>
								<div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-500/20 rounded-2xl blur-xl"></div>
							</div>
						</div>
					</div>

					{/* Mobile Social Icons - Below Image */}
					<div className="flex md:hidden justify-center gap-3 pt-8 mt-8 border-t border-gray-200">
						<a
							href="https://github.com/Gyanthakur"
							target="_blank"
							rel="noopener noreferrer"
							className="group p-3 rounded-full border border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition"
							title="GitHub"
						>
							<Github size={20} />
						</a>

						<a
							href="https://www.linkedin.com/in/gyan-pratap-singh-275785236/"
							target="_blank"
							rel="noopener noreferrer"
							className="group p-3 rounded-full border border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition"
							title="LinkedIn"
						>
							<Linkedin size={20} />
						</a>

						<a
							href="https://wa.me/918957818597?text=Hey%20%F0%9F%91%8B%2C%20how%20can%20I%20help%20you%3F"
							target="_blank"
							rel="noopener noreferrer"
							className="group p-3 rounded-full border border-gray-300 text-gray-700 hover:border-green-600 hover:bg-green-600 hover:text-white transition"
							title="WhatsApp"
						>
							<MessageCircleCode size={20} />
						</a>

						<a
							href="mailto:gps.96169@gmail.com"
							className="group p-3 rounded-full border border-gray-300 text-gray-700 hover:border-red-600 hover:bg-red-600 hover:text-white transition"
							title="Email"
						>
							<Mail size={20} />
						</a>
					</div>
				</div>
			</section>
			
			{/* ================= CTA SECTION ================= */}
			<section className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 py-20 px-4 overflow-hidden border-t-2 border-gray-200">
				<div className="absolute inset-0 opacity-20">
					<div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
				</div>

				<div className="relative max-w-4xl mx-auto text-center">
					<h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
						Let's Create Something Amazing
					</h2>
					<p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
						Have a project in mind? Let's collaborate and bring your ideas to life.
					</p>
					<a
						href="mailto:gps.96169@gmail.com"
						className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-300/50 transition transform hover:scale-105"
					>
						<Mail size={20} />
						Start a Project
						<ArrowRight size={20} />
					</a>
				</div>
			</section>
		</>
	);
}