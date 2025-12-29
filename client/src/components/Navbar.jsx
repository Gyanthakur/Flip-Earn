import React, { use, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { BoxIcon, ExternalLinkIcon, GripIcon, ListIcon, MenuIcon, MessageCircleMoreIcon, NotebookTabs, UserLockIcon, XIcon } from 'lucide-react';
import { useClerk, useUser, UserButton, useAuth } from '@clerk/clerk-react';
import Logger from './Logger';

import { ExternalLink } from "lucide-react";
import axios from 'axios';
import { backendUrl } from '../configs/axios';
import toast from 'react-hot-toast';



 

const Navbar = () => {
    const admin = import.meta.env.VITE_ADMIN_EMAIL;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {getToken} = useAuth();
    const {user, isLoaded} = useUser();
    const {openSignIn, openSignUp, openUserProfile} = useClerk();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const openProjects = () => {
        window.open("/projects", "_blank");
    }
    const fetchIsAdmin = async () => {
        try {
            const token = await getToken();
            const {data} = await axios.get(`${backendUrl}/api/admin/isAdmin`, {headers: {Authorization: `Bearer ${token}`}});
            setIsAdmin(data.isAdmin);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }finally{
            setIsLoading(false)
        }
    };


    useEffect(() => {
    if (
        isLoaded &&
        admin &&
        user?.primaryEmailAddress?.emailAddress === admin
    ) {
        fetchIsAdmin();
    }
    }, [isLoaded, user, admin]);


  
    

  return (
    <nav className='h-20'>
                <div className='fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all'>
                    <img onClick={() => {navigate('/'); scrollTo(0,0)}} src={assets.logo} alt="Logo" className='h-10 cursor-pointer' />

                    {/* Desktop Menu */}
                    <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800'>
                        <Link to="/" onClick={() => scrollTo(0, 0)}> Home </Link>
                        <Link to="/marketplace" onClick={() => scrollTo(0, 0)}> MarketPlace </Link>
                        
                        <Link to={user ? '/messages' : "#"} onClick={() => user ? scrollTo(0, 0) : openSignIn()}> Messages </Link>
                        <Link to={user ? '/my-listings' : "#"} onClick={() =>  user ? scrollTo(0, 0) : openSignIn()}> My Listings </Link>
                        <Link to="/documentation" onClick={() => scrollTo(0, 0)} className='text-cyan-400'> Docs </Link>


                        <Link
                            onClick={openProjects}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline font-semibold"
                            >
                            <ExternalLink size={18} />
                            Go Project
                        </Link>
                        <Logger/>
                    </div>

                    {!user ? ( 
                        <div>
                        <button onClick={openSignIn} className='max-sm:hidden cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                        <MenuIcon onClick={() => setMenuOpen(true)} className='sm:hidden'/>
                        </div>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action label='Marketplace' labelIcon={<GripIcon size={16} className="text-blue-500"/>} onClick={()=> {navigate('marketplace'); scrollTo(0,0)}} />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Action label='Messages' labelIcon={<MessageCircleMoreIcon size={16} className="text-indigo-500"/>} onClick={()=> {navigate('messages'); scrollTo(0,0)}} />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Action label='My Listing' labelIcon={<ListIcon size={16} className="text-purple-500"/>} onClick={()=> {navigate('my-listings'); scrollTo(0,0)}} />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Action label='My Orders' labelIcon={<BoxIcon size={16} className="text-orange-500"/>} onClick={()=> {navigate('my-orders'); scrollTo(0,0)}} />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Action label='Go Projects' labelIcon={<ExternalLinkIcon size={16} className='text-green-500' />} onClick={()=> {navigate('projects'); scrollTo(0,0)}} />
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                               {isAdmin && <UserButton.Action label='Admin' labelIcon={<UserLockIcon size={16} className='text-cyan-500'/> } onClick={()=> {navigate('/admin'); scrollTo(0,0)}} />}
                            </UserButton.MenuItems>
                            <UserButton.MenuItems>
                                <UserButton.Action label='Docs' labelIcon={<NotebookTabs size={16} className='text-red-500' />} onClick={()=> {navigate('/documentation'); scrollTo(0,0)}}/>
                            </UserButton.MenuItems>
                        </UserButton>
                    )}

                   

                </div>
                {/* Mobile Menu */}
                <div className={`sm:hidden fixed inset-0 ${menuOpen ? 'w-full' : 'w-0'} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-[200] text-sm transition-all`}>
                    <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4'>
                       
                        <Link to="/marketplace" onClick={() => setMenuOpen(false)}> MarketPlace </Link>
                        <button onClick={openSignIn}>Messages</button>
                        <button onClick={openSignIn}>My Listings</button>
                        <Link to="/documentation" onClick={() => setMenuOpen(false)} className='text-cyan-500'> Docs </Link>
                        <button onClick={openSignIn} className=' cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                        <button><Logger/></button>
                        <Link
                            onClick={openProjects}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline font-semibold"
                            >
                            <ExternalLink size={18} />
                            Go Projects
                        </Link>
                        <XIcon onClick={() => setMenuOpen(false)} className='absolute size-8 right-6 top-6 text-gray-500 hover:text-gray-700 cursor-pointer'/>
                    </div>
                </div>
            </nav>
  )
}

export default Navbar
