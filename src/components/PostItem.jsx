import React, { useState } from 'react';

const PostItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();

    if (!image) {
      setMsg('Please choose an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('email', email);
      formData.append('image', image);

      const res = await fetch('https://sharespace-backend-vyd6.onrender.com/api/listings/post', {
        method: 'POST',
        body: formData,
      });


      const data = await res.json();

      if (res.ok) {
        setMsg('✅ Item posted successfully!');
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setEmail('');
        setImage(null);
      } else {
        setMsg(data.error || '❌ Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setMsg('❌ Error posting item.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4b1d3f] to-[#d72638] flex items-center justify-center px-4">
      <form
        onSubmit={handlePost}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center text-[#4b1d3f] mb-6">
          Post a <span className="text-[#d72638] italic">New Listing</span>
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b1d3f]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b1d3f]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b1d3f]"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b1d3f]"
          required
        >
          <option value="">Select Category</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="email"
          placeholder="Seller Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b1d3f]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="file"
          className="w-full mb-4 text-sm"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#4b1d3f] hover:bg-[#3a162f] text-white py-3 rounded-lg font-medium transition"
        >
          Post Item
        </button>

        {msg && (
          <p className="mt-4 text-center text-sm text-green-600">{msg}</p>
        )}
      </form>
    </div>
  );
};

export default PostItem;
