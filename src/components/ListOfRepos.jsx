import React, { useState, useEffect } from "react";
import axios from "axios";
import Token from "./token";

const ReposSection = ({ repos, currentPage, totalRepos, onPageChange }) => {
  const [repoDetails, setRepoDetails] = useState({});
  const token = "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";

  useEffect(() => {
    const fetchRepoDetails = async () => {
      for (let repo of repos) {
        try {

          const [repoData, commitsData, languagesData, creationDate] =
            await Promise.all([
                axios.get(`https://api.github.com/repos/${repo.full_name}`
                //     , {
                // headers: {
                //   Authorization: `token ${token}`,
                // },
                //     }
                ), // Repo details
              axios.get(
                `https://api.github.com/repos/${repo.full_name}/commits`,
                {
                  headers: {
                    Authorization: `token ${token}`,
                  },
                }
              ), 
              
              axios.get(
                `https://api.github.com/repos/${repo.full_name}/languages`,
                {
                  headers: {
                    Authorization: `token ${token}`,
                  },
                }
              ),
              axios.get(
                `https://api.github.com/repos/${repo.full_name}/created_at`,
                {
                  headers: {
                    Authorization: `token ${token}`,
                  },
                }
              ),
            ]);


          setRepoDetails((prevState) => ({
            ...prevState,
            [repo.id]: {
              name: repoData.data.name,
              description: repoData.data.description,
              commitsCount: commitsData.data.length,
              languages: Object.keys(languagesData.data),
            },
          }));
        } catch (error) {
          console.error("Error fetching repository details:", error);
        }
      }
    };

    fetchRepoDetails();
  }, [repos]);

  return (
    <div className='mt-8 bg-yellow-300'>
      <h3 className='text-xl font-semibold'>Repositories</h3>
      <ul className='mt-4'>
        {repos.map((repo) => {
          const details = repoDetails[repo.id];

          return (
            <li key={repo.id} className='py-2'>
              <h4 className='font-bold text-blue-500'>{repo.name}</h4>
              <p>{details?.description || "No description available."}</p>
              <p>Commits: {details?.commitsCount || "Loading..."}</p>
              <p>Languages: {details?.languages?.join(", ") || "Loading..."}</p>
            </li>
          );
        })}
      </ul>


      <div className='mt-4 flex justify-center space-x-2'>
        {[...Array(Math.ceil(totalRepos / 5))].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReposSection;
