import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

export function Meetups() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Alumni Meetups</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create Meetup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((meetup) => (
          <div
            key={meetup}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`https://source.unsplash.com/random/400x200?event&sig=${meetup}`}
              alt="Meetup"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                Tech Reunion 2025
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>March 15, 2025 • 6:00 PM</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Tech Hub, Bangalore</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users className="w-5 h-5 mr-2" />
                  <span>45 Attending</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Join us for an evening of networking, knowledge sharing, and
                catching up with fellow alumni.
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                RSVP
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}