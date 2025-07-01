import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <img src="/images/anurag-logo.png" alt="Anurag University" className="h-10 w-auto" />
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-[#4b1d3f]">Share</span>
            <span className="text-[#d72638] italic">Space</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">Hello, {user?.displayName || 'User'}</span>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4b1d3f] to-[#d72638] text-white text-center py-16">
        <h2 className="text-4xl font-bold">Welcome to ShareSpace</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Your trusted campus marketplace for buying and selling everything from books to gadgets.
        </p>
      </section>

      {/* Feature Section: Post & Browse */}
      <section className="flex flex-col md:flex-row justify-center items-center gap-10 p-10 bg-gray-100">
        <div className="bg-gradient-to-r from-[#4b1d3f] to-[#d72638] text-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
          <h3 className="text-2xl font-semibold mb-2">Post an Item</h3>
          <p className="mb-4">Have something to sell? Post it here for other students to see.</p>
          <button
            onClick={() => navigate('/post')}
            className="bg-white text-[#4b1d3f] font-semibold px-6 py-2 rounded hover:bg-gray-100"
          >
            Sell Now
          </button>
        </div>
        <div className="bg-gradient-to-r from-[#4b1d3f] to-[#d72638] text-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
          <h3 className="text-2xl font-semibold mb-2">Look for an Item</h3>
          <p className="mb-4">Need something? Explore listings from fellow students.</p>
          <button
            onClick={() => navigate('/market')}
            className="bg-white text-[#4b1d3f] font-semibold px-6 py-2 rounded hover:bg-gray-100"
          >
            Browse Items
          </button>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#4b1d3f] mb-8">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: 'Books', desc: 'Academic books, novels & exam prep.', img: 'books.jpg' },
            { title: 'Electronics', desc: 'Headphones, calculators, accessories, etc.', img: 'electronics.jpg' },
            { title: 'Clothing', desc: 'Casuals, formals, traditional & more.', img: 'clothing.jpeg' },
          ].map((cat) => (
            <div key={cat.title} className="rounded-xl overflow-hidden shadow-lg">
              <img src={`images/${cat.img}`} alt={cat.title} className="w-full h-48 object-cover" />
              <div className="bg-gradient-to-r from-[#4b1d3f] to-[#d72638] text-white p-4">
                <h3 className="text-xl font-semibold">{cat.title}</h3>
                <p>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-[#4b1d3f] mb-6">About ShareSpace</h2>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg">
          ShareSpace is a trusted peer-to-peer marketplace exclusively for college students. We aim to create a smooth, secure, and localized platform
          where students can easily exchange items, promote sustainability, and help each other save money.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-[#4b1d3f] text-white text-center py-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} ShareSpace. Built with ❤️ by Bhanu.</p>
      </footer>
    </div>
  );
}
