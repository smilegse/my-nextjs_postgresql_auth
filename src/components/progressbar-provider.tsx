'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }) => {
    return (
        <>
            {children}
            <ProgressBar
                height="4px"
                // color="#fffd00"
                options={{ showSpinner: false }}
                shallowRouting={false}
            />
        </>
    );
};


export default ProgressBarProvider;
