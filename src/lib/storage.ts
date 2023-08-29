import { Injectable } from "@angular/core";

@Injectable( { providedIn: 'root' } )

export class StorageService {

    public addData( key: string, data: any ): void {
        localStorage.setItem( key, JSON.stringify( data ) );
    }

    public getData<T>( key: string ): T | undefined {
        let data = localStorage.getItem( key );
        if ( !data )
            return undefined;
        var res = JSON.parse( data ) as T;
        return res;
    }

    public deleteData( key: string ): void {
        localStorage.removeItem( key );
    }

    public clearAll(): void {
        localStorage.clear();
    }
}