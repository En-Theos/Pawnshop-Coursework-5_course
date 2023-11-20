import Slider from "react-slick";
import { ReactElement, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { lotsFetching, lotsFetched, lotsFetchingError, lotsUpdate, selectAll as selectLots } from "../../slices/lots";

import Lot from "../lot";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss"

export default function LotsSlider() {
    const sliderRef = useRef<Slider>(null);

    const settings = {
        className: "sliderWindow",
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        adaptiveHeight: true
    };

    const lots = useAppSelector(selectLots);
    const lotsStatus = useAppSelector(state => state.lots.lotsStatus)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(lotsFetching());
        fetch('http://localhost:3001/lots').then(response => response.json())
            .then((data) => {
                dispatch(lotsFetched(data));
            }).catch(() => {
                dispatch(lotsFetchingError());
            })
    }, []);

    let content: ReactElement | null = null;

    switch (lotsStatus) {
        case "loading":
            content = <div>Loading</div>
            break;
        case "error":
            content = <div>Error</div>
            break;
        default:
            content = <>
                <Slider ref={sliderRef} {...settings}>
                    {
                        lots.slice(0, 9).map((item) => {
                            return <div className="slide" key={item.id}>
                                <Lot
                                    image={item.picture}
                                    deadline={item.end_date}
                                    name={item.name}
                                    views={item.views}
                                    rate={item.rate}
                                    bids={item.bids} />
                            </div>
                        })
                    }
                </Slider>
            </>
            break;
    }

    return (
        <article className="products">
            <div className="limit">
                {content}
                <div className="sliderCntrol">
                    <img src="image/ico/sliderLot/arrow-big_left.svg" alt="" className="prevBtn" onClick={() => {
                        sliderRef.current?.slickPrev();
                    }} />
                    <button><span>Всі лоти</span></button>
                    <img src="image/ico/sliderLot/arrow-big_right.svg" alt="" className="nextBtn" onClick={() => {
                        sliderRef.current?.slickNext();
                    }} />
                </div>
            </div>
        </article>
    )
}