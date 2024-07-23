import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa';

const slides = [
    {
        title: 'We serve incomparable delicacies',
        description:
            'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!',
        imgSrc: '/assets/bg-image.webp',
        bigImg: '/assets/bg-img3.webp'
    },
    {
        title: 'We serve incomparable delicacies  ',
        description:
            'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!! ',
        imgSrc: '/assets/bg-img2.webp',
        bigImg: '/assets/bg-img.webp'
    },
    {
        title: 'We serve incomparable delicacies  ',
        description:
            'All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!  ',
        imgSrc: '/assets/bg-image.webp',
        bigImg: '/assets/bg-img4.webp'
    },
];

const OuterScreen = () => {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const navigateScreen = () => {
        auth.onAuthStateChanged(user => {
            if (user) navigate('/tracking-screen');
            else navigate('/login');
        })
    }

    return (
        <>
            <div className="w-full h-screen relative flex items-center justify-center">
                {slides.map((item, i) => (
                    <>
                        <img
                            key={i}
                            className={`w-full h-full object-cover absolute sm:hidden ${index === slides.indexOf(item) ? 'block' : 'hidden'
                                }`}
                            src={item.imgSrc}
                        />
                        <img
                            key={i}
                            className={`w-full h-full object-cover absolute max-sm:hidden ${index === slides.indexOf(item) ? 'block' : 'hidden'
                                }`}
                            src={item.bigImg}
                        />
                    </>
                ))}
                <div className="w-[311px] h-[400px] xs:w-full max-w-md xs:h-80 bg-main rounded-[48px] xs:rounded-3xl mx-auto mt-auto mb-9 p-6 xs:p-8 z-[999]">
                    <div className="">
                        {slides.map((slide, i) => (
                            <div
                                key={i}
                                className={`${index === i ? 'flex' : 'hidden'
                                    } flex-col items-center`}>
                                <h1 className="text-white text-center text-[30px] leading-[36px] font-semibold mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-center text-sm xs:text-base font-inter_400 text-white">
                                    {slide.description}
                                </p>
                            </div>
                        ))}
                        <div className="flex flex-row justify-center gap-x-2 mt-6">
                            {[0, 1, 2].map(item => (
                                <div
                                    key={item}
                                    className={`w-6 h-1.5 ${item === index ? 'bg-white' : 'bg-[#C2C2C2]'} rounded-full`}
                                >
                                </div>
                            ))}
                        </div>
                    </div>
                    {index !== slides.length - 1 ? (
                        <div className="flex items-center justify-between flex-row mt-24 xs:mt-16 ">
                            <button
                                onClick={navigateScreen}
                                className="z-[999]"
                            >
                                <p className="text-white text-sm font-inter_400">Skip</p>
                            </button>
                            <button
                                onClick={() => setIndex(index + 1)}
                                className="flex flex-row items-center gap-x-2">
                                <p className="text-white text-sm font-inter_400">Next</p>
                                <FaArrowRightLong size={16} color={'#fff'} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center flex-row  mt-4">
                            <button
                                className="relative -rotate-90 flex items-center justify-center  rounded-full"
                                onClick={navigateScreen}>
                                <div className="absolute w-[62px] h-[62px] rounded-full bg-white flex items-center justify-center">
                                    <FaArrowRight size={18} color={'#FE8C00'} className='rotate-90' />
                                </div>
                                <svg width="94" height="94" viewBox="0 0 36 36">
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        fill="none"
                                        strokeWidth="1"
                                        stroke="#FE9514"
                                    />
                                    <g rotate="180" origin="18, 18">
                                        <circle
                                            cx="18"
                                            cy="18"
                                            r="16"
                                            fill="none"
                                            strokeWidth="1"
                                            stroke="#FFFFFF"
                                            strokeDasharray="150"
                                            strokeDashoffset="75"
                                        />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default OuterScreen;
