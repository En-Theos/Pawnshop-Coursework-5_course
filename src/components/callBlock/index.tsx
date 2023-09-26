import "./style.scss";

export default function CallBlock() {
    return (
        <article className="callBlock">
            <div className="limit">
                <div className="content">
                    <img src="image/ico/call/call.svg" alt="" />
                    <h5 className="time">З 9:00 до 20:00</h5>
                    <p>Дзвінки по Україні безкоштовні</p>
                    <h5 className="phone">0 400 200 888</h5>
                </div>
            </div>  
        </article>
    )
}