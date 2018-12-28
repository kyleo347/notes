export class Note {
    _id?: string;
    userId?: string;
    title: string;
    text = '';

    constructor(title ?: string) {
        this.title = title || '';
        this._id = 'new';
    }
}