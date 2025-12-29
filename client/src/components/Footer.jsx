import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify';
import { Github, InstagramIcon, Linkedin, Mail, MessageCircleCode } from 'lucide-react';
import Logger from './Logger';

const Footer = () => {

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
       <hr className='ml-30 mr-30 bg-white border-t border-gray-200  text-center mt-4'/>
     <footer className="mt-5 px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <a href="/">
                            <img src={assets.logo} alt="Logo" />
                        </a>
                        <p className="text-sm/7 mt-6">flipearn is a social media marketplace . We are the leading
                            social media marketplace that connects brands with their
                            customers With our user-friendly interface.
                        </p>
                        <img className='w-60 h-25 bg-transparent' src="/flipearnbygyan1.png" alt="Flip-Earn" />
                            <div className="md:hidden lg:hidden flex items-center justify-center rounded-lg mt-4 gap-2 w-fit">
                                 <Logger />
                            </div>
                    </div>
                    
                    <div className="flex flex-col lg:items-center lg:justify-center">
                        <div className="flex flex-col text-sm space-y-2.5">
                            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                            <a className="hover:text-slate-600 transition" href="#">About us</a>
                            <a className="hover:text-slate-600 transition" href="#">Careers<span className="text-xs text-white bg-indigo-600 rounded-md ml-2 px-2 py-1">We’re hiring!</span></a>
                            <a className="hover:text-slate-600 transition" href="#">Contact us</a>
                            <a className="hover:text-slate-600 transition" href="#">Privacy policy</a>
                            <a className="hover:text-slate-600 transition" href="/messages">Messages</a>
                            <a className="hover:text-slate-600 transition" href="/marketplace">Market place</a>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
                        <form onSubmit={handleSubmit} className="text-sm space-y-6 max-w-sm">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center gap-2 p-2 rounded-md bg-indigo-50">
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="bg-white w-full max-w-64 py-2 px-2 rounded outline-none focus:ring-2 ring-indigo-600" />
                            <button type="submit" className="bg-indigo-600 px-4 py-2 text-white rounded hover:bg-indigo-700" > Subscribe </button>
                            </div>
                        </form>

                        <div className="flex gap-3 pt-4 md:ml- md:flex">
								<a
									href="https://github.com/Gyanthakur"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-1 rounded-full border border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition"
									title="GitHub"
								>
									<Github size={20} />
								</a>

								<a
									href="https://www.linkedin.com/in/gyan-pratap-singh-275785236/"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-1 rounded-full border border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition"
									title="LinkedIn"
								>
									<Linkedin size={20} />
								</a>

								<a
									href="https://wa.me/918957818597?text=Hey%20%F0%9F%91%8B%2C%20how%20can%20I%20help%20you%3F"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-1 rounded-full border border-gray-300 text-gray-700 hover:border-green-600 hover:bg-green-600 hover:text-white transition"
									title="WhatsApp"
								>
									<MessageCircleCode size={20} />
								</a>

                                <a
									href="https://www.instagram.com/gyanpratapsingh_"
									target="_blank"
									rel="noopener noreferrer"
									className="group p-1 rounded-full border border-gray-300 text-gray-700 hover:border-red-600 hover:bg-red-500 hover:text-white transition"
									title="Instagram"
								>
									<InstagramIcon size={20} />
								</a>



								<a
									href="mailto:gps.96169@gmail.com"
									className="group p-1 rounded-full border border-gray-300 text-gray-700 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition"
									title="Email"
								>
									<Mail size={20} />
								</a>
							</div>
                    </div>
                </div>
                <p className="py-4 text-center border-t mt-6 border-slate-200">
                    Copyright 2025 © GPS All Right Reserved.
                </p>
            </footer> 
    </>
  )
}

export default Footer
