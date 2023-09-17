import "./style.scss"

export default function ReviewsAndNews() {
    return (
        <article className="reviewsAndNews">
            <div className="limit">
                <div className="flexBox">
                    <div className="news">
                        <p className="title"><img src="image/webp/quotes/news_ico.svg" alt="" />Новини</p>
                        <div className="new">
                            <time>18.07.2023</time>
                            <a href="" className="name">Ми відкрили нове відділення</a>
                            <p className="text">Нове відділення у місті Івано-Франківськ вулиця Володимира Великого 4. Це ювілейне 100 відділення по всій Україні.</p>
                        </div>
                        <div className="new">
                            <time>20.07.2023</time>
                            <a href="" className="name">Є відкриті вакансії</a>
                            <p className="text">Шукаємо працівників з досвідом і без у наші відділення в деяких містах України.</p>
                        </div>
                        <div className="new">
                            <time>11.08.2023</time>
                            <a href="" className="name">Мобільний додаток</a>
                            <p className="text">У нас з'явився мобільний додаток. Тепер кожен із наших клієнтів матиме зручний та швидкий доступ до всіх наших послуг.</p>
                        </div>
                    </div>
                    <div className="reviews">
                        <p className="title"><img src="image/webp/quotes/reviews.png" alt="" />Відгуки</p>
                        <div className="review">
                            <time>25.07.2023</time>
                            <p className="name">Людмила П.</p>
                            <p className="text">Погашення онлайн дуже виручає оскільки живу з відомих причин у Польщі, зручно та швидко.</p>
                        </div>
                        <div className="review">
                            <time>11.07.2023</time>
                            <p className="name">Олександр Д.</p>
                            <p className="text">Не завжди встигаю погасити кредит, завжди підлаштовуються під кліента, запропонувавши вигідні умови.</p>
                        </div>
                        <div className="review">
                            <time>08.06.2023</time>
                            <p className="name">Oksana</p>
                            <p className="text">Мала кредит в Перспективі ще до війни, співробітнкики допомогли закрити його чоловіку за довіренністю, все вийшло.</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}