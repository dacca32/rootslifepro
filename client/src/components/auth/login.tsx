
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { Link, useNavigate } from '@tanstack/react-router';
import AuthService from '../../services/auth/auth-service';
import { useAuth } from '../../contexts/auth/auth-context';



// Define the validation schema using Zod
const loginSchema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long').nonempty('Password is required'),
});

// Define the type for the form data
type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginComponent: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        const { email, password } = data;
        try {
            let sessionData = await AuthService.loginUser({ email, password });
            login(sessionData)
            navigate({ to: '/home', params: {} })
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200'>Sign in to your account</h2>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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

                            <div className='text-sm'>
                                <Link to='/auth/login' className='fon-semibold text-indigo-600 hover:text-indigo-500'>
                                    Forgot password</Link>
                            </div>
                        </div>
                        <div className='mt-2'>

                            <input type="password" {...register('password')} placeholder='Enter password...' className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Login</button>
                </form>

                <p className='mt-10 text-center text-sm/6 text-gray-300'>
                    Not got an account? <Link to='/auth/register' className='font-semibold text-indigo-600 hover:text-indigo-500'>Sign up here</Link> </p>
            </div>

        </div>
    );
};

export default LoginComponent;
