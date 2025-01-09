import Service from '@ember/service';

export default Service.extend({
  async logError(error) {
    const errorData = {
      date: new Date().toISOString(),
      url: window.location.href,
      error: error.message || error.toString()
    };

    const response = await fetch('http://localhost:3000/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(errorData)
    });

    // eslint-disable-next-line no-console
    console.log('Error logged:', await response.json());
  }
});
