import { ICondition } from "../../../staticData/interfaces"

// Компонент випадаючого списку із оціночними станами предмету
export default function Condition({onShowSelection, values, addRef, condition, onChoice}: {
    onShowSelection(event: React.MouseEvent<HTMLLabelElement, MouseEvent>): void,
    values: string | undefined,
    addRef(elem: HTMLDivElement): void,
    condition: ICondition[] | undefined,
    onChoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}) {
    const description = condition?.find(item => item.state === values);

    return (
        <div className='option'>
            <label htmlFor="condition" onClick={onShowSelection}>Стан
                <input name="condition" className="input" value={values} readOnly />
                <div ref={addRef} className='subMenu'>
                    {
                        condition?.map((item) => {
                            return <div onClick={onChoice} key={item.id} data-price={item.coefficient}>{item.state}</div>
                        })
                    }
                </div>
                <img src="/image/ico/header/arrow_left.svg" alt="Ups..." />
            </label>
            <p className="description">
                {description?.description}
            </p>
        </div>
    )
}
