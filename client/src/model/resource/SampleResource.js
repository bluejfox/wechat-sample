import UmeHttp from '../UmeHttp';

export default class SampleResource {
  /**
   * getSampleData
   * @param  {String}  id 数据的标识
   * @return {Promise}
   */
  static getSampleData(id) {
    return UmeHttp.invoke('WS001', [id]);
  }
}
