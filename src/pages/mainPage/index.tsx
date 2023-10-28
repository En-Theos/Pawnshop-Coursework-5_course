import GreetingSlider from "../../components/greetingSlider";
import LotsSlider from "../../components/lotsSlider";
import Title from "../../components/title";
import CategoriesGoods from "../../components/categoriesGoods";
import BlockText from "../../components/blockText";
import FreeServices from "../../components/freeServices";
import Quote from "../../components/quote";
import ReviewsAndNews from "../../components/reviewsAndNews";

import "./style.scss"

export default function MainPage() {
    return (
        <>
            <GreetingSlider />
            <main className="mainPage">
                <section className="purchase">
                    <Title minorTitle={{ text: "Популярнi" }} mainTitle={{ text: "Лоти під аукціон" }} />
                    <LotsSlider />
                    <Title minorTitle={{ text: "Усi нашi" }} mainTitle={{ text: "Категорії товарів" }} />
                    <CategoriesGoods />
                    <BlockText text={["Ласкаво просимо до нашого сучасного та зручного ломбарду – вашого надійного партнера у фінансових рішеннях!", 
                " У нашому ломбарді ви знайдете все, що потрібно для успішного та комфортного рішення вашої фінансової ситуації. Ми горді представити вам найсучасніші послуги, які надають найвищий рівень задоволення наших клієнтів.",
                "Основна перевага нашого ломбарду - це можливість онлайн оцінки ваших речей на наших калькуляторах, що дозволяє миттєво дізнатись приблизну вартість вашого цінного предмета. А для більш точної та професійної консультації, наші досвідчені експерти завжди готові надати вам свою допомогу та порадити найкращі варіанти.", 
                "Крім того, у нас ви зможете легко та безпечно придбати виставлені речі на продаж, насолоджуючись гарантованою якістю та чесними цінами.", 
                "Для тих, хто любить захопливі та азартні емоції, у нас діє спеціальний аукціон, де ви зможете робити ставки на захоплюючі лоти та здивуватись величезним різноманіттям предметів.",
                "А для максимальної зручності, наш особистий кабінет дозволяє вам легко переглядати та сплачувати кредити, вести контроль над вашими фінансами та виконувати всі необхідні операції в режимі онлайн.",
                "Ми горді бути вашими надійними партнерами та завжди прагнемо надавати найвищий рівень обслуговування, відповідальності та довіри. Відкрийте для себе світ можливостей з нашим ломбардом!"]}/>
                </section>
                <section className="services">
                    <Title minorTitle={{ text: "Безкоштовнi" }} mainTitle={{ text: "Послуги", color: "#ffffff" }} />
                    <FreeServices />
                </section>
                <aside className="secondaryInfo">
                    <Title minorTitle={{ text: "Цiкавi" }} mainTitle={{ text: "Цитати" }} />
                    <Quote />
                    <ReviewsAndNews />
                </aside>
            </main>
        </>
    )
}