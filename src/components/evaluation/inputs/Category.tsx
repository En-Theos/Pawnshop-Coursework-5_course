import { InitialValuesMetal } from "../interfaces";

// Компонент випадаючого списку із категоріями виробів з металів
export default function Category({onShowSelection, values, addRef, category, onСhoice}: {
    onShowSelection(event: React.MouseEvent<HTMLLabelElement, MouseEvent>): void,
    values: InitialValuesMetal,
    addRef(elem: HTMLDivElement): void,
    category: {
        en: string;
        ua: string;
    }[],
    onСhoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}) {
    return (
        <div className='option'>
            <label htmlFor="category" onClick={onShowSelection}>Категорія
                <input name="category" className="input" value={values.category} readOnly />
                <div ref={addRef} className='subMenu'>
                    {
                        category.map((item, i) => {
                            return <div onClick={onСhoice} key={i} data-value={item.ua}>{item.ua}</div>
                        })
                    }
                </div>
                <img src="/image/ico/header/arrow_left.svg" alt="Ups..." />
            </label>
        </div>
    )
}