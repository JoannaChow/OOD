"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSearch = exports.SearchParams = exports.FolderEntry = exports.FileEntry = void 0;
var Entry = /** @class */ (function () {
    function Entry() {
    }
    Entry.prototype.getName = function () {
        return this.name;
    };
    Entry.prototype.setName = function (name) {
        this.name = name;
    };
    return Entry;
}());
var FileEntry = /** @class */ (function (_super) {
    __extends(FileEntry, _super);
    function FileEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileEntry.prototype.getExtension = function () {
        return this.name.substring(this.name.indexOf(".") + 1);
    };
    FileEntry.prototype.setContent = function (content) {
        this.content = content;
    };
    FileEntry.prototype.getContent = function () {
        return this.content;
    };
    FileEntry.prototype.getSize = function () {
        return this.content.size;
    };
    FileEntry.prototype.isDirectory = function () {
        return false;
    };
    return FileEntry;
}(Entry));
exports.FileEntry = FileEntry;
var FolderEntry = /** @class */ (function (_super) {
    __extends(FolderEntry, _super);
    function FolderEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entries = [];
        return _this;
    }
    FolderEntry.prototype.getSize = function () {
        var size = 0;
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            size += entry.getSize();
        }
        return size;
    };
    FolderEntry.prototype.isDirectory = function () {
        return true;
    };
    FolderEntry.prototype.addEntry = function (entry) {
        this.entries.push(entry);
    };
    return FolderEntry;
}(Entry));
exports.FolderEntry = FolderEntry;
var SearchParams = /** @class */ (function () {
    function SearchParams() {
    }
    return SearchParams;
}());
exports.SearchParams = SearchParams;
var ExtensionFilter = /** @class */ (function () {
    function ExtensionFilter() {
    }
    ExtensionFilter.prototype.isValid = function (params, file) {
        if (!params.extension) {
            return true;
        }
        return file.getExtension() === params.extension;
    };
    return ExtensionFilter;
}());
var MinSizeFilter = /** @class */ (function () {
    function MinSizeFilter() {
    }
    MinSizeFilter.prototype.isValid = function (params, file) {
        if (!params.minSize) {
            return true;
        }
        return file.getSize() >= params.minSize;
    };
    return MinSizeFilter;
}());
var MaxSizeFilter = /** @class */ (function () {
    function MaxSizeFilter() {
    }
    MaxSizeFilter.prototype.isValid = function (params, file) {
        if (!params.minSize) {
            return true;
        }
        return file.getSize() <= params.maxSize;
    };
    return MaxSizeFilter;
}());
var NameFilter = /** @class */ (function () {
    function NameFilter() {
    }
    NameFilter.prototype.isValid = function (params, file) {
        if (!params.name) {
            return true;
        }
        return file.getName() === params.name;
    };
    return NameFilter;
}());
var FileFilter = /** @class */ (function () {
    function FileFilter() {
        this.filters = [];
        this.filters.push(new NameFilter());
        this.filters.push(new MaxSizeFilter());
        this.filters.push(new MinSizeFilter());
        this.filters.push(new ExtensionFilter());
    }
    FileFilter.prototype.isValid = function (params, file) {
        for (var _i = 0, _a = this.filters; _i < _a.length; _i++) {
            var filter = _a[_i];
            if (!filter.isValid(params, file)) {
                return false;
            }
        }
        return true;
    };
    return FileFilter;
}());
var FileSearch = /** @class */ (function () {
    function FileSearch() {
        this.filter = new FileFilter();
    }
    FileSearch.prototype.search = function (dir, params) {
        var files = [];
        var queue = [];
        queue.push(dir);
        while (queue.length) {
            var folder = queue.shift();
            for (var _i = 0, _a = folder.entries; _i < _a.length; _i++) {
                var entry = _a[_i];
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
    };
    return FileSearch;
}());
exports.FileSearch = FileSearch;
//# sourceMappingURL=FileSearch.js.map