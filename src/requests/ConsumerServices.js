import * as request from './requests'

const url = 'http://localhost:8080/api/v1/consumer';

export default class ConsumerServices {
  static createConsumer(firstName, lastName, sessionId) {
    return request.post(url, {
      firstName,
      lastName,
      sessionId,
    });
  }

  static updateConsumer(id, firstName, lastName) {
    return request.update(url, {
      id,
      firstName,
      lastName,
    });
  }

  static getConsumers(sessionId, page) {
    return request.get(url, {
      sessionId,
      page
    });
  }

  static deleteConsumer(id) {
    return request.remove(url, {
      id,
    });
  }
}
