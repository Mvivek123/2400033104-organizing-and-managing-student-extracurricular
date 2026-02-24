import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useClubs } from '../context/ClubsContext';
import { useEvents } from '../context/EventsContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const [file, setFile] = useState(null);
  const { clubs } = useClubs();
  const { events } = useEvents();

  const handlePic = e => {
    const reader = new FileReader();
    reader.onload = () => setFile(reader.result);
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  // derive participation lists
  const joined = clubs.filter(c => c.members.includes(user?.name));
  const registered = events.filter(e => e.participants.includes(user?.name));

  // simple email/id from name
  const email = user?.name ? `${user.name.toLowerCase().replace(/\s+/g,'')}@university.edu` : '';
  const studentId = user?.name ? `STU${String(user.name.length).padStart(7,'0')}` : '';

  const badges = [
    { title: 'Active Participant', desc: 'Earned on campus' },
    { title: 'Event Organizer', desc: 'Earned on campus' },
  ];

  return (
    <div className="p-6">
      {/* header card */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl mr-4">
            {user?.name?.split(' ').map(n=>n[0]).join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{email}</p>
            <div className="mt-2 space-x-2">
              <span className="inline-block bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs">
                {joined.length} Clubs
              </span>
              <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                {registered.length} Events
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="border px-4 py-2 rounded mr-2">Edit Profile</button>
          <button className="text-red-500" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="font-semibold mb-4">Joined Clubs</h3>
            {joined.length === 0 ? (
              <p className="text-gray-500">You are not a member of any clubs.</p>
            ) : (
              <ul className="space-y-3">
                {joined.map(c => (
                  <li key={c.id} className="flex justify-between items-center">
                    <span>{c.name}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      {c.category}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Event Participation</h3>
            {registered.length === 0 ? (
              <p className="text-gray-500">No registrations yet.</p>
            ) : (
              <ul className="space-y-3">
                {registered.map(e => (
                  <li key={e.id}>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-gray-600">{e.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="font-semibold mb-4">Student Details</h3>
            <p className="text-sm"><strong>Email:</strong> {email}</p>
            <p className="text-sm"><strong>Student ID:</strong> {studentId}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Badges & Achievements</h3>
            <ul className="space-y-2">
              {badges.map(b => (
                <li key={b.title} className="border-l-4 border-yellow-400 bg-yellow-50 px-3 py-2 rounded">
                  <p className="font-medium">{b.title}</p>
                  <p className="text-xs text-gray-600">{b.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
