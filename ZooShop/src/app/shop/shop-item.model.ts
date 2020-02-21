export interface ShopItem {
    id: string;
    image: string
    name: string;
    price: number;
    quantity: number;
    position?: number;
    serverId?: string;
    date?: Date;
}