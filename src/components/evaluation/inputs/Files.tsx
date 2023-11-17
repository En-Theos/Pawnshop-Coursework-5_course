import { useRef } from "react";

export default function Files({onChangeFile, label, name}: {
    onChangeFile: (e: React.ChangeEvent<HTMLInputElement>, img: any) => void,
    label: string,
    name: string
}) {
    const img = useRef(null);

    return (
        <div className='option file'>
            <label > {label}
                <div ref={img}>
                    <input required onChange={(e) => {onChangeFile(e, img.current)}} type="file"  name={name} className="input"/>
                    <p>+</p>
                </div>
            </label>
        </div>
    )
}