import ApplicationError from '@/model/ApplicationError';
import Util from '@/model/Util';

export default class ErrorHandler {
  static handleError(error, source) {
    let ret = null;
    const isErrorFromVue = source instanceof Object;
    // 自定义异常对象的场合
    if (!Util.isEmpty(error.id)) {
      ret = error;
    // Promise中没有捕获的错误
    // 当在不支持PromiseRejectionEvent的浏览器中，通过PromiseRejectionEvent判断会报错
    } else if (!Util.isEmpty(error.reason)) {
      ret = error.reason;
    // 执行期异常的场合
    } else if (error instanceof Error) {
      if (Util.isProdunctionEnv()) {
        ret = new ApplicationError('MAM004E');
      } else {
        ret = error;
      }
    // 来源：组件渲染
    } else if (isErrorFromVue) {
      if (Util.isProdunctionEnv()) {
        ret = new ApplicationError('MAM004E');
      } else {
        ret = error;
      }
    // // 来源：未知
    // } else if (error instanceof Object
    //   && Object.prototype.hasOwnProperty.call(error, 'message')) {
    //   ret = new ApplicationError(null, null, error.message);
    // 在事件函数中抛出ApplicationError的场合
    // 没有捕获的错误。（来源：事件函数中的运行期错误）
    } else if (Util.isString(error)) {
      if (error.indexOf('Uncaught Error: ') === 0) {
        ret = error.replace('Uncaught Error: ', '');
      }
      ret = new ApplicationError(null, null, ret);
    }
    if (ret === null || ret === undefined
      || (!Util.isEmpty(ret) && Util.isEmpty(ret.message))) {
      ret = new ApplicationError('MAM004E');
    }

    // 实现了Vue.config.errorHandler接口的场合，Vue不会在控制台显示错误。
    if (isErrorFromVue) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(error);
    }
    return ret;
  }
}
