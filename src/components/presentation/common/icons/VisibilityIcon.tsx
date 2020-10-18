import React, {FC} from "react";

interface IProps {
    title?: string;
    color?: string;
}

const VisibilityIcon: FC<IProps> = ({color = 'black'}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18" fill={color}>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
    );
}

export default VisibilityIcon;