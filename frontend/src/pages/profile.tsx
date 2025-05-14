import { useLocation } from 'react-router-dom';

export function Profile() {
  const location = useLocation();
  const alum = location.state?.alum;

  // ✅ Handle case when alum is not passed
  if (!alum) {
    return (
      <div className="text-center py-10 text-gray-700 dark:text-gray-300">
        <p>Alumni data not available. Please go back and select an alumni profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>

        {/* Profile Info */}
        <div className="flex items-center gap-6 px-6 py-6">
          {/* Profile Picture */}
          <img
            src={alum.profilePicture || '/default-avatar.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
          />

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold dark:text-white">{alum.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {alum.experiences?.[0]?.position} at {alum.experiences?.[0]?.companyName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              CSRL Center: {alum.csrlCenter} | Batch: {alum.batch}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 mt-6">
          <h2 className="text-lg font-semibold dark:text-white">About</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {alum.about}
          </p>
        </div>

        {/* Experience Section */}
        <div className="px-6 mt-6">
          <h2 className="text-lg font-semibold dark:text-white">Experience</h2>
          <div className="mt-4 space-y-4">
            {alum.experiences && alum.experiences.length > 0 ? (
              [...alum.experiences]
                .sort((a: any, b: any) => {
                  const getYear = (date: string) => date.toLowerCase() === 'present' ? 9999 : parseInt(date);
                  const aEnd = getYear(a.endDate);
                  const bEnd = getYear(b.endDate);
                  if (aEnd !== bEnd) return bEnd - aEnd;
                  const aStart = getYear(a.startDate);
                  const bStart = getYear(b.startDate);
                  return bStart - aStart;
                })
                .map((exp: any, index: number) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4">
                    <h3 className="font-medium dark:text-white">{exp.position}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.companyName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No experience added.</p>
            )}
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
