import Route from '@ember/routing/route';

export default Route.extend({
  model({report_id}) {
    let report = this.store.findRecord('report', report_id);
    return report;
  }
});
