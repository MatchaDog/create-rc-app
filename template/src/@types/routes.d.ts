export declare namespace TRoute {
    interface IRoute {
        path: string;
        name?: string;
        component: React.FC<{ routes: IRoute[] }>;
        hidden?: boolean;
        routes?: Array<IRoute>;
        exact?: boolean;
    }
}
