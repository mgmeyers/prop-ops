declare module 'prop-ops' {
    export function get(obj: object, propString: string, fallBack?: any): any
   
    export function set(obj: object, propString: string, value: any, loose?: boolean): object
    export namespace set {
        export function mutate(obj: object, propString: string, value: any, loose?: boolean): object
    }

    function merge(obj: object, propString: string, value: object, loose?: boolean): object
    export namespace merge {
        export function mutate(obj: object, propString: string, value: object, loose?: boolean): object
    }
   
    export function has(obj: object, propString: string): boolean
   
    export function del(obj: object, propString: string): object
    export namespace del {
        export function mutate(obj: object, propString: string): object
    }
}

