
import Link from 'next/link';
import './hexbutton.css';

export default function Hexbutton({onClick, text, Icon, size}) {
    const buttonSize = size == null || size == 'lg' ? "button button-lg" : "button button-sm" ;

    return (
        <div onClick={onClick} className="container" >
            <div className={buttonSize} >
                {Icon && <Icon className="icon"></Icon>}
                <span className="buttontext">{text}</span>
            </div>
        </div>
    )
}