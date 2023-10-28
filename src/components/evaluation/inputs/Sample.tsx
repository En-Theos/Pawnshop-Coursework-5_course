import { IDataMetal } from "../../../staticData/interfaces"
import { InitialValuesMetal } from "../interfaces"

// Компонент випадаючого списку із пробами металів
export default function Sample({onShowSelection, values, addRef, prices, onСhoice}: {
    onShowSelection(event: React.MouseEvent<HTMLLabelElement, MouseEvent>): void,
    values: InitialValuesMetal,
    addRef(elem: HTMLDivElement): void,
    prices: IDataMetal[] | undefined,
    onСhoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}) {
    return (
        <div className='option'>
            <label htmlFor="sample" onClick={onShowSelection}>Проба
                <input name="sample" className="input" value={values.sample} readOnly />
                <div ref={addRef} className='subMenu'>
                    {
                        prices?.map((item) => {
                            return <div onClick={onСhoice} key={item.id} data-value={item.sample + " " + item.type}>{item.sample}   {item.type}</div>
                        })
                    }
                </div>
                <img src="/image/ico/header/arrow_left.svg" alt="Ups..." />
            </label>
        </div>
    )
}