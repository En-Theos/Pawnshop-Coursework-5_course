import "./style.scss";

export default function CategoriesGoods() {
    return (
        <div className="categories">
            <div className="limit">
                <div className="categoria">
                    <a href="">
                        <div className="categoriaIco">
                            <img src="image/webp/categories/clock_Ico.png" alt="" />
                        </div>
                        <p className="categoriaName">Годинники</p>
                        <div className="categoriaDecor">
                            <div className="line"></div>
                            <div className="romb"></div>
                            <div className="line"></div>
                        </div>
                    </a>
                </div>
                <div className="decor">
                    <div className="line"></div>
                    <div className="circle"></div>
                    <div className="line"></div>
                </div>
                <div className="categoria">
                    <a href="">
                        <div className="categoriaIco">
                            <img src="image/webp/categories/jewelryProducts_ico.png" alt="" />
                        </div>
                        <p className="categoriaName">Ювелірні вироби</p>
                        <div className="categoriaDecor">
                            <div className="line"></div>
                            <div className="romb"></div>
                            <div className="line"></div>
                        </div>
                    </a>
                </div>
               
                <div className="categoria">
                    <a href="">
                        <div className="categoriaIco">
                            <img src="image/webp/categories/Hi-Tech_ico.png" alt="" />
                        </div>
                        <p className="categoriaName">Техніка</p>
                        <div className="categoriaDecor">
                            <div className="line"></div>
                            <div className="romb"></div>
                            <div className="line"></div>
                        </div>
                    </a>
                </div>
                <div className="decor">
                    <div className="line"></div>
                    <div className="circle"></div>
                    <div className="line"></div>
                </div>
                <div className="categoria">
                    <a href="">
                        <div className="categoriaIco">
                            <img src="image/webp/categories/ItemsArts_ico.png" alt="" />
                        </div>
                        <p className="categoriaName">Предмети мистецтва</p>
                        <div className="categoriaDecor">
                            <div className="line"></div>
                            <div className="romb"></div>
                            <div className="line"></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}