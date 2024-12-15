import { useEffect, useState } from "react";
import axios from "axios";

const ProfileSection = ({ profile }) => {
  const [readmeLinks, setReadmeLinks] = useState([]);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "2-digit",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString(undefined, options);
  };

  const fetchReadme = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${username}/readme`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      //  console.log("README Response Data:", response.data);

      const readmeContent = atob(response.data.content);

      const regex = /\[([^\]]+)\]\((http[^\)]+)\)/g;
      const links = [];
      let match;
      while ((match = regex.exec(readmeContent)) !== null) {
        links.push({
          text: match[1],
          url: match[2],
        });
      }

      setReadmeLinks(links);
    } catch (error) {
      console.error("Error fetching README or parsing content:", error);
      setReadmeLinks([]);
    }
  };

  useEffect(() => {
    if (profile?.login) {
      fetchReadme(profile.login);
    }
  }, [profile?.login]);

  return (
    <div className='flex flex-col w-full mx-auto items-center mt-20 lg:max-w-[80%] py-4 gap-2 text-center  shadow-custom-todo rounded-lg px-2  justify-center'>
      <img
        src={profile.avatar_url}
        alt={`${profile.name}'s Profile Picture`}
        className='w-32 h-32 rounded-full '
      />

      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold underline'>
          {profile.name} - ALT/SOE/024/1339
        </h2>
        <p className=''>{profile.bio}</p>

        <div className='flex gap-2 justify-center'>
          <span className='material-symbols-outlined'>group</span>
          <div className='flex gap-2'>
            <p>{profile.followers} followers</p>
            <p>{profile.following} following</p>
          </div>
        </div>

        <p>Last Activity: {formatDate(profile.updated_at)}</p>

        {readmeLinks.length > 0 ? (
          <ul className='flex gap-4 justify-center'>
            {readmeLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline text-button-bg hover:text-button-hover'
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No links found in README.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
