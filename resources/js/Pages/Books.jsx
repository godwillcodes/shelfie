import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import NavLink from '@/Components/NavLink'

export default function Books({ auth, books }) {
  // Log the books data to the console
  console.log(books)
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">Books Dashboard 🚀</h2>}>
      <Head title="Books Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-white text-base font-semibold leading-6">Books</h1>
                <p className="mt-2 text-white text-sm">A list of all the books in your account including their name, ISBN, and Author</p>
              </div>
              <div className="mt-4 sm:flex-none sm:ml-16 sm:mt-0">
                <Link className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 block px-3 py-2 text-center text-white text-sm font-semibold hover:bg-orange-500 bg-orange-500 rounded-md shadow-sm" href={route('addbook')}>
                  Add Books
                </Link>
              </div>
            </div>
            <div className="flow-root mt-8">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block align-middle py-2 min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-gray-300 divide-y">
                      <thead className="bg-gray-800">
                        <tr>
                          <th scope="col" className="pl-4 pr-3 py-3.5 text-left text-white text-sm font-semibold sm:pl-6">
                            ID
                          </th>
                          <th scope="col" className="pl-4 pr-3 py-3.5 text-left text-white text-sm font-semibold sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-white text-sm font-semibold">
                            ISBN
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-white text-sm font-semibold">
                            Author
                          </th>
                          <th scope="col" className="relative pl-3 pr-4 py-3.5 sm:pr-6">
                            <span className="sr-only">View</span>
                          </th>

                         
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-gray-200 divide-y">
                        {books.map((book) => (
                          <tr key={book.id}>
                            <td className="pl-4 pr-3 py-4 text-gray-900 whitespace-nowrap text-sm font-medium sm:pl-6">{book.id}</td>
                            <td className="pl-4 pr-3 py-4 text-gray-900 whitespace-nowrap text-sm font-medium sm:pl-6">{book.name}</td>
                            <td className="px-3 py-4 text-gray-900 whitespace-nowrap text-sm">{book.isbn}</td>
                            <td className="px-3 py-4 text-gray-900 whitespace-nowrap text-sm">
                              <ul>
                                {book.authors.map((author) => (
                                  <li key={author.id}>{author.name}</li>
                                ))}
                              </ul>
                            </td>

                            <td className="relative pl-3 pr-4 py-4 text-right whitespace-nowrap text-sm font-medium sm:pr-6">
                              {/* <a href="#" className="text-orange-600 hover:text-orange-900">
                                View<span className="sr-only">, {book.name}</span>
                              </a>
                               make this a link to a single page depending on ID
                              */}
                              <Link href={route('viewbook', book.id)} className="text-orange-600 hover:text-orange-900">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>

<span className="sr-only">, {book.name}</span>
                              </Link>
                            </td>


                           
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
