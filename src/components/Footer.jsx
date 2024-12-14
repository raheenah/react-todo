const Footer = () => {
  const FooterData = [
    {
      id: "instagram",
      icon: "fa-brands fa-instagram",
      link: "https://www.instagram.com/raheena_h/",
      // icon: "<i className="fa- brands fa - instagram"></i>",
      username: "@Raheenah",
    },
    {
      id: "email",
      icon: "fa-regular fa-envelope",
      link: "mailto:raheenah500@gmail.com",
      // icon: "<i className="fa- brands fa - instagram"></i>",
      username: "Raheenah500@gmail.com",
    },
    {
      id: "linkedin",
      icon: "fa-brands fa-linkedin-in",
      link: "https://www.linkedin.com/in/mohammed-raheenat/",
      // icon: "<i className="fa- brands fa - instagram"></i>",
      username: "Raheenat Mohammed",
    },

  ];

  return (
    <div className='bg-background pb-8 px-8'>
      {" "}
      <div className='py-4 flex flex-col gap-2 lg:max-w-[80%] w-full justify-center items-center mx-auto  border border-border rounded-lg px-2'>
        <h3 className='text-text-primary font-bold text-lg'>
          Say Hi… or Stay Shy
        </h3>
        <div className='flex w-[60%] justify-between items-center mt-6  '>
          <ul className='flex gap-4 '>
            {FooterData.map((item) => (
              <li key={item.id} className='flex'>
                {/* <div className='bg-blue-300 flex items-center justify-center relative w-full h-full'> */}
                <a href={item.link} className='text-button-bg hover:text-button-hover text-lg '>
                  <i className={item.icon}></i>
                </a>
                {/* </div> */}
              </li>
            ))}
          </ul>
          <p className='text-md text-text-primary font-semibold'>© Raheenah 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
