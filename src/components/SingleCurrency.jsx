import { toPrice, fixPrice, isWhatPercentOf, formatCash } from "@/utils/utils";
import Link from "next/link";
import { HiOutlineStar } from 'react-icons/hi'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { memo, useEffect, useRef, useState } from "react";
import Image from 'next/image'

const SingleCurrency = ({ currency, price }) => {
    if (currency.symbol == 'GUSD')
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
        <tr className='font-semibold text-sm border-b leading-6 border-gray-100 transition-all duration-100 hover:bg-slate-50'>
            <td className='p-1.5 md:p-2.5 table-cell'>
                <button className='hover hover:text-orange-700 transition-all duration-100  mt-1.5'>
                    <HiOutlineStar className="h-4 w-4 text-inherit" />
                </button>
            </td>
            <td className='p-1.5 md:p-2.5 hidden md:table-cell'>
                <p className="text-start text-xs text-gray-500 font-semibold">
                    {currency.cmcRank}
                </p>
            </td>
            <td className='p-1.5 md:p-2.5'>
                <Link href={`/currencies/${currency.slug}`} className='flex items-center gap-x-3 max-w-fit'>
                    <Image width={24} height={24} className='rounded-full' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt="" />
                    <div className="flex flex-col md:flex-row justify-start items-center">
                        <p className="text-start w-full font-semibold md:mr-1.5 whitespace-normal md:whitespace-nowrap">{currency.name}</p>
                        <div className="flex items-center w-full">
                            <p className="text-xs mr-1.5 px-1.5 py-0.5 md:hidden text-gray-800 rounded-md font-medium bg-gray-200 text-center">{currency.cmcRank}</p>
                            <p className="text-gray-500 text-start text-xs font-semibold md:bg-gray-100 px-2 py-0.5 rounded-md">{currency.symbol}</p>
                        </div>
                    </div>
                </Link>
            </td>
            <td className={`${animate ? animate === 'rise' ? 'text-green-500' : 'text-red-500' : ''} p-1.5 md:p-2.5 transition-all duration-500`} href={`/currencies/${currency.slug}`}>${toPrice(price)}</td>
            <td className="p-1.5 md:p-2.5">
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
            <td className="p-1.5 md:p-2.5">
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
            <td className="p-1.5 md:p-2.5">
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
            <td className="p-1.5 md:p-2.5">
                <p className="md:hidden">
                    ${formatCash(currency.quotes[2].fullyDilluttedMarketCap)}
                </p>
                <p className="hidden md:block">
                    ${fixPrice(currency.quotes[2].fullyDilluttedMarketCap)}
                </p>
            </td>
            <td className='p-1.5 md:p-2.5 px-4 md:px-4'>
                <div className='flex flex-col'>
                    <p>${fixPrice(currency.quotes[2].volume24h)}</p>
                    <p className='text-xs text-gray-500 whitespace-normal'>{fixPrice(currency.quotes[2].volume24h / currency.quotes[2].price)} <span>{currency.symbol}</span></p>
                </div>
            </td>
            <td width={130} className='p-2.5 px-4'>
                <div className='flex flex-col gap-y-1.5 whitespace-nowrap'>
                    <p>{fixPrice(currency.circulatingSupply)} <span>{currency.symbol}</span></p>
                    {currency.maxSupply ? (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                            <div className="bg-slate-400 h-1.5 rounded-full dark:bg-gray-500" style={{ width: `${isWhatPercentOf(currency.circulatingSupply, currency.maxSupply)}%` }}></div>
                        </div>
                    ) : ''}
                </div>
            </td>
            <td className='p-1.5 md:p-2.5 py-3 md:py-4 min-w-[164px]'>
                <div className="w-full">
                    <Image width={164} height={48} className={`whitespace-nowrap ${currency.quotes[2].percentChange7d > 0 ? 'hue-rotate-[85deg] saturate-[.8] brightness-[.85]' : 'hue-rotate-[300deg] saturate-[210%] brightness-[.7] contrast-[170%]'}`} src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${currency.id}.svg`} alt="" />
                </div>
            </td>
        </tr>
    );
}

export default memo(SingleCurrency);