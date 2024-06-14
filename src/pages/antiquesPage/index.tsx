import Title from "../../components/title";
import EvaluationAntiques from "../../components/evaluation/evaluationAntiques";
import BlockText from "../../components/blockText";
import CallBlock from "../../components/callBlock";

import "../goldPage/style.scss";

export default function AntiquesPage() {
    return (
        <main className="evaluationPage">
            <Title minorTitle={{ text: "Оцiнка антикварiату" }} mainTitle={{ text: "Надсилайте фото антикваріату нам на оцінку і ми пришлем вам результат чи перезвонимо для додаткової інформації.", size: "20px" }} />
            <EvaluationAntiques/>
            <BlockText text={["В нашому ломбарді ми вкладаємо особливий сенс у слово 'антикваріат'. Це не просто старовинні предмети, а справжні реліквії минулого, кожен екземпляр яких несе у собі частинку історії та культури. Антикваріат у нас – це подорож у часі, де кожен предмет є свідком свого віку.",
                "Ми завжди шукаємо унікальність у кожному антикваріаті, який нам довіряють. Кожна столітння шафа, витончено викладений стілець чи витягнутий із забуття малюнок на полотні – це не лише предмети меблів чи мистецтва. Це частка минулого, яка заслуговує на новий початок."]} />
            <CallBlock />
        </main>
    )
}