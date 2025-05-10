import React from 'react';

export function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Feed</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <textarea
          className="w-full p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Share your thoughts..."
          rows={3}
        />
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Post
          </button>
        </div>
      </div>
      
      {/* Sample Posts */}
      <div className="space-y-6">
        {[1, 2, 3].map((post) => (
          <div
            key={post}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center mb-4">
              <img
                src={`https://source.unsplash.com/random/40x40?sig=${post}`}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h3 className="font-semibold dark:text-white">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer at Tech Corp
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Excited to share that I've just completed a major project at Tech
              Corp! Looking forward to new challenges ahead. #TechLife
              #SoftwareEngineering
            </p>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <button className="flex items-center hover:text-blue-600">
                <span>Like</span>
                <span className="ml-2">24</span>
              </button>
              <button className="flex items-center ml-6 hover:text-blue-600">
                <span>Comment</span>
                <span className="ml-2">12</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}