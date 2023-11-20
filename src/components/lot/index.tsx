import { Timer } from "./timer";
import { Bid } from "./bid";

import "./style.scss";

export default function Lot({image, deadline, name, views, rate, bids}: {
    image: string,
    deadline: string,
    name: string,
    views: number,
    rate: number,
    bids: number
}) {
    return (
        <div className="lot">
            <div className="imageLot">
                <a href="#"><img src={image} alt="" /></a>
                <div className="timer">
                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                    <Timer deadline={deadline}/>
                </div>
            </div>
            <div className="nameLot">
                <p><span >{name.length > 45 ? name.slice(0, 43) + '...': name}</span></p>
            </div>
            <div className="dataLot">
                <div className="views">
                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                    <p>{views}</p>
                </div>
                <div className="rate">
                    <p>Поточна ставка</p>
                        <Bid rate={rate}/>
                    <p>₴</p>
                </div>
                <div className="bids">
                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                    <p>{bids}</p>
                </div>
            </div>
            <button><span>ПІДНЯТИ СТАВКУ</span></button>
        </div>
    )
}