import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Experience {
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
}

interface AlumniDetails {
  _id: string;
  name: string;
  csrlCenter: string;
  batch: string;
  profilePicture?: string;
  experiences: Experience[];
}

// Custom Hook
function useFetchAlumni() {
  const [alumni, setAlumni] = useState<AlumniDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlumni() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/alum/get-alums`);
        setAlumni(res.data);
      } catch (err) {
        setError('Failed to fetch alumni details');
      } finally {
        setLoading(false);
      }
    }

    fetchAlumni();
  }, []);

  return { alumni, loading, error };
}

// Main Component
export function Alumni() {
  const { alumni, loading, error } = useFetchAlumni();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = alumni.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Alumni Directory</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search alumni..."
            className="pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((alum) => {
          const primaryExp = alum.experiences?.[0];
          return (
            <Link
              key={alum._id}
              to={`/profile/${alum._id}`}
              state={{ alum }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <img
                  src={alum.profilePicture || '/default-avatar.png'}
                  alt={alum.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold dark:text-white">{alum.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {"CSRL Center: " + alum.csrlCenter || 'Role N/A'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Batch {alum.batch}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {primaryExp?.companyName || 'Company N/A'} | {primaryExp?.position}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
