/**
 * Reporting class; for returning match results to the user.
 */
class Report {
  /**
   * Report constructor.
   *
   */
  constructor() {
    // array of matches we were involved in.
    this.matches = [];
  }
  /**
   * Handle a win/loss.
   *
   * @param  {string} victor  The nickname of the victor.
   * @param  {BattleStore} store   The final battle state.
   * @param  {string} matchid An ID to identify this match.
   *
   *
   * @return {ReportObj} A report object.
   * @property {string} matchid  The ID of the match
   * @property {boolean} won  true if we won the match; false otherwise.
   * @property {number} damageDone  The total damage we did, out of 600 (percent).
   * @property {number} damageTaken  The total damage we took, out of 600 (percent).
   * @property {string} me  your nickname
   * @property {string} you  your opponent's nickname
   * @property {Array} mine  an array of your Pokemon
   * @property {array} yours  an array of your opponent's Pokemon
   * @property {array} events  an array of events(?)
   * @property {array} statuses  an array of statuses(?)
   *
   * @see Pokemon
   * @see class/src/model/pokemon.js
   *
   */
  win(victor, store, matchid = null) {
    const iwon = (victor === store.myNick);
    const state = store.data();

    // iterating over pokemon we've seen and damaged only. unseen pokemon
    // are undamaged.
    const damageDone = state.opponent.reserve.reduce( (prev, curr) => {
      return prev + 100 - (curr.hppct || 0);
    }, 0);
    const damageTaken = 600 - state.self.reserve.reduce( (prev, curr) => {
      return prev + (curr.hppct || 0);
    }, 0);


    const result = {
      matchid: matchid,
      won: iwon,
      damageDone,
      damageTaken,
      me: store.myNick,
      you: store.yourNick,
      mine: state.self.reserve,
      yours: state.opponent.reserve,
      events: store.events,
      statuses: store.statuses
    };
    this.matches.push(result);

    return this.matches;
  }

  /**
   * Get my data.
   * @TODO not sure if this is working!
   *
   * @return {array} Array of match results
   */
  data() {
    return this.matches;
  }
}

const report = new Report();
export default report;
