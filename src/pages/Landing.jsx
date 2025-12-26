// Landing page component
import React from 'react';
import Button from '../components/Button';

const Landing = ({ onStart }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg p-6">
            <div className="text-center max-w-2xl">
                {/* App name with gradient */}
                <h1 className="text-7xl font-bold mb-6 gradient-text text-shadow animate-fade-in">
                    Contexta
                </h1>

                {/* Tagline */}
                <p className="text-xl text-gray-400 mb-12 animate-fade-in-delay">
                    Ask smarter. Get grounded answers.
                </p>

                {/* Call to action */}
                <Button onClick={onStart} className="animate-fade-in-delay-2 mx-auto">
                    Start Asking
                </Button>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
