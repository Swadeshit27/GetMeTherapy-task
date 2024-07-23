import { useState, useEffect, FC } from "react";
import toast from "react-hot-toast";

type props = {
    speed: number;
    timeDetails: (val: Date, time: Date) => void;
    startTime: Date;
    endDuration: Date;
};

const Clock: FC<props> = ({
    speed = 1,
    timeDetails,
    startTime,
    endDuration,
}) => { 
    const [time, setTime] = useState(startTime); 

    useEffect(() => {
        if (startTime.getTime() > endDuration.getTime()) {
            const timerId = setInterval(() => {
                setTime((prevTime) => new Date(prevTime.getTime() - speed * 1000));
                if (timeDetails) timeDetails(time, endDuration);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            toast.success("⏳ Time is up!");
        }
    }, [time, endDuration]);

    return (
        <>
            <section className="relative w-52 h-52 rounded-full  bg-white  mx-auto mt-10 border border-indigo-50">
                <div className="absolute top-1/2 left-[51%] transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-500 rounded-full border border-white z-[99999]" />
                <div
                    className="absolute w-1.5 h-[60px] left-[49.5%] top-[22%] bg-gray-900 origin-bottom"
                    style={{
                        transform: `rotate(${time.getHours() * 30}deg)`,
                        // transform: [{ rotateZ: `${time.getMinutes()/2}deg` }],
                        transformOrigin: "bottom",
                    }}
                />
                <div
                    className="absolute w-1 left-[50%] top-[15%] h-[74px] bg-gray-700"
                    style={{
                        transform: `rotate(${time.getMinutes() * 6}deg)`,
                        transformOrigin: "bottom",
                    }}
                />
                <div
                    className="absolute w-0.5 h-24 left-[50.5%] top-[4.5%]  bg-red-600 origin-bottom"
                    style={{
                        transform: `rotate(${time.getSeconds() * 6}deg)`,
                        transformOrigin: "bottom",
                    }}
                />
                <p
                    className={`font-semibold font-inter_600   text-main absolute left-[47%] top-1`}
                >
                    12
                </p>
                <p
                    className={`font-semibold font-inter_600   text-main absolute top-[46%] right-1`}
                >
                    3
                </p>
                <p
                    className={`font-semibold font-inter_600   text-main absolute bottom-0.5 left-[49%]`}
                >
                    6
                </p>
                <p
                    className={`font-semibold font-inter_600   text-main absolute top-[46%] left-1.5`}
                >
                    9
                </p>
                <p
                    className={`font-semibold font-inter_600 text-heading absolute top-[7.5%] right-[25%]`}
                >
                    1
                </p>
                <p
                    className={`font-semibold font-inter_600 text-heading absolute top-[7.5%] left-[25%]`}
                >
                    11
                </p>
                <p
                    className={`font-semibold font-inter_600 text-heading absolute top-[23.5%] right-[8%]`}
                >
                    2
                </p>
                <p
                    className={`font-semibold font-inter_600 text-heading absolute top-[24%] left-[8.5%]`}
                >
                    10
                </p>
                <p
                    className={`font-semibold font-inter_600 text-heading absolute top-[67.5%] right-[9%]`}
                >
                    4
                </p>
                <p
                    className={`font-semibold font-inter_600 text-heading absolute top-[68%] left-[9%]`}
                >
                    8
                </p>
                <p
                    className={`font-semibold font-inter_600 text-heading absolute bottom-[6.5%] right-[25%]`}
                >
                    5
                </p>
                <p
                    className={`font-semibold font-inter_600 text-heading absolute bottom-[6%] left-[26.5%]`}
                >
                    7
                </p>
            </section>
            <div className="mb-3 flex items-center justify-center flex-col text-white">
                <p className="p-center p-white font-medium  mt-5 p-xl">Welcome 🙏</p>
                <p className="p-center p-white font-medium mt-2 p-sm">
                    {time.toLocaleTimeString()}
                </p>
            </div>
        </>
    );
};

export default Clock;
