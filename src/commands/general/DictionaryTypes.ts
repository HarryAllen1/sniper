interface Meta {
  id: string;
  uuid: string;
  sort: string;
  src: string;
  section: string;
  stems: string[];
  offensive: boolean;
}

interface Sound {
  audio: string;
  ref: string;
  stat: string;
}

interface Pr {
  mw: string;
  sound: Sound;
}

interface Hwi {
  hw: string;
  prs: Pr[];
}

interface Def {
  sseq: any[][][];
}

interface Uro {
  ure: string;
  fl: string;
}

export interface MWResponse {
  meta: Meta;
  hwi: Hwi;
  fl: string;
  def: Def[];
  uros: Uro[];
  et: string[][];
  date: string;
  shortdef: string[];
}

export interface Metadata {
  operation: string;
  provider: string;
  schema: string;
}

export interface Derivative {
  id: string;
  text: string;
}

export interface Pronunciation {
  dialects: string[];
  phoneticNotation: string;
  phoneticSpelling: string;
  audioFile: string;
}

export interface Construction {
  text: string;
}

export interface Note {
  text: string;
  type: string;
}

export interface Register {
  id: string;
  text: string;
}

export interface Example {
  text: string;
  notes: Note[];
  registers: Register[];
}

export interface SemanticClass {
  id: string;
  text: string;
}

export interface Example2 {
  text: string;
}

export interface SemanticClass2 {
  id: string;
  text: string;
}

export interface Synonym {
  language: string;
  text: string;
}

export interface ThesaurusLink {
  entry_id: string;
  sense_id: string;
}

export interface DomainClass {
  id: string;
  text: string;
}

export interface Domain {
  id: string;
  text: string;
}

export interface Note2 {
  text: string;
  type: string;
}

export interface Subsens {
  definitions: string[];
  examples: Example2[];
  id: string;
  semanticClasses: SemanticClass2[];
  shortDefinitions: string[];
  synonyms: Synonym[];
  thesaurusLinks: ThesaurusLink[];
  domainClasses: DomainClass[];
  domains: Domain[];
  notes: Note2[];
}

export interface Synonym2 {
  language: string;
  text: string;
}

export interface ThesaurusLink2 {
  entry_id: string;
  sense_id: string;
}

export interface DomainClass2 {
  id: string;
  text: string;
}

export interface Domain2 {
  id: string;
  text: string;
}

export interface Sens {
  constructions: Construction[];
  definitions: string[];
  examples: Example[];
  id: string;
  semanticClasses: SemanticClass[];
  shortDefinitions: string[];
  subsenses: Subsens[];
  synonyms: Synonym2[];
  thesaurusLinks: ThesaurusLink2[];
  domainClasses: DomainClass2[];
  domains: Domain2[];
}

export interface GrammaticalFeature {
  id: string;
  text: string;
  type: string;
}

export interface Entry {
  etymologies: string[];
  homographNumber: string;
  pronunciations: Pronunciation[];
  senses: Sens[];
  grammaticalFeatures: GrammaticalFeature[];
}

export interface LexicalCategory {
  id: string;
  text: string;
}

export interface Phras {
  id: string;
  text: string;
}

export interface LexicalEntry {
  derivatives: Derivative[];
  entries: Entry[];
  language: string;
  lexicalCategory: LexicalCategory;
  phrases: Phras[];
  text: string;
}

export interface Result {
  id: string;
  language: string;
  lexicalEntries: LexicalEntry[];
  type: string;
  word: string;
}

export interface OxfordRes {
  id: string;
  metadata: Metadata;
  results: Result[];
  word: string;
}
