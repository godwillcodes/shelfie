import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth, data }) {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">Karibu Shelfie 🥹</h2>}>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="sm:rounded-lg">
            <dl className="grid gap-5 grid-cols-1 mt-5 sm:grid-cols-3">
              <div className="px-4 py-5 bg-gray-800 rounded-lg overflow-hidden sm:p-6">
                <dt className="text-white text-lg font-medium truncate">Total Authors</dt>
                <dd className="mt-1 text-orange-400 text-3xl font-semibold tracking-tight">{data.authors}</dd>
              </div>
              <div className="px-4 py-5 bg-gray-800 rounded-lg overflow-hidden sm:p-6">
                <dt className="text-white text-lg font-medium truncate">Total Books</dt>
                <dd className="mt-1 text-orange-400 text-3xl font-semibold tracking-tight">{data.books}</dd>
              </div>
              <div className="px-4 py-5 bg-gray-800 rounded-lg overflow-hidden sm:p-6">
                <dt className="text-white text-lg font-medium truncate">Current Users</dt>
                <dd className="mt-1 text-orange-400 text-3xl font-semibold tracking-tight">{data.users}</dd>
              </div>
             
            </dl>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
