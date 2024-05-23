"use strict";
/**
 * need a movie class to getDialogue
 * define dialogue interface
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogueSearch = exports.Movie = exports.Dialogue = void 0;
class Dialogue {
}
exports.Dialogue = Dialogue;
class Movie {
    getDialogue() {
        return this.dialogue;
    }
    setDialogue(dialogue) {
        this.dialogue = dialogue;
    }
}
exports.Movie = Movie;
class DialogueSearch {
    search(movie, character) {
        let count = 0;
        let reg = new RegExp(character.toLocaleLowerCase(), "g");
        movie.getDialogue().forEach(({ character, line }) => {
            let arr = reg.exec(line.toLocaleLowerCase());
            while (arr) {
                count++;
                arr = reg.exec(line);
            }
        });
        return count;
    }
}
exports.DialogueSearch = DialogueSearch;
//# sourceMappingURL=DialogueSearch.js.map