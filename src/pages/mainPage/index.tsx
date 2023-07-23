import Header from "../../components/header";
import GreetingSlider from "../../components/greetingSlider";
import LotsSlider from "../../components/lotsSlider";
import Title from "../../components/title";
import CategoriesGoods from "../../components/categoriesGoods";

import "./style.scss"

export default function MainPage() {
    return (
        <>
            <Header />
            <GreetingSlider />
            <main>
                <Title minorTitle="Популярнi" mainTitle="Лоти під аукціон"/>
                <LotsSlider />
                <Title minorTitle="Усi нашi" mainTitle="Категорії товарів"/>
                <CategoriesGoods/>
            </main>
        </>
    )
}