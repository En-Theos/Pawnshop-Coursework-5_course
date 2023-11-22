import { Link } from "react-router-dom";

import { useAppDispatch } from "../../../store/hooks";
import { showModal, setIdData } from "../../../slices/modal";
import { IDataLots } from "../../../slices/interfaces";

import Timer from "./timer";
import Bid from "./bid";

import "./style.scss";

export default function Lot({image, deadline, name, views, rate, bids, all}: {
    image: string,
    deadline: string,
    name: string,
    views: number,
    rate: number,
    bids: number,
    all: IDataLots
}) {
    const dispatch = useAppDispatch();

    function onRaise() {
        document.body.style.overflow = "hidden";
        dispatch(showModal());
        dispatch(setIdData(all.id));
    }

    return (
        <div className="lot">
            <div className="imageLot">
               <img src={image} alt="" />
                <div className="timer">
                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                    <Timer deadline={deadline}/>
                </div>
            </div>
            <div className="nameLot">
                <p><Link to={`/lots/${all.id}`}>{name.length > 45 ? name.slice(0, 43) + '...': name}</Link></p>
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
            <button onClick={onRaise}><span>ПІДНЯТИ СТАВКУ</span></button>
        </div>
    )
}