
import { CalendarIcon } from '@heroicons/react/24/outline';
import React from 'react';

// Function to format the date
const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const TodayDate: React.FC = () => {
    const today: Date = new Date();

    return (
        <div className='flex items-center'>
            <div>
                <CalendarIcon className='mr-2 text-sm h-4' />
            </div>
            <div><p className='text-sm text-gray-500'>{formatDate(today)}</p></div>
        </div>
    );
};

export default TodayDate;

