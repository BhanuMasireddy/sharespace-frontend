import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

function MyListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const res = await axios.get('https://sharespace-backend-vyd6.onrender.com/api/listings/get');
        const myEmail = auth.currentUser?.email;
        const filtered = res.data.filter(item => item.email === myEmail);
        setListings(filtered);
      } catch (err) {
        console.error('Error fetching my listings:', err);
      }
    };

    fetchMyListings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Listings</h2>
      {listings.length === 0 ? (
        <p className="text-center text-gray-600">You haven't posted any listings yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
              <p className="text-gray-700 mt-1">{item.description}</p>
              <p className="text-green-600 font-bold mt-1">₹{item.price}</p>
              <p className="text-sm text-gray-500">Category: {item.category}</p>
              <p className="text-sm text-gray-500">Seller: {item.email}</p>

              <div className="mt-4">
                <Link
                  to={`/edit/${item._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded inline-block"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
