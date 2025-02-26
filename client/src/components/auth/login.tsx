
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router';
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

        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email</label>
                    <input type="text" {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;
