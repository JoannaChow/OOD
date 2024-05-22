"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DialogueSearch_1 = require("./DialogueSearch");
var dialogue1 = new DialogueSearch_1.Dialogue();
dialogue1.character = "Tom";
dialogue1.line = "Hey, Bob, Alice is coming to join us";
var dialogue2 = new DialogueSearch_1.Dialogue();
dialogue2.character = "Bob";
dialogue2.line = "Hey, Tom, where's aliceee coming from";
var dialogue3 = new DialogueSearch_1.Dialogue();
dialogue3.character = "Tom";
dialogue3.line = "alice came from Chris's place";
var movie1 = new DialogueSearch_1.Movie();
movie1.setDialogue([dialogue1, dialogue2, dialogue3]);
var dialogueSearch = new DialogueSearch_1.DialogueSearch();
console.log("Alice appears: ", dialogueSearch.search(movie1, "Alice"), " times");
console.log("Tom appears: ", dialogueSearch.search(movie1, "Tom"), " times");
//# sourceMappingURL=test.js.map