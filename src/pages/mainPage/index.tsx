import Header from "../../components/header";
import GreetingSlider from "../../components/greetingSlider";
import LotsSlider from "../../components/lotsSlider";
import Title from "../../components/title";
import CategoriesGoods from "../../components/categoriesGoods";
import BlockText from "../../components/blockText";
import FreeServices from "../../components/freeServices";
import Quote from "../../components/quote";
import ReviewsAndNews from "../../components/reviewsAndNews";
import Footer from "../../components/footer";

import "./style.scss"

export default function MainPage() {
    return (
        <>
            <Header />
            <GreetingSlider />
            <main>
                <section className="purchase">
                    <Title minorTitle={{ text: "Популярнi" }} mainTitle={{ text: "Лоти під аукціон" }} />
                    <LotsSlider />
                    <Title minorTitle={{ text: "Усi нашi" }} mainTitle={{ text: "Категорії товарів" }} />
                    <CategoriesGoods />
                    <BlockText />
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
                <Footer />
            </main>
        </>
    )
}