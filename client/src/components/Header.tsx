import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBtc, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenToLocalStorage } from '../helpers/localstorage.helper';
import { toast } from 'react-toastify';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenToLocalStorage('token');
    toast.success('Вы покинули систему');
    navigate('/');
  };

  return (
    <header
      className='flex items-center px-4 py-3 shadow-sm bg-slate-800 backdrop-blur-sm'
    >
      {/* лого */}
      <Link to='/'>
        <FaBtc size={20} />
      </Link>

      {/* меню */}
      {isAuth && (
        <nav className='ml-auto mr-10'>
          <ul className='flex items-center gap-5 '>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) => isActive ? 'text-white' : 'text-white/50 hover:text-purple-400'}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/transactions'
                className={({ isActive }) => isActive ? 'text-white' : 'text-white/50 hover:text-purple-400'}
              >
                Transactions
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/categories'
                className={({ isActive }) => isActive ? 'text-white' : 'text-white/50 hover:text-purple-400'}
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/* кнопка авторизации */}
      {isAuth ? (
        <button className='btn btn-purp' onClick={logoutHandler}>
          <span >Log Out</span>
          <FaSignInAlt />
        </button>
      ) : (
        <Link to='auth' className='ml-auto py-2 text-white/50 hover:text-white'>
          Log In / Sign In
        </Link>
      )}


    </header>
  )
}
