import { ICondition , IDataMetal, IDataLaptop, IDataMonitop, IDataPhone, IDataPhotoCamera, IDataTablet, IDataTv, IDataVideoCamera } from "./interfaces";

export default class DataOperator {
    private static presenceMetal?: IDataMetal[];
    private static presenceLaptop?: IDataLaptop[];
    private static presenceMonitor?: IDataMonitop[];
    private static presencePhone?: IDataPhone[];
    private static presencePhotoCamera?: IDataPhotoCamera[];
    private static presenceTablet?: IDataTablet[];
    private static presenceTv?: IDataTv[];
    private static presenceVideoCamera?: IDataVideoCamera[];
    
    public static category: {
        en: string;
        ua: string;
    }[] = [
        { en: "rings", ua: "Каблучки" },
        { en: "earrings", ua: "Сережки" },
        { en: "pendants", ua: "Кулони" },
        { en: "crosses", ua: "Крестики" },
        { en: "chains", ua: "Ланцюжки" },
        { en: "bracelets", ua: "Браслети" },
        { en: "wedding ring", ua: "Обручка" }
    ];
    public static type: {
        en: string;
        ua: string;
    }[] = [
        { en: "laptop", ua: "Ноутбуки" },
        { en: "monitor", ua: "Монітори" },
        { en: "phone", ua: "Телефони" },
        { en: "photo camera", ua: "Фотокамери" },
        { en: "tablet", ua: "Планшети" },
        { en: "tv", ua: "Телевізори" },
        { en: "video camera", ua: "Відеокамери" }
    ];

    private static presenceState?: ICondition[];

    static async getMetal(metal: 'Золото' | 'Срібло') {
        await body("metal_prices", (data) => {
            DataOperator.presenceMetal = data.filter(item => item.type.includes(metal));
        });

        return DataOperator.presenceMetal;
    }

    static async getLaptop() {
        if (DataOperator.presenceLaptop) return DataOperator.presenceLaptop

        await body("laptop_prices", (data) => {
            DataOperator.presenceLaptop = data;
        });

        return DataOperator.presenceLaptop;
    }

    static async getMonitor() {
        if (DataOperator.presenceMonitor) return DataOperator.presenceMonitor;

        await body("monitor_prices", (data) => {
            DataOperator.presenceMonitor = data;
        });

        return DataOperator.presenceMonitor;
    }

    static async getPhone() {
        if (DataOperator.presencePhone) return DataOperator.presencePhone;

        await body("phone_prices", (data) => {
            DataOperator.presencePhone = data;
        });

        return DataOperator.presencePhone;
    }

    static async getPhotoCamera() {
        if (DataOperator.presencePhotoCamera) return DataOperator.presencePhotoCamera;

        await body("photo_camera_prices", (data) => {
            DataOperator.presencePhotoCamera = data;
        });

        return DataOperator.presencePhotoCamera;
    }

    static async getTablets() {
        if (DataOperator.presenceTablet) return DataOperator.presenceTablet;

        await body("tablets_prices", (data) => {
            DataOperator.presenceTablet = data;
        });

        return DataOperator.presenceTablet;
    }

    static async getTv() {
        if (DataOperator.presenceTv) return DataOperator.presenceTv;

        await body("tv_prices", (data) => {
            DataOperator.presenceTv = data;
        });

        return DataOperator.presenceTv;
    }

    static async getVideoCamera() {
        if (DataOperator.presenceVideoCamera) return DataOperator.presenceVideoCamera;

        await body("video_camera_prices", (data) => {
            DataOperator.presenceVideoCamera = data;
        });

        return DataOperator.presenceVideoCamera;
    }

    static async getCondition() {
        if (DataOperator.presenceState) return DataOperator.presenceState;

        await body("state", (data) => {
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