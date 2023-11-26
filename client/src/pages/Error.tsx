import { FC } from 'react';
import img from '../assets/error_404.svg'
import { Link } from 'react-router-dom';

export const Error: FC = () => {
  return (
    <div
      className='flex min-h-screen bg-slate-900 font-roboto text-white justify-center items-center flex-col gap-10'
    >
      <img className='w-80' src={img} alt='image' />
      <Link to={'/'} className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'>
        Back
      </Link>
    </div>
  )
}
