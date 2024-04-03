import * as Yup from "yup"
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./style.scss";
import { useRef, useState } from "react";
import Title from "../../components/title";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "../../slices/user";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [status, setStatus] = useState<"error" | "email" | null>(null);
    const [errorText, setErrorText] = useState<string>();
    const passwordRef = useRef<string>("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    switch (status) {
        case "email":
            return (
                <div>
                    <Title minorTitle={{ text: "" }} mainTitle={{ text: "Підтвердіть пошту" }} />
                    <p style={{
                        textAlign: "center",
                        fontSize: "28px",
                        padding: "10px 30px 30px"
                    }}>
                        Ви не підтвердили свій обліковий запис. Будь ласка, перевірте свою поштову скриньку (і папку зі спамом) - ви мали отримати електронний лист із посиланням для підтвердження
                    </p>
                </div>
            )
        default:
            return (
                <div style={{
                    margin: "20px 0"
                }}>
                    <Title minorTitle={{ text: "" }} mainTitle={{ text: "Вхід" }} />
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().required("Це поле обов'язкове").email("Не правильний формат email"),
                            password: Yup.string().required("Це поле обов'язкове")
                        })}
                        onSubmit={({ email, password }, { resetForm }) => {
                            axios.post("http://localhost:3001/user/login", {
                                email,
                                password
                            }, {
                                withCredentials: true
                            })
                                .then((response) => {
                                    window.localStorage.setItem("token", "Beaer " + response.data.accessToken)
                                    if (response.data.user.isActivated) {
                                        navigate("/user")
                                    } else {
                                        setStatus("email");
                                    }
                                    dispatch(setData(response.data.user))
                                    resetForm();
                                })
                                .catch((err) => {
                                    setStatus("error");
                                    setErrorText(err.response.data.message);
                                })
                        }}>
                        {({ setFieldValue, errors, values }) => (
                            <Form>
                                <div className='field'>
                                    <p>Email</p>
                                    <Field className='input' type="text" name="email" />
                                    <ErrorMessage name={'email'} render={(message) => {
                                        return (
                                            <p className='errorMessage'>{message}</p>
                                        )
                                    }} />
                                </div>
                                <div className='field'>
                                    <p>Пароль</p>
                                    <Field className='input' type="password" name="password" onChange={(e: any) => {
                                        passwordRef.current = e.target.value;
                                        setFieldValue("password", e.target.value)
                                    }} />
                                    <ErrorMessage name={'password'} render={(message) => {
                                        return (
                                            <p className='errorMessage'>{message}</p>
                                        )
                                    }} />
                                </div>
                                <div className="field">
                                    <p style={{
                                        textAlign: "center",
                                        marginTop: "10px",
                                        color: "#d22929"
                                    }}>{errorText}</p>
                                </div>
                                <div className='field' style={{ margin: "0 auto", width: "fit-content" }}>
                                    <button
                                        disabled={!!(errors.email || errors.password) || !(values.email || values.password)}
                                        type='submit'
                                    >
                                        Увійти
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )
    }
}