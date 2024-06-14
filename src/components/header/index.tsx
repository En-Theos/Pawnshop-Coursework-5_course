import { Link, useNavigate } from "react-router-dom";

import "./style.scss"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from "axios";
import { clearData } from "../../slices/user";

export default function Header() {
    const userName = useAppSelector(state => state.user.name);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function logout() {
        axios.post("http://localhost:3001/auth/logout", {}, {
            withCredentials: true
        })
            .then((response) => {
                window.localStorage.clear()
                dispatch(clearData())
                navigate("/login");
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <header>
            <div className="limit">
                <div className="burger">
                    <div className="btn">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="link">
                        <div><a href="#">Головна</a></div>
                        <div><a href="#">Оцінка предметів</a></div>
                        <div><a href="#">Аукціон</a></div>
                        <div><a href="#">Товари</a></div>
                        <div><a href="#">Компанія</a></div>
                        <div><a href="#">Новини</a></div>
                    </div>
                </div>
                <div className="logo">
                    <img src="/image/webp/logo.png" alt="Ups..." />
                </div>
                <nav>
                    <div><Link to="/">Головна</Link></div>
                    <div>
                        <p>Оцінка</p>
                        <img src="/image/ico/header/arrow_left.svg" alt="Ups..." />
                        <div className="perspectiv">
                            <div className="subMenu">
                                <div>
                                    <Link to="evaluation/gold">Золота</Link>
                                </div>
                                <div>
                                    <Link to="evaluation/silver">Срібла</Link>
                                </div>
                                <div>
                                    <Link to="evaluation/technique">Техніки</Link>
                                </div>
                                <div>
                                    <Link to="evaluation/wristwatch">Наручних годинників</Link>
                                </div>
                                <div>
                                    <Link to="evaluation/antiques">Предметів мистецтва</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div><Link to="auction">Аукціон</Link></div>
                    <div><Link to="shop">Товари</Link></div>
                    <div><Link to="company">Компанія</Link></div>
                    <div><Link to="contacts">Контакти</Link></div>
                </nav>
                <div className="actions">
                    <div className="userMenu">
                        <div className="login">
                            <img src="/image/ico/header/userMenu.png" alt="Ups..." className="userIco" />
                            {
                                userName
                                    ? <><p>{userName}</p><span>/</span> <p className="link" onClick={logout}>Вийти</p></>
                                    : <><Link to="login">Вхід</Link> <span>/</span> <Link to="register">Реєстрація</Link></>
                            }
                        </div>
                        {
                            userName
                                ? <div className="subMenu">
                                    <div>
                                        <div>
                                            <img src="/image/ico/header/subMenu/key.svg" alt="" />
                                        </div>
                                        <Link to="user">Особистий кабінет</Link>
                                    </div>
                                </div>
                                : null
                        }

                    </div>
                </div>
            </div>
        </header>
    )
} 