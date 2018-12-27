export class Note {
    id?: string;
    title: string;
    text = '';

    constructor(title ?: string) {
        this.title = title || '';
    }
}