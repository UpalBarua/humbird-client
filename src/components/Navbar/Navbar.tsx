import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { GiHummingbird } from 'react-icons/gi';
import { BsThreeDots } from 'react-icons/bs';

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, signOutFn } = useAuth();
  const navigate = useNavigate();

  const handleNavToggle = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  const handleNavAutoHide = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleNavAutoHide);
    return () => window.removeEventListener('scroll', handleNavAutoHide);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutFn();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="py-4 md:py-5 fixed bg-dark-500 w-full">
      <div className="container flex justify-between items-center relative">
        <Link
          className="flex items-center gap-1 font-secondary font-bold"
          to="/">
          <GiHummingbird className="text-4xl text-accent-400" />
          <span className="text-2xl">HumBird</span>
        </Link>
        <ul
          className={`flex items-center flex-col md:flex-row gap-4 md:gap-6 px-10 md:px-0 py-6 md:py-0 rounded-md absolute md:static bg-dark-400 md:bg-dark-500 top-20 right-10 text-lg transition-transform duration-100 ease-out origin-top-right md:scale-100 ${
            isNavOpen ? 'scale-100 shadow-2xl' : 'scale-0'
          }`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {user?.uid ? (
            <li>
              <button
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md font-semibold"
                onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/signin">Signin</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          )}
        </ul>
        <button
          className="md:hidden text-2xl rounded-full p-2 bg-dark-400 hover:bg-dark-300"
          onClick={handleNavToggle}>
          <BsThreeDots />
        </button>
      </div>
    </nav>
  );
};
