import axios from "axios";
import { selectLotsById } from "../../slices/lots";
import { setIdData, showModal, falseIfViews } from "../../slices/modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";

import StateInfo from "./stateInfo";

import "./style.scss";

export default function Lot({ id, type }: { id: number, type: string }) {
    let data = useAppSelector(selectLotsById(id));

    const dispatch = useAppDispatch();

    useEffect(() => {
        axios.patch("http://localhost:3001/addViews", { id })
    }, []);

    if (!data) return <main>Не знайдено такий {type === "shop" ? "товар" :  "лот"}</main>

    function genereteListObj(obj: any) {
        const list:JSX.Element[] = [];
       
        for (const key in obj) {
            if (typeof obj[key] === "string") {
                list.push(( <div className="charItem">{key}: <span>{obj[key]}</span></div> ))
            } else if (Array.isArray(obj[key])) {
                list.push((<div className="charItem">{key} {genereteListArr(obj[key])}</div>))
            }
        }

        return <>{list}</>
    }

    function genereteListArr(obj: any) {
        const list:JSX.Element[] = [];

        obj.forEach((item: any) => {
            if (typeof item === "string") {
                list.push(( <span>{item}</span> ))
            } else if (Array.isArray(item)) {
                list.push(genereteListArr(item));;
            } 
        })
     
        return <div>{list}</div>;
    }

    function onRaise() {
        document.body.style.overflow = "hidden";
        dispatch(showModal());
        dispatch(falseIfViews())
        dispatch(setIdData(id));
    }

    return (
        <div className="singleLot">
            <div className="flexBox">
                <img src={data.picture} alt="" />
                <div className="info">
                    <h3>{data.name}</h3>
                    <div className="state">Стан предмету: <span>{data.state}</span>
                        <StateInfo descriptionState={data.descriptionState}/>
                    </div>
                    <div className="price">
                        Поточна ставка: <span>₴{data.rate || data.market_price}</span> 
                    </div>
                    <div className="desc" style={{display: "block"}}>
                        <span style={{marginLeft: 0}}>Опис:</span>{data.description || "Опис відсутній."}
                    </div>
                    <button onClick={onRaise}><span>{type === "shop" ? "ПРИДБАТИ" : "ПІДНЯТИ СТАВКУ"}</span></button>
                </div>
            </div>
            <div className="characteristics">
                <p>Характеристики</p>
                <div className="list">
                    {data.characteristics ? genereteListObj( data.characteristics ) : <div className="none">Немає характеристик</div> }
                </div>
            </div>
        </div>
    )
}