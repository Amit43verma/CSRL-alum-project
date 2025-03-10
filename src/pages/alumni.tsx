import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Alumni() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Alumni Directory</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search alumni..."
            className="pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((alumni) => (
          <Link
            key={alumni}
            to={`/profile/${alumni}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <img
                src={`https://source.unsplash.com/random/64x64?portrait&sig=${alumni}`}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4">
                <h3 className="font-semibold dark:text-white">Jane Smith</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Batch 2020</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tech Corp | Bangalore Center
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}