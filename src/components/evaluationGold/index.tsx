import { useFormik } from 'formik';
import { useState, useEffect, useRef, RefObject } from 'react';

import DataOperator from '../../staticData/dataOperator';
import { ICondition , IDataGold } from "../../staticData/interfaces";

import "./style.scss"

const initialValues = {
    sample: "585 золото",
    category: "каблучки",
    condition: "Відмінний",
    weight: 1
};

export default function EvaluationGold() {
    const [metalPrices, setMetalPrices] = useState<IDataGold[]>();
    const [condition, setCondition] = useState<ICondition[]>();

    const refSubMenus: RefObject<HTMLDivElement[]> = useRef([]);
    const refResultDiv: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement >(null);

    const form = useFormik({
        initialValues,
        onSubmit,
      });

    function addRef(elem: HTMLDivElement) {
        if (refSubMenus.current?.length !== 3) {
            refSubMenus.current?.push(elem);
        }
    }

    const typeProduct = [{ en: "rings", ua: "Каблучки" },
    { en: "earrings", ua: "Сережки" },
    { en: "pendants", ua: "Кулони" },
    { en: "crosses", ua: "Крестики" },
    { en: "chains", ua: "Ланцюжки" },
    { en: "bracelets", ua: "Браслети" },
    { en: "wedding ring", ua: "Обручка" }];

    useEffect(() => {
        document.body.addEventListener('click', (event: MouseEvent) => {
            const element: HTMLElement = event.target as HTMLElement;

            if (!element.matches('.option, .option *')) {
                refSubMenus.current?.forEach((item) => {
                    item.classList.remove("active");
                })
            }
        });

        DataOperator.getMetal()?.then((data) => {
            setMetalPrices(data);
        });

        DataOperator.getCondition()?.then((data) => {
            setCondition(data);
        });
    }, []);

    function onSubmit(data:any) {
        if (metalPrices && condition && refResultDiv.current) {
            const rating = metalPrices.filter(item => {
                return data.sample.includes(item.sample);
            })[0].rating;
    
            const coefficient = condition.filter(item => {
                return data.condition.includes(item.state);
            })[0].coefficient;
    
            const result = Math.floor(rating * data.weight * coefficient);

            refResultDiv.current.innerHTML = `<p class='resultText'>Оцінка Вашого виробу <span class='resultNumb'>${result}</span></p>`;
        }
    }

    function onShowSubMenu(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) {
        refSubMenus.current?.forEach((item) => {
            item.classList.remove("active");
        })

        const div = event.currentTarget.querySelector<HTMLDivElement>(".subMenu");

        if (div && refResultDiv.current) {
            div.classList.add("active");
            refResultDiv.current.textContent = "Розрахувати";
        }
    }

    function onDecInc(i: number) {
        form.setFieldValue("weight", form.getFieldProps("weight").value + i);
        if (refResultDiv.current) {
            refResultDiv.current.textContent = "Розрахувати";
        }
    }
    
    function onSelection(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const input = event.currentTarget.closest(".option")?.querySelector(".input") as HTMLInputElement;
        
        form.setFieldValue(input.name, event.currentTarget.getAttribute("data-value"));
    }

    return (
        <article className='goldCalc'>
            <div className="limit">
                <form className='form' onSubmit={form.handleSubmit}>
                    <div className='option'>
                        <label htmlFor="sample" onClick={onShowSubMenu}>
                            Проба
                            <input name="sample" className="input" value={form.values.sample} readOnly/>
                            <div ref={addRef} className='subMenu'>
                                {
                                    metalPrices?.map((item) => {
                                        return <div onClick={onSelection} key={item.id} data-value={item.sample + " " + item.type}>{item.sample}   {item.type}</div>
                                    })
                                }
                            </div>
                            <img src="image/ico/header/arrow_left.svg" alt="Ups..." />
                        </label>
                    </div>
                    <div className='option'>
                        <label htmlFor="category" onClick={onShowSubMenu}>Категорія
                            <input name="category" className="input" value={form.values.category} readOnly />
                            <div ref={addRef} className='subMenu'>
                                {
                                    typeProduct.map((item, i) => {
                                        return <div onClick={onSelection} key={i} data-value={item.ua}>{item.ua}</div>
                                    })
                                }
                            </div>
                            <img src="image/ico/header/arrow_left.svg" alt="Ups..." />
                        </label>
                    </div>
                    <div className='option'>
                        <label htmlFor="condition" onClick={onShowSubMenu}>Стан
                            <input name="condition" className="input" value={form.values.condition} readOnly />
                            <div ref={addRef} className='subMenu'>
                                {
                                    condition?.map((item) => {
                                        return <div onClick={onSelection} key={item.id} data-value={item.state}>{item.state}</div>
                                    })
                                }
                            </div>
                            <img src="image/ico/header/arrow_left.svg" alt="Ups..." />
                        </label>
                    </div>
                    <div className='option'>
                        <label htmlFor="weight" className='weight'>Вага, грам
                            <input name="weight" type="number" className="input" value={form.values.weight}/>
                            <img onClick={() => onDecInc(1)} src="image/ico/header/arrow_left.svg" className='inc' alt="Ups..." />
                            <img onClick={() => onDecInc(-1)} src="image/ico/header/arrow_left.svg" className='dec' alt="Ups..." />
                        </label>
                    </div>
                    <div className="option btn">
                        <button ref={refResultDiv} className='calculate' type='submit'>Розрахувати</button>
                    </div>
                </form>
            </div>
        </article>
    )
}