import { performance } from "node:perf_hooks";
import { webcrypto } from "node:crypto";
import { ByteLengthQueuingStrategy, CountQueuingStrategy, ReadableByteStreamController, ReadableStream as ReadableStream$1, ReadableStreamBYOBReader, ReadableStreamBYOBRequest, ReadableStreamDefaultController, ReadableStreamDefaultReader, TransformStream, WritableStream, WritableStreamDefaultController, WritableStreamDefaultWriter } from "node:stream/web";
import { File, FormData, Headers, Request as Request$1, Response, fetch } from "undici";
import { setTimeout as setTimeout$1, clearTimeout as clearTimeout$1 } from "node:timers";
import { A as App, j as deserializeManifest } from "./chunks/astro.ddd8ab85.mjs";
import "fast-glob";
import nodePath from "node:path";
import "node:url";
import "node:fs/promises";
import "node:fs";
import { splitCookiesString } from "set-cookie-parser";
import { renderers } from "./renderers.mjs";
import "mime";
import "cookie";
import "kleur/colors";
import "path-to-regexp";
import "string-width";
import "html-escaper";
import "preact";
import "preact-render-to-string";
const __function_bind = Function.bind.bind(Function.call);
const __object_isPrototypeOf = Function.call.bind(Object.prototype.isPrototypeOf);
const __performance_now = performance.now;
const INTERNALS = /* @__PURE__ */ new WeakMap();
const internalsOf = (target, className, propName) => {
  const internals = INTERNALS.get(target);
  if (!internals)
    throw new TypeError(`${className}.${propName} can only be used on instances of ${className}`);
  return internals;
};
const allowStringTag = (value) => value.prototype[Symbol.toStringTag] = value.name;
class DOMException extends Error {
  constructor(message = "", name = "Error") {
    super(message);
    this.code = 0;
    this.name = name;
  }
}
DOMException.INDEX_SIZE_ERR = 1;
DOMException.DOMSTRING_SIZE_ERR = 2;
DOMException.HIERARCHY_REQUEST_ERR = 3;
DOMException.WRONG_DOCUMENT_ERR = 4;
DOMException.INVALID_CHARACTER_ERR = 5;
DOMException.NO_DATA_ALLOWED_ERR = 6;
DOMException.NO_MODIFICATION_ALLOWED_ERR = 7;
DOMException.NOT_FOUND_ERR = 8;
DOMException.NOT_SUPPORTED_ERR = 9;
DOMException.INUSE_ATTRIBUTE_ERR = 10;
DOMException.INVALID_STATE_ERR = 11;
DOMException.SYNTAX_ERR = 12;
DOMException.INVALID_MODIFICATION_ERR = 13;
DOMException.NAMESPACE_ERR = 14;
DOMException.INVALID_ACCESS_ERR = 15;
DOMException.VALIDATION_ERR = 16;
DOMException.TYPE_MISMATCH_ERR = 17;
DOMException.SECURITY_ERR = 18;
DOMException.NETWORK_ERR = 19;
DOMException.ABORT_ERR = 20;
DOMException.URL_MISMATCH_ERR = 21;
DOMException.QUOTA_EXCEEDED_ERR = 22;
DOMException.TIMEOUT_ERR = 23;
DOMException.INVALID_NODE_TYPE_ERR = 24;
DOMException.DATA_CLONE_ERR = 25;
allowStringTag(DOMException);
function assertType(condition, message, ...args) {
  if (!condition) {
    throw new TypeError(format(message, args));
  }
}
function format(message, args) {
  let i2 = 0;
  return message.replace(/%[os]/gu, () => anyToString(args[i2++]));
}
function anyToString(x2) {
  if (typeof x2 !== "object" || x2 === null) {
    return String(x2);
  }
  return Object.prototype.toString.call(x2);
}
let currentErrorHandler;
function reportError(maybeError) {
  try {
    const error = maybeError instanceof Error ? maybeError : new Error(anyToString(maybeError));
    if (currentErrorHandler)
      ;
    if (typeof dispatchEvent === "function" && typeof ErrorEvent === "function") {
      dispatchEvent(new ErrorEvent("error", { error, message: error.message }));
    } else if (typeof process !== "undefined" && typeof process.emit === "function") {
      process.emit("uncaughtException", error);
      return;
    }
    console.error(error);
  } catch (_a) {
  }
}
let currentWarnHandler;
class Warning {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
  /**
   * Report this warning.
   * @param args The arguments of the warning.
   */
  warn(...args) {
    var _a;
    try {
      if (currentWarnHandler)
        ;
      const stack = ((_a = new Error().stack) !== null && _a !== void 0 ? _a : "").replace(/^(?:.+?\n){2}/gu, "\n");
      console.warn(this.message, ...args, stack);
    } catch (_b) {
    }
  }
}
const InitEventWasCalledWhileDispatching = new Warning("W01", "Unable to initialize event under dispatching.");
const FalsyWasAssignedToCancelBubble = new Warning("W02", "Assigning any falsy value to 'cancelBubble' property has no effect.");
const TruthyWasAssignedToReturnValue = new Warning("W03", "Assigning any truthy value to 'returnValue' property has no effect.");
const NonCancelableEventWasCanceled = new Warning("W04", "Unable to preventDefault on non-cancelable events.");
const CanceledInPassiveListener = new Warning("W05", "Unable to preventDefault inside passive event listener invocation.");
const EventListenerWasDuplicated = new Warning("W06", "An event listener wasn't added because it has been added already: %o, %o");
const OptionWasIgnored = new Warning("W07", "The %o option value was abandoned because the event listener wasn't added as duplicated.");
const InvalidEventListener = new Warning("W08", "The 'callback' argument must be a function or an object that has 'handleEvent' method: %o");
class Event {
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-none
   */
  static get NONE() {
    return NONE;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-capturing_phase
   */
  static get CAPTURING_PHASE() {
    return CAPTURING_PHASE;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-at_target
   */
  static get AT_TARGET() {
    return AT_TARGET;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-bubbling_phase
   */
  static get BUBBLING_PHASE() {
    return BUBBLING_PHASE;
  }
  /**
   * Initialize this event instance.
   * @param type The type of this event.
   * @param eventInitDict Options to initialize.
   * @see https://dom.spec.whatwg.org/#dom-event-event
   */
  constructor(type, eventInitDict) {
    Object.defineProperty(this, "isTrusted", {
      value: false,
      enumerable: true
    });
    const opts = eventInitDict !== null && eventInitDict !== void 0 ? eventInitDict : {};
    internalDataMap.set(this, {
      type: String(type),
      bubbles: Boolean(opts.bubbles),
      cancelable: Boolean(opts.cancelable),
      composed: Boolean(opts.composed),
      target: null,
      currentTarget: null,
      stopPropagationFlag: false,
      stopImmediatePropagationFlag: false,
      canceledFlag: false,
      inPassiveListenerFlag: false,
      dispatchFlag: false,
      timeStamp: Date.now()
    });
  }
  /**
   * The type of this event.
   * @see https://dom.spec.whatwg.org/#dom-event-type
   */
  get type() {
    return $(this).type;
  }
  /**
   * The event target of the current dispatching.
   * @see https://dom.spec.whatwg.org/#dom-event-target
   */
  get target() {
    return $(this).target;
  }
  /**
   * The event target of the current dispatching.
   * @deprecated Use the `target` property instead.
   * @see https://dom.spec.whatwg.org/#dom-event-srcelement
   */
  get srcElement() {
    return $(this).target;
  }
  /**
   * The event target of the current dispatching.
   * @see https://dom.spec.whatwg.org/#dom-event-currenttarget
   */
  get currentTarget() {
    return $(this).currentTarget;
  }
  /**
   * The event target of the current dispatching.
   * This doesn't support node tree.
   * @see https://dom.spec.whatwg.org/#dom-event-composedpath
   */
  composedPath() {
    const currentTarget = $(this).currentTarget;
    if (currentTarget) {
      return [currentTarget];
    }
    return [];
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-none
   */
  get NONE() {
    return NONE;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-capturing_phase
   */
  get CAPTURING_PHASE() {
    return CAPTURING_PHASE;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-at_target
   */
  get AT_TARGET() {
    return AT_TARGET;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-bubbling_phase
   */
  get BUBBLING_PHASE() {
    return BUBBLING_PHASE;
  }
  /**
   * The current event phase.
   * @see https://dom.spec.whatwg.org/#dom-event-eventphase
   */
  get eventPhase() {
    return $(this).dispatchFlag ? 2 : 0;
  }
  /**
   * Stop event bubbling.
   * Because this shim doesn't support node tree, this merely changes the `cancelBubble` property value.
   * @see https://dom.spec.whatwg.org/#dom-event-stoppropagation
   */
  stopPropagation() {
    $(this).stopPropagationFlag = true;
  }
  /**
   * `true` if event bubbling was stopped.
   * @deprecated
   * @see https://dom.spec.whatwg.org/#dom-event-cancelbubble
   */
  get cancelBubble() {
    return $(this).stopPropagationFlag;
  }
  /**
   * Stop event bubbling if `true` is set.
   * @deprecated Use the `stopPropagation()` method instead.
   * @see https://dom.spec.whatwg.org/#dom-event-cancelbubble
   */
  set cancelBubble(value) {
    if (value) {
      $(this).stopPropagationFlag = true;
    } else {
      FalsyWasAssignedToCancelBubble.warn();
    }
  }
  /**
   * Stop event bubbling and subsequent event listener callings.
   * @see https://dom.spec.whatwg.org/#dom-event-stopimmediatepropagation
   */
  stopImmediatePropagation() {
    const data = $(this);
    data.stopPropagationFlag = data.stopImmediatePropagationFlag = true;
  }
  /**
   * `true` if this event will bubble.
   * @see https://dom.spec.whatwg.org/#dom-event-bubbles
   */
  get bubbles() {
    return $(this).bubbles;
  }
  /**
   * `true` if this event can be canceled by the `preventDefault()` method.
   * @see https://dom.spec.whatwg.org/#dom-event-cancelable
   */
  get cancelable() {
    return $(this).cancelable;
  }
  /**
   * `true` if the default behavior will act.
   * @deprecated Use the `defaultPrevented` proeprty instead.
   * @see https://dom.spec.whatwg.org/#dom-event-returnvalue
   */
  get returnValue() {
    return !$(this).canceledFlag;
  }
  /**
   * Cancel the default behavior if `false` is set.
   * @deprecated Use the `preventDefault()` method instead.
   * @see https://dom.spec.whatwg.org/#dom-event-returnvalue
   */
  set returnValue(value) {
    if (!value) {
      setCancelFlag($(this));
    } else {
      TruthyWasAssignedToReturnValue.warn();
    }
  }
  /**
   * Cancel the default behavior.
   * @see https://dom.spec.whatwg.org/#dom-event-preventdefault
   */
  preventDefault() {
    setCancelFlag($(this));
  }
  /**
   * `true` if the default behavior was canceled.
   * @see https://dom.spec.whatwg.org/#dom-event-defaultprevented
   */
  get defaultPrevented() {
    return $(this).canceledFlag;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-composed
   */
  get composed() {
    return $(this).composed;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-istrusted
   */
  //istanbul ignore next
  get isTrusted() {
    return false;
  }
  /**
   * @see https://dom.spec.whatwg.org/#dom-event-timestamp
   */
  get timeStamp() {
    return $(this).timeStamp;
  }
  /**
   * @deprecated Don't use this method. The constructor did initialization.
   */
  initEvent(type, bubbles = false, cancelable = false) {
    const data = $(this);
    if (data.dispatchFlag) {
      InitEventWasCalledWhileDispatching.warn();
      return;
    }
    internalDataMap.set(this, {
      ...data,
      type: String(type),
      bubbles: Boolean(bubbles),
      cancelable: Boolean(cancelable),
      target: null,
      currentTarget: null,
      stopPropagationFlag: false,
      stopImmediatePropagationFlag: false,
      canceledFlag: false
    });
  }
}
const NONE = 0;
const CAPTURING_PHASE = 1;
const AT_TARGET = 2;
const BUBBLING_PHASE = 3;
const internalDataMap = /* @__PURE__ */ new WeakMap();
function $(event, name = "this") {
  const retv = internalDataMap.get(event);
  assertType(retv != null, "'%s' must be an object that Event constructor created, but got another one: %o", name, event);
  return retv;
}
function setCancelFlag(data) {
  if (data.inPassiveListenerFlag) {
    CanceledInPassiveListener.warn();
    return;
  }
  if (!data.cancelable) {
    NonCancelableEventWasCanceled.warn();
    return;
  }
  data.canceledFlag = true;
}
Object.defineProperty(Event, "NONE", { enumerable: true });
Object.defineProperty(Event, "CAPTURING_PHASE", { enumerable: true });
Object.defineProperty(Event, "AT_TARGET", { enumerable: true });
Object.defineProperty(Event, "BUBBLING_PHASE", { enumerable: true });
const keys$1 = Object.getOwnPropertyNames(Event.prototype);
for (let i2 = 0; i2 < keys$1.length; ++i2) {
  if (keys$1[i2] === "constructor") {
    continue;
  }
  Object.defineProperty(Event.prototype, keys$1[i2], { enumerable: true });
}
class EventWrapper extends Event {
  /**
   * Wrap a given event object to control states.
   * @param event The event-like object to wrap.
   */
  static wrap(event) {
    return new (getWrapperClassOf(event))(event);
  }
  constructor(event) {
    super(event.type, {
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      composed: event.composed
    });
    if (event.cancelBubble) {
      super.stopPropagation();
    }
    if (event.defaultPrevented) {
      super.preventDefault();
    }
    internalDataMap$1.set(this, { original: event });
    const keys2 = Object.keys(event);
    for (let i2 = 0; i2 < keys2.length; ++i2) {
      const key = keys2[i2];
      if (!(key in this)) {
        Object.defineProperty(this, key, defineRedirectDescriptor(event, key));
      }
    }
  }
  stopPropagation() {
    super.stopPropagation();
    const { original } = $$1(this);
    if ("stopPropagation" in original) {
      original.stopPropagation();
    }
  }
  get cancelBubble() {
    return super.cancelBubble;
  }
  set cancelBubble(value) {
    super.cancelBubble = value;
    const { original } = $$1(this);
    if ("cancelBubble" in original) {
      original.cancelBubble = value;
    }
  }
  stopImmediatePropagation() {
    super.stopImmediatePropagation();
    const { original } = $$1(this);
    if ("stopImmediatePropagation" in original) {
      original.stopImmediatePropagation();
    }
  }
  get returnValue() {
    return super.returnValue;
  }
  set returnValue(value) {
    super.returnValue = value;
    const { original } = $$1(this);
    if ("returnValue" in original) {
      original.returnValue = value;
    }
  }
  preventDefault() {
    super.preventDefault();
    const { original } = $$1(this);
    if ("preventDefault" in original) {
      original.preventDefault();
    }
  }
  get timeStamp() {
    const { original } = $$1(this);
    if ("timeStamp" in original) {
      return original.timeStamp;
    }
    return super.timeStamp;
  }
}
const internalDataMap$1 = /* @__PURE__ */ new WeakMap();
function $$1(event) {
  const retv = internalDataMap$1.get(event);
  assertType(retv != null, "'this' is expected an Event object, but got", event);
  return retv;
}
const wrapperClassCache = /* @__PURE__ */ new WeakMap();
wrapperClassCache.set(Object.prototype, EventWrapper);
function getWrapperClassOf(originalEvent) {
  const prototype = Object.getPrototypeOf(originalEvent);
  if (prototype == null) {
    return EventWrapper;
  }
  let wrapper = wrapperClassCache.get(prototype);
  if (wrapper == null) {
    wrapper = defineWrapper(getWrapperClassOf(prototype), prototype);
    wrapperClassCache.set(prototype, wrapper);
  }
  return wrapper;
}
function defineWrapper(BaseEventWrapper, originalPrototype) {
  class CustomEventWrapper extends BaseEventWrapper {
  }
  const keys2 = Object.keys(originalPrototype);
  for (let i2 = 0; i2 < keys2.length; ++i2) {
    Object.defineProperty(CustomEventWrapper.prototype, keys2[i2], defineRedirectDescriptor(originalPrototype, keys2[i2]));
  }
  return CustomEventWrapper;
}
function defineRedirectDescriptor(obj, key) {
  const d2 = Object.getOwnPropertyDescriptor(obj, key);
  return {
    get() {
      const original = $$1(this).original;
      const value = original[key];
      if (typeof value === "function") {
        return value.bind(original);
      }
      return value;
    },
    set(value) {
      const original = $$1(this).original;
      original[key] = value;
    },
    configurable: d2.configurable,
    enumerable: d2.enumerable
  };
}
function createListener(callback, capture, passive, once, signal, signalListener) {
  return {
    callback,
    flags: (capture ? 1 : 0) | (passive ? 2 : 0) | (once ? 4 : 0),
    signal,
    signalListener
  };
}
function setRemoved(listener) {
  listener.flags |= 8;
}
function isCapture(listener) {
  return (listener.flags & 1) === 1;
}
function isPassive(listener) {
  return (listener.flags & 2) === 2;
}
function isOnce(listener) {
  return (listener.flags & 4) === 4;
}
function isRemoved(listener) {
  return (listener.flags & 8) === 8;
}
function invokeCallback({ callback }, target, event) {
  try {
    if (typeof callback === "function") {
      callback.call(target, event);
    } else if (typeof callback.handleEvent === "function") {
      callback.handleEvent(event);
    }
  } catch (thrownError) {
    reportError(thrownError);
  }
}
function findIndexOfListener({ listeners }, callback, capture) {
  for (let i2 = 0; i2 < listeners.length; ++i2) {
    if (listeners[i2].callback === callback && isCapture(listeners[i2]) === capture) {
      return i2;
    }
  }
  return -1;
}
function addListener(list, callback, capture, passive, once, signal) {
  let signalListener;
  if (signal) {
    signalListener = removeListener.bind(null, list, callback, capture);
    signal.addEventListener("abort", signalListener);
  }
  const listener = createListener(callback, capture, passive, once, signal, signalListener);
  if (list.cow) {
    list.cow = false;
    list.listeners = [...list.listeners, listener];
  } else {
    list.listeners.push(listener);
  }
  return listener;
}
function removeListener(list, callback, capture) {
  const index = findIndexOfListener(list, callback, capture);
  if (index !== -1) {
    return removeListenerAt(list, index);
  }
  return false;
}
function removeListenerAt(list, index, disableCow = false) {
  const listener = list.listeners[index];
  setRemoved(listener);
  if (listener.signal) {
    listener.signal.removeEventListener("abort", listener.signalListener);
  }
  if (list.cow && !disableCow) {
    list.cow = false;
    list.listeners = list.listeners.filter((_, i2) => i2 !== index);
    return false;
  }
  list.listeners.splice(index, 1);
  return true;
}
function createListenerListMap() {
  return /* @__PURE__ */ Object.create(null);
}
function ensureListenerList(listenerMap, type) {
  var _a;
  return (_a = listenerMap[type]) !== null && _a !== void 0 ? _a : listenerMap[type] = {
    attrCallback: void 0,
    attrListener: void 0,
    cow: false,
    listeners: []
  };
}
class EventTarget {
  /**
   * Initialize this instance.
   */
  constructor() {
    internalDataMap$2.set(this, createListenerListMap());
  }
  // Implementation
  addEventListener(type0, callback0, options0) {
    const listenerMap = $$2(this);
    const { callback, capture, once, passive, signal, type } = normalizeAddOptions(type0, callback0, options0);
    if (callback == null || (signal === null || signal === void 0 ? void 0 : signal.aborted)) {
      return;
    }
    const list = ensureListenerList(listenerMap, type);
    const i2 = findIndexOfListener(list, callback, capture);
    if (i2 !== -1) {
      warnDuplicate(list.listeners[i2], passive, once, signal);
      return;
    }
    addListener(list, callback, capture, passive, once, signal);
  }
  // Implementation
  removeEventListener(type0, callback0, options0) {
    const listenerMap = $$2(this);
    const { callback, capture, type } = normalizeOptions(type0, callback0, options0);
    const list = listenerMap[type];
    if (callback != null && list) {
      removeListener(list, callback, capture);
    }
  }
  // Implementation
  dispatchEvent(e2) {
    const list = $$2(this)[String(e2.type)];
    if (list == null) {
      return true;
    }
    const event = e2 instanceof Event ? e2 : EventWrapper.wrap(e2);
    const eventData = $(event, "event");
    if (eventData.dispatchFlag) {
      throw new DOMException("This event has been in dispatching.");
    }
    eventData.dispatchFlag = true;
    eventData.target = eventData.currentTarget = this;
    if (!eventData.stopPropagationFlag) {
      const { cow, listeners } = list;
      list.cow = true;
      for (let i2 = 0; i2 < listeners.length; ++i2) {
        const listener = listeners[i2];
        if (isRemoved(listener)) {
          continue;
        }
        if (isOnce(listener) && removeListenerAt(list, i2, !cow)) {
          i2 -= 1;
        }
        eventData.inPassiveListenerFlag = isPassive(listener);
        invokeCallback(listener, this, event);
        eventData.inPassiveListenerFlag = false;
        if (eventData.stopImmediatePropagationFlag) {
          break;
        }
      }
      if (!cow) {
        list.cow = false;
      }
    }
    eventData.target = null;
    eventData.currentTarget = null;
    eventData.stopImmediatePropagationFlag = false;
    eventData.stopPropagationFlag = false;
    eventData.dispatchFlag = false;
    return !eventData.canceledFlag;
  }
}
const internalDataMap$2 = /* @__PURE__ */ new WeakMap();
function $$2(target, name = "this") {
  const retv = internalDataMap$2.get(target);
  assertType(retv != null, "'%s' must be an object that EventTarget constructor created, but got another one: %o", name, target);
  return retv;
}
function normalizeAddOptions(type, callback, options) {
  var _a;
  assertCallback(callback);
  if (typeof options === "object" && options !== null) {
    return {
      type: String(type),
      callback: callback !== null && callback !== void 0 ? callback : void 0,
      capture: Boolean(options.capture),
      passive: Boolean(options.passive),
      once: Boolean(options.once),
      signal: (_a = options.signal) !== null && _a !== void 0 ? _a : void 0
    };
  }
  return {
    type: String(type),
    callback: callback !== null && callback !== void 0 ? callback : void 0,
    capture: Boolean(options),
    passive: false,
    once: false,
    signal: void 0
  };
}
function normalizeOptions(type, callback, options) {
  assertCallback(callback);
  if (typeof options === "object" && options !== null) {
    return {
      type: String(type),
      callback: callback !== null && callback !== void 0 ? callback : void 0,
      capture: Boolean(options.capture)
    };
  }
  return {
    type: String(type),
    callback: callback !== null && callback !== void 0 ? callback : void 0,
    capture: Boolean(options)
  };
}
function assertCallback(callback) {
  if (typeof callback === "function" || typeof callback === "object" && callback !== null && typeof callback.handleEvent === "function") {
    return;
  }
  if (callback == null || typeof callback === "object") {
    InvalidEventListener.warn(callback);
    return;
  }
  throw new TypeError(format(InvalidEventListener.message, [callback]));
}
function warnDuplicate(listener, passive, once, signal) {
  EventListenerWasDuplicated.warn(isCapture(listener) ? "capture" : "bubble", listener.callback);
  if (isPassive(listener) !== passive) {
    OptionWasIgnored.warn("passive");
  }
  if (isOnce(listener) !== once) {
    OptionWasIgnored.warn("once");
  }
  if (listener.signal !== signal) {
    OptionWasIgnored.warn("signal");
  }
}
const keys$1$1 = Object.getOwnPropertyNames(EventTarget.prototype);
for (let i2 = 0; i2 < keys$1$1.length; ++i2) {
  if (keys$1$1[i2] === "constructor") {
    continue;
  }
  Object.defineProperty(EventTarget.prototype, keys$1$1[i2], { enumerable: true });
}
function u(u2, D2) {
  for (var t2 = 0; t2 < D2.length; t2++) {
    var F2 = D2[t2];
    F2.enumerable = F2.enumerable || false, F2.configurable = true, "value" in F2 && (F2.writable = true), Object.defineProperty(u2, F2.key, F2);
  }
}
function D(D2, t2, F2) {
  return t2 && u(D2.prototype, t2), F2 && u(D2, F2), D2;
}
function t(u2, D2) {
  (null == D2 || D2 > u2.length) && (D2 = u2.length);
  for (var t2 = 0, F2 = new Array(D2); t2 < D2; t2++)
    F2[t2] = u2[t2];
  return F2;
}
function F(u2, D2) {
  var F2 = "undefined" != typeof Symbol && u2[Symbol.iterator] || u2["@@iterator"];
  if (F2)
    return (F2 = F2.call(u2)).next.bind(F2);
  if (Array.isArray(u2) || (F2 = function(u3, D3) {
    if (u3) {
      if ("string" == typeof u3)
        return t(u3, D3);
      var F3 = Object.prototype.toString.call(u3).slice(8, -1);
      return "Object" === F3 && u3.constructor && (F3 = u3.constructor.name), "Map" === F3 || "Set" === F3 ? Array.from(u3) : "Arguments" === F3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(F3) ? t(u3, D3) : void 0;
    }
  }(u2)) || D2 && u2 && "number" == typeof u2.length) {
    F2 && (u2 = F2);
    var e2 = 0;
    return function() {
      return e2 >= u2.length ? { done: true } : { done: false, value: u2[e2++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var e = /(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/, C = /(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u08D3-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1ABF\u1AC0\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA827\uA82C\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF50\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E-\uDC61\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFE4\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]|\uDB40[\uDD00-\uDDEF])/;
function A(u2, D2) {
  return (D2 ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(u2);
}
function E(u2, D2) {
  void 0 === D2 && (D2 = false);
  for (var t2 = [], F2 = 0; F2 < u2.length; ) {
    var E2 = u2[F2], n2 = function(e2) {
      if (!D2)
        throw new TypeError(e2);
      t2.push({ type: "INVALID_CHAR", index: F2, value: u2[F2++] });
    };
    if ("*" !== E2)
      if ("+" !== E2 && "?" !== E2)
        if ("\\" !== E2)
          if ("{" !== E2)
            if ("}" !== E2)
              if (":" !== E2)
                if ("(" !== E2)
                  t2.push({ type: "CHAR", index: F2, value: u2[F2++] });
                else {
                  var r2 = 1, i2 = "", s2 = F2 + 1, a2 = false;
                  if ("?" === u2[s2]) {
                    n2('Pattern cannot start with "?" at ' + s2);
                    continue;
                  }
                  for (; s2 < u2.length; ) {
                    if (!A(u2[s2], false)) {
                      n2("Invalid character '" + u2[s2] + "' at " + s2 + "."), a2 = true;
                      break;
                    }
                    if ("\\" !== u2[s2]) {
                      if (")" === u2[s2]) {
                        if (0 == --r2) {
                          s2++;
                          break;
                        }
                      } else if ("(" === u2[s2] && (r2++, "?" !== u2[s2 + 1])) {
                        n2("Capturing groups are not allowed at " + s2), a2 = true;
                        break;
                      }
                      i2 += u2[s2++];
                    } else
                      i2 += u2[s2++] + u2[s2++];
                  }
                  if (a2)
                    continue;
                  if (r2) {
                    n2("Unbalanced pattern at " + F2);
                    continue;
                  }
                  if (!i2) {
                    n2("Missing pattern at " + F2);
                    continue;
                  }
                  t2.push({ type: "PATTERN", index: F2, value: i2 }), F2 = s2;
                }
              else {
                for (var B2 = "", o2 = F2 + 1; o2 < u2.length; ) {
                  var h2 = u2.substr(o2, 1);
                  if (!(o2 === F2 + 1 && e.test(h2) || o2 !== F2 + 1 && C.test(h2)))
                    break;
                  B2 += u2[o2++];
                }
                if (!B2) {
                  n2("Missing parameter name at " + F2);
                  continue;
                }
                t2.push({ type: "NAME", index: F2, value: B2 }), F2 = o2;
              }
            else
              t2.push({ type: "CLOSE", index: F2, value: u2[F2++] });
          else
            t2.push({ type: "OPEN", index: F2, value: u2[F2++] });
        else
          t2.push({ type: "ESCAPED_CHAR", index: F2++, value: u2[F2++] });
      else
        t2.push({ type: "MODIFIER", index: F2, value: u2[F2++] });
    else
      t2.push({ type: "ASTERISK", index: F2, value: u2[F2++] });
  }
  return t2.push({ type: "END", index: F2, value: "" }), t2;
}
function n(u2, D2) {
  void 0 === D2 && (D2 = {});
  for (var t2 = E(u2), F2 = D2.prefixes, e2 = void 0 === F2 ? "./" : F2, C2 = "[^" + r(D2.delimiter || "/#?") + "]+?", A2 = [], n2 = 0, i2 = 0, s2 = "", a2 = /* @__PURE__ */ new Set(), B2 = function(u3) {
    if (i2 < t2.length && t2[i2].type === u3)
      return t2[i2++].value;
  }, o2 = function() {
    return B2("MODIFIER") || B2("ASTERISK");
  }, h2 = function(u3) {
    var D3 = B2(u3);
    if (void 0 !== D3)
      return D3;
    var F3 = t2[i2];
    throw new TypeError("Unexpected " + F3.type + " at " + F3.index + ", expected " + u3);
  }, p2 = function() {
    for (var u3, D3 = ""; u3 = B2("CHAR") || B2("ESCAPED_CHAR"); )
      D3 += u3;
    return D3;
  }, c2 = D2.encodePart || function(u3) {
    return u3;
  }; i2 < t2.length; ) {
    var f2 = B2("CHAR"), l2 = B2("NAME"), m2 = B2("PATTERN");
    if (l2 || m2 || !B2("ASTERISK") || (m2 = ".*"), l2 || m2) {
      var d2 = f2 || "";
      -1 === e2.indexOf(d2) && (s2 += d2, d2 = ""), s2 && (A2.push(c2(s2)), s2 = "");
      var g2 = l2 || n2++;
      if (a2.has(g2))
        throw new TypeError("Duplicate name '" + g2 + "'.");
      a2.add(g2), A2.push({ name: g2, prefix: c2(d2), suffix: "", pattern: m2 || C2, modifier: o2() || "" });
    } else {
      var x2 = f2 || B2("ESCAPED_CHAR");
      if (x2)
        s2 += x2;
      else if (B2("OPEN")) {
        var S2 = p2(), v2 = B2("NAME") || "", y2 = B2("PATTERN") || "";
        v2 || y2 || !B2("ASTERISK") || (y2 = ".*");
        var R2 = p2();
        h2("CLOSE");
        var k2 = o2() || "";
        if (!v2 && !y2 && !k2) {
          s2 += S2;
          continue;
        }
        if (!v2 && !y2 && !S2)
          continue;
        s2 && (A2.push(c2(s2)), s2 = ""), A2.push({ name: v2 || (y2 ? n2++ : ""), pattern: v2 && !y2 ? C2 : y2, prefix: c2(S2), suffix: c2(R2), modifier: k2 });
      } else
        s2 && (A2.push(c2(s2)), s2 = ""), h2("END");
    }
  }
  return A2;
}
function r(u2) {
  return u2.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
function i(u2) {
  return u2 && u2.sensitive ? "u" : "ui";
}
function s(u2, D2, t2) {
  void 0 === t2 && (t2 = {});
  for (var e2, C2 = t2.strict, A2 = void 0 !== C2 && C2, E2 = t2.start, n2 = void 0 === E2 || E2, s2 = t2.end, a2 = void 0 === s2 || s2, B2 = t2.encode, o2 = void 0 === B2 ? function(u3) {
    return u3;
  } : B2, h2 = "[" + r(t2.endsWith || "") + "]|$", p2 = "[" + r(t2.delimiter || "/#?") + "]", c2 = n2 ? "^" : "", f2 = F(u2); !(e2 = f2()).done; ) {
    var l2 = e2.value;
    if ("string" == typeof l2)
      c2 += r(o2(l2));
    else {
      var m2 = r(o2(l2.prefix)), d2 = r(o2(l2.suffix));
      l2.pattern ? (D2 && D2.push(l2), c2 += m2 || d2 ? "+" === l2.modifier || "*" === l2.modifier ? "(?:" + m2 + "((?:" + l2.pattern + ")(?:" + d2 + m2 + "(?:" + l2.pattern + "))*)" + d2 + ")" + ("*" === l2.modifier ? "?" : "") : "(?:" + m2 + "(" + l2.pattern + ")" + d2 + ")" + l2.modifier : "+" === l2.modifier || "*" === l2.modifier ? "((?:" + l2.pattern + ")" + l2.modifier + ")" : "(" + l2.pattern + ")" + l2.modifier) : c2 += "(?:" + m2 + d2 + ")" + l2.modifier;
    }
  }
  if (a2)
    A2 || (c2 += p2 + "?"), c2 += t2.endsWith ? "(?=" + h2 + ")" : "$";
  else {
    var g2 = u2[u2.length - 1], x2 = "string" == typeof g2 ? p2.indexOf(g2[g2.length - 1]) > -1 : void 0 === g2;
    A2 || (c2 += "(?:" + p2 + "(?=" + h2 + "))?"), x2 || (c2 += "(?=" + p2 + "|" + h2 + ")");
  }
  return new RegExp(c2, i(t2));
}
function a(u2, D2, t2) {
  return u2 instanceof RegExp ? function(u3, D3) {
    if (!D3)
      return u3;
    for (var t3 = /\((?:\?<(.*?)>)?(?!\?)/g, F2 = 0, e2 = t3.exec(u3.source); e2; )
      D3.push({ name: e2[1] || F2++, prefix: "", suffix: "", modifier: "", pattern: "" }), e2 = t3.exec(u3.source);
    return u3;
  }(u2, D2) : Array.isArray(u2) ? function(u3, D3, t3) {
    var F2 = u3.map(function(u4) {
      return a(u4, D3, t3).source;
    });
    return new RegExp("(?:" + F2.join("|") + ")", i(t3));
  }(u2, D2, t2) : function(u3, D3, t3) {
    return s(n(u3, t3), D3, t3);
  }(u2, D2, t2);
}
var B = { delimiter: "", prefixes: "", sensitive: true, strict: true }, o = { delimiter: ".", prefixes: "", sensitive: true, strict: true }, h = { delimiter: "/", prefixes: "/", sensitive: true, strict: true };
function p(u2, D2) {
  return u2.startsWith(D2) ? u2.substring(D2.length, u2.length) : u2;
}
function c(u2) {
  return !(!u2 || u2.length < 2 || "[" !== u2[0] && ("\\" !== u2[0] && "{" !== u2[0] || "[" !== u2[1]));
}
var f, l = ["ftp", "file", "http", "https", "ws", "wss"];
function m(u2) {
  if (!u2)
    return true;
  for (var D2, t2 = F(l); !(D2 = t2()).done; )
    if (u2.test(D2.value))
      return true;
  return false;
}
function d(u2) {
  switch (u2) {
    case "ws":
    case "http":
      return "80";
    case "wws":
    case "https":
      return "443";
    case "ftp":
      return "21";
    default:
      return "";
  }
}
function g(u2) {
  if ("" === u2)
    return u2;
  if (/^[-+.A-Za-z0-9]*$/.test(u2))
    return u2.toLowerCase();
  throw new TypeError("Invalid protocol '" + u2 + "'.");
}
function x(u2) {
  if ("" === u2)
    return u2;
  var D2 = new URL("https://example.com");
  return D2.username = u2, D2.username;
}
function S(u2) {
  if ("" === u2)
    return u2;
  var D2 = new URL("https://example.com");
  return D2.password = u2, D2.password;
}
function v(u2) {
  if ("" === u2)
    return u2;
  if (/[\t\n\r #%/:<>?@[\]^\\|]/g.test(u2))
    throw new TypeError("Invalid hostname '" + u2 + "'");
  var D2 = new URL("https://example.com");
  return D2.hostname = u2, D2.hostname;
}
function y(u2) {
  if ("" === u2)
    return u2;
  if (/[^0-9a-fA-F[\]:]/g.test(u2))
    throw new TypeError("Invalid IPv6 hostname '" + u2 + "'");
  return u2.toLowerCase();
}
function R(u2) {
  if ("" === u2)
    return u2;
  if (/^[0-9]*$/.test(u2) && parseInt(u2) <= 65535)
    return u2;
  throw new TypeError("Invalid port '" + u2 + "'.");
}
function k(u2) {
  if ("" === u2)
    return u2;
  var D2 = new URL("https://example.com");
  return D2.pathname = "/" !== u2[0] ? "/-" + u2 : u2, "/" !== u2[0] ? D2.pathname.substring(2, D2.pathname.length) : D2.pathname;
}
function w(u2) {
  return "" === u2 ? u2 : new URL("data:" + u2).pathname;
}
function P(u2) {
  if ("" === u2)
    return u2;
  var D2 = new URL("https://example.com");
  return D2.search = u2, D2.search.substring(1, D2.search.length);
}
function T(u2) {
  if ("" === u2)
    return u2;
  var D2 = new URL("https://example.com");
  return D2.hash = u2, D2.hash.substring(1, D2.hash.length);
}
!function(u2) {
  u2[u2.INIT = 0] = "INIT", u2[u2.PROTOCOL = 1] = "PROTOCOL", u2[u2.AUTHORITY = 2] = "AUTHORITY", u2[u2.USERNAME = 3] = "USERNAME", u2[u2.PASSWORD = 4] = "PASSWORD", u2[u2.HOSTNAME = 5] = "HOSTNAME", u2[u2.PORT = 6] = "PORT", u2[u2.PATHNAME = 7] = "PATHNAME", u2[u2.SEARCH = 8] = "SEARCH", u2[u2.HASH = 9] = "HASH", u2[u2.DONE = 10] = "DONE";
}(f || (f = {}));
var b = function() {
  function u2(u3) {
    this.input = void 0, this.tokenList = [], this.internalResult = {}, this.tokenIndex = 0, this.tokenIncrement = 1, this.componentStart = 0, this.state = f.INIT, this.groupDepth = 0, this.hostnameIPv6BracketDepth = 0, this.shouldTreatAsStandardURL = false, this.input = u3;
  }
  var t2 = u2.prototype;
  return t2.parse = function() {
    for (this.tokenList = E(this.input, true); this.tokenIndex < this.tokenList.length; this.tokenIndex += this.tokenIncrement) {
      if (this.tokenIncrement = 1, "END" === this.tokenList[this.tokenIndex].type) {
        if (this.state === f.INIT) {
          this.rewind(), this.isHashPrefix() ? this.changeState(f.HASH, 1) : this.isSearchPrefix() ? (this.changeState(f.SEARCH, 1), this.internalResult.hash = "") : (this.changeState(f.PATHNAME, 0), this.internalResult.search = "", this.internalResult.hash = "");
          continue;
        }
        if (this.state === f.AUTHORITY) {
          this.rewindAndSetState(f.HOSTNAME);
          continue;
        }
        this.changeState(f.DONE, 0);
        break;
      }
      if (this.groupDepth > 0) {
        if (!this.isGroupClose())
          continue;
        this.groupDepth -= 1;
      }
      if (this.isGroupOpen())
        this.groupDepth += 1;
      else
        switch (this.state) {
          case f.INIT:
            this.isProtocolSuffix() && (this.internalResult.username = "", this.internalResult.password = "", this.internalResult.hostname = "", this.internalResult.port = "", this.internalResult.pathname = "", this.internalResult.search = "", this.internalResult.hash = "", this.rewindAndSetState(f.PROTOCOL));
            break;
          case f.PROTOCOL:
            if (this.isProtocolSuffix()) {
              this.computeShouldTreatAsStandardURL();
              var u3 = f.PATHNAME, D2 = 1;
              this.shouldTreatAsStandardURL && (this.internalResult.pathname = "/"), this.nextIsAuthoritySlashes() ? (u3 = f.AUTHORITY, D2 = 3) : this.shouldTreatAsStandardURL && (u3 = f.AUTHORITY), this.changeState(u3, D2);
            }
            break;
          case f.AUTHORITY:
            this.isIdentityTerminator() ? this.rewindAndSetState(f.USERNAME) : (this.isPathnameStart() || this.isSearchPrefix() || this.isHashPrefix()) && this.rewindAndSetState(f.HOSTNAME);
            break;
          case f.USERNAME:
            this.isPasswordPrefix() ? this.changeState(f.PASSWORD, 1) : this.isIdentityTerminator() && this.changeState(f.HOSTNAME, 1);
            break;
          case f.PASSWORD:
            this.isIdentityTerminator() && this.changeState(f.HOSTNAME, 1);
            break;
          case f.HOSTNAME:
            this.isIPv6Open() ? this.hostnameIPv6BracketDepth += 1 : this.isIPv6Close() && (this.hostnameIPv6BracketDepth -= 1), this.isPortPrefix() && !this.hostnameIPv6BracketDepth ? this.changeState(f.PORT, 1) : this.isPathnameStart() ? this.changeState(f.PATHNAME, 0) : this.isSearchPrefix() ? this.changeState(f.SEARCH, 1) : this.isHashPrefix() && this.changeState(f.HASH, 1);
            break;
          case f.PORT:
            this.isPathnameStart() ? this.changeState(f.PATHNAME, 0) : this.isSearchPrefix() ? this.changeState(f.SEARCH, 1) : this.isHashPrefix() && this.changeState(f.HASH, 1);
            break;
          case f.PATHNAME:
            this.isSearchPrefix() ? this.changeState(f.SEARCH, 1) : this.isHashPrefix() && this.changeState(f.HASH, 1);
            break;
          case f.SEARCH:
            this.isHashPrefix() && this.changeState(f.HASH, 1);
        }
    }
  }, t2.changeState = function(u3, D2) {
    switch (this.state) {
      case f.INIT:
        break;
      case f.PROTOCOL:
        this.internalResult.protocol = this.makeComponentString();
        break;
      case f.AUTHORITY:
        break;
      case f.USERNAME:
        this.internalResult.username = this.makeComponentString();
        break;
      case f.PASSWORD:
        this.internalResult.password = this.makeComponentString();
        break;
      case f.HOSTNAME:
        this.internalResult.hostname = this.makeComponentString();
        break;
      case f.PORT:
        this.internalResult.port = this.makeComponentString();
        break;
      case f.PATHNAME:
        this.internalResult.pathname = this.makeComponentString();
        break;
      case f.SEARCH:
        this.internalResult.search = this.makeComponentString();
        break;
      case f.HASH:
        this.internalResult.hash = this.makeComponentString();
    }
    this.changeStateWithoutSettingComponent(u3, D2);
  }, t2.changeStateWithoutSettingComponent = function(u3, D2) {
    this.state = u3, this.componentStart = this.tokenIndex + D2, this.tokenIndex += D2, this.tokenIncrement = 0;
  }, t2.rewind = function() {
    this.tokenIndex = this.componentStart, this.tokenIncrement = 0;
  }, t2.rewindAndSetState = function(u3) {
    this.rewind(), this.state = u3;
  }, t2.safeToken = function(u3) {
    return u3 < 0 && (u3 = this.tokenList.length - u3), u3 < this.tokenList.length ? this.tokenList[u3] : this.tokenList[this.tokenList.length - 1];
  }, t2.isNonSpecialPatternChar = function(u3, D2) {
    var t3 = this.safeToken(u3);
    return t3.value === D2 && ("CHAR" === t3.type || "ESCAPED_CHAR" === t3.type || "INVALID_CHAR" === t3.type);
  }, t2.isProtocolSuffix = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex, ":");
  }, t2.nextIsAuthoritySlashes = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex + 1, "/") && this.isNonSpecialPatternChar(this.tokenIndex + 2, "/");
  }, t2.isIdentityTerminator = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "@");
  }, t2.isPasswordPrefix = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex, ":");
  }, t2.isPortPrefix = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex, ":");
  }, t2.isPathnameStart = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "/");
  }, t2.isSearchPrefix = function() {
    if (this.isNonSpecialPatternChar(this.tokenIndex, "?"))
      return true;
    if ("?" !== this.tokenList[this.tokenIndex].value)
      return false;
    var u3 = this.safeToken(this.tokenIndex - 1);
    return "NAME" !== u3.type && "PATTERN" !== u3.type && "CLOSE" !== u3.type && "ASTERISK" !== u3.type;
  }, t2.isHashPrefix = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "#");
  }, t2.isGroupOpen = function() {
    return "OPEN" == this.tokenList[this.tokenIndex].type;
  }, t2.isGroupClose = function() {
    return "CLOSE" == this.tokenList[this.tokenIndex].type;
  }, t2.isIPv6Open = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "[");
  }, t2.isIPv6Close = function() {
    return this.isNonSpecialPatternChar(this.tokenIndex, "]");
  }, t2.makeComponentString = function() {
    var u3 = this.tokenList[this.tokenIndex], D2 = this.safeToken(this.componentStart).index;
    return this.input.substring(D2, u3.index);
  }, t2.computeShouldTreatAsStandardURL = function() {
    var u3 = {};
    Object.assign(u3, B), u3.encodePart = g;
    var D2 = a(this.makeComponentString(), void 0, u3);
    this.shouldTreatAsStandardURL = m(D2);
  }, D(u2, [{ key: "result", get: function() {
    return this.internalResult;
  } }]), u2;
}(), I = ["protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"];
function O(u2, D2) {
  if ("string" != typeof u2)
    throw new TypeError("parameter 1 is not of type 'string'.");
  var t2 = new URL(u2, D2);
  return { protocol: t2.protocol.substring(0, t2.protocol.length - 1), username: t2.username, password: t2.password, hostname: t2.hostname, port: t2.port, pathname: t2.pathname, search: "" != t2.search ? t2.search.substring(1, t2.search.length) : void 0, hash: "" != t2.hash ? t2.hash.substring(1, t2.hash.length) : void 0 };
}
function H(u2, D2, t2) {
  var F2;
  if ("string" == typeof D2.baseURL)
    try {
      F2 = new URL(D2.baseURL), u2.protocol = F2.protocol ? F2.protocol.substring(0, F2.protocol.length - 1) : "", u2.username = F2.username, u2.password = F2.password, u2.hostname = F2.hostname, u2.port = F2.port, u2.pathname = F2.pathname, u2.search = F2.search ? F2.search.substring(1, F2.search.length) : "", u2.hash = F2.hash ? F2.hash.substring(1, F2.hash.length) : "";
    } catch (u3) {
      throw new TypeError("invalid baseURL '" + D2.baseURL + "'.");
    }
  if ("string" == typeof D2.protocol && (u2.protocol = function(u3, D3) {
    var t3;
    return u3 = (t3 = u3).endsWith(":") ? t3.substr(0, t3.length - ":".length) : t3, D3 || "" === u3 ? u3 : g(u3);
  }(D2.protocol, t2)), "string" == typeof D2.username && (u2.username = function(u3, D3) {
    if (D3 || "" === u3)
      return u3;
    var t3 = new URL("https://example.com");
    return t3.username = u3, t3.username;
  }(D2.username, t2)), "string" == typeof D2.password && (u2.password = function(u3, D3) {
    if (D3 || "" === u3)
      return u3;
    var t3 = new URL("https://example.com");
    return t3.password = u3, t3.password;
  }(D2.password, t2)), "string" == typeof D2.hostname && (u2.hostname = function(u3, D3) {
    return D3 || "" === u3 ? u3 : c(u3) ? y(u3) : v(u3);
  }(D2.hostname, t2)), "string" == typeof D2.port && (u2.port = function(u3, D3, t3) {
    return d(D3) === u3 && (u3 = ""), t3 || "" === u3 ? u3 : R(u3);
  }(D2.port, u2.protocol, t2)), "string" == typeof D2.pathname) {
    if (u2.pathname = D2.pathname, F2 && !function(u3, D3) {
      return !(!u3.length || "/" !== u3[0] && (!D3 || u3.length < 2 || "\\" != u3[0] && "{" != u3[0] || "/" != u3[1]));
    }(u2.pathname, t2)) {
      var e2 = F2.pathname.lastIndexOf("/");
      e2 >= 0 && (u2.pathname = F2.pathname.substring(0, e2 + 1) + u2.pathname);
    }
    u2.pathname = function(u3, D3, t3) {
      if (t3 || "" === u3)
        return u3;
      if (D3 && !l.includes(D3))
        return new URL(D3 + ":" + u3).pathname;
      var F3 = "/" == u3[0];
      return u3 = new URL(F3 ? u3 : "/-" + u3, "https://example.com").pathname, F3 || (u3 = u3.substring(2, u3.length)), u3;
    }(u2.pathname, u2.protocol, t2);
  }
  return "string" == typeof D2.search && (u2.search = function(u3, D3) {
    if (u3 = p(u3, "?"), D3 || "" === u3)
      return u3;
    var t3 = new URL("https://example.com");
    return t3.search = u3, t3.search ? t3.search.substring(1, t3.search.length) : "";
  }(D2.search, t2)), "string" == typeof D2.hash && (u2.hash = function(u3, D3) {
    if (u3 = p(u3, "#"), D3 || "" === u3)
      return u3;
    var t3 = new URL("https://example.com");
    return t3.hash = u3, t3.hash ? t3.hash.substring(1, t3.hash.length) : "";
  }(D2.hash, t2)), u2;
}
function N(u2) {
  return u2.replace(/([+*?:{}()\\])/g, "\\$1");
}
function L(u2, D2) {
  for (var t2 = "[^" + (D2.delimiter || "/#?").replace(/([.+*?^${}()[\]|/\\])/g, "\\$1") + "]+?", F2 = /(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u07FD\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u08D3-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1ABF\u1AC0\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CD0-\u1CD2\u1CD4-\u1CFA\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA827\uA82C\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD27\uDD30-\uDD39\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF50\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDC9-\uDDCC\uDDCE-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3B-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC5E-\uDC61\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDC00-\uDC3A\uDCA0-\uDCE9\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B-\uDD43\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDE1\uDDE3\uDDE4\uDE00-\uDE3E\uDE47\uDE50-\uDE99\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFE4\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD00-\uDD2C\uDD30-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4B\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]|\uDB40[\uDD00-\uDDEF])/, e2 = "", C2 = 0; C2 < u2.length; ++C2) {
    var A2 = u2[C2], E2 = C2 > 0 ? u2[C2 - 1] : null, n2 = C2 < u2.length - 1 ? u2[C2 + 1] : null;
    if ("string" != typeof A2)
      if ("" !== A2.pattern) {
        var r2 = "number" != typeof A2.name, i2 = void 0 !== D2.prefixes ? D2.prefixes : "./", s2 = "" !== A2.suffix || "" !== A2.prefix && (1 !== A2.prefix.length || !i2.includes(A2.prefix));
        s2 || !r2 || A2.pattern !== t2 || "" !== A2.modifier || !n2 || n2.prefix || n2.suffix || (s2 = "string" == typeof n2 ? F2.test(n2.length > 0 ? n2[0] : "") : "number" == typeof n2.name), !s2 && "" === A2.prefix && E2 && "string" == typeof E2 && E2.length > 0 && (s2 = i2.includes(E2[E2.length - 1])), s2 && (e2 += "{"), e2 += N(A2.prefix), r2 && (e2 += ":" + A2.name), ".*" === A2.pattern ? e2 += r2 || E2 && "string" != typeof E2 && !E2.modifier && !s2 && "" === A2.prefix ? "(.*)" : "*" : A2.pattern === t2 ? r2 || (e2 += "(" + t2 + ")") : e2 += "(" + A2.pattern + ")", A2.pattern === t2 && r2 && "" !== A2.suffix && F2.test(A2.suffix[0]) && (e2 += "\\"), e2 += N(A2.suffix), s2 && (e2 += "}"), e2 += A2.modifier;
      } else {
        if ("" === A2.modifier) {
          e2 += N(A2.prefix);
          continue;
        }
        e2 += "{" + N(A2.prefix) + "}" + A2.modifier;
      }
    else
      e2 += N(A2);
  }
  return e2;
}
var U = function() {
  function u2(u3, D2) {
    void 0 === u3 && (u3 = {}), this.pattern = void 0, this.regexp = {}, this.keys = {}, this.component_pattern = {};
    try {
      if ("string" == typeof u3) {
        var t3 = new b(u3);
        if (t3.parse(), u3 = t3.result, D2) {
          if ("string" != typeof D2)
            throw new TypeError("'baseURL' parameter is not of type 'string'.");
          u3.baseURL = D2;
        } else if ("string" != typeof u3.protocol)
          throw new TypeError("A base URL must be provided for a relative constructor string.");
      } else if (D2)
        throw new TypeError("parameter 1 is not of type 'string'.");
      if (!u3 || "object" != typeof u3)
        throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");
      var e2;
      this.pattern = H({ pathname: "*", protocol: "*", username: "*", password: "*", hostname: "*", port: "*", search: "*", hash: "*" }, u3, true), d(this.pattern.protocol) === this.pattern.port && (this.pattern.port = "");
      for (var C2, A2 = F(I); !(C2 = A2()).done; )
        if ((e2 = C2.value) in this.pattern) {
          var E2 = {}, r2 = this.pattern[e2];
          switch (this.keys[e2] = [], e2) {
            case "protocol":
              Object.assign(E2, B), E2.encodePart = g;
              break;
            case "username":
              Object.assign(E2, B), E2.encodePart = x;
              break;
            case "password":
              Object.assign(E2, B), E2.encodePart = S;
              break;
            case "hostname":
              Object.assign(E2, o), E2.encodePart = c(r2) ? y : v;
              break;
            case "port":
              Object.assign(E2, B), E2.encodePart = R;
              break;
            case "pathname":
              m(this.regexp.protocol) ? (Object.assign(E2, h), E2.encodePart = k) : (Object.assign(E2, B), E2.encodePart = w);
              break;
            case "search":
              Object.assign(E2, B), E2.encodePart = P;
              break;
            case "hash":
              Object.assign(E2, B), E2.encodePart = T;
          }
          try {
            var i2 = n(r2, E2);
            this.regexp[e2] = s(i2, this.keys[e2], E2), this.component_pattern[e2] = L(i2, E2);
          } catch (u4) {
            throw new TypeError("invalid " + e2 + " pattern '" + this.pattern[e2] + "'.");
          }
        }
    } catch (u4) {
      throw new TypeError("Failed to construct 'URLPattern': " + u4.message);
    }
  }
  var t2 = u2.prototype;
  return t2.test = function(u3, D2) {
    void 0 === u3 && (u3 = {});
    var t3, F2 = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if ("string" != typeof u3 && D2)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (void 0 === u3)
      return false;
    try {
      F2 = H(F2, "object" == typeof u3 ? u3 : O(u3, D2), false);
    } catch (u4) {
      return false;
    }
    for (t3 in this.pattern)
      if (!this.regexp[t3].exec(F2[t3]))
        return false;
    return true;
  }, t2.exec = function(u3, D2) {
    void 0 === u3 && (u3 = {});
    var t3 = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if ("string" != typeof u3 && D2)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (void 0 !== u3) {
      try {
        t3 = H(t3, "object" == typeof u3 ? u3 : O(u3, D2), false);
      } catch (u4) {
        return null;
      }
      var e2, C2 = {};
      for (e2 in C2.inputs = D2 ? [u3, D2] : [u3], this.pattern) {
        var A2 = this.regexp[e2].exec(t3[e2]);
        if (!A2)
          return null;
        for (var E2, n2 = {}, r2 = F(this.keys[e2].entries()); !(E2 = r2()).done; ) {
          var i2 = E2.value, s2 = i2[1];
          "string" != typeof s2.name && "number" != typeof s2.name || (n2[s2.name] = A2[i2[0] + 1] || "");
        }
        C2[e2] = { input: t3[e2] || "", groups: n2 };
      }
      return C2;
    }
  }, D(u2, [{ key: "protocol", get: function() {
    return this.component_pattern.protocol;
  } }, { key: "username", get: function() {
    return this.component_pattern.username;
  } }, { key: "password", get: function() {
    return this.component_pattern.password;
  } }, { key: "hostname", get: function() {
    return this.component_pattern.hostname;
  } }, { key: "port", get: function() {
    return this.component_pattern.port;
  } }, { key: "pathname", get: function() {
    return this.component_pattern.pathname;
  } }, { key: "search", get: function() {
    return this.component_pattern.search;
  } }, { key: "hash", get: function() {
    return this.component_pattern.hash;
  } }]), u2;
}();
const INTERNAL$2 = { tick: 0, pool: /* @__PURE__ */ new Map() };
function requestAnimationFrame(callback) {
  if (!INTERNAL$2.pool.size) {
    setTimeout$1(() => {
      const next = __performance_now();
      for (const func2 of INTERNAL$2.pool.values()) {
        func2(next);
      }
      INTERNAL$2.pool.clear();
    }, 1e3 / 16);
  }
  const func = __function_bind(callback, void 0);
  const tick = ++INTERNAL$2.tick;
  INTERNAL$2.pool.set(tick, func);
  return tick;
}
function cancelAnimationFrame(requestId) {
  const timeout = INTERNAL$2.pool.get(requestId);
  if (timeout) {
    clearTimeout$1(timeout);
    INTERNAL$2.pool.delete(requestId);
  }
}
class Node extends EventTarget {
  append(...nodesOrDOMStrings) {
  }
  appendChild(childNode) {
    return childNode;
  }
  after(...nodesOrDOMStrings) {
  }
  before(...nodesOrDOMStrings) {
  }
  prepend(...nodesOrDOMStrings) {
  }
  replaceChild(newChild, oldChild) {
    return oldChild;
  }
  removeChild(childNode) {
    return childNode;
  }
  get attributes() {
    return {};
  }
  get childNodes() {
    return [];
  }
  get children() {
    return [];
  }
  get ownerDocument() {
    return null;
  }
  get nodeValue() {
    return "";
  }
  set nodeValue(value) {
  }
  get textContent() {
    return "";
  }
  set textContent(value) {
  }
  get previousElementSibling() {
    return null;
  }
  get nextElementSibling() {
    return null;
  }
  [Symbol.for("nodejs.util.inspect.custom")](depth, options) {
    return `${this.constructor.name}`;
  }
}
class DocumentFragment extends Node {
}
class ShadowRoot extends DocumentFragment {
  get innerHTML() {
    return "";
  }
  set innerHTML(value) {
  }
}
const NodeFilter$1 = Object.assign({
  NodeFilter() {
    throw new TypeError("Illegal constructor");
  }
}.NodeFilter, {
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2,
  FILTER_SKIP: 3,
  SHOW_ALL: 4294967295,
  SHOW_ELEMENT: 1,
  SHOW_ATTRIBUTE: 2,
  SHOW_TEXT: 4,
  SHOW_CDATA_SECTION: 8,
  SHOW_ENTITY_REFERENCE: 16,
  SHOW_ENTITY: 32,
  SHOW_PROCESSING_INSTRUCTION: 64,
  SHOW_COMMENT: 128,
  SHOW_DOCUMENT: 256,
  SHOW_DOCUMENT_TYPE: 512,
  SHOW_DOCUMENT_FRAGMENT: 1024,
  SHOW_NOTATION: 2048
});
class NodeIterator$1 {
  nextNode() {
    return null;
  }
  previousNode() {
    return null;
  }
  get filter() {
    const internals = internalsOf(this, "NodeIterator", "filter");
    return internals.filter;
  }
  get pointerBeforeReferenceNode() {
    const internals = internalsOf(this, "NodeIterator", "pointerBeforeReferenceNode");
    return internals.pointerBeforeReferenceNode;
  }
  get referenceNode() {
    const internals = internalsOf(this, "NodeIterator", "referenceNode");
    return internals.referenceNode;
  }
  get root() {
    const internals = internalsOf(this, "NodeIterator", "root");
    return internals.root;
  }
  get whatToShow() {
    const internals = internalsOf(this, "NodeIterator", "whatToShow");
    return internals.whatToShow;
  }
}
allowStringTag(Node);
allowStringTag(NodeIterator$1);
allowStringTag(DocumentFragment);
allowStringTag(ShadowRoot);
class CharacterData extends Node {
  constructor(data) {
    INTERNALS.set(super(), {
      data: String(data)
    });
  }
  get data() {
    return internalsOf(this, "CharacterData", "data").data;
  }
  get textContent() {
    return internalsOf(this, "CharacterData", "textContent").data;
  }
}
class Comment extends CharacterData {
}
class Text extends CharacterData {
  get assignedSlot() {
    return null;
  }
  get wholeText() {
    return internalsOf(this, "CharacterData", "textContent").data;
  }
}
allowStringTag(CharacterData);
allowStringTag(Text);
allowStringTag(Comment);
class CustomEvent extends Event {
  constructor(type, params) {
    params = Object(params);
    super(type, params);
    if ("detail" in params)
      this.detail = params.detail;
  }
}
allowStringTag(CustomEvent);
const INTERNAL$1 = { tick: 0, pool: /* @__PURE__ */ new Map() };
function requestIdleCallback(callback) {
  if (!INTERNAL$1.pool.size) {
    setTimeout$1(() => {
      const next = __performance_now();
      for (const func2 of INTERNAL$1.pool.values()) {
        func2(next);
      }
      INTERNAL$1.pool.clear();
    }, 1e3 / 16);
  }
  const func = __function_bind(callback, void 0);
  const tick = ++INTERNAL$1.tick;
  INTERNAL$1.pool.set(tick, func);
  return tick;
}
function cancelIdleCallback(requestId) {
  const timeout = INTERNAL$1.pool.get(requestId);
  if (timeout) {
    clearTimeout$1(timeout);
    INTERNAL$1.pool.delete(requestId);
  }
}
const PRIMITIVE = 0;
const ARRAY = 1;
const OBJECT = 2;
const DATE = 3;
const REGEXP = 4;
const MAP = 5;
const SET = 6;
const ERROR = 7;
const BIGINT = 8;
const env = typeof self === "object" ? self : globalThis;
const deserializer = ($2, _) => {
  const as = (out, index) => {
    $2.set(index, out);
    return out;
  };
  const unpair = (index) => {
    if ($2.has(index))
      return $2.get(index);
    const [type, value] = _[index];
    switch (type) {
      case PRIMITIVE:
        return as(value, index);
      case ARRAY: {
        const arr = as([], index);
        for (const index2 of value)
          arr.push(unpair(index2));
        return arr;
      }
      case OBJECT: {
        const object = as({}, index);
        for (const [key, index2] of value)
          object[unpair(key)] = unpair(index2);
        return object;
      }
      case DATE:
        return as(new Date(value), index);
      case REGEXP: {
        const { source, flags } = value;
        return as(new RegExp(source, flags), index);
      }
      case MAP: {
        const map = as(/* @__PURE__ */ new Map(), index);
        for (const [key, index2] of value)
          map.set(unpair(key), unpair(index2));
        return map;
      }
      case SET: {
        const set = as(/* @__PURE__ */ new Set(), index);
        for (const index2 of value)
          set.add(unpair(index2));
        return set;
      }
      case ERROR: {
        const { name, message } = value;
        return as(new env[name](message), index);
      }
      case BIGINT:
        return as(BigInt(value), index);
      case "BigInt":
        return as(Object(BigInt(value)), index);
    }
    return as(new env[type](value), index);
  };
  return unpair;
};
const deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);
const EMPTY = "";
const { toString } = {};
const { keys } = Object;
const typeOf = (value) => {
  const type = typeof value;
  if (type !== "object" || !value)
    return [PRIMITIVE, type];
  const asString = toString.call(value).slice(8, -1);
  switch (asString) {
    case "Array":
      return [ARRAY, EMPTY];
    case "Object":
      return [OBJECT, EMPTY];
    case "Date":
      return [DATE, EMPTY];
    case "RegExp":
      return [REGEXP, EMPTY];
    case "Map":
      return [MAP, EMPTY];
    case "Set":
      return [SET, EMPTY];
  }
  if (asString.includes("Array"))
    return [ARRAY, asString];
  if (asString.includes("Error"))
    return [ERROR, asString];
  return [OBJECT, asString];
};
const shouldSkip = ([TYPE, type]) => TYPE === PRIMITIVE && (type === "function" || type === "symbol");
const serializer = (strict, json, $2, _) => {
  const as = (out, value) => {
    const index = _.push(out) - 1;
    $2.set(value, index);
    return index;
  };
  const pair = (value) => {
    if ($2.has(value))
      return $2.get(value);
    let [TYPE, type] = typeOf(value);
    switch (TYPE) {
      case PRIMITIVE: {
        let entry = value;
        switch (type) {
          case "bigint":
            TYPE = BIGINT;
            entry = value.toString();
            break;
          case "function":
          case "symbol":
            if (strict)
              throw new TypeError("unable to serialize " + type);
            entry = null;
            break;
        }
        return as([TYPE, entry], value);
      }
      case ARRAY: {
        if (type)
          return as([type, [...value]], value);
        const arr = [];
        const index = as([TYPE, arr], value);
        for (const entry of value)
          arr.push(pair(entry));
        return index;
      }
      case OBJECT: {
        if (type) {
          switch (type) {
            case "BigInt":
              return as([type, value.toString()], value);
            case "Boolean":
            case "Number":
            case "String":
              return as([type, value.valueOf()], value);
          }
        }
        if (json && "toJSON" in value)
          return pair(value.toJSON());
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const key of keys(value)) {
          if (strict || !shouldSkip(typeOf(value[key])))
            entries.push([pair(key), pair(value[key])]);
        }
        return index;
      }
      case DATE:
        return as([TYPE, value.toISOString()], value);
      case REGEXP: {
        const { source, flags } = value;
        return as([TYPE, { source, flags }], value);
      }
      case MAP: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const [key, entry] of value) {
          if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
            entries.push([pair(key), pair(entry)]);
        }
        return index;
      }
      case SET: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const entry of value) {
          if (strict || !shouldSkip(typeOf(entry)))
            entries.push(pair(entry));
        }
        return index;
      }
    }
    const { message } = value;
    return as([TYPE, { name: type, message }], value);
  };
  return pair;
};
const serialize = (value, { json, lossy } = {}) => {
  const _ = [];
  return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
};
var structuredClone = (any, options) => deserialize(serialize(any, options));
const INTERNAL = { tick: 0, pool: /* @__PURE__ */ new Map() };
function setTimeout(callback, delay = 0, ...args) {
  const func = __function_bind(callback, globalThis);
  const tick = ++INTERNAL.tick;
  const timeout = setTimeout$1(func, delay, ...args);
  INTERNAL.pool.set(tick, timeout);
  return tick;
}
function clearTimeout(timeoutId) {
  const timeout = INTERNAL.pool.get(timeoutId);
  if (timeout) {
    clearTimeout$1(timeout);
    INTERNAL.pool.delete(timeoutId);
  }
}
class TreeWalker {
  parentNode() {
    return null;
  }
  firstChild() {
    return null;
  }
  lastChild() {
    return null;
  }
  previousSibling() {
    return null;
  }
  nextSibling() {
    return null;
  }
  previousNode() {
    return null;
  }
  nextNode() {
    return null;
  }
  get currentNode() {
    const internals = internalsOf(this, "TreeWalker", "currentNode");
    return internals.currentNode;
  }
  get root() {
    const internals = internalsOf(this, "TreeWalker", "root");
    return internals.root;
  }
  get whatToShow() {
    const internals = internalsOf(this, "TreeWalker", "whatToShow");
    return internals.whatToShow;
  }
}
allowStringTag(TreeWalker);
class ImageData {
  constructor(arg0, arg1, ...args) {
    if (arguments.length < 2)
      throw new TypeError(`Failed to construct 'ImageData': 2 arguments required.`);
    const hasData = __object_isPrototypeOf(Uint8ClampedArray.prototype, arg0);
    const d2 = hasData ? arg0 : new Uint8ClampedArray(asNumber(arg0, "width") * asNumber(arg1, "height") * 4);
    const w2 = asNumber(hasData ? arg1 : arg0, "width");
    const h2 = d2.length / w2 / 4;
    const c2 = String(Object(hasData ? args[1] : args[0]).colorSpace || "srgb");
    if (args.length && asNumber(args[0], "height") !== h2)
      throw new DOMException("height is not equal to (4 * width * height)", "IndexSizeError");
    if (c2 !== "srgb" && c2 !== "rec2020" && c2 !== "display-p3")
      throw new TypeError("colorSpace is not known value");
    Object.defineProperty(this, "data", {
      configurable: true,
      enumerable: true,
      value: d2
    });
    INTERNALS.set(this, {
      width: w2,
      height: h2,
      colorSpace: c2
    });
  }
  get data() {
    internalsOf(this, "ImageData", "data");
    return Object.getOwnPropertyDescriptor(this, "data").value;
  }
  get width() {
    return internalsOf(this, "ImageData", "width").width;
  }
  get height() {
    return internalsOf(this, "ImageData", "height").height;
  }
}
allowStringTag(ImageData);
const asNumber = (value, axis) => {
  value = Number(value) || 0;
  if (value === 0)
    throw new TypeError(`The source ${axis} is zero or not a number.`);
  return value;
};
class CanvasRenderingContext2D {
  get canvas() {
    return internalsOf(this, "CanvasRenderingContext2D", "canvas").canvas;
  }
  get direction() {
    return internalsOf(this, "CanvasRenderingContext2D", "direction").direction;
  }
  get fillStyle() {
    return internalsOf(this, "CanvasRenderingContext2D", "fillStyle").fillStyle;
  }
  get filter() {
    return internalsOf(this, "CanvasRenderingContext2D", "filter").filter;
  }
  get globalAlpha() {
    return internalsOf(this, "CanvasRenderingContext2D", "globalAlpha").globalAlpha;
  }
  get globalCompositeOperation() {
    return internalsOf(this, "CanvasRenderingContext2D", "globalCompositeOperation").globalCompositeOperation;
  }
  get font() {
    return internalsOf(this, "CanvasRenderingContext2D", "font").font;
  }
  get imageSmoothingEnabled() {
    return internalsOf(this, "CanvasRenderingContext2D", "imageSmoothingEnabled").imageSmoothingEnabled;
  }
  get imageSmoothingQuality() {
    return internalsOf(this, "CanvasRenderingContext2D", "imageSmoothingQuality").imageSmoothingQuality;
  }
  get lineCap() {
    return internalsOf(this, "CanvasRenderingContext2D", "lineCap").lineCap;
  }
  get lineDashOffset() {
    return internalsOf(this, "CanvasRenderingContext2D", "lineDashOffset").lineDashOffset;
  }
  get lineJoin() {
    return internalsOf(this, "CanvasRenderingContext2D", "lineJoin").lineJoin;
  }
  get lineWidth() {
    return internalsOf(this, "CanvasRenderingContext2D", "lineWidth").lineWidth;
  }
  get miterLimit() {
    return internalsOf(this, "CanvasRenderingContext2D", "miterLimit").miterLimit;
  }
  get strokeStyle() {
    return internalsOf(this, "CanvasRenderingContext2D", "strokeStyle").strokeStyle;
  }
  get shadowOffsetX() {
    return internalsOf(this, "CanvasRenderingContext2D", "shadowOffsetX").shadowOffsetX;
  }
  get shadowOffsetY() {
    return internalsOf(this, "CanvasRenderingContext2D", "shadowOffsetY").shadowOffsetY;
  }
  get shadowBlur() {
    return internalsOf(this, "CanvasRenderingContext2D", "shadowBlur").shadowBlur;
  }
  get shadowColor() {
    return internalsOf(this, "CanvasRenderingContext2D", "shadowColor").shadowColor;
  }
  get textAlign() {
    return internalsOf(this, "CanvasRenderingContext2D", "textAlign").textAlign;
  }
  get textBaseline() {
    return internalsOf(this, "CanvasRenderingContext2D", "textBaseline").textBaseline;
  }
  arc() {
  }
  arcTo() {
  }
  beginPath() {
  }
  bezierCurveTo() {
  }
  clearRect() {
  }
  clip() {
  }
  closePath() {
  }
  createImageData(arg0, arg1) {
    const hasData = __object_isPrototypeOf(ImageData.prototype, arg0);
    const w2 = hasData ? arg0.width : arg0;
    const h2 = hasData ? arg0.height : arg1;
    const d2 = hasData ? arg0.data : new Uint8ClampedArray(w2 * h2 * 4);
    return new ImageData(d2, w2, h2);
  }
  createLinearGradient() {
  }
  createPattern() {
  }
  createRadialGradient() {
  }
  drawFocusIfNeeded() {
  }
  drawImage() {
  }
  ellipse() {
  }
  fill() {
  }
  fillRect() {
  }
  fillText() {
  }
  getContextAttributes() {
  }
  getImageData() {
  }
  getLineDash() {
  }
  getTransform() {
  }
  isPointInPath() {
  }
  isPointInStroke() {
  }
  lineTo() {
  }
  measureText() {
  }
  moveTo() {
  }
  putImageData() {
  }
  quadraticCurveTo() {
  }
  rect() {
  }
  resetTransform() {
  }
  restore() {
  }
  rotate() {
  }
  save() {
  }
  scale() {
  }
  setLineDash() {
  }
  setTransform() {
  }
  stroke() {
  }
  strokeRect() {
  }
  strokeText() {
  }
  transform() {
  }
  translate() {
  }
}
allowStringTag(CanvasRenderingContext2D);
const __createCanvasRenderingContext2D = (canvas) => {
  const renderingContext2D = Object.create(CanvasRenderingContext2D.prototype);
  INTERNALS.set(renderingContext2D, {
    canvas,
    direction: "inherit",
    fillStyle: "#000",
    filter: "none",
    font: "10px sans-serif",
    globalAlpha: 0,
    globalCompositeOperation: "source-over",
    imageSmoothingEnabled: false,
    imageSmoothingQuality: "high",
    lineCap: "butt",
    lineDashOffset: 0,
    lineJoin: "miter",
    lineWidth: 1,
    miterLimit: 10,
    shadowBlur: 0,
    shadowColor: "#000",
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    strokeStyle: "#000",
    textAlign: "start",
    textBaseline: "alphabetic"
  });
  return renderingContext2D;
};
class CustomElementRegistry {
  /** Defines a new custom element using the given tag name and HTMLElement constructor. */
  define(name, constructor, options) {
    const internals = internalsOf(this, "CustomElementRegistry", "define");
    name = String(name);
    if (/[A-Z]/.test(name))
      throw new SyntaxError("Custom element name cannot contain an uppercase ASCII letter");
    if (!/^[a-z]/.test(name))
      throw new SyntaxError("Custom element name must have a lowercase ASCII letter as its first character");
    if (!/-/.test(name))
      throw new SyntaxError("Custom element name must contain a hyphen");
    INTERNALS.set(constructor, {
      attributes: {},
      localName: name
    });
    internals.constructorByName.set(name, constructor);
    internals.nameByConstructor.set(constructor, name);
  }
  /** Returns the constructor associated with the given tag name. */
  get(name) {
    const internals = internalsOf(this, "CustomElementRegistry", "get");
    name = String(name).toLowerCase();
    return internals.constructorByName.get(name);
  }
  getName(constructor) {
    const internals = internalsOf(this, "CustomElementRegistry", "getName");
    return internals.nameByConstructor.get(constructor);
  }
}
allowStringTag(CustomElementRegistry);
const initCustomElementRegistry = (target, exclude) => {
  if (exclude.has("customElements"))
    return;
  const CustomElementRegistry2 = target.CustomElementRegistry || globalThis.CustomElementRegistry;
  const customElements = target.customElements || (target.customElements = new CustomElementRegistry2());
  INTERNALS.set(customElements, {
    constructorByName: /* @__PURE__ */ new Map(),
    nameByConstructor: /* @__PURE__ */ new Map()
  });
};
class Element extends Node {
  constructor() {
    super();
    if (INTERNALS.has(new.target)) {
      const internals = internalsOf(new.target, "Element", "localName");
      INTERNALS.set(this, {
        attributes: {},
        localName: internals.localName,
        ownerDocument: this.ownerDocument,
        shadowInit: null,
        shadowRoot: null
      });
    }
  }
  hasAttribute(name) {
    return false;
  }
  getAttribute(name) {
    return null;
  }
  setAttribute(name, value) {
  }
  removeAttribute(name) {
  }
  attachShadow(init) {
    if (arguments.length < 1)
      throw new TypeError(`Failed to execute 'attachShadow' on 'Element': 1 argument required, but only 0 present.`);
    if (init !== Object(init))
      throw new TypeError(`Failed to execute 'attachShadow' on 'Element': The provided value is not of type 'ShadowRootInit'.`);
    if (init.mode !== "open" && init.mode !== "closed")
      throw new TypeError(`Failed to execute 'attachShadow' on 'Element': Failed to read the 'mode' property from 'ShadowRootInit': The provided value '${init.mode}' is not a valid enum value of type ShadowRootMode.`);
    const internals = internalsOf(this, "Element", "attachShadow");
    if (internals.shadowRoot)
      throw new Error("The operation is not supported.");
    internals.shadowInit = internals.shadowInit || {
      mode: init.mode,
      delegatesFocus: Boolean(init.delegatesFocus)
    };
    internals.shadowRoot = internals.shadowRoot || (/^open$/.test(internals.shadowInit.mode) ? Object.setPrototypeOf(new EventTarget(), ShadowRoot.prototype) : null);
    return internals.shadowRoot;
  }
  get assignedSlot() {
    return null;
  }
  get innerHTML() {
    internalsOf(this, "Element", "innerHTML");
    return "";
  }
  set innerHTML(value) {
    internalsOf(this, "Element", "innerHTML");
  }
  get shadowRoot() {
    const internals = internalsOf(this, "Element", "shadowRoot");
    return Object(internals.shadowInit).mode === "open" ? internals.shadowRoot : null;
  }
  get localName() {
    return internalsOf(this, "Element", "localName").localName;
  }
  get nodeName() {
    return internalsOf(this, "Element", "nodeName").localName.toUpperCase();
  }
  get tagName() {
    return internalsOf(this, "Element", "tagName").localName.toUpperCase();
  }
}
class HTMLElement extends Element {
}
class HTMLBodyElement extends HTMLElement {
}
class HTMLDivElement extends HTMLElement {
}
class HTMLHeadElement extends HTMLElement {
}
class HTMLHtmlElement extends HTMLElement {
}
class HTMLSpanElement extends HTMLElement {
}
class HTMLStyleElement extends HTMLElement {
}
class HTMLTemplateElement extends HTMLElement {
}
class HTMLUnknownElement extends HTMLElement {
}
allowStringTag(Element);
allowStringTag(HTMLElement);
allowStringTag(HTMLBodyElement);
allowStringTag(HTMLDivElement);
allowStringTag(HTMLHeadElement);
allowStringTag(HTMLHtmlElement);
allowStringTag(HTMLSpanElement);
allowStringTag(HTMLStyleElement);
allowStringTag(HTMLTemplateElement);
allowStringTag(HTMLUnknownElement);
class Document extends Node {
  createElement(name) {
    const internals = internalsOf(this, "Document", "createElement");
    const customElementInternals = INTERNALS.get(internals.target.customElements);
    name = String(name).toLowerCase();
    const TypeOfHTMLElement = internals.constructorByName.get(name) || customElementInternals && customElementInternals.constructorByName.get(name) || HTMLUnknownElement;
    const element = Object.setPrototypeOf(new EventTarget(), TypeOfHTMLElement.prototype);
    INTERNALS.set(element, {
      attributes: {},
      localName: name,
      ownerDocument: this,
      shadowInit: null,
      shadowRoot: null
    });
    return element;
  }
  createNodeIterator(root, whatToShow = NodeFilter.SHOW_ALL, filter) {
    const target = Object.create(NodeIterator.prototype);
    INTERNALS.set(target, {
      filter,
      pointerBeforeReferenceNode: false,
      referenceNode: root,
      root,
      whatToShow
    });
    return target;
  }
  createTextNode(data) {
    return new Text(data);
  }
  createTreeWalker(root, whatToShow = NodeFilter.SHOW_ALL, filter, expandEntityReferences) {
    const target = Object.create(TreeWalker.prototype);
    INTERNALS.set(target, {
      filter,
      currentNode: root,
      root,
      whatToShow
    });
    return target;
  }
  get adoptedStyleSheets() {
    return [];
  }
  get styleSheets() {
    return [];
  }
}
class HTMLDocument extends Document {
}
allowStringTag(Document);
allowStringTag(HTMLDocument);
const initDocument = (target, exclude) => {
  if (exclude.has("document"))
    return;
  const EventTarget2 = target.EventTarget || globalThis.EventTarget;
  const HTMLDocument2 = target.HTMLDocument || globalThis.HTMLDocument;
  const document = target.document = Object.setPrototypeOf(new EventTarget2(), HTMLDocument2.prototype);
  INTERNALS.set(document, {
    target,
    constructorByName: /* @__PURE__ */ new Map([
      ["body", target.HTMLBodyElement],
      ["canvas", target.HTMLCanvasElement],
      ["div", target.HTMLDivElement],
      ["head", target.HTMLHeadElement],
      ["html", target.HTMLHtmlElement],
      ["img", target.HTMLImageElement],
      ["span", target.HTMLSpanElement],
      ["style", target.HTMLStyleElement]
    ]),
    nameByConstructor: /* @__PURE__ */ new Map()
  });
  const initElement = (name, Class) => {
    const target2 = Object.setPrototypeOf(new EventTarget2(), Class.prototype);
    INTERNALS.set(target2, {
      attributes: {},
      localName: name,
      ownerDocument: document,
      shadowRoot: null,
      shadowInit: null
    });
    return target2;
  };
  document.body = initElement("body", target.HTMLBodyElement);
  document.head = initElement("head", target.HTMLHeadElement);
  document.documentElement = initElement("html", target.HTMLHtmlElement);
};
class HTMLCanvasElement extends HTMLElement {
  get height() {
    return internalsOf(this, "HTMLCanvasElement", "height").height;
  }
  set height(value) {
    internalsOf(this, "HTMLCanvasElement", "height").height = Number(value) || 0;
  }
  get width() {
    return internalsOf(this, "HTMLCanvasElement", "width").width;
  }
  set width(value) {
    internalsOf(this, "HTMLCanvasElement", "width").width = Number(value) || 0;
  }
  captureStream() {
    return null;
  }
  getContext(contextType) {
    const internals = internalsOf(this, "HTMLCanvasElement", "getContext");
    switch (contextType) {
      case "2d":
        if (internals.renderingContext2D)
          return internals.renderingContext2D;
        internals.renderingContext2D = __createCanvasRenderingContext2D(this);
        return internals.renderingContext2D;
      default:
        return null;
    }
  }
  toBlob() {
  }
  toDataURL() {
  }
  transferControlToOffscreen() {
  }
}
allowStringTag(HTMLCanvasElement);
class HTMLImageElement extends HTMLElement {
  get src() {
    return internalsOf(this, "HTMLImageElement", "src").src;
  }
  set src(value) {
    const internals = internalsOf(this, "HTMLImageElement", "src");
    internals.src = String(value);
  }
}
allowStringTag(HTMLImageElement);
function Image() {
  INTERNALS.set(this, {
    attributes: {},
    localName: "img",
    innerHTML: "",
    shadowRoot: null,
    shadowInit: null
  });
}
Image.prototype = HTMLImageElement.prototype;
class MediaQueryList extends EventTarget {
  get matches() {
    return internalsOf(this, "MediaQueryList", "matches").matches;
  }
  get media() {
    return internalsOf(this, "MediaQueryList", "media").media;
  }
}
allowStringTag(MediaQueryList);
const initMediaQueryList = (target, exclude) => {
  if (exclude.has("MediaQueryList") || exclude.has("matchMedia"))
    return;
  const EventTarget2 = target.EventTarget || globalThis.EventTarget;
  const MediaQueryList2 = target.MediaQueryList || globalThis.MediaQueryList;
  target.matchMedia = function matchMedia(media) {
    const mql = Object.setPrototypeOf(new EventTarget2(), MediaQueryList2.prototype);
    INTERNALS.set(mql, {
      matches: false,
      media
    });
    return mql;
  };
};
class IntersectionObserver {
  disconnect() {
  }
  observe() {
  }
  takeRecords() {
    return [];
  }
  unobserve() {
  }
}
class MutationObserver {
  disconnect() {
  }
  observe() {
  }
  takeRecords() {
    return [];
  }
  unobserve() {
  }
}
class ResizeObserver {
  disconnect() {
  }
  observe() {
  }
  takeRecords() {
    return [];
  }
  unobserve() {
  }
}
allowStringTag(MutationObserver);
allowStringTag(IntersectionObserver);
allowStringTag(ResizeObserver);
class OffscreenCanvas extends EventTarget {
  constructor(width, height) {
    super();
    if (arguments.length < 2)
      throw new TypeError(`Failed to construct 'OffscreenCanvas': 2 arguments required.`);
    width = Number(width) || 0;
    height = Number(height) || 0;
    INTERNALS.set(this, { width, height });
  }
  get height() {
    return internalsOf(this, "OffscreenCanvas", "height").height;
  }
  set height(value) {
    internalsOf(this, "OffscreenCanvas", "height").height = Number(value) || 0;
  }
  get width() {
    return internalsOf(this, "OffscreenCanvas", "width").width;
  }
  set width(value) {
    internalsOf(this, "OffscreenCanvas", "width").width = Number(value) || 0;
  }
  getContext(contextType) {
    const internals = internalsOf(this, "HTMLCanvasElement", "getContext");
    switch (contextType) {
      case "2d":
        if (internals.renderingContext2D)
          return internals.renderingContext2D;
        internals.renderingContext2D = __createCanvasRenderingContext2D(this);
        return internals.renderingContext2D;
      default:
        return null;
    }
  }
  convertToBlob(options) {
    options = Object(options);
    Number(options.quality) || 0;
    const type = getImageType(String(options.type).trim().toLowerCase());
    return Promise.resolve(new Blob([], { type }));
  }
}
allowStringTag(OffscreenCanvas);
const getImageType = (type) => type === "image/avif" || type === "image/jpeg" || type === "image/png" || type === "image/webp" ? type : "image/png";
class Storage {
  clear() {
    internalsOf(this, "Storage", "clear").storage.clear();
  }
  getItem(key) {
    return getStringOrNull(internalsOf(this, "Storage", "getItem").storage.get(String(key)));
  }
  key(index) {
    return getStringOrNull([
      ...internalsOf(this, "Storage", "key").storage.keys()
    ][Number(index) || 0]);
  }
  removeItem(key) {
    internalsOf(this, "Storage", "getItem").storage.delete(String(key));
  }
  setItem(key, value) {
    internalsOf(this, "Storage", "getItem").storage.set(String(key), String(value));
  }
  get length() {
    return internalsOf(this, "Storage", "size").storage.size;
  }
}
const getStringOrNull = (value) => typeof value === "string" ? value : null;
const initStorage = (target, exclude) => {
  if (exclude.has("Storage") || exclude.has("localStorage"))
    return;
  target.localStorage = Object.create(Storage.prototype);
  const storageInternals = /* @__PURE__ */ new Map();
  INTERNALS.set(target.localStorage, {
    storage: storageInternals
  });
};
class StyleSheet {
}
class CSSStyleSheet extends StyleSheet {
  async replace(text) {
    return new CSSStyleSheet();
  }
  replaceSync(text) {
    return new CSSStyleSheet();
  }
  get cssRules() {
    return [];
  }
}
allowStringTag(StyleSheet);
allowStringTag(CSSStyleSheet);
class Window extends EventTarget {
  get self() {
    return this;
  }
  get top() {
    return this;
  }
  get window() {
    return this;
  }
  get innerHeight() {
    return 0;
  }
  get innerWidth() {
    return 0;
  }
  get scrollX() {
    return 0;
  }
  get scrollY() {
    return 0;
  }
}
allowStringTag(Window);
const initWindow = (target, exclude) => {
  if (exclude.has("Window") || exclude.has("window"))
    return;
  target.window = target;
};
function alert(...messages) {
  console.log(...messages);
}
const exclusionsForHTMLElement = [
  "CustomElementsRegistry",
  "HTMLElement",
  "HTMLBodyElement",
  "HTMLCanvasElement",
  "HTMLDivElement",
  "HTMLHeadElement",
  "HTMLHtmlElement",
  "HTMLImageElement",
  "HTMLStyleElement",
  "HTMLTemplateElement",
  "HTMLUnknownElement",
  "Image"
];
const exclusionsForElement = ["Element", ...exclusionsForHTMLElement];
const exclusionsForDocument = [
  "CustomElementsRegistry",
  "Document",
  "HTMLDocument",
  "document",
  "customElements"
];
const exclusionsForNode = [
  "Node",
  "DocumentFragment",
  "ShadowRoot",
  ...exclusionsForDocument,
  ...exclusionsForElement
];
const exclusionsForEventTarget = [
  "Event",
  "CustomEvent",
  "EventTarget",
  "OffscreenCanvas",
  "MediaQueryList",
  "Window",
  ...exclusionsForNode
];
const exclusionsForEvent = [
  "Event",
  "CustomEvent",
  "EventTarget",
  "MediaQueryList",
  "OffscreenCanvas",
  "Window",
  ...exclusionsForNode
];
const exclusions = {
  "Document+": exclusionsForDocument,
  "Element+": exclusionsForElement,
  "Event+": exclusionsForEvent,
  "EventTarget+": exclusionsForEventTarget,
  "HTMLElement+": exclusionsForHTMLElement,
  "Node+": exclusionsForNode,
  "StyleSheet+": ["StyleSheet", "CSSStyleSheet"]
};
const inheritance = {
  CSSStyleSheet: "StyleSheet",
  CustomEvent: "Event",
  DOMException: "Error",
  Document: "Node",
  DocumentFragment: "Node",
  Element: "Node",
  HTMLDocument: "Document",
  HTMLElement: "Element",
  HTMLBodyElement: "HTMLElement",
  HTMLCanvasElement: "HTMLElement",
  HTMLDivElement: "HTMLElement",
  HTMLHeadElement: "HTMLElement",
  HTMLHtmlElement: "HTMLElement",
  HTMLImageElement: "HTMLElement",
  HTMLSpanElement: "HTMLElement",
  HTMLStyleElement: "HTMLElement",
  HTMLTemplateElement: "HTMLElement",
  HTMLUnknownElement: "HTMLElement",
  Image: "HTMLElement",
  MediaQueryList: "EventTarget",
  Node: "EventTarget",
  OffscreenCanvas: "EventTarget",
  ShadowRoot: "DocumentFragment",
  Window: "EventTarget"
};
const polyfill = (target, options) => {
  const webAPIs = {
    ByteLengthQueuingStrategy,
    CanvasRenderingContext2D,
    CharacterData,
    Comment,
    CountQueuingStrategy,
    CSSStyleSheet,
    CustomElementRegistry,
    CustomEvent,
    Document,
    DocumentFragment,
    DOMException,
    Element,
    Event,
    EventTarget,
    File,
    FormData,
    HTMLDocument,
    HTMLElement,
    HTMLBodyElement,
    HTMLCanvasElement,
    HTMLDivElement,
    HTMLHeadElement,
    HTMLHtmlElement,
    HTMLImageElement,
    HTMLSpanElement,
    HTMLStyleElement,
    HTMLTemplateElement,
    HTMLUnknownElement,
    Headers,
    IntersectionObserver,
    Image,
    ImageData,
    MediaQueryList,
    MutationObserver,
    Node,
    NodeFilter: NodeFilter$1,
    NodeIterator: NodeIterator$1,
    OffscreenCanvas,
    ReadableByteStreamController,
    ReadableStream: ReadableStream$1,
    ReadableStreamBYOBReader,
    ReadableStreamBYOBRequest,
    ReadableStreamDefaultController,
    ReadableStreamDefaultReader,
    Request: Request$1,
    ResizeObserver,
    Response,
    ShadowRoot,
    Storage,
    StyleSheet,
    Text,
    TransformStream,
    TreeWalker,
    URLPattern: U,
    WritableStream,
    WritableStreamDefaultController,
    WritableStreamDefaultWriter,
    Window,
    alert,
    cancelAnimationFrame,
    cancelIdleCallback,
    clearTimeout,
    crypto: webcrypto,
    fetch,
    requestAnimationFrame,
    requestIdleCallback,
    setTimeout,
    structuredClone
  };
  const excludeOptions = new Set(typeof Object(options).exclude === "string" ? String(Object(options).exclude).trim().split(/\s+/) : Array.isArray(Object(options).exclude) ? Object(options).exclude.reduce((array, entry) => array.splice(array.length, 0, ...typeof entry === "string" ? entry.trim().split(/\s+/) : []) && array, []) : []);
  for (const excludeOption of excludeOptions) {
    if (excludeOption in exclusions) {
      for (const exclusion of exclusions[excludeOption]) {
        excludeOptions.add(exclusion);
      }
    }
  }
  for (const name of Object.keys(webAPIs)) {
    if (excludeOptions.has(name))
      continue;
    if (Object.hasOwnProperty.call(target, name))
      continue;
    Object.defineProperty(target, name, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: webAPIs[name]
    });
  }
  for (const name of Object.keys(webAPIs)) {
    if (excludeOptions.has(name))
      continue;
    if (!Object.hasOwnProperty.call(inheritance, name))
      continue;
    const Class = target[name];
    const Super = target[inheritance[name]];
    if (!Class || !Super)
      continue;
    if (Object.getPrototypeOf(Class.prototype) === Super.prototype)
      continue;
    Object.setPrototypeOf(Class.prototype, Super.prototype);
  }
  if (!excludeOptions.has("HTMLDocument") && !excludeOptions.has("HTMLElement")) {
    initDocument(target, excludeOptions);
    if (!excludeOptions.has("CustomElementRegistry")) {
      initCustomElementRegistry(target, excludeOptions);
    }
  }
  initMediaQueryList(target, excludeOptions);
  initStorage(target, excludeOptions);
  initWindow(target, excludeOptions);
  return target;
};
polyfill.internals = (target, name) => {
  const init = {
    CustomElementRegistry: initCustomElementRegistry,
    Document: initDocument,
    MediaQueryList: initMediaQueryList,
    Storage: initStorage,
    Window: initWindow
  };
  init[name](target, /* @__PURE__ */ new Set());
  return target;
};
nodePath.posix.join;
const ASTRO_LOCALS_HEADER = "x-astro-locals";
const clientAddressSymbol = Symbol.for("astro.clientAddress");
function get_raw_body(req, body_size_limit) {
  const h2 = req.headers;
  if (!h2["content-type"]) {
    return null;
  }
  const content_length = Number(h2["content-length"]);
  if (req.httpVersionMajor === 1 && isNaN(content_length) && h2["transfer-encoding"] == null || content_length === 0) {
    return null;
  }
  let length = content_length;
  if (body_size_limit) {
    if (!length) {
      length = body_size_limit;
    } else if (length > body_size_limit) {
      throw new HTTPError(
        413,
        `Received content-length of ${length}, but only accept up to ${body_size_limit} bytes.`
      );
    }
  }
  if (req.destroyed) {
    const readable = new ReadableStream();
    readable.cancel();
    return readable;
  }
  let size = 0;
  let cancelled = false;
  return new ReadableStream({
    start(controller) {
      req.on("error", (error) => {
        cancelled = true;
        controller.error(error);
      });
      req.on("end", () => {
        if (cancelled)
          return;
        controller.close();
      });
      req.on("data", (chunk) => {
        if (cancelled)
          return;
        size += chunk.length;
        if (size > length) {
          cancelled = true;
          controller.error(
            new HTTPError(
              413,
              `request body size exceeded ${content_length ? "'content-length'" : "BODY_SIZE_LIMIT"} of ${length}`
            )
          );
          return;
        }
        controller.enqueue(chunk);
        if (controller.desiredSize === null || controller.desiredSize <= 0) {
          req.pause();
        }
      });
    },
    pull() {
      req.resume();
    },
    cancel(reason) {
      cancelled = true;
      req.destroy(reason);
    }
  });
}
async function getRequest(base, req, bodySizeLimit) {
  let headers = req.headers;
  let request = new Request(base + req.url, {
    // @ts-expect-error -- duplex does exist in Vercel requests
    duplex: "half",
    method: req.method,
    headers,
    body: get_raw_body(req, bodySizeLimit)
  });
  Reflect.set(request, clientAddressSymbol, headers["x-forwarded-for"]);
  return request;
}
async function setResponse(app, res, response) {
  const headers = Object.fromEntries(response.headers);
  let cookies = [];
  if (response.headers.has("set-cookie")) {
    const header = response.headers.get("set-cookie");
    const split = splitCookiesString(header);
    cookies = split;
  }
  if (app.setCookieHeaders) {
    for (const setCookieHeader of app.setCookieHeaders(response)) {
      cookies.push(setCookieHeader);
    }
  }
  res.writeHead(response.status, { ...headers, "set-cookie": cookies });
  if (!response.body) {
    res.end();
    return;
  }
  if (response.body.locked) {
    res.write(
      `Fatal error: Response body is locked. This can happen when the response was already read (for example through 'response.json()' or 'response.text()').`
    );
    res.end();
    return;
  }
  const reader = response.body.getReader();
  if (res.destroyed) {
    reader.cancel();
    return;
  }
  const cancel = (error) => {
    res.off("close", cancel);
    res.off("error", cancel);
    reader.cancel(error).catch(() => {
    });
    if (error)
      res.destroy(error);
  };
  res.on("close", cancel);
  res.on("error", cancel);
  next();
  async function next() {
    try {
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done)
          break;
        if (!res.write(value)) {
          res.once("drain", next);
          return;
        }
      }
      res.end();
    } catch (error) {
      cancel(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
class HTTPError extends Error {
  constructor(status, reason) {
    super(reason);
    this.status = status;
  }
  get reason() {
    return super.message;
  }
}
polyfill(globalThis, {
  exclude: "window document"
});
const createExports = (manifest) => {
  const app = new App(manifest);
  const handler = async (req, res) => {
    let request;
    try {
      request = await getRequest(`https://${req.headers.host}`, req);
    } catch (err) {
      res.statusCode = err.status || 400;
      return res.end(err.reason || "Invalid request body");
    }
    let routeData = app.match(request);
    let locals = {};
    if (request.headers.has(ASTRO_LOCALS_HEADER)) {
      let localsAsString = request.headers.get(ASTRO_LOCALS_HEADER);
      if (localsAsString) {
        locals = JSON.parse(localsAsString);
      }
    }
    await setResponse(app, res, await app.render(request, routeData, locals));
  };
  return { default: handler };
};
const adapter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createExports
}, Symbol.toStringTag, { value: "Module" }));
const _page0 = () => import("./chunks/index@_@astro.897dad7f.mjs");
const _page1 = () => import("./chunks/3dgallery@_@astro.c48493d3.mjs");
const _page2 = () => import("./chunks/workshops@_@astro.97cf4b31.mjs");
const _page3 = () => import("./chunks/_slug_@_@astro.d890d1f6.mjs");
const _page4 = () => import("./chunks/gallery@_@astro.533f5f7f.mjs");
const _page5 = () => import("./chunks/editor@_@astro.5ab09aef.mjs");
const pageMap = /* @__PURE__ */ new Map([["src/pages/index.astro", _page0], ["src/pages/3dgallery.astro", _page1], ["src/pages/workshops.astro", _page2], ["src/pages/workshop/[slug].astro", _page3], ["src/pages/gallery.astro", _page4], ["src/pages/editor.astro", _page5]]);
const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.a56b2845.js"}],"styles":[{"type":"external","src":"/_astro/editor.a3dc65d4.css"},{"type":"external","src":"/_astro/index.29f42522.css"},{"type":"external","src":"/_astro/editor.7f43f5d1.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/3dgallery.4de5461e.css"}],"routeData":{"route":"/3dgallery","type":"page","pattern":"^\\/3dgallery\\/?$","segments":[[{"content":"3dgallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/3dgallery.astro","pathname":"/3dgallery","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/editor.a3dc65d4.css"},{"type":"external","src":"/_astro/workshops.32dac208.css"}],"routeData":{"route":"/workshops","type":"page","pattern":"^\\/workshops\\/?$","segments":[[{"content":"workshops","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/workshops.astro","pathname":"/workshops","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/editor.a3dc65d4.css"},{"type":"external","src":"/_astro/_slug_.c623e9d9.css"}],"routeData":{"route":"/workshop/[slug]","type":"page","pattern":"^\\/workshop\\/([^/]+?)\\/?$","segments":[[{"content":"workshop","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/workshop/[slug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/editor.a3dc65d4.css"},{"type":"external","src":"/_astro/gallery.0668ae95.css"}],"routeData":{"route":"/gallery","type":"page","pattern":"^\\/gallery\\/?$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery.astro","pathname":"/gallery","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/editor.a3dc65d4.css"},{"type":"external","src":"/_astro/editor.7f43f5d1.css"}],"routeData":{"route":"/editor","type":"page","pattern":"^\\/editor\\/?$","segments":[[{"content":"editor","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/editor.astro","pathname":"/editor","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"site":"https://editor.haxidraw.hackclub.com","base":"/","compressHTML":false,"markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"gfm":true,"smartypants":true},"componentMetadata":[["/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/editor.astro",{"propagation":"none","containsHead":true}],["/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/gallery.astro",{"propagation":"none","containsHead":true}],["/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/workshop/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/workshops.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/workshop/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/workshops@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,n)=>{let s=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),s();break}});for(let e of n.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"_@astrojs-ssr-virtual-entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/3dgallery.astro":"chunks/pages/3dgallery.astro.fa94125f.mjs","/src/pages/gallery.astro":"chunks/pages/gallery.astro.cae98906.mjs","/src/pages/workshops.astro":"chunks/pages/workshops.astro.e0f57234.mjs","/src/pages/index.astro":"chunks/pages/index.astro.4a8a7902.mjs","\u0000@astro-page:src/pages/workshops@_@astro":"chunks/workshops@_@astro.97cf4b31.mjs","\u0000@astro-page:src/pages/gallery@_@astro":"chunks/gallery@_@astro.533f5f7f.mjs","\u0000@astro-page:src/pages/3dgallery@_@astro":"chunks/3dgallery@_@astro.c48493d3.mjs","\u0000@astro-page:src/pages/workshop/[slug]@_@astro":"chunks/_slug_@_@astro.d890d1f6.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index@_@astro.897dad7f.mjs","/src/pages/editor.astro":"chunks/pages/editor.astro.a1415b69.mjs","\u0000@astro-page:src/pages/editor@_@astro":"chunks/editor@_@astro.5ab09aef.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/cubic_disarray.md?astroContentCollectionEntry=true":"chunks/cubic_disarray.c0659e9f.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/leaf.md?astroContentCollectionEntry=true":"chunks/leaf.cfd745dd.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/10PRINT2.md?astroContentCollectionEntry=true":"chunks/10PRINT2.31530e27.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/landscape.md?astroContentCollectionEntry=true":"chunks/landscape.4bdc65ff.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/joydivision.md?astroContentCollectionEntry=true":"chunks/joydivision.67632fc2.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/eca.md?astroContentCollectionEntry=true":"chunks/eca.32ec33a7.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/mesh.md?astroContentCollectionEntry=true":"chunks/mesh.a795261a.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/10PRINT.md?astroContentCollectionEntry=true":"chunks/10PRINT.814479bf.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/raymarching.md?astroContentCollectionEntry=true":"chunks/raymarching.ae24c896.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/10PRINT.md?astroPropagatedAssets":"chunks/10PRINT.d2118de1.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/eca.md?astroPropagatedAssets":"chunks/eca.367df399.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/roots.md?astroContentCollectionEntry=true":"chunks/roots.182fd411.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/landscape.md?astroPropagatedAssets":"chunks/landscape.30d54600.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/leaf.md?astroPropagatedAssets":"chunks/leaf.0ac15625.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/square-disarray.md?astroPropagatedAssets":"chunks/square-disarray.299d80ef.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/mesh.md?astroPropagatedAssets":"chunks/mesh.7c65a171.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/joydivision.md?astroPropagatedAssets":"chunks/joydivision.a6b24725.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/cubic_disarray.md?astroPropagatedAssets":"chunks/cubic_disarray.5c9f2207.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/10PRINT2.md?astroPropagatedAssets":"chunks/10PRINT2.fca8169a.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/square-disarray.md?astroContentCollectionEntry=true":"chunks/square-disarray.cac8a68b.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/raymarching.md?astroPropagatedAssets":"chunks/raymarching.7cbba74d.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/roots.md?astroPropagatedAssets":"chunks/roots.745ec90c.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/eca.md":"chunks/eca.bec644b6.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/10PRINT.md":"chunks/10PRINT.4cdb1128.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/cubic_disarray.md":"chunks/cubic_disarray.460ecca4.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/10PRINT2.md":"chunks/10PRINT2.2d9ffb09.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/mesh.md":"chunks/mesh.e9a49a04.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/joydivision.md":"chunks/joydivision.8670fafe.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/landscape.md":"chunks/landscape.3e383ec8.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/leaf.md":"chunks/leaf.e4fdcc87.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/square-disarray.md":"chunks/square-disarray.4a232b0a.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/roots.md":"chunks/roots.6ec1c271.mjs","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/raymarching.md":"chunks/raymarching.ac609cec.mjs","@astrojs/preact/client.js":"_astro/client.a191fd77.js","/astro/hoisted.js?q=0":"_astro/hoisted.a56b2845.js","/Users/jchen/Documents/Programming/prs/haxidraw/astro/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.3b35dbc4.js","/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/Editor.tsx":"_astro/Editor.b091f5fd.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/3dgallery.4de5461e.css","/_astro/_slug_.c623e9d9.css","/_astro/editor.7f43f5d1.css","/_astro/editor.a3dc65d4.css","/_astro/gallery.0668ae95.css","/_astro/index.29f42522.css","/_astro/workshops.32dac208.css","/blot-bot-clear.png","/blot-bot-yellow.png","/blot-bot.png","/favicon.svg","/hackclub.png","/_astro/Editor.b091f5fd.js","/_astro/client.a191fd77.js","/_astro/editor.19beca6a.a6416c6a.js","/_astro/hoisted.a56b2845.js","/_astro/hooks.module.81959310.js","/_astro/preact.module.5538535e.js","/_astro/signals.module.3b35dbc4.js","/_astro/state.84f5a575.js","/art/README.md","/art/list.json","/art/landscape-henry/index.js","/art/eca-henry/eca.js","/art/hilbert-golf-henry/index.js","/art/leaf-leo/index.js","/art/raymarching-henry/raymarch.js","/art/square-disarray-leo/index.js","/art/roots-kai/index.js","/art/tree-leo/index.js","/art/landscape-henry/snapshots/landscape.png","/art/eca-henry/snapshots/eca1.png","/art/eca-henry/snapshots/eca2.png","/art/eca-henry/snapshots/eca3.png","/art/eca-henry/snapshots/eca4.png","/art/hilbert-golf-henry/snapshots/hilbert-golf.png","/art/leaf-leo/snapshots/leaf.png","/art/raymarching-henry/snapshots/raymarching1.png","/art/square-disarray-leo/snapshots/0.png","/art/roots-kai/snapshots/roots.png","/art/tidal-flats-leo/snapshots/tidalFlats.png","/art/tree-leo/snapshots/tree.png"]}), {
  pageMap,
  renderers
});
const _args = void 0;
const _exports = createExports(_manifest);
const _default = _exports["default"];
const _start = "start";
if (_start in adapter) {
  adapter[_start](_manifest, _args);
}
export {
  _default as default,
  pageMap
};
