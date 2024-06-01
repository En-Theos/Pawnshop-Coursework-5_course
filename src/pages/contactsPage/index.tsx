import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import { useState } from "react";

import CallBlock from "../../components/callBlock";
import Title from "../../components/title";

import "./style.scss";
import axios from "axios";

export default function ContactsPage() {
    const [isSucsses, setIsSucsses] = useState<"sucsses" | "error" | null>(null);

    return (
        <main className="contacts">
            <Title minorTitle={{ text: "" }} mainTitle={{ text: "Контакти" }} />
            <section className="callShadow">
                <CallBlock />
            </section>
            <section className="onlineSupport">
                <div className="limit">
                    <img src="/image/support.svg" alt="" />
                    <h4>Online підтримка користувачів</h4>
                    <div className="text">
                        <p>Ви можете задати запитання в онлайн-чаті або спитати у Telegram.</p>
                        <p>Також Ви можете пошукати відповідь на своє запитання в розділі <span>Допомога</span></p>
                    </div>
                    <div className="link">
                        <div className="chat">
                            <img src="/image/chat.svg" alt="" />
                            <p>Online чат</p>
                        </div>
                        <div className="telegram">
                            <img src="/image/telegram.svg" alt="" />
                            <p>Telegram бот</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contactForm">
                <div className="limit">
                    <img src="/image/leaf.svg" alt="" />
                    <h4>Напишіть лист</h4>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '+380',
                            message: ''
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required("Це поле обов'язкове"),
                            email: Yup.string().required("Це поле обов'язкове").email("Не правильний формат email"),
                            phone: Yup.string().required("Це поле обов'язкове").matches(/^\+380\d{9}$/, "Не правильний формат номера"),
                            message: Yup.string().required("Це поле обов'язкове")
                        })}
                        onSubmit={({ name, email, phone, message }, { resetForm }) => {
                            axios.post("http://localhost:3001/leaf", { name, email, phone, message }).then(() => {
                                setIsSucsses("sucsses");
                                resetForm();
                            }).catch(() => {
                                setIsSucsses("error");
                            });
                        }}>
                        {({ setFieldValue }) => (
                            <Form>
                                <div className='field'>
                                    <p>Прізвище, ім'я</p>
                                    <Field className='input' type="text" name="name" />
                                    <ErrorMessage name={'name'} render={(message) => {
                                        return (
                                            <p className='errorMessage'>{message}</p>
                                        )
                                    }} />
                                </div>
                                <div className="flexBox">
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
                                        <p>Номер телефону</p>
                                        <Field className='input' type="text" name="phone" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setFieldValue("phone", ('+380' + e.target.value.slice(4).replace(/\D/g, '')))
                                        }}/>
                                        <ErrorMessage name={'phone'} render={(message) => {
                                            return (
                                                <p className='errorMessage'>{message}</p>
                                            )
                                        }} />
                                    </div>
                                </div>
                                <div className='field'>
                                    <p>Ваше запитання</p>
                                    <Field className='input' as="textarea" type="text" name="message" />
                                    <ErrorMessage name={'message'} render={(message) => {
                                        return (
                                            <p className='errorMessage'>{message}</p>
                                        )
                                    }} />
                                </div>
                                <div className='field'>
                                    <button type='submit'>Відправити</button>
                                    {
                                        isSucsses === "sucsses" 
                                        ? <div className='sucsses'>Ваш лист відправлено</div>
                                        : 
                                        isSucsses === "error" 
                                        ? <div className='error'>Не вдалося відправити лист, спробуйте пізніше</div>
                                        : null
                                    }
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </main >
    )
}