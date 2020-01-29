import * as request from './requests'

const url = 'http://localhost:8080/api/v1/consumption';

export default class ConsumerServices {
  static getConsumptions(eventId, page) {
    return request.get(url, {
      eventId,
      page
    });
  }

  static createConsumption(consumerId, cost, description, eventId) {
    return request.post(url, {
      consumerId,
      cost,
      description,
      eventId,
    });
  }

  static deleteConsumption(id) {
    return request.remove(url, {id});
  }

  static updateConsumption(id, cost, description, consumerId) {
    return request.update(url, {
      id,
      consumerId,
      cost,
      description,
    })
  }
}
