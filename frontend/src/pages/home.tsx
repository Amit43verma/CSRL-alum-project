// import React from 'react';

// export function Home() {
//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 dark:text-white">Feed</h1>
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
//         <textarea
//           className="w-full p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           placeholder="Share your thoughts..."
//           rows={3}
//         />
//         <div className="mt-4 flex justify-end">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             Post
//           </button>
//         </div>
//       </div>
      
//       {/* Sample Posts */}
//       <div className="space-y-6">
//         {[1, 2, 3].map((post) => (
//           <div
//             key={post}
//             className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
//           >
//             <div className="flex items-center mb-4">
//               <img
//                 src={`https://source.unsplash.com/random/40x40?sig=${post}`}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div className="ml-3">
//                 <h3 className="font-semibold dark:text-white">John Doe</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Software Engineer at Tech Corp
//                 </p>
//               </div>
//             </div>
//             <p className="text-gray-700 dark:text-gray-300 mb-4">
//               Excited to share that I've just completed a major project at Tech
//               Corp! Looking forward to new challenges ahead. #TechLife
//               #SoftwareEngineering
//             </p>
//             <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
//               <button className="flex items-center hover:text-blue-600">
//                 <span>Like</span>
//                 <span className="ml-2">24</span>
//               </button>
//               <button className="flex items-center ml-6 hover:text-blue-600">
//                 <span>Comment</span>
//                 <span className="ml-2">12</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








// // src/pages/home.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Feed {
//   _id: string;
//   content: string;
//   createdAt: string;
//   author: {
//     name: string;
//     role: string;
//   };
// }

// const Home = () => {
//   const [feeds, setFeeds] = useState<Feed[]>([]);
//   const [newPost, setNewPost] = useState("");

//   const fetchFeeds = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/feeds");
//       setFeeds(res.data);
//     } catch (error) {
//       console.error("Error fetching feeds:", error);
//     }
//   };

//   const postFeed = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/feeds", {
//         content: newPost,
//         author: { name: "John Doe", role: "Software Engineer" }, // Replace with real user info
//       });
//       setNewPost("");
//       setFeeds([res.data, ...feeds]); // Optimistic update
//     } catch (error) {
//       console.error("Error posting feed:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFeeds();
//   }, []);

//   return (
//     <div className="p-4 text-white">
//       <h1 className="text-2xl font-bold mb-4">Feed</h1>
//       <div className="bg-gray-800 p-4 rounded mb-6">
//         <textarea
//           className="w-full p-2 text-black rounded"
//           rows={3}
//           placeholder="Share your thoughts..."
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//         />
//         <button
//           onClick={postFeed}
//           className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Post
//         </button>
//       </div>

//       <div className="space-y-4">
//         {feeds.map((feed) => (
//           <div key={feed._id} className="bg-gray-800 p-4 rounded">
//             <div className="font-semibold">{feed.author.name}</div>
//             <div className="text-sm text-gray-400 mb-2">
//               {feed.author.role}
//             </div>
//             <div>{feed.content}</div>
//             <div className="text-xs text-gray-500 mt-2">
//               {new Date(feed.createdAt).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;







// // src/pages/home.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Home() {
//   const [feeds, setFeeds] = useState([]);
//   const [content, setContent] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch all feeds
//   const fetchFeeds = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/feed/getAllFeeds`);
//       setFeeds(res.data);
//     } catch (error) {
//       console.error('Error fetching feeds:', error);
//     }
//   };

//   // Create a new feed
//   const handlePost = async () => {
//     if (!content.trim()) return;
//     try {
//       setLoading(true);
//       // await axios.post(`${import.meta.env.VITE_BASE_URL}/feed/create`, {
//       //   userId: '68245c4f2378ad70a322ee0f', // replace with real logged-in user ID
//       //   content,
//       //   author: {
//       //     name: 'John Doe', // Replace with actual user info
//       //     role: 'Software Engineer'
//       //   }
//       // });

//       await axios.post(`${import.meta.env.VITE_BASE_URL}/feed/create`, {
//         userId: '6825b6df1f449a9976ac4bed', // dynamic in real app
//       content
//        });

//       setContent('');
//       fetchFeeds(); // refresh posts
//     } catch (error) {
//       console.error('Error posting feed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeeds();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6 dark:text-white">Feed</h1>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
//         <textarea
//           className="w-full p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           placeholder="Share your thoughts..."
//           rows={3}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={handlePost}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Posting...' : 'Post'}
//           </button>
//         </div>
//       </div>

//       {/* Posts from backend */}
//      <div className="space-y-6">
//        {feeds.map((post: any) => {
//     const user = post.userId;

//     const userImage = user?.profilePhotoUrl || `https://ui-avatars.com/api/?name=${user.name}`;
//     const userRole = user?.experiences?.[0]?.position || "Alumni";

