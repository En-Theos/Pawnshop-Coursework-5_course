import { useFormik } from 'formik';
import { useState, useEffect, useRef, RefObject } from 'react';

import DataOperator from '../../staticData/dataOperator';

import IEvaluationProps, {InitialValuesMetal} from "./interfaces";
import { ICondition, IDataMetal } from "../../staticData/interfaces";

import Sample from './inputs/Sample';
import Category from './inputs/Category';
import Condition from './inputs/Condition';
import Weight from './inputs/Weigth';

import "./style.scss"

export default function Evaluation({ initialValues, type }: IEvaluationProps) {
    // Локальний стейт для статичних даних цін певної категорії товарів
    const [mainData, setMainData] = useState<{}[]>();
    // Локальний стейт для статичних даних описів стану предмету
    const [condition, setCondition] = useState<ICondition[]>();

    // Ініціалізація Formik 
    const form = useFormik({
        initialValues,
        onSubmit,
    });

    // Ref елемент для всіх випадаючих списків
    const refSubMenus: RefObject<HTMLDivElement[]> = useRef([]);
    // Функція добавлення випадаючого списку в масив Ref
    function addRef(elem: HTMLDivElement) {
        if (refSubMenus.current?.length !== 3) { // ==========================================================
            refSubMenus.current?.push(elem);
        }
    }

    // Ref елемент для запису результату розрахунків калькулятора
    const refResultDiv: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Подія для закриття всіх випадаючих меню (refSubMenus) по кліку в будь-яке місце сайту
        document.body.addEventListener('click', (event: MouseEvent) => {
            const element: HTMLElement = event.target as HTMLElement;

            if (!element.matches('.option, .option *')) {
                refSubMenus.current?.forEach((item) => {
                    item.classList.remove("active");
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
        
            default:
                break;
        }
        
        // Получення даних про "Стан" з бази даних
        DataOperator.getCondition()?.then((data) => {
            setCondition(data);
        });
    }, []);

    // Функція для події нажимання на кнопку розрахунку калькулятора
    function onSubmit(data: any) {
        if (mainData && condition && refResultDiv.current) {
            let rating;     
            let result;

            // Получаєм коефіціент для враховування стану предмету
            const coefficient = condition.filter(item => {
                return data.condition.includes(item.state);
            })[0].coefficient;

            // Різні операції розрахунку для різних типів предмету
            switch (type) {
                case "gold": case "silver":
                    // Получення ціни за грам вибраної проби золота
                    rating = (mainData as IDataMetal[]).filter(item => {
                        return data.sample.includes(item.sample);
                    })[0].rating;

                    result = Math.floor(rating * data.weight * coefficient);
                    break;
            
                default:
                    break;
            }

            // Виведення результату розрахунків на сторінку
            refResultDiv.current.innerHTML = `<p class='resultText'>Оцінка Вашого виробу <span class='resultNumb'>${result}</span></p>`;
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
                    item.classList.remove("active");
                })

                div.classList.add("active");
            }

            refResultDiv.current.textContent = "Розрахувати";
        }
    }

    // Подія вибору елементу випадаючого списку
    function onСhoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // Получення input в який запишеться вибране значення
        const input = event.currentTarget.closest(".option")?.querySelector(".input") as HTMLInputElement;

        // Встановка значееня через formik
        form.setFieldValue(input.name, event.currentTarget.getAttribute("data-value"));
    }

    // Подія зміни значення в полі чисел
    function onNumberEvent(i: number | string) {
        const prevValue = form.getFieldProps("weight").value;

        if (typeof i === "string") {
            form.setFieldValue("weight", (parseInt(i) <= 0) || isNaN(parseInt(i)) ? prevValue : parseInt(i));
        } else {
            form.setFieldValue("weight", (prevValue + i) <= 0 ? prevValue : prevValue + i);
        }

        if (refResultDiv.current && (prevValue + i) > 0) {
            refResultDiv.current.textContent = "Розрахувати";
        }
    }

    // Змінна для запису інпутів калькулятора
    let inputs: JSX.Element | null = null; 

    // Код вибору компонентів для калькулятора в залежності від переданого типу калькулятора
    switch (type) {
        case "gold": case "silver":
            const typeValue = form.values as InitialValuesMetal;
            const typePrice = mainData as IDataMetal[];
            const category = DataOperator.category;

            inputs = (
                <>
                    <Sample onShowSelection={onShowSelection} values={typeValue} addRef={addRef} prices={typePrice} onСhoice={onСhoice}/>
                    <Category onShowSelection={onShowSelection} values={typeValue} addRef={addRef} category={category} onСhoice={onСhoice}/>
                    <Condition onShowSelection={onShowSelection} values={typeValue} addRef={addRef} condition={condition} onСhoice={onСhoice}/>
                    <Weight values={typeValue} onNumberEvent={onNumberEvent}/>
                </>
            )
            break;
    
        default:
            break;
    }

    return (
        <article className='calc'>
            <div className="limit">
                <form className='form' onSubmit={form.handleSubmit}>
                    {inputs}
                    <div className="option btn">
                        <button ref={refResultDiv} className='calculate' type='submit'>Розрахувати</button>
                    </div>
                </form>
            </div>
        </article>
    )
}