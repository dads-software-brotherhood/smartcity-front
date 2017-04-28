interface Serializable<T> {
    deserialize(input: Object): T;
}

export class Paginable implements Serializable<Paginable> {
    content: any[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: any;
    first: false;
    numberOfElements: number;

    deserialize(input) {
        this.content = input.content;
        this.last = input.last;
        this.totalPages = input.totalPages;
        this.totalElements = input.totalElements;
        this.size = input.size;
        this.number = input.number;
        this.sort = input.sort;
        this.first = input.first;
        this.numberOfElements = input.numberOfElements;
        return this;
    }
}

