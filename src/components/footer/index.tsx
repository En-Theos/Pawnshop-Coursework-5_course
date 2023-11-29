import { Link } from "react-router-dom";

import "./style.scss";

export default function Footer() {
    return (
        <footer>
            <div className="limit">
                <div className="text">
                    Мінімальний термін кредитування: 63 дні (однак, позичальник має право на дострокове погашення кредиту в будь-який момент за умови сплати процентів за фактичний період користування кредитом, при цьому мінімальним строком користування є 1 (один) календарний). Максимальный термін кредитування не обмежений, у разі своєчасного подовження договору шляхом сплати відсотків за відповідний термін користування кредитом. Максимальна річна ставка при заставі золота: 438%, що становить 1,3% в день, приклад розрахунку: при сумі кредиту 1000 грн., плата за користування кредитом - 1,3% на день, що складає 13 грн., за період користування 63 календарні дні Позичальнику необхідно буде заплатити суму у розмірі 819 грн.
                </div>
                <div className="content">
                    <div className="logo">
                        <img src="/image/webp/logo.png" alt="" />
                        <p>Всі права захищені © 2014</p>
                    </div>
                    <div className="linkFooter">
                    <div><Link to="/">Головна</Link></div>
                    <div>
                        <p>Оцінка</p>
                        <div className="perspectiv">
                            <div className="subMenu">
                                <div>
                                    <Link to="evaluation/gold">Золота</Link>
                                </div>
                                <div>
                                    <Link to="evaluation/silver">Срібла</Link>
                                </div>
                                <div>
                                    <Link to="evaluation/technique">Техніки</Link>
                                </div>
                                <div>
                                    <Link to="evaluation/wristwatch">Наручних годинників</Link>
                                </div>
                                <div>
                                    <Link to="evaluation/antiques">Предметів мистецтва</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div><Link to="auction">Аукціон</Link></div>
                    <div><Link to="shop">Товари</Link></div>
                    <div><Link to="company">Компанія</Link></div>
                    <div><Link to="contacts">Контакти</Link></div>
                    </div>
                    <div className="phone">
                        <p><span>+38 </span> (096) 22-22-22</p>
                        <p><img src="/image/webp/phone.svg" alt="" /><a href="#">Зворотній зв'язок</a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}