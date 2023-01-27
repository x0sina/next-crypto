import { capitalizateFirstLetter, fixPrice, getAverageRGB, isWhatPercentOf, toPrice } from "@/utils/utils";
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import InterActions from "./InterActions";
import dynamic from "next/dynamic";

const Graph = dynamic(() => import("./Garph"), {
    ssr: false
});

const MobilePriceData = ({ currency }) => {
    const { detail } = currency
    const stats = [
        { id: 1, name: '24H', desc: '24H Low/High', low: detail.statistics.low24h, high: detail.statistics.high24h, unavailable: false },
        { id: 2, name: '1M', desc: '1M Low/High', low: detail.statistics.low30d, high: detail.statistics.high30d, unavailable: false },
        { id: 3, name: '1Y', desc: '1Y Low/High', low: detail.statistics.low52w, high: detail.statistics.high52w, unavailable: false },
    ]
    const [selectedStat, setSelectedStat] = useState(stats[0])
    const icoRef = useRef(null)
    const [avgColor, setAvgColor] = useState(null)
    const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        if (loaded) setAvgColor(getAverageRGB(icoRef.current))
    }, [loaded])

    return (
        <main>
            <div className="bg-slate-100 py-8 px-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <Image onLoad={() => setLoaded(true)} ref={icoRef} width={36} height={36} className='rounded-full' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${detail.id}.png`} alt="" />
                    <InterActions />
                </div>
                <div className="flex items-center flex-wrap gap-x-2 mb-6">
                    <p className="bg-gray-500 text-gray-100 font-semibold text-[0.65rem] py-1 px-2 rounded-md">Rank #{detail.statistics.rank}</p>
                    <p className="bg-gray-200 text-gray-600 font-semibold text-[0.65rem] py-1 px-2 rounded-md">{capitalizateFirstLetter(detail.category)}</p>
                    <p className="bg-gray-200 text-gray-600 font-semibold text-[0.65rem] py-1 px-2 rounded-md">On {fixPrice(detail.watchCount)} Watchlists</p>
                </div>
                <h2 className="text-xs font-semibold text-gray-600">{detail.name} Price ({detail.symbol})</h2>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-black text-3xl py-2">${toPrice(detail.statistics.price)}</h2>
                    <div className={`p-2 relative ${detail.statistics.priceChangePercentage1h >= 0 ? 'ring-green-300 bg-green-500' : 'ring-red-300 bg-red-500'} rounded-lg ring-4 flex items-center`}>
                        {detail.statistics.priceChangePercentage1h >= 0 ? (
                            <>
                                <VscTriangleUp className="h-3.5 w-3.5 mr-1 text-white font-extrabold" />
                                <span className='text-white text-sm font-extrabold'>{detail.statistics.priceChangePercentage1h.toFixed(2)}%</span>
                            </>
                        ) : (
                            <>
                                <VscTriangleDown className="h-3.5 w-3.5 mr-1 text-white font-extrabold" />
                                <span className='text-white text-sm font-extrabold'>{detail.statistics.priceChangePercentage1h.toFixed(2).replace('-', '')}%</span>
                            </>
                        )
                        }
                        <span className="flex h-3 w-3 absolute -top-2 -right-1">
                            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                        </span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs">Low: <span className="font-bold">${toPrice(selectedStat.low)}</span></p>
                        <p className="text-xs">High: <span className="font-bold">${toPrice(selectedStat.high)}</span></p>
                        <Listbox value={selectedStat} onChange={setSelectedStat}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative focus:ring-2 ring-blue-300 w-full cursor-default rounded-md flex items-center bg-slate-200 py-1 px-1.5 sm:text-sm">
                                    <span className="block truncate text-xs text-gray-700 font-bold">{selectedStat.name}</span>
                                    <FiChevronDown className="h-3 w-3" />
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 top-7 right-0 w-36 max-h-60 p-3 overflow-auto rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {stats.map((stat, statIdx) => (
                                            <Listbox.Option
                                                key={stat.id}
                                                className={({ active }) =>
                                                    `relative font-semibold mb-2 text-sm cursor-default select-none ${active ? 'bg-border text-blue-600' : 'text-gray-900'
                                                    }`
                                                }
                                                value={stat}
                                            >
                                                {stat.desc}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div className="w-full mb-8 bg-gray-200 rounded-full relative h-1.5 dark:bg-gray-700">
                        <div className="bg-slate-400 transition-all duration-1000 h-1.5 rounded-full dark:bg-gray-500" style={{ width: `${isWhatPercentOf(selectedStat.low, selectedStat.high)}%` }}></div>
                        <VscTriangleUp style={{ left: `${isWhatPercentOf(selectedStat.low, selectedStat.high) - 3}%` }} className="h-3.5 w-3.5 transition-all duration-1000 text-gray-500 font-extrabold absolute" />
                    </div>
                    <Disclosure>
                        <Disclosure.Panel className="text-gray-500">
                            Yes! You can purchase a license that you can share with your entire
                            team.
                        </Disclosure.Panel>
                        <Disclosure.Button className="py-2.5 focus:ring-gray-300 focus:ring-4 w-full font-bold text-sm bg-gray-200 rounded-md">
                            More Stats
                        </Disclosure.Button>
                    </Disclosure>
                </div>
            </div>
            <div className="my-6">
                <h3 className="text-xl px-4 font-extrabold">{detail.name} to USD Chart</h3>
                {avgColor && <Graph avgColor={avgColor} id={detail.id} />}
            </div>
        </main>
    );
}

export default MobilePriceData;