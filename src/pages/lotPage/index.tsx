import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { lotsFetched, lotsFetching, lotsFetchingError, selectAll as selectLots } from "../../slices/lots";

import Title from "../../components/title";

import "./style.scss";
import Lot from "../../components/lot";

export default function LotPage() {
    const { id } = useParams();
    const location = useLocation().pathname.split("/")[1];
    
    const lots = useAppSelector(selectLots);
    const lotsStatus = useAppSelector(state => state.lots.lotsStatus)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (lots.length === 0) {
            dispatch(lotsFetching());
            axios.get(`http://localhost:3001/single?id=${id}`).then(({ data }) => {
                dispatch(lotsFetched(data));
            }).catch((error) => {
                dispatch(lotsFetchingError());
                throw error
            })
        }
    }, []);

    function render() {
        return (
            <main className="lotPage">
                <div className="limit">
                    <Title minorTitle={{ text: "" }} mainTitle={{ text: location === "shop" ? `Товар #${id}` : `Лот #${id}`}  } />
                    <Lot id={parseInt(id || "-1")} type={location}/>
                </div>
            </main>
        )
    }

    switch (lotsStatus) {
        case "loading":
            return <div>Loading</div>
        case "error":
            return <div>Error</div>
        default:
            return render();
    }
}