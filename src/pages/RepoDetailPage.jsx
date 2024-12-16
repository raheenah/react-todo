import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RepoDetailPage = () => {
  const { repoName } = useParams(); 
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchRepoData = async () => {
        const token = "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";
      try {
        const response = await axios.get(
          `https://api.github.com/repos/your-username/${repoName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRepoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    };

    fetchRepoData();
  }, [repoName]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='repo-detail-page'>
      <h2 className='text-2xl font-bold'>{repoData.name}</h2>
      <p>{repoData.description}</p>
      <p>Language: {repoData.language}</p>
      <p>Created At: {new Date(repoData.created_at).toLocaleDateString()}</p>
      <p>Updated At: {new Date(repoData.updated_at).toLocaleDateString()}</p>
      <a href={repoData.html_url} target='_blank' rel='noopener noreferrer'>
        Visit GitHub Repository
      </a>
    </div>
  );
};

export default RepoDetailPage;
