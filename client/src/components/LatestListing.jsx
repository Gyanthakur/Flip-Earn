// import React from 'react'
// import Title from './Title'
// import { useSelector } from 'react-redux';
// import ListingCard from './ListingCard';
// import Loading from '../pages/Loading';

// const LatestListing = () => {
//     const {listings, isLoading} = useSelector(state => state.listing);
//   return (
//     <div className='mt-20 mb-8'>
//       <Title title="Latest Listing" description="Discover the hottest social profiles available right now." />


//       <div className='flex flex-col gap-6 px-6'>
//          {isLoading && (
//           <div className="text-center text-slate-500 py-10">
//             <Loading/>
//           </div>
//         )}

//         {listings.slice(0, 4).map((listing,index) => (
//             <div key={index} className='mx-auto w-full max-w-3xl rounded-xl'>
//                <ListingCard listing={listing}/>
//             </div>
//         ))}
    
//         </div>
//     </div>
//   )
// }

// export default LatestListing


import React, { useEffect, useState } from 'react'
import Title from './Title'
import { useSelector } from 'react-redux'
import ListingCard from './ListingCard'
import Loading from '../pages/Loading'

const LatestListing = () => {
  const { listings } = useSelector(state => state.listing)
  const [isLoading, setIsLoading] = useState(true)

  // ✅ stop loading when listings are available
  useEffect(() => {
    if (listings && listings.length >= 0) {
      setIsLoading(false)
    }
  }, [listings])

  return (
    <div className="mt-20 mb-8">
      <Title
        title="Latest Listing"
        description="Discover the hottest social profiles available right now."
      />

      <div className="flex flex-col gap-6 px-6">
        {/* ✅ Loading */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <Loading />
          </div>
        )}

        {/* ✅ No listings */}
        {!isLoading && listings.length === 0 && (
          <div className="text-center text-slate-500 py-10">
            No listings available
          </div>
        )}

        {/* ✅ Listings */}
        {!isLoading &&
          listings.slice(0, 7).map((listing, index) => (
            <div
              key={index}
              className="mx-auto w-full max-w-3xl rounded-xl"
            >
              <ListingCard listing={listing} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default LatestListing
