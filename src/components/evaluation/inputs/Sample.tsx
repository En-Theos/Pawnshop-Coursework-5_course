import { IDataMetal } from "../../../staticData/interfaces"

// Компонент випадаючого списку із пробами металів
export default function Sample({onShowSelection, values, addRef, prices, onChoice}: {
    onShowSelection(event: React.MouseEvent<HTMLLabelElement, MouseEvent>): void,
    values: string | undefined,
    addRef(elem: HTMLDivElement): void,
    prices: IDataMetal[] | undefined,
    onChoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}) {
    return (
        <div className='option'>
            <label htmlFor="sample" onClick={onShowSelection}>Проба
                <input name="sample" className="input" value={values} readOnly />
                <div ref={addRef} className='subMenu'>
                    {
                        prices?.map((item) => {
                            return <div onClick={onChoice} key={item.id} data-price={item.rating}>{item.sample} {item.type}</div>
                        })
                    }
                </div>
                <img src="/image/ico/header/arrow_left.svg" alt="Ups..." />
            </label>
        </div>
    )
}