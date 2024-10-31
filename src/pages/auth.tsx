import React, { useContext, useState } from 'react';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validation.ts';

import { account, ID } from '../utils/appwriteconfig';
import { UserAuthContext } from '../components/authcontext';
import Alert from '../components/alert.tsx';

const Auth: React.FC = () => {
    const context = useContext(UserAuthContext);
    const { setUser } = context!;
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', username: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    const [alert, setAlert] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error'; handleClose: () => void }>({ message: '', type: 'info', handleClose: () => {} });

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            const { email, password } = form;
            console.log('Logging in with:', email);

            if (email === '' || password === '') {
                setAlert({ message: 'Please fill in all fields', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
                return;
            }

            const emailValid = validateEmail(email);
            if (!emailValid) {
                setAlert({ message: 'Please enter a valid email address', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
                return;
            }

            const passwordValid = validatePassword(password);
            if (!passwordValid) {
                setAlert({ message: 'Password must be at least 8 characters long', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
                return;
            }

            try {
                const session = await account.createEmailPasswordSession(email, password);
                if (session) {
                    const user = await account.get();
                    setUser(user);
                    console.log(user);
                    if (user?.labels?.includes('admin')) {
                        setAlert({ message: 'Welcome Admin', type: 'success', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });

                        return navigate('/handleproducts');
                    }
                    return navigate('/products');
                }

            } catch (error: any) {
                setAlert({ message: error.message, type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
            }
        } else {
            const { email, password, confirmPassword, username } = form;
            console.log('Signing up with:', email, username);

            if (email === '' || password === '' || confirmPassword === '' || username === '') {
                setAlert({ message: 'Please fill in all fields', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
                return;
            }

            const emailValid = validateEmail(email);
            if (!emailValid) {
                setAlert({ message: 'Please enter a valid email address', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
                return;
            }

            const passwordValid = validatePassword(password);
            if (!passwordValid) {
                setAlert({ message: 'Password must be at least 8 characters long', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
                return;
            }

            if (password !== confirmPassword) {
                setAlert({ message: 'Passwords do not match', type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
                return;
            }

            try {
                await account.create(ID.unique() ,email, password, username);
                
                setAlert({ message: 'Account created successfully', type: 'success', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });

                setIsLogin(true);
            } catch (error: any) {
                setAlert({ message: error.message, type: 'error', handleClose: () => setAlert({ message: '', type: 'info', handleClose: () => {} }) });
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            {
                alert.message !== '' && (
                    <Alert
                        message={alert.message}
                        type={alert.type}
                        duration={3000}
                        onClose={alert.handleClose}
                    />
                )
            }
            <div className="w-full max-w-md p-10 bg-white dark:bg-gray-800 shadow-md rounded-md">

                <div className="space-y-2 mb-10">
                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                        {isLogin ? 'Welcome Back' : 'Create an Account'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isLogin ? 'Please sign in' : 'Please sign up'}
                    </p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            required
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    {!isLogin && (
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                required
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            />
                        </div>
                    )    
                    }

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="●●●●●●●"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 focus:outline-none"
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>

                    {!isLogin && (
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="●●●●●●●"
                                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 focus:outline-none"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            onClick={toggleAuthMode}
                        >
                            {isLogin ? 'Not Registered? Create an Account' : 'Already Registered? Sign In'}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-400 to-blue-700 dark:from-blue-600 dark:to-blue-900 rounded hover:from-blue-700 hover:to-blue-900"
                        onClick={submitForm}
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
