import { IDataTechnique } from "../../../staticData/interfaces";

import DataOperator from "../../../staticData/dataOperator";

export default function SearchInput({onShowSelection, value, addRef, data, onChoice, form, prices}: {
    onShowSelection(event: React.MouseEvent<HTMLLabelElement, MouseEvent>): void,
    value: string | undefined,
    addRef(elem: HTMLDivElement): void,
    data: IDataTechnique[] | undefined,
    onChoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void,
    form: any,
    prices: any
}) {
    let contents = data?.filter(item => item.name.toLowerCase().includes(form.values[DataOperator.dictionaryTechnique[data?.[0].type+'']].toLowerCase()))
        ?.map((item) => {
        return <div onClick={onChoice} key={item.id} data-price={item.price}>{item.name}</div>
    })

    function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
        prices[e.target.name] = 0
        form.setFieldValue( e.target.name, e.target.value);
    }

    return (
        <div className='option'>
            <label htmlFor={DataOperator.dictionaryTechnique[data?.[0].type+'']} onClick={onShowSelection}>{data?.[0].type}
                <input name={DataOperator.dictionaryTechnique[data?.[0].type+'']} onChange={onSearch} className="input" value={value} placeholder="Пошук" />
                <div ref={addRef} className='subMenu'>
                    {contents}
                </div>
                <img src="/image/ico/header/arrow_left.svg" alt="Ups..." />
            </label>
        </div>
    )
}
