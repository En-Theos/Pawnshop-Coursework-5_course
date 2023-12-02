import { useFormik } from 'formik';
import { useState, useEffect, useRef, RefObject } from 'react';

import DataOperator from '../../../staticData/dataOperator';

import IForm from './interfaces';
import { ICondition, IDataMetal } from "../../../staticData/interfaces";

import Sample from '../inputs/Sample';
import Category from '../inputs/Category';
import Condition from '../inputs/Condition';
import Weight from '../inputs/Weigth';

import "../style.scss"

export default function EvaluationMetal({type}: {type: "gold" | "silver"}) {
    // Локальний стейт для статичних даних цін певної категорії товарів
    const [mainData, setMainData] = useState<IDataMetal[]>();
    // Локальний стейт для статичних даних описів стану предмету
    const [condition, setCondition] = useState<ICondition[]>();

    const [prices, setPrices] = useState<Record<string, number>>({});

    // Ініціалізація Formik 
    const form = useFormik<IForm>({
        initialValues: {
            sample: '',
            category: '',
            condition: '',
            weight: 0
        },
        onSubmit,
    });

    // Ref елемент для всіх випадаючих списків
    const refSubMenus: RefObject<HTMLDivElement[]> = useRef([]);
    // Функція добавлення випадаючого списку в масив Ref
    function addRef(elem: HTMLDivElement) {
        refSubMenus.current?.push(elem);
    }

    // Ref елемент для запису результату розрахунків калькулятора
    const refResultDiv: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);

    // Ініціалізація даних
    useEffect(() => {
        // Подія для закриття всіх випадаючих меню (refSubMenus) по кліку в будь-яке місце сайту
        document.body.addEventListener('click', (event: MouseEvent) => {
            const element: HTMLElement = event.target as HTMLElement;

            if (!element.matches('.option, .option *')) {
                refSubMenus.current?.forEach((item) => {
                    if (item) {
                        item.classList.remove("active");
                    }
                })
            }
        });

        switch (type) {
            case "gold": 
                // Получення даних про "Золото" з бази даних
                DataOperator.getMetal('Золото')?.then((data) => {
                    setMainData(data);
                });
                break;
            case "silver":
                // Получення даних про "Срібло" з бази даних
                DataOperator.getMetal('Срібло')?.then((data) => {
                    setMainData(data);
                });
                break;
        }
        // Получення даних про "Стан" з бази даних
        DataOperator.getCondition()?.then((data) => {
            setCondition(data);
        });
    }, []);

    useEffect(() => {
        // Встановлення значень для інпутів
        form.setFieldValue("sample", mainData?.[0].sample + " " + mainData?.[0].type);
        form.setFieldValue("category", Object.keys(DataOperator.dictionaryMetal)[0]);
        form.setFieldValue("condition", condition?.[0].state);
        form.setFieldValue("weight", 1);

        // Встановлення цін значеннь в інпутах
        if (mainData?.[0] && condition?.[0]) {
            setPrices({
                sample: mainData[0].rating,
                condition: condition[0].coefficient,
                weight: 1,
                category: 0
            }) 
        }
    }, [mainData, condition])

    // Функція для події нажимання на кнопку розрахунку калькулятора
    function onSubmit() {
        if (mainData && condition && refResultDiv.current) {
            let result = Math.floor(prices.sample * prices.weight * prices.condition);

            // Виведення результату розрахунків на сторінку
            refResultDiv.current.innerHTML = `<p class='resultText'>Оцінка Вашого предмету <span class='resultNumb'>${result}</span></p>`;
        }
    }

    // Подія показу випадаючого списку
    function onShowSelection(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
        const div = event.currentTarget.querySelector<HTMLDivElement>(".subMenu");

        if (div && refResultDiv.current) {
            if (div.classList.contains("active")) {
                div.classList.remove("active");
            } else {
                refSubMenus.current?.forEach((item) => {
                    if (item) {
                        item.classList.remove("active");
                    }
                })

                div.classList.add("active");
            }

            refResultDiv.current.textContent = "Розрахувати";
        }
    }

    // Подія вибору елементу випадаючого списку
    function onChoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // Получення input в який запишеться вибране значення
        const input = event.currentTarget.closest(".option")?.querySelector(".input") as HTMLInputElement;

        const price =  event.currentTarget.dataset.price;
        setPrices((state) => {
            return {...state, [input.name]: parseFloat(price+'')}
        })

        // Встановка значееня через formik
        form.setFieldValue(input.name, event.currentTarget.textContent);
    }

    // Подія зміни значення в полі чисел
    function onNumberEvent(i: number | string) {
        const prevValue = form.getFieldProps("weight").value;

        setPrices((state) => {
            return {...state, weight: prevValue + 1}
        });

        if (typeof i === "string") {
            form.setFieldValue("weight", (parseInt(i) <= 0) || isNaN(parseInt(i)) ? prevValue : parseInt(i));
        } else {
            form.setFieldValue("weight", (prevValue + i) <= 0 ? prevValue : prevValue + i);
        }

        if (refResultDiv.current && (prevValue + i) > 0) {
            refResultDiv.current.textContent = "Розрахувати";
        }
    }

    return (
        <article className='calc'>
            <div className="limit">
                <form autoComplete="off" className='form' onSubmit={form.handleSubmit}>
                    <Sample onShowSelection={onShowSelection} values={form.values.sample} addRef={addRef} prices={mainData} onChoice={onChoice}/>
                    <Category onShowSelection={onShowSelection} values={form.values.category} addRef={addRef} category={Object.keys(DataOperator.dictionaryMetal)} onChoice={onChoice}/>
                    <Condition onShowSelection={onShowSelection} values={form.values.condition} addRef={addRef} condition={condition} onChoice={onChoice}/>
                    <Weight values={form.values.weight} onNumberEvent={onNumberEvent}/>
                    <div className="option btn">
                        <button ref={refResultDiv} className='calculate' type='submit'>Розрахувати</button>
                    </div>
                </form>
            </div>
        </article>
    )
}