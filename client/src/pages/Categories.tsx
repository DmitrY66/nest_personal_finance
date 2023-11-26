import { FC, useState } from 'react';
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { CategoryModal } from '../components/CategoryModal';
import { instance } from '../api/axios.api';
import { Form, useLoaderData } from 'react-router-dom';
import { ICategory } from '../types/types';

// добавление, редактирование, удаление категории
// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {

    // создание
    case 'POST': {
      const formData = await request.formData();
      const title = {
        title: formData.get('title'),
      };
      await instance.post('/categories', title);
      return null;
    }

    // редактирование
    case 'PATCH': {
      const formData = await request.formData();
      const category = {
        id: formData.get('id'),
        title: formData.get('title'),
      };
      await instance.patch(`/categories/category/${category.id}`, category);
      return null;
    }

    // удаление
    case 'DELETE': {
      const formData = await request.formData();
      const categoryId = formData.get('id');
      await instance.delete(`/categories/category/${categoryId}`);
      return null;
    }
  }
};

// загрузчик категорий
// eslint-disable-next-line react-refresh/only-export-components
export const categoriesLoader = async () => {
  const { data } = await instance.get<ICategory[]>('/categories');
  return data;
};

export const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[];
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  return (
    <>
      <div className='mt-10 rounded-md bg-slate-800 p-4'>
        <h1>Список категорий</h1>

        {/* Список категорий */}
        <div className='mt-2 flex flex-wrap items-center gap-2'>
          {categories.map((category, idx) => (
            <div
              className='group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2'
              key={idx}
            >
              {category.title}
              <div
                className='absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 hidden items-center justify-between group-hover:flex'
              >
                {/* кнопка "редактировать категорию"*/}
                <button onClick={() => {
                  setCategoryId(category.id);
                  setVisibleModal(true);
                  setIsEdit(true);
                }}>
                  <AiFillEdit />
                </button>

                <Form
                  className='flex'
                  action='/categories'
                  method='delete'
                >

                  <input type='hidden' name='id' value={category.id} />

                  {/* кнопка "удалить категорию"*/}
                  <button type='submit'>
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        {/* кнопка "добавить категорию"*/}
        <button
          className='mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
          onClick={() => setVisibleModal(true)}
        >
          <FaPlus />
          <span>Создайте новую категорию</span>
        </button>
      </div>

      {visibleModal && !isEdit ?
        <CategoryModal
          type='post'
          setVisibleModal={setVisibleModal}
          setIsEdit={setIsEdit}
        />
        : visibleModal && isEdit ?
          <CategoryModal
            type='patch'
            setVisibleModal={setVisibleModal}
            setIsEdit={setIsEdit}
            id={categoryId}
          /> : null
      }
    </>
  )
};
