import { ICondition , IDataMetal, IDataTechnique } from "./interfaces";

export default class DataOperator {
    private static presenceMetal?: IDataMetal[];
    private static presenceLaptop?: IDataTechnique[];
    private static presenceMonitor?: IDataTechnique[];
    private static presencePhone?: IDataTechnique[];
    private static presencePhotoCamera?: IDataTechnique[];
    private static presenceTablet?: IDataTechnique[];
    private static presenceTv?: IDataTechnique[];
    private static presenceVideoCamera?: IDataTechnique[];
    
    public static dictionaryMetal: Record<string, string> = {
        "Каблучки": "rings",
        "Сережки": "earrings",
        "Кулони": "pendants",
        "Крестики": "crosses",
        "Ланцюжки": "chains",
        "Браслети": "bracelets",
        "Обручка": "weddingRing"
    };
    public static dictionaryTechnique: Record<string, string> = { 
        "Ноутбуки": "laptop",
        "Монітори": "monitor",
        "Телефони": "phone",
        "Фотокамери": "photoCamera",
        "Планшети": "tablets",
        "Телевізори": "tv",
        "Відеокамери": "videoCamera",
        "---":"---",
        "Модель": "model",
        "Процесор": "processor",
        "Оперативна пам'ять": "RAM",
        "SSD": "SSD",
        "Відеокарта": "graphicCard",
        "Роздільна здатність": "resolution",
        "Екран": "screen",
        "Додаткова можливість": "additionalFeature",
        "Виробник": "producer",
        "HDD": "HDD",
        "Аксесуар": "accessory",
        "Захист" :"protection",
        
    };

    private static presenceState?: ICondition[];

    static async getMetal(metal: 'Золото' | 'Срібло') {
        await body("prices/metal", (data) => {
            DataOperator.presenceMetal = data.filter(item => item.type.includes(metal));
        });

        return DataOperator.presenceMetal;
    }

    static async getLaptop() {
        if (DataOperator.presenceLaptop) return DataOperator.presenceLaptop

        await body("prices/laptop", (data) => {
            DataOperator.presenceLaptop = data;
        });

        return DataOperator.presenceLaptop;
    }

    static async getMonitor() {
        if (DataOperator.presenceMonitor) return DataOperator.presenceMonitor;

        await body("prices/monitor", (data) => {
            DataOperator.presenceMonitor = data;
        });

        return DataOperator.presenceMonitor;
    }

    static async getPhone() {
        if (DataOperator.presencePhone) return DataOperator.presencePhone;

        await body("prices/phone", (data) => {
            DataOperator.presencePhone = data;
        });

        return DataOperator.presencePhone;
    }

    static async getPhotoCamera() {
        if (DataOperator.presencePhotoCamera) return DataOperator.presencePhotoCamera;

        await body("prices/photo_camera", (data) => {
            DataOperator.presencePhotoCamera = data;
        });

        return DataOperator.presencePhotoCamera;
    }

    static async getTablets() {
        if (DataOperator.presenceTablet) return DataOperator.presenceTablet;

        await body("prices/tablet", (data) => {
            DataOperator.presenceTablet = data;
        });

        return DataOperator.presenceTablet;
    }

    static async getTv() {
        if (DataOperator.presenceTv) return DataOperator.presenceTv;

        await body("prices/tv", (data) => {
            DataOperator.presenceTv = data;
        });

        return DataOperator.presenceTv;
    }

    static async getVideoCamera() {
        if (DataOperator.presenceVideoCamera) return DataOperator.presenceVideoCamera;

        await body("prices/video_camera", (data) => {
            DataOperator.presenceVideoCamera = data;
        });

        return DataOperator.presenceVideoCamera;
    }

    static async getCondition() {
        if (DataOperator.presenceState) return DataOperator.presenceState;

        await body("evaluation/state", (data) => {
            DataOperator.presenceState = data;
        });
        
        return DataOperator.presenceState;
    }
}

async function body(URL: string, func: (data: any[]) => void) {
    await fetch(`http://localhost:3001/${URL}`)
        .then(response => response.json())
        .then((data: ICondition[]) => {
            func(data)
        })
        .catch(error => console.error('Помилка:', error));
}