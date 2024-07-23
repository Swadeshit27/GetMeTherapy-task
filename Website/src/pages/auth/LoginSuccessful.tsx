import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase"

const LoginSuccessful = () => {
    const navigate = useNavigate()
    return (
        <section className="w-full h-screen flex items-center justify-center bg-img">
            <div className='w-full xs:max-w-md sm:max-w-xl mx-auto bg-white max-xs:rounded-t-3xl xs:rounded-lg px-8 pt-2 xs:py-12 max-xs:h-[60vh] max-xs:mt-auto'>
                <div className='w-[58px] mx-auto bg-black/20 h-1 rounded-full mt-2 xs:hidden'></div>
                <img
                    src='/assets/Success.png'
                    width={200}
                    height={168}
                    className='mx-auto mt-10'
                />
                <h3 className='text-2xl font-semibold text-heading text-center mt-6'>Login Successful</h3>
                <div className="flex flex-col items-center justify-center">
                    <button
                        className='bg-main w-full xs:max-w-xs py-4 rounded-full mt-6'
                        onClick={() => navigate('/tracking-screen')}
                    >
                        <p className='text-white text-center max-xs:text-sm  font-semibold'>Go to Tracking Screen</p>
                    </button>

                    <button
                        onClick={async () => (await auth.signOut(), navigate('/'))}
                        className='max-xs:text-sm  text-para1 text-center mt-6 font-medium'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </section>
    )
}

export default LoginSuccessful 