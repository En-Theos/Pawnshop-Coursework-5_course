import Title from "../../components/title";
import Lots from "../../components/lots";

import "./style.scss";
import BlockText from "../../components/blockText";

export default function AuctionPage() {
    return (
        <main className="auction">
            <section className="lots">
                <Title minorTitle={{ text: "" }} mainTitle={{ text: "Наш аукціон" }} />
                <BlockText text={[
                    "Ласкаво просимо на наш аукціон, де кожен лот – це окрема історія.", 
                    "Наші аукційні лоти – це своєрідна подорож у світ унікальних знахідок, мистецтва та історії. В кожному лоті захована краплина минулого, яка може збагатити ваш життєвий шлях та зробити його більш яскравим.", 
                    "Зануртеся в наш віртуальний аукціонний захід, де ви матимете можливість вибрати із різноманіття надзвичайних об'єктів. Нехай кожен лот стане для вас особливою знахідкою, а участь в аукціоні принесе незабутні враження та непередбачувані подарунки долі.", 
                    "Запрошуємо вас долучитися до цього захоплюючого шляху в пошуках унікальних скарбів. Ваша пригода на початку кожного аукціону – чекаємо на вас!"
                ]}/>
                <Lots wrapedClass="lot_limit" limit="all" wrapedElement={(children) => {
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