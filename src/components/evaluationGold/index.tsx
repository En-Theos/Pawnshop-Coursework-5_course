import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from "yup";
import IFormGold from "./interfaces";
import { useState, useEffect } from 'react';

import IDataGold from "./interfaces"

import "./style.scss"

export default function EvaluationGold() {
    const [metalPrices, setMetalPrices] = useState<IDataGold[]>();

    useEffect(() => {
        fetch("http://localhost:3001/metal_prices")
        .then(response => response.json())
        .then((data: IDataGold[]) => {
            console.log(data); 
            setMetalPrices(data.filter(item => item.type.includes("Золото")));
        })
        .catch(error => console.error('Помилка:', error));
    }, []);

    return (
        <article className='goldCalc'>
            <div className="limit">
                <Formik
                    initialValues={{
                        sample: 585,
                        category: "ring",
                        condition: 1,
                        weight: 1
                    }}
                    onSubmit={({ sample }) => { console.log(sample) }}>
                    <Form className='form'>
                        <label htmlFor="">Проба</label>
                        <Field name="sample" as={"select"} >
                            {
                                metalPrices?.map((item) => {
                                    return <option key={item.id} value="700">{item.sample}</option>
                                })
                            }
                        </Field>
                    </Form>
                </Formik>
            </div>
        </article>
    )
}