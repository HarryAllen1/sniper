interface GetFromBetween {
  results: string[];
  string: string;
  getFromBetween: (sub1: string, sub2: string) => string | false | undefined;
  removeFromBetween: (sub1: string, sub2: string) => false | undefined;
  getAllResults: (sub1: string, sub2: string) => void;
  get: (string: string, sub1: string, sub2: string) => void;
}
export const getFromBetween: GetFromBetween = {
  results: [],
  string: '',
  getFromBetween(sub1: string, sub2: string) {
    try {
      if (!this.string.includes(sub1) || !this.string.includes(sub2))
        return false;
      const SP = this.string.indexOf(sub1) + sub1.length;
      const string1 = this.string.substr(0, SP);
      const string2 = this.string.substr(SP);
      const TP = string1.length + string2.indexOf(sub2);
      return this.string.substring(SP, TP);
    } catch (error) {
      console.error(error);
    }
  },
  removeFromBetween(sub1: string, sub2: string) {
    try {
      if (!this.string.includes(sub1) || !this.string.includes(sub2))
        return false;
      const removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
      this.string = this.string.replace(removal, '');
    } catch (error) {
      console.error(error);
    }
  },
  getAllResults(sub1: string, sub2: string) {
    try {
      // first check to see if we do have both substrings
      if (!this.string.includes(sub1) || !this.string.includes(sub2)) return;

      // find one result
      const result = this.getFromBetween(sub1, sub2);
      // push it to the results array
      this.results.push(String(result));
      // remove the most recently found one from the string
      this.removeFromBetween(sub1, sub2);

      // if there's more substrings
      if (this.string.includes(sub1) && this.string.includes(sub2)) {
        this.getAllResults(sub1, sub2);
      } else return;
    } catch (error) {
      console.error(error);
    }
  },
  get(string: string, sub1: string, sub2: string) {
    try {
      this.results = [];
      this.string = string;
      this.getAllResults(sub1, sub2);
      return this.results;
    } catch (error) {
      console.error(error);
    }
  },
};
