"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSearch = exports.SearchParams = exports.FolderEntry = exports.FileEntry = void 0;
class Entry {
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}
class FileEntry extends Entry {
    getExtension() {
        return this.name.substring(this.name.indexOf(".") + 1);
    }
    setContent(content) {
        this.content = content;
    }
    getContent() {
        return this.content;
    }
    getSize() {
        return this.content.size;
    }
    isDirectory() {
        return false;
    }
}
exports.FileEntry = FileEntry;
class FolderEntry extends Entry {
    constructor() {
        super(...arguments);
        this.entries = [];
    }
    getSize() {
        let size = 0;
        for (let entry of this.entries) {
            size += entry.getSize();
        }
        return size;
    }
    isDirectory() {
        return true;
    }
    addEntry(entry) {
        this.entries.push(entry);
    }
}
exports.FolderEntry = FolderEntry;
class SearchParams {
}
exports.SearchParams = SearchParams;
class ExtensionFilter {
    isValid(params, file) {
        if (!params.extension) {
            return true;
        }
        return file.getExtension() === params.extension;
    }
}
class MinSizeFilter {
    isValid(params, file) {
        if (!params.minSize) {
            return true;
        }
        return file.getSize() >= params.minSize;
    }
}
class MaxSizeFilter {
    isValid(params, file) {
        if (!params.minSize) {
            return true;
        }
        return file.getSize() <= params.maxSize;
    }
}
class NameFilter {
    isValid(params, file) {
        if (!params.name) {
            return true;
        }
        return file.getName() === params.name;
    }
}
class FileFilter {
    constructor() {
        this.filters = [];
        this.filters.push(new NameFilter());
        this.filters.push(new MaxSizeFilter());
        this.filters.push(new MinSizeFilter());
        this.filters.push(new ExtensionFilter());
    }
    isValid(params, file) {
        for (let filter of this.filters) {
            if (!filter.isValid(params, file)) {
                return false;
            }
        }
        return true;
    }
}
class FileSearch {
    constructor() {
        this.filter = new FileFilter();
    }
    search(dir, params) {
        const files = [];
        const queue = [];
        queue.push(dir);
        while (queue.length) {
            const folder = queue.shift();
            for (let entry of folder.entries) {
                if (entry.isDirectory()) {
                    queue.push(entry);
                }
                else {
                    if (this.filter.isValid(params, entry)) {
                        files.push(entry);
                    }
                }
            }
        }
        return files;
    }
}
exports.FileSearch = FileSearch;
//# sourceMappingURL=FileSearch.js.map