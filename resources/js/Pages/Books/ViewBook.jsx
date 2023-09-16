import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'

export default function ViewBook({ auth }) {
  const book = usePage().props.book

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">You are viewing a book  👀: {book.name} </h2>}>
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
                   
                    <ul role="list" className="divide-white/10  border-white/20 border rounded-md divide-y">
                    {book.authors.map((author) => (
                      <li key={author.id} className="flex items-center justify-between pl-4 pr-5 py-4  text-sm leading-6">
                        <div className="flex flex-1 items-center w-0">
                          <div className="flex flex-1 gap-2 ml-4 min-w-0">
                            <span className="font-medium truncate">{author.name}</span>
                            {/* <span className="flex-shrink-0 text-gray-400">4.5mb</span> */}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                        <Link href={route('viewauthor', author.id)} className="text-orange-600 hover:text-orange-500">
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
         
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
