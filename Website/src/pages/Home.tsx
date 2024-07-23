import React, { useState } from 'react';
import Clock from '../components/Clock';
import { MdLogout, MdShare } from 'react-icons/md';
import { auth } from '../firebase';
import SpeedSlider from '../components/SliderComp';
import Quote from '../components/Quote';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [url] = useSearchParams();
  const getSpeed = url.get('speed');
  const sTime = url.get('start-time');
  const eTime = url.get('end-time') as string

  const [speed, setSpeed] = useState<number>(getSpeed ? Number(getSpeed) : 1);
  // @ts-ignore
  const [startTime, setStartTime] = useState(sTime ? new Date(Number(sTime)) : new Date());
  // @ts-ignore
  const [endTime, setEndTime] = useState(eTime ? new Date(Number(eTime)) : new Date(new Date().getTime() - 120 * 60 * 1000));

  const [time, setTime] = useState({
    startTime: new Date(),
    endTime: new Date(),
  });

  const logoutUser = async () => {
    try {
      await auth.signOut();
      navigate('/login')
      toast.success('Logged out successfully!')
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleShare = async () => {
    try {
      const { startTime, endTime } = time;
      const url = `${import.meta.env.VITE_FRONTEND_URL}/tracking-screen?speed=${speed}&start-time=${startTime.getTime()}&end-time=${endTime.getTime()}`;
      // window.location.replace(url)
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!")
    } catch (error: any) {
      toast.error('Failed to copy: ' + error)
    }
  };

  return (
    <div className="relative flex flex-col  h-screen bg-gray-50 bg-img">
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-60"></div>
      <div className="relative flex-1 overflow-auto">
        <Clock
          speed={speed}
          timeDetails={(startTime, endTime) => setTime({ startTime, endTime })}
          startTime={startTime}
          endDuration={endTime}
        />
        {auth.currentUser && <button
          onClick={logoutUser}
          className="absolute right-4 sm:right-8 top-4 sm:top-8 text-2xl sm:text-3xl text-red-500 hover:text-red-600 flex items-center gap-2"
        >
          <MdLogout />
          <span className='text-xl font-medium max-md:hidden'>Sign Out</span>
        </button>
        }
        <div className="mt-auto w-full   min-h-[70vh] bg-white p-4 xxs:px-8 xxs:py-8 pt-1 xs:pt-4 rounded-t-3xl">
          <div className="w-[58px] mx-auto bg-black bg-opacity-20 h-1 rounded-full mt-2 mb-4 xs:hidden"></div>
          <SpeedSlider speed={speed} setSpeed={setSpeed} />
          {!getSpeed && <button
            onClick={handleShare}
            className="w-40 bg-blue-500 text-white rounded-md py-2 flex items-center justify-center gap-x-2 mx-auto mt-2"
          >
            <MdShare />
            <span className="max-xs:text-sm  font-medium ">Share Now</span>
          </button>}
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Home;
