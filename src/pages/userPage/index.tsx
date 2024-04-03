import { useEffect, useState } from "react";
import axiosAuth from "../../auth";
import Title from "../../components/title";
import { useAppSelector } from "../../store/hooks";

import "./style.scss";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
    const userName = useAppSelector(state => state.user.name);

    const [bidsData, setBidsData] = useState<{
        market_price: string,
        name: string,
        picture: string,
        rate: string
    }[]>([])

    const [ordersData, setOrdersData] = useState<{
        name: string,
        market_price: string,
        picture: string,
        description: string
    }[]>([])

    const [evaluationData, setEvaluationData] = useState<{
        nameProduct: string,
        path: string
    }[]>([])

    const navigate = useNavigate()

    function fetchBids() {
        axiosAuth
            .get("/userBids")
            .then((response) => {
                setBidsData(response.data);
                setOrdersData([]);
                setEvaluationData([]);
            })
            .catch((err) => {
                if (err === "logaut") {
                    navigate("/login");
                }
            })
    }

    function fetchOrders() {
        axiosAuth
            .get("/userOrders")
            .then((response) => {
                setOrdersData(response.data);
                setBidsData([]);
                setEvaluationData([]);
            })
            .catch((err) => {
                if (err === "logaut") {
                    navigate("/login");
                }
            })
    }

    function fetchEvaluation() {
        axiosAuth
            .get("/userEvaluation")
            .then((response) => {
                setEvaluationData(response.data);
                setOrdersData([]);
                setBidsData([]);
            })
            .catch((err) => {
                if (err === "logaut") {
                    navigate("/login");
                }
            })
    }

    useEffect(() => {
        fetchBids();
    }, []);

    return (
        <main>
            <Title minorTitle={{ text: "" }} mainTitle={{ text: userName }} />
            <div className="limit">
                <div className="tabButton">
                    <div onClick={fetchBids} style={{
                        fontWeight: !!bidsData.length ? "700" : "400"
                    }}>Ставки</div>
                    <span></span>
                    <div onClick={fetchOrders} style={{
                        fontWeight: !!ordersData.length ? "700" : "400"
                    }}>Замовлення</div>
                    <span></span>
                    <div onClick={fetchEvaluation} style={{
                        fontWeight: !!evaluationData.length ? "700" : "400"
                    }}>Запити на оцінку</div>
                </div>
                <div className="content">
                    {
                        !!bidsData.length
                            ? <div className="bids">
                                <div className="tableHeader">
                                    <p style={{ width: "100px" }}>Зображення</p>
                                    <p className="name">Назва</p>
                                    <p className="price">Ваша остання ставка</p>
                                    <p className="marketPrice">Поточна найвища ставка</p>
                                </div>
                                {
                                    bidsData.map((item, i) => {
                                        return <div className="bid" key={i}>
                                            <img src={item.picture} alt={item.name} />
                                            <p className="name">{item.name}</p>
                                            <p className="price">{item.rate}</p>
                                            <p className="marketPrice">{item.market_price}</p>
                                        </div>
                                    })
                                }
                            </div>
                            : null
                    }
                    {
                        !!ordersData.length
                            ? <div className="orders">
                                <div className="tableHeader">
                                    <p style={{ width: "100px" }}>Зображення</p>
                                    <p className="name">Назва</p>
                                    <p className="marketPrice">Ціна</p>
                                    <p className="description">Опис</p>
                                </div>
                                {
                                    ordersData.map((item, i) => {
                                        return <div className="order" key={i}>
                                            <img src={item.picture} alt={item.name} />
                                            <p className="name">{item.name}</p>
                                            <p className="marketPrice">{item.market_price}</p>
                                            <p className="description">{item.description}</p>
                                        </div>
                                    })
                                }
                            </div>
                            : null
                    }
                    {
                        !!evaluationData.length
                            ? <div className="evaluations">
                                <div className="tableHeader">
                                    <div>
                                        <p>Назва</p>
                                    </div>
                                    <div>
                                        <p>Фронтальний бік</p>
                                    </div>
                                    <div>
                                        <p>Зворотній бік</p>
                                    </div>
                                </div>
                                {
                                    evaluationData.map((item, i) => {
                                        return <div className="evaluation" key={i}>
                                            <div>
                                                <p>{item.nameProduct}</p>
                                            </div>
                                            <div>
                                                <img src={"http://localhost:3001/" + item.path.split(",")[0].split("\\")[2]} alt={item.nameProduct} />
                                            </div>
                                            <div>
                                                <img src={"http://localhost:3001/" + item.path.split(",")[1].split("\\")[2]} alt={item.nameProduct} />
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        </main>
    )
}