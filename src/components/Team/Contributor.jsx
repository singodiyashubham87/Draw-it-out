import React, { useEffect, useState } from 'react';
import axios from 'axios'
// Replace these with the actual repository owner and name
const REPO_OWNER = 'singodiyashubham87';
const REPO_NAME = 'Draw-it-out';

const Contributor = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`);
        setContributors(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching contributors</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contributors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map(contributor => (
          <div key={contributor.id} className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center">
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{contributor.login}</h2>
              <p className="text-gray-600">Contributions: {contributor.contributions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributor;
