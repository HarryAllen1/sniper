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
