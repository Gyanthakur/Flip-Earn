import React, { useState } from 'react'
import { X } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { backendUrl } from '../configs/axios';
import { getAllUserListing } from '../app/features/listingSlice';
const WithdrawModal = ({onClose}) => {

    const {getToken} = useAuth()
    const dispatch = useDispatch();
    const [amount, setAmount] = useState("");
    const [account, setAccount] = useState([
        {type: "text", name: "Account Holder Name", value: ""},
        {type: "text", name: "Bank Name", value: ""},
        {type: "text", name: "Account Number", value: ""},
        {type: "text", name: "Account Type", value: ""},
        {type: "text", name: "SWIFT", value: ""},
        {type: "text", name: "Branch", value: ""},
    ]);

    const handleSubmession =async (e) => {
        e.preventDefault();
        try {
            // check if there is atleast one field
            if(account.length === 0){
                return toast.error("Please add at least one field!");
            }

            // check all fields are filled
            for(const field of account){
                if(!field.value){
                    return toast.error(`please fill in the ${field.name} field`)
                }
            }

            const confirm = window.confirm("Are you sure you want to submit?");
            if(!confirm)return;
            
            const token = await getToken();
            const {data} = await axios.post(`${backendUrl}/api/listing/withdraw`, {account, amount: parseInt(amount)}, {headers: {Authorization: `Bearer ${token}`}})
            toast.success(data.message);
            dispatch(getAllUserListing({getToken}));
            onClose();



        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)   
            console.log(error);
            
        }
    }
  return (
    <div className='fixed inset-0 bg-black/70 backdrop:blur bg-opacity-50 z-100 flex items-center justify-center sm:p-4'>
        <div className='bg-white sm:rounded-lg shadow-2xl w-full max-w-lg h-screen sm:h-auto flex flex-col'>
            {/* Header */}
            <div className='bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 sm:rounded-t-lg flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-lg truncate'>Withdrawl Funds</h3>
                </div>
                <button onClick={onClose} className='ml-4 p-1 hover:bg-white/20 hover:bg-opacity-20 rounded-lg transition-colors'>
                    <X  className="w-5 h-5 hover:text-red-500"/>
                </button>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmession} className='flex flex-col items-start gap-4 p-4 overflow-y-scroll'>
                <div className='grid grid-cols-[2fr_3fr_1fr] items-center gap-2'>
                    Amount <input onChange={(e)=>setAmount(e.target.value)} type="number" value={amount} className='w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-indigo-400' required />

                </div>
                {account.map((field, index) => (
                    <div key={index} className='grid grid-cols-[2fr_3fr_1fr] items-center gap-2 w-full'>
                        <label className='text-sm font-medium text-gray-800'>{field.name}</label>
                        <input type={field.type} value={field.value} onChange={(e)=>setAccount((prev)=>prev.map((c,i)=>(i === index ? {...c, value: e.target.value} : c)))} className='w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-indigo-400'/>
                    </div>
                ))}

                {/* button */}
                <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded mt-4 transition-colors'>Apply for Withdrawal</button>
            </form>

        </div>
      
    </div>
  )
}

export default WithdrawModal
