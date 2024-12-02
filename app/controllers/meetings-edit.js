import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    saveMeeting(meeting) {
      let meetingModel = this.get('model');
      meetingModel.set('date', meeting.date);
      meetingModel.set('speaker', meeting.speaker);
      meetingModel.set('book', meeting.book);
      meetingModel.set('feedback', meeting.feedback);
      meetingModel.set('videoURL', meeting.videoURL);
      meetingModel.set('presentationURL', meeting.presentationURL);
      meetingModel.save();
    }
  }
});
