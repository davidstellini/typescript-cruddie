export interface ApiRequestDecorator {
    decorateRequest(request: any): any;
}
