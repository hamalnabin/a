// Loading.tsx
import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-fit">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
    );
};

export default Loading;
