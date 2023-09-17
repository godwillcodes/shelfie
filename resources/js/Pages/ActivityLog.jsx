import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function ActivityLogs({ auth, activityLogs, users }) {
  // Log the activityLogs data to the console
  console.log('activityLogs:', activityLogs)
  console.log('auth:', auth)
  console.log('users:', users)

  // Function to format the date in a better way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to display the resource name based on the subject type
  const displayResourceName = (subjectType) => {
    switch (subjectType) {
      case 'App\\Models\\Author':
        return 'Author Resource';
      case 'App\\Models\\Book':
        return 'Book Resource';
      default:
        return 'Unknown Resource';
    }
  };

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="dark:text-gray-200 text-gray-800 text-xl font-semibold leading-tight">Activity Logs 🔥</h2>}>
      <Head title="Activity Logs" />
      <div className="py-2">
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <ul role="list" className="divide-white-50 divide-y">
          {activityLogs.map((log) => (
            <li key={log.id} className="flex gap-x-6 items-center justify-between py-5">
              <div className="min-w-0">
                <div className="flex gap-x-3 items-start">
                  <p className="text-orange-500 text-base font-semibold leading-6">{displayResourceName(log.subject_type)} was updated</p>
                </div>
                <div className="flex gap-x-2 items-center mt-1 text-gray-500 text-xs leading-5">
                  <p className="whitespace-nowrap">
                    Updated on <time dateTime={log.updated_at}>{formatDate(log.updated_at)}</time>
                  </p>
                  <svg viewBox="0 0 2 2" className="w-0.5 h-0.5 fill-current">
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  <p className="truncate">Initiated by {log.causer.name}</p>
                </div>
              </div>
              <div className="flex flex-none gap-x-4 items-center">
                <p className="ring-green-600/20 mt-0.5 px-1.5 py-0.5 text-green-700 whitespace-nowrap text-xs font-medium bg-green-50 rounded-md ring-1 ring-inset">Success</p>
              </div>
            </li>
             ))}
          </ul>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
