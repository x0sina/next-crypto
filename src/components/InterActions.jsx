import { HiOutlineStar } from "react-icons/hi";
import { FiShare } from 'react-icons/fi'

const InterActions = () => {
    return (
        <div className="flex items-center gap-x-2">
            <button className="border border-gray-300 p-2 rounded-lg">
                <HiOutlineStar className='h-4 w-4' />
            </button>
            <button className="border border-gray-300 p-2 rounded-lg">
                <FiShare className='h-4 w-4' />
            </button>
        </div>
    );
}

export default InterActions;