import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
      <div className='bg-background fixed w-full py-8 z-50 px-8 mx-auto'>
        <ul className='flex py-2 gap-2  text-center lg:max-w-[80%] w-full mx-auto  items-center justify-center  shadow-custom-todo rounded-lg px-2'>
          <li className='text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='text-button-bg'>|</li>
          <li className='text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold'>
            <NavLink to='/error-boundry-page'>Err Boundary</NavLink>
          </li>
          <li className='text-button-bg'>|</li>
          <li className='text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold'>
            <NavLink to='go-away'>Not Found </NavLink>
          </li>
        </ul>
      </div>
    );
}

export default NavBar