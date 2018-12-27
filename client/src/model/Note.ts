export class Note {
    id?: string;
    userId?: string;
    title: string;
    text = '';

    constructor(title ?: string) {
        this.title = title || '';
    }
}