import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";

const SingleCurrency = ({ currency, price }) => {
    const prevPrice = useRef();
    const [animate, setAnimate] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setAnimate(null)
        }, 4000)
    }, [animate])
    useEffect(() => {
        console.log({ 'new price': price, 'prev price': prevPrice.current });
        if (price > prevPrice.current) setAnimate('rise')
        else if (price < prevPrice.current) setAnimate('fall')

        prevPrice.current = price;
    }, [price]);

    return (
        <Link className={`${animate ? animate === 'rise' ? 'text-green-500' : 'text-red-500' : ''} py-4 flex items-center gap-x-4 transition-all duration-500`} href={`/currencies/${currency.slug}`}>
            <span>
                {currency.name}
            </span>
            <span>
                {price}
            </span>
        </Link>
    );
}

export default memo(SingleCurrency);