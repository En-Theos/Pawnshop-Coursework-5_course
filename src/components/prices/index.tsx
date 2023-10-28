import { useEffect, useRef, useState } from "react";

import { IDataMetal } from "../../staticData/interfaces";
import DataOperator from "../../staticData/dataOperator";

import IPricesProps from "./interfsces";

import "./style.scss";

export default function Prices({type}: IPricesProps) {
    const [metalPrices, setMetalPrices] = useState<IDataMetal[]>();

    let metal = useRef('');
    const linesTable: any[] = [];

    useEffect(() => {
        switch (type) {
            case "gold":
                metal.current = "золота";
                DataOperator.getMetal('Золото')?.then((data) => {
                    setMetalPrices(data);
                });
                break;
            case "silver":
                metal.current = "срібла";
                DataOperator.getMetal('Срібло')?.then((data) => {
                    setMetalPrices(data);
                });
                break;
            default:
                break;
        }
        
    }, []);

    if (metalPrices) {
        metalPrices.forEach((item) => {
            const elemTR = <tr key={item.id}>
                <th>{item.sample}</th>
                <th>{item.rating} грн</th>
            </tr>

            linesTable.push(elemTR);
        });
    }


    return (
        <article className="priceTable">
            <div className="limit">
                <h2 className="titleTable">Ціна за грам {metal.current}</h2>
                <table className="bodyTable">
                    <thead>
                        <tr>
                            <th>Проба</th>
                            <th>Вартість</th>
                        </tr>
                    </thead>
                    <tbody>
                        {linesTable}
                    </tbody>
                </table>
            </div>
        </article>
    )
}