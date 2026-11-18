export class Book {
	public title: string;
	public author: string;
	public genre: string;
	readonly id: string;

	constructor(title: string, author: string, genre: string, id: string) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.id = id;
	}
}
