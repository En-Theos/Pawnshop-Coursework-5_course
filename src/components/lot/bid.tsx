import { useEffect, useState } from "react";

export function Bid({rate}: {
    rate: number
}) {
    const [bid, setBid] = useState<string>('0');

    useEffect(() => {
        setBid(state => {
            const numberString = rate.toString();
    
            const dividedParts = [];
            let temporaryPart = '';
    
            for (let i = numberString.length - 1; i >= 0; i--) {
                temporaryPart = numberString[i] + temporaryPart;
    
                if (temporaryPart.length === 3 || i === 0) {
                    dividedParts.unshift(temporaryPart);
                    temporaryPart = '';
                }
            }
    
            const result = dividedParts.join(' ');
    
            return result;
        })
    }, []);
    
    return (
        <p className="bid">
            {bid}
        </p>
    )
}