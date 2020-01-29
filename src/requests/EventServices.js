import * as request from './requests'

const url = 'http://localhost:8080/api/v1/event';

export default class EventServices {
  static deleteEvent(id) {
    return request.remove(url, {
      id,
    });
  }
}
