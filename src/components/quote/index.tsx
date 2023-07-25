import "./style.scss"

export default function Quote() {
    return (
        <div className="quote">
            <div className="limit">
                <div className="quoteBox">
                    <div className="quotePortrait">
                        <img src="image/webp/quotes/MT.png" alt="" />
                    </div>
                    <div className="quoteText">
                        <p className="quote">«Легче одурачить людей, чем убедить их в том, что они одурачены»</p>
                        <p className="author">Марк Твен</p>
                        <p className="year">1935 -1910</p>
                    </div>
                </div>
                <div className="quoteReload">
                    <div className="decorQR">
                        <div className="line"></div>
                        <div className="circle"></div>
                    </div>
                    <div className="reloadBTN">
                        <img src="image/webp/quotes/reload.svg" alt="" />
                    </div>
                    <div className="decorQR">
                        <div className="circle"></div>
                        <div className="line"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}