export class ConfigService {

    private config: Config = {
         serviceUrl: "http://localhost:8080"
        //serviceUrl: "http://dev.mabu.es:8080/backend"
    };

    private url: Url = {
        product: "/public/product",
        restaurant: "/public/restaurant",
        category: "/public/category",
        taxe: "/public/taxe",
        existRestaurantName: "public/restaurant/exist",
        user:'/user',
        employee:'/employee',
        employeeRoles:'/employee/roles',
        order:'/order',
        image:'/public/image',
      orderStatistics:'/statistics/order'
    };

    constructor() {
    }

    get(key: string) {
        return this.config[key];
    }

    getUrl(key: string) {
        return this.config['serviceUrl'] + this.url[key];
    }


}

interface Config {
    serviceUrl: string;
    [ index: string ]: string;
}

interface Url {
    [ index: string ]: string;
}
