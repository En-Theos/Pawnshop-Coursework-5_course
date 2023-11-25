import Slider from "react-slick";
import { ReactElement, useRef } from "react";
import { useAppSelector } from "../../store/hooks";

import Lots from "../lots";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss"
import { Link } from "react-router-dom";

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

    return (
        <article className="products">
            <div className="limit">
                <Lots type="lots" wrapedClass="slide" limit={9} wrapedElement={(children) => {
                    return <Slider ref={sliderRef} {...settings}>
                        {children}
                    </Slider>
                }}/>
                <div className="sliderCntrol">
                    <img src="image/ico/sliderLot/arrow-big_left.svg" alt="" className="prevBtn" onClick={() => {
                        sliderRef.current?.slickPrev();
                    }} />
                    <button><Link to="auction">Всі лоти</Link></button>
                    <img src="image/ico/sliderLot/arrow-big_right.svg" alt="" className="nextBtn" onClick={() => {
                        sliderRef.current?.slickNext();
                    }} />
                </div>
            </div>
        </article>
    )
}