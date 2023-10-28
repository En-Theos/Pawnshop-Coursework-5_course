import { ICondition } from "../../../staticData/interfaces"
import { InitialValuesMetal } from "../interfaces"

// Компонент випадаючого списку із оціночними станами предмету
export default function Condition({onShowSelection, values, addRef, condition, onСhoice}: {
    onShowSelection(event: React.MouseEvent<HTMLLabelElement, MouseEvent>): void,
    values: InitialValuesMetal,
    addRef(elem: HTMLDivElement): void,
    condition: ICondition[] | undefined,
    onСhoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}) {
    const description = condition?.find(item => item.state === values.condition);

    return (
        <div className='option'>
            <label htmlFor="condition" onClick={onShowSelection}>Стан
                <input name="condition" className="input" value={values.condition} readOnly />
                <div ref={addRef} className='subMenu'>
                    {
                        condition?.map((item) => {
                            return <div onClick={onСhoice} key={item.id} data-value={item.state}>{item.state}</div>
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
