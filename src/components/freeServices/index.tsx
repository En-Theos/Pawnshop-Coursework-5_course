import "./style.scss"

export default function FreeServices() {
    return (
        <div className="cardsService">
            <div className="limit">
                <div className="cardService">
                    <div className="img">
                        <img src="/image/webp/services/magnifier.png" alt="" />
                    </div>
                    <p className="title">Експертна оцінка</p>
                    <p className="description">
                        Будь-яка оцінка ваших речей здійснюється безкоштовно.
                    </p>
                    <button><a href="#">Детальніше</a></button>
                </div>
                <div className="cardService">
                    <div className="img">
                        <img src="/image/webp/services/gear.png" alt="" />
                    </div>
                    <p className="title">Ремонт</p>
                    <p className="description">
                        Виставляючи свою річ на аукціон, ми безкоштовно здійснюємо ремонт незначних несправностей у техніці чи інших предметах з механічними частинами.
                    </p>
                    <button><a href="#">Детальніше</a></button>
                </div>
                <div className="cardService">
                    <div className="img">
                        <img src="/image/webp/services/instruments.png" alt="" />
                    </div>
                    <p className="title">Реставрація</p>
                    <p className="description">
                        Виставляючи свої речі на аукціон, ми забезпечуємо безкоштовну реставрацію незначних дефектів на предметах мистецтва.
                    </p>
                    <button><a href="#">Детальніше</a></button>
                </div>
            </div>
        </div>
    )
}