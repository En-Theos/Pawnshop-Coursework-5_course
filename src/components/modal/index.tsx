import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { lotsUpdate, selectLotsById } from '../../slices/lots';
import { hideModal } from '../../slices/modal';

import "./style.scss";

export default function Modal() {
    const location = useLocation().pathname.split("/")[1];

    const show = useAppSelector(state => state.modal.show)
    const idData = useAppSelector(state => state.modal.idData)
    const ifViews = useAppSelector(state => state.modal.ifViews)
    const data = useAppSelector(selectLotsById(idData));

    const [isSucsses, setIsSucsses] = useState<"sucsses" | "error" | null>(null);

    const dispatch = useAppDispatch();

    if (!data) return <div className={"modal" + (show ? " active" : "")} onClick={(e) => {
        if (e.target === e.currentTarget) {
            document.body.style.overflow = "auto";
            dispatch(hideModal());
        }
    }}>Не знайдено такий {location === "shop" ? "товар" : "лот"}</div>

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                rate: location === "shop" ? 90000000000000 : 0
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Це поле обов'язкове"),
                email: Yup.string().required("Це поле обов'язкове").email("Не правильний формат email"),
                rate: Yup.number().min((data.rate || data.market_price) + 1, `Ви повинні ввести суму більшу за теперішню: ${data.rate || data.market_price}`)
            })}
            onSubmit={({ name, email, rate }, { resetForm }) => {
                if (location !== "shop") {
                    if (ifViews) {
                        Promise.all([
                            axios.patch(`http://localhost:3001/lots/add-view/${data.id}`),
                            axios.patch("http://localhost:3001/lots/up-rate", { goodsForSaleId: data.id, name, email, rate })
                        ]).then(() => {
                            dispatch(lotsUpdate({
                                id: data.id,
                                changes: {
                                    rate,
                                    bids: (+data.bids) + 1,
                                    views: data.views + 1
                                }
                            }));
                            resetForm();
                            setIsSucsses("sucsses");
                        }).catch(() => {
                            setIsSucsses("error");
                        });
                    } else {
                        axios.patch("http://localhost:3001/lots/up-rate", { goodsForSaleId: data.id, name, email, rate }).then(() => {
                            dispatch(lotsUpdate({
                                id: data.id,
                                changes: {
                                    rate,
                                    bids: data.bids + 1,
                                }
                            }));
                            resetForm();
                            setIsSucsses("sucsses");
                        }).catch(() => { 
                            setIsSucsses("error");
                        });
                    }
                } else {
                    axios.post("http://localhost:3001/products/buy", { goodsForSaleId: data.id, name_customer: name, email, name_product: data.name }).then(() => {
                        resetForm();
                        setIsSucsses("sucsses");
                    }).catch(() => {
                        setIsSucsses("error");
                    });
                }
            }}>
            {({ resetForm }) => (
                <div className={"modal" + (show ? " active" : "")} onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        document.body.style.overflow = "auto";
                        setIsSucsses(null);
                        dispatch(hideModal());
                        resetForm();
                    }
                }}>
                    <div className="content">
                        <Form>
                            <p style={{ fontSize: "26px" }}>{location === "shop" ? "Товар" : "Лот"}</p>
                            <p className="name">{data.name}</p>
                            <div className='field'>
                                <p>Прізвище, ім'я</p>
                                <Field className='input' type="text" name="name" />
                                <ErrorMessage name={'name'} render={(message) => {
                                    return (
                                        <p className='errorMessage'>{message}</p>
                                    )
                                }} />
                            </div>
                            <div className='field'>
                                <p>Електрона пошта</p>
                                <Field className='input' type="email" name="email" />
                                <ErrorMessage name={'email'} render={(message) => {
                                    return (
                                        <p className='errorMessage'>{message}</p>
                                    )
                                }} />
                            </div>
                            {
                                location !== "shop" ?
                                    <div className='field'>
                                        <p>На скільки підняти ставку?</p>
                                        <Field className='input' type="number" name="rate" />
                                        <ErrorMessage name={'rate'} render={(message) => {
                                            return (
                                                <p className='errorMessage'>{message}</p>
                                            )
                                        }} />
                                    </div> : null
                            }
                            <div className='field'>
                                <button type='submit'>{location === "shop" ? "Придбати" : "Підняти"} </button>
                                {
                                    isSucsses === "sucsses"
                                        ? <div className='sucsses'>{location === "shop"
                                            ? "Незабаром з вами зв'яжеться наш консультант для з'ясування додаткової інформації."
                                            : "У разі якщо ваша ставка буде найбільшою з вами звяжеться наш працівник для проведення всіх потрібних операцій."}</div>
                                        :
                                        isSucsses === "error"
                                            ? <div className='error'>Не вдалося відправити форму, спробуйте пізніше</div>
                                            : null
                                }
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    )
}