import SingleCurrency from "./SingleCurrency";

const Table = ({ currencies }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className='text-end w-full'>
                <thead>
                    <tr className='text-xs border-y border-gray-200'>
                        <th className='whitespace-nowrap p-2.5 font-bold'></th>
                        <th className='whitespace-nowrap p-2.5 font-bold text-start'>#</th>
                        <th className='whitespace-nowrap p-2.5 font-bold text-start'>Name</th>
                        <th className='whitespace-nowrap p-2.5 font-bold'>Price</th>
                        <th className='whitespace-nowrap p-2.5 font-bold'>1h %</th>
                        <th className='whitespace-nowrap p-2.5 font-bold'>24h %</th>
                        <th className='whitespace-nowrap p-2.5 font-bold'>7d %</th>
                        <th className='whitespace-nowrap p-2.5 font-bold'>Market Cap</th>
                        <th className='whitespace-nowrap p-2.5 font-bold'>Volume(24h)</th>
                        <th className='whitespace-nowrap p-2.5 font-bold'>Circulating Supply</th>
                        <th className='whitespace-nowrap p-2.5 font-bold text-center'>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map(currency => (
                        <SingleCurrency key={currency.id} price={currency.quotes[2].price} currency={currency} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;