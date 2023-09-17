import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function BookPage({ auth, initialBookData }) {
console.log('initialBookData:', initialBookData);
  const { data, setData, errors, processing } = useForm({
    id: initialBookData.id || '',
    name: initialBookData.name || '',
    isbn: initialBookData.isbn || '',
    author_ids: initialBookData.author_ids || [],
  });

  const [authorOptions, setAuthorOptions] = useState([]);

  useEffect(() => {
    fetch('/list-authors') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching authors');
        }
        return response.json();
      })
      .then((data) => {
        setAuthorOptions(data.authors.map((author) => ({ value: author.id, label: author.name })))
      })
      .catch((error) => {
        console.error('Error fetching authors:', error);
      });
  }, []);

  console.log('authorOptions:', authorOptions);
  console.log('data.initialBookData.id:', initialBookData.id);

  function submit(e) {
    e.preventDefault();

    Inertia.put(`/update-book-deets/${initialBookData.id}`, data, {
      onSuccess: () => {
        console.log('Form submitted successfully');
      },
      onError: (errors) => {
        // Handle form submission errors if needed
        console.error('Form submission error:', errors);
      },
    });
  }

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">You are editing a book</h2>}>
      <Head title="Author Dashboard" />
      <div className="py-12">
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
          <form className="space-y-12" onSubmit={submit} method="PUT">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium leading-6">
                Book's Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="bg-white ring-white/10 block py-1.5 w-full text-neutral-950 border-0 rounded-md shadow-sm ring-1 focus:ring-2 ring-inset focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              />
              {errors.name && <div className="text-red-600 capitalize">{errors.name}</div>}
            </div>
            <div>
              <label htmlFor="isbn" className="block text-white text-sm font-medium leading-6">
                Book's ISBN
              </label>
              <input
                type="text"
                id="isbn"
                value={data.isbn}
                onChange={(e) => setData('isbn', e.target.value)}
                className="bg-white ring-white/10 block py-1.5 w-full text-neutral-950 border-0 rounded-md shadow-sm ring-1 focus:ring-2 ring-inset focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
              />
              {errors.isbn && <div className="text-red-600 capitalize">{errors.isbn}</div>}
            </div>
            <div>
              <label htmlFor="book_id" className="block text-white text-sm font-medium leading-6">
                Select Author
              </label>
              <Select
                isMulti
                options={authorOptions}
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={authorOptions.filter((option) => data.author_ids.includes(option.value))}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map((option) => option.value)
                  setData('author_ids', selectedValues)
                }}
                className="text-neutral-950 w-full border-0 rounded-md shadow-sm ring-1 focus:ring-2 ring-inset focus:ring-inset focus:ring-white-500 sm:text-sm sm:leading-6"
              />
              {errors.author_ids && <div className="text-red-600 capitalize">{errors.author_ids}</div>}
            </div>
            <button type="submit" disabled={processing} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 px-3 py-2 text-white text-sm font-semibold hover:bg-orange-400 bg-orange-500 rounded-md shadow-sm">
              Save Book
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
