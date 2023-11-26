import { FC } from 'react';
import { useAuth } from '../hooks/useAuth';
import img from '../assets/lock.svg';

interface Props {
  children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();

  return (
    <>
      {
        isAuth ? children :
          <div className='flex flex-col justify-center items-center mt-20 gap-10'>
            <h2 className='text-2xl w-90 text-center'>
              Для посещения данной страницы вы должны быть авторизованы
            </h2>
            <img className='w-80' src={img} alt='img' />
          </div>
      }
    </>
  )
};
