import { ICondition , IDataMetal } from "./interfaces";

export default class DataOperator {
    private static presenceMetal?: IDataMetal[];
    public static category: {
        en: string;
        ua: string;
    }[] = [{ en: "rings", ua: "Каблучки" },
    { en: "earrings", ua: "Сережки" },
    { en: "pendants", ua: "Кулони" },
    { en: "crosses", ua: "Крестики" },
    { en: "chains", ua: "Ланцюжки" },
    { en: "bracelets", ua: "Браслети" },
    { en: "wedding ring", ua: "Обручка" }];

    private static presenceState?: ICondition[];

    static async getMetal(metal: 'Золото' | 'Срібло') {
        await fetch("http://localhost:3001/metal_prices")
        .then(response => response.json())
        .then((data: IDataMetal[]) => {
            DataOperator.presenceMetal = data.filter(item => item.type.includes(metal));
        })
        .catch(error => console.error('Помилка:', error));

        return DataOperator.presenceMetal;
    }

    static async getCondition() {
        if (!DataOperator.presenceState) {
            await fetch("http://localhost:3001/state")
            .then(response => response.json())
            .then((data: ICondition[]) => {
                DataOperator.presenceState = data;
            })
            .catch(error => console.error('Помилка:', error));

            return DataOperator.presenceState;
        } else {
            return DataOperator.presenceState
        }
    }
}