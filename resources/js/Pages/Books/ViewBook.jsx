import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'

export default function ViewBook({ auth }) {
  const book = usePage().props.book

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">You are viewing a book 👀: {book.name} </h2>}>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
          <div>
            <div className="border-white/10 mt-6 border-t">
              <dl className="divide-white/10 divide-y">
                <div className="px-4 py-6 sm:grid sm:gap-4 sm:grid-cols-3 sm:px-0">
                  <dt className="text-white text-sm font-medium leading-6">BOOK</dt>
                  <dd className="mt-1 text-gray-400 text-sm leading-6 sm:col-span-2 sm:mt-0">{book.name}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:gap-4 sm:grid-cols-3 sm:px-0">
                  <dt className="text-white text-sm font-medium leading-6">ISBN CODE</dt>
                  <dd className="mt-1 text-gray-400 text-sm leading-6 sm:col-span-2 sm:mt-0">{book.isbn}</dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:gap-4 sm:grid-cols-3 sm:px-0">
                  <dt className="text-white text-sm font-medium leading-6">AUTHORS</dt>
                  <dd className="mt-2 text-white text-sm sm:col-span-2 sm:mt-0">
                    <ul role="list" className="divide-white/10 border-white/20 border rounded-md divide-y">
                      {book.authors.map((author) => (
                        <li key={author.id} className="flex items-center justify-between pl-4 pr-5 py-4 text-sm leading-6">
                          <div className="flex flex-1 items-center w-0">
                            <div className="flex flex-1 gap-2 ml-4 min-w-0">
                              <span className="font-medium truncate">{author.name}</span>
                              {/* <span className="flex-shrink-0 text-gray-400">4.5mb</span> */}
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <Link href={route('viewauthor', author.id)} className="hover:text-orange-500 text-orange-600">
                              View Author<span className="sr-only">, {author.name}</span>
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
          <div className="flex justify-between mt-8">
            <Link className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 block px-12 py-2 text-center text-white text-sm font-semibold hover:bg-orange-500 bg-orange-500 rounded-md shadow-sm" href={route('books')}>
              
              
              <div className="flex justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span className="ml-2">All Books</span>
              </div>
            </Link>

            {/* Second Button */}
            <Link className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 block px-12 py-2 text-center text-white text-sm font-semibold hover:bg-red-500 bg-red-500 rounded-md shadow-sm" href={route('updatebook', book.id)}>
              
              
              <div className="flex justify-between">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

              <span className="ml-2">Edit Book</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
