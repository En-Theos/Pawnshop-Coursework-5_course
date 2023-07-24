import ITitleProps from "./interfaces";

import "./style.scss";

export default function Title({minorTitle, mainTitle}: ITitleProps) {
    return (
        <div className="title">
            <div className="limit">
                <h3 style={{color: minorTitle.color}}>{minorTitle.text}</h3>
                <div className="decor">
                    <div className="elemDecor">
                        <div className="line"></div>
                        <div className="circle"></div>
                        <div className="smallRomb"></div>
                        <div className="bigRomb"></div>
                    </div>
                    <div className="ico">
                        <h2 style={{color: mainTitle.color}}>{mainTitle.text}</h2>
                    </div>
                    <div className="elemDecor">
                        <div className="bigRomb"></div>
                        <div className="smallRomb"></div>
                        <div className="circle"></div>
                        <div className="line"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}