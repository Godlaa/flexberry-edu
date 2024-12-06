import Route from '@ember/routing/route';

export default Route.extend({
  model({report_id}) {
    return this.store.findRecord('report', report_id);
  }
});
