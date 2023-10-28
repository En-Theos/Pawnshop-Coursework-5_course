import { InitialValuesMetal } from "../interfaces"

// Компонент ваги виробу з металів
export default function Weight({values, onNumberEvent}: {
    values: InitialValuesMetal,
    onNumberEvent(i: number | string): void
}) {
    return (
        <div className='option'>
            <label htmlFor="weight" className='weight'>Вага, грам
                <input name="weight" type="number" className="input" value={values.weight} onChange={(e) => {onNumberEvent(e.target.value)}}/>
                <img onClick={() => onNumberEvent(1)} src="/image/ico/header/arrow_left.svg" className='inc' alt="Ups..." />
                <img onClick={() => onNumberEvent(-1)} src="/image/ico/header/arrow_left.svg" className='dec' alt="Ups..." />
            </label>
        </div>
    )
}