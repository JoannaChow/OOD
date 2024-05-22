import { Dialogue, Movie, DialogueSearch } from "./DialogueSearch";

const dialogue1 = new Dialogue();
dialogue1.character = "Tom";
dialogue1.line = "Hey, Bob, Alice is coming to join us";

const dialogue2 = new Dialogue();
dialogue2.character = "Bob";
dialogue2.line = "Hey, Tom, where's aliceee coming from";

const dialogue3 = new Dialogue();
dialogue3.character = "Tom";
dialogue3.line = "alice came from Chris's place";

const movie1 = new Movie();
movie1.setDialogue([dialogue1, dialogue2, dialogue3]);

const dialogueSearch = new DialogueSearch();
console.log("Alice appears: ", dialogueSearch.search(movie1, "Alice"), " times");
console.log("Tom appears: ", dialogueSearch.search(movie1, "Tom"), " times");
