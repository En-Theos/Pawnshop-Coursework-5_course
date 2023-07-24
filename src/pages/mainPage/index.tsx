import Header from "../../components/header";
import GreetingSlider from "../../components/greetingSlider";
import LotsSlider from "../../components/lotsSlider";
import Title from "../../components/title";
import CategoriesGoods from "../../components/categoriesGoods";
import BlockText from "../../components/blockText";
import FreeServices from "../../components/freeServices";

import "./style.scss"

export default function MainPage() {
    return (
        <>
            <Header />
            <GreetingSlider />
            <main>
                <div className="purchase">
                    <Title minorTitle={{text: "Популярнi"}} mainTitle={{text: "Лоти під аукціон"}}/>
                    <LotsSlider />
                    <Title minorTitle={{text: "Усi нашi"}} mainTitle={{text: "Категорії товарів"}}/>
                    <CategoriesGoods/>
                    <BlockText />
                </div>
                <div className="services">
                    <Title minorTitle={{text: "Безкоштовнi"}} mainTitle={{text: "Послуги", color: "#ffffff"}}/>
                    <FreeServices />
                </div>
            </main>
        </>
    )
}