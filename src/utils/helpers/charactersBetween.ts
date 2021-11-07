interface GetFromBetween {
  results: string[] | any;
  string: string;
  getFromBetween: (sub1: string, sub2: string) => string | false;
  removeFromBetween: (sub1: string, sub2: string) => false | undefined;
  getAllResults: (sub1: string, sub2: string) => void;
  get: (string: string, sub1: string, sub2: string) => any;
}
export const getFromBetween: GetFromBetween = {
  results: [],
  string: '',
  getFromBetween: function (sub1: string, sub2: string) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
      return false;
    var SP = this.string.indexOf(sub1) + sub1.length;
    var string1 = this.string.substr(0, SP);
    var string2 = this.string.substr(SP);
    var TP = string1.length + string2.indexOf(sub2);
    return this.string.substring(SP, TP);
  },
  removeFromBetween: function (sub1: string, sub2: string) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
      return false;
    var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
    this.string = this.string.replace(removal, '');
  },
  getAllResults: function (sub1: string, sub2: string) {
    // first check to see if we do have both substrings
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

    // find one result
    var result = this.getFromBetween(sub1, sub2);
    // push it to the results array
    this.results.push(result as any);
    // remove the most recently found one from the string
    this.removeFromBetween(sub1, sub2);

    // if there's more substrings
    if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
      this.getAllResults(sub1, sub2);
    } else return;
  },
  get: function (string: string, sub1: string, sub2: string) {
    this.results = [];
    this.string = string;
    this.getAllResults(sub1, sub2);
    return this.results;
  },
};
