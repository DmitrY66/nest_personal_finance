import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionLoader } from '../types/types';
import { CategoryModal } from './CategoryModal';

export const TransactionForm: FC = () => {
  const { categories } = useLoaderData() as IResponseTransactionLoader;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  console.log('isEdit: ', isEdit);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  return (
    <div className='rounded-md bg-slate-800 p-4'>
      <Form className='grid gap-2' method='post' action='/transactions'>
        <label className='grid' htmlFor='title'>
          <span className='text-xs text-white/40'>Title</span>
          <input
            className='input'
            type='text'
            placeholder='Title…'
            name='title'
            required
          />
        </label>

        <label className='grid' htmlFor='amount'>
          <span className='text-xs text-white/40'>Amount</span>
          <input
            className='input'
            type='text'
            placeholder='Amount...'
            name='amount'
            required
          />
        </label>

        {categories.length ? (
          <label className='grid' htmlFor='category'>
            <span className='text-xs text-white/40'>Category</span>
            <select
              className='input'
              name='category'
              required
            >
              {categories.map((ctg, idx) => (
                <option key={idx} value={ctg.id}>{ctg.title}</option>
              ))}
            </select>
          </label>
        ) : (<h2 className='mt-1 text-red-300'>Чтобы продолжить, сначала создайте категорию</h2>)
        }

        {/* кнопка 'управление категориями'*/}
        <button
          className='mt-2 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
          onClick={(e) => {
            e.preventDefault();
            setVisibleModal(true);
          }}
        >
          <FaPlus />
          <span>Управление категориями:</span>
        </button>

        {/* радиокнопки */}
        <div className='flex items-center gap-4'>
          <label className='flex cursor-pointer items-center gap-2'>
            <input
              type='radio'
              name='type'
              value={'income'}
              className='form-radio Text-blue-600'
            />
            <span>Income</span>
          </label>

          <label className='flex cursor-pointer items-center gap-2'>
            <input
              type='radio'
              name='type'
              value={'expense'}
              className='form-radio Text-blue-600'
            />
            <span>Expense</span>
          </label>
        </div>

        <button className="btn btn-green mt-2 max-w-fit">Submit</button>
      </Form>

      {visibleModal &&
        <CategoryModal
          type='post'
          setVisibleModal={setVisibleModal}
          setIsEdit={setIsEdit}
        />}
    </div >
  )
};
