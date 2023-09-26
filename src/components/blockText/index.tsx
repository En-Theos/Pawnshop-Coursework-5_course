import IBlockTextProps from "./interfaces"

import "./style.scss";

export default function BlockText({text}: IBlockTextProps) {
    return (
        <article className="descriptionText">
            <div className="limit">
                {
                    text.map((item, i) => {
                        return <p key={i}>{item}</p>
                    })
                }
            </div>
        </article>
    )
}