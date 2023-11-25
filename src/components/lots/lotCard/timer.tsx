import { useEffect, useRef, useState } from "react";

export default function Timer({ deadline }: { deadline: string }) {
    const [date, setDate] = useState<{ days: string, hours: string, minutes: string, seconds: string }>(
        { days: '0', hours: '00', minutes: '00', seconds: '00' }
    );

    const [isDeadline, setIsDeadline] = useState<boolean>(false);

    const refInterval = useRef<NodeJS.Timer>();

    useEffect(() => {
        codeRepeat();
        refInterval.current = setInterval(() => codeRepeat(), 1000);
    }, []);

    function codeRepeat() {
        const remainderTime = Date.parse(deadline) - Date.now();

        const remainderDays = Math.round(remainderTime / (1000 * 60 * 60 * 24));
        const remainderHours = Math.round((remainderTime / (1000 * 60 * 60)) % 24);
        const remainderMinutes = Math.round((remainderTime / (1000 * 60)) % 60);
        const remainderSeconds = Math.round((remainderTime / 1000) % 60);

        setDate((state) => ({ ...state, days: getZero(remainderDays) }))
        setDate((state) => ({ ...state, hours: getZero(remainderHours) }))
        setDate((state) => ({ ...state, minutes: getZero(remainderMinutes) }))
        setDate((state) => ({ ...state, seconds: getZero(remainderSeconds) }))

        if (remainderTime <= 0) {
            setIsDeadline(true);
            clearInterval(refInterval.current);
        }
    }

    function getZero(number: number) {
        if (number < 10 && number > 0) {
            return `0${number}`;
        } else if (number < 0) {
            return "00";
        } else {
            return `${number}`;
        }
    }

    return (
        isDeadline ? null : 
        <div className="timer">
            <img src="image/ico/sliderLot/hourglass.svg" alt="" />
            <p>
                <span id="days">{date.days}</span> :
                <span id="hours">{date.hours}</span> :
                <span id="minutes">{date.minutes}</span> :
                <span id="seconds">{date.seconds}</span>
            </p>
        </div>
    )
}