const Login = ({ onSwitchToRegister }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Login form submitted')
    }
    
    return (
        <div className='flex min-h-screen'>
            <div className='w-3/5 bg-gradient-to-br from-gray-700 via-cyan-500 to-cyan-400 flex items-center justify-center p-12'>
                <div className='text-center text-white'>
                    <div className='mb-8'>
                        <div className='w-32 h-32 bg-black bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm'>
                            <span className='text-7xl'>🐔</span>
                        </div>
                        <h1 className='text-5xl font-bold mb-4'>SNAPHUB</h1>
                        <p className='text-xl text-cyan-100'>STUDIO</p>
                    </div>
                    <p className='text-lg text-cyan-50 max-w-md mx-auto'>
                        Capture moments, create memories. Join our creative community today.
                    </p>
                </div>
            </div>

            <div className='w-2/5 bg-white flex items-center justify-center p-12'>
                <div className='w-full max-w-md'>
                    <div className='flex justify-center mb-8'>
                        <h2 className='text-4xl font-semibold text-gray-800'>Login</h2>
                    </div>

                    <div className='space-y-5'>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            required 
                            className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400 transition-colors'
                        />
                        <input 
                            type="password" 
                            placeholder='Password' 
                            required 
                            className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400 transition-colors'
                        />
                        
                        <div className='text-right'>
                            <button 
                                type="button"
                                onClick={() => console.log('Forgot password clicked')} 
                                className='text-cyan-600 hover:underline cursor-pointer'>
                                Forgot password?
                            </button>
                        </div>

                        <button 
                            onClick={handleSubmit}
                            className='w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition-opacity mt-6'>
                            Login
                        </button>

                        <p className='text-center text-gray-600 mt-6'>
                            Don't have an account? 
                            <button 
                                type="button"
                                onClick={onSwitchToRegister}
                                className='text-cyan-600 hover:underline cursor-pointer ml-1'>
                                Create account now
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login