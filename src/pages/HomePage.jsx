import { useState, useEffect, useTransition } from "react";
import axios from "axios";
import ProfileSection from "../components/ProfileSection";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [readme, setReadme] = useState(null);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, startTransition] = useTransition();


  const profileUrl = "https://api.github.com/users/raheenah";
  const readmeUrl =
    "https://api.github.com/repos/raheenah/raheenah/contents/README.md"; 
  const reposUrl = `https://api.github.com/users/raheenah/repos?per_page=5&page=${currentPage}`;


  const fetchProfileData = async () => {
    try {
      const response = await axios.get(profileUrl);
      setProfile(response.data);

    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };


  const fetchReadmeData = async () => {
    try {
      const response = await axios.get(readmeUrl);
      const decodedReadme = atob(response.data.content); 
      
      setReadme(decodedReadme);
    } catch (error) {
      console.error("Error fetching README data:", error);
    }
  };


  const fetchReposData = async () => {
    try {
      const response = await axios.get(reposUrl);
      setRepos(response.data);


      const totalResponse = await axios.get(
        "https://api.github.com/users/raheenah/repos"
      );
      setTotalRepos(totalResponse.data.length);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };


  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    startTransition(() => {
      fetchProfileData();
      fetchReadmeData();
      fetchReposData();
    });
  }, [currentPage]);

  return (
    <div className='p-8 flex flex-col gap-8  items-start bg-background text-text-primary w-[100%]'>
      {profile && <ProfileSection profile={profile} />}

      <Outlet />
      {/* <TodosList /> */}
      {/* <TodoDetails/> */}
    </div>
  );
};

export default Home;
