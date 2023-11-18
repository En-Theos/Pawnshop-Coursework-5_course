import { RefObject } from "react";

export default function SearchInput(
    {name, label, placeholder, number, value, form, refResultDiv}: 
    {
        name: string, 
        label: string, 
        placeholder: string, 
        number?: boolean,
        value: string,
        form: any,
        refResultDiv: RefObject<HTMLButtonElement>
    }
    ) {
    
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        let validValue = '';

        if (number) {
            validValue = e.target.value.replace(/\D/g, '');
        } else {
            validValue = e.target.value;
        }
        if (refResultDiv.current) {
            refResultDiv.current.textContent = "Розрахувати";
        }
        form.setFieldValue(name, validValue);
    }

    return (
        <div className='option'>
            <label htmlFor={name}>{label}
                <input required name={name} className="input" onChange={onChange} placeholder={placeholder} value={value} />
            </label>
        </div>
    )
}