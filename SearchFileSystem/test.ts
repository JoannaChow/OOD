import { FileEntry, FileSearch, FolderEntry, SearchParams } from "./FileSearch";

const params: SearchParams = new SearchParams();
params.extension = "xml";
params.minSize = 2;
params.maxSize = 100;

const xmlFile: FileEntry = new FileEntry();
xmlFile.setContent(new Blob(["<test>abcabc<test/>"]));
xmlFile.setName("aaa.xml");

const textFile: FileEntry = new FileEntry();
textFile.setContent(new Blob(["this is text"]));
textFile.setName("bbb.txt");

const jsonFile: FileEntry = new FileEntry();
jsonFile.setContent(new Blob(["{a:'line one'}"]));
jsonFile.setName("ccc.json");

const dir1: FolderEntry = new FolderEntry();
dir1.addEntry(textFile);
dir1.addEntry(xmlFile);

const dir0:FolderEntry = new FolderEntry();
dir0.addEntry(jsonFile);
dir0.addEntry(dir1);

const searcher: FileSearch = new FileSearch();
console.log(searcher.search(dir0, params));