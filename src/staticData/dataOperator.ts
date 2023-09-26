import { ICondition , IDataGold } from "./interfaces";

export default class DataOperator {
    private static presenceMetal?: IDataGold[];
    private static presenceState?: ICondition[];

    static async getMetal() {
        if (!DataOperator.presenceMetal) {
            await fetch("http://localhost:3001/metal_prices")
            .then(response => response.json())
            .then((data: IDataGold[]) => {
                DataOperator.presenceMetal = data.filter(item => item.type.includes("Золото"));
            })
            .catch(error => console.error('Помилка:', error));

            return DataOperator.presenceMetal;
        } else {
            return DataOperator.presenceMetal
        }
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