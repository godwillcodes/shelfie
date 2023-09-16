import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();

export default function Authors({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    book_ids: [],
  })

  // Define state to store authors
  const [bookOptions, setBookOptions] = useState([])

  // Fetch authors when the component mounts
  // Fetch authors when the component mounts
  useEffect(() => {
    // Make an API call to fetch authors
    fetch('/list-books') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setBookOptions(data.books.map((book) => ({ value: book.id, label: book.name })))
      })
      .catch((error) => {
        console.error('Error fetching books:', error)
      })
  }, [])

  // Define the submit function
  function submit(e) {
    e.preventDefault()
    console.log('Form Data:', data)

    post('/add-author', {
      body: JSON.stringify({
        name: data.name,
        book_ids: data.book_ids,
      }),
      onSuccess: () => {
        // Handle a successful form submission if needed
        console.log('Form submitted successfully')
      },
    })
  }

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">You are adding an author, good sir ✨</h2>}>
      <Head title="Author Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
          <form className="space-y-12" onSubmit={submit}>
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium leading-6">
                Author's Name
              </label>
              <input type="text" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="bg-white ring-white/10 block py-1.5 w-full text-neutral-950 border-0 rounded-md shadow-sm ring-1 focus:ring-2 ring-inset focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6" />
              {errors.name && <div className="text-red-600 capitalize">{errors.name}</div>}
            </div>

            <div>
              {/* Author dropdown */}
              <label htmlFor="book_id" className="block text-white text-sm font-medium leading-6">
                Select Book
              </label>
              <Select
                isMulti
                options={bookOptions}
                closeMenuOnSelect={false}
      components={animatedComponents}
                value={bookOptions.filter((option) => data.book_ids.includes(option.value))}
                onChange={(selectedOptions) => {
                  // Extract an array of selected values
                  const selectedValues = selectedOptions.map((option) => option.value)
                  setData('book_ids', selectedValues)
                }}
                className="text-neutral-950 w-full border-0 rounded-md shadow-sm ring-1 focus:ring-2 ring-inset focus:ring-inset focus:ring-white-500 sm:text-sm sm:leading-6"
              />

              {errors.book_ids && <div className="text-red-600 capitalize">{errors.book_ids}</div>}
            </div>

            {/* Submit button */}
            <button type="submit" disabled={processing} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 px-3 py-2 text-white text-sm font-semibold hover:bg-orange-400 bg-orange-500 rounded-md shadow-sm">
              Save Author
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
