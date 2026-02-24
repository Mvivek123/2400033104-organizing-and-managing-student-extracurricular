import React from 'react';
import { useParams } from 'react-router-dom';
import { useClubs } from '../context/ClubsContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationsContext';

export default function ClubDetails() {
  const { id } = useParams();
  const { clubs, toggleMembership, removeClub } = useClubs();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { user } = useAuth();
  const club = clubs.find(c => String(c.id) === id);
  if (!club) return <p className="p-6">Club not found</p>;

  const isMember = club.members.includes(user?.name);
  const isAdmin = club.admins.includes(user?.name);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{club.name}</h1>
      <p className="text-sm text-gray-600 mb-4">Category: {club.category}</p>
      <p className="mb-4">{club.description}</p>
      <button
        onClick={() => {
          toggleMembership(club.id, user.name);
          addNotification({
            text: isMember
              ? `You left ${club.name}`
              : `You joined ${club.name}`,
          });
        }}
        className={`px-4 py-2 rounded text-white ${
          isMember ? 'bg-red-500' : 'bg-green-500'
        }`}
      >
        {isMember ? 'Leave club' : 'Join club'}
      </button>
      {isAdmin && (
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => {
            if (window.confirm('Delete this club?')) {
              removeClub(club.id);
              navigate('/clubs');
            }
          }}
        >
          Delete Club
        </button>
      )}
      <div className="mt-6">
        <h2 className="font-semibold">Members ({club.members.length})</h2>
        <ul className="list-disc ml-5">
          {club.members.map(m => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
