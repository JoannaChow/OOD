interface IEntry {
    getName(): string;
    setName(name: string): void;
    getSize(): number;
    isDirectory(): boolean;
}

abstract class Entry implements IEntry {
    name: string;

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    abstract getSize(): number;
    abstract isDirectory(): boolean;
}

export class FileEntry extends Entry {
    content: Blob;

    getExtension(): string {
        return this.name.substring(this.name.indexOf(".") + 1);
    }

    setContent(content: Blob) {
        this.content = content;
    }

    getContent() {
        return this.content;
    }

    getSize(): number {
        return this.content.size;
    }

    isDirectory(): boolean {
        return false;
    }
}

export class FolderEntry extends Entry {
    entries: Entry[] = [];

    getSize(): number {
        let size = 0;
        for (let entry of this.entries) {
            size += entry.getSize();
        }
        return size;
    }

    isDirectory(): boolean {
        return true;
    }

    addEntry(entry: Entry) {
        this.entries.push(entry);
    }
}

export class SearchParams {
    extension: string;
    minSize: number;
    maxSize: number;
    name: string;
}

interface IFilter {
    isValid(params: SearchParams, file: FileEntry): boolean;
}

class ExtensionFilter implements IFilter {
    isValid(params: SearchParams, file: FileEntry): boolean {
        if (!params.extension) {
            return true;
        }

        return file.getExtension() === params.extension;
    }
}

class MinSizeFilter implements IFilter {
    isValid(params: SearchParams, file: FileEntry): boolean {
        if (!params.minSize) {
            return true;
        }

        return file.getSize() >= params.minSize;
    }
}

class MaxSizeFilter implements IFilter {
    isValid(params: SearchParams, file: FileEntry): boolean {
        if (!params.minSize) {
            return true;
        }
        return file.getSize() <= params.maxSize;
    }
}

class NameFilter implements IFilter {
    isValid(params: SearchParams, file: FileEntry): boolean {
        if (!params.name) {
            return true;
        }

        return file.getName() === params.name;
    }
}

class FileFilter {
    filters: IFilter[];
    constructor() {
        this.filters = [];
        this.filters.push(new NameFilter());
        this.filters.push(new MaxSizeFilter());
        this.filters.push(new MinSizeFilter());
        this.filters.push(new ExtensionFilter());
    }

    isValid(params: SearchParams, file: FileEntry): boolean {
        for (let filter of this.filters) {
            if (!filter.isValid(params, file)) {
                return false;
            }
        }
        return true;
    }
}

export class FileSearch {
    filter = new FileFilter();

    search(dir: FolderEntry, params: SearchParams): FileEntry[] {
        const files: FileEntry[] = [];
        const queue: FolderEntry[] = [];
        queue.push(dir);
        while (queue.length) {
            const folder = queue.shift() as FolderEntry;
            for (let entry of folder.entries) {
                if (entry.isDirectory()) {
                    queue.push(entry as FolderEntry);
                } else {
                    if (this.filter.isValid(params, entry as FileEntry)) {
                        files.push(entry as FileEntry);
                    }
                }
            }
        }
        return files;
    }
}
