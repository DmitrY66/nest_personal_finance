import { FC, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../helpers/localstorage.helper';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const Auth: FC = () => {
  const [email, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // функция авторизации
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({ email, password });

      if (data) {
        setTokenToLocalStorage('token', data.token);
        dispatch(login(data));
        toast.success('Вы успешно авторизованы');
        navigate('/');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  // функция регистрации
  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({ email, password });

      if (data) {
        toast.success('Аккаунт успешно создан');
        setIsLogin(!isLogin);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }
  };

  return (
    <div
      className='mt-40 flex flex-col item-center justify-center bg-slate-900 text-white'
    >
      <h1 className='text-center text-xl mb-10'>
        {isLogin ? 'Login' : 'Registration'}
      </h1>

      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        className='flex flex-col gap-5 mx-auto w-1/3'
      >
        <input
          type='text'
          className='input'
          placeholder='Email'
          onChange={(e) => setMail(e.target.value)}
          value={email}
        />
        <input
          type='password'
          className='input'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button className='btn btn-green mx-auto'>Submit</button>
      </form>

      <div className='flex justify-center mt-5'>
        {
          isLogin ? (
            <button
              className='text-slate-300 hover:text-white'
              onClick={() => setIsLogin(!isLogin)}
            >
              Нет аккаунта
            </button>
          ) : (
            <button
              className='text-slate-300 hover:text-white'
              onClick={() => setIsLogin(!isLogin)}
            >
              Уже есть аккаунт
            </button>
          )
        }
      </div>
    </div>
  )
};
