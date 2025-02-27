import { useAuth } from "../../contexts/auth/auth-context";




const HeaderComponent = () => {

    const { loggedInUser } = useAuth();


    return (
        <div className="md:flex md:items-center md:justify-between md:space-x-5 p-8">
            <div className="flex items-start space-x-5">
                <div className="shrink-0">
                    <div className="relative">

                        <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                    </div>
                </div>
                {/*
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        */}
                <div className='flex items-center'>
                    <h2 className="text-2xl font-bold text-gray-900">{loggedInUser?.first_name}</h2>
                </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    @todo
                </button>
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    @todo
                </button>
            </div>
        </div>

    )
}

export default HeaderComponent;