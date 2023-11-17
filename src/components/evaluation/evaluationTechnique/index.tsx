import { useFormik } from 'formik';
import { useState, useEffect, useRef, RefObject } from 'react';

import DataOperator from '../../../staticData/dataOperator';

import IForm from './interfaces';
import { ICondition, IDataTechnique } from "../../../staticData/interfaces";

import SearchInput from '../inputs/SearchInput';
import Condition from '../inputs/Condition';
import Category from '../inputs/Category';

import "../style.scss";

export default function EvaluationTechnique() {
    // Локальний стейт для статичних даних цін певної категорії товарів
    const [mainData, setMainData] = useState<Record<string, IDataTechnique[] | undefined>>();
    // Локальний стейт для статичних даних описів стану предмету
    const [condition, setCondition] = useState<ICondition[]>();

    const [prices, setPrices] = useState<Record<string, number>>({});

    // Ініціалізація Formik 
    const form = useFormik<IForm>({
        initialValues: {
            category: '',
            condition: '',
            model: '',
            processor: '',
            RAM: '',
            SSD: '',
            graphicCard: '',
            resolution: '',
            screen: '',
            additionalFeature: [],
            producer: '',
            HDD: '',
            accessory: '',
            protection: '',
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

        Promise.all([
            DataOperator.getLaptop(),
            DataOperator.getMonitor(),
            DataOperator.getPhone(),
            DataOperator.getPhotoCamera(),
            DataOperator.getTablets(),
            DataOperator.getTv(),
            DataOperator.getVideoCamera()
        ]).then((responce) => {
            setMainData({
                laptop: responce[0],
                monitor: responce[1],
                phone: responce[2],
                photoCamera: responce[3],
                tablets: responce[4],
                tv: responce[5],
                videoCamera: responce[6],
            });
        });
        // Получення даних про "Стан" з бази даних
        DataOperator.getCondition()?.then((data) => {
            setCondition(data);
        });
    }, []);

    useEffect(() => {
        // Встановлення значень для інпутів
        form.setFieldValue("category", Object.keys(DataOperator.dictionaryTechnique)[2]);
        form.setFieldValue("condition", condition?.[0].state);

        // Встановлення цін значеннь в інпутах
        if (condition?.[0]) {
            setPrices({
                condition: condition[0].coefficient,
                category: 0
            })
        }
    }, [mainData, condition])

    // Функція для події нажимання на кнопку розрахунку калькулятора
    function onSubmit(form: any) {
    if (mainData && condition && refResultDiv.current) {
            if (form.category === 'Ноутбуки') {
                let result = 0;
                for (const key in prices) {
                    if (key !== 'condition') {
                        result += isNaN(prices[key]) ? 0 : prices[key]
                    }
                }

                result *= prices.condition;
                // Виведення результату розрахунків на сторінку
                refResultDiv.current.innerHTML = `<p class='resultText'>Оцінка Вашого предмету <span class='resultNumb'>${result.toFixed(2)}</span></p>`;
            } else {
                let result = (((isNaN(prices.model) ? 0 : prices.model) + (isNaN(prices.protection) ? 0 : prices.protection)) * prices.condition) / 2;

                refResultDiv.current.innerHTML = `<p class='resultText'>Оцінка Вашого предмету <span class='resultNumb'>${result.toFixed(2)}</span></p>`;
            }

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

        const price = event.currentTarget.dataset.price;
        setPrices((state) => {
            return { ...state, [input.name]: parseFloat(price + '') }
        });

        if (input.name === 'category') {
            setPrices((state) => {
                return {
                    condition: state.condition,
                    category: state.category
                }
            });
            for (const key in form.values) {
                if (key !== 'condition') {
                    form.setFieldValue(key, '');
                }
            }
        }
        // Встановка значееня через formik
        form.setFieldValue(input.name, event.currentTarget.textContent);
    }

    const category = Object.keys(DataOperator.dictionaryTechnique).slice(0, Object.keys(DataOperator.dictionaryTechnique).findIndex(item => item === "---"))

    return (
        <article className='calc'>
            <div className="limit">
                <form autoComplete="off" className='form' style={form.values.category === 'Ноутбуки' ? { maxWidth: "800px" } : {}} onSubmit={form.handleSubmit}>
                    <>
                        <Category onShowSelection={onShowSelection} values={form.values.category} addRef={addRef} category={category} onChoice={onChoice} />
                        {
                            form.values.category === 'Ноутбуки'
                                ?
                                <>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <SearchInput
                                            onShowSelection={onShowSelection}
                                            value={form.values.producer}
                                            addRef={addRef}
                                            data={mainData?.laptop?.filter(item => item.type === "Виробник")}
                                            onChoice={onChoice}  
                                            form={form}
                                            prices={prices}/>
                                        <SearchInput
                                            onShowSelection={onShowSelection}
                                            value={form.values.processor}
                                            addRef={addRef}
                                            data={mainData?.laptop?.filter(item => item.type === 'Процесор')}
                                            onChoice={onChoice}  
                                            form={form}
                                            prices={prices}/>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <SearchInput
                                            onShowSelection={onShowSelection}
                                            value={form.values.graphicCard}
                                            addRef={addRef}
                                            data={mainData?.laptop?.filter(item => item.type === 'Відеокарта')}
                                            onChoice={onChoice}  
                                            form={form}
                                            prices={prices}/>
                                        <SearchInput
                                            onShowSelection={onShowSelection}
                                            value={form.values.RAM}
                                            addRef={addRef}
                                            data={mainData?.laptop?.filter(item => item.type === "Оперативна пам'ять")}
                                            onChoice={onChoice}  
                                            form={form}
                                            prices={prices}/>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <SearchInput
                                            onShowSelection={onShowSelection}
                                            value={form.values.SSD}
                                            addRef={addRef}
                                            data={mainData?.laptop?.filter(item => item.type === "SSD")}
                                            onChoice={onChoice}  
                                            form={form}
                                            prices={prices}/>
                                        <SearchInput
                                            onShowSelection={onShowSelection}
                                            value={form.values.HDD}
                                            addRef={addRef}
                                            data={mainData?.laptop?.filter(item => item.type === "HDD")}
                                            onChoice={onChoice}  
                                            form={form}
                                            prices={prices}/>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <SearchInput
                                            onShowSelection={onShowSelection}
                                            value={form.values.screen}
                                            addRef={addRef}
                                            data={mainData?.laptop?.filter(item => item.type === "Екран")}
                                            onChoice={onChoice}  
                                            form={form}
                                            prices={prices}/>
                                        <SearchInput
                                            onShowSelection={onShowSelection}
                                            value={form.values.resolution}
                                            addRef={addRef}
                                            data={mainData?.laptop?.filter(item => item.type === "Роздільна здатність")}
                                            onChoice={onChoice}  
                                            form={form}
                                            prices={prices}/>
                                    </div>
                                </>
                                :
                                <>
                                    <SearchInput
                                        onShowSelection={onShowSelection}
                                        value={form.values.model}
                                        addRef={addRef}
                                        data={mainData?.[DataOperator.dictionaryTechnique[form.values.category + '']]?.filter(item => item.type === "Модель")}
                                        onChoice={onChoice}   
                                        form={form}
                                        prices={prices}/>
                                    {
                                        form.values.category !== 'Телевізори' && form.values.category !== 'Монітори' ?
                                            <SearchInput
                                                onShowSelection={onShowSelection}
                                                value={form.values.protection}
                                                addRef={addRef}
                                                data={mainData?.[DataOperator.dictionaryTechnique[form.values.category + '']]?.filter(item => item.type === "Захист")}
                                                onChoice={onChoice}  
                                                form={form}
                                                prices={prices}/>

                                            :
                                            null
                                    }
                                </>
                        }
                        <Condition onShowSelection={onShowSelection} values={form.values.condition} addRef={addRef} condition={condition} onChoice={onChoice} />
                    </>
                    <div className="option btn">
                        <button ref={refResultDiv} className='calculate' type='submit'>Розрахувати</button>
                    </div>
                </form>
            </div>
        </article>
    )
}