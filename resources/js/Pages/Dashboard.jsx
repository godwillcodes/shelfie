import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">Karibu Shelfie ❤️</h2>}>
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="sm:rounded-lg">
            <dl class="grid gap-5 grid-cols-1 mt-5 sm:grid-cols-3">
              <div class="px-4 py-5 bg-orange-500 rounded-lg overflow-hidden sm:p-6">
                <dt class="text-white text-sm font-medium truncate">Total Authors</dt>
                <dd class="mt-1 text-gray-900 text-3xl font-semibold tracking-tight">71,897</dd>
              </div>
              <div class="px-4 py-5 bg-orange-500 rounded-lg overflow-hidden sm:p-6">
                <dt class="text-white text-sm font-medium truncate">Total Books</dt>
                <dd class="mt-1 text-gray-900 text-3xl font-semibold tracking-tight">71,897</dd>
              </div>
              <div class="px-4 py-5 bg-orange-500 rounded-lg overflow-hidden sm:p-6">
                <dt class="text-white text-sm font-medium truncate">Current Users</dt>
                <dd class="mt-1 text-gray-900 text-3xl font-semibold tracking-tight">71,897</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
