import React from 'react';
import { useParams } from 'react-router-dom';

export function Profile() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        
        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex items-end absolute -top-16">
            <img
              src={`https://source.unsplash.com/random/128x128?portrait`}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
            />
          </div>
          
          <div className="mt-20">
            <h1 className="text-2xl font-bold dark:text-white">John Doe</h1>
            <p className="text-gray-600 dark:text-gray-400">Software Engineer at Tech Corp</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">CSRL Center: Bangalore | Batch: 2020</p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold dark:text-white">About</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Passionate software engineer with 3+ years of experience in full-stack development.
              Graduate of CSRL's intensive programming course. Currently working on scalable
              cloud solutions at Tech Corp.
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold dark:text-white">Experience</h2>
            <div className="mt-4 space-y-4">
              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="font-medium dark:text-white">Software Engineer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tech Corp</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">2020 - Present</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-4">
                <h3 className="font-medium dark:text-white">Junior Developer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">StartUp Inc</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">2019 - 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Posts</h2>
        <div className="space-y-4">
          {[1, 2].map((post) => (
            <div key={post} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Excited to share that I've just completed another milestone at Tech Corp!
                #TechLife #SoftwareEngineering
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
    </div>
  );
}