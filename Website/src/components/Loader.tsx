import { FadeLoader } from "react-spinners"

const Loader = () => {
    return (
        <>
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg- black/50 z-[9999]'>
                <FadeLoader color="#FE8C00" />
            </div>
        </>
    )
}

export default Loader 