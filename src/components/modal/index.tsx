import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from "yup"
import axios from 'axios';

import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { lotsUpdate, selectLotsById } from '../../slices/lots';
import { hideModal } from '../../slices/modal';

import "./style.scss";

export default function Modal() {
    const show = useAppSelector(state => state.modal.show)
    const idData = useAppSelector(state => state.modal.idData)
    const data = useAppSelector(selectLotsById(idData));

    const dispatch = useAppDispatch();

    if (!data) return <div className={"modal" + (show ? " active" : "")} onClick={(e) => {
        if (e.target === e.currentTarget) {
            document.body.style.overflow = "auto";
            dispatch(hideModal());
        }
    }}>Не знайдено такий лот</div>

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                rate: 0
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Це поле обов'язкове"),
                email: Yup.string().email("Не правильний формат email"),
                rate: Yup.number().min(data.rate + 1, `Ви повинні ввести суму більшу за теперішню: ${data.rate}`)
            })}
            onSubmit={({ name, email, rate }, { resetForm }) => {
                Promise.all([
                    axios.patch("http://localhost:3001/addViews", { id: data.id, views: data.views + 1 }),
                    axios.post("http://localhost:3001/upAnte", { id: data.id, name, email, rate })
                ]).then(() => {
                    dispatch(lotsUpdate({
                        id: data.id,
                        changes: {
                            rate,
                            bids: data.bids + 1,
                            views: data.views + 1
                        }
                    }));
                    resetForm();
                });
            }}>
            {({ resetForm }) => (
                <div className={"modal" + (show ? " active" : "")} onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        document.body.style.overflow = "auto";
                        dispatch(hideModal());
                        resetForm();
                    }
                }}>
                    <div className="content">
                        <Form>
                            <p style={{ fontSize: "26px" }}>Лот</p>
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
                            <div className='field'>
                                <p>На скільки підняти ставку?</p>
                                <Field className='input' type="number" name="rate" />
                                <ErrorMessage name={'rate'} render={(message) => {
                                    return (
                                        <p className='errorMessage'>{message}</p>
                                    )
                                }} />
                            </div>
                            <div className='field'>
                                <button type='submit'>Підняти</button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    )
}