//     return (
//       <div key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <div className="flex items-center mb-4">
//           <img
//             src={userImage}
//             alt="Profile"
//             className="w-10 h-10 rounded-full"
//           />
//           <div className="ml-3">
//             <h3 className="font-semibold dark:text-white">{user.name}</h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400">{userRole}</p>
//           </div>
//         </div>
//         <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
//         <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
//           <button className="flex items-center hover:text-blue-600">
//             <span>Like</span>
//             <span className="ml-2">0</span>
//           </button>
//           <button className="flex items-center ml-6 hover:text-blue-600">
//             <span>Comment</span>
//             <span className="ml-2">0</span>
//           </button>
//         </div>
//       </div>
//     );
//   })}
// </div>

      
//     </div>
//   );
// }











// src/pages/home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Alum {
  _id: string;
  name: string;
  profilePhotoUrl?: string;
  experiences?: { position: string }[];
}

interface Comment {
  _id: string;
  userId: Alum;
  text: string;
  createdAt: string;
}

interface Feed {
  _id: string;
  userId: Alum;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export default function Home() {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [content, setContent] = useState('');
  const [commentText, setCommentText] = useState<Record<string,string>>({});
  const [loading, setLoading] = useState(false);

  const currentUserId = '6825b6df1f449a9976ac4bed';

  const fetchFeeds = async () => {
    try {
      const res = await axios.get<Feed[]>(
        `${import.meta.env.VITE_BASE_URL}/feed/getAllFeeds`
      );
      setFeeds(res.data);
    } catch (err) {
      console.error('Failed to fetch feeds', err);
    }
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/feed/create`,
        { userId: currentUserId, content }
      );
      setContent('');
      await fetchFeeds();
    } catch (err) {
      console.error('Error posting feed', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (feedId: string) => {
    try {
      const res = await axios.post<{
        likesCount: number;
        liked: boolean;
      }>(
        `${import.meta.env.VITE_BASE_URL}/feed/${feedId}/like`,
        { userId: currentUserId }
      );
      setFeeds(feeds.map(f =>
        f._id === feedId
          ? {
              ...f,
              likes: res.data.liked
                ? [...f.likes, currentUserId]
                : f.likes.filter(id => id !== currentUserId)
            }
          : f
      ));
    } catch (err) {
      console.error('Error toggling like', err);
    }
  };

  const submitComment = async (feedId: string) => {
    const text = commentText[feedId]?.trim();
    if (!text) return;
    try {
      const res = await axios.post<Comment>(
        `${import.meta.env.VITE_BASE_URL}/feed/${feedId}/comment`,
        { userId: currentUserId, text }
      );
      setFeeds(feeds.map(f =>
        f._id === feedId
          ? { ...f, comments: [...f.comments, res.data] }
          : f
      ));
      setCommentText({ ...commentText, [feedId]: '' });
    } catch (err) {
      console.error('Error adding comment', err);
    }
  };

  const deleteComment = async (feedId: string, commentId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/feed/${feedId}/comment/${commentId}`,
        { data: { userId: currentUserId } }
      );
      setFeeds(feeds.map(f =>
        f._id === feedId
          ? {
              ...f,
              comments: f.comments.filter(c => c._id !== commentId)
            }
          : f
      ));
    } catch (err) {
      console.error('Error deleting comment', err);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* New Post Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <textarea
          className="w-full p-4 border rounded-lg mb-2
                     bg-gray-100 text-gray-900
                     dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          rows={3}
          placeholder="Share your thoughts..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={handlePost}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded
                       disabled:opacity-50 hover:bg-blue-700"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-6">
        {feeds.map(post => {
          const user = post.userId;
          const avatar = user.profilePhotoUrl
            || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`;
          const liked = post.likes.includes(currentUserId);

          return (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.experiences?.[0]?.position || 'Alumni'}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="mb-4 text-gray-900 dark:text-gray-300">
                {post.content}
              </p>

              {/* Actions */}
              <div className="flex items-center mb-4">
                <button
                  onClick={() => toggleLike(post._id)}
                  className="flex items-center mr-6 text-gray-600 dark:text-gray-400"
                >
                  {liked ? '❤️' : '🤍'}&nbsp;{post.likes.length}
                </button>
                <span className="text-gray-600 dark:text-gray-400">
                  💬&nbsp;{post.comments.length}
                </span>
              </div>

              {/* Add Comment */}
              <div className="flex items-center mb-4">
                <input
                  className="flex-1 p-2 border rounded mr-2
                             bg-gray-100 text-gray-900
                             dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  placeholder="Write a comment…"
                  value={commentText[post._id] || ''}
                  onChange={e =>
                    setCommentText({
                      ...commentText,
                      [post._id]: e.target.value
                    })
                  }
                />
                <button
                  onClick={() => submitComment(post._id)}
                  className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Post
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-2">
                {post.comments.map(c => (
                  <div
                    key={c._id}
                    className="flex items-center justify-between text-sm
                               text-gray-800 dark:text-gray-300"
                  >
                    <div>
                      <strong>{c.userId.name}</strong>: {c.text}
                    </div>
                    {c.userId._id === currentUserId && (
                      <button
                        onClick={() => deleteComment(post._id, c._id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}





