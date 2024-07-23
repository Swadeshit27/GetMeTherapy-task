import { FC } from 'react';

type SpeedSliderProps = {
    speed: number;
    setSpeed: (val: number) => void;
};

const SpeedSlider: FC<SpeedSliderProps> = ({ speed, setSpeed }) => {
    return (
        <div className='w-full max-w-xs mx-auto my-4'>
            <h4 className='text-heading font-medium text-base text-center mb-4'>Control the speed of clock hands</h4>
            {/* <Text className='text-heading font-inter_500'>Speed: {speed.toFixed(1)}</Text> */}
            <input
                type='range'
                min={1}
                max={15}
                step={0.1}
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className='w-full bg-gray-200 accent-main h-2 rounded-lg outline-none cursor-pointer'
            />
        </div>
    );
};

export default SpeedSlider;
