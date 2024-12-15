import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileSection from "../components/ProfileSection";
import ReposSection from "../components/ListOfRepos";
import TodosList from "../components/Todos";
import TodoDetails from "../components/TodoDetails";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [readme, setReadme] = useState(null);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);

  // GitHub API URLs
  const profileUrl = "https://api.github.com/users/raheenah";
  const readmeUrl =
    "https://api.github.com/repos/raheenah/raheenah/contents/README.md"; // Replace with your repo URL if different
  const reposUrl = `https://api.github.com/users/raheenah/repos?per_page=5&page=${currentPage}`;

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      const response = await axios.get(profileUrl);
      setProfile(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // Fetch README content
  const fetchReadmeData = async () => {
    try {
      const response = await axios.get(readmeUrl);
      const decodedReadme = atob(response.data.content); // Decode base64 content
      setReadme(decodedReadme);
    } catch (error) {
      console.error("Error fetching README data:", error);
    }
  };

  // Fetch repositories data with pagination
  const fetchReposData = async () => {
    try {
      const response = await axios.get(reposUrl);
      setRepos(response.data);
      

      // Fetch total number of repositories for pagination
      const totalResponse = await axios.get(
        "https://api.github.com/users/raheenah/repos"
      );
      setTotalRepos(totalResponse.data.length);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  // Handle pagination click
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchProfileData();
    fetchReadmeData();
    fetchReposData();
  }, [currentPage]);

  return (
    <div className='p-8 flex flex-col gap-8  items-start bg-background text-text-primary w-[100%]'>
      {profile && <ProfileSection profile={profile} />}

<Outlet/>
      {/* <TodosList /> */}
      {/* <TodoDetails/> */}
    </div>
  );
};

export default Home;
