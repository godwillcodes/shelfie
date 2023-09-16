import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

export default function Books({ auth }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    isbn: '',
    author_id: [],
  })

  // Define state to store authors
  const [authorsOptions, setAuthorsOptions] = useState([])

  // Fetch authors when the component mounts
  useEffect(() => {
    // Make an API call to fetch authors
    fetch('/list-authors') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setAuthorsOptions(data.authors.map((author) => ({ value: author.id, label: author.name })))
      })
      .catch((error) => {
        console.error('Error fetching authors:', error)
      })
  }, []) // The empty dependency array ensures this effect runs once on component mount

  // Define the submit function
  function submit(e) {
    e.preventDefault()
    console.log('Form Data:', data)

    // Post the form data to the server
    post('/add-book', {
      body: JSON.stringify({
        name: data.name,
        isbn: data.isbn,
        author_id: data.author_id,
      }),
      onSuccess: () => {
        // Handle a successful form submission if needed
        console.log('Form submitted successfully')
      },
    })
  }

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">You are adding a book, good sir ✨</h2>}>
      <Head title="Books Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
          <form className="space-y-12" onSubmit={submit}>
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium leading-6">
                Name
              </label>
              <input type="text" id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="bg-white ring-white/10 block py-1.5 w-full text-dark border-0 rounded-md shadow-sm ring-1 focus:ring-2 ring-inset focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6" />
              {errors.name && <div>{errors.name}</div>}
            </div>

            <div>
              <label htmlFor="isbn" className="block text-white text-sm font-medium leading-6">
                ISBN
              </label>
              <input type="text" id="isbn" value={data.isbn} onChange={(e) => setData('isbn', e.target.value)} className="bg-white ring-white/10 block py-1.5 w-full text-dark border-0 rounded-md shadow-sm ring-1 focus:ring-2 ring-inset focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6" />
              {errors.isbn && <div>{errors.isbn}</div>}
            </div>

            <div>
              {/* Author dropdown */}
              <label htmlFor="author_id" className="block text-white text-sm font-medium leading-6">
                Author
              </label>
              {/* select from react */}
              <Select
                isMulti
                options={authorsOptions}
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={authorsOptions.filter((option) => data.author_id.includes(option.value))}
                onChange={(selectedOptions) => {
                  // Extract an array of selected values
                  const selectedValues = selectedOptions.map((option) => option.value)
                  setData('author_id', selectedValues)
                }}
                className="w-full text-nuetral-950 border-0 rounded-md shadow-sm ring-1 focus:ring-2 ring-inset focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />

              {errors.author_id && <div>{errors.author_id}</div>}
            </div>

            {/* Submit button */}
            <button type="submit" disabled={processing} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 px-3 py-2 text-white text-sm font-semibold hover:bg-orange-400 bg-orange-500 rounded-md shadow-sm">
              Save Book
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
