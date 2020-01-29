import * as request from './requests'

const url = 'http://localhost:8080/api/v1/event';

export default class EventServices {
  static deleteEvent(id) {
    return request.remove(url, {
      id,
    });
  }

  static createEvent(title, sessionId, investorId) {
    return request.post(url, {
      title,
      sessionId,
      investorId,
    });
  }

  static retrieveEvent(id, page, sessionId) {
    return request.get(url, {
      id,
      page,
      sessionId,
    });
  }
}
