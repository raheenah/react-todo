import { NavLink, useLocation } from "react-router-dom"

const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

    return (
      <div className='bg-background fixed w-full py-8 z-50 px-8 mx-auto'>
        <ul className='flex py-2 gap-2  text-center lg:max-w-[80%] w-full mx-auto  items-center justify-center  shadow-custom-todo rounded-lg px-2'>
          <li>
            <NavLink
              to='/'
              className={`text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold ${
                isActive("/") ? "text-button-hover underline" : "text-button-bg"
              }`}
            >
              Home
            </NavLink>
          </li>
          <li className='text-button-bg'>|</li>
          <li className='text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold'>
            <NavLink
              to='/error-boundry-page'
              className={`text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold ${
                isActive("/error-boundry-page")
                  ? "text-button-hover underline"
                  : "text-button-bg"
              }`}
            >
              Err Boundary
            </NavLink>
          </li>
          <li className='text-button-bg'>|</li>
          <li className='text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold'>
            <NavLink
              to='go-away'
              className={`text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold ${
                isActive("/go-away")
                  ? "text-button-hover underline"
                  : "text-button-bg"
              }`}
            >
              Not Found{" "}
            </NavLink>
          </li>
        </ul>
      </div>
    );
}

export default NavBar