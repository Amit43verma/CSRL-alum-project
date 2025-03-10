import React from 'react';
import { Send } from 'lucide-react';

export function Chat() {
  return (
    <div className="h-[calc(100vh-2rem)] flex">
      {/* Chat List */}
      <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg mr-6">
        <div className="p-4 border-b dark:border-gray-700">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {[1, 2, 3, 4, 5].map((chat) => (
            <div
              key={chat}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b dark:border-gray-700"
            >
              <div className="flex items-center">
                <img
                  src={`https://source.unsplash.com/random/40x40?portrait&sig=${chat}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h3 className="font-medium dark:text-white">Alice Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last message preview...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b dark:border-gray-700 flex items-center">
          <img
            src="https://source.unsplash.com/random/40x40?portrait"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h3 className="font-medium dark:text-white">Alice Johnson</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[1, 2, 3].map((message) => (
            <React.Fragment key={message}>
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[70%]">
                  <p className="text-gray-800 dark:text-gray-200">
                    Hey! How's your new project going?
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 rounded-lg p-3 max-w-[70%]">
                  <p className="text-white">
                    It's going great! Just finished the main feature.
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white mr-2"
            />
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}