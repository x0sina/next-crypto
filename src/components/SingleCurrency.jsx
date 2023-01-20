import { toPrice, fixPrice, isWhatPercentOf } from "@/utils/utils";
import Link from "next/link";
import { HiOutlineStar } from 'react-icons/hi'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { memo, useEffect, useRef, useState } from "react";

const SingleCurrency = ({ currency, price }) => {
    console.log(currency);
    const prevPrice = useRef();
    const [animate, setAnimate] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setAnimate(null)
        }, 4000)
    }, [animate])
    useEffect(() => {
        if (prevPrice.current && (toPrice(price) !== toPrice(prevPrice.current))) {
            if (price > prevPrice.current) setAnimate('rise')
            else if (price < prevPrice.current) setAnimate('fall')
        }

        prevPrice.current = price;
    }, [price]);

    return (
        <tr className='font-semibold text-sm border-b border-gray-100 transition-all duration-100 hover:bg-slate-50'>
            <td className='p-2.5'>
                <button className='hover hover:text-orange-700 transition-all duration-100'>
                    <HiOutlineStar className="h-4 w-4 text-inherit" />
                </button>
            </td>
            <td className='p-2.5 text-start'>{currency.cmcRank}</td>
            <td className='p-2.5'>
                <Link href={`/currencies/${currency.slug}`} className='flex items-center gap-x-1'>
                    <img className='w-6 h-6 rounded-full' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt="" />
                    <p className="text-start">{currency.name}</p>
                    <p className="text-gray-500 text-start">{currency.symbol}</p>
                </Link>
            </td>
            <td className={`${animate ? animate === 'rise' ? 'text-green-500' : 'text-red-500' : ''} p-2.5 transition-all duration-500`} href={`/currencies/${currency.slug}`}>${toPrice(price)}</td>
            <td>
                <div className="flex items-center justify-center gap-x-1">
                    {currency.quotes[2].percentChange1h >= 0 ? (
                        <>
                            <VscTriangleUp className="h-3 w-3 text-green-500" />
                            <span className='text-green-500'>{currency.quotes[2].percentChange1h.toFixed(2)}%</span>
                        </>
                    ) : (
                        <>
                            <VscTriangleDown className="h-3 w-3 text-red-500" />
                            <span className='text-red-500'>{currency.quotes[2].percentChange1h.toFixed(2).replace('-', '')}%</span>
                        </>
                    )
                    }
                </div>
            </td>
            <td>
                <div className="flex items-center justify-center gap-x-1">
                    {currency.quotes[2].percentChange24h > 0 ? (
                        <>
                            <VscTriangleUp className="h-3 w-3 text-green-500" />
                            <span className='text-green-500'>{currency.quotes[2].percentChange24h.toFixed(2)}%</span>
                        </>
                    ) : (
                        <>
                            <VscTriangleDown className="h-3 w-3 text-red-500" />
                            <span className='text-red-500'>{currency.quotes[2].percentChange24h.toFixed(2).replace('-', '')}%</span>
                        </>
                    )
                    }
                </div>
            </td>
            <td>
                <div className="flex items-center justify-center gap-x-1">
                    {currency.quotes[2].percentChange7d >= 0 ? (
                        <>
                            <VscTriangleUp className="h-3 w-3 text-green-500" />
                            <span className='text-green-500'>{currency.quotes[2].percentChange7d.toFixed(2)}%</span>
                        </>
                    ) : (
                        <>
                            <VscTriangleDown className="h-3 w-3 text-red-500" />
                            <span className='text-red-500'>{currency.quotes[2].percentChange7d.toFixed(2).replace('-', '')}%</span>
                        </>
                    )
                    }
                </div>
            </td>
            <td>
                ${fixPrice(currency.quotes[2].fullyDilluttedMarketCap)}
            </td>
            <td className='p-2.5'>
                <div className='flex flex-col'>
                    <p>${fixPrice(currency.quotes[2].volume24h)}</p>
                    <p className='text-xs'>1,000,122 <span>BTC</span></p>
                </div>
            </td>
            <td className='p-2.5'>
                <div className="flex flex-col gap-y-1.5">
                    <p>{fixPrice(currency.circulatingSupply)} <span>{currency.symbol}</span></p>
                    {currency.maxSupply && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                            <div className="bg-slate-400 h-1.5 rounded-full dark:bg-gray-500" style={{ width: `${isWhatPercentOf(currency.circulatingSupply, currency.maxSupply)}%` }}></div>
                        </div>
                    )}
                </div>
            </td>
            <td className='py-4'>
                <img className={`${currency.quotes[2].percentChange7d > 0 ? 'hue-rotate-[85deg] saturate-[.8] brightness-[.85]' : 'hue-rotate-[300deg] saturate-[210%] brightness-[.7] contrast-[170%]'}`} src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${currency.id}.svg`} alt="" />
            </td>
        </tr>
    );
}

export default memo(SingleCurrency);