"use strict";
/**
 * need a movie class to getDialogue
 * define dialogue interface
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogueSearch = exports.Movie = exports.Dialogue = void 0;
var Dialogue = /** @class */ (function () {
    function Dialogue() {
    }
    return Dialogue;
}());
exports.Dialogue = Dialogue;
var Movie = /** @class */ (function () {
    function Movie() {
    }
    Movie.prototype.getDialogue = function () {
        return this.dialogue;
    };
    Movie.prototype.setDialogue = function (dialogue) {
        this.dialogue = dialogue;
    };
    return Movie;
}());
exports.Movie = Movie;
var DialogueSearch = /** @class */ (function () {
    function DialogueSearch() {
    }
    DialogueSearch.prototype.search = function (movie, character) {
        var count = 0;
        var reg = new RegExp(character.toLocaleLowerCase(), "g");
        movie.getDialogue().forEach(function (_a) {
            var character = _a.character, line = _a.line;
            var arr = reg.exec(line.toLocaleLowerCase());
            while (arr) {
                count++;
                arr = reg.exec(line);
            }
        });
        return count;
    };
    return DialogueSearch;
}());
exports.DialogueSearch = DialogueSearch;
//# sourceMappingURL=DialogueSearch.js.map