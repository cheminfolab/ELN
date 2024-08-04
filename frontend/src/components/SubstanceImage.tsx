import './SubstanceImage.css'
import {Image} from "react-bootstrap";
import React from "react";

interface SubstanceImageParams {
    path: string,
    className?: string,
    onClick?: () => void
}

const SubstanceImage: React.FC<SubstanceImageParams> = ({path, className= undefined, onClick = undefined}) => (
    <Image
        src={String(path)}
        alt={'chemical structure'}
        className={className}
        onClick={onClick}
        rounded
    />
)
export default SubstanceImage;