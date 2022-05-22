interface GetFromBetween {
  results: string[] | any;
  string: string;
  getFromBetween: (sub1: string, sub2: string) => string | false | undefined;
  removeFromBetween: (sub1: string, sub2: string) => false | undefined;
  getAllResults: (sub1: string, sub2: string) => void;
  get: (string: string, sub1: string, sub2: string) => any;
}
export const getFromBetween: GetFromBetween = {
  results: [],
  string: '',
  getFromBetween: function (sub1: string, sub2: string) {
    try {
      if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
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
  removeFromBetween: function (sub1: string, sub2: string) {
    try {
      if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
        return false;
      const removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
      this.string = this.string.replace(removal, '');
    } catch (error) {
      console.error(error);
    }
  },
  getAllResults: function (sub1: string, sub2: string) {
    try {
      // first check to see if we do have both substrings
      if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
        return;

      // find one result
      const result = this.getFromBetween(sub1, sub2);
      // push it to the results array
      this.results.push(result as any);
      // remove the most recently found one from the string
      this.removeFromBetween(sub1, sub2);

      // if there's more substrings
      if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
        this.getAllResults(sub1, sub2);
      } else return;
    } catch (error) {
      console.error(error);
    }
  },
  get: function (string: string, sub1: string, sub2: string) {
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
