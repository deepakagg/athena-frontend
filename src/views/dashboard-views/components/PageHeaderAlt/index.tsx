import React, { useRef } from 'react';

export const PageHeaderAlt = (props: { children: any, className: any, overlap: boolean }) => {
    const ref = useRef(null);

    return (
        <div
            ref={ref}
            className={`page-header-alt ${props.className ? props.className : ''} ${props.overlap && 'overlap'}`}
        >
            <>{props.children}</>
        </div>
    )
}

export default PageHeaderAlt;