import { useEffect, useState } from "react"

export default function StateInfo({ descriptionState }: { descriptionState: string }) {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        document.body.addEventListener('click', (e: MouseEvent) => {
            if (e.target) {
                const div = e.target as HTMLDivElement;

                if (!div.closest(".stateInfo")) {
                    setShow(false);
                }
            }
        });
    },[])

    return (
        <div className="stateInfo" onClick={({target}) => {
            const div = target as HTMLDivElement

            if (!div.classList.contains("active")) {
                setShow((state) => !state)
            }
        }}>
            <span >!</span>
            <div className={show ? "active" : ""}>{descriptionState}</div>
        </div>
    )
}