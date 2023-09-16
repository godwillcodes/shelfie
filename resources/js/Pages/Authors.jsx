import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Link } from '@inertiajs/react'

export default function Authors({ auth, authors }) {
  // Log the books data to the console
  console.log(authors)
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">Authors Dashboard 🔥</h2>}>
      <Head title="Authors Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-white text-base font-semibold leading-6">Authors</h1>
                <p className="mt-2 text-white text-sm">A list of all the Authors in your account including their name, books</p>
              </div>
              <div className="mt-4 sm:flex-none sm:ml-16 sm:mt-0">
                <Link className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 block px-3 py-2 text-center text-white text-sm font-semibold hover:bg-orange-500 bg-orange-500 rounded-md shadow-sm" href={route('addauthor')}>
                  Add Author
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
                            Books
                          </th>

                          <th scope="col" className="relative pl-3 pr-4 py-3.5 sm:pr-6">
                            <span className="sr-only">View</span>
                          </th>

                          <th scope="col" className="relative pl-3 pr-4 py-3.5 sm:pr-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-gray-200 divide-y">
                        {authors.map((author) => (
                          <tr key={author.id}>
                            <td className="pl-4 pr-3 py-4 text-gray-900 whitespace-nowrap text-sm font-medium sm:pl-6">{author.id}</td>
                            <td className="pl-4 pr-3 py-4 text-gray-900 whitespace-nowrap text-sm font-medium sm:pl-6">{author.name}</td>
                            {/* <td className="px-3 py-4 text-gray-900 whitespace-nowrap text-sm">{book.isbn}</td> */}
                            <td className="px-3 py-4 text-gray-900 whitespace-nowrap text-sm">
                              <ul>
                                {author.books.map((book) => (
                                  <li key={book.id}>
                                    <strong>{book.name} </strong> whose code is <strong>{book.isbn} </strong>
                                    <br />
                                    <br />
                                    {/* Add more book details here as needed */}
                                  </li>
                                ))}
                              </ul>
                            </td>
                            <td className="relative pl-3 pr-4 py-4 text-right whitespace-nowrap text-sm font-medium sm:pr-6">
                              <a href="#" className="text-orange-600 hover:text-orange-900">
                                View<span className="sr-only">, {author.name}</span>
                              </a>
                            </td>

                            <td className="relative pl-3 pr-4 py-4 text-right whitespace-nowrap text-sm font-medium sm:pr-6">
                              <a href="#" className="text-orange-600 hover:text-orange-900">
                                Edit<span className="sr-only">, {author.name}</span>
                              </a>
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
