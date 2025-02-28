import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../contexts/auth/auth-context";
import TodayDate from "../utilities/time-date-display/time-date-display";
import { ArrowLeftStartOnRectangleIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const HeaderComponent = () => {

    const { logout, loggedInUser } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
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
                                onClick={async () => { logout(); navigate({ to: '/auth/login' }) }}
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

export default HeaderComponent;