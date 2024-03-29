import { toPrice, fixPrice, isWhatPercentOf, formatCash } from "@/utils/utils";
import Link from "next/link";
import { HiOutlineStar } from 'react-icons/hi'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { memo, useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { usePopper } from "react-popper";

const HomePageTableRow = ({ currency, price }) => {
    const [animate, setAnimate] = useState(null)
    const prevPrice = useRef();
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [hoverOpen, setHoverOpen] = useState(false)
    const { styles, attributes } = usePopper(referenceElement, popperElement);

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
        <tr className='font-semibold text-sm border-b leading-6 border-gray-200 transition-all duration-100 hover:bg-slate-50'>
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
            <td className='p-1.5 md:p-2.5 !pr-0'>
                <Link href={`/currencies/${currency.slug}`} className='flex items-center gap-x-3 max-w-fit py-3'>
                    <Image width={24} height={24} className='rounded-full' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt="" />
                    <div className="flex flex-col md:flex-row justify-start items-start md:items-center">
                        <p className="text-start font-semibold md:mr-1.5 leading-5">{currency.name}</p>
                        <div className="flex items-center w-full md:w-fit">
                            <p className="text-xs mr-1 md:mr-1.5 px-1.5 py-0.5 md:hidden text-gray-800 rounded-md font-medium bg-gray-200 text-center">{currency.cmcRank}</p>
                            <p className="text-gray-500 text-start text-xs font-semibold md:bg-gray-100 px-1 py-0.5 rounded-md sm:w-auto">{currency.symbol}</p>
                        </div>
                    </div>
                </Link>
            </td>
            <td className={`${animate ? animate === 'rise' ? 'text-green-500' : 'text-red-500' : ''} p-1 md:p-2.5 transition-all duration-500`} href={`/currencies/${currency.slug}`}>
                <p>
                    ${toPrice(price)}
                </p>
            </td>
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
            <td className='p-1.5 md:p-2.5'>
                <div className='flex flex-col'>
                    <p>${fixPrice(currency.quotes[2].volume24h)}</p>
                    <p className='text-xs text-gray-500 whitespace-nowrap'>{fixPrice(currency.quotes[2].volume24h / currency.quotes[2].price)} <span>{currency.symbol}</span></p>
                </div>
            </td>
            <td width={130} className='p-2.5 relative'>
                <button className={`${!currency.maxSupply && 'cursor-default'} w-full text-end`} onMouseEnter={(() => setHoverOpen(true))} onMouseLeave={() => setHoverOpen(false)} ref={setReferenceElement}>
                    <div className='flex flex-col gap-y-1.5 whitespace-nowrap'>
                        <p>{fixPrice(currency.circulatingSupply)} <span>{currency.symbol}</span></p>
                        {currency.maxSupply ? (
                            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                <div className="bg-slate-400 h-1.5 rounded-full dark:bg-gray-500" style={{ width: `${isWhatPercentOf(currency.circulatingSupply, currency.maxSupply)}%` }}></div>
                            </div>
                        ) : ''}
                    </div>
                </button>
                {currency.maxSupply ? (
                    <div className={`transition-all text-xs absolute w-80 duration-300 flex flex-col gap-y-2 z-20 bg-white rounded-md p-4 shadow ${hoverOpen ? 'opacity-100' : 'invisible opacity-0'}`} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                        <div className="flex items-center justify-between">
                            <span className="">Percentage</span>
                            <span className="">{isWhatPercentOf(currency.circulatingSupply, currency.maxSupply).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                            <div className="bg-slate-400 h-1.5 rounded-full dark:bg-gray-500" style={{ width: `${isWhatPercentOf(currency.circulatingSupply, currency.maxSupply)}%` }}></div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center justify-between">
                                <span>Circulating Supply</span>
                                <p>{fixPrice(currency.circulatingSupply)} <span>{currency.symbol}</span></p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Max Supply</span>
                                <p>{fixPrice(currency.maxSupply)} <span>{currency.symbol}</span></p>
                            </div>
                        </div>
                    </div>
                ) : ''}
            </td>
            <td className='p-1.5 md:p-2.5 py-4 md:py-5 min-w-[110px] md:min-w-[164px]'>
                <div className="w-full">
                    <Image width={164} height={48} className={`whitespace-nowrap ${currency.quotes[2].percentChange7d > 0 ? 'hue-rotate-[85deg] saturate-[.8] brightness-[.85]' : 'hue-rotate-[300deg] saturate-[210%] brightness-[.7] contrast-[170%]'}`} src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${currency.id}.svg`} alt="" />
                </div>
            </td>
        </tr >
    );
}

export default memo(HomePageTableRow);