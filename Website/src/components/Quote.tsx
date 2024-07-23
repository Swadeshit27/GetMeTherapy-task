
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Quote = () => {
    const [quote, setQuote] = useState<quoteType>({
        quote: 'Part of the happiness of life consists not in fighting battles, but in avoiding them. A masterly retreat is in itself a victory.',
        author: 'Norman Vincent Peale'
    });
    const [start, setStart] = useState<boolean>(false);

    const getQuote = async () => {
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
                headers: {
                    'X-Api-Key': import.meta.env.VITE_QUOTE_API_KEY,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
            const data = await response.json();
            setQuote(data[0]);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                getQuote();
            }, 5000);
            return () => clearInterval(interval);
        }
        else getQuote()
    }, [start]);

    return (
        <>
            <section
                className={
                    quote
                        ? `w-full max-w-md mx-auto mt-8  bg-main rounded-xl  p-6  h-auto transition-all ease-linear duration-500 `
                        : 'h-0 p-0  transition-all ease-linear duration-500'
                }>
                <p className="text-sm text-white font-inter_500 text-center">
                    {quote.quote}
                </p>
                <p className="text-white opacity-85 capitalize text-end mt-2" >
                    ~ {quote?.author}
                </p>
            </section>
            <div className="flex items-center justify-center mt-4">
                <button
                    className="w-56 mx-auto bg-blue-500 py-3 rounded-full z-[99999] "
                    onClick={() => setStart(!start)}>
                    <p className="text-white text-center font-medium">
                        {start ? 'Stop' : 'Start'} Getting quote
                    </p>
                </button>
            </div>
        </>
    )
}

export default Quote 