import Title from "../../components/title";
import Lots from "../../components/lots";

import "./style.scss";
import BlockText from "../../components/blockText";

export default function ShopPage() {
    return (
        <main className="shop">
            <section className="products">
                <Title minorTitle={{ text: "" }} mainTitle={{ text: "Наші товари" }} />
                <BlockText text={[
                    "Ласкаво просимо до наших неперевершених скарбів та ексклюзивних знахідок. Тут ви знайдете найкращі предмети, які переплітають у собі стиль, індивідуальність та неповторність.", 
                    "Кожен товар у нашому асортименті – це докладно обраний скарб, готовий збагатити ваше життя елегантністю та унікальністю. Від витончених годинників і прикрас до вражаючих антикваріатних знахідок – ми пропонуємо вам обрати краще.", 
                    "Кожен товар – це не просто об'єкт, це історія. Вибирайте свій стиль та дозвольте собі зануритися в світ вишуканих вражень та непередбачуваних знахідок. Знаходьте свій власний шедевр серед наших товарів та даруйте собі унікальний елемент стилю та класу."
                ]}/>
                <Lots type="products" wrapedClass="product_limit" limit="all" wrapedElement={(children) => {
                    return (
                        <div className="limit">
                            {children}
                        </div>
                    )
                }}/>
            </section>
        </main>
    )
}