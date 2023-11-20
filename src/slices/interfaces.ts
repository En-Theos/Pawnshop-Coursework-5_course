export interface IDataLots {
    id: number,
    name: string,
    market_price: number,
    characteristics: string | null,
    state: 'Відмінний' | 'Хороший' | 'Задовільний' | 'Поганий' | 'Зламано',
    picture: string,
    description: string,
    category: string,
    views: number,
    end_date: any,
    rate: number,
    bids: number
}