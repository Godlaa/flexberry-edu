import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    queryParams: ['search'],
    errorLogger: service(),
    search: '',
    actions: {
      async deleteSpeaker(speaker) {
        try {
          await speaker.destroyRecord();
          this.get('store').unloadRecord(speaker);
        }
        catch (error) {
          this.errorLogger.logError(error);
        }
      }
    }
});
