import "./style.scss"

export default function Header() {
    return (
        <header>
             <div className="limit">
                <div className="burger">
                    <div className="btn">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="link">
                        <div><a href="#">Головна</a></div>
                        <div><a href="#">Оцінка предметів</a></div>
                        <div><a href="#">Аукціон</a></div>
                        <div><a href="#">Товари</a></div>
                        <div><a href="#">Компанія</a></div>
                        <div><a href="#">Новини</a></div>
                    </div>
                </div>
                <div className="logo">
                    <img src="image/webp/logo.png" alt="Ups..."/>
                </div>
                <nav>
                    <div><a href="#">Головна</a></div>
                    <div>
                        <a href="#">Оцінка</a>
                        <img src="image/ico/header/arrow_left.svg" alt="Ups..." />
                        <div className="perspectiv">
                            <div className="subMenu">
                                <div>
                                    <a href="">Золота</a>
                                </div>
                                <div>
                                    <a href="">Срібла</a>
                                </div>
                                <div>
                                    <a href="">Техніки</a>
                                </div>
                                <div>
                                    <a href="">Наручних годинників</a>
                                </div>
                                <div>
                                    <a href="">Предметів мистецтва</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div><a href="#">Аукціон</a></div>
                    <div><a href="#">Товари</a></div>
                    <div><a href="#">Компанія</a></div>
                    <div><a href="#">Новини</a></div>
                </nav>
                <div className="actions">
                    <div className="region">
                        <img src="image/ico/header/globe.svg" alt="Ups..."/>
                        <a href="">Вибір мови</a>
                    </div>
                    <div className="userMenu">
                        <img src="image/ico/header/userMenu.png" alt="Ups..." className="userIco"/>
                        <div className="subMenu">
                            <p className="account">Акаунт</p>
                            <div>
                                <div>
                                    <img src="image/ico/header/subMenu/key.svg" alt=""/>
                                </div>
                                <a href="">Особистий кабінет</a>
                            </div>
                            <div>
                                <div>
                                    <img src="image/ico/header/subMenu/palm.svg" alt=""/>
                                </div>
                                <a href="">Мої ставки</a>
                            </div>
                            <div>
                                <div>
                                    <img src="image/ico/header/subMenu/hammer.svg" alt=""/>
                                </div>
                                <a href="">Мої лоти</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
} 