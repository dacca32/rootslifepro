import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import AuthService from '../../services/auth/auth-service';
import { Link, useNavigate } from '@tanstack/react-router';

// Define the validation schema using Zod
const registerSchema = z.object({
    firstName: z.string().min(3, 'First name must be at least 3 characters long').nonempty('First name is required'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters long').nonempty('Last name is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;


const Register: React.FC = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        const { firstName, lastName, email, password } = data;
        try {
            let regData = await AuthService.registerUser({ firstName, lastName, email, password });
            navigate({ to: '/auth/login', params: { regData } })
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200'>Sign up here!</h2>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div>
                        <label htmlFor='firstName' className='block text-sm/6 font-medium text-gray-200'>First Name</label>
                        <div className='mt-2'>
                            <input type="text" {...register('firstName')} placeholder='Enter first name...' className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
                        </div>
                        {errors.firstName && <p>{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='lastName' className='block text-sm/6 font-medium text-gray-200'>Last Name</label>
                        <div className='mt-2'>
                            <input type="text" {...register('lastName')} placeholder='Enter last name...' className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
                        </div>
                        {errors.lastName && <p>{errors.lastName.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-sm/6 font-medium text-gray-200'>Email</label>
                        <div className='mt-2'>
                            <input type="text" {...register('email')} placeholder='Enter email address...' className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
                        </div>
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor='password' className='block text-sm/6 font-medium text-gray-200'>Password</label>
                        </div>
                        <div className='mt-2'>
                            <input type="password" {...register('password')} placeholder='Enter password...' className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
                </form>

                <p className='mt-10 text-center text-sm/6 text-gray-300'>
                    Alread got an account? <Link to='/auth/login' className='font-semibold text-indigo-600 hover:text-indigo-500'>Login now</Link> </p>
            </div>

        </div>
    )
}

export default Register;