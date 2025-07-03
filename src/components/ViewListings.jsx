import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

function ViewListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async (retry = false) => {
    try {
      const res = await axios.get('https://sharespace-backend-vyd6.onrender.com/api/listings/get');
      if (res.data && res.data.length > 0) {
        setListings(res.data);
        setLoading(false);
      } else {
        if (!retry) {
          // Try once more after a 3-second delay if no data
          setTimeout(() => fetchListings(true), 3000);
        } else {
          setLoading(false);
        }
      }
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4b1d3f] to-[#d72638] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Welcome to <span className="italic text-yellow-100">ShareSpace</span> Marketplace
        </h2>

        {loading ? (
          <p className="text-center text-white text-lg animate-pulse">Fetching listings...</p>
        ) : listings.length === 0 ? (
          <p className="text-center text-white text-lg">No listings available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((item) => {
              const postedOn = new Date(item.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col overflow-hidden"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-52 object-cover"
                    />
                  )}

                  <div className="flex flex-col p-4 flex-grow">
                    <h3 className="text-xl font-bold text-[#4b1d3f] mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">{item.description}</p>

                    <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
                      <span className="bg-gray-200 px-2 py-1 rounded-full">{item.category}</span>
                      <span className="bg-gray-200 px-2 py-1 rounded-full">{item.sellerEmail}</span>
                      <span className="italic">Posted on {postedOn}</span>
                    </div>

                    <div className="mt-auto">
                      <p className="text-lg font-bold text-[#d72638] mb-3">₹{item.price}</p>

                      {auth.currentUser?.email === item.sellerEmail && (
                        <div className="flex gap-2">
                          <Link
                            to={`/edit/${item._id}`}
                            className="flex-1 bg-[#4b1d3f] hover:bg-[#3a162f] text-white py-2 rounded text-center text-sm"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/delete/${item._id}`}
                            className="flex-1 bg-[#d72638] hover:bg-[#b91c2d] text-white py-2 rounded text-center text-sm"
                          >
                            Delete
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewListings;
