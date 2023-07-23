import Slider from "react-slick";
import { useRef } from "react";

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

    return (
        <div className="products">
            <div className="limit">
                <Slider ref={sliderRef} {...settings}>
                    <div className="slide">
                        <div className="lot">
                            <div className="imageLot">
                                <a href="#"><img src="image/webp/sliderLot/lot1.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>
                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Arnold & Son Worldtimer discovery of antarctica</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>1 098</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions">18</span> <span id="thousands">999</span> <span id="hundreds">203</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>75</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="lot">
                            <div className="imageLot">
                                <a href=""> <img src="image/webp/sliderLot/lot2.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>
                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Chateau Lafite 1949</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>756</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions"></span> <span id="thousands"></span> <span id="hundreds">50</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>3</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="lot" id="2">
                            <div className="imageLot">
                                <a href=""><img src="image/webp/sliderLot/lot3.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>

                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Rolex Paul Newman Daytona</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>11</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions">3</span> <span id="thousands">245</span> <span id="hundreds">050</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>3</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="lot" id="3">
                            <div className="imageLot">
                                <a href="#"><img src="image/webp/sliderLot/lot1.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>
                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Arnold & Son Worldtimer discovery of antarctica</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>1 098</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions">18</span> <span id="thousands">999</span> <span id="hundreds">203</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>75</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="lot" id="4">
                            <div className="imageLot">
                                <a href=""> <img src="image/webp/sliderLot/lot2.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>
                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Chateau Lafite 1949</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>756</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions"></span> <span id="thousands">245</span> <span id="hundreds">050</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>3</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="lot" id="5">
                            <div className="imageLot">
                                <a href=""><img src="image/webp/sliderLot/lot3.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>

                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Rolex Paul Newman Daytona</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>11</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions">3</span> <span id="thousands">245</span> <span id="hundreds">050</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>3</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="lot" id="6">
                            <div className="imageLot">
                                <a href="#"><img src="image/webp/sliderLot/lot1.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>
                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Arnold & Son Worldtimer discovery of antarctica</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>1 098</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions">18</span> <span id="thousands">999</span> <span id="hundreds">203</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>75</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="lot" id="7">
                            <div className="imageLot">
                                <a href=""> <img src="image/webp/sliderLot/lot2.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>
                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Chateau Lafite 1949</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>756</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions"></span> <span id="thousands">245</span> <span id="hundreds">050</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>3</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="lot" id="8">
                            <div className="imageLot">
                                <a href=""><img src="image/webp/sliderLot/lot3.webp" alt="" /></a>
                                <div className="timer">
                                    <img src="image/ico/sliderLot/hourglass.svg" alt="" />
                                    <p><span id="days">3</span>:<span id="hours">21</span>:<span id="minutes">45</span>:<span id="seconds">37</span></p>

                                </div>
                            </div>
                            <div className="nameLot">
                                <p><a href="">Rolex Paul Newman Daytona</a></p>
                            </div>
                            <div className="dataLot">
                                <div className="starvation">
                                    <img src="image/ico/sliderLot/starvation.svg" alt="" />
                                    <p>11</p>
                                </div>
                                <div className="praice">
                                    <p>Поточна ставка</p>
                                    <p className="bid"><span id="millions">3</span> <span id="thousands">245</span> <span id="hundreds">050</span></p>
                                    <p>₴</p>
                                </div>
                                <div className="rates">
                                    <img src="image/ico/sliderLot/rates.svg" alt="" />
                                    <p>3</p>
                                </div>
                            </div>
                            <button><span>ПІДНЯТИ СТАВКУ</span></button>
                        </div>
                    </div>
                </Slider>
                <div className="sliderCntrol">
                    <img src="image/ico/sliderLot/arrow-big_left.svg" alt="" className="prevBtn" onClick={() => {
                        sliderRef.current?.slickPrev();
                    }}/>
                    <button><span>Всі лоти</span></button>
                    <img src="image/ico/sliderLot/arrow-big_right.svg" alt="" className="nextBtn" onClick={() => {
                        sliderRef.current?.slickNext();
                    }}/>
                </div>
            </div>
        </div>
    )
}