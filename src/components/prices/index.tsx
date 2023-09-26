import { useEffect, useState } from "react";

import { IDataGold } from "../../staticData/interfaces";
import DataOperator from "../../staticData/dataOperator";

import "./style.scss";

export default function Prices() {
    const [metalPrices, setMetalPrices] = useState<IDataGold[]>();

    const linesTable: any[] = [];

    useEffect(() => {
        DataOperator.getMetal()?.then((data) => {
            setMetalPrices(data);
        });
    }, []);

    if (metalPrices) {
        metalPrices.forEach((item) => {
            const elemTR = <tr key={item.id}>
                <th>{item.sample}</th>
                <th>{item.rating}</th>
            </tr>

            linesTable.push(elemTR);
        });
    }

    return (
        <article className="priceTable">
            <div className="limit">
                <h2 className="titleTable">Ціна за грам золота</h2>
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