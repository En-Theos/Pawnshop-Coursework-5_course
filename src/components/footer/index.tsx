import "./style.scss";

export default function Footer() {
    return (
        <footer>
            <div className="limit">
                <div className="logo">
                    <img src="image/webp/logo.png" alt="" />
                    <p>Все права защищены © 2014</p>
                </div>
                <div className="linkFooter">
                    <div><a href="#">Головна</a></div>
                    <div><a href="#">Оцінка предметів</a></div>
                    <div><a href="#">Аукціон</a></div>
                    <div><a href="#">Товари</a></div>
                    <div><a href="#">Компанія</a></div>
                    <div><a href="#">Новини</a></div>
                </div>
                <div className="phone">
                    <p><span>+7 </span> (495) 22-22-22</p>
                    <p><img src="image/webp/phone.svg" alt="" /><a href="#">Обратная связь</a></p>
                </div>
            </div>
        </footer>
    )
}