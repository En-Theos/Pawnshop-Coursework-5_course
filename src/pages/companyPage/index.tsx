import { Link } from "react-router-dom";

import Title from "../../components/title";
import CallBlock from "../../components/callBlock";

import "./style.scss";

export default function CompanyPage() {
    return (
        <main className="company">
            <Title minorTitle={{text: "Про нас"}} mainTitle={{text: "«Перспектива» — перший недержавний ломбард з 31-річним досвідом на ринку фінансових послуг, котрий надає кредити під заставу майна, орієнтуючись на актуальні потреби населення.", size: "16px"}}/>
            <section className="infoCompany">
                <div className="limit">
                    <h3>Мережа ломбардів «Перспектива» — це</h3>
                    <div className="flexBox">
                        <div>
                            <img src="image/info1.svg" alt="" />
                            <p className="title">31 років</p>
                            <p className="desc">Досвід, перевірений десятиріччями 31 років довіри клієнтів</p>
                        </div>
                        <div>
                            <img src="image/info2.svg" alt="" />
                            <p className="title">400 ломбардів</p>
                            <p className="desc">Розвинена мережа відділень 400 ломбардів у 104 містах України</p>
                        </div>
                        <div>
                            <img src="image/info3.svg" alt="" />
                            <p className="title">2500 працівників</p>
                            <p className="desc">Згуртована команда однодумців Нас 2500 співробітників</p>
                        </div>
                        <div>
                            <img src="image/info4.svg" alt="" />
                            <p className="title">Професіональність</p>
                            <p className="desc">Кваліфіковані спеціалісти. Власний Учбовий центр з підготовки затребуваних фахівців</p>
                        </div>
                    </div>  
                </div>
            </section>
            <section className="missionBlock">
                <h4><div className="line"></div>Наша місія</h4>
                <p>Надавати найкращі фінансові послуги та робити свій внесок у розвиток України</p>
            </section>
            <section className="evaluationLink">
                <div className="limit">
                    <h3>Скористайтесь нашими послугами та отримайте кредит під заставу:</h3>
                    <div className="flexBox">
                        <Link to="/evaluation/gold" className="link">
                            <img src="image/gold.svg" alt="" />
                            <p>Золота, платини</p>
                        </Link>
                        <Link to="/evaluation/silver" className="link">
                            <img src="image/silver.svg" alt="" />
                            <p>Срібла</p>
                        </Link>
                        <Link to="/evaluation/technique" className="link">
                            <img src="image/tech.svg" alt="" />
                            <p>Техніки</p>
                        </Link>
                        <Link to="/evaluation/wristwatch" className="link">
                            <img src="image/watches.svg" alt="" />
                            <p>Годинників</p>
                        </Link>
                        <Link to="/evaluation/antiques" className="link">
                            <img src="image/antiques.svg" alt="" />
                            <p>Антикваріату</p>
                        </Link>
                    </div>
                    <p className="text">Сьогодні ми пропонуємо клієнтам вирішувати нагальні фінансові питання на сучасному рівні, використовуючи інноваційні сервіси компанії «Скарбниця».</p>
                </div>
            </section>
            <section className="benefits">
                <div className="limit">
                    <p className="title">Спробуйте та оцініть наші переваги:</p>
                    <div className="list">
                        <p className="item"><img src="image/listArrow.svg" alt="" />Вигідні умови кредитування</p>
                        <p className="item"><img src="image/listArrow.svg" alt="" />Кредит у безготівковій формі на банківську карту</p>
                        <p className="item"><img src="image/listArrow.svg" alt="" />Дистанційні сервіси «Ломбард у вашому смартфоні»: Добір коштів та погашення кредиту через Особистий кабінет</p>
                        <p className="item"><img src="image/listArrow.svg" alt="" />Постійні акції, а також індивідуальну бонусну програму (кешбек)</p>
                        <p className="item"><img src="image/listArrow.svg" alt="" />Зберігання цінностей</p>
                        <p className="item"><img src="image/listArrow.svg" alt="" />Страховий захист</p>
                        <p className="item"><img src="image/listArrow.svg" alt="" />Безкоштовну оцінку предметів застави</p>
                        <p className="item"><img src="image/listArrow.svg" alt="" />Безпеку та конфіденційність обслуговування</p>
                    </div>
                    <p>Несемо світло інновацій у традиційний ринок ломбардного кредитування. <br /> «Перспектива» — ломбард майбутнього</p>
                </div>
            </section>
            <CallBlock/>
        </main>
    )
}