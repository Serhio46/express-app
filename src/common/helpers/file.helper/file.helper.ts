import {
	readFileSync,
	readFile,
	writeFile,
	writeFileSync,
	type PathLike,
	type ReadStream,
	type ReadStreamOptions,
	type WriteFileOptions,
} from 'node:fs';
import { readFile as readFilePromise, writeFile as writeFilePromise, type FileHandle } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:dns';

type PathPromise = PathLike | FileHandle;

class FileHelper {
	async readFileAsync<T>(path: PathLike, encoding: BufferEncoding = 'utf-8'): Promise<T> {
		return new Promise((resolve, reject) => {
			readFile(path, encoding, (error, data) => {
				if (error) {
					console.error('Error reading file:', error);
					reject(error);
				}

				resolve(JSON.parse(data));
			});
		});
	}

	async readFilePromise<T>(path: PathPromise, encoding: BufferEncoding = 'utf-8'): Promise<T> {
		try {
			const file = await readFilePromise(path, encoding);
			return JSON.parse(file);
		} catch (error) {
			console.error('Error reading file:', error);
			throw error;
		}
	}

	async readFileStream(path: PathLike, options?: ReadStreamOptions): Promise<ReadStream> {
		return createReadStream(path, options);
	}

	readFileSync(path: PathLike, encoding: BufferEncoding = 'utf-8'): string {
		const file = readFileSync(path, encoding);
		return JSON.parse(file);
	}

	async writeFile<T>(path: PathLike, data: T, encoding: BufferEncoding = 'utf-8'): Promise<T> {
		return new Promise((resolve, reject) => {
			writeFile(path, JSON.stringify(data), encoding, error => {
				if (error) {
					console.error('Error writing file:', error);
					reject(error);
				}

				resolve(data);
			});
		});
	}
}

export default new FileHelper();
