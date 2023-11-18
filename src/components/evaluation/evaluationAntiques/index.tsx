import { useFormik } from 'formik';
import { useState, useEffect, useRef, RefObject } from 'react';

import DataOperator from '../../../staticData/dataOperator';

import IForm from './interfaces';
import { ICondition } from "../../../staticData/interfaces";

import Condition from '../inputs/Condition';
import Files from '../inputs/Files';

import "../style.scss"
import Basic from '../inputs/Basic';

export default function EvaluationAntiques() {
    // Локальний стейт для статичних даних описів стану предмету
    const [condition, setCondition] = useState<ICondition[]>();

    // Ініціалізація Formik 
    const form = useFormik<IForm>({
        initialValues: {
            nameProduct: '',
            fullName: '',
            phone: '',
            front: null,
            back: null,
            condition: ''
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

        // Получення даних про "Стан" з бази даних
        DataOperator.getCondition()?.then((data) => {
            setCondition(data);
        });
    }, []);

    useEffect(() => {
        // Встановлення значень для інпутів
        form.setFieldValue("condition", condition?.[0].state);
    }, [condition])

    // Функція для події нажимання на кнопку розрахунку калькулятора
    function onSubmit() {
        if (condition && refResultDiv.current) {
            const formData = new FormData();
            const fileInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="file"]');

            if (fileInputs.length > 0) {
                fileInputs.forEach(item => {
                    const selectedFile: File | null = item.files ? item.files[0] : null;
                    if (selectedFile) {
                        formData.append('images', selectedFile);
                    }
                });
            }

            formData.append('fullName', form.values.fullName);
            formData.append('phone', form.values.phone + '');
            formData.append('nameProduct', form.values.nameProduct);
            formData.append('type', 'Антикваріат');
            formData.append('state', form.values.condition);

            fetch("http://localhost:3001/upload", {
                method: "POST",
                body: formData
            }).then((data)=> {
                console.log(data)
            })

            // Виведення результату розрахунків на сторінку
            refResultDiv.current.innerHTML = `<p class='resultText'>Надіслано на оцінку</p>`;
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
        // Встановка значееня через formik
        form.setFieldValue(input.name, event.currentTarget.textContent);
    }

    function onChangeFile(event: React.ChangeEvent<HTMLInputElement>, img:any) {
        const input = event.currentTarget.closest(".option")?.querySelector(".input") as HTMLInputElement;

        const selectedFile = event.target.files ? event.target.files[0] : null;

        if (selectedFile && refResultDiv.current) {
            const reader = new FileReader();
        
            reader.onload = function (e) {
                if (e.target) {
                    img.style.backgroundImage = `url(${e.target.result})`;
                }
            };

            refResultDiv.current.textContent = "Розрахувати";
        
            // Зчитуємо вибраний файл як URL-адресу даних
            reader.readAsDataURL(selectedFile);
          }
        form.setFieldValue(input.name, selectedFile);
    }

    return (
        <article className='calc'>
            <div className="limit">
                <form autoComplete="off" className='form' onSubmit={form.handleSubmit}>
                    <h3 style={{marginBottom: "25px"}} className='titleWristwatch'>Заявка на оцінку антикваріату</h3>
                    <Basic name='fullName' label='ПІБ' placeholder="Прізвище, ім'я, по батькові" value={form.values.fullName} form={form} refResultDiv={refResultDiv}/>
                    <Basic name='nameProduct' label='Назва годинника' placeholder='Виробник, модель годинника' value={form.values.nameProduct} form={form} refResultDiv={refResultDiv}/>
                    <Basic name='phone' label='Ваш номер телефону' placeholder='+380' number={true} value={form.values.phone+''} form={form} refResultDiv={refResultDiv}/>
                    <div className='option'>
                        <label >Завантажте фото</label>
                    </div> 
                    <div className='option' style={{flexDirection: "row"}}>
                        <Files onChangeFile={onChangeFile} label="фронтальний бік" name='front'/>
                        <Files onChangeFile={onChangeFile} label="зворотній бік" name='back'/>
                    </div>
                    <Condition onShowSelection={onShowSelection} values={form.values.condition} addRef={addRef} condition={condition} onChoice={onChoice}/>
                    <div className="option btn">
                        <button ref={refResultDiv} className='calculate' type='submit'>Надіслати</button>
                    </div>
                </form>
            </div>
        </article>
    )
}