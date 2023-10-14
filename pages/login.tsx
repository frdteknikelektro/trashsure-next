// components/Login.tsx
import React, { useCallback } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login: React.FC = () => {
    const router = useRouter()
    const { status } = useSession()

    const handleGoogleLogin = useCallback(() => {
        if (status === "unauthenticated") signIn('google').catch()
        else if (status === "authenticated") router.push('/home').catch()
    }, [router, status]);

    return (
        <div className="bg-green-400 dark:bg-gray-800 min-h-screen flex flex-col items-center">
            <div className="bg-white dark:bg-gray-900 rounded-t-3xl p-6 max-w-full w-full mt-auto">
                <h2 className="text-xl mb-4 dark:text-white">Masuk Pilah Sampah</h2>
                <button
                    onClick={handleGoogleLogin}
                    className={`w-full py-2 dark:bg-gray-800 rounded border border-blue-700 flex items-center justify-center mt-4`}
                >
                    <img
                        src="/google-logo.png"  // Replace with the path to your Google logo image
                        alt="Google Logo"
                        className="w-6 h-6 mr-2"
                    />
                    Masuk dengan Akun Google
                </button>
                <div className="mt-4 text-center">
                    <p>Belum memiliki akun? <a href="#">Buat Akun</a></p>
                </div>
                <div className="mt-2 text-center">
                    <a href="#">Lupa Password</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
