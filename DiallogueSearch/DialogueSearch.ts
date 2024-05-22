/**
 * need a movie class to getDialogue
 * define dialogue interface
 *
 */

export class Dialogue {
    character: string;
    line: string;
}

export class Movie {
    private dialogue: Dialogue[];
    getDialogue() {
        return this.dialogue;
    }
    setDialogue(dialogue: Dialogue[]) {
        this.dialogue = dialogue;
    }
}

export class DialogueSearch {
    search(movie: Movie, character: string) {
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
