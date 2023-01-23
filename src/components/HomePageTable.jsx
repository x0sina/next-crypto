import HomePageTableRow from "./HomePageTableRow";

const HomePageTable = ({ currencies }) => {

    return (
        <div className="w-full overflow-x-auto">
            <table className='text-end w-full table-auto relative'>
                <thead>
                    <tr id="stick" className='text-xs border-y sticky w-full top-0 z-10 border-gray-200 bg-gray-50/90 shadow'>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold'></th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold text-start hidden md:table-cell'>#</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold text-start'>Name</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold'>Price</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold'>1h %</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold'>24h %</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold'>7d %</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold'>Market Cap</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold'>Volume(24h)</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold'>Circulating Supply</th>
                        <th className='whitespace-nowrap p-2.5 py-4 font-bold pr-6'>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody className="w-max">
                    {currencies.map(currency => (
                        <HomePageTableRow key={currency.id} price={currency.quotes[2].price} currency={currency} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomePageTable;