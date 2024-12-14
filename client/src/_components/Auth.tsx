import { useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/authSlice';

function setTokenAsCookie(token: string) {
    document.cookie = `token=${token}; path=/; Secure; HttpOnly`;
}

export function Auth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailValue = email.current?.value;
        const passwordValue = password.current?.value;

        if (!emailValue || !passwordValue) {
            toast.error('Please fill in all fields');
            return;
        }

        const formData = {
            email: emailValue,
            password: passwordValue,
        };

        const endpoint = isLogin
            ? 'http://localhost:3001/api/auth/login'
            : 'http://localhost:3001/api/auth/register';

        try {
            const promise = axios.post(endpoint, formData, { withCredentials: true });

            // Toast message
            await toast.promise(promise, {
                loading: 'Submitting...',
                success: isLogin
                    ? 'Successfully logged in!'
                    : 'Successfully registered!',
                error: (err) => {
                    const message =
                        err.response?.data?.message || 'Something went wrong.';
                    return message;
                },
            });

            const { data } = await promise;

            console.log('Response:', data);

            if (isLogin) {
                // Handle login success
                setTokenAsCookie(data.token);
                dispatch(setToken(data.token));
                navigate('/dashboard')
            } else {
                // Handle registration success
                setIsLogin(true); // Switch to login mode
            }
        } catch (err) {
            console.error('Error during submission:', err);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Reading List Manager</h1>

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{isLogin ? 'Login' : 'Register'}</CardTitle>
                    <CardDescription>
                        {isLogin ? 'Welcome back!' : 'Create a new account'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="email"
                                    placeholder="Email"
                                    type="email"
                                    ref={email}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="password"
                                    placeholder="Password"
                                    type="password"
                                    ref={password}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Need an account?' : 'Already have an account?'}
                    </Button>
                    <Button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</Button>
                </CardFooter>
            </Card>
            <Toaster />
        </main>
    )
}

