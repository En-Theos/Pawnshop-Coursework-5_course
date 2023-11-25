import { Link } from "react-router-dom";

import { useAppDispatch } from "../../../store/hooks";
import { showModal, setIdData, trueIfViews } from "../../../slices/modal";
import { IDataLots } from "../../../slices/interfaces";

import Timer from "./timer";
import Bid from "./bid";

import "./style.scss";

export default function LotCard({image, deadline, name, views, rate, bids, all, type}: {
    image: string,
    deadline: string,
    name: string,
    views: number,
    rate: number,
    bids: number,
    all: IDataLots,
    type: "lots" | "products"
}) {
    const dispatch = useAppDispatch();

    function onRaise() {
        document.body.style.overflow = "hidden";
        dispatch(showModal());
        dispatch(trueIfViews());
        dispatch(setIdData(all.id));
    }

    return (
        <div className="lotCard">
            <div className="imageLot">
               <img src={image} alt="" />
                <Timer deadline={deadline}/>
            </div>
            <div className="nameLot">
                <p><Link to={`single/${all.id}`}>{name.length > 45 ? name.slice(0, 43) + '...': name}</Link></p>
            </div>
            <div className="dataLot" style={{justifyContent: type === "lots" ? "space-between" : "center"}}>
                {
                    type === "lots" ? 
                    <div className="views">
                        <img src="image/ico/sliderLot/starvation.svg" alt="" />
                        <p>{views}</p>
                    </div>
                    : null
                }
                <div className="rate">
                    <p>Поточна {type === "lots" ? "ставка" : "ціна"} </p>
                        <Bid rate={rate || all.market_price}/>
                    <p>₴</p>
                </div>
                {
                    type === "lots" ? 
                    <div className="bids">
                        <img src="image/ico/sliderLot/rates.svg" alt="" />
                        <p>{bids}</p>
                    </div>
                    : null
                }
            </div>
            <button onClick={onRaise}><span>{type === "lots" ? "ПІДНЯТИ СТАВКУ" : "ПРИДБАТИ"}</span></button>
        </div>
    )
}