import { ArrowLeftStartOnRectangleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/auth/auth-context";
import { useNavigate } from "@tanstack/react-router";
import TodayDate from "../utilities/time-date-display/time-date-display";

function HomeComponent() {

    const { logout, loggedInUser } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <img alt="" src="https://amzn-s3-rootslife-bucket.s3.amazonaws.com/palmtrees.jpg.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3ISBWACFOPJCYSCM%2F20250226%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250226T153246Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5c694e80d994026d8ea7a1480c42d5817b6da721683e1a2df923b5b0636ad53e" className="h-32 w-full object-cover lg:h-48" />
            </div>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div className="flex">
                        <img alt="" src="" className="size-24 rounded-full ring-4 ring-white sm:size-32" />
                    </div>
                    <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden md:block space-y-1">
                            <h2 className="truncate text-2xl font-bold text-gray-900">Hey, {loggedInUser?.first_name}</h2>
                            <TodayDate />
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
                                onClick={async () => { logout(); navigate({ to: '/home' }) }}
                                type="button"
                                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <ArrowLeftStartOnRectangleIcon aria-hidden="true" className="-ml-0.5 mr-1.5 size-5 text-gray-400" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                    <h1 className="truncate text-2xl font-bold text-gray-900">{'{profileName}'}</h1>
                </div>
            </div>
        </div>
    )
}

export default HomeComponent;