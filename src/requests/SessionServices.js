import * as request from './requests'

const url = 'http://localhost:8080/api/v1/session';

export default class SessionServices {
  static fetchSessions(page = 0) {
    return request.get(url, {
      page
    });
  }

  static fetchSession(id) {
    return request.get(url, {
      id
    });
  }

  static createSession(title, description) {
    return request.post(url, {
      description,
      title,
    });
  }

  static updateSession(id, title, description) {
    return request.update(url, {
      id,
      title,
      description
    });
  }

  static deleteSession(id) {
    return request.remove(url, {
      id
    })
  }
}
