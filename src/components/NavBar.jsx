import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
      <div className='bg-background pt-8 px-8'>
        <ul className='flex py-2 gap-2 lg:max-w-[80%] w-full mx-auto  items-center justify-center border border-border rounded-lg px-2'>
          <li className='text-button-bg hover:text-button-hover hover:underline hover:font-bold font-semibold'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='text-button-bg'>|</li>
          <li className='text-button-bg hover:to-button-hover hover:underline hover:font-bold font-semibold'>
            <NavLink to='/error-boundry-page'>Err Boundary Test</NavLink>
          </li>
          <li className='text-button-bg'>|</li>
          <li className='text-button-bg hover:to-button-hover hover:underline hover:font-bold font-semibold'>
            <NavLink to='go-away'>Not Found Page Test</NavLink>
          </li>
        </ul>
      </div>
    );
}

export default NavBar