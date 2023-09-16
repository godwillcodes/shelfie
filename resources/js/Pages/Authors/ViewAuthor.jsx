import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'

export default function ViewAuthor({ auth }) {
  const author = usePage().props.author

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">You are viewing an author  👀: {author.name} </h2>}>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
          <div>
            <div className="border-white/10 mt-6 border-t">
              <dl className="divide-white/10 divide-y">
                <div className="px-4 py-6 sm:grid sm:gap-4 sm:grid-cols-3 sm:px-0">
                  <dt className="text-white text-sm font-medium leading-6">NAME</dt>
                  <dd className="mt-1 text-gray-400 text-sm leading-6 sm:col-span-2 sm:mt-0">{author.name}</dd>
                </div>
                           
                <div className="px-4 py-6 sm:grid sm:gap-4 sm:grid-cols-3 sm:px-0">
                  <dt className="text-white text-sm font-medium leading-6">BOOKS</dt>
                  <dd className="mt-2 text-white text-sm sm:col-span-2 sm:mt-0">
                   
                    <ul role="list" className="divide-white/10  border-white/20 border rounded-md divide-y">
                    {author.books.map((book) => (
                      <li key={book.id} className="flex items-center justify-between pl-4 pr-5 py-4  text-sm leading-6">
                        <div className="flex flex-1 items-center w-0">
                          <div className="flex flex-1 gap-2 ml-4 min-w-0">
                            <span className="font-medium truncate">{book.name}</span>
                            {/* <span className="flex-shrink-0 text-gray-400">4.5mb</span> */}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {/* <a href="#" className="hover:text-indigo-300 text-indigo-400 font-medium">
                            Tell Me More
                          </a> CHANGE THIS TO LINK USING INERTIA */}
                           <Link href={route('viewbook', book.id)} className="text-orange-600 hover:text-orange-500">
                                View Book<span className="sr-only">, {book.name}</span>
                              </Link>

                        </div>
                      </li>
                        ))}
                    </ul>
                   
                  </dd>
                </div>
              </dl>
            </div>
          </div>
         
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
