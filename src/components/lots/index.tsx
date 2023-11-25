import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { lotsFetching, lotsFetched, lotsFetchingError, selectAll as selectLots } from "../../slices/lots";
import { useEffect } from "react";

import LotCard from "./lotCard";
import axios from "axios";

export default function Lots({wrapedClass, limit, wrapedElement}: {
    wrapedClass: string,
    limit: number | 'all', 
    wrapedElement?: (children: any) => any
}) {
    const lots = useAppSelector(selectLots);
    const lotsStatus = useAppSelector(state => state.lots.lotsStatus)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(lotsFetching());
        axios.get('http://localhost:3001/lots').then(({data}) => {
            dispatch(lotsFetched(data));
        }).catch(() => {
            dispatch(lotsFetchingError());
        });
    }, []);

    function isWrapedElement() {
        const children = lots.slice(0, limit === 'all' ? lots.length : limit).map((item) => {
            return <div className={wrapedClass} key={item.id} id={"a" + item.id}>
                <LotCard
                    image={item.picture}
                    deadline={item.end_date}
                    name={item.name}
                    views={item.views}
                    rate={item.rate}
                    bids={item.bids} 
                    all={item}/>
            </div>
        })

        if (wrapedElement) {
            return wrapedElement(children)
        } else {
            return <>{children}</>
        }
    }

    switch (lotsStatus) {
        case "loading":
            return <div>Loading</div>
        case "error":
            return <div>Error</div>
        default:
            return isWrapedElement();
    }
}