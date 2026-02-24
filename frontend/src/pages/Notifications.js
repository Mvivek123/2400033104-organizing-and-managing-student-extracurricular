import React from 'react';
import { useNotifications } from '../context/NotificationsContext';

export default function Notifications() {
  const { notifications, markRead, markAllRead } = useNotifications();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button
          className="text-sm text-indigo-600 hover:underline"
          onClick={markAllRead}
        >
          Mark all read
        </button>
      </div>
      <ul className="space-y-2">
        {notifications.map(n => (
          <li
            key={n.id}
            className={`p-4 rounded shadow ${n.read ? 'bg-gray-100' : 'bg-white'}`}
          >
            <div className="flex justify-between">
              <span>{n.text}</span>
              {!n.read && (
                <button
                  className="text-sm text-indigo-600 hover:underline"
                  onClick={() => markRead(n.id)}
                >
                  Mark read
                </button>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(n.id).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
