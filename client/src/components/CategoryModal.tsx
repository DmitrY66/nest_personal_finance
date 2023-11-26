import { FC } from 'react';
import { Form } from 'react-router-dom';

interface ICategoryModal {
  type: 'post' | 'patch'
  id?: number
  setVisibleModal: (visible: boolean) => void
  setIsEdit: (visible: boolean) => void
}

export const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal, setIsEdit }) => {
  return (
    <div
      className='fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50'
    >
      <Form
        className='grid w-[300px] gap-2 rounded-md Obg-slate-900 p-5'
        action='/categories'
        method={type}
        onSubmit={() => {
          setVisibleModal(false);
          setIsEdit(false);
        }}
      >
        <label htmlFor='title'>
          <small>Category Title</small>

          <input
            className='input w-full'
            type='text'
            name='title'
            placeholder='Title…'
          />

          <input type='hidden' name='id' value={(id)} />
        </label>

        <div className='flex items-center gap-2'>
          {/* кнопка "создать новую кат" или "редактировать выбранную" */}
          <button className='btn btn-green' type='submit'>
            {type === 'patch' ? 'Save' : 'Create'}
          </button>

          {/* кнопка "закрыть модальное окно"*/}
          <button
            className='btn btn-purp'
            onClick={() => {
              setVisibleModal(false);
              setIsEdit(false);
            }}
          >Close</button>
        </div>
      </Form >
    </div >
  )
};
