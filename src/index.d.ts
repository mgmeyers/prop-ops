declare module prop {
    export function get(obj: object | Array, propString: string, fallBack?: any): any
   
    export function set(obj: object | Array, propString: string, value: any, loose?: boolean): object | Array
    declare namespace set {
        export function mutate(obj: object | Array, propString: string, value: any, loose?: boolean): object | Array
    }

    function merge(obj: object | Array, propString: string, value: object | Array, loose?: boolean): object | Array
    declare namespace merge {
        export function mutate(obj: object | Array, propString: string, value: object | Array, loose?: boolean): object | Array
    }
   
    export function has(obj: object, propString: string): boolean
   
    export function del(obj: object | Array, propString: string): object | Array
    declare namespace del {
        export function mutate(obj: object | Array, propString: string): object | Array
    }
}

