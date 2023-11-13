// Компонент випадаючого списку із категоріями виробів з металів
export default function Category({onShowSelection, values, addRef, category, onChoice}: {
    onShowSelection(event: React.MouseEvent<HTMLLabelElement, MouseEvent>): void,
    values: string | undefined,
    addRef(elem: HTMLDivElement): void,
    category: string[],
    onChoice(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}) {
    return (
        <div className='option'>
            <label htmlFor="category" onClick={onShowSelection}>Категорія
                <input name="category" className="input" value={values} readOnly />
                <div ref={addRef} className='subMenu'>
                    {
                        category.map((item, i) => {
                            return <div onClick={onChoice} key={i} data-price={item}>{item}</div>
                        })
                    }
                </div>
                <img src="/image/ico/header/arrow_left.svg" alt="Ups..." />
            </label>
        </div>
    )
}