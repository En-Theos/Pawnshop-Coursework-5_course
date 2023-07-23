import Slider from "react-slick";
import { useRef } from "react";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./style.scss"

export default function GreetingSlider() {

    const sliderRef = useRef<Slider>(null);

    const settings = {
        className: "sliderWindow",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };

    return (
        <article className="greetingSlider">
            <div className="limit">
                    <Slider ref={sliderRef} {...settings} >
                        <div className="slide">
                            <h5>Мобiльний додаток</h5>
                            <h2>Завантажуйте наш мобільний додаток</h2>
                            <p>Всі наші послуги прямо у вашому смартфоні. Переглядайте та сплачуйте свої кредити, ознайомлюйтесь з повним списком товарів що продаються нашим ломбардом та робіть ставки на рідкісні аукціонні лоти, поки торги ще тривають.</p>
                            <button><span>Детальніше</span></button>
                        </div>
                        <div className="slide">
                            <h5>Ексклюзивнi лоти</h5>
                            <h2>Наша аукціона система</h2>
                            <p>Ми збираємо ексклюзивну публіку та ексклюзивні лоти, надаємо зручний та автоматизований сервіс з купівлі та продажу рідкісних та дорогих речей, а також надаємо особисті кабінети та інші послуги по виставлянню ваших лотів на аукціон.</p>
                            <button><span>Детальніше</span></button>
                        </div>
                        <div className="slide">
                            <h5>Онлайн ломбард</h5>
                            <h2>Наші онлайн послуги</h2>
                            <p>Оцініть предмети, які ви плануєте здати в ломбард, швидко та зручно, використовуючи наші калькулятори або зверніться до експерта онлайн для консультації. Після успішного укладання договору ви зможете переглянути всю інформацію та оплачувати кредит у вашому особистому кабінеті.</p>
                            <button><span>Детальніше</span></button>
                        </div>
                        <div className="slide">
                            <h5>Товари</h5>
                            <h2>Не тільки аукціон, але й купівля</h2>
                            <p>У нашому ломбарді часто з'являються цікаві та цінні предмети, які ми пропонуємо для звичайного продажу. Ви маєте унікальну можливість придбати їх за значно зниженою ціною, що недосяжно в інших магазинах, та отримати приємні бонуси на наступні покупки.</p>
                            <button><span>Детальніше</span></button>
                        </div>
                    </Slider>
                <div className="controlSlider">
                    <img src="image/ico/header/arrow_left.svg" alt="" className="prevBtn" onClick={() => {
                        sliderRef.current?.slickPrev();
                    }}/>
                    <img src="image/ico/header/arrow_right.svg" alt="" className="nextBtn" onClick={() => {
                            sliderRef.current?.slickNext();
                    }}/>
                </div>
            </div>
        </article>
    )
}