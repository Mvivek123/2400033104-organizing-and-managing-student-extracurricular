import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClubs } from '../context/ClubsContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationsContext';

export default function Clubs() {
  const { clubs, toggleMembership, addClub } = useClubs();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState('');
  const [newDesc, setNewDesc] = useState(''); // ✅ ADDED

  const filtered = clubs.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description || '').toLowerCase().includes(search.toLowerCase());

    const matchesCat = category === 'all' || c.category === category;
    return matchesSearch && matchesCat;
  });

  // ✅ UPDATED FUNCTION (NOW SENDS DESCRIPTION)
  const handleAdd = async () => {
    if (newName.trim()) {
      try {
        const res = await fetch("http://localhost:50507/api/clubs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: newName.trim(),
            description: newDesc || "No description"
          })
        });

        const savedClub = await res.json();

        addClub({
          ...savedClub,
          category: newCat || 'general',
          members: [],
          admins: [user.name],
        });

        setNewName('');
        setNewCat('');
        setNewDesc(''); // ✅ RESET

        addNotification({ text: `New club created: ${savedClub.name}` });

      } catch (err) {
        console.error("Error saving club:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Explore Clubs</h1>
      <p className="text-gray-600 mb-4">Discover communities that match your interests</p>

      <div className="mb-4">
        <input
          className="w-full border px-4 py-2 rounded-lg bg-gray-100"
          placeholder="Search clubs by name or description..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'sports', 'tech', 'arts', 'cultural'].map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 rounded-full border ${
              category === cat ? 'bg-indigo-500 text-white' : 'bg-white'
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-4">Showing {filtered.length} clubs</p>

      {user?.role?.toLowerCase() === 'admin' ? (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Add new club</h2>
          <div className="flex gap-2 flex-wrap">

            {/* Name */}
            <input
              className="border px-2 py-1 rounded flex-1 min-w-[180px]"
              placeholder="Club name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />

            {/* Description (NEW) */}
            <input
              className="border px-2 py-1 rounded flex-1 min-w-[180px]"
              placeholder="Description"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
            />

            {/* Category */}
            <input
              className="border px-2 py-1 rounded w-32 min-w-[120px]"
              placeholder="Category"
              value={newCat}
              onChange={e => setNewCat(e.target.value)}
            />

            <button
              type="button"
              onClick={handleAdd}
              className="bg-indigo-600 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 text-sm text-gray-500">
          Only admins can create new clubs.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(club => {
          const username = user?.name || user?.username || user?.userName;
          const isMember = club.members.includes(username);

          return (
            <div key={club.id} className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
              <div className="h-32 bg-gray-200 flex items-center justify-center overflow-hidden">
                {club.image ? (
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Image</span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    <Link to={`/clubs/${club.id}`} className="hover:underline">
                      {club.name}
                    </Link>
                  </h3>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full capitalize">
                    {club.category}
                  </span>
                </div>

                {/* ✅ ALWAYS SHOW DESCRIPTION */}
                <p className="text-sm text-gray-600 mb-4">
                  {club.description || "No description available"}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    👥 {club.members.length} members
                  </p>

                  <button
                    onClick={() => {
                      if (username) {
                        toggleMembership(club.id, username);
                        addNotification({
                          text: isMember
                            ? `You left ${club.name}`
                            : `You joined ${club.name}`,
                        });
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isMember
                        ? 'bg-gray-300 text-gray-700'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {isMember ? 'Joined' : 'Join'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}