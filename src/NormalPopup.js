import Popup from './super/Popup'

/**
 * 通用弹窗
 */
export default class NormalPopup extends Popup {
  constructor (options = {}) {
    super(options)
  }

  open (onOpen = function () {}) {
    super.open()

    let self = this,
      {conf} = self,
      popup = $(conf.popup),
      mask = $(conf.mask)

    if (!popup.hasClass(conf.popupStatus)) {
      mask.stop(true).clearQueue().fadeIn(conf.duration)

      popup.stop(true)
        .clearQueue()
        .addClass(conf.popupStatus)
        .fadeIn(conf.duration, () => {
          /*
           * 回调总是在打开/关闭动画结束之后被调用的，但是某些阻塞页面渲染的
           * 操作（比如 window.alert）可能会阻止弹窗显现，导致看上去回调
           * 像是在打开/关闭动画之前执行的。如果想避免这种情况，可在回调中使
           * 用 setTimeout 延迟执行这些阻塞操作。
           */
          conf.onOpen.call(self)
          onOpen.call(self)
        })
    }

    return self
  }

  close (onClose = function () {}) {
    super.close()

    let self = this,
      {conf} = self,
      popup = $(conf.popup),
      mask = $(conf.mask)

    if (popup.hasClass(conf.popupStatus)) {
      mask.stop(true).clearQueue().fadeOut(conf.duration)

      popup.removeClass(conf.popupStatus)
        .stop(true)
        .clearQueue()
        .fadeOut(conf.duration, () => {
          conf.onClose.call(self)
          onClose.call(self)
        })
    }

    return self
  }
}
