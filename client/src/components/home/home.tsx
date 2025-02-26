import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

function HomeComponent() {
    <div>
        <div>
            <img alt="" src="" className="h-32 w-full object-cover lg:h-48" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                    <img alt="" src="" className="size-24 rounded-full ring-4 ring-white sm:size-32" />
                </div>
                <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                        <h1 className="truncate text-2xl font-bold text-gray-900">LOGGED IN USER NAME</h1>
                    </div>
                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <EnvelopeIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5 text-gray-400" />
                            <span>Message</span>
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <PhoneIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5 text-gray-400" />
                            <span>Call</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                <h1 className="truncate text-2xl font-bold text-gray-900">{'{profileName}'}</h1>
            </div>
        </div>
    </div>
}

export default HomeComponent;