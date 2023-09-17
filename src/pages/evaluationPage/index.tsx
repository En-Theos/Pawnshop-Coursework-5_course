import Header from "../../components/header";
import Title from "../../components/title";
import EvaluationGold from "../../components/evaluationGold";

import "./style.scss";

export default function EvaluationPage() {
    return (
        <>
            <Header />
            <main className="evaluationPage">
                <Title minorTitle={{text: "Оцiнка золота"}} mainTitle={{text: "Ви можете отримати кредит за 3 хвилини! Для цього потрібен лише предмет застави, ІПН, паспорт або інший документ, який ідентифікує особу.", size: "20px"}} />
                <EvaluationGold />
            </main>
        </>
    )
}