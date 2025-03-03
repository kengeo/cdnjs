(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RxPlayer"] = factory();
	else
		root["RxPlayer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 138);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(12);
var toSubscriber_1 = __webpack_require__(263);
var observable_1 = __webpack_require__(48);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Levels = {
  NONE: 0,
  ERROR: 1,
  WARNING: 2,
  INFO: 3,
  DEBUG: 4
};
var noop = function noop() {};

function log() {}
log.error = noop;
log.warn = noop;
log.info = noop;
log.debug = noop;
log.setLevel = function (level) {
  if (typeof level == "string") {
    level = Levels[level];
  }

  log.error = level >= Levels.ERROR ? console.error.bind(console) : noop;
  log.warn = level >= Levels.WARNING ? console.warn.bind(console) : noop;
  log.info = level >= Levels.INFO ? console.info.bind(console) : noop;
  log.debug = level >= Levels.DEBUG ? console.log.bind(console) : noop;
};

/* harmony default export */ __webpack_exports__["a"] = (log);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function AssertionError(message) {
  this.name = "AssertionError";
  this.message = message;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, AssertionError);
  }
}
AssertionError.prototype = new Error();

/**
 * @param {*} value
 * @param {string} message
 * @throws AssertionError - Throws if the value given is falsy
 */
function assert(value, message) {
  if (!value) {
    throw new AssertionError(message);
  }
}

assert.equal = function (a, b, message) {
  return assert(a === b, message);
};

/**
 * @param {Object} o
 * @param {string} name - name of the _interface_
 * @param {Object} iface - Contains the checked keynames of O and link them
 * to their types (obtained through the typeof operator).
 * @throws AssertionError - The argument o given is not an object
 * @throws AssertionError - The _interface_ is not respected.
 */
assert.iface = function (o, name, iface) {
  assert(o, name + " should be an object");
  for (var k in iface) {
    assert.equal(_typeof(o[k]), iface[k], name + " should have property " + k + " as a " + iface[k]);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (assert);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(51);
var Subscription_1 = __webpack_require__(11);
var Observer_1 = __webpack_require__(71);
var rxSubscriber_1 = __webpack_require__(49);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* harmony default export */ __webpack_exports__["a"] = ({
  /**
   * Volume set on unMute if the volume is set to 0 and either:
   *   - mute has never been called before
   *   - mute has last been called while the volume was already set to 0 (either
   *     via setVolume, or a previous mute call)
   * @type {Number}
   */
  DEFAULT_UNMUTED_VOLUME: 0.1,

  /**
   * Default audio track configuration, if none is set by the user.
   * Here in french for legacy reasons.
   * @type {Object}
   */
  DEFAULT_AUDIO_TRACK: {
    language: "fra",
    audioDescription: false
  },

  /**
   * Default text track configuration, if none is set by the user.
   * @type {Object|null}
   */
  DEFAULT_TEXT_TRACK: null,

  /**
   * If set to true, video through loadVideo will auto play by default
   * @type {Boolean}
   */
  DEFAULT_AUTO_PLAY: false,

  /**
   * If set to false, subtitles will be hidden by default.
   * @type {Boolean}
   */
  DEFAULT_SHOW_SUBTITLE: true,

  /*
   * Default buffer goal in seconds. Once this amount of time reached ahead in
   * the buffer, the player won't automatically download segments.
   * @type {Number}
   */
  DEFAULT_WANTED_BUFFER_AHEAD: 30,

  /*
   * Default max buffer size ahead of the current position in seconds.
   * The buffer _after_ this limit will be garbage collected.
   * Set to Infinity for no limit.
   * @type {Number}
   */
  DEFAULT_MAX_BUFFER_AHEAD: Infinity,

  /*
   * Default max buffer size ahead of the current position in seconds.
   * The buffer _before_ this limit will be garbage collected.
   * Set to Infinity for no limit.
   * @type {Number}
   */
  DEFAULT_MAX_BUFFER_BEHIND: Infinity,

  /**
   * Default bitrate ceils initially set as the first content begins.
   *
   * If no track is found with a bitrate inferior or equal to the
   * bitrate there, the one with the lowest bitrate will be taken instead.
   *
   * Set to 0 for the lowest bitrate, Infinity for the highest.
   *
   * These values are only useful for the first content played, as consecutive
   * play will always take the last set one.
   * @type {Object}
   */
  DEFAULT_INITIAL_BITRATES: {
    audio: 0, // only "audio" segments
    video: 0, // only "video" segments
    other: 0 // tracks which are not audio/video (text images).
    // Though those are generally at a single bitrate, so no adaptive
    // mechanism is triggered for them.
  },

  /**
   * Default bitrate ceil initially set to dictate the maximum bitrate the
   * ABR manager can automatically switch to.
   *
   * If no track is found with a quality inferior or equal to the
   * bitrate there, the lowest bitrate will be taken instead.
   *
   * Set to Infinity to discard any limit in the ABR strategy.
   * @type {Object}
   */
  DEFAULT_MAX_BITRATES: {
    audio: Infinity, // only "audio" segments
    video: Infinity, // only "video" segments
    other: Infinity // tracks which are not audio/video
    // Though those are generally at a single bitrate, so no
    // adaptive mechanism is triggered for them.
  },

  /**
   * Buffer threshold ratio used as a lower bound margin to find the suitable
   * representation.
   * @param {Number}
   */
  DEFAULT_ADAPTIVE_BUFFER_THRESHOLD: 0.3,

  /**
   * Delay after which, if the page is hidden, the user is considered inactive
   * on the current video. Allow to enforce specific optimizations when the
   * page is not shown.
   * @see DEFAULT_THROTTLE_WHEN_HIDDEN
   * @type {Number}
   */
  INACTIVITY_DELAY: 60 * 1000,

  /**
   * If true, if the player is in a "hidden" state for a delay specified by the
   * INACTIVITY DELAY config property, we throttle automatically to the video
   * representation with the lowest bitrate.
   * @type {Boolean}
   */
  DEFAULT_THROTTLE_WHEN_HIDDEN: false,

  /**
   * If true, the video representations you can switch to in adaptive mode
   * are limited by the video element's width.
   * @type {Boolean}
   */
  DEFAULT_LIMIT_VIDEO_WIDTH: false,

  /**
   * Default initial live gap considered if no presentation delay has been
   * suggested, in seconds.
   * @type {Number}
   */
  DEFAULT_LIVE_GAP: 10,

  /**
   * Default value for a manifest's suggested presentation delay if not
   * specified in the manifest.
   * @type {Object}
   */
  DEFAULT_SUGGESTED_PRESENTATION_DELAY: {
    SMOOTH: 10,
    DASH: 10
  },

  /**
   * Maximum time, in seconds, the player should automatically skip when stalled
   * because of a discontinuity in the downloaded range.
   * @type {Number}
   */
  DISCONTINUITY_THRESHOLD: 1,

  /**
   * Time before the end of a video (in seconds) at which the player should
   * automatically stop.
   * It happens often that the video gets stuck 100 to 300 ms before the end,
   * especially on IE11 and Edge
   * @type {Number}
   */
  END_OF_PLAY: 0.5,

  /**
   * Ratio used to know if an already loaded segment should be re-buffered.
   * We re-load the given segment if the current one times that ratio is
   * inferior to the new one.
   * @type {Number}
   */
  BITRATE_REBUFFERING_RATIO: 1.5,

  /**
   * Those are used when a "QuotaExceededError" error is received after
   * appending a new segment in the source buffer.
   *
   * This error can arise when the browser's buffer is considered full.
   * In this case, the player goes into manual garbage collection (GC) mode.
   * @type {Object}
   */
  BUFFER_GC_GAPS: {
    /**
     * _Low_ gap (from current position) from which the buffer will be _garbage
     * collected_ (read removed from the buffer) when a QuotaExceededError is
     * received.
     * In seconds.
     * @type {Number}
     */
    CALM: 240,

    /**
     * _High_ gap (from current position) from which the buffer will be _garbage
     * collected_ (read removed from the buffer) when a QuotaExceededError is
     * received, if the low one does not clean up any buffer.
     * In seconds.
     * @type {Number}
     */
    BEEFY: 30
  },

  /**
   * The default number of times a pipeline request will be re-performed when
   * on error which justify a retry.
   *
   * Note that some errors do not use this counter:
   *   - if the error is not due to the xhr, no retry will be peformed
   *   - if the error is an HTTP error code, but not a 500-smthg or a 404, no
   *     retry will be performed.
   *   - if it has a high chance of being due to the user being offline, a
   *     separate counter is used (see DEFAULT_MAX_PIPELINES_RETRY_ON_OFFLINE).
   * @type Number
   */
  DEFAULT_MAX_PIPELINES_RETRY_ON_ERROR: 4,

  /**
   * Under some circonstances, we're able to tell that the user is offline (see
   * the compat files).
   * When this happens, and xhr requests fails due to an error event (you might
   * still be able to perform xhr offline, e.g. on localhost), you might want to
   * retry indefinitely or with a higher number of retry than if the error is
   * due to a CDN problem.
   *
   * A capped exponential backoff will still be used (like for an error code).
   * @type {Number}
   */
  DEFAULT_MAX_PIPELINES_RETRY_ON_OFFLINE: Infinity,

  /**
   * Initial backoff delay when a segment / manifest download fails, in
   * milliseconds.
   *
   * This delay will then grow exponentally by power of twos (200, 400, 800
   * etc.)
   *
   * Please note that this delay is not exact, as it will be fuzzed.
   * @type {Number}
   */
  INITIAL_BACKOFF_DELAY_BASE: 200,

  /**
   * Maximum backoff delay when a segment / manifest download fails, in
   * milliseconds.
   *
   * Please note that this delay is not exact, as it will be fuzzed.
   * @type {Number}
   */
  MAX_BACKOFF_DELAY_BASE: 3000,

  /**
   * Minimum interval at which timeupdate events will be "constructed". This
   * variable is for the "regular" mediasource strategy (that is, not for the
   * directfile API.
   *
   * Those events are the base of various important mechanisms in the player:
   *   - set the clock for the buffer.
   *   - set the clock for the ABR strategy.
   *   - used to trigger positionUpdate events.
   *
   * This common logic is for performance reasons, as we call multiple browser's
   * APIs which are useful for most of these.
   *
   * Keep in mind this is the minimum interval. This logic will also be
   * triggered when various events of the media element are received.
   * @type {Number}
   */
  SAMPLING_INTERVAL_MEDIASOURCE: 1000,

  /**
   * Same than SAMPLING_INTERVAL_MEDIASOURCE but for the directfile API.
   * @type {Number}
   */
  SAMPLING_INTERVAL_NO_MEDIASOURCE: 500,

  /**
   * Minimum number of bytes sampled before we trust the estimate.
   * If we have not sampled much data, our estimate may not be accurate
   * enough to trust.
   * If bytesSampled_ is less than minTotalBytes_, we use defaultEstimate_.
   * This specific value is based on experimentation.
   * @type {Number}
   */
  ABR_MINIMUM_TOTAL_BYTES: 128e3,

  /**
   * Minimum number of bytes, under which samples are discarded.
   * Our models do not include latency information, so connection startup time
   * (time to first byte) is considered part of the download time.
   * Because of this, we should ignore very small downloads which would cause
   * our estimate to be too low.
   * This specific value is based on experimentation.
   * @type {Number}
   */
  ABR_MINIMUM_CHUNK_SIZE: 16e3,

  /**
   * If a SourceBuffer has less than this amount of seconds ahead of the current
   * position in its buffer, the ABR manager will go into starvation mode.
   *
   * It gets out of starvation mode when the OUT_OF_STARVATION_GAP value is
   * reached.
   *
   * Under this mode:
   *   - the bandwidth considered will be a little lower than the one estimated
   *   - the time the next important request take will be checked
   *     multiple times to detect when/if it takes too much time.
   *     If the request is considered too long, the bitrate will be hastily
   *     re-calculated from this single request.
   * @type {Number}
   */
  ABR_STARVATION_GAP: 5,

  OUT_OF_STARVATION_GAP: 7,

  /**
   * Number of seconds ahead in the buffer after which playback will resume when
   * seeking on an unbuffered part of the stream.
   * @type {Number}
   */
  RESUME_AFTER_SEEKING_GAP: 0.5,

  /**
   * Number of seconds ahead in the buffer after which playback will resume
   * after the player went through a buffering step.
   * @type {Number}
   */
  RESUME_AFTER_BUFFERING_GAP: 5,

  /**
   * Maximum number of seconds in the buffer based on which a "stalling"
   * strategy will be considered:
   * The player will pause playback to get enough time building a sufficient
   * buffer. This mostly happen when seeking in an unbuffered part or when
   * buffering.
   * @type {Number}
   */
  STALL_GAP: 0.5,

  /**
   * Maximum difference allowed between a segment _announced_ start (what the
   * rx-player infers to be the starting time) and its _real_  current starting
   * time in the source buffer, in seconds, until the segment is considered
   * "incomplete".
   * Same for the ending time announced and its effective end time in the source
   * buffer.
   *
   * If the difference is bigger than this value, the segment will be considered
   * incomplete (e.g. considered as partially garbage-collected) and as such
   * might be re-downloaded.
   *
   * Keeping a too high value might lead to incomplete segments being wrongly
   * considered as complete (and thus not be re-downloaded, this could lead the
   * player to stall).
   * Note that in a worst-case scenario this can happen for the end of a segment
   * and the start of the contiguous segment, leading to a discontinuity two
   * times this value.
   *
   * Keeping a too low value might lead to re-downloading the same segment
   * multiple times (when the start and end times are badly estimated) as they
   * will wrongly believed to be partially garbage-collected.
   *
   * If a segment has a perfect continuity with a previous/following one in the
   * source buffer the start/end of it will not be checked. This allows to limit
   * the number of time this error-prone logic is applied.
   *
   * Note that in most cases, the rx-player's start and end times estimations
   * are __really__ close to what they really are in the sourcebuffer (we
   * usually have a difference in the order of 10^-7), as time information is
   * most of the time directly parsed from the media container.
   *
   * TODO A maybe cleaner way would be to also consider the real duration of a
   * segment in the equation here.
   * @type {Number}
   */
  MAX_MISSING_FROM_COMPLETE_SEGMENT: 0.12,

  /**
   * The maximum time, in seconds, the real buffered time in the sourcebuffer
   * can be superior to the time inferred by the rx-player (the "real" buffered
   * start inferior to the inferred start and the "real" buffered end superior
   * to the inferred end).
   * This limit allows to avoid resizing too much downloaded segments because
   * no other segment is linked to a buffered part.
   *
   * Setting a value too high can lead to parts of the source buffer being
   * linked to the wrong segments.
   * Setting a value too low can lead to parts of the source buffer not being
   * linked to the concerned segment.
   * @type {Number}
   */
  MAX_BUFFERED_DISTANCE: 0.1,

  /**
   * Minimum duration in seconds a segment should be into a buffered range to be
   * considered as part of that range.
   * Segments which have less than this amount of time "linked" to a buffered
   * range will be deleted.
   *
   * Setting a value too low can lead in worst-case scenarios to segments being
   * wrongly linked to the next or previous range it is truly linked too (if
   * those ranges are too close).
   *
   * Setting a value too high can lead to part of the buffer not being assigned
   * any segment. It also limits the minimum duration a segment can be.
   *
   * TODO As of now, this limits the minimum size a complete segment can be. A
   * better logic would be to also consider the duration of a segment. Though
   * this logic could lead to bugs with the current code.
   * @type {Number}
   */
  MINIMUM_SEGMENT_SIZE: 0.3,

  /**
   * Robustnesses used in the {audio,video}Capabilities of the
   * MediaKeySystemConfiguration (EME).
   * Defined in order of importance.
   * @type {Array.<string>}
   */
  EME_DEFAULT_WIDEVINE_ROBUSTNESSES: ["HW_SECURE_ALL", "HW_SECURE_DECODE", "HW_SECURE_CRYPTO", "SW_SECURE_DECODE", "SW_SECURE_CRYPTO"],

  /**
   * @type {Object}
   */
  EME_KEY_SYSTEMS: {
    clearkey: ["webkit-org.w3.clearkey", "org.w3.clearkey"],
    widevine: ["com.widevine.alpha"],
    playready: ["com.microsoft.playready", "com.chromecast.playready", "com.youtube.playready"]
  }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var Subscriber_1 = __webpack_require__(3);
var Subscription_1 = __webpack_require__(11);
var ObjectUnsubscribedError_1 = __webpack_require__(50);
var SubjectSubscription_1 = __webpack_require__(72);
var rxSubscriber_1 = __webpack_require__(49);
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isKnownError; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EncryptedMediaError_js__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__IndexError_js__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MediaError_js__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NetworkError_js__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__OtherError_js__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RequestError_js__ = __webpack_require__(137);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__constants_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__constants_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__constants_js__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__EncryptedMediaError_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__IndexError_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__MediaError_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_4__NetworkError_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__OtherError_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__RequestError_js__["a"]; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */










/**
 * Whether the error given has a type defined here.
 * @param {Error} error
 * @returns {Boolean}
 */
function isKnownError(error) {
  return !!error && !!error.type && __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* ErrorTypes */].keys.indexOf(error.type) >= 0;
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return addTextTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return canPlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return canSeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return clearVideoSrc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return isCodecSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return isOffline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return isPlaybackStuck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return isVTTSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return shouldRenewMediaKeys; });
/* unused harmony export sourceOpen */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_rx_onEvent_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_eventemitter__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__events_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fullscreen_js__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__eme__ = __webpack_require__(88);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__constants_js__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__eme__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_3__constants_js__["a"]; });
/* unused harmony reexport events */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__fullscreen_js__["a"]; });
/* unused harmony reexport isFirefox */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__fullscreen_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_3__constants_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__fullscreen_js__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__eme__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__eme__["c"]; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */










function isCodecSupported(codec) {
  return !!__WEBPACK_IMPORTED_MODULE_3__constants_js__["a" /* MediaSource_ */] && __WEBPACK_IMPORTED_MODULE_3__constants_js__["a" /* MediaSource_ */].isTypeSupported(codec);
}

function shouldRenewMediaKeys() {
  return __WEBPACK_IMPORTED_MODULE_3__constants_js__["b" /* isIE */];
}

/**
 * Wait for the MediaSource's sourceopen event and emit. Emit immediatelly if
 * already received.
 * @param {MediaSource}
 * @returns {Observable}
 */
function sourceOpen(mediaSource) {
  if (mediaSource.readyState == "open") {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(null);
  } else {
    return __WEBPACK_IMPORTED_MODULE_4__events_js__["e" /* sourceOpen */](mediaSource).take(1);
  }
}

/**
 * Returns an observable emitting a single time, as soon as a seek is possible
 * (the metatada are loaded).
 * @param {HTMLMediaElement} videoElement
 * @returns {Observable}
 */
function canSeek(videoElement) {
  if (videoElement.readyState >= __WEBPACK_IMPORTED_MODULE_3__constants_js__["c" /* READY_STATES */].HAVE_METADATA) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(null);
  } else {
    return __WEBPACK_IMPORTED_MODULE_4__events_js__["f" /* loadedMetadata */](videoElement).take(1);
  }
}

/**
 * Returns ane observable emitting a single time, as soon as a play is possible.
 * @param {HTMLMediaElement} videoElement
 * @returns {Observable}
 */
function canPlay(videoElement) {
  if (videoElement.readyState >= __WEBPACK_IMPORTED_MODULE_3__constants_js__["c" /* READY_STATES */].HAVE_ENOUGH_DATA) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(null);
  } else {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_rx_onEvent_js__["a" /* default */])(videoElement, "canplay").take(1);
  }
}

// TODO Lacking side-effect?
if (window.WebKitSourceBuffer && !window.WebKitSourceBuffer.prototype.addEventListener) {

  var SourceBuffer = window.WebKitSourceBuffer;
  var SBProto = SourceBuffer.prototype;

  for (var fnNAme in __WEBPACK_IMPORTED_MODULE_2__utils_eventemitter__["a" /* default */].prototype) {
    SBProto[fnNAme] = __WEBPACK_IMPORTED_MODULE_2__utils_eventemitter__["a" /* default */].prototype[fnNAme];
  }

  SBProto.__listeners = [];

  SBProto.appendBuffer = function (data) {
    if (this.updating) {
      throw new Error("updating");
    }
    this.trigger("updatestart");
    this.updating = true;
    try {
      this.append(data);
    } catch (error) {
      this.__emitUpdate("error", error);
      return;
    }
    this.__emitUpdate("update");
  };

  SBProto.__emitUpdate = function (eventName, val) {
    var _this = this;

    setTimeout(function () {
      _this.trigger(eventName, val);
      _this.updating = false;
      _this.trigger("updateend");
    }, 0);
  };
}

function addTextTrack(video, hidden) {
  var track = void 0,
      trackElement = void 0;
  var kind = "subtitles";
  if (__WEBPACK_IMPORTED_MODULE_3__constants_js__["b" /* isIE */]) {
    var tracksLength = video.textTracks.length;
    track = tracksLength > 0 ? video.textTracks[tracksLength - 1] : video.addTextTrack(kind);
    track.mode = hidden ? track.HIDDEN : track.SHOWING;
  } else {
    // there is no removeTextTrack method... so we need to reuse old
    // text-tracks objects and clean all its pending cues
    trackElement = document.createElement("track");
    video.appendChild(trackElement);
    track = trackElement.track;
    trackElement.kind = kind;
    track.mode = hidden ? "hidden" : "showing";
  }
  return { track: track, trackElement: trackElement };
}

/**
 * Returns true if video text tracks (vtt) are supported in the current browser.
 * @returns {Boolean}
 */
function isVTTSupported() {
  return !__WEBPACK_IMPORTED_MODULE_3__constants_js__["b" /* isIE */];
}

/**
 * firefox fix: sometimes the stream can be stalled, even if we are in a
 * buffer.
 * @param {Object} timing
 * @returns {Boolean}
 */
function isPlaybackStuck(timing) {
  var FREEZE_THRESHOLD = 10; // video freeze threshold in seconds
  return __WEBPACK_IMPORTED_MODULE_3__constants_js__["d" /* isFirefox */] && timing.stalled && timing.state === "timeupdate" && timing.range && timing.range.end - timing.currentTime > FREEZE_THRESHOLD;
}

/*
 * Clear video src attribute.
 *
 * On IE11,  video.src = "" is not sufficient as it
 * does not clear properly the current MediaKey Session.
 * Microsoft recommended to use video.removeAttr("src").
 * @param {HTMLMediaElement} video
 */
function clearVideoSrc(video) {
  video.src = "";
  video.removeAttribute("src");
}

/**
 * Some browsers have a builtin API to know if it's connected at least to a
 * LAN network, at most to the internet.
 *
 * /!\ This feature can be dangerous as you can both have false positives and
 * false negatives.
 *
 * False positives:
 *   - you can still play local contents (on localhost) if isOffline == true
 *   - on some browsers isOffline might be true even if we're connected to a LAN
 *     or a router (it would mean we're just not able to connect to the
 *     Internet). So we can eventually play LAN contents if isOffline == true
 *
 * False negatives:
 *   - in some cases, we even might have isOffline at false when we do not have
 *     any connection:
 *       - in browsers that do not support the feature
 *       - in browsers running in some virtualization softwares where the
 *         network adapters are always connected.
 *
 * Use with these cases in mind.
 * @returns {Boolean}
 */
function isOffline() {
  return navigator.onLine === false;
}



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = castToObservable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Try to cast the given value into an observable.
 * StraightForward - test first for an Observable then for a Promise.
 * @param {Observable|Function|*}
 * @returns {Observable}
 */
function castToObservable(value) {
  if (value instanceof __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"]) {
    return value;
  }

  if (value && typeof value.subscribe == "function") {
    return new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (obs) {
      var sub = value.subscribe(function (val) {
        return obs.next(val);
      }, function (err) {
        return obs.error(err);
      }, function () {
        return obs.complete();
      });

      return function () {
        if (sub && sub.dispose) {
          sub.dispose();
        } else if (sub && sub.unsubscribe) {
          sub.unsubscribe();
        }
      };
    });
  }

  if (value && typeof value.then == "function") {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(value);
  }

  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(value);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export areRangesNearlyContiguous */
/* unused harmony export areRangesOverlapping */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return convertToRanges; });
/* unused harmony export findOverlappingRange */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getInnerAndOuterTimeRanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getLeftSizeOfRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getNextRangeGap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getPlayedSizeOfRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getSizeOfRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return insertInto; });
/* unused harmony export isAfter */
/* unused harmony export isBefore */
/* unused harmony export isTimeInRange */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return keepRangeIntersection; });
/* unused harmony export mergeContiguousRanges */
/* unused harmony export removeEmptyRanges */
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This file contains functions helping with TimeRanges management.
 *
 * For simplicity/performance reasons, many of those work with a simplified
 * "Range" object, which is an object with two keys:
 *   - start {Number}
 *   - end {Number}
 *
 * Those two corresponds to what is returned by the start and end methods of a
 * TimeRanges Object.
 *
 * You can convert from TimeRanges to Range object(s) with the getRange/
 * convertToRanges methods.
 */

// Factor for rounding errors
var EPSILON = 1 / 60;

/**
 * Check equality with a tolerance of EPSILON.
 * Used for various functions with this sort of tolerance regarding the
 * start/end of contiguous ranges.
 * @param {Number} a
 * @param {Number} b
 * @returns {Boolean}
 */
function nearlyEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
}

/**
 * Construct a new range which will have, as start/end, the min/max
 * of both the range given, and the given bitrate.
 * @param {Object} range1
 * @param {Object} range2
 * @returns {Object}
 */
function createRangeUnion(range1, range2) {
  var start = Math.min(range1.start, range2.start);
  var end = Math.max(range1.end, range2.end);
  return { start: start, end: end };
}

/**
 * Clean array ranges from "empty" ranges.
 * That is, range objects which have their start equal to their end.
 * /!\ Mutate the array of ranges.
 * @param {Array<Object>} ranges
 * @returns {Boolean}
 */
function removeEmptyRanges(ranges) {
  for (var index = 0; index < ranges.length; index++) {
    var range = ranges[index];
    if (range.start === range.end) {
      ranges.splice(index++, 1);
    }
  }
  return ranges;
}

/**
 * /!\ Mutate the array of ranges.
 * @param {Array<Object>} ranges
 * @returns {Array<Object>}
 */
function mergeContiguousRanges(ranges) {
  for (var index = 1; index < ranges.length; index++) {
    var prevRange = ranges[index - 1];
    var currRange = ranges[index];
    if (areRangesNearlyContiguous(prevRange, currRange)) {
      var unionRange = createRangeUnion(prevRange, currRange);
      ranges.splice(--index, 2, unionRange);
    }
  }
  return ranges;
}

/**
 * True if range1 is considered _after_ range2.
 * @param {Object} range1
 * @param {Object} range2
 * @returns {Boolean}
 */
function isAfter(range1, range2) {
  return range1.start >= range2.end;
}

/**
 * True if range1 is considered _before_ range2.
 * @param {Object} range1
 * @param {Object} range2
 * @returns {Boolean}
 */
function isBefore(range1, range2) {
  return range1.end <= range2.start;
}

/**
 * Returns true if the time given can be considered as part of the given range.
 * @param {Object} range1
 * @param {Number} Time
 * @returns {Boolean}
 */
function isTimeInRange(_ref, time) {
  var start = _ref.start,
      end = _ref.end;

  return start <= time && time < end;
}

/**
 * Returns true if the two ranges given are overlapping.
 * @param {Object} range1
 * @param {Object} range2
 * @returns {Boolean}
 */
function areRangesOverlapping(range1, range2) {
  return isTimeInRange(range1, range2.start) || range1.start < range2.end && range2.end < range1.end || isTimeInRange(range2, range1.start);
}

/**
 * Returns true if the two ranges given can be considered contiguous.
 * @param {Object} range1
 * @param {Object} range2
 * @returns {Boolean}
 */
function areRangesNearlyContiguous(range1, range2) {
  return nearlyEqual(range2.start, range1.end) || nearlyEqual(range2.end, range1.start);
}

/**
 * Convert from a TimeRanges object to an array of Ranges.
 * @param {TimeRanges} timeRanges
 * @returns {Array.<Object>}
 */
function convertToRanges(timeRanges) {
  var ranges = [];
  for (var i = 0; i < timeRanges.length; i++) {
    ranges.push({
      start: timeRanges.start(i),
      end: timeRanges.end(i)
    });
  }
  return ranges;
}

/**
 * Get range object of a specific time in a TimeRanges object.
 * @param {TimeRanges} timeRanges
 * @returns {Object}
 */
function getRange(timeRanges, time) {
  for (var i = timeRanges.length - 1; i >= 0; i--) {
    var start = timeRanges.start(i);
    if (time >= start) {
      var end = timeRanges.end(i);
      if (time < end) {
        return {
          start: start,
          end: end
        };
      }
    }
  }
  return null;
}

/**
 * Get gap from a specific time until the start of the next Range.
 * @param {TimeRanges} timeRanges
 * @param {Number} time
 * @returns {Number}
 */
function getNextRangeGap(timeRanges, time) {
  var len = timeRanges.length;
  for (var i = 0; i < len; i++) {
    var start = timeRanges.start(i);
    if (time < start) {
      return start - time;
    }
  }
  return Infinity;
}

/**
 * @param {TimeRanges} timeRanges
 * @param {Number} time
 * @returns {Object} - Object with two properties:
 *   - outerRanges {Array.<Object>}: every ranges which does not contain the
 *     given time.
 *   - innerRange {Object|null}: the range which contain the given time.
 */
function getInnerAndOuterTimeRanges(timeRanges, time) {
  var innerRange = null;
  var outerRanges = [];
  for (var i = timeRanges.length - 1; i >= 0; i--) {
    var start = timeRanges.start(i);
    var end = timeRanges.end(i);
    if (time < start || time >= end) {
      outerRanges.push({ start: start, end: end });
    } else {
      innerRange = { start: start, end: end };
    }
  }
  return { outerRanges: outerRanges, innerRange: innerRange };
}

/**
 * Get "size" (difference between end and start) of the range containing the
 * given time. 0 if the range is not found.
 * @param {TimeRanges} timeRanges
 * @param {Number} currentTime
 * @returns {Number}
 */
function getSizeOfRange(timeRanges, currentTime) {
  var range = getRange(timeRanges, currentTime);
  return range ? range.end - range.start : 0;
}

/**
 * Get "currently played" (difference between time given and start) of the
 * range containing the given time. 0 if the range is not found.
 * @param {TimeRanges} timeRanges
 * @param {Number} currentTime
 * @returns {Number}
 */
function getPlayedSizeOfRange(timeRanges, currentTime) {
  var range = getRange(timeRanges, currentTime);
  return range ? currentTime - range.start : 0;
}

/**
 * Get "left to play" (difference between end and time given) of the range
 * containing the given time. Infinity if the range is not found.
 * @param {TimeRanges} timeRanges
 * @param {Number} currentTime
 * @returns {Number}
 */
function getLeftSizeOfRange(timeRanges, currentTime) {
  var range = getRange(timeRanges, currentTime);
  return range ? range.end - currentTime : Infinity;
}

/**
 * Insert a range object into an array of ranges objects, at the right place.
 * /!\ Mutate the array of ranges.
 * @param {Array.<Object>} ranges
 * @param {Object} rangeToAdd
 * @returns {Array.<Object>}
 */
function insertInto(ranges, rangeToAdd) {
  if (rangeToAdd.start === rangeToAdd.end) {
    return ranges;
  }

  // For each present range check if we need to:
  // - In case we are overlapping or contiguous:
  //   - if added range has the same bitrate as the overlapped or
  //     contiguous one, we can merge themcurrentRange
  //   - if added range has a different bitrate we need to insert it
  //     in place
  // - Need to insert in place, we we are completely, not overlapping
  //   and not contiguous in between two ranges.

  var index = 0;
  for (; index < ranges.length; index++) {
    var range = ranges[index];

    var overlapping = areRangesOverlapping(rangeToAdd, range);
    var contiguous = areRangesNearlyContiguous(rangeToAdd, range);

    // We assume ranges are ordered and two ranges can not be
    // completely overlapping.
    if (overlapping || contiguous) {
      rangeToAdd = createRangeUnion(rangeToAdd, range);
      ranges.splice(index--, 1);
    } else {
      // Check the case for which there is no more to do
      if (index === 0) {
        if (isBefore(rangeToAdd, ranges[0])) {
          // First index, and we are completely before that range (and
          // not contiguous, nor overlapping). We just need to be
          // inserted here.
          break;
        }
      } else {
        if (isBefore(ranges[index - 1], rangeToAdd) && isBefore(rangeToAdd, range)) {
          // We are exactly after the current previous range, and
          // before the current range, while not overlapping with none
          // of them. Insert here.
          break;
        }
      }
    }
  }

  // Now that we are sure we don't overlap with any range, just add it.
  ranges.splice(index, 0, rangeToAdd);

  return mergeContiguousRanges(removeEmptyRanges(ranges));
}

/**
 * Returns range, from a range objects array overlapping with a range given
 * in argument. null if none is found.
 * @param {Object} range
 * @param {Array.<Object>} ranges
 * @returns {Object|null}
 */
function findOverlappingRange(range, ranges) {
  for (var i = 0; i < ranges.length; i++) {
    if (areRangesOverlapping(range, ranges[i])) {
      return ranges[i];
    }
  }
  return null;
}

/**
 * Returns only the intersection between the two ranges, from the first
 * ranges argument given.
 * /!\ Mutates the ranges1 array given
 * @param {Array.<Range>} ranges1
 * @param {Array.<Range>} ranges2
 * @returns {Array.<Range>}
 */
function keepRangeIntersection(ranges1, ranges2) {
  for (var i = 0; i < ranges1.length; i++) {
    var range = ranges1[i];
    var overlappingRange = findOverlappingRange(range, ranges2);
    if (!overlappingRange) {
      ranges1.splice(i--, 1);
    } else if (overlappingRange.start > range.start) {
      range.start = overlappingRange.start;
    } else if (overlappingRange.end < range.end) {
      range.end = overlappingRange.end;
    }
  }
  return ranges1;
}



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(26);
var isObject_1 = __webpack_require__(84);
var isFunction_1 = __webpack_require__(51);
var tryCatch_1 = __webpack_require__(52);
var errorObject_1 = __webpack_require__(33);
var UnsubscriptionError_1 = __webpack_require__(262);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(264)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export totalBytes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return strToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bytesToStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return bytesToUTF16Str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return hexToBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return bytesToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return concat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return be2toi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return be3toi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return be4toi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return be8toi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return le2toi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return le4toi; });
/* unused harmony export le8toi */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return itobe2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return itobe4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return itobe8; });
/* unused harmony export itole2 */
/* unused harmony export itole4 */
/* unused harmony export itole8 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return guidToUuid; });
/* unused harmony export toBase64URL */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assert__ = __webpack_require__(2);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Returns total bytes in an array of ArrayBuffer.
 * @param {Array.<ArrayBuffer>} arr
 * @returns {Number}
 */
function totalBytes(arr) {
  var tot = 0;
  for (var i = 0; i < arr.length; i++) {
    tot += arr[i].byteLength;
  }
  return tot;
}

/**
 * Returns Uint8Array from UTF16 string.
 * /!\ Take only the first byte from each UTF16 code.
 * @param {string} str
 * @returns {Uint8Array}
 */
function strToBytes(str) {
  var len = str.length;
  var arr = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = str.charCodeAt(i) & 0xFF;
  }
  return arr;
}

/**
 * construct string from unicode values.
 * /!\ does not support non-UCS-2 values
 * @param {TypedArray} bytes
 * @returns {string}
 */
function bytesToStr(bytes) {
  return String.fromCharCode.apply(null, bytes);
}

/**
 * construct string from unicode values.
 * Only use every other byte for each UTF-16 character.
 * /!\ does not support non-UCS-2 values
 * @param {TypedArray} bytes
 * @returns {string}
 */
function bytesToUTF16Str(bytes) {
  var str = "";
  var len = bytes.length;
  for (var i = 0; i < len; i += 2) {
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

/**
 * Convert hex codes in a string form into the corresponding bytes.
 * @param {string} str
 * @returns {Uint8Array}
 * @throws TypeError - str.length is odd
 */
function hexToBytes(str) {
  var len = str.length;
  var arr = new Uint8Array(len / 2);
  for (var i = 0, j = 0; i < len; i += 2, j++) {
    arr[j] = parseInt(str.substr(i, 2), 16) & 0xFF;
  }
  return arr;
}

/**
 * Convert bytes into the corresponding hex string, with the possibility
 * to add a separator.
 * @param {TypedArray} bytes
 * @param {string} [sep=""] - separator. Separate each two hex character.
 * @returns {string}
 */
function bytesToHex(bytes, sep) {
  if (!sep) {
    sep = "";
  }

  var hex = "";
  for (var i = 0; i < bytes.byteLength; i++) {
    hex += (bytes[i] >>> 4).toString(16);
    hex += (bytes[i] & 0xF).toString(16);
    if (sep.length && i < bytes.byteLength - 1) {
      hex += sep;
    }
  }
  return hex;
}

/**
 * Returns a Uint8Array from the arguments given, in order:
 *   - if the next argument given is a number N set the N next bytes to 0.
 *   - else set the next bytes to the argument given.
 * @param {...(Number|TypedArray)} arguments
 * @returns {Uint8Array}
 */
function concat() {
  var l = arguments.length;
  var i = -1;
  var len = 0;
  var arg = void 0;
  while (++i < l) {
    arg = arguments[i];
    len += typeof arg === "number" ? arg : arg.length;
  }
  var arr = new Uint8Array(len);
  var off = 0;
  i = -1;
  while (++i < l) {
    arg = arguments[i];
    if (typeof arg === "number") {
      off += arg;
    } else if (arg.length > 0) {
      arr.set(arg, off);
      off += arg.length;
    }
  }
  return arr;
}

/**
 * Translate groups of 2 big-endian bytes to Integer (from 0 up to 65535).
 * @param {TypedArray} bytes
 * @param {Number} off - The offset (from the start of the given array)
 * @returns {Number}
 */
function be2toi(bytes, off) {
  return (bytes[0 + off] << 8) + (bytes[1 + off] << 0);
}

/**
 * Translate groups of 3 big-endian bytes to Integer.
 * @param {TypedArray} bytes
 * @param {Number} off - The offset (from the start of the given array)
 * @returns {Number}
 */
function be3toi(bytes, off) {
  return bytes[0 + off] * 0x0010000 + bytes[1 + off] * 0x0000100 + bytes[2 + off];
}

/**
 * Translate groups of 4 big-endian bytes to Integer.
 * @param {TypedArray} bytes
 * @param {Number} off - The offset (from the start of the given array)
 * @returns {Number}
 */
function be4toi(bytes, off) {
  return bytes[0 + off] * 0x1000000 + bytes[1 + off] * 0x0010000 + bytes[2 + off] * 0x0000100 + bytes[3 + off];
}

/**
 * Translate groups of 8 big-endian bytes to Integer.
 * @param {TypedArray} bytes
 * @param {Number} off - The offset (from the start of the given array)
 * @returns {Number}
 */
function be8toi(bytes, off) {
  return (bytes[0 + off] * 0x1000000 + bytes[1 + off] * 0x0010000 + bytes[2 + off] * 0x0000100 + bytes[3 + off]) * 0x100000000 + bytes[4 + off] * 0x1000000 + bytes[5 + off] * 0x0010000 + bytes[6 + off] * 0x0000100 + bytes[7 + off];
}

/**
 * Translate Integer (from 0 up to 65535) to a Uint8Array of length 2 of
 * the corresponding big-endian bytes.
 * @param {Number} num
 * @returns {Uint8Array}
 */
function itobe2(num) {
  return new Uint8Array([num >>> 8 & 0xFF, num & 0xFF]);
}

/**
 * Translate Integer to a Uint8Array of length 4 of the corresponding big-endian
 * bytes.
 * @param {Number} num
 * @returns {Uint8Array}
 */
function itobe4(num) {
  return new Uint8Array([num >>> 24 & 0xFF, num >>> 16 & 0xFF, num >>> 8 & 0xFF, num & 0xFF]);
}

/**
 * Translate Integer to a Uint8Array of length 8 of the corresponding big-endian
 * bytes.
 * /!\ If the top-most bytes are set, this might go over MAX_SAFE_INTEGER, thus
 * leading to a "bad" value.
 * @param {Number} num
 * @returns {Uint8Array}
 */
function itobe8(num) {
  var l = num % 0x100000000;
  var h = (num - l) / 0x100000000;
  return new Uint8Array([h >>> 24 & 0xFF, h >>> 16 & 0xFF, h >>> 8 & 0xFF, h & 0xFF, l >>> 24 & 0xFF, l >>> 16 & 0xFF, l >>> 8 & 0xFF, l & 0xFF]);
}

/**
 * Translate groups of 2 little-endian bytes to Integer (from 0 up to 65535).
 * @param {TypedArray} bytes
 * @param {Number} off - The offset (from the start of the given array)
 * @returns {Number}
 */
function le2toi(bytes, off) {
  return (bytes[0 + off] << 0) + (bytes[1 + off] << 8);
}

/**
 * Translate groups of 4 little-endian bytes to Integer.
 * @param {TypedArray} bytes
 * @param {Number} off - The offset (from the start of the given array)
 * @returns {Number}
 */
function le4toi(bytes, off) {
  return bytes[0 + off] + bytes[1 + off] * 0x0000100 + bytes[2 + off] * 0x0010000 + bytes[3 + off] * 0x1000000;
}

/**
 * Translate groups of 8 little-endian bytes to Integer.
 * @param {TypedArray} bytes
 * @param {Number} off - The offset (from the start of the given array)
 * @returns {Number}
 */
function le8toi(bytes, off) {
  return bytes[0 + off] + bytes[1 + off] * 0x0000100 + bytes[2 + off] * 0x0010000 + bytes[3 + off] * 0x1000000 + (bytes[4 + off] + bytes[5 + off] * 0x0000100 + bytes[6 + off] * 0x0010000 + bytes[7 + off] * 0x1000000) * 0x100000000;
}

/**
 * Translate Integer (from 0 up to 65535) to a Uint8Array of length 2 of
 * the corresponding little-endian bytes.
 * @param {Number} num
 * @returns {Uint8Array}
 */
function itole2(num) {
  return new Uint8Array([num & 0xFF, num >>> 8 & 0xFF]);
}

/**
 * Translate Integer to a Uint8Array of length 4 of the corresponding
 * little-endian bytes.
 * @param {Number} num
 * @returns {Uint8Array}
 */
function itole4(num) {
  return new Uint8Array([num & 0xFF, num >>> 8 & 0xFF, num >>> 16 & 0xFF, num >>> 24 & 0xFF]);
}

/**
 * Translate Integer to a Uint8Array of length 8 of the corresponding
 * little-endian bytes.
 * @param {Number} num
 * @returns {Uint8Array}
 */
function itole8(num) {
  var l = num % 0x100000000;
  var h = (num - l) / 0x100000000;
  return new Uint8Array([h & 0xFF, h >>> 8 & 0xFF, h >>> 16 & 0xFF, h >>> 24 & 0xFF, l & 0xFF, l >>> 8 & 0xFF, l >>> 16 & 0xFF, l >>> 24 & 0xFF]);
}

/**
 * @param {string} uuid
 * @returns {string}
 * @throws AssertionError - The uuid length is not 16
 */
function guidToUuid(uuid) {
  __WEBPACK_IMPORTED_MODULE_0__assert__["a" /* default */].equal(uuid.length, 16, "UUID length should be 16");
  var buf = strToBytes(uuid);

  var p1A = buf[0];
  var p1B = buf[1];
  var p1C = buf[2];
  var p1D = buf[3];
  var p2A = buf[4];
  var p2B = buf[5];
  var p3A = buf[6];
  var p3B = buf[7];
  var p4 = buf.subarray(8, 10);
  var p5 = buf.subarray(10, 16);

  var ord = new Uint8Array(16);
  ord[0] = p1D;ord[1] = p1C;ord[2] = p1B;ord[3] = p1A; // swap32 BE -> LE
  ord[4] = p2B;ord[5] = p2A; // swap16 BE -> LE
  ord[6] = p3B;ord[7] = p3A; // swap16 BE -> LE
  ord.set(p4, 8);
  ord.set(p5, 10);

  return bytesToHex(ord);
}

/**
 * Creates a base-64 encoded ASCII string from a string of binary data, with
 * possible trailing equal sign(s) stripped.
 * @param {string}
 * @returns {string}
 */
function toBase64URL(str) {
  return btoa(str).replace(/\=+$/, "");
}



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var ScalarObservable_1 = __webpack_require__(44);
var EmptyObservable_1 = __webpack_require__(25);
var isScheduler_1 = __webpack_require__(20);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` IScheduler, which means the `next`
     * notifications are sent synchronously, although with a different IScheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(12);
var isArrayLike_1 = __webpack_require__(81);
var isPromise_1 = __webpack_require__(85);
var isObject_1 = __webpack_require__(84);
var Observable_1 = __webpack_require__(0);
var iterator_1 = __webpack_require__(47);
var InnerSubscriber_1 = __webpack_require__(172);
var observable_1 = __webpack_require__(48);
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            return result.subscribe(destination);
        }
    }
    else if (isArrayLike_1.isArrayLike(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (result && typeof result[iterator_1.iterator] === 'function') {
        var iterator = result[iterator_1.iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (result && typeof result[observable_1.observable] === 'function') {
        var obs = result[observable_1.observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        var value = isObject_1.isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = ("You provided " + value + " where a stream was expected.")
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        destination.error(new TypeError(msg));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return inBackground; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return videoWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return loadedMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fullscreenChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return sourceOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return onEncrypted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return onKeyMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return onKeyAdded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return onKeyError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return onKeyStatusesChange; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_rx_onEvent_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_js__ = __webpack_require__(34);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This file provides browser-agnostic event listeners under the form of
 * RxJS Observables
 */










var INACTIVITY_DELAY = __WEBPACK_IMPORTED_MODULE_1__config_js__["a" /* default */].INACTIVITY_DELAY;
var pixelRatio = window.devicePixelRatio || 1;

function isEventSupported(element, eventNameSuffix) {
  var clone = document.createElement(element.tagName);
  var eventName = "on" + eventNameSuffix;
  if (eventName in clone) {
    return true;
  } else {
    clone.setAttribute(eventName, "return;");
    return typeof clone[eventName] == "function";
  }
}

function findSupportedEvent(element, eventNames) {
  return eventNames.filter(function (name) {
    return isEventSupported(element, name);
  })[0];
}

function eventPrefixed(eventNames, prefixes) {
  return eventNames.reduce(function (parent, name) {
    return parent.concat((prefixes || __WEBPACK_IMPORTED_MODULE_4__constants_js__["g" /* BROWSER_PREFIXES */]).map(function (p) {
      return p + name;
    }));
  }, []);
}

function compatibleListener(eventNames, prefixes) {
  var mem = void 0;
  eventNames = eventPrefixed(eventNames, prefixes);
  return function (element) {
    // if the element is a HTMLElement we can detect
    // the supported event, and memoize it in `mem`
    if (element instanceof __WEBPACK_IMPORTED_MODULE_4__constants_js__["h" /* HTMLElement_ */]) {
      if (typeof mem == "undefined") {
        mem = findSupportedEvent(element, eventNames) || null;
      }

      if (mem) {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromEvent(element, mem);
      } else {
        if (false) {
          log.warn("compat: element <" + element.tagName + "> does not support any of these events: " + eventNames.join(", "));
        }
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].never();
      }
    }

    // otherwise, we need to listen to all the events
    // and merge them into one observable sequence
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_rx_onEvent_js__["a" /* default */])(element, eventNames);
  };
}

/**
 * Returns an observable:
 *   - emitting true when the visibility of document changes to hidden
 *   - emitting false when the visibility of document changes to visible
 * @returns {Observable}
 */
var visibilityChange = function visibilityChange() {
  var prefix = void 0;
  if (document.hidden != null) {
    prefix = "";
  } else if (document.mozHidden != null) {
    prefix = "moz";
  } else if (document.msHidden != null) {
    prefix = "ms";
  } else if (document.webkitHidden != null) {
    prefix = "webkit";
  }

  var hidden = prefix ? prefix + "Hidden" : "hidden";
  var visibilityChangeEvent = prefix + "visibilitychange";

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_rx_onEvent_js__["a" /* default */])(document, visibilityChangeEvent).map(function () {
    return document[hidden];
  });
};

var videoSizeChange = function videoSizeChange() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_rx_onEvent_js__["a" /* default */])(window, "resize");
};

var isVisible = visibilityChange() // emit false when visible
.filter(function (x) {
  return x === false;
});

// Emit true if the visibility changed to hidden since 60s
var isHidden = visibilityChange().debounceTime(INACTIVITY_DELAY).filter(function (x) {
  return x === true;
});

var inBackground = function inBackground() {
  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(isVisible, isHidden).startWith(false);
};

var videoWidth = function videoWidth(videoElement) {
  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].interval(20000), videoSizeChange().debounceTime(500)).startWith("init") // emit on subscription
  .map(function () {
    return videoElement.clientWidth * pixelRatio;
  }).distinctUntilChanged();
};

var loadedMetadata = compatibleListener(["loadedmetadata"]);
var fullscreenChange = compatibleListener(["fullscreenchange", "FullscreenChange"],

// On IE11, fullscreen change events is called MSFullscreenChange
__WEBPACK_IMPORTED_MODULE_4__constants_js__["g" /* BROWSER_PREFIXES */].concat("MS"));
var sourceOpen = compatibleListener(["sourceopen", "webkitsourceopen"]);
var onEncrypted = compatibleListener(["encrypted", "needkey"]);
var onKeyMessage = compatibleListener(["keymessage", "message"]);
var onKeyAdded = compatibleListener(["keyadded", "ready"]);
var onKeyError = compatibleListener(["keyerror", "error"]);
var onKeyStatusesChange = compatibleListener(["keystatuseschange"]);



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RequestErrorTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ErrorCodes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_listToMap_js__ = __webpack_require__(165);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var ErrorTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_listToMap_js__["a" /* default */])(["NETWORK_ERROR", "MEDIA_ERROR", "ENCRYPTED_MEDIA_ERROR", "INDEX_ERROR", "OTHER_ERROR"]);

var RequestErrorTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_listToMap_js__["a" /* default */])(["TIMEOUT", "ERROR_EVENT", "ERROR_HTTP_CODE", "PARSE_ERROR"]);

var ErrorCodes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_listToMap_js__["a" /* default */])(["PIPELINE_RESOLVE_ERROR", "PIPELINE_LOAD_ERROR", "PIPELINE_PARSING_ERROR", "MANIFEST_PARSE_ERROR", "MANIFEST_INCOMPATIBLE_CODECS_ERROR", "MEDIA_IS_ENCRYPTED_ERROR", "KEY_ERROR", "KEY_STATUS_CHANGE_ERROR", "KEY_UPDATE_ERROR", "KEY_LOAD_ERROR", "KEY_LOAD_TIMEOUT", "KEY_GENERATE_REQUEST_ERROR", "INCOMPATIBLE_KEYSYSTEMS", "LICENSE_SERVER_CERTIFICATE_ERROR", "BUFFER_APPEND_ERROR", "BUFFER_FULL_ERROR", "BUFFER_TYPE_UNKNOWN", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_SOURCE_NOT_SUPPORTED", "MEDIA_KEYS_NOT_SUPPORTED", "OUT_OF_INDEX_ERROR", "UNKNOWN_INDEX"]);



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// inspired from MDN polyfill, but ponyfilled instead
/* harmony default export */ __webpack_exports__["a"] = (function (arr, searchElement, fromIndex) {
  if (typeof Array.prototype.includes === "function") {
    return arr.includes(searchElement, fromIndex);
  }

  var len = arr.length >>> 0;

  if (len === 0) {
    return false;
  }

  var n = fromIndex | 0;
  var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

  var areTheSame = function areTheSame(x, y) {
    return x === y ||
    // Viva las JavaScriptas!
    typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
  };

  while (k < len) {
    if (areTheSame(arr[k], searchElement)) {
      return true;
    }
    k++;
  }

  return false;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function find(array, predicate, context) {
  if (typeof Array.prototype.find === 'function') {
    return array.find(predicate, context);
  }

  context = context || this;
  var length = array.length;
  var i;

  if (typeof predicate !== 'function') {
    throw new TypeError(predicate + ' is not a function');
  }

  for (i = 0; i < length; i++) {
    if (predicate.call(context, array[i], i, array)) {
      return array[i];
    }
  }
}

module.exports = find;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = errorMessage;
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function errorMessage(name, code, reason) {
  return name + "(" + code + ")" + (reason ? ": " + reason.message : "");
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return normalizeRange; });
/* unused harmony export getTimelineRangeStart */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getTimelineRangeEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getInitSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setTimescale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return scale; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_assert_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__segment_js__ = __webpack_require__(27);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Convert second-based start time and duration to the timescale of the
 * manifest's index.
 * @param {Object} index
 * @param {Number} ts
 * @param {Number} duration
 * @returns {Object} - Object with two properties:
 *   - up {Number}: timescaled timestamp of the beginning time
 *   - to {Number}: timescaled timestamp of the end time (start time + duration)
 */
var normalizeRange = function normalizeRange(index, ts, duration) {
  var pto = index.presentationTimeOffset || 0;
  var timescale = index.timescale || 1;

  return {
    up: ts * timescale - pto,
    to: (ts + duration) * timescale - pto
  };
};

/**
 * Get start of the given index range, timescaled.
 * @param {Object} range
 * @param {Number} range.ts - the range's start time
 * @param {Number} range.d - the range's duration
 * @param {Number} range.r - the range's count. 0 for a single element, 1 for
 * 2 elements etc.
 * @returns {Number} - absolute start time of the range
 */
var getTimelineRangeStart = function getTimelineRangeStart(_ref) {
  var ts = _ref.ts,
      d = _ref.d,
      r = _ref.r;
  return d === -1 ? ts : ts + r * d;
};

/**
 * Get end of the given index range, timescaled.
 * @param {Object} range
 * @param {Number} range.ts - the range's start time
 * @param {Number} range.d - the range's duration
 * @param {Number} range.r - the range's count. 0 for a single element, 1 for
 * 2 elements etc.
 * @returns {Number} - absolute end time of the range
 */
var getTimelineRangeEnd = function getTimelineRangeEnd(_ref2) {
  var ts = _ref2.ts,
      d = _ref2.d,
      r = _ref2.r;
  return d === -1 ? ts : ts + (r + 1) * d;
};

/**
 * Construct init segment for the given index.
 * @param {string} rootId
 * @param {Object} index
 * @param {Number} index.timescale
 * @param {Object} [index.initialization={}]
 * @param {Array.<Number>|null} [index.initialization.range=null]
 * @param {Array.<Number>|null} [index.initialization.indexRange=null]
 * @param {string} [index.initialization.media]
 * @returns {Segment}
 */
var getInitSegment = function getInitSegment(rootId, index) {
  var _index$initialization = index.initialization,
      initialization = _index$initialization === undefined ? {} : _index$initialization;


  var args = {
    id: "" + rootId + "_init",
    init: true,
    range: initialization.range || null,
    indexRange: index.indexRange || null,
    media: initialization.media,
    timescale: index.timescale
  };
  return new __WEBPACK_IMPORTED_MODULE_1__segment_js__["a" /* default */](args);
};

/**
 * Update the timescale used (for all segments).
 * TODO This should probably update all previous segments to the newly set
 * Timescale.
 *
 * /!\ Mutates the given index
 * @param {Object} index
 * @param {Number} timescale
 * @returns {Object}
 */
var setTimescale = function setTimescale(index, timescale) {
  if (false) {
    assert(typeof timescale == "number");
    assert(timescale > 0);
  }

  if (index.timescale !== timescale) {
    index.timescale = timescale;
  }

  return index;
};

/**
 * Re-scale a given time from timescaled information to second-based.
 * @param {Object} index
 * @param {Number} time
 * @returns {Number}
 */
var scale = function scale(index, time) {
  if (false) {
    assert(index.timescale > 0);
  }

  return time / index.timescale;
};



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return resolveURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeBaseURL; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Scheme part of an url (e.g. "http://").
 */
var schemeRe = /^(?:[a-z]+:)?\/\//i;

/**
 * Captures "/../" or "/./".
 */
var selfDirRe = /\/\.{1,2}\//;

/**
 * Resolve self directory and previous directory references to obtain a
 * "normalized" url.
 * @example "https://foo.bar/baz/booz/../biz" => "https://foo.bar/baz/biz"
 * @param {string} url
 * @returns {string}
 */
function _normalizeUrl(url) {
  // fast path if no ./ or ../ are present in the url
  if (!selfDirRe.test(url)) {
    return url;
  }

  var newUrl = [];
  var oldUrl = url.split("/");
  for (var i = 0, l = oldUrl.length; i < l; i++) {
    if (oldUrl[i] == "..") {
      newUrl.pop();
    } else if (oldUrl[i] == ".") {
      continue;
    } else {
      newUrl.push(oldUrl[i]);
    }
  }

  return newUrl.join("/");
}

/**
 * Construct an url from the arguments given.
 * Basically:
 *   - The last arguments that contains a scheme (e.g. "http://") is the base
 *     of the url.
 *   - every subsequent string arguments are concatened to it.
 * @param {...string|undefined} args
 * @returns {string}
 */
function resolveURL() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var len = args.length;
  if (len === 0) {
    return "";
  }

  var base = "";
  for (var i = 0; i < len; i++) {
    var part = args[i];
    if (typeof part !== "string" || part === "") {
      continue;
    }
    if (schemeRe.test(part)) {
      base = part;
    } else {
      // trim if begins with "/"
      if (part[0] === "/") {
        part = part.substr(1);
      }

      // trim if ends with "/"
      if (base[base.length - 1] === "/") {
        base = base.substr(0, base.length - 1);
      }

      base = base + "/" + part;
    }
  }

  return _normalizeUrl(base);
}

/**
 * Remove string after the last '/'.
 * @param {string} url
 * @returns {string}
 */
function normalizeBaseURL(url) {
  var slash = url.lastIndexOf("/");
  if (slash >= 0) {
    return url.substring(0, slash + 1);
  } else {
    return url;
  }
}



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following to the console:
     * // x is equal to the count on the interval eg(0,1,2,3,...)
     * // x will occur every 1000ms
     * // if x % 2 is equal to 1 print abc
     * // if x % 2 is not equal to 1 nothing will be output
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Segment =
/**
 * @constructor
 * @param {Object} [args={}]
 * @param {string|Number} [args.id]
 * @param {Number} [args.duration]
 * @param {Boolean} [args.init=false]
 * @param {Number} [args.time]
 * @param {Array.<Number>} [args.range]
 * @param {Array.<Number>} [args.indexRange]
 * @param {Number} [args.number]
 * @param {Number} [args.timescale]
 * @param {string} [args.media]
 */
function Segment() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Segment);

  this.id = args.id;
  this.duration = args.duration;
  this.isInit = !!args.init;
  this.range = args.range;
  this.time = args.time;
  this.indexRange = args.indexRange;
  this.number = args.number;
  this.timescale = args.timescale == null ? 1 : args.timescale;
  this.media = args.media;
};

/* harmony default export */ __webpack_exports__["a"] = (Segment);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toWallClockTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fromWallClockTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getMinimumBufferPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getMaximumBufferPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getBufferLimits; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * TODO methods of manifest class?
 */

function toWallClockTime(position, manifest) {
  return new Date((position + manifest.availabilityStartTime) * 1000);
}

/**
 * TODO This function should have more of a seekTo kind of name
 * ``fromWallClockTime`` should probably just do:
 * ```js
 * (timeInSeconds, manifest) => {
 *   return timeInSeconds - manifest.availabilityStartTime;
 * };
 * ```
 * It should be the exact opposite of ``toWallClockTime``
 */
function fromWallClockTime(timeInMs, manifest) {
  return normalizeWallClockTime(timeInMs, manifest) / 1000 - manifest.availabilityStartTime;
}

/**
 * TODO This function should have more of a seekTo kind of name
 */
function normalizeWallClockTime(timeInMs, manifest) {
  var suggestedPresentationDelay = manifest.suggestedPresentationDelay,
      presentationLiveGap = manifest.presentationLiveGap,
      timeShiftBufferDepth = manifest.timeShiftBufferDepth;


  if (typeof timeInMs != "number") {
    timeInMs = timeInMs.getTime();
  }

  var now = Date.now();
  var max = now - (presentationLiveGap + suggestedPresentationDelay) * 1000;
  var min = now - timeShiftBufferDepth * 1000;
  return Math.max(Math.min(timeInMs, max), min);
}

function getMinimumBufferPosition(manifest) {
  // we have to know both the min and the max to be sure
  var _getBufferLimits = getBufferLimits(manifest),
      min = _getBufferLimits[0];

  return min;
}

/**
 * Get maximum position to which we should be able to construct a buffer.
 * @param {Manifest} manifest
 * @returns {Number}
 */
function getMaximumBufferPosition(manifest) {
  if (!manifest.isLive) {
    return manifest.getDuration();
  }

  var availabilityStartTime = manifest.availabilityStartTime,
      presentationLiveGap = manifest.presentationLiveGap;

  var now = Date.now() / 1000;
  return now - availabilityStartTime - presentationLiveGap;
}

function getBufferLimits(manifest) {
  // TODO use RTT for the manifest request + 3 or something
  var BUFFER_DEPTH_SECURITY = 5;

  if (!manifest.isLive) {
    return [0, manifest.getDuration()];
  }

  var availabilityStartTime = manifest.availabilityStartTime,
      presentationLiveGap = manifest.presentationLiveGap,
      timeShiftBufferDepth = manifest.timeShiftBufferDepth;


  var now = Date.now() / 1000;
  var max = now - availabilityStartTime - presentationLiveGap;
  return [Math.min(max, max - timeShiftBufferDepth + BUFFER_DEPTH_SECURITY), max];
}



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assert__ = __webpack_require__(2);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




function EventEmitter() {
  this.__listeners = {};
}

EventEmitter.prototype.addEventListener = function (evt, fn) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assert__["a" /* default */])(typeof fn == "function", "eventemitter: second argument should be a function");
  if (!this.__listeners[evt]) {
    this.__listeners[evt] = [];
  }
  this.__listeners[evt].push(fn);
};

EventEmitter.prototype.removeEventListener = function (evt, fn) {
  if (arguments.length === 0) {
    this.__listeners = {};
    return;
  }
  if (!this.__listeners.hasOwnProperty(evt)) {
    return;
  }
  if (arguments.length === 1) {
    delete this.__listeners[evt];
    return;
  }
  var listeners = this.__listeners[evt];
  var index = listeners.indexOf(fn);
  if (~index) {
    listeners.splice(index, 1);
  }
  if (!listeners.length) {
    delete this.__listeners[evt];
  }
};

EventEmitter.prototype.trigger = function (evt, arg) {
  if (!this.__listeners.hasOwnProperty(evt)) {
    return;
  }
  var listeners = this.__listeners[evt].slice();
  listeners.forEach(function (listener) {
    try {
      listener(arg);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__log__["a" /* default */].error(e, e.stack);
    }
  });
};

// aliases
EventEmitter.prototype.on = EventEmitter.prototype.addEventListener;
EventEmitter.prototype.off = EventEmitter.prototype.removeEventListener;

/* harmony default export */ __webpack_exports__["a"] = (EventEmitter);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return normalizeAudioTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return normalizeTextTrack; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ISO_639_1_to_ISO_639_3_js__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ISO_639_2_to_ISO_639_3_js__ = __webpack_require__(164);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Normalize text track from a user given input into an object
 * with three properties:
 *   - language {string}: The language the user gave us
 *   - normalized {string}: An attempt to normalize the language into an
 *     ISO 639-3 code
 *   - closedCaption {Boolean}: Whether the track is a closed caption track
 * @param {Object|string} _language
 * @returns {Object|null|undefined}
 */
function normalizeTextTrack(_language) {
  if (_language != null) {
    var language = void 0,
        closedCaption = void 0;
    if (typeof _language === "string") {
      language = _language;
      closedCaption = false;
    } else {
      language = _language.language;
      closedCaption = !!_language.closedCaption;
    }

    return {
      language: language,
      closedCaption: closedCaption,
      normalized: normalize(language)
    };
  }
  return _language;
}

/**
 * Normalize audio track from a user given input into an object
 * with three properties:
 *   - language {string}: The language the user gave us
 *   - normalized {string}: An attempt to normalize the language into an
 *     ISO 639-3 code
 *   - audioDescription {Boolean}: Whether the track is a closed caption track
 * @param {Object|string} _language
 * @returns {Object|null|undefined}
 */
function normalizeAudioTrack(_language) {
  if (_language != null) {
    var language = void 0,
        audioDescription = void 0;
    if (typeof _language === "string") {
      language = _language;
      audioDescription = false;
    } else {
      language = _language.language;
      audioDescription = !!_language.audioDescription;
    }

    return {
      language: language,
      audioDescription: audioDescription,
      normalized: normalize(language)
    };
  }
  return _language;
}

/**
 * Normalize language given.
 * Basically:
 *   - converts it to lowercase.
 *   - normalize "base" (what is before the possible first "-") to an ISO639-3
 *     compatible string.
 * @param {string} _language
 * @returns {string}
 */
function normalize(_language) {
  if (_language == null || _language === "") {
    return "";
  }
  var fields = ("" + _language).toLowerCase().split("-");
  var base = fields[0];
  var normalizedBase = normalizeBase(base);
  if (normalizedBase) {
    fields[0] = normalizedBase;
  }
  return fields.join("-");
}

/**
 * Normalize language into an ISO639-3 format.
 * @param {string} base
 * @returns {string}
 */
function normalizeBase(base) {
  var result = void 0;
  if (base.length === 2) {
    result = __WEBPACK_IMPORTED_MODULE_0__ISO_639_1_to_ISO_639_3_js__["a" /* default */][base];
  } else if (base.length === 3) {
    result = __WEBPACK_IMPORTED_MODULE_1__ISO_639_2_to_ISO_639_3_js__["a" /* default */][base];
  }
  return result || base;
}



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = onEvent;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Returns a fromEvent on the given element for the given event(s).
 * @param {Element}
 * @param {Array.<string>|string}
 * @returns {Observable}
 */
function onEvent(elt, evts) {
  if (Array.isArray(evts)) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge.apply(null, evts.map(function (evt) {
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromEvent(elt, evt);
    }));
  } else {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromEvent(elt, evts);
  }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AsyncAction_1 = __webpack_require__(78);
var AsyncScheduler_1 = __webpack_require__(79);
/**
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asap} scheduler.
 *
 * @example <caption>Use async scheduler to delay task</caption>
 * const task = () => console.log('it works!');
 *
 * Rx.Scheduler.async.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 *
 *
 * @example <caption>Use async scheduler to repeat task in intervals</caption>
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * Rx.Scheduler.async.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 *
 * @static true
 * @name async
 * @owner Scheduler
 */
exports.async = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
//# sourceMappingURL=async.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return BROWSER_PREFIXES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return HTMLElement_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return HTMLVideoElement_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaSource_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return MediaKeys_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isIE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isFirefox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return READY_STATES; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var win = window;
var BROWSER_PREFIXES = ["", "webkit", "moz", "ms"];
var HTMLElement_ = win.HTMLElement;
var HTMLVideoElement_ = win.HTMLVideoElement;

var MediaSource_ = win.MediaSource || win.MozMediaSource || win.WebKitMediaSource || win.MSMediaSource;

var MediaKeys_ = win.MediaKeys || win.MozMediaKeys || win.WebKitMediaKeys || win.MSMediaKeys;

if (!MediaKeys_) {
  var noMediaKeys = function noMediaKeys() {
    throw new MediaError("MEDIA_KEYS_NOT_SUPPORTED", null, true);
  };

  MediaKeys_ = {
    create: noMediaKeys,
    isTypeSupported: noMediaKeys
  };
}

// true for IE / Edge
var isIE = navigator.appName == "Microsoft Internet Explorer" || navigator.appName == "Netscape" && /(Trident|Edge)\//.test(navigator.userAgent);

var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;

var READY_STATES = {
  HAVE_NOTHING: 0,
  HAVE_METADATA: 1,
  HAVE_CURRENT_DATA: 2,
  HAVE_FUTURE_DATA: 3,
  HAVE_ENOUGH_DATA: 4
};



/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PLAYER_STATES; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This file declares constants useful for every API files
 */

/**
 * Player state dictionnary
 * @type {Object}
 */
var PLAYER_STATES = {
  STOPPED: "STOPPED",
  LOADED: "LOADED",
  LOADING: "LOADING",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
  ENDED: "ENDED",
  BUFFERING: "BUFFERING",
  SEEKING: "SEEKING"
};

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return $storedSessions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return $loadedSessions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sessions_set__ = __webpack_require__(113);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var emptyStorage = {
  load: function load() {
    return [];
  },
  save: function save() {}
};

var $storedSessions = new __WEBPACK_IMPORTED_MODULE_0__sessions_set__["a" /* PersistedSessionsSet */](emptyStorage);
var $loadedSessions = new __WEBPACK_IMPORTED_MODULE_0__sessions_set__["b" /* InMemorySessionsSet */]();

if (false) {
  window.$loadedSessions = $loadedSessions;
  window.$storedSessions = $storedSessions;
}



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__segment_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(23);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Get index of the segment containing the given timescaled timestamp.
 * @param {Object} index
 * @param {Number} ts
 * @returns {Number}
 */
var getSegmentIndex = function getSegmentIndex(index, ts) {
  var timeline = index.timeline;


  var low = 0;
  var high = timeline.length;

  while (low < high) {
    var mid = low + high >>> 1;
    if (timeline[mid].ts < ts) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low > 0 ? low - 1 : low;
};

/**
 * @param {Number} ts
 * @param {Number} up
 * @param {Number} duration
 * @returns {Number}
 */
var getSegmentNumber = function getSegmentNumber(ts, up, duration) {
  var diff = up - ts;
  if (diff > 0) {
    return Math.floor(diff / duration);
  } else {
    return 0;
  }
};

/**
 * Calculate the number of times a segment repeat based on the next segment.
 * @param {Object} seg
 * @param {Number} seg.ts - beginning timescaled timestamp
 * @param {Number} seg.d - timescaled duration of the segment
 * @param {Object} nextSeg
 * @param {Number} nextSeg.t - TODO check that one
 * @returns {Number}
 */
var calculateRepeat = function calculateRepeat(seg, nextSeg) {
  var rep = seg.r || 0;

  // A negative value of the @r attribute of the S element indicates
  // that the duration indicated in @d attribute repeats until the
  // start of the next S element, the end of the Period or until the
  // next MPD update.
  if (rep < 0) {
    var repEnd = nextSeg ? nextSeg.t : Infinity;
    rep = Math.ceil((repEnd - seg.ts) / seg.d) - 1;
  }

  return rep;
};

var SegmentTimelineHelpers = {
  getInitSegment: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* getInitSegment */],
  setTimescale: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* setTimescale */],
  scale: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* scale */],

  /**
   * @param {string|Number} repId
   * @param {Object} index
   * @param {Number} _up
   * @param {Number} _to
   * @returns {Array.<Segment>}
   */
  getSegments: function getSegments(repId, index, _up, _to) {
    var _normalizeRange = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["d" /* normalizeRange */])(index, _up, _to),
        up = _normalizeRange.up,
        to = _normalizeRange.to;

    var timeline = index.timeline,
        timescale = index.timescale,
        media = index.media;

    var segments = [];

    var timelineLength = timeline.length;
    var timelineIndex = getSegmentIndex(index, up) - 1;
    // TODO(pierre): use @maxSegmentDuration if possible
    var maxDuration = timeline.length && timeline[0].d || 0;

    loop: for (;;) {
      if (++timelineIndex >= timelineLength) {
        break;
      }

      var segmentRange = timeline[timelineIndex];
      var d = segmentRange.d,
          ts = segmentRange.ts,
          range = segmentRange.range;

      maxDuration = Math.max(maxDuration, d);

      // live-added segments have @d attribute equals to -1
      if (d < 0) {
        if (ts + maxDuration < to) {
          var args = {
            id: "" + repId + "_" + ts,
            time: ts,
            init: false,
            range: range,
            duration: undefined,
            indexRange: null,
            timescale: timescale,
            media: media
          };
          segments.push(new __WEBPACK_IMPORTED_MODULE_0__segment_js__["a" /* default */](args));
        }
        break;
      }

      var repeat = calculateRepeat(segmentRange, timeline[timelineIndex + 1]);
      var segmentNumber = getSegmentNumber(ts, up, d);
      var segmentTime = void 0;
      while ((segmentTime = ts + segmentNumber * d) < to) {
        if (segmentNumber++ <= repeat) {
          var _args = {
            id: "" + repId + "_" + segmentTime,
            time: segmentTime,
            init: false,
            range: range,
            duration: d,
            indexRange: null,
            timescale: timescale,
            media: media
          };
          segments.push(new __WEBPACK_IMPORTED_MODULE_0__segment_js__["a" /* default */](_args));
        } else {
          continue loop;
        }
      }

      break;
    }

    return segments;
  },


  /**
   * Returns true if, based on the arguments, the index should be refreshed.
   * @param {Object} index
   * @param {Number} time
   * @param {Number} up
   * @param {Number} to
   * @returns {Boolean}
   */
  shouldRefresh: function shouldRefresh(index, time, up, to) {
    var timeline = index.timeline,
        timescale = index.timescale,
        _index$presentationTi = index.presentationTimeOffset,
        presentationTimeOffset = _index$presentationTi === undefined ? 0 : _index$presentationTi;


    var scaledTo = to * timescale - presentationTimeOffset;

    var last = timeline[timeline.length - 1];
    if (!last) {
      return false;
    }

    if (last.d < 0) {
      last = { ts: last.ts, d: 0, r: last.r };
    }

    return !(scaledTo <= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["e" /* getTimelineRangeEnd */])(last));
  },


  /**
   * Returns first position in index.
   * @param {Object} index
   * @returns {Number}
   */
  getFirstPosition: function getFirstPosition(index) {
    if (!index.timeline.length) {
      return undefined;
    }
    return index.timeline[0].ts / index.timescale;
  },


  /**
   * Returns last position in index.
   * @param {Object} index
   * @returns {Number}
   */
  getLastPosition: function getLastPosition(index) {
    if (!index.timeline.length) {
      return undefined;
    }
    var lastTimelineElement = index.timeline[index.timeline.length - 1];
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["e" /* getTimelineRangeEnd */])(lastTimelineElement) / index.timescale;
  },


  /**
   * Checks if the time given is in a discontinuity. That is:
   *   - We're on the upper bound of the current range (end of the range - time
   *     is inferior to the timescale)
   *   - The next range starts after the end of the current range.
   * @param {Object} index
   * @param {Number} _time
   * @returns {Number} - If a discontinuity is present, this is the Starting ts
   * for the next (discontinuited) range. If not this is equal to -1.
   */
  checkDiscontinuity: function checkDiscontinuity(index, _time) {
    var timeline = index.timeline,
        _index$timescale = index.timescale,
        timescale = _index$timescale === undefined ? 1 : _index$timescale;

    var time = _time * timescale;

    if (time <= 0) {
      return -1;
    }

    var segmentIndex = getSegmentIndex(index, time);
    if (segmentIndex < 0 || segmentIndex >= timeline.length - 1) {
      return -1;
    }

    var range = timeline[segmentIndex];
    if (range.d === -1) {
      return -1;
    }

    var rangeUp = range.ts;
    var rangeTo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["e" /* getTimelineRangeEnd */])(range);
    var nextRange = timeline[segmentIndex + 1];

    // when we are actually inside the found range and this range has
    // an explicit discontinuity with the next one
    if (rangeTo !== nextRange.ts && time >= rangeUp && time <= rangeTo && rangeTo - time < timescale) {
      return nextRange.ts / timescale;
    }

    return -1;
  },


  /**
   * Add a new segment to the index.
   *
   * /!\ Mutate the given index
   * @param {Object} index
   * @param {Object} newSegment
   * @param {Number} newSegment.timescale
   * @param {Number} newSegment.time
   * @param {Number} newSegment.duration
   * @param {Object} currentSegment
   * @param {Number} currentSegment.timescale
   * @param {Number} currentSegment.time
   * @returns {Boolean} - true if the segment has been added
   */
  _addSegmentInfos: function _addSegmentInfos(index, newSegment, currentSegment) {
    var timeline = index.timeline,
        timescale = index.timescale;

    var timelineLength = timeline.length;
    var last = timeline[timelineLength - 1];

    var scaledNewSegment = newSegment.timescale === timescale ? {
      time: newSegment.time,
      duration: newSegment.duration
    } : {
      time: newSegment.time / newSegment.timescale * timescale,
      duration: newSegment.duration / newSegment.timescale * timescale
    };

    var scaledCurrentTime = void 0;

    if (currentSegment) {
      scaledCurrentTime = currentSegment.timescale === timescale ? currentSegment.time : currentSegment.time / currentSegment.timescale * timescale;
    }

    // in some circumstances, the new segment informations are only
    // duration informations that we can use to deduct the ts of the
    // next segment. this is the case where the new segment are
    // associated to a current segment and have the same ts
    var shouldDeductNextSegment = scaledCurrentTime != null && scaledNewSegment.time === scaledCurrentTime;
    if (shouldDeductNextSegment) {
      var newSegmentTs = scaledNewSegment.time + scaledNewSegment.duration;
      var lastSegmentTs = last.ts + last.d * last.r;
      var tsDiff = newSegmentTs - lastSegmentTs;

      if (tsDiff <= 0) {
        // same segment / behind the last
        return false;
      }

      // try to use the compact notation with @r attribute on the last
      // to elements of the timeline if we find out they have the same
      // duration
      if (last.d === -1) {
        var prev = timeline[timelineLength - 2];
        if (prev && prev.d === tsDiff) {
          prev.r++;
          timeline.pop();
        } else {
          last.d = tsDiff;
        }
      }

      index.timeline.push({
        d: -1,
        ts: newSegmentTs,
        r: 0
      });
      return true;
    }

    // if the given timing has a timestamp after the timeline end we
    // just need to push a new element in the timeline, or increase
    // the @r attribute of the last element.
    else if (scaledNewSegment.time >= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["e" /* getTimelineRangeEnd */])(last)) {
        if (last.d === scaledNewSegment.duration) {
          last.r++;
        } else {
          index.timeline.push({
            d: scaledNewSegment.duration,
            ts: scaledNewSegment.time,
            r: 0
          });
        }
        return true;
      }

    return false;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (SegmentTimelineHelpers);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getMDHDTimescale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return parseTfdt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getDurationFromTrun; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseSidx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getMdat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return patchPssh; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_bytes__ = __webpack_require__(13);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Find the right atom (box) in an isobmff file from its hexa-encoded name.
 * @param {Uint8Array} buf - the isobmff structure
 * @param {Number} atomName - the 'name' of the box (e.g. 'sidx' or 'moov'),
 * hexa encoded
 * @returns {Number} - offset where the corresponding box is (starting with its
 * size), 0 if not found.
 */
function findAtom(buf, atomName) {
  var l = buf.length;
  var i = 0;

  var name = void 0,
      size = void 0;
  while (i + 8 < l) {
    size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, i);
    name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, i + 4);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_assert__["a" /* default */])(size > 0, "out of range size");
    if (name === atomName) {
      break;
    } else {
      i += size;
    }
  }

  if (i >= l) {
    return -1;
  }

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_assert__["a" /* default */])(i + size <= l, "atom out of range");
  return i;
}

// /**
//  * Parse ISOBMFF and try to find the initial time and the duration of the
//  * segments from different boxes.
//  *
//  */
// function getSegmentTimeInformations(segment, offset) {
//   const sidxContent = parseSidx(segment, offset);
//   if (!sidxContent) {
//   }
// }

/**
 * Parse the sidx part (segment index) of the isobmff.
 * Returns null if not found.
 *
 * @param {Uint8Array} buf
 * @param {Number} offset
 * @returns {Object|null} {Array.<Object>} - Informations about each subsegment.
 * Contains those keys:
 *   - time {Number}: starting _presentation time_ for the subsegment,
 *     timescaled
 *   - duration {Number}: duration of the subsegment, timescaled
 *   - timescale {Number}: the timescale in which the time and duration are set
 *   - count {Number}: always at 0
 *   - range {Array.<Number>}: first and last bytes in the media file
 *     from the anchor point (first byte after the sidx box) for the
 *     concerned subsegment.
 */
function parseSidx(buf, offset) {
  var index = findAtom(buf, 0x73696478 /* "sidx" */);
  if (index == -1) {
    return null;
  }

  var size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, index);
  var pos = index + /* size */4 + /* name */4;

  /* version(8) */
  /* flags(24) */
  /* reference_ID(32); */
  /* timescale(32); */
  var version = buf[pos];pos += 4 + 4;
  var timescale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, pos);pos += 4;

  /* earliest_presentation_time(32 / 64) */
  /* first_offset(32 / 64) */
  var time = void 0;
  if (version === 0) {
    time = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, pos);pos += 4;
    offset += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, pos) + size;pos += 4;
  } else if (version === 1) {
    time = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["f" /* be8toi */])(buf, pos);pos += 8;
    offset += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["f" /* be8toi */])(buf, pos) + size;pos += 8;
  } else {
    return null;
  }

  var segments = [];

  /* reserved(16) */
  /* reference_count(16) */
  pos += 2;
  var count = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["g" /* be2toi */])(buf, pos);
  pos += 2;
  while (--count >= 0) {
    /* reference_type(1) */
    /* reference_size(31) */
    /* segment_duration(32) */
    /* sap..(32) */
    var refChunk = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, pos);
    pos += 4;
    var refType = (refChunk & 0x80000000) >>> 31;
    var refSize = refChunk & 0x7fffffff;

    // when set to 1 indicates that the reference is to a sidx, else to media
    if (refType == 1) {
      throw new Error("not implemented");
    }

    var d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, pos);
    pos += 4;

    // let sapChunk = be4toi(buf, pos + 8);
    pos += 4;

    // TODO(pierre): handle sap
    // let startsWithSap = (sapChunk & 0x80000000) >>> 31;
    // let sapType = (sapChunk & 0x70000000) >>> 28;
    // let sapDelta = sapChunk & 0x0FFFFFFF;

    var ts = time;
    segments.push({
      time: ts,
      duration: d,
      count: 0,
      timescale: timescale,
      range: [offset, offset + refSize - 1]
    });

    time += d;
    offset += refSize;
  }

  return segments;
}

/**
 * Parse track Fragment Decode Time to get a precize initial time for this
 * segment (in the media timescale).
 * Returns this time. -1 if not found.
 * @param {Uint8Array} buffer
 * @returns {Number}
 */
function parseTfdt(buffer) {
  var moof = getAtomContent(buffer, 0x6d6f6f66 /* moof */);
  if (!moof) {
    return -1;
  }

  var traf = getAtomContent(moof, 0x74726166 /* traf */);
  if (!traf) {
    return -1;
  }

  var index = findAtom(traf, 0x74666474 /* tfdt */);
  if (index == -1) {
    return -1;
  }

  var pos = index + /* size */4 + /* name */4;
  var version = traf[pos];pos += 4;
  if (version > 1) {
    return -1;
  }

  return version ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["f" /* be8toi */])(traf, pos) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(traf, pos);
}

function getDefaultDurationFromTFHDInTRAF(traf) {
  var index = findAtom(traf, 0x74666864 /* tfhd */);
  if (index == -1) {
    return -1;
  }

  var pos = index + /* size */4 + /* name */4 + /* version */1;

  var flags = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["h" /* be3toi */])(traf, pos);

  var hasBaseDataOffset = flags & 0x000001;
  var hasSampleDescriptionIndex = flags & 0x000002;
  var hasDefaultSampleDuration = flags & 0x000008;

  if (!hasDefaultSampleDuration) {
    return -1;
  }

  pos += 4;

  if (hasBaseDataOffset) {
    pos += 8;
  }

  if (hasSampleDescriptionIndex) {
    pos += 4;
  }

  var defaultDuration = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(traf, pos);

  return defaultDuration;
}

function getDurationFromTrun(buffer) {
  var moof = getAtomContent(buffer, 0x6d6f6f66 /* moof */);
  if (!moof) {
    return -1;
  }

  var traf = getAtomContent(moof, 0x74726166 /* traf */);
  if (!traf) {
    return -1;
  }

  var index = findAtom(traf, 0x7472756e /* tfdt */);
  if (index == -1) {
    return -1;
  }

  var pos = index + /* size */4 + /* name */4;
  var version = traf[pos];pos += 1;
  if (version > 1) {
    return -1;
  }
  var flags = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["h" /* be3toi */])(traf, pos);pos += 3;
  var hasSampleDuration = flags & 0x000100;

  var defaultDuration = 0;
  if (!hasSampleDuration) {
    defaultDuration = getDefaultDurationFromTFHDInTRAF(traf);
    if (defaultDuration >= 0) {
      return defaultDuration;
    }
    return -1;
  }

  var hasDataOffset = flags & 0x000001;
  var hasFirstSampleFlags = flags & 0x000004;
  var hasSampleSize = flags & 0x000200;
  var hasSampleFlags = flags & 0x000400;
  var hasSampleCompositionOffset = flags & 0x000800;

  var sampleCounts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(traf, pos);pos += 4;

  if (hasDataOffset) {
    pos += 4;
  }

  if (hasFirstSampleFlags) {
    pos += 4;
  }

  var i = sampleCounts;
  var duration = 0;
  while (i--) {
    if (hasSampleDuration) {
      duration += __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(traf, pos);
      pos += 4;
    } else {
      duration += defaultDuration;
    }
    if (hasSampleSize) {
      pos += 4;
    }
    if (hasSampleFlags) {
      pos += 4;
    }
    if (hasSampleCompositionOffset) {
      pos += 4;
    }
  }

  return duration;
}

/**
 * Get various informations from a movie header box. Found in init segments.
 * null if not found or not parsed.
 * @param {Uint8Array} buffer
 * @returns {Number}
 */
function getMDHDTimescale(buffer) {
  var moov = getAtomContent(buffer, 0x6d6f6f76 /* moov */);
  if (!moov) {
    return -1;
  }
  var trak = getAtomContent(moov, 0x7472616b /* "trak" */);
  if (index == -1) {
    return -1;
  }

  var mdia = getAtomContent(trak, 0x6d646961 /* "mdia" */);
  if (index == -1) {
    return -1;
  }

  var index = findAtom(mdia, 0x6d646864 /* "mdhd" */);
  if (index / -1) {
    return -1;
  }

  var pos = index + /* size */4 + /* name */4;

  var version = mdia[pos];pos += 4;
  if (version === 1) {
    pos += 16;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(mdia, pos);
  } else if (version == 0) {
    pos += 8;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(mdia, pos);
  } else {
    return -1;
  }
}

/**
 * @param {Uint8Array} buf - the isobmff structure
 * @param {Number} atomName - the 'name' of the box (e.g. 'sidx' or 'moov'),
 * hexa encoded
 * @returns {UInt8Array}
 */
function getAtomContent(buf, atomName) {
  var l = buf.length;
  var i = 0;

  var name = void 0,
      size = void 0;
  while (i + 8 < l) {
    size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, i);
    name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, i + 4);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_assert__["a" /* default */])(size > 0, "out of range size");
    if (name === atomName) {
      break;
    } else {
      i += size;
    }
  }

  if (i < l) {
    return buf.subarray(i + 8, i + size);
  } else {
    return null;
  }
}

function getMdat(buf) {
  return getAtomContent(buf, 0x6D646174 /* "mdat" */);
}

/**
 * Create a new _Atom_ (isobmff box).
 * @param {string} name - The box name (e.g. sidx, moov, pssh etc.)
 * @param {Uint8Array} buff - The box's content
 */
function Atom(name, buff) {
  var len = buff.length + 8;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["i" /* concat */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["j" /* itobe4 */])(len), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["b" /* strToBytes */])(name), buff);
}

/**
 * Returns a PSSH Atom from a systemId and private data.
 * @param {Object} args
 * @returns {Uint8Array}
 */
function createPssh(_ref) {
  var systemId = _ref.systemId,
      privateData = _ref.privateData;

  systemId = systemId.replace(/-/g, "");

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_assert__["a" /* default */])(systemId.length === 32);
  return Atom("pssh", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["i" /* concat */])(4, // 4 initial zeroed bytes
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["k" /* hexToBytes */])(systemId), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["j" /* itobe4 */])(privateData.length), privateData));
}

/**
 * Update ISOBMFF given to add a "pssh" box in the "moov" box for every content
 * protection in the pssList array given.
 * @param {Uint8Array} buf - the ISOBMFF file
 * @param {Array.<Object>} pssList - The content protections under the form of
 * objects containing two properties:
 *   - systemId {string}: The uuid code. Should only contain 32 hexadecimal
 *     numbers and hyphens
 *   - privateData {*}: private data associated.
 * @returns {Uint8Array} - The new ISOBMFF generated.
 */
function patchPssh(buf, pssList) {
  if (!pssList || !pssList.length) {
    return buf;
  }

  var pos = findAtom(buf, 0x6d6f6f76 /* = "moov" */);
  if (pos == -1) {
    return buf;
  }

  var size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["e" /* be4toi */])(buf, pos); // size of the "moov" box
  var moov = buf.subarray(pos, pos + size);

  var newmoov = [moov];
  for (var i = 0; i < pssList.length; i++) {
    newmoov.push(createPssh(pssList[i]));
  }

  newmoov = __WEBPACK_IMPORTED_MODULE_1__utils_bytes__["i" /* concat */].apply(null, newmoov);
  newmoov.set(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["j" /* itobe4 */])(newmoov.length), 0); // overwrite "moov" length

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["i" /* concat */])(buf.subarray(0, pos), newmoov, buf.subarray(pos + size));
}



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_bytes__ = __webpack_require__(13);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * Sampling frequencies defined in MPEG-4 Audio.
 * @type {Array.<Number>}
 */
var SAMPLING_FREQUENCIES = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

/**
 * Speed up string to bytes conversion by memorizing the result
 *
 * The keys here are ISOBMFF box names. The values are the corresponding
 * bytes conversion for putting as an ISOBMFF boxes.
 *
 * Used by the boxName method.
 * @type {Object}
 */
var boxNamesMem = {};

/**
 * Convert the string name of an ISOBMFF box into the corresponding bytes.
 * Has a memorization mechanism to speed-up if you want to translate the
 * same string multiple times.
 * @param {string} str
 * @returns {Uint8Array}
 */
function boxName(str) {
  if (boxNamesMem[str]) {
    return boxNamesMem[str];
  }

  var nameInBytes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */])(str);
  boxNamesMem[str] = nameInBytes;
  return nameInBytes;
}

/**
 * Create a new ISOBMFF "box" with the given name.
 * @param {string} name - name of the box you want to create, must always
 * be 4 characters (uuid boxes not supported)
 * @param {Uint8Array} buff - content of the box
 * @returns {Uint8Array} - The entire ISOBMFF box (length+name+content)
 */
function Atom(name, buff) {
  if (false) {
    assert(name.length === 4);
  }

  var len = buff.length + 8;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(len), boxName(name), buff);
}

function readUuid(buf, id1, id2, id3, id4) {
  var l = buf.length;
  var i = 0,
      len = void 0;
  while (i < l) {
    len = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(buf, i);
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(buf, i + 4) === 0x75756964 /* === "uuid" */ && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(buf, i + 8) === id1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(buf, i + 12) === id2 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(buf, i + 16) === id3 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(buf, i + 20) === id4) {
      return buf.subarray(i + 24, i + len);
    }
    i += len;
  }
}

function findAtom(buf, atomName) {
  var l = buf.length;
  var i = 0;

  var name = void 0,
      size = void 0;
  while (i + 8 < l) {
    size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(buf, i);
    name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(buf, i + 4);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_assert__["a" /* default */])(size > 0, "smooth: out of range size");
    if (name === atomName) {
      break;
    } else {
      i += size;
    }
  }

  if (i < l) {
    return buf.subarray(i + 8, i + size);
  } else {
    return null;
  }
}

var atoms = {
  mult: function mult(name, children) {
    return Atom(name, __WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */].apply(null, children));
  },


  /**
   * @param {string} name - "avc1" or "encv"
   * @param {Number} drefIdx - shall be 1
   * @param {Number} width
   * @param {Number} height
   * @param {Number} hRes - horizontal resolution, eg 72
   * @param {Number} vRes - horizontal resolution, eg 72
   * @param {Number} colorDepth - eg 24
   * @param {Uint8Array} avcc - Uint8Array representing the avcC atom
   * @param {Uint8Array} sinf - Uint8Array representing the sinf atom,
   * only if name == "encv"
   */
  avc1encv: function avc1encv(name, drefIdx, width, height, hRes, vRes, encName, colorDepth, avcc, sinf) {
    if (false) {
      assert(name === "avc1" || name === "encv", "should be avc1 or encv atom");
    }
    return Atom(name, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(6, // 6 bytes reserved
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(drefIdx), 16, // drefIdx + QuickTime reserved, zeroes
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(width), // size 2 w
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(height), // size 2 h
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(hRes), 2, // reso 4 h
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(vRes), 2 + 4, // reso 4 v + QuickTime reserved, zeroes
    [0, 1, encName.length], // frame count (default 1)
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */])(encName), // 1byte len + encoder name str
    31 - encName.length, // + padding
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(colorDepth), // color depth
    [0xFF, 0xFF], // reserved ones
    avcc, // avcc atom,
    name === "encv" ? sinf : []));
  },


  /**
   * @param {string} spsHex
   * @param {string} ppsHex
   * @param {Number} nalLen - NAL Unit length: 1, 2 or 4 bytes
   * eg: avcc(0x4d, 0x40, 0x0d, 4, 0xe1, "674d400d96560c0efcb80a70505050a0",
   * 1, "68ef3880")
   */
  avcc: function avcc(sps, pps, nalLen) {
    var nal = nalLen === 2 ? 0x1 : nalLen === 4 ? 0x3 : 0x0;

    // Deduce AVC Profile from SPS
    var h264Profile = sps[1];
    var h264CompatibleProfile = sps[2];
    var h264Level = sps[3];

    return Atom("avcC", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])([1, h264Profile, h264CompatibleProfile, h264Level, 0x3F << 2 | nal, 0xE0 | 1], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(sps.length), sps, [1], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(pps.length), pps));
  },
  dref: function dref(url) {
    // only one description here... FIXME
    return Atom("dref", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(7, [1], url));
  },


  /**
   * @param {Number} stream
   * @param {string} codecPrivateData - hex string
   * eg: esds(1, 98800, "1190")
   */
  esds: function esds(stream, codecPrivateData) {
    return Atom("esds", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(4, [0x03, 0x19], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(stream), [0x00, 0x04, 0x11, 0x40, 0x15], 11, [0x05, 0x02], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["k" /* hexToBytes */])(codecPrivateData), [0x06, 0x01, 0x02]));
  },


  /**
   * @param {string} dataFormat - four letters (eg "avc1")
   */
  frma: function frma(dataFormat) {
    if (false) {
      assert.equal(dataFormat.length, 4, "wrong data format length");
    }
    return Atom("frma", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */])(dataFormat));
  },
  free: function free(length) {
    return Atom("free", new Uint8Array(length - 8));
  },
  ftyp: function ftyp(majorBrand, brands) {
    return Atom("ftyp", __WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */].apply(null, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */])(majorBrand), [0, 0, 0, 1]].concat(brands.map(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */]))));
  },


  /**
   * @param {string} type - "video" or "audio"
   */
  hdlr: function hdlr(type) {
    var name = void 0,
        handlerName = void 0;

    switch (type) {
      case "video":
        name = "vide";
        handlerName = "VideoHandler";
        break;
      case "audio":
        name = "soun";
        handlerName = "SoundHandler";
        break;
      default:
        name = "hint";
        handlerName = "";
        break;
    }

    return Atom("hdlr", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(8, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */])(name), 12, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */])(handlerName), 1 // handler name is C-style string (0 terminated)
    ));
  },
  mdhd: function mdhd(timescale) {
    return Atom("mdhd", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(12, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(timescale), 8));
  },
  moof: function moof(mfhd, traf) {
    return atoms.mult("moof", [mfhd, traf]);
  },


  /**
   * @param {string} name - "mp4a" or "enca"
   * @param {Number} drefIdx
   * @param {Number} channelsCount
   * @param {Number} sampleSize
   * @param {Number} packetSize
   * @param {Number} sampleRate
   * @param {Uint8Array} esds - Uint8Array representing the esds atom
   * @param {Uint8Array} sinf Uint8Array representing the sinf atom,
   * only if name == "enca"
   */
  mp4aenca: function mp4aenca(name, drefIdx, channelsCount, sampleSize, packetSize, sampleRate, esds, sinf) {
    return Atom(name, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(6, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(drefIdx), 8, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(channelsCount), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(sampleSize), 2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(packetSize), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(sampleRate), 2, esds, name === "enca" ? sinf : []));
  },
  mvhd: function mvhd(timescale, trackId) {
    return Atom("mvhd", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(12, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(timescale), 4, [0, 1], 2, // we assume rate = 1;
    [1, 0], 10, // we assume volume = 100%;
    [0, 1], 14, // default matrix
    [0, 1], 14, // default matrix
    [64, 0, 0, 0], 26, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(trackId + 1) // next trackId (=trackId + 1);
    ));
  },


  /**
   * @param {string} systemId - Hex string representing the CDM, 16 bytes.
   * @param {Uint8Array} privateData - Data associated to protection specific
   * system.
   * @param {[]Uint8Array} keyIds - List of key ids contained in the PSSH
   */
  pssh: function pssh(systemId) {
    var privateData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var keyIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    systemId = systemId.replace(/-/g, "");

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_assert__["a" /* default */])(systemId.length === 32, "wrong system id length");

    var version = void 0;
    var kidList = void 0;
    var kidCount = keyIds.length;
    if (kidCount > 0) {
      version = 1;
      kidList = __WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */].apply(null, [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(kidCount)].concat(keyIds));
    } else {
      version = 0;
      kidList = [];
    }

    return Atom("pssh", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])([version, 0, 0, 0], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["k" /* hexToBytes */])(systemId), kidList, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(privateData.length), privateData));
  },
  saio: function saio(mfhd, tfhd, tfdt, trun) {
    return Atom("saio", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(4, [0, 0, 0, 1], // ??
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(mfhd.length + tfhd.length + tfdt.length + trun.length + 8 + 8 + 8 + 8)));
  },


  /**
   * @param {Uint8Array} sencData - including 8 bytes flags and entries count
   */
  saiz: function saiz(senc) {
    if (senc.length === 0) {
      return Atom("saiz", new Uint8Array());
    }

    var flags = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(senc, 0);
    var entries = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(senc, 4);

    var arr = new Uint8Array(9 + entries);
    arr.set(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(entries), 5);

    var i = 9;
    var j = 8;
    var pairsCnt = void 0;
    var pairsLen = void 0;
    while (j < senc.length) {
      j += 8; // assuming IV is 8 bytes TODO handle 16 bytes IV
      // if we have extradata for each entry
      if ((flags & 0x2) === 0x2) {
        pairsLen = 2;
        pairsCnt = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["g" /* be2toi */])(senc, j);
        j += 2 + pairsCnt * 6;
      } else {
        pairsCnt = 0;
        pairsLen = 0;
      }
      arr[i] = pairsCnt * 6 + 8 + pairsLen;
      i++;
    }

    return Atom("saiz", arr);
  },


  /**
   * @param {string} schemeType - four letters (eg "cenc" for Common Encryption)
   * @param {Number} schemeVersion - eg 65536
   */
  schm: function schm(schemeType, schemeVersion) {
    if (false) {
      assert.equal(schemeType.length, 4, "wrong scheme type length");
    }
    return Atom("schm", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(4, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */])(schemeType), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(schemeVersion)));
  },
  senc: function senc(buf) {
    return Atom("senc", buf);
  },
  smhd: function smhd() {
    return Atom("smhd", new Uint8Array(8));
  },


  /**
   * @param {Array} representations - arrays of Uint8Array, typically [avc1]
   * or [encv, avc1]
   * @returns {Uint8Array}
   */
  stsd: function stsd(reps) {
    // only one description here... FIXME
    return Atom("stsd", __WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */].apply(null, [7, [reps.length]].concat(reps)));
  },
  tkhd: function tkhd(width, height, trackId) {
    return Atom("tkhd", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(1 + 2 + 4), 8, // we assume track is enabled,
    // in media and in preview.
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(trackId), 20, // we assume trackId = 1;
    [1, 0, 0, 0], // we assume volume = 100%;
    [0, 1, 0, 0], 12, // default matrix
    [0, 1, 0, 0], 12, // default matrix
    [64, 0, 0, 0], // ??
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(width), 2, // width (TODO handle fixed)
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(height), 2 // height (TODO handle fixed)
    ));
  },
  trex: function trex(trackId) {
    // default sample desc idx = 1
    return Atom("trex", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(4, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(trackId), [0, 0, 0, 1], 12));
  },
  tfdt: function tfdt(decodeTime) {
    return Atom("tfdt", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])([1, 0, 0, 0], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["o" /* itobe8 */])(decodeTime)));
  },


  /**
   * @param {Number} algId - eg 1
   * @param {Number} ivSize - eg 8
   * @param {string} keyId - Hex KID 93789920e8d6520098577df8f2dd5546
   */
  tenc: function tenc(algId, ivSize, keyId) {
    if (false) {
      assert.equal(keyId.length, 32, "wrong default KID length");
    }
    return Atom("tenc", __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(6, [algId, ivSize], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["k" /* hexToBytes */])(keyId)));
  },
  traf: function traf(tfhd, tfdt, trun, senc, mfhd) {
    var trafs = [tfhd, tfdt, trun];
    if (senc) {
      trafs.push(atoms.senc(senc), atoms.saiz(senc), atoms.saio(mfhd, tfhd, tfdt, trun));
    }
    return atoms.mult("traf", trafs);
  },
  trun: function trun(oldtrun) {
    var headersLast = oldtrun[11];
    var hasDataOffset = headersLast & 0x01;
    if (hasDataOffset) {
      return oldtrun;
    }

    // If no dataoffset is present, we change the headers and add one
    var trun = new Uint8Array(oldtrun.length + 4);
    trun.set(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(oldtrun.length + 4), 0);
    trun.set(oldtrun.subarray(4, 16), 4); // name + (version + headers) +
    // samplecount
    trun[11] = trun[11] | 0x01; // add data offset header info
    trun.set([0, 0, 0, 0], 16); // data offset
    trun.set(oldtrun.subarray(16, oldtrun.length), 20);
    return trun;
  },
  vmhd: function vmhd() {
    var arr = new Uint8Array(12);
    arr[3] = 1; // QuickTime...
    return Atom("vmhd", arr);
  }
};

var reads = {
  traf: function traf(buff) {
    var moof = findAtom(buff, 0x6D6F6F66);
    if (moof) {
      return findAtom(moof, 0x74726166);
    } else {
      return null;
    }
  },


  /**
   * Extract senc data (derived from UUID MS Atom)
   * @param {Uint8Array} traf
   */
  senc: function senc(traf) {
    return readUuid(traf, 0xA2394F52, 0x5A9B4F14, 0xA2446C42, 0x7C648DF4);
  },


  /**
   * Extract tfxd data (derived from UUID MS Atom)
   * @param {Uint8Array} traf
   */
  tfxd: function tfxd(traf) {
    return readUuid(traf, 0x6D1D9B05, 0x42D544E6, 0x80E2141D, 0xAFF757B2);
  },


  /**
   * Extract tfrf data (derived from UUID MS Atom)
   * @param {Uint8Array} traf
   */
  tfrf: function tfrf(traf) {
    return readUuid(traf, 0xD4807EF2, 0XCA394695, 0X8E5426CB, 0X9E46A79F);
  },
  mdat: function mdat(buff) {
    return findAtom(buff, 0x6D646174 /* "mdat" */);
  }
};

/**
 * Return AAC ES Header (hexstr form)
 *
 * @param {Number} type
 *          1 = AAC Main
 *          2 = AAC LC
 *          cf http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio
 * @param {Number} frequency
 * @param {Number} chans (1 or 2)
 */
function aacesHeader(type, frequency, chans) {
  var freq = SAMPLING_FREQUENCIES.indexOf(frequency);
  if (false) {
    assert(freq >= 0, "non supported frequency"); // TODO : handle Idx = 15...
  }
  var val = void 0;
  val = (type & 0x3F) << 0x4;
  val = (val | freq & 0x1F) << 0x4;
  val = (val | chans & 0x1F) << 0x3;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["p" /* bytesToHex */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["n" /* itobe2 */])(val));
}

function moovChildren(mvhd, mvex, trak, pssList) {
  var moov = [mvhd, mvex, trak];
  pssList.forEach(function (pss) {
    var pssh = atoms.pssh(pss.systemId, pss.privateData, pss.keyIds);
    moov.push(pssh);
  });
  return moov;
}

function patchTrunDataOffset(segment, trunoffset, dataOffset) {
  // patch trun dataoffset with new moof atom size
  segment.set(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["j" /* itobe4 */])(dataOffset), trunoffset + 16);
}

function createNewSegment(segment, newmoof, oldmoof, trunoffset) {
  var segmentlen = segment.length;
  var newmooflen = newmoof.length;
  var oldmooflen = oldmoof.length;
  var mdat = segment.subarray(oldmooflen, segmentlen);
  var newSegment = new Uint8Array(newmooflen + (segmentlen - oldmooflen));
  newSegment.set(newmoof, 0);
  newSegment.set(mdat, newmooflen);
  patchTrunDataOffset(newSegment, trunoffset, newmoof.length + 8);
  return newSegment;
}

function patchSegmentInPlace(segment, newmoof, oldmoof, trunoffset) {
  var free = oldmoof.length - newmoof.length;
  segment.set(newmoof, 0);
  segment.set(atoms.free(free), newmoof.length);
  patchTrunDataOffset(segment, trunoffset, newmoof.length + 8 + free);
  return segment;
}

/**
 * @param {Number} timescale
 * @param {string} type
 * @param {Uint8Array} stsd
 * @param {Uint8Array} mhd
 * @param {Number} width
 * @param {Number} height
 * @param {Array.<Object>} [pssList] - List of dict, example:
 * {systemId: "DEADBEEF", codecPrivateData: "DEAFBEEF}
 * @returns {Uint8Array}
 */
function createInitSegment(timescale, type, stsd, mhd, width, height, pssList) {

  var stbl = atoms.mult("stbl", [stsd, Atom("stts", new Uint8Array(0x08)), Atom("stsc", new Uint8Array(0x08)), Atom("stsz", new Uint8Array(0x0c)), Atom("stco", new Uint8Array(0x08))]);

  var url = Atom("url ", new Uint8Array([0, 0, 0, 1]));
  var dref = atoms.dref(url);
  var dinf = atoms.mult("dinf", [dref]);
  var minf = atoms.mult("minf", [mhd, dinf, stbl]);
  var hdlr = atoms.hdlr(type);
  var mdhd = atoms.mdhd(timescale); //this one is really important
  var mdia = atoms.mult("mdia", [mdhd, hdlr, minf]);
  var tkhd = atoms.tkhd(width, height, 1);
  var trak = atoms.mult("trak", [tkhd, mdia]);
  var trex = atoms.trex(1);
  var mvex = atoms.mult("mvex", [trex]);
  var mvhd = atoms.mvhd(timescale, 1); // in fact, we don't give a sh** about
  // this value :O

  var moov = atoms.mult("moov", moovChildren(mvhd, mvex, trak, pssList));
  var ftyp = atoms.ftyp("isom", ["isom", "iso2", "iso6", "avc1", "dash"]);

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])(ftyp, moov);
}

// TODO
/* harmony default export */ __webpack_exports__["a"] = ({
  getMdat: reads.mdat,
  getTraf: reads.traf,

  parseTfrf: function parseTfrf(traf) {
    var tfrf = reads.tfrf(traf);
    if (!tfrf) {
      return [];
    }

    var frags = [];
    var version = tfrf[0];
    var fragCount = tfrf[4];
    for (var i = 0; i < fragCount; i++) {
      var duration = void 0,
          time = void 0;
      if (version == 1) {
        time = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["f" /* be8toi */])(tfrf, 16 * i + 5);
        duration = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["f" /* be8toi */])(tfrf, 16 * i + 5 + 8);
      } else {
        time = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(tfrf, 8 * i + 5);
        duration = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(tfrf, 8 * i + 5 + 4);
      }
      frags.push({
        time: time,
        duration: duration
      });
    }
    return frags;
  },
  parseTfxd: function parseTfxd(traf) {
    var tfxd = reads.tfxd(traf);
    if (tfxd) {
      return {
        duration: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["f" /* be8toi */])(tfxd, 12),
        time: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["f" /* be8toi */])(tfxd, 4)
      };
    }
  },


  /**
   * Return full Init segment as Uint8Array
   *
   * @param {Number} timescale - lowest number, this one will be set into mdhd
   * *10000 in mvhd, e.g. 1000
   * @param {Number} width
   * @param {Number} height
   * @param {Number} hRes
   * @param {Number} vRes
   * @param {Number} nalLength (1, 2 or 4)
   * @param {string} codecPrivateData
   * @param {string} keyId - hex string representing the key Id,
   * 32 chars. eg. a800dbed49c12c4cb8e0b25643844b9b
   * @param {Array.<Object>} [pssList] - List of dict, example:
   * {systemId: "DEADBEEF", codecPrivateData: "DEAFBEEF}
   * @returns {Uint8Array}
   */
  createVideoInitSegment: function createVideoInitSegment(timescale, width, height, hRes, vRes, nalLength, codecPrivateData, keyId, pssList) {

    if (!pssList) {
      pssList = [];
    }

    var _codecPrivateData$spl = codecPrivateData.split("00000001"),
        spsHex = _codecPrivateData$spl[1],
        ppsHex = _codecPrivateData$spl[2];

    var sps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["k" /* hexToBytes */])(spsHex);
    var pps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["k" /* hexToBytes */])(ppsHex);

    // TODO NAL length is forced to 4
    var avcc = atoms.avcc(sps, pps, nalLength);
    var stsd = void 0;
    if (!pssList.length) {
      var avc1 = atoms.avc1encv("avc1", // name
      1, // drefIdx
      width, height, hRes, vRes, "AVC Coding", // encName
      24, // color depth
      avcc);
      stsd = atoms.stsd([avc1]);
    } else {
      var tenc = atoms.tenc(1, 8, keyId);
      var schi = atoms.mult("schi", [tenc]);
      var schm = atoms.schm("cenc", 65536);
      var frma = atoms.frma("avc1");
      var sinf = atoms.mult("sinf", [frma, schm, schi]);
      var encv = atoms.avc1encv("encv", 1, width, height, hRes, vRes, "AVC Coding", 24, avcc, sinf);
      stsd = atoms.stsd([encv]);
    }

    return createInitSegment(timescale, "video", stsd, atoms.vmhd(), width, height, pssList);
  },


  /**
   * Return full Init segment as Uint8Array
   *
   * @param {Number} channelsCount
   * @param {Number} sampleSize
   * @param {Number} packetSize
   * @param {Number} sampleRate
   * @param {string} codecPrivateData
   * @param {Array } [pssList] - List of dict, example:
   * {systemId: "DEADBEEF", codecPrivateData: "DEAFBEEF"}
   * @param {string} keyId - hex string representing the key Id, 32 chars.
   * eg. a800dbed49c12c4cb8e0b25643844b9b
   * @returns {Uint8Array}
   */
  createAudioInitSegment: function createAudioInitSegment(timescale, channelsCount, sampleSize, packetSize, sampleRate, codecPrivateData, keyId, pssList) {

    if (!pssList) {
      pssList = [];
    }
    if (!codecPrivateData) {
      codecPrivateData = aacesHeader(2, sampleRate, channelsCount);
    }

    var esds = atoms.esds(1, codecPrivateData);
    var stsd = void 0;
    if (!pssList.length) {
      var mp4a = atoms.mp4aenca("mp4a", 1, channelsCount, sampleSize, packetSize, sampleRate, esds);
      stsd = atoms.stsd([mp4a]);
    } else {
      var tenc = atoms.tenc(1, 8, keyId);
      var schi = atoms.mult("schi", [tenc]);
      var schm = atoms.schm("cenc", 65536);
      var frma = atoms.frma("mp4a");
      var sinf = atoms.mult("sinf", [frma, schm, schi]);
      var enca = atoms.mp4aenca("enca", 1, channelsCount, sampleSize, packetSize, sampleRate, esds, sinf);
      stsd = atoms.stsd([enca]);
    }

    return createInitSegment(timescale, "audio", stsd, atoms.smhd(), 0, 0, pssList);
  },


  /**
   * Add decodeTime info in a segment (tfdt box)
   */
  patchSegment: function patchSegment(segment, decodeTime) {
    if (false) {
      // TODO handle segments with styp/free...
      var name = bytesToStr(segment.subarray(4, 8));
      assert(name === "moof");
    }

    var oldmoof = segment.subarray(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(segment, 0));
    var newtfdt = atoms.tfdt(decodeTime);

    // reads [moof[mfhd|traf[tfhd|trun|..]]]
    var tfdtlen = newtfdt.length;
    var mfhdlen = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(oldmoof, 8);
    var traflen = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(oldmoof, 8 + mfhdlen);
    var tfhdlen = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(oldmoof, 8 + mfhdlen + 8);
    var trunlen = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["e" /* be4toi */])(oldmoof, 8 + mfhdlen + 8 + tfhdlen);
    var oldmfhd = oldmoof.subarray(8, 8 + mfhdlen);
    var oldtraf = oldmoof.subarray(8 + mfhdlen + 8, 8 + mfhdlen + 8 + traflen - 8);
    var oldtfhd = oldtraf.subarray(0, tfhdlen);
    var oldtrun = oldtraf.subarray(tfhdlen, tfhdlen + trunlen);

    // force trackId=1 since trackIds are not always reliable...
    oldtfhd.set([0, 0, 0, 1], 12);

    var oldsenc = reads.senc(oldtraf);

    // writes [moof[mfhd|traf[tfhd|tfdt|trun|senc|saiz|saio]]]
    var newtrun = atoms.trun(oldtrun);
    var newtraf = atoms.traf(oldtfhd, newtfdt, newtrun, oldsenc, oldmfhd);
    var newmoof = atoms.moof(oldmfhd, newtraf);

    var trunoffset = 8 + mfhdlen + 8 + tfhdlen + tfdtlen;
    // TODO(pierre): fix patchSegmentInPlace to work with IE11. Maybe
    // try to put free atom inside traf children
    if (__WEBPACK_IMPORTED_MODULE_1__compat__["r" /* isIE */]) {
      return createNewSegment(segment, newmoof, oldmoof, trunoffset);
    } else {
      if (oldmoof.length - newmoof.length >= 8 /* minimum "free" atom size */) {
          return patchSegmentInPlace(segment, newmoof, oldmoof, trunoffset);
        } else {
        return createNewSegment(segment, newmoof, oldmoof, trunoffset);
      }
    }
  }
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _lastId = 0;

var generateNewId = function generateNewId() {
  var newId = 0;
  if (_lastId < Number.MAX_VALUE) {
    newId = _lastId + 1;
  }
  _lastId = newId;
  return "" + newId;
};

/* harmony default export */ __webpack_exports__["a"] = (generateNewId);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors__ = __webpack_require__(6);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var toJSONForIE = function toJSONForIE(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

/**
 * # request function
 *
 * Translate AJAX Requests into Rx.js Observables.
 *
 * ## Overview
 *
 * Perform the request on subscription, the Rx.js way.
 * Emit progress and response. Throw if an error happened or if the status code
 * is not in the 200 range. Complete after emitting the response.
 * Abort the xhr on unsubscription.
 *
 * ## Emitted Objects
 *
 * The emitted objects are under the following form:
 *   {
 *     type {string}: the type of event
 *     value {Object}: the event value
 *   }
 *
 * The type of event can either be "progress" or "response". The value is under
 * a different form depending on the type.
 *
 * For "progress" events, the value should be the following object:
 *   {
 *     url {string}: url on which the request is being done
 *     sentTime {Number}: timestamp at which the request was sent.
 *     currentTime {Number}: timestamp at which the progress event was
 *                           triggered
 *     loadedSize {Number}: current size downloaded, in bytes (without
 *                          overhead)
 *     totalSize {Number|undefined}: total size to download, in bytes
 *                                   (without overhead)
 *   }
 *
 * For "response" events, the value should be the following object:
 *   {
 *     status {Number}: xhr status code
 *     url {string}: url on which the request was done
 *     responseType {string}: the responseType of the request
 *                            (e.g. "json", "document"...)
 *     sentTime {Number}: timestamp at which the request was sent.
 *     receivedTime {Number}: timestamp at which the response was received.
 *     size {Number}: size of the received data, in bytes
 *     responseData {*}: Data in the response. Format depends on the
 *                       responseType.
 *   }
 *
 * For any succesful request you should have 0+ "request" events and 1
 * "response" event.
 *
 * ## Errors
 *
 * Several errors can be emitted (the Rx.js way). Namely:
 *   - timeout error (code RequestErrorTypes.TIMEOUT_ERROR)
 *   - parse error (code RequestErrorTypes.PARSE_ERROR)
 *   - http code error (RequestErrorTypes.ERROR_HTTP_CODE)
 *   - error from the xhr's "error" event (RequestErrorTypes.ERROR_EVENT)
 *
 * @param {Object} options
 * @param {string} options.url
 * @param {Object} [options.headers]
 * @param {string} [options.method="GET"]
 * @param {string} [options.responseType="json"]
 * @param {Number} [options.timeout=30000]
 * @param {Boolean} [options.ignoreProgressEvents]
 * @param {*} [options.body]
 *
 * @returns {Observable}
 */

/* harmony default export */ __webpack_exports__["a"] = (function (options) {
  var request = {
    url: "",
    headers: null,
    method: "GET",
    responseType: "json",
    timeout: 30 * 1000,
    body: undefined
  };

  for (var prop in request) {
    if (options.hasOwnProperty(prop)) {
      request[prop] = options[prop];
    }
  }

  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(function (obs) {
    var url = request.url,
        headers = request.headers,
        method = request.method,
        responseType = request.responseType,
        timeout = request.timeout,
        body = request.body;

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    if (timeout >= 0) {
      xhr.timeout = timeout;
    }

    xhr.responseType = responseType;

    if (xhr.responseType === "document") {
      xhr.overrideMimeType("text/xml");
    }

    if (headers) {
      for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    var sentTime = Date.now();

    xhr.onerror = function onXHRError() {
      var errorCode = __WEBPACK_IMPORTED_MODULE_1__errors__["j" /* RequestErrorTypes */].ERROR_EVENT;
      obs.error(new __WEBPACK_IMPORTED_MODULE_1__errors__["h" /* RequestError */](xhr, url, errorCode));
    };

    xhr.ontimeout = function onXHRTimeout() {
      var errorCode = __WEBPACK_IMPORTED_MODULE_1__errors__["j" /* RequestErrorTypes */].TIMEOUT;
      obs.error(new __WEBPACK_IMPORTED_MODULE_1__errors__["h" /* RequestError */](xhr, url, errorCode));
    };

    if (!options.ignoreProgressEvents) {
      xhr.onprogress = function onXHRProgress(event) {
        obs.next({
          type: "progress",
          value: {
            url: url,
            sentTime: sentTime,
            currentTime: Date.now(),
            loadedSize: event.loaded,
            totalSize: event.total
          }
        });
      };
    }

    xhr.onload = function onXHRLoad(event) {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var receivedTime = Date.now();
          var totalSize = event.total;
          var status = xhr.status;
          var _responseType = xhr.responseType;
          var _url = xhr.responseURL || url;

          var responseData = void 0;
          if (_responseType === "json") {
            // IE bug where response is string with responseType json
            if (typeof xhr.response != "string") {
              responseData = xhr.response;
            } else {
              responseData = toJSONForIE(xhr.responseText);
            }
          } else {
            responseData = xhr.response;
          }

          if (responseData == null) {
            var errorCode = __WEBPACK_IMPORTED_MODULE_1__errors__["j" /* RequestErrorTypes */].PARSE_ERROR;
            obs.error(new __WEBPACK_IMPORTED_MODULE_1__errors__["h" /* RequestError */](xhr, _url, errorCode));
            return;
          }

          obs.next({
            type: "response",
            value: {
              status: status,
              url: _url,
              responseType: _responseType,
              sentTime: sentTime,
              receivedTime: receivedTime,
              size: totalSize,
              responseData: responseData
            }
          });
          obs.complete();
        } else {
          var _errorCode = __WEBPACK_IMPORTED_MODULE_1__errors__["j" /* RequestErrorTypes */].ERROR_HTTP_CODE;
          obs.error(new __WEBPACK_IMPORTED_MODULE_1__errors__["h" /* RequestError */](xhr, url, _errorCode));
        }
      }
    };

    if (body !== undefined) {
      xhr.send(body);
    } else {
      xhr.send();
    }

    return function () {
      if (xhr && xhr.readyState !== 4) {
        xhr.abort();
      }
    };
  });
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tryCatch;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @param {Function} func - A function you want to execute
 * @param {*} args - The function's argument
 * @returns {*} - If it fails, returns a throwing Observable, else the
 * function's result (which should be, in most cases, an Observable).
 */
function tryCatch(func, args) {
  try {
    return func(args);
  } catch (e) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].throw(e);
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(5);
var ObjectUnsubscribedError_1 = __webpack_require__(50);
/**
 * @class BehaviorSubject<T>
 */
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        _super.call(this);
        this._value = _value;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject_1.Subject));
exports.BehaviorSubject = BehaviorSubject;
//# sourceMappingURL=BehaviorSubject.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
exports.ScalarObservable = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(14);
var subscribeToResult_1 = __webpack_require__(16);
/**
 * Converts a higher-order Observable into a first-order Observable which
 * concurrently delivers all values that are emitted on the inner Observables.
 *
 * <span class="informal">Flattens an Observable-of-Observables.</span>
 *
 * <img src="./img/mergeAll.png" width="100%">
 *
 * `mergeAll` subscribes to an Observable that emits Observables, also known as
 * a higher-order Observable. Each time it observes one of these emitted inner
 * Observables, it subscribes to that and delivers all the values from the
 * inner Observable on the output Observable. The output Observable only
 * completes once all inner Observables have completed. Any error delivered by
 * a inner Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
 * var firstOrder = higherOrder.mergeAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
 * var firstOrder = higherOrder.mergeAll(2);
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concatAll}
 * @see {@link exhaust}
 * @see {@link merge}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits values coming from all the
 * inner Observables emitted by the source Observable.
 * @method mergeAll
 * @owner Observable
 */
function mergeAll(concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    return this.lift(new MergeAllOperator(concurrent));
}
exports.mergeAll = mergeAll;
var MergeAllOperator = (function () {
    function MergeAllOperator(concurrent) {
        this.concurrent = concurrent;
    }
    MergeAllOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeAllSubscriber(observer, this.concurrent));
    };
    return MergeAllOperator;
}());
exports.MergeAllOperator = MergeAllOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeAllSubscriber = (function (_super) {
    __extends(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
        _super.call(this, destination);
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
    }
    MergeAllSubscriber.prototype._next = function (observable) {
        if (this.active < this.concurrent) {
            this.active++;
            this.add(subscribeToResult_1.subscribeToResult(this, observable));
        }
        else {
            this.buffer.push(observable);
        }
    };
    MergeAllSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeAllSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeAllSubscriber = MergeAllSubscriber;
//# sourceMappingURL=mergeAll.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ConnectableObservable_1 = __webpack_require__(214);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} An Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
function multicast(subjectOrSubjectFactory, selector) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = subjectOrSubjectFactory;
    }
    else {
        subjectFactory = function subjectFactory() {
            return subjectOrSubjectFactory;
        };
    }
    if (typeof selector === 'function') {
        return this.lift(new MulticastOperator(subjectFactory, selector));
    }
    var connectable = Object.create(this, ConnectableObservable_1.connectableObservableDescriptor);
    connectable.source = this;
    connectable.subjectFactory = subjectFactory;
    return connectable;
}
exports.multicast = multicast;
var MulticastOperator = (function () {
    function MulticastOperator(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    MulticastOperator.prototype.call = function (subscriber, source) {
        var selector = this.selector;
        var subject = this.subjectFactory();
        var subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    };
    return MulticastOperator;
}());
exports.MulticastOperator = MulticastOperator;
//# sourceMappingURL=multicast.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(12);
function symbolIteratorPonyfill(root) {
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
        if (!Symbol.iterator) {
            Symbol.iterator = Symbol('iterator polyfill');
        }
        return Symbol.iterator;
    }
    else {
        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
        var Set_1 = root.Set;
        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
            return '@@iterator';
        }
        var Map_1 = root.Map;
        // required for compatability with es6-shim
        if (Map_1) {
            var keys = Object.getOwnPropertyNames(Map_1.prototype);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
                    return key;
                }
            }
        }
        return '@@iterator';
    }
}
exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
exports.iterator = symbolIteratorPonyfill(root_1.root);
/**
 * @deprecated use iterator instead
 */
exports.$$iterator = exports.iterator;
//# sourceMappingURL=iterator.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(12);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(12);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(33);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (arr, predicate, ctx) {
	if (typeof Array.prototype.findIndex === 'function') {
		return arr.findIndex(predicate, ctx);
	}

	if (typeof predicate !== 'function') {
		throw new TypeError('predicate must be a function');
	}

	var list = Object(arr);
	var len = list.length;

	if (len === 0) {
		return -1;
	}

	for (var i = 0; i < len; i++) {
		if (predicate.call(ctx, list[i], i, list)) {
			return i;
		}
	}

	return -1;
};


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MockMediaKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return requestMediaKeySystemAccess; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_eventemitter__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_bytes__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_castToObservable_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__events_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__keySystemAccess_js__ = __webpack_require__(55);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */













// Wrap "MediaKeys.prototype.update" form an event based system to a
// Promise based function.
function wrapUpdate(memUpdate, sessionObj) {
  function KeySessionError() {
    var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (err.errorCode) {
      err = {
        systemCode: err.systemCode,
        code: err.errorCode.code
      };
    }
    this.name = "KeySessionError";
    this.mediaKeyError = err;
    this.message = "MediaKeyError code:" + err.code + " and systemCode:" + err.systemCode;
  }
  KeySessionError.prototype = new Error();

  return function (license, sessionId) {
    var session = typeof sessionObj == "function" ? sessionObj.call(this) : this;

    var keys = __WEBPACK_IMPORTED_MODULE_7__events_js__["g" /* onKeyAdded */](session);
    var errs = __WEBPACK_IMPORTED_MODULE_7__events_js__["h" /* onKeyError */](session).map(function (evt) {
      throw new KeySessionError(session.error || evt);
    });

    try {
      memUpdate.call(this, license, sessionId);
      return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].merge(keys, errs).take(1);
    } catch (e) {
      return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(e);
    }
  };
}

var requestMediaKeySystemAccess = void 0;
if (navigator.requestMediaKeySystemAccess) {
  requestMediaKeySystemAccess = function requestMediaKeySystemAccess(a, b) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_castToObservable_js__["a" /* default */])(navigator.requestMediaKeySystemAccess(a, b));
  };
}

var MockMediaKeys = function MockMediaKeys() {};

// Browser without any MediaKeys object: A mock for MediaKey and
// MediaKeySession are created, and the <video>.addKey api is used to
// pass the license.
//
// This is for Chrome with unprefixed EME api
if (!requestMediaKeySystemAccess && __WEBPACK_IMPORTED_MODULE_6__constants_js__["e" /* HTMLVideoElement_ */].prototype.webkitGenerateKeyRequest) {
  // Mock MediaKeySession interface for old chrome implementation
  // of the EME specifications
  var MockMediaKeySession = function MockMediaKeySession(video, keySystem) {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_2__utils_eventemitter__["a" /* default */].call(this);

    this.sessionId = "";
    this._vid = video;
    this._key = keySystem;
    this._con = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].merge(__WEBPACK_IMPORTED_MODULE_7__events_js__["i" /* onKeyMessage */](video), __WEBPACK_IMPORTED_MODULE_7__events_js__["g" /* onKeyAdded */](video), __WEBPACK_IMPORTED_MODULE_7__events_js__["h" /* onKeyError */](video)).subscribe(function (evt) {
      return _this.trigger(evt.type, evt);
    });
  };

  MockMediaKeySession.prototype = __WEBPACK_IMPORTED_MODULE_0_object_assign___default()({
    generateRequest: function generateRequest(initDataType, initData) {
      this._vid.webkitGenerateKeyRequest(this._key, initData);
    },

    update: wrapUpdate(function (license, sessionId) {
      if (this._key.indexOf("clearkey") >= 0) {
        var json = JSON.parse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_bytes__["a" /* bytesToStr */])(license));
        var key = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_bytes__["b" /* strToBytes */])(atob(json.keys[0].k));
        var kid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_bytes__["b" /* strToBytes */])(atob(json.keys[0].kid));
        this._vid.webkitAddKey(this._key, key, kid, sessionId);
      } else {
        this._vid.webkitAddKey(this._key, license, null, sessionId);
      }
      this.sessionId = sessionId;
    }),

    close: function close() {
      if (this._con) {
        this._con.unsubscribe();
      }
      this._con = null;
      this._vid = null;
    }
  }, __WEBPACK_IMPORTED_MODULE_2__utils_eventemitter__["a" /* default */].prototype);

  MockMediaKeys = function MockMediaKeys(keySystem) {
    this.ks_ = keySystem;
  };

  MockMediaKeys.prototype = {
    _setVideo: function _setVideo(vid) {
      this._vid = vid;
    },
    createSession: function createSession() /* sessionType */{
      return new MockMediaKeySession(this._vid, this.ks_);
    }
  };

  var isTypeSupported = function isTypeSupported(keyType) {
    // get any <video> element from the DOM or create one
    // and try the `canPlayType` method
    var video = document.querySelector("video") || document.createElement("video");
    if (video && video.canPlayType) {
      return !!video.canPlayType("video/mp4", keyType);
    } else {
      return false;
    }
  };

  requestMediaKeySystemAccess = function requestMediaKeySystemAccess(keyType, keySystemConfigurations) {
    if (!isTypeSupported(keyType)) {
      return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw();
    }

    for (var i = 0; i < keySystemConfigurations.length; i++) {
      var keySystemConfiguration = keySystemConfigurations[i];
      var videoCapabilities = keySystemConfiguration.videoCapabilities,
          audioCapabilities = keySystemConfiguration.audioCapabilities,
          initDataTypes = keySystemConfiguration.initDataTypes,
          sessionTypes = keySystemConfiguration.sessionTypes,
          distinctiveIdentifier = keySystemConfiguration.distinctiveIdentifier,
          persistentState = keySystemConfiguration.persistentState;


      var supported = true;
      supported = supported && (!initDataTypes || !!initDataTypes.filter(function (initDataType) {
        return initDataType === "cenc";
      })[0]);
      supported = supported && (!sessionTypes || sessionTypes.filter(function (sessionType) {
        return sessionType === "temporary";
      }).length === sessionTypes.length);
      supported = supported && distinctiveIdentifier !== "required";
      supported = supported && persistentState !== "required";

      if (supported) {
        var keySystemConfigurationResponse = {
          videoCapabilities: videoCapabilities,
          audioCapabilities: audioCapabilities,
          initDataTypes: ["cenc"],
          distinctiveIdentifier: "not-allowed",
          persistentState: "not-allowed",
          sessionTypes: ["temporary"]
        };

        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(new __WEBPACK_IMPORTED_MODULE_8__keySystemAccess_js__["a" /* default */](keyType, new MockMediaKeys(keyType), keySystemConfigurationResponse));
      }
    }

    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw();
  };
}

// A MediaKeys object exist (or a mock) but no create function is
// available. We need to add recent apis using Promises to mock the
// most recent MediaKeys apis.
// This is for IE11
else if (__WEBPACK_IMPORTED_MODULE_6__constants_js__["f" /* MediaKeys_ */] && !requestMediaKeySystemAccess) {
    var SessionProxy = function SessionProxy(mk) {
      __WEBPACK_IMPORTED_MODULE_2__utils_eventemitter__["a" /* default */].call(this);
      this.sessionId = "";
      this._mk = mk;
    };

    SessionProxy.prototype = __WEBPACK_IMPORTED_MODULE_0_object_assign___default()({
      generateRequest: function generateRequest(initDataType, initData) {
        var _this2 = this;

        this._ss = this._mk.memCreateSession("video/mp4", initData);
        this._con = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].merge(__WEBPACK_IMPORTED_MODULE_7__events_js__["i" /* onKeyMessage */](this._ss), __WEBPACK_IMPORTED_MODULE_7__events_js__["g" /* onKeyAdded */](this._ss), __WEBPACK_IMPORTED_MODULE_7__events_js__["h" /* onKeyError */](this._ss)).subscribe(function (evt) {
          return _this2.trigger(evt.type, evt);
        });
      },

      update: wrapUpdate(function (license, sessionId) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_assert__["a" /* default */])(this._ss);
        this._ss.update(license, sessionId);
        this.sessionId = sessionId;
      }, function () {
        return this._ss;
      }),

      close: function close() {
        if (this._ss) {
          this._ss.close();
          this._ss = null;
        }
        if (this._con) {
          this._con.unsubscribe();
          this._con = null;
        }
      }
    }, __WEBPACK_IMPORTED_MODULE_2__utils_eventemitter__["a" /* default */].prototype);

    // on IE11, each created session needs to be created on a new
    // MediaKeys object
    __WEBPACK_IMPORTED_MODULE_6__constants_js__["f" /* MediaKeys_ */].prototype.alwaysRenew = true;
    __WEBPACK_IMPORTED_MODULE_6__constants_js__["f" /* MediaKeys_ */].prototype.memCreateSession = __WEBPACK_IMPORTED_MODULE_6__constants_js__["f" /* MediaKeys_ */].prototype.createSession;
    __WEBPACK_IMPORTED_MODULE_6__constants_js__["f" /* MediaKeys_ */].prototype.createSession = function () {
      return new SessionProxy(this);
    };

    requestMediaKeySystemAccess = function requestMediaKeySystemAccess(keyType, keySystemConfigurations) {
      if (!__WEBPACK_IMPORTED_MODULE_6__constants_js__["f" /* MediaKeys_ */].isTypeSupported(keyType)) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw();
      }

      for (var i = 0; i < keySystemConfigurations.length; i++) {
        var keySystemConfiguration = keySystemConfigurations[i];
        var videoCapabilities = keySystemConfiguration.videoCapabilities,
            audioCapabilities = keySystemConfiguration.audioCapabilities,
            initDataTypes = keySystemConfiguration.initDataTypes,
            distinctiveIdentifier = keySystemConfiguration.distinctiveIdentifier;


        var supported = true;
        supported = supported && (!initDataTypes || !!initDataTypes.filter(function (idt) {
          return idt === "cenc";
        })[0]);
        supported = supported && distinctiveIdentifier !== "required";

        if (supported) {
          var keySystemConfigurationResponse = {
            videoCapabilities: videoCapabilities,
            audioCapabilities: audioCapabilities,
            initDataTypes: ["cenc"],
            distinctiveIdentifier: "not-allowed",
            persistentState: "required",
            sessionTypes: ["temporary", "persistent-license"]
          };

          return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(new __WEBPACK_IMPORTED_MODULE_8__keySystemAccess_js__["a" /* default */](keyType, new __WEBPACK_IMPORTED_MODULE_6__constants_js__["f" /* MediaKeys_ */](keyType), keySystemConfigurationResponse));
        }
      }

      return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw();
    };
  }



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



// @implement interface MediaKeySystemAccess

var KeySystemAccess = function () {
  function KeySystemAccess(keyType, mediaKeys, mediaKeySystemConfiguration) {
    _classCallCheck(this, KeySystemAccess);

    this._keyType = keyType;
    this._mediaKeys = mediaKeys;
    this._configuration = mediaKeySystemConfiguration;
  }

  KeySystemAccess.prototype.createMediaKeys = function createMediaKeys() {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(this._mediaKeys);
  };

  KeySystemAccess.prototype.getConfiguration = function getConfiguration() {
    return this._configuration;
  };

  _createClass(KeySystemAccess, [{
    key: "keySystem",
    get: function get() {
      return this._keyType;
    }
  }]);

  return KeySystemAccess;
}();

/* harmony default export */ __webpack_exports__["a"] = (KeySystemAccess);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Tweaked implementation of an exponential weighted Moving Average.
 * Heavily "inspired" from the shaka-player one (Ewma).
 * @class EWMA
 */
var EWMA = function () {
  function EWMA(halfLife) {
    _classCallCheck(this, EWMA);

    // (half-life = log(1/2) / log(Decay Factor)
    this._alpha = Math.exp(Math.log(0.5) / halfLife);

    this._lastEstimate = 0;

    this._totalWeight = 0;
  }

  EWMA.prototype.addSample = function addSample(weight, value) {
    var adjAlpha = Math.pow(this._alpha, weight);
    var newEstimate = value * (1 - adjAlpha) + adjAlpha * this._lastEstimate;
    if (!isNaN(newEstimate)) {
      this._lastEstimate = newEstimate;
      this._totalWeight += weight;
    }
  };

  EWMA.prototype.getEstimate = function getEstimate() {
    var zeroFactor = 1 - Math.pow(this._alpha, this._totalWeight);
    return this._lastEstimate / zeroFactor;
  };

  return EWMA;
}();

/* harmony default export */ __webpack_exports__["a"] = (EWMA);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createEME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrentKeySystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dispose; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_castToObservable_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compat_events_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__globals_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__server_certificate_js__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__set_media_keys_js__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__session_js__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__key_system_js__ = __webpack_require__(109);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__compat_events_js__["d"]; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */















// Persisted singleton instance of MediaKeys. We do not allow multiple
// CDM instances.
var instanceInfos = {
  $mediaKeys: null,
  $mediaKeySystemConfiguration: null,
  $keySystem: null,
  $videoElement: null
};

/**
 * EME abstraction and event handler used to communicate with the Content-
 * Description-Module (CDM).
 *
 * The communication with backend key-servers is not handled directly by this
 * module but through the given "KeySystems".
 *
 * A system has to expose the given interface:
 * interface KeySystem {
 *   readonly attribute string type;
 *
 *   Promise<AB> getLicense((AB) challenge);
 *   AB extractInitData(AB);
 * }
 * with AB = ArrayBuffer or ArrayBufferView
 *
 * The `extraInitData` method is not mandatory and used to pre-process the
 * initData vector injected into the CDM. The `getLicense` method is used to
 * serve the license encapsulated in a promise to support asynchronous license
 * fetching. The challenge buffer sent by the CDM is directly passed as first
 * argument of this method.
 *
 * The EME handler can be given one or multiple systems and will choose the
 * appropriate one supported by the user's browser.
 * @param {HTMLMediaElement} video
 * @param {Object} keySystems
 * @param {Subject} errorStream
 * @returns {Observable}
 */
function createEME(video, keySystems, errorStream) {
  if (false) {
    keySystems.forEach(function (ks) {
      return assert.iface(ks, "keySystem", {
        getLicense: "function",
        type: "string"
      });
    });
  }

  /**
   * Call the createMediaKeys API and cast it to an observable.
   * @param {MediaKeySystemAccess} keySystemAccess
   * @returns {Observable}
   */
  function createMediaKeysObs(keySystemAccess) {
    // (keySystemAccess should return a promise)
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_castToObservable_js__["a" /* default */])(keySystemAccess.createMediaKeys());
  }

  /**
   * Function triggered when both:
   *   - the ``encrypted`` event has been received.
   *   - a compatible key system has been found.
   *
   * @param {MediaEncryptedEvent} encryptedEvent
   * @param {Object} compatibleKeySystem
   * @param {MediaKeySystemAccess} compatibleKeySystem.keySystemAccess
   * @param {Object} compatibleKeySystem.keySystem
   * @returns {Observable}
   */
  function handleEncryptedEvents(encryptedEvent, _ref) {
    var keySystem = _ref.keySystem,
        keySystemAccess = _ref.keySystemAccess;

    if (keySystem.persistentLicense) {
      __WEBPACK_IMPORTED_MODULE_5__globals_js__["a" /* $storedSessions */].setStorage(keySystem.licenseStorage);
    }

    __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].info("eme: encrypted event", encryptedEvent);
    return createMediaKeysObs(keySystemAccess).mergeMap(function (mediaKeys) {
      var serverCertificate = keySystem.serverCertificate;

      var setCertificate$ = serverCertificate && typeof mediaKeys.setServerCertificate === "function" ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__server_certificate_js__["a" /* trySettingServerCertificate */])(mediaKeys, serverCertificate, errorStream) : __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();

      var mksConfig = keySystemAccess.getConfiguration();

      return setCertificate$.concat(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__set_media_keys_js__["a" /* default */])(mediaKeys, mksConfig, video, keySystem, instanceInfos), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__session_js__["a" /* default */])(mediaKeys, mksConfig, keySystem, encryptedEvent.initDataType, new Uint8Array(encryptedEvent.initData), errorStream)));
    });
  }

  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__compat_events_js__["d" /* onEncrypted */])(video), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__key_system_js__["a" /* default */])(keySystems, instanceInfos)).take(1).mergeMap(function (_ref2) {
    var evt = _ref2[0],
        ks = _ref2[1];
    return handleEncryptedEvents(evt, ks);
  });
}

function dispose() {
  // Remove MediaKey before to prevent MediaKey error
  // if other instance is creating after dispose
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__set_media_keys_js__["b" /* disposeMediaKeys */])(instanceInfos.$videoElement).subscribe(function () {});
  instanceInfos.$mediaKeys = null;
  instanceInfos.$keySystem = null;
  instanceInfos.$videoElement = null;
  instanceInfos.$mediaKeySystemConfiguration = null;
  __WEBPACK_IMPORTED_MODULE_5__globals_js__["b" /* $loadedSessions */].dispose();
}

function getCurrentKeySystem() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__key_system_js__["b" /* getKeySystem */])(instanceInfos);
}



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var SessionSet = function () {
  function SessionSet() {
    _classCallCheck(this, SessionSet);

    this._entries = [];
  }

  SessionSet.prototype.find = function find(func) {
    for (var i = 0; i < this._entries.length; i++) {
      if (func(this._entries[i]) === true) {
        return this._entries[i];
      }
    }
    return null;
  };

  return SessionSet;
}();

/* harmony default export */ __webpack_exports__["a"] = (SessionSet);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function hashBuffer(buffer) {
  var hash = 0;
  var char = void 0;
  for (var i = 0; i < buffer.length; i++) {
    char = buffer[i];
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function hashInitData(initData) {
  if (typeof initData == "number") {
    return initData;
  } else {
    return hashBuffer(initData);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (hashInitData);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractSourceBuffer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_eventemitter__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_rx_tryCatch_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_castToObservable_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__time_ranges_js__ = __webpack_require__(128);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/**
 * Abstract class for a custom SourceBuffer implementation.
 * @class AbstractSourceBuffer
 * @extends EventEmitter
 */

var AbstractSourceBuffer = function (_EventEmitter) {
  _inherits(AbstractSourceBuffer, _EventEmitter);

  function AbstractSourceBuffer(codec) {
    _classCallCheck(this, AbstractSourceBuffer);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.codec = codec;
    _this.updating = false;
    _this.readyState = "opened";
    _this.buffered = new __WEBPACK_IMPORTED_MODULE_4__time_ranges_js__["a" /* default */]();
    return _this;
  }

  /**
   * Mimic the SourceBuffer _appendBuffer_ method: Append segment.
   * @param {*} data
   */


  AbstractSourceBuffer.prototype.appendBuffer = function appendBuffer(data) {
    var _this2 = this;

    this._lock(function () {
      return _this2._append(data);
    });
  };

  /**
   * Mimic the SourceBuffer _remove_ method: remove segment.
   * @param {Number} from
   * @param {Number} to
   */


  AbstractSourceBuffer.prototype.remove = function remove(from, to) {
    var _this3 = this;

    this._lock(function () {
      return _this3._remove(from, to);
    });
  };

  /**
   * Mimic the SourceBuffer _abort_ method.
   */


  AbstractSourceBuffer.prototype.abort = function abort() {
    this.remove(0, Infinity);
    this.updating = false;
    this.readyState = "closed";
    this._abort();
  };

  AbstractSourceBuffer.prototype._append = function _append() /* data */{}; // to implement, called on appendBuffer


  AbstractSourceBuffer.prototype._remove = function _remove() /* from, to */{}; // to implement, called on remove


  AbstractSourceBuffer.prototype._abort = function _abort() {}; // to implement, called on abort

  /**
   * Active a lock, execute the given function, unlock when finished (on
   * nextTick).
   * Throws if multiple lock are active at the same time.
   * Also triggers the right events on start, error and end
   * @param {Function} func
   */


  AbstractSourceBuffer.prototype._lock = function _lock(func) {
    var _this4 = this;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_assert__["a" /* default */])(!this.updating, "updating");
    this.updating = true;
    this.trigger("updatestart");
    var result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_rx_tryCatch_js__["a" /* default */])(function () {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_castToObservable_js__["a" /* default */])(func());
    });
    result.subscribe(function () {
      return setTimeout(function () {
        return _this4._unlock("update");
      }, 0);
    }, function (e) {
      return setTimeout(function () {
        return _this4._unlock("error", e);
      }, 0);
    });
  };

  /**
   * Free the lock and trigger the right events.
   * @param {string} eventName
   * @param {*} value - value sent with the given event.
   */


  AbstractSourceBuffer.prototype._unlock = function _unlock(eventName, value) {
    this.updating = false;
    this.trigger(eventName, value);
    this.trigger("updateend");
  };

  return AbstractSourceBuffer;
}(__WEBPACK_IMPORTED_MODULE_0__utils_eventemitter__["a" /* default */]);



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseBif; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_bytes__ = __webpack_require__(13);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @param {UInt8Array} buf
 * @returns {Object}
 */
function parseBif(buf) {
  var pos = 0;

  var length = buf.length;
  var fileFormat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_bytes__["a" /* bytesToStr */])(buf.subarray(pos, pos + 8));pos += 8;

  var minorVersion = buf[pos];pos += 1;
  var majorVersion = buf[pos];pos += 1;
  var patchVersion = buf[pos];pos += 1;
  var increVersion = buf[pos];pos += 1;

  var version = [minorVersion, majorVersion, patchVersion, increVersion].join(".");

  var imageCount = buf[pos] + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_bytes__["c" /* le4toi */])(buf, pos + 1);pos += 4;
  var timescale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_bytes__["c" /* le4toi */])(buf, pos);pos += 4;

  var format = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_bytes__["a" /* bytesToStr */])(buf.subarray(pos, pos + 4));pos += 4;

  var width = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_bytes__["d" /* le2toi */])(buf, pos);pos += 2;
  var height = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_bytes__["d" /* le2toi */])(buf, pos);pos += 2;

  var aspectRatio = [buf[pos], buf[pos + 1]].join(":");pos += 2;

  var isVod = buf[pos] === 1;pos += 1;

  // bytes 0x1F to 0x40 is unused data for now
  pos = 0x40;

  var thumbs = [];
  var currentImage = void 0,
      currentTs = 0;

  if (!imageCount) {
    throw new Error("bif: no images to parse");
  }

  while (pos < length) {
    var currentImageIndex = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_bytes__["c" /* le4toi */])(buf, pos);pos += 4;
    var currentImageOffset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_bytes__["c" /* le4toi */])(buf, pos);pos += 4;

    if (currentImage) {
      var index = currentImage.index;
      var duration = timescale;
      var ts = currentTs;
      var data = buf.subarray(currentImage.offset, currentImageOffset);

      thumbs.push({ index: index, duration: duration, ts: ts, data: data });

      currentTs += timescale;
    }

    if (currentImageIndex === 0xffffffff) {
      break;
    }

    currentImage = {
      index: currentImageIndex,
      offset: currentImageOffset
    };
  }

  return {
    fileFormat: fileFormat,
    version: version,
    imageCount: imageCount,
    timescale: timescale,
    format: format,
    width: width,
    height: height,
    aspectRatio: aspectRatio,
    isVod: isVod,
    thumbs: thumbs
  };
}



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseSami; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_assert__ = __webpack_require__(2);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var HTML_ENTITIES = /&#([0-9]+);/g;
var BR = /<br>/gi;
var STYLE = /<style[^>]*>([\s\S]*?)<\/style[^>]*>/i;
var PARAG = /\s*<p class=([^>]+)>(.*)/i;
var START = /<sync[^>]+?start="?([0-9]*)"?[^0-9]/i;

// Really basic CSS parsers using regular-expressions.
function rulesCss(str) {
  var ruleRe = /\.(\S+)\s*{([^}]*)}/gi;
  var langs = {};
  var m = void 0;
  while (m = ruleRe.exec(str)) {
    var name = m[1];
    var lang = propCss(m[2], "lang");
    if (name && lang) {
      langs[lang] = name;
    }
  }
  return langs;
}

function propCss(str, name) {
  return str.match(new RegExp("\\s*" + name + ":\\s*(\\S+);", "i"))[1];
}

function decodeEntities(text) {
  return text.replace(BR, "\n").replace(HTML_ENTITIES, function ($0, $1) {
    return String.fromCharCode($1);
  });
}

// Because sami is not really html... we have to use
// some kind of regular expressions to parse it...
// the cthulhu way :)
// The specification being quite clunky, this parser
// may not work for every sami input.
function parseSami(smi, lang) {
  var syncOp = /<sync[ >]/ig;
  var syncCl = /<sync[ >]|<\/body>/ig;

  var subs = [];

  var _smi$match = smi.match(STYLE),
      css = _smi$match[1];

  var up = void 0,
      to = syncCl.exec(smi);

  var langs = rulesCss(css);
  var klass = langs[lang];

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_assert__["a" /* default */])(klass, "sami: could not find lang " + lang + " in CSS");

  for (;;) {
    up = syncOp.exec(smi);
    to = syncCl.exec(smi);
    if (!up && !to) {
      break;
    }
    if (!up || !to || up.index >= to.index) {
      throw new Error("parse error");
    }

    var str = smi.slice(up.index, to.index);
    var tim = str.match(START);
    if (!tim) {
      throw new Error("parse error (sync time attribute)");
    }

    var start = +tim[1];
    if (isNaN(start)) {
      throw new Error("parse error (sync time attribute NaN)");
    }

    appendSub(subs, str.split("\n"), start / 1000);
  }

  return subs;

  function appendSub(subs, lines, start) {
    var i = lines.length,
        m = void 0;
    while (--i >= 0) {
      m = lines[i].match(PARAG);
      if (!m) {
        continue;
      }

      var _m = m,
          kl = _m[1],
          txt = _m[2];


      if (klass !== kl) {
        continue;
      }

      if (txt === "&nbsp;") {
        subs[subs.length - 1].end = start;
      } else {
        subs.push({ text: decodeEntities(txt), start: start });
      }
    }
  }
}



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseTTML; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var regxpBRTags = /<br( )*\/* *>/gm;
var regxpAbsoluteTime = /^(([0-9]+):)?([0-9]+):([0-9]+)(\.([0-9]+))?$/;
var regxpRelativeTime = /(([0-9]+)(\.[0-9]+)?)(ms|h|m|s)/;

var MULTS = {
  h: 3600,
  m: 60,
  s: 1,
  ms: 0.001
};

function parseTTML(ttml, lang, offset) {
  var doc = void 0;
  if (typeof ttml == "string") {
    doc = new DOMParser().parseFromString(ttml, "text/xml");
  } else {
    doc = ttml;
  }

  if (!(doc instanceof window.Document || doc instanceof window.HTMLElement)) {
    throw new Error("ttml needs a Document to parse");
  }

  var node = doc.querySelector("tt");
  if (!node) {
    throw new Error("ttml could not find <tt> tag");
  }

  var subs = parseChildren(node.querySelector("body"), 0);
  for (var i = 0; i < subs.length; i++) {
    var s = subs[i];
    s.start += offset;
    s.end += offset;
  }

  return subs;
}

// Parse the children of the given node recursively
function parseChildren(node, parentOffset) {
  var siblingOffset = 0;
  node = node.firstChild;
  var arr = [];
  var sub = void 0;

  while (node) {
    if (node.nodeType === 1) {
      switch (node.tagName.toUpperCase()) {
        case "P":
          // p is a textual node, process contents as subtitle
          sub = parseNode(node, parentOffset, siblingOffset);
          siblingOffset = sub.end;
          arr.push(sub);
          break;
        case "DIV":
          // div is container for subtitles, recurse
          var newOffset = parseTimestamp(node.getAttribute("begin"), 0);
          if (newOffset == null) {
            newOffset = parentOffset;
          }
          arr.push.apply(arr, parseChildren(node, newOffset));
          break;
      }
    }
    node = node.nextSibling;
  }

  return arr;
}

// Parse a node for text content
function parseNode(node, parentOffset, siblingOffset) {
  var start = parseTimestamp(node.getAttribute("begin"), parentOffset);
  var end = parseTimestamp(node.getAttribute("end"), parentOffset);
  var dur = parseTimestamp(node.getAttribute("dur"), 0);

  if (!(typeof start === "undefined" ? "undefined" : _typeof(start)) == "number" && !(typeof end === "undefined" ? "undefined" : _typeof(end)) == "number" && !(typeof dur === "undefined" ? "undefined" : _typeof(dur)) == "number") {
    throw new Error("ttml unsupported timestamp format");
  }

  if (dur > 0) {
    if (start == null) {
      start = siblingOffset || parentOffset;
    }
    if (end == null) {
      end = start + dur;
    }
  } else if (end == null) {
    // No end given, infer duration if possible
    // Otherwise, give end as MAX_VALUE
    end = parseTimestamp(node.getAttribute("duration"), 0);
    if (end >= 0) {
      end += start;
    } else {
      end = Number.MAX_VALUE;
    }
  }

  var innerHTML = node.innerHTML;

  var textContent = void 0;

  // NOTE(compat): on IE xml nodes do not have an innerHTML property.
  // we have to re-serialize and re-parse as text/html to access the
  // <p>'s innerHTML
  if (innerHTML == null) {
    var serializedXML = new XMLSerializer().serializeToString(node);
    textContent = new DOMParser().parseFromString(serializedXML, "text/html").body.firstChild.innerHTML;
  } else {
    textContent = innerHTML;
  }

  // Trim left and right whitespace from text and convert non-explicit line
  // breaks.
  // Using deprecated escape all together with decodeURIComponent to convert
  // unicode characters
  textContent = window.escape(textContent.replace(regxpBRTags, "\r\n"));

  // TODO(guillaume): find out if we have an encoding issue when
  // receiving TTML files to explain the problem with the "à"
  textContent = textContent.replace(/%C3%26nbsp%3B/gm, "%C3%A0");

  return {
    id: node.getAttribute("xml:id") || node.getAttribute("id"),
    text: window.decodeURIComponent(textContent),
    start: start, end: end
  };
}

// Time may be:
//   * absolute to timeline (hh:mm:ss.ms)
//   * relative (decimal followed by metric) ex: 3.4s, 5.7m
function parseTimestamp(time, offset) {
  if (!time) {
    return null;
  }

  var match = void 0;

  // Parse absolute times ISO 8601 format ([hh:]mm:ss[.mmm])
  match = time.match(regxpAbsoluteTime);
  if (match) {
    var _match = match,
        h = _match[2],
        m = _match[3],
        s = _match[4],
        ms = _match[6];

    return parseInt(h || 0, 10) * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10) + parseFloat("0." + ms);
  }

  // Parse relative times (fraction followed by a unit metric d.ddu)
  match = time.match(regxpRelativeTime);
  if (match) {
    var _match2 = match,
        n = _match2[1],
        metric = _match2[4];

    return parseFloat(n) * MULTS[metric] + offset;
  }

  return null;
}



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return parseString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return parseFrameRate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return parseByteRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return parseBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return parseDateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return parseDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return parseIntOrBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return parseRatio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reduceChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getLastLiveTimeReference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isHardOfHearing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isVisuallyImpaired; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return inferAdaptationType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_array_includes_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_assert__ = __webpack_require__(2);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// XML-Schema
// <http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd>




var iso8601Duration = /^P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/;
var rangeRe = /([0-9]+)-([0-9]+)/;
var frameRateRe = /([0-9]+)(\/([0-9]+))?/;

var KNOWN_ADAPTATION_TYPES = ["audio", "video", "text", "image"];

/**
 * @param {Object} index
 * @returns {Number}
 */
function calculateIndexLastLiveTimeReference(index) {
  if (index.indexType === "timeline") {
    var _index$timeline = index.timeline[index.timeline.length - 1],
        ts = _index$timeline.ts,
        r = _index$timeline.r,
        d = _index$timeline.d;

    // TODO FIXME does that make sense?

    var securityTime = Math.min(Math.max(d / index.timescale, 5), 10);
    return (ts + (r + 1) * d) / index.timescale - securityTime;
  }
  // By default (e.g. for templates), live Edge is right now - 5s
  return Date.now() / 1000 - 5;
}

/**
 * Parse MPD string attributes.
 * @param {string} str
 * @returns {string} - the same string
 */
function parseString(str) {
  return str;
}

/**
 * Parse MPD boolean attributes.
 * @param {string}
 * @returns {Boolean}
 */
function parseBoolean(str) {
  return str == "true";
}

/**
 * Parse some MPD attributes.
 * @param {string}
 * @returns {Boolean|Number}
 */
function parseIntOrBoolean(str) {
  if (str == "true") {
    return true;
  }
  if (str == "false") {
    return false;
  }
  return parseInt(str);
}

/**
 * Parse MPD date attributes.
 * @param {string}
 * @returns {Date}
 */
function parseDateTime(str) {
  return new Date(Date.parse(str));
}

/**
 * Parse MPD ISO8601 duration attributes into seconds.
 * @param {string}
 * @returns {Number}
 */
function parseDuration(date) {
  if (!date) {
    return 0;
  }

  var match = iso8601Duration.exec(date);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_assert__["a" /* default */])(match, date + " is not a valid ISO8601 duration");

  return parseFloat(match[2] || 0) * 365 * 24 * 60 * 60 + parseFloat(match[4] || 0) * 30 * 24 * 60 * 60 + // not precise +
  parseFloat(match[6] || 0) * 24 * 60 * 60 + parseFloat(match[8] || 0) * 60 * 60 + parseFloat(match[10] || 0) * 60 + parseFloat(match[12] || 0);
}

/**
 * Parse MPD frame rate attributes.
 * -1 if the frameRate could not be parsed,
 * @param {string} str
 * @returns {Number}
 */
function parseFrameRate(str) {
  var match = frameRateRe.exec(str);
  if (!match) {
    return -1;
  }

  var nom = parseInt(match[1]) || 0;
  var den = parseInt(match[2]) || 0;
  return den > 0 ? nom / den : nom;
}

/**
 * Parse MPD ratio attributes.
 * @param {string} str
 * @returns {string}
 */
function parseRatio(str) {
  return str;
}

/**
 * Parse MPD byterange attributes into arrays of two elements: the start and
 * the end.
 * @param {string} str
 * @returns {Array.<Number>}
 */
function parseByteRange(str) {
  var match = rangeRe.exec(str);
  if (!match) {
    return null;
  } else {
    return [+match[1], +match[2]];
  }
}

/**
 * Reduce on each immediate children from the Document object given.
 * @param {Document} root
 * @param {Function} fn - Will be called on each children with the following
 * arguments:
 *   1. the reducer's accumulator
 *   2. the current node's name
 *   3. the current node Document Object
 * @param {*} init - the initial value for the accumulator
 * @returns {*} - the accumulator
 */
function reduceChildren(root, fn, init) {
  var node = root.firstElementChild,
      r = init;
  while (node) {
    r = fn(r, node.nodeName, node);
    node = node.nextElementSibling;
  }
  return r;
}

/**
 * Detect if the accessibility given defines an adaptation for the visually
 * impaired.
 * Based on DVB Document A168 (DVB-DASH).
 * @param {Object} accessibility
 * @returns {Boolean}
 */
function isVisuallyImpaired(accessibility) {
  if (!accessibility) {
    return false;
  }

  return accessibility.schemeIdUri === "urn:tva:metadata:cs:AudioPurposeCS:2007" && accessibility.value === 1;
}

/**
 * Infers the type of adaptation from codec and mimetypes found in it.
 *
 * This follows the guidelines defined by the DASH-IF IOP:
 *   - one adaptation set contains a single media type
 *   - The order of verifications are:
 *       1. mimeType
 *       2. Role
 *       3. codec
 *
 * Note: This is based on DASH-IF-IOP-v4.0 with some more freedom.
 * @param {Object} adaptation
 * @returns {string} - "audio"|"video"|"text"|"image"|"metadata"|"unknown"
 */
function inferAdaptationType(adaptation) {
  var _adaptation$mimeType = adaptation.mimeType,
      mimeType = _adaptation$mimeType === undefined ? "" : _adaptation$mimeType;

  var topLevel = mimeType.split("/")[0];
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_array_includes_js__["a" /* default */])(KNOWN_ADAPTATION_TYPES, topLevel)) {
    return topLevel;
  }

  if (mimeType === "application/bif") {
    return "image";
  }

  if (mimeType === "application/ttml+xml") {
    return "text";
  }

  // manage DASH-IF mp4-embedded subtitles and metadata
  if (mimeType === "application/mp4") {
    var role = adaptation.role;

    if (role) {
      if (role.schemeIdUri === "urn:mpeg:dash:role:2011" && role.value === "subtitle") {
        return "text";
      }
    }
    return "metadata";
  }

  // take 1st representation's mimetype as default
  var _adaptation$represent = adaptation.representations,
      representations = _adaptation$represent === undefined ? [] : _adaptation$represent;

  if (representations.length) {
    var firstReprMimeType = representations[0].mimeType;
    var _topLevel = firstReprMimeType.split("/")[0];
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_array_includes_js__["a" /* default */])(KNOWN_ADAPTATION_TYPES, _topLevel)) {
      return _topLevel;
    }
  }

  // TODO infer from representations' codecs?
  return "unknown";
}

/**
 * Detect if the accessibility given defines an adaptation for the hard of
 * hearing.
 * Based on DVB Document A168 (DVB-DASH).
 * @param {Object} accessibility
 * @returns {Boolean}
 */
function isHardOfHearing(accessibility) {
  if (!accessibility) {
    return false;
  }

  return accessibility.schemeIdUri === "urn:tva:metadata:cs:AudioPurposeCS:2007" && accessibility.value === 2;
}

/**
 * Returns "last time of reference" from the adaptation given, considering a
 * live content.
 * Undefined if a time could not be found.
 *
 * We consider the earliest last time from every representations in the given
 * adaptation.
 *
 * This is done to calculate a liveGap which is valid for the whole manifest,
 * even in weird ones.
 * @param {Object} adaptation
 * @returns {Number|undefined}
 */
var getLastLiveTimeReference = function getLastLiveTimeReference(adaptation) {
  // Here's how we do, for each possibility:
  //  1. only the adaptation has an index (no representation has):
  //    - returns the index last time reference
  //
  //  2. every representations have an index:
  //    - returns minimum for every representations
  //
  //  3. not all representations have an index but the adaptation has
  //    - returns minimum between all representations and the adaptation
  //
  //  4. no index for 1+ representation(s) and no adaptation index:
  //    - returns undefined
  //
  //  5. Invalid index found somewhere:
  //    - returns undefined

  if (!adaptation) {
    return;
  }

  var representations = adaptation.representations || [];
  var representationsWithIndex = representations.filter(function (r) {
    return r && r.index;
  });

  if (!representations.length) {
    return calculateIndexLastLiveTimeReference(adaptation.index);
  }

  var representationsMin = Math.min.apply(Math, representationsWithIndex.map(function (r) {
    return calculateIndexLastLiveTimeReference(r.index);
  }));

  // should not happen, means invalid index data has been found
  if (isNaN(representationsMin)) {
    return;
  }

  if (representations.length === representationsWithIndex.length) {
    return representationsMin;
  }

  if (adaptation.index) {
    var adaptationRef = calculateIndexLastLiveTimeReference(adaptation.index);
    return Math.min(representationsMin, adaptationRef);
  }
};



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_request__ = __webpack_require__(41);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



function mapRequestResponses(_ref) {
  var type = _ref.type,
      value = _ref.value;

  if (type === "response") {
    return {
      type: "response",
      value: {
        responseData: value.responseData,
        size: value.size,
        duration: value.receivedTime - value.sentTime,
        url: value.url
      }
    };
  }

  return {
    type: "progress",
    value: {
      size: value.loadedSize,
      totalSize: value.totalSize,
      duration: value.currentTime - value.sentTime,
      url: value.url
    }
  };
}

function doParsedRequest(requestData) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_request__["a" /* default */])(requestData).map(mapRequestResponses);
}

/* harmony default export */ __webpack_exports__["a"] = (doParsedRequest);

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export pad */
/* unused harmony export processFormatedToken */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return replaceTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isMP4EmbeddedTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return byteRange; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Pad with 0 in the left of the given n argument to reach l length
 * @param {Number|string} n
 * @param {Number} l
 * @returns {string}
 */
function pad(n, l) {
  n = n.toString();
  if (n.length >= l) {
    return n;
  }
  var arr = new Array(l + 1).join("0") + n;
  return arr.slice(-l);
}

/**
 * Add formatting when asked in a token (add padding to numbers).
 * @param {string|Number} replacer - the token value
 * @returns {Function} - @see replaceTokens
 */
function processFormatedToken(replacer) {
  return function (match, format, widthStr) {
    var width = widthStr ? parseInt(widthStr, 10) : 1;
    return pad("" + replacer, width);
  };
}

/**
 * Replace "tokens" written in a given path (e.g. $Time$) by the corresponding
 * infos, taken from the given segment.
 * @param {string} path
 * @param {Segment} segment
 * @returns {string}
 */
function replaceTokens(path, segment, representation) {
  if (path.indexOf("$") === -1) {
    return path;
  } else {
    return path.replace(/\$\$/g, "$").replace(/\$RepresentationID\$/g, representation.id).replace(/\$Bandwidth(|\%0(\d+)d)\$/g, processFormatedToken(representation.bitrate)).replace(/\$Number(|\%0(\d+)d)\$/g, processFormatedToken(segment.number)).replace(/\$Time(|\%0(\d+)d)\$/g, processFormatedToken(segment.time));
  }
}

/**
 * Returns true if the given texttrack segment represents a textrack embedded
 * in a mp4 file.
 * @param {Segment} segment - __TextTrack__ segment
 * @returns {Boolean}
 */
function isMP4EmbeddedTrack(representation) {
  return representation.mimeType === "application/mp4";
}

/**
 * Returns text-formatted byteRange (`bytes=$start-$end?)`
 * @param {Array.<string|Number>}
 * @returns {string}
 */
function byteRange(_ref) {
  var start = _ref[0],
      end = _ref[1];

  if (!end || end === Infinity) {
    return "bytes=" + +start + "-";
  } else {
    return "bytes=" + +start + "-" + +end;
  }
}



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_request__ = __webpack_require__(41);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



function mapRequestResponses(_ref) {
  var type = _ref.type,
      value = _ref.value;

  if (type === "response") {
    return {
      type: "response",
      value: {
        responseData: value.responseData,
        size: value.size,
        duration: value.receivedTime - value.sentTime,
        url: value.url
      }
    };
  }

  return {
    type: "progress",
    value: {
      size: value.loadedSize,
      totalSize: value.totalSize,
      duration: value.currentTime - value.sentTime,
      url: value.url
    }
  };
}

function doParsedRequest(requestData) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_request__["a" /* default */])(requestData).map(mapRequestResponses);
}

/* harmony default export */ __webpack_exports__["a"] = (doParsedRequest);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return byteRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return extractISML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extractToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return replaceToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return resolveManifest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return buildSegmentURL; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ISM_REG = /\.(isml?)(\?token=\S+)?$/;
var TOKEN_REG = /\?token=(\S+)/;

function byteRange(_ref) {
  var start = _ref[0],
      end = _ref[1];

  if (!end || end === Infinity) {
    return "bytes=" + +start + "-";
  } else {
    return "bytes=" + +start + "-" + +end;
  }
}

/**
 * TODO Remove this logic completely from the player
 */
function extractISML(_ref2) {
  var responseData = _ref2.responseData;

  return responseData.getElementsByTagName("media")[0].getAttribute("src");
}

/**
 * Returns string corresponding to the token contained in the url's querystring.
 * Empty string if no token is found.
 * @param {string} url
 * @returns {string}
 */
function extractToken(url) {
  var tokenMatch = url.match(TOKEN_REG);
  return tokenMatch && tokenMatch[1] || "";
}

/**
 * Replace/Remove token from the url's querystring
 * @param {string} url
 * @param {string} [token]
 * @returns {string}
 */
function replaceToken(url, token) {
  if (token) {
    return url.replace(TOKEN_REG, "?token=" + token);
  } else {
    return url.replace(TOKEN_REG, "");
  }
}

function resolveManifest(url) {
  var ismMatch = url.match(ISM_REG);
  if (ismMatch) {
    return url.replace(ismMatch[1], ismMatch[1] + "/manifest");
  } else {
    return url;
  }
}

function buildSegmentURL(url, representation, segment) {
  return url.replace(/\{bitrate\}/g, representation.bitrate).replace(/\{start time\}/g, segment.time);
}



/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getFuzzedDelay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getBackedoffDelay; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var FUZZ_FACTOR = 0.3;

/**
 * Perform "fuzzing" on the delay given.
 * @param {Number} retryDelay
 * @returns {Number}
 */
function getFuzzedDelay(retryDelay) {
  var fuzzingFactor = (Math.random() * 2 - 1) * FUZZ_FACTOR;
  return retryDelay * (1.0 + fuzzingFactor); // Max 1.3 Min 0.7
}

/**
 * Calculate a "backed off" fuzzed delay.
 * That is, a delay augmented depending on the current retry count.
 * @param {Number} retryDelay
 * @param {Number} [retryCount=1]
 * @returns {Number}
 */
function getBackedoffDelay(retryDelay) {
  var retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return getFuzzedDelay(retryDelay * Math.pow(2, retryCount - 1));
}



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return retryWithBackoff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return retryableFuncWithBackoff; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__backoff__ = __webpack_require__(69);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Simple debounce implementation.
 * @param {Function} fn
 * @param {Number} delay
 * @returns {Function}
 */
function debounce(fn, delay) {
  var timer = 0;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}

/**
 * Retry the given observable (if it triggers an error) with an exponential
 * backoff.
 * The backoff behavior can be tweaked through the options given.
 *
 * @param {Observable} obs$
 * @param {Object} options
 * @param {Number} options.retryDelay - The initial delay, in ms.
 * This delay will be fuzzed to fall under the range +-30% each time a new retry
 * is done.
 * Then, this delay will be multiplied by 2^(n-1), n being the counter of retry
 * we performed (beginning at 1 for the first retry).
 * @param {Number} options.totalRetry - The amount of time we should retry. 0
 * means no retry, 1 means a single retry, Infinity means infinite retry etc.
 * If the observable still fails after this number of retry, the error will
 * be throwed through this observable.
 * @param {Number} [options.resetDelay] - Delay in ms since a retry after which
 * the counter of retry will be reset if the observable wasn't retried a new
 * time. 0 / undefined means no delay will be applied.
 * @param {Function} [options.shouldRetry] - Function which will receive the
 * observable error each time it fails, and should return a boolean. If this
 * boolean is false, the error will be directly thrown (without anymore retry).
 * @param {Function} [options.onRetry] - Function which will be triggered at
 * each retry. Will receive two arguments:
 *   1. The observable error
 *   2. The current retry count, beginning at 1 for the first retry
 * @param {Function} [options.errorSelector]
 * @returns {Observable}
 * TODO Take errorSelector out. Should probably be entirely managed in the
 * calling code via a catch (much simpler to use and to understand).
 */
function retryWithBackoff(obs$, options) {
  var retryDelay = options.retryDelay,
      totalRetry = options.totalRetry,
      shouldRetry = options.shouldRetry,
      resetDelay = options.resetDelay,
      errorSelector = options.errorSelector,
      onRetry = options.onRetry;


  var retryCount = 0;
  var debounceRetryCount = void 0;
  if (resetDelay > 0) {
    debounceRetryCount = debounce(function () {
      return retryCount = 0;
    }, resetDelay);
  }

  return obs$.catch(function (error, source) {
    var wantRetry = !shouldRetry || shouldRetry(error);
    if (!wantRetry || retryCount++ >= totalRetry) {
      if (errorSelector) {
        throw errorSelector(error, retryCount);
      } else {
        throw error;
      }
    }

    if (onRetry) {
      onRetry(error, retryCount);
    }

    var fuzzedDelay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__backoff__["a" /* getBackedoffDelay */])(retryDelay, retryCount);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].timer(fuzzedDelay).mergeMap(function () {
      debounceRetryCount && debounceRetryCount();
      return source;
    });
  });
}

/**
 * Same than retryWithBackoff, only with a function returning an observable
 * instead of an observable.
 * @param {Function} fn - Function returning an Observable which
 * will (well, might) be retried.
 * @param {Object} options
 * @param {Number} options.retryDelay
 * @param {Number} options.totalRetry
 * @param {Number} [options.resetDelay]
 * @param {Function} [options.shouldRetry]
 * @param {Function} [options.errorSelector]
 * @param {Function} [options.onRetry]
 * @returns {Function} - take in argument fn's arguments, returns
 * an Observable.
 */
function retryableFuncWithBackoff(fn, options) {
  var retryDelay = options.retryDelay,
      totalRetry = options.totalRetry,
      shouldRetry = options.shouldRetry,
      resetDelay = options.resetDelay,
      errorSelector = options.errorSelector,
      onRetry = options.onRetry;


  var retryCount = 0;
  var debounceRetryCount = void 0;
  if (resetDelay > 0) {
    debounceRetryCount = debounce(function () {
      return retryCount = 0;
    }, resetDelay);
  }

  return function doRetry() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(undefined, args).catch(function (error) {
      var wantRetry = !shouldRetry || shouldRetry(error);
      if (!wantRetry || retryCount++ >= totalRetry) {
        if (errorSelector) {
          throw errorSelector(error, retryCount);
        } else {
          throw error;
        }
      }

      if (onRetry) {
        onRetry(error, retryCount);
      }

      var fuzzedDelay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__backoff__["a" /* getBackedoffDelay */])(retryDelay, retryCount);
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].timer(fuzzedDelay).mergeMap(function () {
        debounceRetryCount && debounceRetryCount();
        return doRetry.apply(undefined, args);
      });
    });
  };
}



/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(11);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(12);
var Observable_1 = __webpack_require__(0);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = (function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {PromiseLike<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1.Observable));
exports.PromiseObservable = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=PromiseObservable.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var isScheduler_1 = __webpack_require__(20);
var ArrayObservable_1 = __webpack_require__(15);
var mergeAll_1 = __webpack_require__(45);
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from every
 * given input Observable after the current Observable.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * Joins this Observable with multiple other Observables by subscribing to them
 * one at a time, starting with the source, and merging their results into the
 * output Observable. Will wait for each Observable to complete before moving
 * on to the next.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = timer.concat(sequence);
 * result.subscribe(x => console.log(x));
 *
 * // results in:
 * // 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
 *
 * @example <caption>Concatenate 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = timer1.concat(timer2, timer3);
 * result.subscribe(x => console.log(x));
 *
 * // results in the following:
 * // (Prints to console sequentially)
 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {ObservableInput} other An input Observable to concatenate after the source
 * Observable. More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @method concat
 * @owner Observable
 */
function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(concatStatic.apply(void 0, [this].concat(observables)));
}
exports.concat = concat;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which sequentially emits all values from given
 * Observable and then moves on to the next.
 *
 * <span class="informal">Concatenates multiple Observables together by
 * sequentially emitting their values, one Observable after the other.</span>
 *
 * <img src="./img/concat.png" width="100%">
 *
 * `concat` joins multiple Observables together, by subscribing to them one at a time and
 * merging their results into the output Observable. You can pass either an array of
 * Observables, or put them directly as arguments. Passing an empty array will result
 * in Observable that completes immediately.
 *
 * `concat` will subscribe to first input Observable and emit all its values, without
 * changing or affecting them in any way. When that Observable completes, it will
 * subscribe to then next Observable passed and, again, emit its values. This will be
 * repeated, until the operator runs out of Observables. When last input Observable completes,
 * `concat` will complete as well. At any given moment only one Observable passed to operator
 * emits values. If you would like to emit values from passed Observables concurrently, check out
 * {@link merge} instead, especially with optional `concurrent` parameter. As a matter of fact,
 * `concat` is an equivalent of `merge` operator with `concurrent` parameter set to `1`.
 *
 * Note that if some input Observable never completes, `concat` will also never complete
 * and Observables following the one that did not complete will never be subscribed. On the other
 * hand, if some Observable simply completes immediately after it is subscribed, it will be
 * invisible for `concat`, which will just move on to the next Observable.
 *
 * If any Observable in chain errors, instead of passing control to the next Observable,
 * `concat` will error immediately as well. Observables that would be subscribed after
 * the one that emitted error, never will.
 *
 * If you pass to `concat` the same Observable many times, its stream of values
 * will be "replayed" on every subscription, which means you can repeat given Observable
 * as many times as you like. If passing the same Observable to `concat` 1000 times becomes tedious,
 * you can always use {@link repeat}.
 *
 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
 * var timer = Rx.Observable.interval(1000).take(4);
 * var sequence = Rx.Observable.range(1, 10);
 * var result = Rx.Observable.concat(timer, sequence);
 * result.subscribe(x => console.log(x));
 *
 * // results in:
 * // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
 *
 *
 * @example <caption>Concatenate an array of 3 Observables</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var result = Rx.Observable.concat([timer1, timer2, timer3]); // note that array is passed
 * result.subscribe(x => console.log(x));
 *
 * // results in the following:
 * // (Prints to console sequentially)
 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
 *
 *
 * @example <caption>Concatenate the same Observable to repeat it</caption>
 * const timer = Rx.Observable.interval(1000).take(2);
 *
 * Rx.Observable.concat(timer, timer) // concating the same Observable!
 * .subscribe(
 *   value => console.log(value),
 *   err => {},
 *   () => console.log('...and it is done!')
 * );
 *
 * // Logs:
 * // 0 after 1s
 * // 1 after 2s
 * // 0 after 3s
 * // 1 after 4s
 * // "...and it is done!" also after 4s
 *
 * @see {@link concatAll}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 *
 * @param {ObservableInput} input1 An input Observable to concatenate with others.
 * @param {ObservableInput} input2 An input Observable to concatenate with others.
 * More than one input Observables may be given as argument.
 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
 * Observable subscription on.
 * @return {Observable} All values of each passed Observable merged into a
 * single Observable, in order, in serial fashion.
 * @static true
 * @name concat
 * @owner Observable
 */
function concatStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var scheduler = null;
    var args = observables;
    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
        scheduler = args.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
        return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatStatic = concatStatic;
//# sourceMappingURL=concat.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var ArrayObservable_1 = __webpack_require__(15);
var mergeAll_1 = __webpack_require__(45);
var isScheduler_1 = __webpack_require__(20);
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {ObservableInput} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} An Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    return this.lift.call(mergeStatic.apply(void 0, [this].concat(observables)));
}
exports.merge = merge;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // timer will emit ascending values, one every second(1000ms) to console
 * // clicks logs MouseEvents to console everytime the "document" is clicked
 * // Since the two streams are merged you see these happening
 * // as they occur.
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - First timer1 and timer2 will run concurrently
 * // - timer1 will emit a value every 1000ms for 10 iterations
 * // - timer2 will emit a value every 2000ms for 6 iterations
 * // - after timer1 hits it's max iteration, timer2 will
 * //   continue, and timer3 will start to run concurrently with timer2
 * // - when timer2 hits it's max iteration it terminates, and
 * //   timer3 will continue to emit a value every 500ms until it is complete
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {...ObservableInput} observables Input Observables to merge together.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
        return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
}
exports.mergeStatic = mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var subscribeToResult_1 = __webpack_require__(16);
var OuterSubscriber_1 = __webpack_require__(14);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
}
exports.mergeMap = mergeMap;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
exports.MergeMapOperator = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapSubscriber = MergeMapSubscriber;
//# sourceMappingURL=mergeMap.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var Notification_1 = __webpack_require__(173);
/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return this.lift(new ObserveOnOperator(scheduler, delay));
}
exports.observeOn = observeOn;
var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());
exports.ObserveOnOperator = ObserveOnOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ObserveOnSubscriber = (function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber_1.Subscriber));
exports.ObserveOnSubscriber = ObserveOnSubscriber;
var ObserveOnMessage = (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());
exports.ObserveOnMessage = ObserveOnMessage;
//# sourceMappingURL=observeOn.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(12);
var Action_1 = __webpack_require__(257);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        var id = this.id;
        var scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return root_1.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        return root_1.root.clearInterval(id) && undefined || undefined;
    };
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(Action_1.Action));
exports.AsyncAction = AsyncAction;
//# sourceMappingURL=AsyncAction.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Scheduler_1 = __webpack_require__(175);
var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
        _super.apply(this, arguments);
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         */
        this.scheduled = undefined;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift()); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler_1.Scheduler));
exports.AsyncScheduler = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when duetime elapses.
 *
 * @see {@link timeout}
 *
 * @class TimeoutError
 */
var TimeoutError = (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError() {
        var err = _super.call(this, 'Timeout has occurred');
        this.name = err.name = 'TimeoutError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=TimeoutError.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArrayLike.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isDate(value) {
    return value instanceof Date && !isNaN(+value);
}
exports.isDate = isDate;
//# sourceMappingURL=isDate.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(26);
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
}
exports.isNumeric = isNumeric;
;
//# sourceMappingURL=isNumeric.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_combineLatest__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_combineLatest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_defer__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_defer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_defer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_empty__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_empty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_empty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromEvent__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromEvent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_interval__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_never__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_never___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_never__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_of__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_throw__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_timer__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_catch__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_concat__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_concat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_concat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_concatAll__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_concatAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_concatAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_concatMap__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_debounceTime__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_add_operator_do__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_rxjs_add_operator_filter__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_rxjs_add_operator_finally__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_rxjs_add_operator_ignoreElements__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_rxjs_add_operator_ignoreElements___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_rxjs_add_operator_ignoreElements__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_rxjs_add_operator_map__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_rxjs_add_operator_mapTo__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_rxjs_add_operator_mapTo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_rxjs_add_operator_mapTo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_rxjs_add_operator_merge__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_rxjs_add_operator_mergeMap__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_rxjs_add_operator_multicast__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_rxjs_add_operator_multicast___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_rxjs_add_operator_multicast__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_rxjs_add_operator_pairwise__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_rxjs_add_operator_pairwise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_rxjs_add_operator_pairwise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_rxjs_add_operator_publish__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_rxjs_add_operator_publish___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_rxjs_add_operator_publish__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_rxjs_add_operator_scan__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_rxjs_add_operator_scan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29_rxjs_add_operator_scan__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_rxjs_add_operator_share__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_rxjs_add_operator_skip__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_rxjs_add_operator_skip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_31_rxjs_add_operator_skip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_rxjs_add_operator_startWith__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_32_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_rxjs_add_operator_switchMap__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_rxjs_add_operator_take__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_34_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_rxjs_add_operator_takeUntil__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_rxjs_add_operator_timeout__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__utils_log_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__core_api__ = __webpack_require__(98);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */












































if (false) {
  logger.setLevel(__LOGGER_LEVEL__);
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_38__core_api__["a" /* default */]);

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MediaKeys_js__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setMediaKeys_js__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keySystemAccess_js__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__MediaKeys_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__setMediaKeys_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__keySystemAccess_js__["a"]; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_castToObservable_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MediaKeys_js__ = __webpack_require__(54);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * Set the MediaKeys given on the media element.
 * @param {HTMLMediaElement} elt
 * @param {Object} mediaKeys
 * @returns {Promise}
 */
function _setMediaKeys(elt, mediaKeys) {
  if (mediaKeys instanceof __WEBPACK_IMPORTED_MODULE_2__MediaKeys_js__["b" /* MockMediaKeys */]) {
    return mediaKeys._setVideo(elt);
  }

  if (elt.setMediaKeys) {
    return elt.setMediaKeys(mediaKeys);
  }

  if (mediaKeys === null) {
    return;
  }

  if (elt.WebkitSetMediaKeys) {
    return elt.WebkitSetMediaKeys(mediaKeys);
  }

  if (elt.mozSetMediaKeys) {
    return elt.mozSetMediaKeys(mediaKeys);
  }

  if (elt.msSetMediaKeys) {
    return elt.msSetMediaKeys(mediaKeys);
  }
}

/**
 * @param {HTMLMediaElement} elt
 * @param {Object} mediaKeys
 * @returns {Observable}
 */
/* harmony default export */ __webpack_exports__["a"] = (function (elt, mediaKeys) {
  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].defer(function () {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_castToObservable_js__["a" /* default */])(_setMediaKeys(elt, mediaKeys));
  });
});

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return requestFullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return exitFullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isFullscreen; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Request fullScreen action on a given element.
 * @param {HTMLElement} elt
 */
function requestFullscreen(elt) {
  if (!isFullscreen()) {
    if (elt.requestFullscreen) {
      elt.requestFullscreen();
    } else if (elt.msRequestFullscreen) {
      elt.msRequestFullscreen();
    } else if (elt.mozRequestFullScreen) {
      elt.mozRequestFullScreen();
    } else if (elt.webkitRequestFullscreen) {
      elt.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }
}

/**
 * Exit fullscreen if an element is currently in fullscreen.
 * TODO this exit fullscreen mode even if any element in the document is in
 * fullscreen, is it really what we want?
 */
function exitFullscreen() {
  if (isFullscreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/**
 * Returns true if an element in the document is being displayed in fullscreen
 * mode;
 * otherwise it's false.
 * @returns {boolean}
 */
function isFullscreen() {
  return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}



/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ewma_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(4);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var FAST_EMA = 2;
var SLOW_EMA = 10;

var ABR_MINIMUM_TOTAL_BYTES = __WEBPACK_IMPORTED_MODULE_1__config_js__["a" /* default */].ABR_MINIMUM_TOTAL_BYTES,
    ABR_MINIMUM_CHUNK_SIZE = __WEBPACK_IMPORTED_MODULE_1__config_js__["a" /* default */].ABR_MINIMUM_CHUNK_SIZE;

/**
 * Calculate a mean bandwidth based on the bytes downloaded and the amount
 * of time needed to do so.
 *
 * Heavily "inspired" from the Shaka-Player's "ewma bandwidth estimator".
 * @class BandwidthEstimator
 */

var BandwidthEstimator = function () {
  function BandwidthEstimator() {
    _classCallCheck(this, BandwidthEstimator);

    /**
     * A fast-moving average.
     * @private
     */
    this._fast = new __WEBPACK_IMPORTED_MODULE_0__ewma_js__["a" /* default */](FAST_EMA);

    /**
     * A slow-moving average.
     * @private
     */
    this._slow = new __WEBPACK_IMPORTED_MODULE_0__ewma_js__["a" /* default */](SLOW_EMA);

    /**
     * Number of bytes sampled.
     * @private
     */
    this._bytesSampled = 0;
  }

  /**
   * Takes a bandwidth sample.
   * @param {number} durationMs The amount of time, in milliseconds, for a
   *   particular request.
   * @param {number} numBytes The total number of bytes transferred in that
   *   request.
   */


  BandwidthEstimator.prototype.addSample = function addSample(durationInMs, numberOfBytes) {
    if (numberOfBytes < ABR_MINIMUM_CHUNK_SIZE) {
      return;
    }

    var bandwidth = 8000 * numberOfBytes / durationInMs;
    var weight = durationInMs / 1000;
    this._bytesSampled += numberOfBytes;

    this._fast.addSample(weight, bandwidth);
    this._slow.addSample(weight, bandwidth);
  };

  /**
   * Get estimate of the bandwidth, in bits per seconds.
   * @returns {Number}
   */


  BandwidthEstimator.prototype.getEstimate = function getEstimate() {
    if (this._bytesSampled < ABR_MINIMUM_TOTAL_BYTES) {
      return;
    }

    // Take the minimum of these two estimates.  This should have the effect of
    // adapting down quickly, but up more slowly.
    return Math.min(this._fast.getEstimate(), this._slow.getEstimate());
  };

  /**
   * Reset the bandwidth estimation.
   */


  BandwidthEstimator.prototype.reset = function reset() {
    this._fast = new __WEBPACK_IMPORTED_MODULE_0__ewma_js__["a" /* default */](FAST_EMA);
    this._slow = new __WEBPACK_IMPORTED_MODULE_0__ewma_js__["a" /* default */](SLOW_EMA);
    this._bytesSampled = 0;
  };

  return BandwidthEstimator;
}();

/* harmony default export */ __webpack_exports__["a"] = (BandwidthEstimator);

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filterByBitrate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find_index__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_array_find_index__);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @param {Array.<Object>} representations - The representations array
 * @param {Number} bitrate
 * @returns {Array.<Object>}
 */
function filterByBitrate(representations, bitrate) {
  var firstSuperiorBitrate = __WEBPACK_IMPORTED_MODULE_0_array_find_index___default()(representations, function (r) {
    return r.bitrate > bitrate;
  });

  if (firstSuperiorBitrate === -1) {
    return representations;
  }
  return representations.slice(0, firstSuperiorBitrate);
}

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = filterByWidth;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_array_find__);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @param {Array.<Object>} representations - The representations array
 * @param {Number} width
 * @returns {Array.<Object>}
 */
function filterByWidth(representations, width) {
  var sortedRepsByWidth = representations.sort(function (a, b) {
    return a.width - b.width;
  });
  var RepWithMaxWidth = __WEBPACK_IMPORTED_MODULE_0_array_find___default()(sortedRepsByWidth, function (r) {
    return r.width >= width;
  });

  if (RepWithMaxWidth) {
    var maxWidth = RepWithMaxWidth.width;
    return representations.filter(function (r) {
      return r.width <= maxWidth;
    });
  }
  return representations;
}

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromBitrateCeil;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find_index__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_array_find_index__);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @param {Array.<Representation>} representations - The representations array
 * @param {Number} bitrate
 * @returns {Array.<Representation>}
 */
function fromBitrateCeil(representations, bitrate) {
  var tooHighIndex = __WEBPACK_IMPORTED_MODULE_0_array_find_index___default()(representations, function (representation) {
    return representation.bitrate > bitrate;
  });
  if (tooHighIndex === -1) {
    return representations[representations.length - 1];
  }
  return representations[tooHighIndex - 1];
}

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_array_includes_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_assert_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__representation_chooser_js__ = __webpack_require__(96);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








/**
 * Types of chunks accepted by the ABR logic.
 */
var KNOWN_TYPES = ["audio", "video", "text", "image"];

/**
 * @param {string} type
 * @throws {AssertError} - Throws if the type given is not known.
 */
var assertType = function assertType(type) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_assert_js__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_array_includes_js__["a" /* default */])(KNOWN_TYPES, type), "\"" + type + "\" is an unknown type");
};

/**
 * Create the right RepresentationChooser instance, from the given data.
 * @param {string} type
 * @param {Object} options
 * @returns {Observable} - The RepresentationChooser instance
 */
var createChooser = function createChooser(type, options) {
  return new __WEBPACK_IMPORTED_MODULE_3__representation_chooser_js__["a" /* default */]({
    limitWidth$: options.limitWidth[type],
    throttle$: options.throttle[type],
    initialBitrate: options.initialBitrates[type],
    manualBitrate: options.manualBitrates[type],
    maxAutoBitrate: options.maxAutoBitrates[type]
  });
};

/**
 * If it doesn't exist, create a RepresentationChooser instance and add
 * it to the given "instce" context, under the _choosers.<bufferType> property.
 * @param {ABRManager} intce
 * @param {string} bufferType
 */
var lazilyAttachChooser = function lazilyAttachChooser(instce, bufferType) {
  if (!instce._choosers[bufferType]) {
    instce._choosers[bufferType] = createChooser(bufferType, instce._chooserInstanceOptions);
  }
};

/**
 * Adaptive BitRate Manager.
 *
 * Select the right representation from the network and buffer infos it
 * receives.
 * @class ABRManager
 */

var ABRManager = function () {
  /**
   * @param {Observable} requests$ - Emit requests infos as they begin, progress
   * and end.
   * Allows to know if a request take too much time to be finished in
   * emergency times (e.g. when the user's bandwidth falls very quickly).
   *
   * The items emitted are Observables which each emit infos about a SINGLE
   * request. These infos are under the form of objects with the following keys:
   *   - type {string}: the buffer type (example: "video")
   *
   *   - event {string}: Wether the request started, is progressing or has
   *     ended. Should be either one of these three strings:
   *       1. "requestBegin": The request has just begun.
   *
   *       2. "progress": Informations about the request progress were received
   *          (basically the amount of bytes currently received).
   *
   *       2. "requestEnd": The request just ended (successfully/on error/was
   *          canceled)
   *
   *     Note that it should ALWAYS happen in the following order:
   *     1 requestBegin -> 0+ progress -> 1 requestEnd
   *
   *     Also note that EVERY requestBegin should eventually be followed by a
   *     requestEnd at some point. If that's not the case, a memory leak
   *     can happen.
   *
   *   - value {Object|undefined}: The value depends on the type of event
   *     received:
   *       - for "requestBegin" events, it should be an object with the
   *         following keys:
   *           - id {Number|String}: The id of this particular request.
   *           - duration {Number}: duration, in seconds of the asked segment.
   *           - time {Number}: The start time, in seconds of the asked segment.
   *           - requestTimestamp {Number}: the timestamp at which the request
   *             was sent, in ms.
   *
   *       - for "progress" events, it should be an object with the following
   *         keys:
   *           - id {Number|String}: The id of this particular request.
   *           - size {Number}: amount currently downloaded, in bytes
   *           - timestamp {Number}: timestamp at which the progress event was
   *             received, in ms
   *         Those events SHOULD be received in order (that is, in increasing
   *         order for both size and timestamp).
   *
   *       - for "requestEnd" events:
   *           - id {Number|String}: The id of this particular request.
   *
   * @param {Observable} metrics$ - Emit each times the network downloaded
   * a new segment for a given buffer type. Allows to obtain informations about
   * the user's bitrate.
   *
   * The items emitted are object with the following keys:
   *   - type {string}: the buffer type (example: "video")
   *   - value {Object}:
   *     - duration {Number}: duration of the request, in seconds.
   *     - size {Number}: size of the downloaded chunks, in bytes.
   *
   * @param {Object} [options={}]
   * @param {Object} [options.initialBitrates={}]
   * @param {Object} [options.manualBitrates={}]
   * @param {Object} [options.maxAutoBitrates={}]
   * @param {Object} [options.throttle={}]
   * @param {Object} [options.limitWidth={}]
   */
  function ABRManager(requests$, metrics$) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, ABRManager);

    // Subject emitting and completing on dispose.
    // Used to clean up every created observables.
    this._dispose$ = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();

    // Will contain every RepresentationChooser attached to the ABRManager,
    // by type ("audio"/"video" etc.)
    this._choosers = {};

    // -- OPTIONS --

    // Will contain options used when (lazily) instantiating a
    // RepresentationChooser
    this._chooserInstanceOptions = {
      initialBitrates: options.initialBitrates || {},
      manualBitrates: options.manualBitrates || {},
      maxAutoBitrates: options.maxAutoBitrates || {},
      throttle: options.throttle || {},
      limitWidth: options.limitWidth || {}
    };

    metrics$.takeUntil(this._dispose$).subscribe(function (_ref) {
      var type = _ref.type,
          value = _ref.value;

      if (false) {
        assertType(type);
      }

      lazilyAttachChooser(_this, type);
      var duration = value.duration,
          size = value.size;

      // TODO Should we do a single estimate instead of a per-type one?
      // Test it thoroughly

      _this._choosers[type].addEstimate(duration, size);
    });

    requests$
    // requests$ emits observables which are subscribed to
    .mergeMap(function (request$) {
      return request$;
    }).takeUntil(this._dispose$).subscribe(function (_ref2) {
      var type = _ref2.type,
          event = _ref2.event,
          value = _ref2.value;

      if (false) {
        assertType(type);
      }

      lazilyAttachChooser(_this, type);
      switch (event) {
        case "requestBegin":
          // use the id of the segment as in any case, we should only have at
          // most one active download for the same segment.
          // This might be not optimal if this changes however. The best I think
          // for now is to just throw/warn in DEV mode when two pending ids
          // are identical
          _this._choosers[type].addPendingRequest(value.id, value);
          break;
        case "requestEnd":
          _this._choosers[type].removePendingRequest(value.id);
          break;
        case "progress":
          _this._choosers[type].addRequestProgress(value.id, value);
          break;
      }
    });
  }

  /**
   * Take type and an array of the available representations, spit out an
   * observable emitting the best representation (given the network/buffer
   * state).
   * @param {string} type
   * @param {Array.<Representation>} [representations=[]]
   * @returns {Observable}
   */


  ABRManager.prototype.get$ = function get$(type, clock$) {
    var representations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (false) {
      assertType(type);
    }
    lazilyAttachChooser(this, type);
    return this._choosers[type].get$(clock$, representations);
  };

  /**
   * Set manually the bitrate for a given type.
   *
   * The given number will act as a ceil.
   * If no representation is found with the given bitrate, we will consider:
   *   1. The representation just lower than it
   *   2. If no representation is found in the previous step, the representation
   *   with the lowest bitrate.
   *
   * @param {string} type
   * @param {Number} bitrate
   */


  ABRManager.prototype.setManualBitrate = function setManualBitrate(type, bitrate) {
    if (false) {
      assertType(type);
    }

    var chooser = this._choosers[type];
    if (!chooser) {
      // if no chooser yet, store as a chooser option for when it will be
      // effectively instantiated
      this._chooserInstanceOptions.initialBitrates[type] = bitrate;
    } else {
      chooser.manualBitrate$.next(bitrate);
    }
  };

  ABRManager.prototype.setMaxAutoBitrate = function setMaxAutoBitrate(type, bitrate) {
    if (false) {
      assertType(type);
    }

    var chooser = this._choosers[type];
    if (!chooser) {
      // if no chooser yet, store as a chooser option for when it will be
      // effectively instantiated
      this._chooserInstanceOptions.maxAutoBitrates[type] = bitrate;
    } else {
      chooser.maxAutoBitrate$.next(bitrate);
    }
  };

  ABRManager.prototype.getManualBitrate = function getManualBitrate(type) {
    if (false) {
      assertType(type);
    }
    var chooser = this._choosers[type];
    return chooser ? chooser.manualBitrate$.getValue() : this._chooserInstanceOptions.manualBitrates[type];
  };

  ABRManager.prototype.getMaxAutoBitrate = function getMaxAutoBitrate(type) {
    if (false) {
      assertType(type);
    }
    var chooser = this._choosers[type];
    return chooser ? chooser.maxAutoBitrate$.getValue() : this._chooserInstanceOptions.maxAutoBitrates[type];
  };

  ABRManager.prototype.dispose = function dispose() {
    var _this2 = this;

    Object.keys(this._choosers).forEach(function (type) {
      _this2._choosers[type].dispose();
    });
    this._chooserInstanceOptions = null;
    this._choosers = null;
    this._dispose$.next();
    this._dispose$.complete();
  };

  return ABRManager;
}();

/* harmony default export */ __webpack_exports__["a"] = (ABRManager);

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_assert_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bandwidth_estimator_js__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__filterByWidth_js__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__filterByBitrate_js__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__fromBitrateCeil_js__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ewma_js__ = __webpack_require__(56);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








// import takeFirstSet from "../../utils/takeFirstSet.js";







var ABR_STARVATION_GAP = __WEBPACK_IMPORTED_MODULE_4__config_js__["a" /* default */].ABR_STARVATION_GAP,
    OUT_OF_STARVATION_GAP = __WEBPACK_IMPORTED_MODULE_4__config_js__["a" /* default */].OUT_OF_STARVATION_GAP;

/**
 * Returns an observable emitting only the representation concerned by the
 * bitrate ceil given.
 * @param {Array.<Representation>} representations
 * @param {Number} bitrate
 * @returns {Observable}
 */

var setManualRepresentation = function setManualRepresentation(representations, bitrate) {
  var chosenRepresentation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__fromBitrateCeil_js__["a" /* default */])(representations, bitrate) || representations[0];

  return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(chosenRepresentation).concat(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].never());
};

/**
 * Get the pending request containing the asked segment position.
 * @param {Object} requests
 * @param {Number} segmentPosition
 * @returns {Object|undefined}
 */
var getConcernedRequest = function getConcernedRequest(requests, segmentPosition) {
  var currentRequestIds = Object.keys(requests);
  var len = currentRequestIds.length;

  for (var i = 0; i < len - 1; i++) {
    var request = requests[currentRequestIds[i]];
    var chunkTime = request.time,
        chunkDuration = request.duration;

    // TODO review this

    if (Math.abs(segmentPosition - chunkTime) < chunkDuration) {
      return request;
    }
  }
};

/**
 * Estimate the __VERY__ recent bandwidth based on a single unfinished request.
 * Useful when the current bandwidth seemed to have fallen quickly.
 *
 * Use progress events if available, set a much more random lower bitrate
 * if no progress events are available.
 *
 * @param {Object} request
 * @param {Number} requestTime - Amount of time the request has taken for now,
 * in seconds.
 * @param {Number} bitrate - Current bitrate at the time of download
 */
var estimateRequestBandwidth = function estimateRequestBandwidth(request, requestTime, bitrate) {
  var estimate = void 0;
  var chunkDuration = request.duration;

  // try to infer quickly the current bitrate based on the
  // progress events
  if (request.progress.length >= 2) {
    var ewma1 = new __WEBPACK_IMPORTED_MODULE_10__ewma_js__["a" /* default */](2);

    var progress = request.progress;

    for (var i = 1; i < progress.length; i++) {
      var bytesDownloaded = progress[i].size - progress[i - 1].size;

      var timeElapsed = progress[i].timestamp - progress[i - 1].timestamp;

      var _bitrate = bytesDownloaded * 8 / (timeElapsed / 1000);

      ewma1.addSample(timeElapsed / 1000, _bitrate);
    }
    estimate = ewma1.getEstimate();
  }

  // if that fails / no progress event, take a guess
  if (!estimate) {
    var chunkSize = chunkDuration * bitrate;

    // take current duration of request as a base
    estimate = chunkSize / (requestTime * 5 / 4);
  }
  return estimate;
};

/**
 * Filter representations given through filters options.
 * @param {Array.<Representation>} representations
 * @param {Object} filters
 * @param {Number} [filters.bitrate] - max bitrate authorized (included).
 * @param {Number} [filters.width] - max width authorized (included).
 * @returns {Array.<Representation>}
 */
var getFilteredRepresentations = function getFilteredRepresentations(representations, filters) {
  var _representations = representations;

  if (filters.hasOwnProperty("bitrate")) {
    _representations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__filterByBitrate_js__["a" /* default */])(_representations, filters.bitrate);
  }

  if (filters.hasOwnProperty("width")) {
    _representations = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__filterByWidth_js__["a" /* default */])(_representations, filters.width);
  }

  return _representations;
};

/**
 * Returns true if the request takes too much time relatively to how much we
 * should actually wait.
 * Depends on the chunk duration.
 * @param {Number} durationOfRequest - time, in s, since the request has been
 * performed.
 * @param {Number} chunkDuration - duration, in s, of a single chunk
 * @returns {Boolean}
 */
var requestTakesTime = function requestTakesTime(durationOfRequest, chunkDuration) {
  return durationOfRequest > 1 + chunkDuration * 1.2;
};

/**
 * Choose the right representation based on multiple parameters given, such as:
 *   - the current user's bandwidth
 *   - the max bitrate authorized
 *   - the size of the video element
 *   - etc.
 *
 * Those parameters can be set through different subjects and methods.
 * The subjects (undocumented here are):
 *
 *   - manualBitrate$ {Subject}: Set the bitrate manually, if no representation
 *     is found with the given bitrate. An immediately inferior one will be
 *     taken instead. If still, none are found, the representation with the
 *     minimum bitrate will be taken.
 *     Set it to a negative value to go into automatic bitrate mode.
 *
 *   - maxBitrate$ {Subject}: Set the maximum automatic bitrate. If the manual
 *     bitrate is not set / set to a negative value, this will be the maximum
 *     switch-able bitrate. If no representation is found inferior or equal to
 *     this bitrate, the representation with the minimum bitrate will be taken.
 *
 */

var RepresentationChooser = function () {
  /**
   * @param {Object} options
   * @param {Number} [options.manualBitrate=-1]
   * @param {Number} [options.maxAutoBitrate=Infinity]
   * @param {Number} [options.initialBitrate=0]
   * @param {Observable} [options.limitWidth$]
   * @param {Observable} [options.throttle$]
   */
  function RepresentationChooser() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, RepresentationChooser);

    this._dispose$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();

    this.manualBitrate$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](options.manualBitrate != null ? options.manualBitrate : -1).takeUntil(this._dispose$);

    this.maxAutoBitrate$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](options.maxAutoBitrate != null ? options.maxAutoBitrate : Infinity).takeUntil(this._dispose$);

    this.estimator = new __WEBPACK_IMPORTED_MODULE_6__bandwidth_estimator_js__["a" /* default */]();
    this._currentRequests = {};

    this.initialBitrate = options.initialBitrate || 0;

    this._limitWidth$ = options.limitWidth$;
    this._throttle$ = options.throttle$;
  }

  RepresentationChooser.prototype.get$ = function get$(clock$, representations) {
    var _this = this;

    if (representations.length < 2) {
      return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of({
        bitrate: undefined,
        representation: representations.length ? representations[0] : null
      }).concat(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].never()).takeUntil(this._dispose$);
    }

    var lastBitrate = this.initialBitrate;

    var manualBitrate$ = this.manualBitrate$,
        maxAutoBitrate$ = this.maxAutoBitrate$;


    var _deviceEventsArray = [];

    if (this._limitWidth$) {
      _deviceEventsArray.push(this._limitWidth$.map(function (width) {
        return { width: width };
      }));
    }

    if (this._throttle$) {
      _deviceEventsArray.push(this._throttle$.map(function (bitrate) {
        return { bitrate: bitrate };
      }));
    }

    var deviceEvents$ = _deviceEventsArray.length ? __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].combineLatest.apply(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"], _deviceEventsArray).map(function (args) {
      return __WEBPACK_IMPORTED_MODULE_0_object_assign___default.a.apply(undefined, [{}].concat(args));
    }) : __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of({});

    return manualBitrate$.switchMap(function (manualBitrate) {
      if (manualBitrate >= 0) {
        // MANUAL mode
        return setManualRepresentation(representations, manualBitrate);
      }

      // AUTO mode
      var inStarvationMode = false;
      return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].combineLatest(clock$, maxAutoBitrate$, deviceEvents$).map(function (_ref) {
        var clock = _ref[0],
            maxAutoBitrate = _ref[1],
            deviceEvents = _ref[2];


        var nextBitrate = void 0;
        var bufferGap = clock.bufferGap;

        // Check for starvation == not much left to play

        if (bufferGap <= ABR_STARVATION_GAP) {
          inStarvationMode = true;
        } else if (inStarvationMode && bufferGap >= OUT_OF_STARVATION_GAP) {
          inStarvationMode = false;
        }

        // If in starvation mode, check if the request for the next segment
        // takes too much time relatively to the chunk's duration.
        // If that's the case, re-calculate the bandwidth urgently based on
        // this single request.
        if (inStarvationMode) {
          var position = clock.position,
              bitrate = clock.bitrate;


          var nextSegmentPosition = bufferGap + position;
          var request = getConcernedRequest(_this._currentRequests, nextSegmentPosition);

          if (request) {
            var chunkDuration = request.duration,
                requestTimestamp = request.requestTimestamp;


            var now = Date.now();
            var requestTimeInSeconds = (now - requestTimestamp) / 1000;
            if (chunkDuration && requestTakesTime(requestTimeInSeconds, chunkDuration)) {
              var estimate = estimateRequestBandwidth(request, requestTimeInSeconds, bitrate);

              if (estimate) {
                // Reset all estimations to zero
                // Note: this is weird to do this type of "global" side effect
                // (for this class) in an observable, not too comfortable with
                // that.
                _this.resetEstimate();
                nextBitrate = Math.min(estimate, bitrate, maxAutoBitrate);
              }
            }
          }
        }

        // if nextBitrate is not yet defined, do the normal estimation
        if (nextBitrate == null) {
          var baseEstimate = _this.estimator.getEstimate();

          var _estimate = baseEstimate != null && clock.bufferGap <= inStarvationMode ? baseEstimate * 0.95 : baseEstimate;

          nextBitrate = Math.min(_estimate == null ? lastBitrate : _estimate, maxAutoBitrate);
        }

        if (clock.speed > 1) {
          nextBitrate /= clock.speed;
        }

        var _representations = getFilteredRepresentations(representations, deviceEvents);

        return {
          bitrate: nextBitrate,
          representation: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__fromBitrateCeil_js__["a" /* default */])(_representations, nextBitrate) || representations[0]
        };
      }).do(function (_ref2) {
        var bitrate = _ref2.bitrate;

        if (bitrate != null) {
          lastBitrate = bitrate;
        }
      }).share();
    });
  };

  /**
   * Add a bandwidth estimate by giving:
   *   - the duration of the request, in s
   *   - the size of the request in bytes
   * @param {Number} duration
   * @param {Number} size
   */


  RepresentationChooser.prototype.addEstimate = function addEstimate(duration, size) {
    if (duration != null && size != null) {
      this.estimator.addSample(duration, size);
    }
  };

  /**
   * Reset all the estimates done until now.
   * Useful when the network situation changed completely.
   */


  RepresentationChooser.prototype.resetEstimate = function resetEstimate() {
    this.estimator.reset();
  };

  /**
   * Add informations about a new pending request.
   * This can be useful if the network bandwidth drastically changes to infer
   * a new bandwidth through this single request.
   * @param {string|Number} id
   * @param {Segment} segment
   */


  RepresentationChooser.prototype.addPendingRequest = function addPendingRequest(id, segment) {
    if (false) {
      assert(!this._currentRequests[id], "request already added");
    }
    this._currentRequests[id] = segment;
    this._currentRequests[id].progress = [];
  };

  /**
   * Add progress informations to a pending request.
   * Progress objects are a key part to calculate the bandwidth from a single
   * request, in the case the user's bandwidth changes drastically while doing
   * it.
   * @param {string|Number} id
   * @param {Object} progress
   */


  RepresentationChooser.prototype.addRequestProgress = function addRequestProgress(id, progress) {
    if (false) {
      assert(this._currentRequests[id] && this._currentRequests[id].progress, "not a valid request");
    }
    this._currentRequests[id].progress.push(progress);
  };

  /**
   * Remove a request previously set as pending through the addPendingRequest
   * method.
   * @param {string|Number} id
   */


  RepresentationChooser.prototype.removePendingRequest = function removePendingRequest(id) {
    if (false) {
      assert(this._currentRequests[id], "can't remove request: id not found");
    }
    delete this._currentRequests[id];
  };

  /**
   * Remove informations about all pending requests.
   */


  RepresentationChooser.prototype.resetRequests = function resetRequests() {
    this._currentRequests = {};
  };

  /**
   * TODO Not really needed for now
   */


  RepresentationChooser.prototype.dispose = function dispose() {
    this._dispose$.next();
  };

  return RepresentationChooser;
}();

/* harmony default export */ __webpack_exports__["a"] = (RepresentationChooser);

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_ranges_js__ = __webpack_require__(10);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var SAMPLING_INTERVAL_MEDIASOURCE = __WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* default */].SAMPLING_INTERVAL_MEDIASOURCE,
    SAMPLING_INTERVAL_NO_MEDIASOURCE = __WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* default */].SAMPLING_INTERVAL_NO_MEDIASOURCE,
    RESUME_AFTER_SEEKING_GAP = __WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* default */].RESUME_AFTER_SEEKING_GAP,
    RESUME_AFTER_BUFFERING_GAP = __WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* default */].RESUME_AFTER_BUFFERING_GAP,
    STALL_GAP = __WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* default */].STALL_GAP;

/**
 * HTMLMediaElement Events for which timings are calculated and emitted.
 * @type {Array.<string>}
 */

var SCANNED_VIDEO_EVENTS = ["canplay", "play", "progress", "seeking", "seeked", "loadedmetadata"];

/**
 * Returns the amount of time in seconds the buffer should have ahead of the
 * current position before resuming playback. Based on the infos of the stall.
 * Waiting time differs between a "seeking" stall and a buffering stall.
 * @returns {Boolean}
 */
var getResumeGap = function getResumeGap(stalled) {
  return stalled.state == "seeking" ? RESUME_AFTER_SEEKING_GAP : RESUME_AFTER_BUFFERING_GAP;
};

/**
 * TODO I just don't get it for this one.
 * gap + range.end ??? HELP
 * @param {Number} gap
 * @param {Object} range
 * @param {Number} duration
 * @returns {Boolean}
 */
var isEnding = function isEnding(bufferGap, currentRange, duration) {
  return currentRange && duration - (bufferGap + currentRange.end) <= STALL_GAP;
};

/**
 * Generate a basic timings object from the video element and the eventName
 * which triggered the request.
 * @param {HTMLMediaElement} video
 * @param {string} name
 * @returns {Object}
 */
function getTimings(video, name) {
  var currentTime = video.currentTime,
      paused = video.paused,
      playbackRate = video.playbackRate,
      readyState = video.readyState,
      buffered = video.buffered,
      duration = video.duration;


  return {
    currentTime: currentTime,
    buffered: buffered,
    duration: duration,
    bufferGap: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_ranges_js__["a" /* getLeftSizeOfRange */])(buffered, currentTime),
    state: name,
    playbackRate: playbackRate,
    currentRange: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_ranges_js__["i" /* getRange */])(buffered, currentTime),
    readyState: readyState,
    paused: paused
  };
}

/**
 * Infer stalled status of the video based on:
 *   - the return of the function getTimings
 *   - the previous timings object.
 *
 * @param {Object} prevTimings - Previous timings object. See function to know
 * the different properties needed.
 * @param {Object} currentTimings - Current timings object. This does not need
 * to have every single infos, see function to know which properties are needed.
 * @param {Boolean} withMediaSource - False if the directfile API is used.
 * @returns {Object|null}
 */
var getStalledStatus = function getStalledStatus(prevTimings, currentTimings, withMediaSource) {
  var currentState = currentTimings.state,
      currentTime = currentTimings.currentTime,
      bufferGap = currentTimings.bufferGap,
      currentRange = currentTimings.currentRange,
      duration = currentTimings.duration,
      paused = currentTimings.paused,
      readyState = currentTimings.readyState;
  var prevStalled = prevTimings.stalled,
      prevState = prevTimings.state,
      prevTime = prevTimings.currentTime;


  var ending = isEnding(bufferGap, currentRange, duration);

  var canStall = readyState >= 1 && currentState != "loadedmetadata" && !prevStalled && !ending;

  var shouldStall = void 0,
      shouldUnstall = void 0;

  if (withMediaSource) {
    if (canStall && (bufferGap <= STALL_GAP || bufferGap === Infinity || readyState === 1)) {
      shouldStall = true;
    } else if (prevStalled && readyState > 1 && bufferGap < Infinity && (bufferGap > getResumeGap(prevStalled) || ending)) {
      shouldUnstall = true;
    }
  }

  // when using a direct file, the video will stall and unstall on its
  // own, so we only try to detect when the video timestamp has not changed
  // between two consecutive timeupdates
  else {
      if (canStall && (!paused && currentState == "timeupdate" && prevState == "timeupdate" && currentTime === prevTime || currentState == "seeking" && bufferGap === Infinity)) {
        shouldStall = true;
      } else if (prevStalled && (currentState != "seeking" && currentTime !== prevTime || currentState == "canplay" || bufferGap < Infinity && (bufferGap > getResumeGap(prevStalled) || ending))) {
        shouldUnstall = true;
      }
    }

  if (shouldStall) {
    return { state: currentState, timestamp: Date.now() };
  } else if (shouldUnstall) {
    return null;
  } else {
    return prevStalled;
  }
};

/**
 * Timings observable.
 *
 * This streams samples snapshots of player's current state:
 *   * time position
 *   * playback rate
 *   * current buffered range
 *   * gap with current buffered range ending
 *   * video duration
 *
 * In addition to sampling, this stream also reacts to "seeking" and "play"
 * events.
 *
 * Observable is shared for performance reason: reduces the number of event
 * listeners and intervals/timeouts but also limit access to <video>
 * properties and gap calculations.
 *
 * The sampling is manual instead of based on "timeupdate" to reduce the
 * number of events.
 * @param {HTMLMediaElement} video
 * @param {Object} options
 * @returns {Observable}
 */
function createTimingsSampler(video, _ref) {
  var withMediaSource = _ref.withMediaSource;

  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(function (obs) {
    var lastTimings = getTimings(video, "init");
    lastTimings.stalled = null;

    /**
     * Emit timings sample.
     * Meant to be used as a callback on various async events.
     * @param {Event} [evt] - The Event which triggered the callback, if one.
     */
    function emitSample(evt) {
      var timingEventType = evt && evt.type || "timeupdate";
      var currentTimings = getTimings(video, timingEventType);
      currentTimings.stalled = getStalledStatus(lastTimings, currentTimings, withMediaSource);
      lastTimings = currentTimings;
      obs.next(lastTimings);
    }

    var interval = withMediaSource ? SAMPLING_INTERVAL_MEDIASOURCE : SAMPLING_INTERVAL_NO_MEDIASOURCE;

    var intervalID = setInterval(emitSample, interval);
    SCANNED_VIDEO_EVENTS.forEach(function (eventName) {
      return video.addEventListener(eventName, emitSample);
    });

    obs.next(lastTimings);

    return function () {
      clearInterval(intervalID);
      SCANNED_VIDEO_EVENTS.forEach(function (eventName) {
        return video.removeEventListener(eventName, emitSample);
      });
    };
  }).multicast(function () {
    return new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"]({});
  }).refCount();
}

/* harmony default export */ __webpack_exports__["a"] = (createTimingsSampler);

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_rx_onEvent_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_eventemitter__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_ranges_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__compat_events_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__net__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__manifest_timings_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__errors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__stream_index_js__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__eme__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__constants_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__clock_js__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__private_js__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__infer_player_state_js__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__option_parsers_js__ = __webpack_require__(101);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This file defines the public player API
 */




























var DEFAULT_UNMUTED_VOLUME = __WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].DEFAULT_UNMUTED_VOLUME;

/**
 * @param {Observable} stream
 * @param {string} type
 * @returns {Observable}
 */

function filterStreamByType(stream, type) {
  return stream.filter(function (o) {
    return o.type == type;
  }).map(function (o) {
    return o.value;
  });
}

/**
 * @class Player
 * @extends EventEmitter
 */

var Player = function (_EventEmitter) {
  _inherits(Player, _EventEmitter);

  _createClass(Player, null, [{
    key: "ErrorTypes",

    /**
     * @returns {Object}
     */
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_13__errors__["a" /* ErrorTypes */];
    }

    /**
     * @returns {Object}
     */

  }, {
    key: "ErrorCodes",
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_13__errors__["b" /* ErrorCodes */];
    }

    /**
     * Note: as the private state from this class can be pretty heavy, every
     * private properties should be initialized here for better visibility.
     * @param {Object} options
     * @param {HTMLVideoElement_} options.videoElement
     */

  }]);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    var _parseConstructorOpti = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_20__option_parsers_js__["a" /* parseConstructorOptions */])(options),
        defaultAudioTrack = _parseConstructorOpti.defaultAudioTrack,
        defaultTextTrack = _parseConstructorOpti.defaultTextTrack,
        initialAudioBitrate = _parseConstructorOpti.initialAudioBitrate,
        initialVideoBitrate = _parseConstructorOpti.initialVideoBitrate,
        limitVideoWidth = _parseConstructorOpti.limitVideoWidth,
        maxAudioBitrate = _parseConstructorOpti.maxAudioBitrate,
        maxBufferAhead = _parseConstructorOpti.maxBufferAhead,
        maxBufferBehind = _parseConstructorOpti.maxBufferBehind,
        maxVideoBitrate = _parseConstructorOpti.maxVideoBitrate,
        throttleWhenHidden = _parseConstructorOpti.throttleWhenHidden,
        transport = _parseConstructorOpti.transport,
        transportOptions = _parseConstructorOpti.transportOptions,
        videoElement = _parseConstructorOpti.videoElement,
        wantedBufferAhead = _parseConstructorOpti.wantedBufferAhead;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_assert__["a" /* default */])(videoElement instanceof __WEBPACK_IMPORTED_MODULE_9__compat__["a" /* HTMLVideoElement_ */], "videoElement needs to be an HTMLVideoElement");

    // Workaround to support Firefox autoplay on FF 42.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1194624
    videoElement.preload = "auto";

    _this.version = /*PLAYER_VERSION*/"3.0.0-rc4";
    _this.log = __WEBPACK_IMPORTED_MODULE_4__utils_log__["a" /* default */];
    _this.state = undefined;
    _this.defaultTransport = transport;
    _this.defaultTransportOptions = transportOptions;
    _this.videoElement = videoElement;

    _this._priv = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__private_js__["a" /* default */])(_this);

    _this._priv.destroy$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    _this._priv.fullScreenSubscription = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__compat_events_js__["a" /* fullscreenChange */])(videoElement).takeUntil(_this._priv.destroy$).subscribe(function () {
      return _this.trigger("fullscreenChange", _this.isFullscreen());
    });

    // TODO Use regular Stream observable for that
    _this._priv.errorStream$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]() // Emits warnings
    .takeUntil(_this._priv.destroy$);

    // emit true when the player plays, false when it pauses
    _this._priv.playing$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]();

    // last speed set by the user
    _this._priv.speed$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](videoElement.playbackRate);

    // clean ressources from loaded content
    _this._priv.unsubscribeLoadedVideo$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]().takeUntil(_this._priv.destroy$);

    _this._priv.wantedBufferAhead$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](wantedBufferAhead);
    _this._priv.maxBufferAhead$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](maxBufferAhead);
    _this._priv.maxBufferBehind$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](maxBufferBehind);

    // keep track of the last set audio/text track
    _this._priv.lastAudioTrack = defaultAudioTrack;
    _this._priv.lastTextTrack = defaultTextTrack;

    // keep track of the last adaptive options
    _this._priv.lastBitrates = {
      audio: initialAudioBitrate,
      video: initialVideoBitrate
    };
    _this._priv.initialMaxAutoBitrates = {
      audio: maxAudioBitrate,
      video: maxVideoBitrate
    };
    _this._priv.manualBitrates = {
      audio: -1,
      video: -1
    };

    // adaptive initial private state
    _this._priv.throttleWhenHidden = throttleWhenHidden;
    _this._priv.limitVideoWidth = limitVideoWidth;

    _this._priv.mutedMemory = DEFAULT_UNMUTED_VOLUME;

    // private state set later
    ["abrManager", "currentAdaptations", "currentImagePlaylist", "currentRepresentations", "fatalError", "initialAudioTrack", "initialTextTrack", "languageManager", "manifest", "recordedEvents"].forEach(function (key) {
      _this._priv[key] = undefined;
    });

    // populate initial values for content-related state
    _this._priv.resetContentState();

    _this._priv.setPlayerState(__WEBPACK_IMPORTED_MODULE_16__constants_js__["a" /* PLAYER_STATES */].STOPPED);
    return _this;
  }

  /**
   * Stop the player.
   */


  Player.prototype.stop = function stop() {
    if (this.state !== __WEBPACK_IMPORTED_MODULE_16__constants_js__["a" /* PLAYER_STATES */].STOPPED) {
      this._priv.resetContentState();
      this._priv.unsubscribeLoadedVideo$.next();
      this._priv.setPlayerState(__WEBPACK_IMPORTED_MODULE_16__constants_js__["a" /* PLAYER_STATES */].STOPPED);
    }
  };

  /**
   * Free the resources used by the player.
   */


  Player.prototype.dispose = function dispose() {
    // free resources linked to the loaded content
    this.stop();

    // free resources used for EME management
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__eme__["a" /* dispose */])();

    var _priv = this._priv;

    // free resources linked to the Player instance

    _priv.destroy$.next();
    _priv.destroy$.complete();

    // clean up BehaviorSubjects
    _priv.playing$.complete();
    _priv.speed$.complete();
    _priv.wantedBufferAhead$.complete();
    _priv.maxBufferAhead$.complete();
    _priv.maxBufferBehind$.complete();

    // clean up potentially heavy objects
    _priv.playing$ = null;
    _priv.speed$ = null;
    _priv.wantedBufferAhead$ = null;
    _priv.maxBufferAhead$ = null;
    _priv.maxBufferBehind$ = null;
    _priv.unsubscribeLoadedVideo$ = null;
    _priv.fullScreenSubscription = null;
    _priv.errorStream$ = null;
    _priv.lastBitrates = null;
    _priv.manualBitrates = null;
    _priv.initialMaxAutoBitrates = null;
    this.videoElement = null;
  };

  /**
   * Load a new video.
   * @param {Object} options
   * @returns {Observable}
   * @throws Error - throws if no url is given.
   * @throws Error - throws if no transport is given and no default transport
   * has been set.
   * @throws Error - throws if the asked transport does not exist
   */


  Player.prototype.loadVideo = function loadVideo() {
    var _this2 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_20__option_parsers_js__["b" /* parseLoadVideoOptions */])(options, this);
    __WEBPACK_IMPORTED_MODULE_4__utils_log__["a" /* default */].info("loadvideo", options);

    var _options = options,
        autoPlay = _options.autoPlay,
        defaultAudioTrack = _options.defaultAudioTrack,
        defaultTextTrack = _options.defaultTextTrack,
        hideNativeSubtitle = _options.hideNativeSubtitle,
        keySystems = _options.keySystems,
        startAt = _options.startAt,
        supplementaryImageTracks = _options.supplementaryImageTracks,
        supplementaryTextTracks = _options.supplementaryTextTracks,
        transport = _options.transport,
        transportOptions = _options.transportOptions,
        url = _options.url;


    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_assert__["a" /* default */])(url, "you have to give an url");
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_assert__["a" /* default */])(transport, "you have to set the transport type");

    var Transport = __WEBPACK_IMPORTED_MODULE_11__net__["a" /* default */][transport];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_assert__["a" /* default */])(Transport, "transport \"" + transport + "\" not supported");
    var transportObj = Transport(transportOptions);

    this.stop();

    this._priv.initialAudioTrack = defaultAudioTrack;
    this._priv.initialTextTrack = defaultTextTrack;

    this._priv.playing$.next(autoPlay);

    var videoElement = this.videoElement;
    var _priv2 = this._priv,
        errorStream = _priv2.errorStream$,
        unsubscribeLoadedVideo$ = _priv2.unsubscribeLoadedVideo$,
        wantedBufferAhead$ = _priv2.wantedBufferAhead$,
        maxBufferAhead$ = _priv2.maxBufferAhead$,
        maxBufferBehind$ = _priv2.maxBufferBehind$;


    var withMediaSource = !transport.directFile;
    var timings$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_17__clock_js__["a" /* default */])(videoElement, { withMediaSource: withMediaSource });

    var adaptiveOptions = {
      initialBitrates: this._priv.lastBitrates,
      manualBitrates: this._priv.manualBitrates,
      maxAutoBitrates: this._priv.initialMaxAutoBitrates,
      throttle: this._priv.throttleWhenHidden && {
        video: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__compat_events_js__["b" /* inBackground */])().map(function (isBg) {
          return isBg ? 0 : Infinity;
        }).takeUntil(unsubscribeLoadedVideo$)
      },
      limitWidth: this._priv.limitVideoWidth && {
        video: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__compat_events_js__["c" /* videoWidth */])(videoElement).takeUntil(unsubscribeLoadedVideo$)
      }
    };

    var bufferOptions = {
      wantedBufferAhead$: wantedBufferAhead$,
      maxBufferAhead$: maxBufferAhead$,
      maxBufferBehind$: maxBufferBehind$
    };

    var stream = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__stream_index_js__["a" /* default */])({
      adaptiveOptions: adaptiveOptions,
      autoPlay: autoPlay,
      bufferOptions: bufferOptions,
      errorStream: errorStream,
      hideNativeSubtitle: hideNativeSubtitle,
      keySystems: keySystems,
      speed$: this._priv.speed$,
      startAt: startAt,
      timings$: timings$,
      transport: transportObj,
      url: url,
      videoElement: videoElement,
      withMediaSource: withMediaSource,

      supplementaryImageTracks: supplementaryImageTracks,
      supplementaryTextTracks: supplementaryTextTracks
    }).takeUntil(unsubscribeLoadedVideo$).publish();

    var stalled$ = filterStreamByType(stream, "stalled").startWith(null);

    var loaded = filterStreamByType(stream, "loaded").take(1).share();

    var stateChanges = loaded.mapTo(__WEBPACK_IMPORTED_MODULE_16__constants_js__["a" /* PLAYER_STATES */].LOADED).concat(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(this._priv.playing$, stalled$, __WEBPACK_IMPORTED_MODULE_19__infer_player_state_js__["a" /* default */])).distinctUntilChanged().startWith(__WEBPACK_IMPORTED_MODULE_16__constants_js__["a" /* PLAYER_STATES */].LOADING);

    var playChanges = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_rx_onEvent_js__["a" /* default */])(videoElement, ["play", "pause"]);
    var textTracksChanges = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_rx_onEvent_js__["a" /* default */])(videoElement.textTracks, ["addtrack"]);

    var streamDisposable = void 0;
    unsubscribeLoadedVideo$.take(1).subscribe(function () {
      if (streamDisposable) {
        streamDisposable.unsubscribe();
      }
    });

    var noop = function noop() {};

    playChanges.takeUntil(unsubscribeLoadedVideo$).subscribe(function (x) {
      return _this2._priv.onPlayPauseNext(x);
    }, noop);

    textTracksChanges.takeUntil(unsubscribeLoadedVideo$).subscribe(function (x) {
      return _this2._priv.onNativeTextTrackNext(x);
    }, noop);

    timings$.takeUntil(unsubscribeLoadedVideo$).subscribe(function (x) {
      return _this2._priv.triggerTimeChange(x);
    }, noop);

    stateChanges.takeUntil(unsubscribeLoadedVideo$).subscribe(function (x) {
      return _this2._priv.setPlayerState(x);
    }, noop);

    stream.subscribe(function (x) {
      return _this2._priv.onStreamNext(x);
    }, function (err) {
      return _this2._priv.onStreamError(err);
    }, function () {
      return _this2._priv.onStreamComplete();
    });

    errorStream.takeUntil(unsubscribeLoadedVideo$).subscribe(function (x) {
      return _this2._priv.onErrorStreamNext(x);
    });

    streamDisposable = stream.connect();

    // TODO Return promise here?
    // Not done for now because the unhandled promise rejection warnings can
    // be an annoyance.
    // return new Promise((resolve, reject) => {
    //   const _loaded$ = loaded
    //     .map(() => ({ type: "loaded" }));

    //   const _canceled$ = unsubscribeLoadedVideo$
    //     .map(() => ({ type: "canceled" }));

    //   const _errored$ = stream.ignoreElements()
    //     .catch((error) => ({ type: "error", error }));

    //   Observable.merge(_loaded$, _canceled$, _errored$)
    //     .take(1)
    //     .subscribe((item) => {
    //       switch(item.type) {
    //       case "loaded":
    //         resolve(item);
    //         break;
    //       case "canceled":
    //       case "error":
    //         reject(item);
    //       }
    //     });
    // });
  };

  /**
   * Returns fatal error if one for the current content. null otherwise.
   * @returns {Object|null}
   */


  Player.prototype.getError = function getError() {
    return this._priv.fatalError;
  };

  /**
   * Returns manifest/playlist object.
   * null if the player is STOPPED.
   * @returns {Manifest|null}
   */


  Player.prototype.getManifest = function getManifest() {
    return this._priv.manifest || null;
  };

  /**
   * Returns adaptations (tracks) for every currently playing type
   * (audio/video/text...).
   * @returns {Object|null}
   */


  Player.prototype.getCurrentAdaptations = function getCurrentAdaptations() {
    if (!this._priv.manifest) {
      return null;
    }
    return this._priv.currentAdaptations;
  };

  /**
   * Returns representations (qualities) for every currently playing type
   * (audio/video/text...).
   * @returns {Object|null}
   */


  Player.prototype.getCurrentRepresentations = function getCurrentRepresentations() {
    if (!this._priv.manifest) {
      return null;
    }
    return this._priv.currentRepresentations;
  };

  /**
   * Returns the video DOM element used by the player.
   * You should not its HTML5 API directly and use the player's method instead,
   * to ensure a well-behaved player.
   * @returns {HMTLMediaElement}
   */


  Player.prototype.getVideoElement = function getVideoElement() {
    return this.videoElement;
  };

  /**
   * Returns the text-track element used by the player to inject subtitles.
   * @returns {TextTrack}
   */


  Player.prototype.getNativeTextTrack = function getNativeTextTrack() {
    var textTracks = this.videoElement.textTracks;
    if (textTracks.length > 0) {
      return this.videoElement.textTracks[0];
    } else {
      return null;
    }
  };

  /**
   * Returns the player's current state.
   * @returns {string}
   */


  Player.prototype.getPlayerState = function getPlayerState() {
    return this.state;
  };

  /**
   * Returns true if:
   *   - a content is loaded
   *   - the content is a live content
   * @returns {Boolean}
   */


  Player.prototype.isLive = function isLive() {
    if (!this._priv.manifest) {
      return false;
    }
    return this._priv.manifest.isLive;
  };

  /**
   * Returns the url of the content's manifest
   * @returns {string"undefined}
   */


  Player.prototype.getUrl = function getUrl() {
    if (!this._priv.manifest) {
      return;
    }
    return this._priv.manifest.getUrl();
  };

  /**
   * Returns the video duration, in seconds.
   * NaN if no video is playing.
   * @returns {Number}
   */


  Player.prototype.getVideoDuration = function getVideoDuration() {
    return this.videoElement.duration;
  };

  /**
   * Returns in seconds the difference between:
   *   - the end of the current contiguous loaded range.
   *   - the current time
   * @returns {Number}
   */


  Player.prototype.getVideoBufferGap = function getVideoBufferGap() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_ranges_js__["a" /* getLeftSizeOfRange */])(this.videoElement.buffered, this.videoElement.currentTime);
  };

  /**
   * Returns in seconds the difference between:
   *   - the end of the current contiguous loaded range.
   *   - the start of the current contiguous loaded range.
   * @returns {Number}
   */


  Player.prototype.getVideoLoadedTime = function getVideoLoadedTime() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_ranges_js__["b" /* getSizeOfRange */])(this.videoElement.buffered, this.videoElement.currentTime);
  };

  /**
   * Returns in seconds the difference between:
   *   - the current time.
   *   - the start of the current contiguous loaded range.
   * @returns {Number}
   */


  Player.prototype.getVideoPlayedTime = function getVideoPlayedTime() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_ranges_js__["c" /* getPlayedSizeOfRange */])(this.videoElement.buffered, this.videoElement.currentTime);
  };

  /**
   * Get the current position, in s, in wall-clock time.
   * That is:
   *   - for live content, get a timestamp, in s, of the current played content.
   *   - for static content, returns the position from beginning in s.
   *
   * If you do not know if you want to use this method or getPosition:
   *   - If what you want is to display the current time to the user, use this
   *     one.
   *   - If what you want is to interact with the player's API or perform other
   *     actions (like statistics) with the real player data, use getPosition.
   *
   * @returns {Number}
   */


  Player.prototype.getWallClockTime = function getWallClockTime() {
    if (!this._priv.manifest) {
      return 0;
    }
    var ct = this.videoElement.currentTime;
    return this.isLive() ? +__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__manifest_timings_js__["a" /* toWallClockTime */])(ct, this._priv.manifest) / 1000 : ct;
  };

  /**
   * Get the current position, in seconds, of the video element.
   *
   * If you do not know if you want to use this method or getWallClockTime:
   *   - If what you want is to display the current time to the user, use
   *     getWallClockTime.
   *   - If what you want is to interact with the player's API or perform other
   *     actions (like statistics) with the real player data, use this one.
   *
   * @returns {Number}
   */


  Player.prototype.getPosition = function getPosition() {
    return this.videoElement.currentTime;
  };

  /**
   * Returns the current speed at which the video plays.
   * @returns {Number}
   */


  Player.prototype.getPlaybackRate = function getPlaybackRate() {
    return this._priv.speed$.getValue();
  };

  /**
   * @returns {Number}
   */


  Player.prototype.getVolume = function getVolume() {
    return this.videoElement.volume;
  };

  /**
   * @returns {Boolean}
   */


  Player.prototype.isFullscreen = function isFullscreen() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__compat__["b" /* isFullscreen */])();
  };

  /**
   * @returns {Array.<Number>}
   */


  Player.prototype.getAvailableVideoBitrates = function getAvailableVideoBitrates() {
    var videoAdaptation = this._priv.currentAdaptations.video;
    if (!videoAdaptation) {
      return [];
    }

    return videoAdaptation.representations.map(function (_ref) {
      var bitrate = _ref.bitrate;
      return bitrate;
    });
  };

  /**
   * @returns {Array.<Number>}
   */


  Player.prototype.getAvailableAudioBitrates = function getAvailableAudioBitrates() {
    var audioAdaptation = this._priv.currentAdaptations.audio;
    if (!audioAdaptation) {
      return [];
    }

    return audioAdaptation.representations.map(function (_ref2) {
      var bitrate = _ref2.bitrate;
      return bitrate;
    });
  };

  /**
   * Returns the manual audio bitrate set. -1 if in AUTO mode.
   * @returns {Number}
   */


  Player.prototype.getManualAudioBitrate = function getManualAudioBitrate() {
    return this._priv.manualBitrates.audio;
  };

  /**
   * Returns the manual video bitrate set. -1 if in AUTO mode.
   * @returns {Number}
   */


  Player.prototype.getManualVideoBitrate = function getManualVideoBitrate() {
    return this._priv.manualBitrates.video;
  };

  /**
   * Returns currently considered bitrate for video segments.
   * @returns {Number|undefined}
   */


  Player.prototype.getVideoBitrate = function getVideoBitrate() {
    return this._priv.recordedEvents.videoBitrate;
  };

  /**
   * Returns currently considered bitrate for audio segments.
   * @returns {Number|undefined}
   */


  Player.prototype.getAudioBitrate = function getAudioBitrate() {
    return this._priv.recordedEvents.audioBitrate;
  };

  /**
   * Returns max wanted video bitrate currently set.
   * @returns {Number}
   */


  Player.prototype.getMaxVideoBitrate = function getMaxVideoBitrate() {
    if (!this._priv.abrManager) {
      return this._priv.initialMaxAutoBitrates.video;
    }
    return this._priv.abrManager.getMaxAutoBitrate("video");
  };

  /**
   * Returns max wanted audio bitrate currently set.
   * @returns {Number}
   */


  Player.prototype.getMaxAudioBitrate = function getMaxAudioBitrate() {
    if (!this._priv.abrManager) {
      return this._priv.initialMaxAutoBitrates.audio;
    }
    return this._priv.abrManager.getMaxAutoBitrate("audio");
  };

  /**
   * Play/Resume the current video.
   */


  Player.prototype.play = function play() {
    this.videoElement.play();
  };

  /**
   * Pause playback of the video.
   */


  Player.prototype.pause = function pause() {
    this.videoElement.pause();
  };

  /**
   * Update the playback rate of the video.
   * @param {Number} rate
   */


  Player.prototype.setPlaybackRate = function setPlaybackRate(rate) {
    this._priv.speed$.next(rate);
  };

  /**
   * Seek to a given absolute position.
   * @param {Number|Object} time
   * @returns {Number} - The time the player has seek to
   */


  Player.prototype.seekTo = function seekTo(time) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_assert__["a" /* default */])(this._priv.manifest, "player: no manifest loaded");

    var positionWanted = void 0;
    var type = typeof time === "undefined" ? "undefined" : _typeof(time);

    if (type === "number") {
      positionWanted = time;
    } else if (type === "object") {
      var currentTs = this.videoElement.currentTime;
      if (time.relative != null) {
        positionWanted = currentTs + time.relative;
      } else if (time.position != null) {
        positionWanted = time.position;
      } else if (time.wallClockTime) {
        positionWanted = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__manifest_timings_js__["b" /* fromWallClockTime */])(time.wallClockTime * 1000, this._priv.manifest);
      } else {
        throw new Error("invalid time object. You must set one of the " + "following properties: \"relative\", \"position\" or " + "\"wallClockTime\"");
      }
    }

    if (positionWanted === undefined) {
      throw new Error("invalid time given");
    }

    this.videoElement.currentTime = positionWanted;
    return positionWanted;
  };

  Player.prototype.exitFullscreen = function exitFullscreen() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__compat__["c" /* exitFullscreen */])();
  };

  /**
   * Set/exit fullScreen.
   * @param {Boolean} [goFull=true] - if false, exit full screen.
   */


  Player.prototype.setFullscreen = function setFullscreen() {
    var goFull = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (goFull) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__compat__["d" /* requestFullscreen */])(this.videoElement);
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__compat__["c" /* exitFullscreen */])();
    }
  };

  /**
   * Set the player's volume. From 0 (muted volume) to 1 (maximum volume).
   * @param {Number}
   */


  Player.prototype.setVolume = function setVolume(volume) {
    if (volume !== this.videoElement.volume) {
      this.videoElement.volume = volume;
      this.trigger("volumeChange", volume);
    }
  };

  /**
   * Returns true if the volume is set to 0. false otherwise.
   * @returns {Boolean}
   */


  Player.prototype.isMute = function isMute() {
    return !this.getVolume();
  };

  /**
   * Set the volume to 0 and save current one for when unmuted.
   */


  Player.prototype.mute = function mute() {
    this._priv.mutedMemory = this.getVolume();
    this.setVolume(0);
  };

  /**
   * Set the volume back to when it was when mute was last called.
   * If the volume was set to 0, set a default volume instead (see config).
   */


  Player.prototype.unMute = function unMute() {
    var vol = this.getVolume();
    if (vol === 0) {
      this.setVolume(this._priv.mutedMemory || DEFAULT_UNMUTED_VOLUME);
    }
  };

  /**
   * Force the video bitrate to a given value. Act as a ceil.
   * -1 to set it on AUTO Mode
   * @param {Number} btr
   */


  Player.prototype.setVideoBitrate = function setVideoBitrate(btr) {
    this._priv.manualBitrates.video = btr;
    if (this._priv.abrManager) {
      this._priv.abrManager.setManualBitrate("video", btr);
    }
  };

  /**
   * Force the audio bitrate to a given value. Act as a ceil.
   * -1 to set it on AUTO Mode
   * @param {Number} btr
   */


  Player.prototype.setAudioBitrate = function setAudioBitrate(btr) {
    this._priv.manualBitrates.audio = btr;
    if (this._priv.abrManager) {
      this._priv.abrManager.setManualBitrate("audio", btr);
    }
  };

  /**
   * Update the maximum video bitrate the user can switch to.
   * @param {Number} btr
   */


  Player.prototype.setMaxVideoBitrate = function setMaxVideoBitrate(btr) {
    // set it for the next content loaded
    this._priv.initialMaxAutoBitrates.video = btr;

    // set it for the current if one is loaded
    if (this._priv.abrManager) {
      this._priv.abrManager.setMaxAutoBitrate("video", btr);
    }
  };

  /**
   * Update the maximum video bitrate the user can switch to.
   * @param {Number} btr
   */


  Player.prototype.setMaxAudioBitrate = function setMaxAudioBitrate(btr) {
    // set it for the next content loaded
    this._priv.initialMaxAutoBitrates.audio = btr;

    // set it for the current if one is loaded
    if (this._priv.abrManager) {
      this._priv.abrManager.setMaxAutoBitrate("audio", btr);
    }
  };

  /**
   * Set the max buffer size for the buffer behind the current position.
   * Every buffer data before will be removed.
   * @param {Number} depthInSeconds
   */


  Player.prototype.setMaxBufferBehind = function setMaxBufferBehind(depthInSeconds) {
    this._priv.maxBufferBehind$.next(depthInSeconds);
  };

  /**
   * Set the max buffer size for the buffer behind the current position.
   * Every buffer data before will be removed.
   * @param {Number} depthInSeconds
   */


  Player.prototype.setMaxBufferAhead = function setMaxBufferAhead(depthInSeconds) {
    this._priv.maxBufferAhead$.next(depthInSeconds);
  };

  /**
   * Set the max buffer size for the buffer ahead of the current position.
   * The player will stop downloading chunks when this size is reached.
   * @param {Number} sizeInSeconds
   */


  Player.prototype.setWantedBufferAhead = function setWantedBufferAhead(sizeInSeconds) {
    this._priv.wantedBufferAhead$.next(sizeInSeconds);
  };

  /**
   * Returns the max buffer size for the buffer behind the current position.
   * @returns {Number}
   */


  Player.prototype.getMaxBufferBehind = function getMaxBufferBehind() {
    return this._priv.maxBufferBehind$.getValue();
  };

  /**
   * Returns the max buffer size for the buffer behind the current position.
   * @returns {Number}
   */


  Player.prototype.getMaxBufferAhead = function getMaxBufferAhead() {
    return this._priv.maxBufferAhead$.getValue();
  };

  /**
   * Returns the max buffer size for the buffer ahead of the current position.
   * @returns {Number}
   */


  Player.prototype.getWantedBufferAhead = function getWantedBufferAhead() {
    return this._priv.wantedBufferAhead$.getValue();
  };

  /**
   * Returns type of current keysystem (e.g. playready, widevine) if the content
   * is encrypted. null otherwise.
   * @returns {string|null}
   */


  Player.prototype.getCurrentKeySystem = function getCurrentKeySystem() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__eme__["b" /* getCurrentKeySystem */])();
  };

  /**
   * @returns {Array.<Object>|null}
   */


  Player.prototype.getAvailableAudioTracks = function getAvailableAudioTracks() {
    if (!this._priv.languageManager) {
      return null;
    }
    return this._priv.languageManager.getAvailableAudioTracks();
  };

  /**
   * @returns {Array.<Object>|null}
   */


  Player.prototype.getAvailableTextTracks = function getAvailableTextTracks() {
    if (!this._priv.languageManager) {
      return null;
    }
    return this._priv.languageManager.getAvailableTextTracks();
  };

  /**
   * Returns last chosen language.
   * @returns {string}
   */


  Player.prototype.getAudioTrack = function getAudioTrack() {
    if (!this._priv.languageManager) {
      return undefined;
    }
    return this._priv.languageManager.getCurrentAudioTrack();
  };

  /**
   * Returns last chosen subtitle.
   * @returns {string}
   */


  Player.prototype.getTextTrack = function getTextTrack() {
    if (!this._priv.languageManager) {
      return undefined;
    }
    return this._priv.languageManager.getCurrentTextTrack();
  };

  /**
   * Update the audio language.
   * @param {string} audioId
   */


  Player.prototype.setAudioTrack = function setAudioTrack(audioId) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_assert__["a" /* default */])(this._priv.languageManager, "No compatible content launched.");
    try {
      this._priv.languageManager.setAudioTrack(audioId);
    } catch (e) {
      throw new Error("player: unknown audio track");
    }
  };

  /**
   * Update the audio language.
   * @param {string} sub
   */


  Player.prototype.setTextTrack = function setTextTrack(textId) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_assert__["a" /* default */])(this._priv.languageManager, "No compatible content launched.");
    try {
      this._priv.languageManager.setTextTrack(textId);
    } catch (e) {
      throw new Error("player: unknown text track");
    }
  };

  Player.prototype.disableTextTrack = function disableTextTrack() {
    if (!this._priv.languageManager) {
      return undefined;
    }
    return this._priv.languageManager.disableTextTrack();
  };

  Player.prototype.getImageTrackData = function getImageTrackData() {
    if (!this._priv.manifest) {
      return null;
    }
    return this._priv.currentImagePlaylist;
  };

  Player.prototype.getMinimumPosition = function getMinimumPosition() {
    if (!this._priv.manifest) {
      return null;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__manifest_timings_js__["c" /* getMinimumBufferPosition */])(this._priv.manifest);
  };

  Player.prototype.getMaximumPosition = function getMaximumPosition() {
    if (!this._priv.manifest) {
      return null;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__manifest_timings_js__["d" /* getMaximumBufferPosition */])(this._priv.manifest);
  };

  return Player;
}(__WEBPACK_IMPORTED_MODULE_6__utils_eventemitter__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = inferPlayerState;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(35);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Returns current playback state for the current content.
 * /!\ Only pertinent for a content that is currently loaded and playing
 * (i.e. not loading, ended or stopped).
 * @param {Boolean} isPlaying - Whether the player is currently playing
 * (not paused).
 * @param {Boolean} stalled - Whether the player is currently "stalled".
 *
 * @returns {string}
 */
function inferPlayerState(isPlaying, stalled) {
  if (stalled) {
    return stalled.state == "seeking" ? __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* PLAYER_STATES */].SEEKING : __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* PLAYER_STATES */].BUFFERING;
  }

  if (isPlaying) {
    return __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* PLAYER_STATES */].PLAYING;
  }

  return __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* PLAYER_STATES */].PAUSED;
}

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_array_find__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Try to find the given track config in the adaptations given:
 *
 * If no track config return null.
 * If no adaptation are found return undefined.
 *
 * @param {Array.<Object>} adaptations
 * @param {Object} trackConfig
 * @param {string} trackConfig.language
 * @param {string} trackConfig.normalized
 * @param {string} trackConfig.closedCaption
 * @return {null|undefined|Object}
 */
var findTextAdaptation = function findTextAdaptation(adaptations, trackConfig) {
  if (!trackConfig) {
    return null;
  }

  if (!adaptations.length) {
    return void 0;
  }

  var foundTextTrack = __WEBPACK_IMPORTED_MODULE_0_array_find___default()(adaptations, function (textAdaptation) {
    return trackConfig.normalized === textAdaptation.normalizedLanguage && trackConfig.closedCaption === textAdaptation.isClosedCaption;
  });

  return foundTextTrack;
};

/**
 * Try to find the given track config in the adaptations given:
 *
 * If no track config return null.
 * If no adaptation are found return undefined.
 *
 * @param {Array.<Object>} adaptations
 * @param {Object} trackConfig
 * @param {string} trackConfig.language
 * @param {string} trackConfig.normalized
 * @param {string} trackConfig.audioDescription
 * @return {null|undefined|Object}
 */
var findAudioAdaptation = function findAudioAdaptation(adaptations, trackConfig) {
  if (!adaptations.length || !trackConfig) {
    return undefined;
  }

  var foundAudioTrack = __WEBPACK_IMPORTED_MODULE_0_array_find___default()(adaptations, function (audioAdaptation) {
    return trackConfig.normalized === audioAdaptation.normalizedLanguage && trackConfig.audioDescription === audioAdaptation.isAudioDescription;
  });
  return foundAudioTrack;
};

/**
 * # LanguageManager
 *
 * ## Overview
 *
 * Takes in the text and audio adaptations parsed from a manifest and provide
 * various methods and properties to set/get the right adaption based on a
 * language configuration.
 */

var LanguageManager = function () {
  /**
   * Set the adaptations from where to choose from and find the default
   * audio/text track.
   *
   * @constructor
   *
   * @param {Object} adaptations
   * @param {Array.<Adaptation>} adaptations.audio - The different audio
   * adaptations available right now.
   * Can be updated through the updateAdaptations method.
   * @param {Array.<Adaptation>} adaptations.text - The different text
   * adaptations available right now.
   * Can be updated through the updateAdaptations method.
   *
   * @param {Object} adaptations$
   * @param {Subject} adaptations$.audio$ - Subject through which the chosen
   * audio adaptation will be emitted.
   * Will emit the first choice before the constructor finish.
   * @param {Subject} adaptations$.text$ - Subject through which the chosen
   * text adaptation will be emitted
   * Will emit the first choice before the constructor finish.
   *
   * @param {Object} [options={}]
   * @param {Object} [options.defaultTextTrack] - The language and closedCaption
   * status of the text track chosen by default. If not set, the first
   * adaptation will be taken instead.
   * @param {Object} [options.defaultAudioTrack] - The language and
   * audiodescription status of the audio track chosen by default.
   * If not set, the first adaptation will be taken instead.
   */
  function LanguageManager(_ref, _ref2) {
    var text = _ref.text,
        audio = _ref.audio;
    var text$ = _ref2.text$,
        audio$ = _ref2.audio$;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, LanguageManager);

    var defaultAudioTrack = options.defaultAudioTrack,
        defaultTextTrack = options.defaultTextTrack;


    var textAdaptations = text || [];
    var audioAdaptations = audio || [];

    // set class context
    this._currentAudioAdaptation = null;
    this._currentTextAdaptation = null;
    this._textAdaptations = textAdaptations;
    this._audioAdaptations = audioAdaptations;
    this._text$ = text$;
    this._audio$ = audio$;

    if (audio$) {
      // emit initial adaptations
      var initialAudioAdaptation = defaultAudioTrack ? findAudioAdaptation(audioAdaptations, defaultAudioTrack) || audioAdaptations[0] : audioAdaptations[0];
      this._currentAudioAdaptation = initialAudioAdaptation;

      audio$.next(this._currentAudioAdaptation);
    }

    if (text$) {
      var initialTextAdaptation = defaultTextTrack ? findTextAdaptation(textAdaptations, defaultTextTrack) || null : null;
      this._currentTextAdaptation = initialTextAdaptation;

      text$.next(this._currentTextAdaptation);
    }
  }

  LanguageManager.prototype.updateAdaptations = function updateAdaptations(_ref3) {
    var audio = _ref3.audio,
        text = _ref3.text;

    this._audioAdaptations = audio || [];
    this._textAdaptations = text || [];

    var currentAudioAdaptation = this._currentAudioAdaptation;
    var currentAudioId = currentAudioAdaptation && currentAudioAdaptation.id;

    var audioAdaptationFound = void 0;
    if (currentAudioId != null) {
      audioAdaptationFound = __WEBPACK_IMPORTED_MODULE_0_array_find___default()(audio, function (_ref4) {
        var id = _ref4.id;
        return id === currentAudioId;
      });
    }

    if (!audioAdaptationFound) {
      var foundTrack = findAudioAdaptation(audio, {
        language: currentAudioAdaptation.language,
        audioDescription: !!currentAudioAdaptation.isAudioDescription
      });

      this._currentAudioAdaptation = foundTrack || audio[0];
      this._audio$.next(this._currentAudioAdaptation);
    }

    var currentTextAdaptation = this._currentTextAdaptation;
    var currentTextId = currentTextAdaptation && currentTextAdaptation.id;

    var textAdaptationFound = void 0;
    if (currentTextId != null) {
      textAdaptationFound = __WEBPACK_IMPORTED_MODULE_0_array_find___default()(text, function (_ref5) {
        var id = _ref5.id;
        return id === currentTextId;
      });
    }

    if (currentTextId !== null && !textAdaptationFound) {
      var _foundTrack = findTextAdaptation(text, {
        language: currentTextAdaptation.language,
        closedCaption: !!currentTextAdaptation.isClosedCaption
      });

      this._currentTextAdaptation = _foundTrack || text[0];
      this._text$.next(this._currentTextAdaptation);
    }
  };

  /**
   * @param {string|Number} wantedId - adaptation id of the wanted track
   * @throws Error - Throws if the given id is not found in any audio adaptation
   */


  LanguageManager.prototype.setAudioTrack = function setAudioTrack(wantedId) {
    var foundTrack = __WEBPACK_IMPORTED_MODULE_0_array_find___default()(this._audioAdaptations, function (_ref6) {
      var id = _ref6.id;
      return id === wantedId;
    });

    if (foundTrack === undefined) {
      throw new Error("Audio Track not found.");
    }

    this._currentAudioAdaptation = foundTrack;
    this._audio$.next(this._currentAudioAdaptation);
  };

  /**
   * @param {string|Number} wantedId - adaptation id of the wanted track
   * @throws Error - Throws if the given id is not found in any text adaptation
   */


  LanguageManager.prototype.setTextTrack = function setTextTrack(wantedId) {
    var foundTrack = __WEBPACK_IMPORTED_MODULE_0_array_find___default()(this._textAdaptations, function (_ref7) {
      var id = _ref7.id;
      return id === wantedId;
    });

    if (foundTrack === undefined) {
      throw new Error("Text Track not found.");
    }

    this._currentTextAdaptation = foundTrack;
    this._text$.next(this._currentTextAdaptation);
  };

  LanguageManager.prototype.disableTextTrack = function disableTextTrack() {
    this._currentTextAdaptation = null;
    this._text$.next(this._currentTextAdaptation);
  };

  LanguageManager.prototype.getCurrentAudioTrack = function getCurrentAudioTrack() {
    var adaptation = this._currentAudioAdaptation;
    if (!adaptation) {
      return null;
    }
    return {
      language: adaptation.language,
      normalized: adaptation.normalizedLanguage,
      audioDescription: adaptation.isAudioDescription,
      id: adaptation.id
    };
  };

  LanguageManager.prototype.getCurrentTextTrack = function getCurrentTextTrack() {
    var adaptation = this._currentTextAdaptation;
    if (!adaptation) {
      return null;
    }
    return {
      language: adaptation.language,
      normalized: adaptation.normalizedLanguage,
      closedCaption: adaptation.isClosedCaption,
      id: adaptation.id
    };
  };

  LanguageManager.prototype.getAvailableAudioTracks = function getAvailableAudioTracks() {
    var currentTrack = this._currentAudioAdaptation;
    var currentId = currentTrack && currentTrack.id;
    return this._audioAdaptations.map(function (adaptation) {
      return {
        language: adaptation.language,
        normalized: adaptation.normalizedLanguage,
        audioDescription: adaptation.isAudioDescription,
        id: adaptation.id,
        active: currentId == null ? false : currentId === adaptation.id
      };
    });
  };

  LanguageManager.prototype.getAvailableTextTracks = function getAvailableTextTracks() {
    var currentTrack = this._currentTextAdaptation;
    var currentId = currentTrack && currentTrack.id;
    return this._textAdaptations.map(function (adaptation) {
      return {
        language: adaptation.language,
        normalized: adaptation.normalizedLanguage,
        closedCaption: adaptation.isClosedCaption,
        id: adaptation.id,
        active: currentId == null ? false : currentId === adaptation.id
      };
    });
  };

  return LanguageManager;
}();

/* harmony default export */ __webpack_exports__["a"] = (LanguageManager);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseConstructorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parseLoadVideoOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_takeFirstDefined_js__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_languages__ = __webpack_require__(30);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






var DEFAULT_AUTO_PLAY = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_AUTO_PLAY,
    DEFAULT_SHOW_SUBTITLE = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_SHOW_SUBTITLE,
    DEFAULT_AUDIO_TRACK = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_AUDIO_TRACK,
    DEFAULT_TEXT_TRACK = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_TEXT_TRACK,
    DEFAULT_WANTED_BUFFER_AHEAD = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_WANTED_BUFFER_AHEAD,
    DEFAULT_MAX_BUFFER_AHEAD = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_MAX_BUFFER_AHEAD,
    DEFAULT_MAX_BUFFER_BEHIND = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_MAX_BUFFER_BEHIND,
    DEFAULT_INITIAL_BITRATES = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_INITIAL_BITRATES,
    DEFAULT_MAX_BITRATES = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_MAX_BITRATES,
    DEFAULT_THROTTLE_WHEN_HIDDEN = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_THROTTLE_WHEN_HIDDEN,
    DEFAULT_LIMIT_VIDEO_WIDTH = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_LIMIT_VIDEO_WIDTH;


var def = __WEBPACK_IMPORTED_MODULE_1__utils_takeFirstDefined_js__["a" /* default */];

/**
 * Parse options given to the API constructor and set default options as found
 * in the config.
 *
 * Do not mutate anything, only cross the given options and sane default options
 * (most coming from the config).
 * @param {Object} [options={}]
 * @returns {Object}
 */
function parseConstructorOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var parsed = {
    transport: options.transport,
    transportOptions: def(options.transportOptions, {}),
    maxBufferAhead: def(options.maxBufferAhead, DEFAULT_MAX_BUFFER_AHEAD),
    maxBufferBehind: def(options.maxBufferBehind, DEFAULT_MAX_BUFFER_BEHIND),
    limitVideoWidth: def(options.limitVideoWidth, DEFAULT_LIMIT_VIDEO_WIDTH),

    defaultAudioTrack: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_languages__["b" /* normalizeAudioTrack */])(def(options.defaultAudioTrack, DEFAULT_AUDIO_TRACK)),

    defaultTextTrack: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_languages__["c" /* normalizeTextTrack */])(def(options.defaultTextTrack, DEFAULT_TEXT_TRACK)),

    wantedBufferAhead: def(options.wantedBufferAhead, DEFAULT_WANTED_BUFFER_AHEAD),

    throttleWhenHidden: def(options.throttleWhenHidden, DEFAULT_THROTTLE_WHEN_HIDDEN),

    videoElement: options.videoElement ? options.videoElement : document.createElement("video")
  };

  var defaultInitialBitrates = DEFAULT_INITIAL_BITRATES || {};
  var defaultMaxBitrates = DEFAULT_MAX_BITRATES || {};
  parsed.initialAudioBitrate = def(options.initialAudioBitrate, defaultInitialBitrates.audio, defaultInitialBitrates.other);
  parsed.initialVideoBitrate = def(options.initialVideoBitrate, defaultInitialBitrates.video, defaultInitialBitrates.other);

  parsed.maxAudioBitrate = def(options.maxAudioBitrate, defaultMaxBitrates.audio, defaultMaxBitrates.other);
  parsed.maxVideoBitrate = def(options.maxVideoBitrate, defaultMaxBitrates.video, defaultMaxBitrates.other);
  return parsed;
}

/**
 * Parse options given to loadVideo and set default options as found
 * in the config.
 *
 * Do not mutate anything, only cross the given options and sane default options
 * (most coming from the config).
 * @param {Object} [options={}]
 * @param {Object} ctx - The player context, needed for some default values.
 * @returns {Object}
 */
function parseLoadVideoOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ctx = arguments[1];
  var defaultTransport = ctx.defaultTransport,
      defaultTransportOptions = ctx.defaultTransportOptions,
      _priv = ctx._priv;
  var lastTextTrack = _priv.lastTextTrack,
      lastAudioTrack = _priv.lastAudioTrack;


  var parsed = {
    url: options.url,
    transport: def(options.transport, defaultTransport),
    autoPlay: def(options.autoPlay, DEFAULT_AUTO_PLAY),
    keySystems: def(options.keySystems, []),
    transportOptions: def(options.transportOptions, defaultTransportOptions),
    hideNativeSubtitle: def(options.hideNativeSubtitle, !DEFAULT_SHOW_SUBTITLE),
    supplementaryTextTracks: def(options.supplementaryTextTracks, []),
    supplementaryImageTracks: def(options.supplementaryImageTracks, []),

    defaultAudioTrack: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_languages__["b" /* normalizeAudioTrack */])(def(options.defaultAudioTrack, lastAudioTrack)),

    defaultTextTrack: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_languages__["c" /* normalizeTextTrack */])(def(options.defaultTextTrack, lastTextTrack))
  };

  if (options.startAt && options.startAt.wallClockTime instanceof Date) {
    parsed.startAt = __WEBPACK_IMPORTED_MODULE_2_object_assign___default()({}, options.startAt, {
      wallClockTime: options.startAt.wallClockTime / 1000
    });
  } else {
    parsed.startAt = options.startAt;
  }

  if (options.directFile) {
    parsed.transport = "directfile";
  }

  return parsed;
}



/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_deep_equal__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_deep_equal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_deep_equal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manifest_timings_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__language_manager_js__ = __webpack_require__(100);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use self file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This file defines the private methods of the API.
 * This is isolated from the rest of the player class for different reasons:
 *
 *   - There is many private methods which "pollutes" the namespace, when a
 *     user wants to experiment the player (e.g. in a console).
 *
 *   - The player keeps a lot of state, which can be subject to change with
 *     future features. Keeping it isolated helps to know which one / convince
 *     users to not rely on them.
 */












/* harmony default export */ __webpack_exports__["a"] = (function (self) {
  return {
    /**
     * Reset all states relative to a playing content.
     */
    resetContentState: function resetContentState() {
      // language management
      self._priv.initialAudioTrack = undefined;
      self._priv.initialTextTrack = undefined;
      self._priv.languageManager = null;

      self._priv.abrManager = null;

      self._priv.manifest = null;
      self._priv.currentRepresentations = {};
      self._priv.currentAdaptations = {};

      self._priv.recordedEvents = {}; // event memory

      self._priv.fatalError = null;
      self._priv.currentImagePlaylist = null;
    },


    /**
     * Store and emit new player state (e.g. text track, videoBitrate...).
     * We check for deep equality to avoid emitting 2 consecutive times the same
     * state.
     * @param {string} type - the type of the updated state (videoBitrate...)
     * @param {*} value - its new value
     */
    recordState: function recordState(type, value) {
      var prev = self._priv.recordedEvents[type];
      if (!__WEBPACK_IMPORTED_MODULE_0_deep_equal___default()(prev, value)) {
        self._priv.recordedEvents[type] = value;
        self.trigger(type + "Change", value);
      }
    },


    /**
     * Called each time the Stream Observable emits.
     * @param {Object} streamInfos - payload emitted
     */
    onStreamNext: function onStreamNext(streamInfos) {
      var type = streamInfos.type,
          value = streamInfos.value;


      switch (type) {
        case "representationChange":
          self._priv.onRepresentationChange(value);
          break;
        case "manifestUpdate":
          self._priv.onManifestUpdate(value);
          break;
        case "adaptationChange":
          self._priv.onAdaptationChange(value);
          break;
        case "bitrateEstimationChange":
          self._priv.onBitrateEstimationChange(value);
          break;
        case "manifestChange":
          self._priv.onManifestChange(value);
          break;
        case "pipeline":
          var bufferType = value.bufferType,
              parsed = value.parsed;

          if (bufferType === "image") {
            var _value = parsed.segmentData;

            // TODO merge multiple data from the same track together
            self._priv.currentImagePlaylist = _value;
            self.trigger("imageTrackUpdate", {
              data: self._priv.currentImagePlaylist
            });
          }
      }
    },


    /**
     * Called each time the Stream emits through its errorStream (non-fatal
     * errors).
     * @param {Object} streamInfos
     */
    onErrorStreamNext: function onErrorStreamNext(error) {
      self.trigger("warning", error);
    },


    /**
     * Called when the Stream instance throws (fatal errors).
     * @param {Object} streamInfos
     */
    onStreamError: function onStreamError(error) {
      self._priv.resetContentState();
      self._priv.fatalError = error;
      self._priv.unsubscribeLoadedVideo$.next();
      self._priv.setPlayerState(__WEBPACK_IMPORTED_MODULE_4__constants_js__["a" /* PLAYER_STATES */].STOPPED);

      // TODO This condition is here because the eventual callback called when the
      // player state is updated can launch a new content, thus the error will not
      // be here anymore, in which case triggering the "error" event is unwanted.
      // This is not perfect however as technically, this condition could be true
      // even for a new content (I cannot see it happen with the current code but
      // that's not a reason). In that case, "error" would be triggered 2 times.
      // Find a better solution.
      if (self._priv.fatalError === error) {
        self.trigger("error", error);
      }
    },


    /**
     * Called when the Stream instance complete.
     * @param {Object} streamInfos
     */
    onStreamComplete: function onStreamComplete() {
      self._priv.resetContentState();
      self._priv.unsubscribeLoadedVideo$.next();
      self._priv.setPlayerState(__WEBPACK_IMPORTED_MODULE_4__constants_js__["a" /* PLAYER_STATES */].ENDED);
    },


    /**
     * Called when the manifest is first downloaded.
     * @param {Object} value
     * @param {Manifest} value.manifest - The Manifest instance
     * @param {Subject} value.adaptations$ - Subject to emit the chosen
     * adaptation for each type.
     */
    onManifestChange: function onManifestChange(value) {
      if (false) {
        assert(value && value.manifest, "no manifest received");
        assert(value && value.adaptations$, "no adaptations subject received");
        assert(value && value.abrManager, "no ABR Manager received");
      }

      var manifest = value.manifest,
          _value$adaptations$ = value.adaptations$,
          adaptations$ = _value$adaptations$ === undefined ? {} : _value$adaptations$;

      self._priv.manifest = manifest;

      // set language management for audio and text
      self._priv.languageManager = new __WEBPACK_IMPORTED_MODULE_5__language_manager_js__["a" /* default */](manifest.adaptations, {
        audio$: adaptations$.audio,
        text$: adaptations$.text
      }, {
        defaultAudioTrack: self._priv.initialAudioTrack,
        defaultTextTrack: self._priv.initialTextTrack
      });

      // Set first adaptation for the rest
      Object.keys(adaptations$).forEach(function (type) {
        // audio and text is already completely managed by the languageManager
        if (type !== "audio" && type !== "text") {
          var adaptations = manifest.adaptations[type] || [];
          adaptations$[type].next(adaptations[0] || null);
        }
      });

      self._priv.abrManager = value.abrManager;

      self.trigger("manifestChange", manifest);
    },
    onManifestUpdate: function onManifestUpdate(value) {
      if (false) {
        assert(value && value.manifest, "no manifest received");
      }

      var manifest = value.manifest;

      self._priv.manifest = manifest;
      self._priv.languageManager.updateAdaptations(manifest.adaptations);

      self.trigger("manifestUpdate", manifest);
    },


    /**
     * @param {Object} obj
     * @param {string} obj.type
     * @param {Object} obj.adaptation
     */
    onAdaptationChange: function onAdaptationChange(_ref) {
      var type = _ref.type,
          adaptation = _ref.adaptation;

      self._priv.currentAdaptations[type] = adaptation;

      // TODO Emit adaptationChange?

      if (!self._priv.languageManager) {
        return;
      }
      if (type === "audio") {
        var audioTrack = self._priv.languageManager.getCurrentAudioTrack();
        self._priv.lastAudioTrack = audioTrack;
        self._priv.recordState("audioTrack", audioTrack);
      } else if (type === "text") {
        var textTrack = self._priv.languageManager.getCurrentTextTrack();
        self._priv.lastTextTrack = textTrack;
        self._priv.recordState("textTrack", textTrack);
      }
    },


    /**
     * Called each time a representation changes.
     * @param {Object} obj
     * @param {string} obj.type
     * @param {Object} obj.representation
     */
    onRepresentationChange: function onRepresentationChange(_ref2) {
      var type = _ref2.type,
          representation = _ref2.representation;

      self._priv.currentRepresentations[type] = representation;

      var bitrate = representation && representation.bitrate;
      if (bitrate != null) {
        self._priv.lastBitrates[type] = bitrate;
      }

      // TODO Emit representationChange?

      if (type == "video") {
        self._priv.recordState("videoBitrate", bitrate != null ? bitrate : -1);
      } else if (type == "audio") {
        self._priv.recordState("audioBitrate", bitrate != null ? bitrate : -1);
      }
    },
    onBitrateEstimationChange: function onBitrateEstimationChange(_ref3) {
      var type = _ref3.type,
          bitrate = _ref3.bitrate;

      if (false) {
        assert(type != null);
        assert(bitrate != null);
      }
      self._priv.recordState("bitrateEstimation", { type: type, bitrate: bitrate });
    },


    /**
     * Called each time the player alternates between play and pause.
     * @param {Object} evt
     * @param {string} evt.type
     */
    onPlayPauseNext: function onPlayPauseNext(evt) {
      if (self.videoElement.ended !== true) {
        self._priv.playing$.next(evt.type == "play");
      }
    },


    /**
     * Called each time a textTrack is added to the video DOM Element.
     * @param {Object} evt
     * @param {HTMLElement} evt.target
     */
    onNativeTextTrackNext: function onNativeTextTrackNext(_ref4) {
      var _ref4$target = _ref4.target,
          trackElement = _ref4$target[0];

      if (trackElement) {
        self.trigger("nativeTextTrackChange", trackElement);
      }
    },


    /**
     * Called each time the player state updates.
     * @param {string} s
     */
    setPlayerState: function setPlayerState(s) {
      if (self.state !== s) {
        self.state = s;
        __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].info("playerStateChange", s);
        self.trigger("playerStateChange", s);
      }
    },


    /**
     * Called each time a new timing object is emitted.
     * @param {Object} timing
     */
    triggerTimeChange: function triggerTimeChange(timing) {
      if (!self._priv.manifest || !timing) {
        return;
      }

      var positionData = {
        position: timing.currentTime,
        duration: timing.duration,
        playbackRate: timing.playbackRate,

        // TODO fix higher up?
        bufferGap: isFinite(timing.bufferGap) ? timing.bufferGap : 0
      };

      if (self._priv.manifest.isLive && timing.currentTime > 0) {
        positionData.wallClockTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__manifest_timings_js__["a" /* toWallClockTime */])(timing.currentTime, self._priv.manifest).getTime() / 1000;
        positionData.liveGap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__manifest_timings_js__["d" /* getMaximumBufferPosition */])(self._priv.manifest) - timing.currentTime;
      }

      self.trigger("positionUpdate", positionData);
    }
  };
});

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cleanBuffer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ranges_js__ = __webpack_require__(10);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Remove buffer from the browser's memory based on the user's
 * maxBufferAhead / maxBufferBehind settings.
 *
 * Normally, the browser garbage-collect automatically old-added chunks of
 * buffer date when memory is scarce. However, you might want to control
 * the size of memory allocated. This function takes the current position
 * and a "depth" behind and ahead wanted for the buffer, in seconds.
 *
 * Anything older than the depth will be removed from the buffer.
 * @param {QueuedSourceBuffer} qSourceBuffer
 * @param {Number} position - The current position
 * @param {Number} maxBufferBehind
 * @param {Number} maxBufferAhead
 * @returns {Observable}
 */
function cleanBuffer(qSourceBuffer, position, maxBufferBehind, maxBufferAhead) {
  if (!isFinite(maxBufferBehind) && !isFinite(maxBufferAhead)) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
  }

  var cleanedupRanges = [];

  var _getInnerAndOuterTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_ranges_js__["g" /* getInnerAndOuterTimeRanges */])(qSourceBuffer.getBuffered(), position),
      innerRange = _getInnerAndOuterTime.innerRange,
      outerRanges = _getInnerAndOuterTime.outerRanges;

  var collectBufferBehind = function collectBufferBehind() {
    if (!isFinite(maxBufferBehind)) {
      return;
    }

    // begin from the oldest
    for (var i = 0; i < outerRanges.length; i++) {
      var outerRange = outerRanges[i];
      if (position - maxBufferBehind >= outerRange.end) {
        cleanedupRanges.push(outerRange);
      } else if (position >= outerRange.end && position - maxBufferBehind > outerRange.start && position - maxBufferBehind < outerRange.end) {
        cleanedupRanges.push({
          start: outerRange.start,
          end: position - maxBufferBehind
        });
      }
    }
    if (innerRange) {
      if (position - maxBufferBehind > innerRange.start) {
        cleanedupRanges.push({
          start: innerRange.start,
          end: position - maxBufferBehind
        });
      }
    }
  };

  var collectBufferAhead = function collectBufferAhead() {
    if (!isFinite(maxBufferAhead)) {
      return;
    }

    // begin from the oldest
    for (var i = 0; i < outerRanges.length; i++) {
      var outerRange = outerRanges[i];
      if (position + maxBufferAhead <= outerRange.start) {
        cleanedupRanges.push(outerRange);
      } else if (position <= outerRange.start && position + maxBufferAhead < outerRange.end && position + maxBufferAhead > outerRange.start) {
        cleanedupRanges.push({
          start: position + maxBufferAhead,
          end: outerRange.end
        });
      }
    }
    if (innerRange) {
      if (position + maxBufferAhead < innerRange.end) {
        cleanedupRanges.push({
          start: position + maxBufferAhead,
          end: innerRange.end
        });
      }
    }
  };

  collectBufferBehind();
  collectBufferAhead();
  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].from(cleanedupRanges.map(function (range) {
    return qSourceBuffer.removeBuffer(range);
  })).concatAll().ignoreElements();
}

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = launchGarbageCollector;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_ranges_js__ = __webpack_require__(10);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






var GC_GAP_CALM = __WEBPACK_IMPORTED_MODULE_1__config_js__["a" /* default */].BUFFER_GC_GAPS.CALM;
var GC_GAP_BEEFY = __WEBPACK_IMPORTED_MODULE_1__config_js__["a" /* default */].BUFFER_GC_GAPS.BEEFY;

/**
 * Buffer garbage collector algorithm. Tries to free up some part of
 * the ranges that are distant from the current playing time.
 * See: https://w3c.github.io/media-source/#sourcebuffer-prepare-append
 * @param {Number} currentTime
 * @param {TimeRanges} buffered - current buffered ranges
 * @param {Number} gcGap - delta gap from current timestamp from which we
 * should consider cleaning up.
 * @returns {Array.<Range>} - Ranges selected for clean up
 */
function selectGCedRanges(currentTime, buffered, gcGap) {
  var _getInnerAndOuterTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_ranges_js__["g" /* getInnerAndOuterTimeRanges */])(buffered, currentTime),
      innerRange = _getInnerAndOuterTime.innerRange,
      outerRanges = _getInnerAndOuterTime.outerRanges;

  var cleanedupRanges = [];

  // start by trying to remove all ranges that do not contain the
  // current time and respect the gcGap
  // respect the gcGap? FIXME?
  for (var i = 0; i < outerRanges.length; i++) {
    var outerRange = outerRanges[i];
    if (currentTime - gcGap < outerRange.end) {
      cleanedupRanges.push(outerRange);
    } else if (currentTime + gcGap > outerRange.start) {
      cleanedupRanges.push(outerRange);
    }
  }

  // try to clean up some space in the current range
  if (innerRange) {
    __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].debug("buffer: gc removing part of inner range", cleanedupRanges);
    if (currentTime - gcGap > innerRange.start) {
      cleanedupRanges.push({
        start: innerRange.start,
        end: currentTime - gcGap
      });
    }

    if (currentTime + gcGap < innerRange.end) {
      cleanedupRanges.push({
        start: currentTime + gcGap,
        end: innerRange.end
      });
    }
  }

  return cleanedupRanges;
}

/**
 * Run the garbage collector.
 * Try to clean up buffered ranges from a low gcGap at first.
 * If it does not succeed to clean up space, use a higher gcCap.
 * @param {Observable} timings$
 * @param {QueuedSourceBuffer} bufferingQueue
 * @returns {Observable}
 */
function launchGarbageCollector(timings$, bufferingQueue) {
  __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].warn("buffer: running garbage collector");

  // wait for next timing event
  return timings$.take(1).mergeMap(function (timing) {
    var buffered = bufferingQueue.getBuffered();
    var cleanedupRanges = selectGCedRanges(timing.currentTime, buffered, GC_GAP_CALM);

    // more aggressive GC if we could not find any range to clean
    if (cleanedupRanges.length === 0) {
      cleanedupRanges = selectGCedRanges(timing.currentTime, buffered, GC_GAP_BEEFY);
    }

    __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].debug("buffer: gc cleaning", cleanedupRanges);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].from(cleanedupRanges.map(function (range) {
      return bufferingQueue.removeBuffer(range);
    })).concatAll();
  });
}

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Buffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyBuffer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_collections__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_ranges_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__errors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__segment_bookkeeper_js__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__queued_source_buffer_js__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__gc_js__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__cleanBuffer_js__ = __webpack_require__(103);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
















var BITRATE_REBUFFERING_RATIO = __WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].BITRATE_REBUFFERING_RATIO;

/**
 * Calculate start and end timestamps of the wanted buffer.
 * @param {TimeRanges} buffered - TimeRanges coming from the concerned
 * SourceBuffer
 * @param {Object} clock
 * @param {Number} bufferGoal
 * @param {Object} paddings
 * @param {Number} paddings.low
 * @param {Number} paddings.high
 * @returns {Object} - Start and end timestamps, in seconds, under an object
 * form with two properties:
 *   - start {Number}
 *   - end {Number}
 */

function getWantedBufferRange(buffered, clock, bufferGoal, paddings) {
  var lowPadding = paddings.low,
      highPadding = paddings.high;

  var timestamp = clock.currentTime + clock.timeOffset;

  // wantedBufferSize calculates the size of the buffer we want to ensure,
  // taking into account the min between: the set max buffer size, the
  // duration and the live gap.
  var endDiff = (clock.duration || Infinity) - timestamp;
  var wantedBufferSize = Math.max(0, clock.liveGap == null ? Math.min(bufferGoal, endDiff) : Math.min(bufferGoal, clock.liveGap, endDiff));

  var bufferGap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_ranges_js__["a" /* getLeftSizeOfRange */])(buffered, timestamp);

  // the ts padding is the time offset that we want to apply to our current
  // timestamp in order to calculate the starting point of the list of
  // segments to inject.
  var timestampPadding = bufferGap > lowPadding && bufferGap < Infinity ? Math.min(bufferGap, highPadding) : 0;

  return {
    start: timestamp + timestampPadding,
    end: timestamp + wantedBufferSize
  };
}

/**
 * Manage a single buffer:
 *   - load the right segments through the downloader on normal playback /
 *     seeking / as the adaptation chosen changes
 *   - add those to the sourceBuffer
 *   - clean up if too much segments have been loaded
 *
 * TODO too many parameters?
 * @param {Object} opt
 * @param {SourceBuffer} opt.sourceBuffer
 * @param {Function} opt.downloader
 * @param {Observable} opt.switch$
 * @param {Observable} opt.clock
 * @param {Number} opt.wantedBufferAhead
 * @param {Number} opt.maxBufferBehind
 * @param {Number} opt.maxBufferAhead
 * @param {string} opt.bufferType
 * @param {Boolean} opt.isLive
 * @returns {Observable}
 */
function Buffer(_ref) {
  var sourceBuffer = _ref.sourceBuffer,
      downloader = _ref.downloader,
      switch$ = _ref.switch$,
      clock$ = _ref.clock$,
      wantedBufferAhead = _ref.wantedBufferAhead,
      maxBufferBehind = _ref.maxBufferBehind,
      maxBufferAhead = _ref.maxBufferAhead,
      bufferType = _ref.bufferType,
      isLive = _ref.isLive;


  /**
   * Saved state of an init segment to give to the downloader.
   * TODO Re-think that mess for a Buffer refacto.
   */
  var initSegmentInfos = null;

  // will be used to emit messages to the calling function
  var messageSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();

  // safety level (low and high water mark) size of buffer that won't
  // be flushed when switching representation for smooth transitions
  // and avoiding buffer underflows
  var LOW_PADDING = bufferType == "video" ? 4 : 1;
  var HIGH_PADDING = bufferType == "video" ? 6 : 1;

  var bookkeeper = new __WEBPACK_IMPORTED_MODULE_8__segment_bookkeeper_js__["a" /* default */]();
  var bufferingQueue = new __WEBPACK_IMPORTED_MODULE_9__queued_source_buffer_js__["a" /* default */](sourceBuffer);

  /**
   * Returns every segments currently wanted.
   * @param {Object} adaptation - The adaptation concerned (audio/video...)
   * @param {Object} representation - The representation of the chosen
   * adaptation
   * @param {BufferedRanges} buffered - The BufferedRanges of the corresponding
   * sourceBuffer
   * @param {Object} timing - The last item emitted from clock$
   * @param {Number} bufferGoal - The last item emitted from wantedBufferAhead
   * @param {Number} bufferSize - The last item emitted from bufferSize$
   * @param {Boolean} withInitSegment - Whether we're dealing with an init
   * segment.
   * @returns {Array.<Segment>}
   * @throws IndexError - Throws if the current timestamp is considered out
   * of bounds.
   */
  function getSegmentsListToInject(representation, buffered, timing, bufferGoal, withInitSegment) {
    var initSegment = null;

    if (withInitSegment) {
      __WEBPACK_IMPORTED_MODULE_4__utils_log__["a" /* default */].debug("add init segment", bufferType);
      initSegment = representation.index.getInitSegment();
    }

    if (timing.readyState === 0) {
      return initSegment ? [initSegment] : [];
    }

    var _getWantedBufferRange = getWantedBufferRange(buffered, timing, bufferGoal, {
      low: LOW_PADDING,
      high: HIGH_PADDING
    }),
        start = _getWantedBufferRange.start,
        end = _getWantedBufferRange.end;

    var duration = end - start;

    /**
     * TODO This is an ugly hack for now.
     * shouldRefresh returns true if, from the informations given and the type
     * of index used in the manifest, we infer that we have to refresh the
     * manifest (to get informations about subsequent needed segments).
     *
     * The problem with shouldRefresh is that depending on the type of techno,
     * we want different things:
     *
     *   - for smooth contents, index informations about a segment n is present
     *     in the container of the segment n-1. Thus, shouldRefresh should
     *     return true there if the segment n-1 has been parsed but we still
     *     miss informations about the segment n (this happens).
     *
     *   - for dash contents, we prefer to fetch the manifest as soon as we
     *     miss the informations about even one distant segment in the future.
     *     Thus, shouldRefresh should return true there if the end of the
     *     wanted range is not yet in the index.
     *
     * Doing the DASH usecase does not cause much problem (though the precision
     * of the range end could be improved).
     * The smooth usecase is however difficult to implement with the current
     * code (we have to know that we parsed the last segment from the index and
     * that we need the next segment, for which we have no information).
     * As a quick and dirty hack, we take the current time instead. If the
     * current time is well into the last segment and our range indicates
     * that we need another segment, we should refresh. However, this is not
     * efficient:
     *   - we have a high chance of rebuffering when this happens. It would
     *     be best to know that we have the last segment (one other problem is
     *     that this segment could be in another representation) before
     *     actually playing it.
     *   - the player stops usually some milliseconds before the end of the
     *     last segment, but this is not an exact thing. So we have to add
     *     rounding and infer the fact that we're well into the last segment.
     *   - for readability, it makes no sense that shouldRefresh might need
     *     the current time of playback.
     */
    var timestamp = timing.currentTime + timing.timeOffset;
    var shouldRefresh = representation.index.shouldRefresh(timestamp, start, end);
    if (shouldRefresh) {
      var error = new __WEBPACK_IMPORTED_MODULE_7__errors__["g" /* IndexError */]("OUT_OF_INDEX_ERROR", representation.index.getType(), false);
      messageSubject.next({ type: "out-of-index", value: error });
    }

    // given the current timestamp and the previously calculated time gap and
    // wanted buffer size, we can retrieve the list of segments to inject in
    // our pipelines.
    var mediaSegments = representation.index.getSegments(start, duration);

    if (initSegment) {
      mediaSegments.unshift(initSegment);
    }

    return mediaSegments;
  }

  function createRepresentationBuffer(representation) {
    __WEBPACK_IMPORTED_MODULE_4__utils_log__["a" /* default */].info("bitrate", bufferType, representation.bitrate);

    var queuedSegments = new __WEBPACK_IMPORTED_MODULE_5__utils_collections__["a" /* SimpleSet */]();

    /**
     * Returns true if it considers that the segment given should be loaded.
     * @param {Segment} segment
     * @param {Number} bitrate
     * @returns {Boolean}
     */
    function segmentFilter(segment) {
      // if this segment is already in the pipeline
      var isInQueue = queuedSegments.test(segment.id);
      if (isInQueue) {
        return false;
      }

      // segment without time info are usually init segments or some
      // kind of metadata segment that we never filter out
      if (segment.isInit || segment.time < 0) {
        return true;
      }

      var time = segment.time,
          duration = segment.duration,
          timescale = segment.timescale;

      var currentSegment = bookkeeper.hasCompleteSegment(time, duration, timescale);

      // only re-load comparatively-poor bitrates.
      return !currentSegment || currentSegment.bitrate * BITRATE_REBUFFERING_RATIO < representation.bitrate;
    }

    /**
     * Append buffer to the bufferingQueue.
     * If it leads to a QuotaExceededError, try to run our custom range
     * _garbage collector_.
     * @returns {Observable}
     */
    function appendDataInBuffer(pipelineData) {
      var segment = pipelineData.segment,
          parsed = pipelineData.parsed;
      var segmentData = parsed.segmentData,
          nextSegments = parsed.nextSegments,
          segmentInfos = parsed.segmentInfos;


      if (segment.isInit) {
        initSegmentInfos = segmentInfos;
      }

      // If we have informations about subsequent segments, add them to the
      // index.
      // TODO do that higher up?
      var addedSegments = nextSegments ? representation.index._addSegments(nextSegments, segmentInfos) : [];

      /**
       * Validate the segment downloaded:
       *   - remove from the queued segment to re-allow its download
       *   - insert it in the bufferedRanges object
       */
      var validateSegment = function validateSegment() {
        // Note: we should also clean when canceled/errored
        // (TODO do it when canceled?)
        queuedSegments.remove(segment.id);

        if (!segment.isInit) {
          var _ref2 = segmentInfos ? segmentInfos : segment,
              time = _ref2.time,
              duration = _ref2.duration,
              timescale = _ref2.timescale;

          // current segment timings informations are used to update
          // bufferedRanges informations


          bookkeeper.insert(segment, time / timescale, // start
          (time + duration) / timescale, // end
          representation.bitrate);
        }
      };

      var appendSegment = function appendSegment() {
        return bufferingQueue.appendBuffer(segmentData).do(validateSegment);
      };

      return appendSegment().catch(function (error) {
        if (error.name != "QuotaExceededError") {
          queuedSegments.remove(segment.id);
          throw new __WEBPACK_IMPORTED_MODULE_7__errors__["f" /* MediaError */]("BUFFER_APPEND_ERROR", error, true);
        }

        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__gc_js__["a" /* default */])(clock$, bufferingQueue).mergeMap(appendSegment).catch(function (error) {
          queuedSegments.remove(segment.id);
          throw new __WEBPACK_IMPORTED_MODULE_7__errors__["f" /* MediaError */]("BUFFER_FULL_ERROR", error, true);
        });
      }).map(function () {
        return {
          type: "pipeline",
          value: __WEBPACK_IMPORTED_MODULE_2_object_assign___default()({ bufferType: bufferType, addedSegments: addedSegments }, pipelineData)
        };
      });
    }

    /**
     * Get list of segment to injects.
     * @param {Array} combineLatestResult
     * @param {Number} injectCount
     * @returns {Observable|Array.<Segment>}
     */
    function getNeededSegments(timing, bufferGoal, injectCount) {
      var buffered = bufferingQueue.getBuffered();
      bookkeeper.addBufferedInfos(buffered);

      // send a message downstream when bumping on an explicit
      // discontinuity announced in the segment index.
      if (timing.stalled) {
        if (isLive) {
          var discontinuity = representation.index.checkDiscontinuity(timing.currentTime);
          if (discontinuity > 0) {
            messageSubject.next({
              type: "index-discontinuity",
              value: { ts: discontinuity + 1 }
            });
          }
        }
      }

      var injectedSegments = void 0;

      // filter out already loaded and already queued segments
      var withInitSegment = injectCount === 0;
      injectedSegments = getSegmentsListToInject(representation, buffered, timing, bufferGoal, withInitSegment);

      injectedSegments = injectedSegments.filter(segmentFilter);

      // queue all segments injected in the observable
      for (var i = 0; i < injectedSegments.length; i++) {
        queuedSegments.add(injectedSegments[i].id);
      }

      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"], injectedSegments);
    }

    var loadNeededSegments = function loadNeededSegments(segment) {
      return downloader({ segment: segment, representation: representation, init: initSegmentInfos }).map(function (args) {
        return __WEBPACK_IMPORTED_MODULE_2_object_assign___default()({ segment: segment }, args);
      });
    };

    var onClockTick = function onClockTick(_ref3, i) {
      var timing = _ref3[0],
          wantedBufferAhead = _ref3[1],
          maxBufferBehind = _ref3[2],
          maxBufferAhead = _ref3[3];

      var bufferGoal = Math.min(wantedBufferAhead, maxBufferAhead);
      var loadNeeded$ = getNeededSegments(timing, bufferGoal, i).concatMap(loadNeededSegments);
      var clean$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__cleanBuffer_js__["a" /* default */])(bufferingQueue, timing.currentTime, maxBufferBehind, maxBufferAhead);
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(loadNeeded$, clean$);
    };

    var segmentsPipeline = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(clock$, wantedBufferAhead, maxBufferBehind, maxBufferAhead).mergeMap(onClockTick).concatMap(appendDataInBuffer);

    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(segmentsPipeline, messageSubject).catch(function (error) {
      // For live adaptations, handle 412 errors as precondition-
      // failed errors, ie: we are requesting for segments before they
      // exist
      var isPreconditionFailedError = isLive && error.type == __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorTypes */].NETWORK_ERROR && error.isHttpError(412);

      if (!isPreconditionFailedError) {
        throw error;
      }

      // 412 Precondition Failed request errors do not cause the
      // buffer to stop but are re-emitted in the stream as
      // "precondition-failed" type. They should be handled re-
      // adapting the live-gap that the player is holding
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ type: "precondition-failed", value: error }).concat(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].timer(2000)).concat(createRepresentationBuffer(representation));
    }).startWith({
      type: "representationChange",
      value: {
        type: bufferType,
        representation: representation
      }
    });
  }

  return switch$.switchMap(createRepresentationBuffer).finally(function () {
    return bufferingQueue.dispose();
  });
}

function EmptyBuffer(_ref4) {
  var bufferType = _ref4.bufferType;

  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({
    type: "representationChange",
    value: {
      type: bufferType,
      representation: null
    }
  });
}



/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var BUFFER_APPEND = "append";
var BUFFER_REMOVE = "remove";

/**
 * Append/Remove from sourceBuffer in a queue.
 * Wait for the previous buffer action to be finished (updateend event) to
 * perform the next in the queue.
 * @class QueuedSourceBuffer
 */

var QueuedSourceBuffer = function () {
  /**
   * @constructor
   * @param {SourceBuffer} sourceBuffer
   */
  function QueuedSourceBuffer(sourceBuffer) {
    _classCallCheck(this, QueuedSourceBuffer);

    this.buffer = sourceBuffer;
    this.queue = [];
    this.flushing = null;

    this.__onUpdate = this._onUpdate.bind(this);
    this.__onError = this._onError.bind(this);
    this.__flush = this._flush.bind(this);

    this.buffer.addEventListener("update", this.__onUpdate);
    this.buffer.addEventListener("error", this.__onError);
    this.buffer.addEventListener("updateend", this.__flush);
  }

  /**
   * Append media segment to the attached SourceBuffer, in a FIFO queue.
   * @param {ArrayBuffer} buffer
   * @returns {Observable}
   */


  QueuedSourceBuffer.prototype.appendBuffer = function appendBuffer(buffer) {
    return this._queueAction(BUFFER_APPEND, buffer);
  };

  /**
   * Remove data from the attached SourceBuffer, in a FIFO queue.
   * @param {Object} range
   * @param {Number} range.start - start position, in seconds
   * @param {Number} range.end - end position, in seconds
   * @returns {Observable}
   */


  QueuedSourceBuffer.prototype.removeBuffer = function removeBuffer(_ref) {
    var start = _ref.start,
        end = _ref.end;

    return this._queueAction(BUFFER_REMOVE, { start: start, end: end });
  };

  /**
   * Returns the currently buffered data, in a TimeRanges object.
   * @returns {TimeRanges}
   */


  QueuedSourceBuffer.prototype.getBuffered = function getBuffered() {
    return this.buffer.buffered;
  };

  /**
   * Free up ressources used by this class.
   */


  QueuedSourceBuffer.prototype.dispose = function dispose() {
    this.buffer.removeEventListener("update", this.__onUpdate);
    this.buffer.removeEventListener("error", this.__onError);
    this.buffer.removeEventListener("updateend", this.__flush);
    this.buffer = null;
    this.queue.length = 0;
    this.flushing = null;
  };

  /**
   * @private
   * @param {Event} evt
   */


  QueuedSourceBuffer.prototype._onUpdate = function _onUpdate(evt) {
    if (this.flushing) {
      this.flushing.next(evt);
      this.flushing.complete();
      this.flushing = null;
    }
  };

  /**
   * @private
   * @param {Event} error
   */


  QueuedSourceBuffer.prototype._onError = function _onError(error) {
    if (this.flushing) {
      this.flushing.error(error);
      this.flushing = null;
    }
  };

  /**
   * Queue a new action.
   * Begin flushing if no action were previously in the queue.
   * @private
   * @param {string} type
   * @param {*} args
   * @returns {Subject} - Can be used to follow the buffer action advancement.
   */


  QueuedSourceBuffer.prototype._queueAction = function _queueAction(type, args) {
    var subj = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
    var length = this.queue.unshift({ type: type, args: args, subj: subj });
    if (length === 1) {
      this._flush();
    }
    return subj;
  };

  /**
   * Perform next queued action if one and none are pending.
   * @private
   */


  QueuedSourceBuffer.prototype._flush = function _flush() {
    if (this.flushing || this.queue.length === 0 || this.buffer.updating) {
      return;
    }

    var _queue$pop = this.queue.pop(),
        type = _queue$pop.type,
        args = _queue$pop.args,
        subj = _queue$pop.subj;

    this.flushing = subj;
    try {
      switch (type) {
        case BUFFER_APPEND:
          this.buffer.appendBuffer(args);break;
        case BUFFER_REMOVE:
          this.buffer.remove(args.start, args.end);break;
      }
    } catch (e) {
      this._onError(e);
    }
  };

  return QueuedSourceBuffer;
}();

/* harmony default export */ __webpack_exports__["a"] = (QueuedSourceBuffer);

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_assert_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_takeFirstSet_js__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_ranges_js__ = __webpack_require__(10);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






var MAX_MISSING_FROM_COMPLETE_SEGMENT = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].MAX_MISSING_FROM_COMPLETE_SEGMENT,
    MAX_BUFFERED_DISTANCE = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].MAX_BUFFERED_DISTANCE,
    MINIMUM_SEGMENT_SIZE = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].MINIMUM_SEGMENT_SIZE;

/**
 * TODO Find what to do with that one empirically. Either delete or uncomment.
 *
 * Tolerated margin when comparing segments.
 * If the absolute difference between two segment's start time is inferior or
 * equal to this margin, we infer that they begin at the exact same time, same
 * logic for the end time (where we infer that they end at the exact same
 * time).
 * Used to know whether a newly downloaded segment replace/update an old one in
 * the bookkeeping we perform on currently downloaded segments.
 * @type {Number}
 */
// const SEGMENT_EPSILON = 0.3;

/**
 * Keep track of every segment downloaded and currently in the browser's memory.
 *
 * The main point of this class is to know which CDN segments are already
 * downloaded, at which bitrate, and which have been garbage-collected since
 * by the browser (and thus should be re-downloaded).
 *
 * @class SegmentBookkeeper
 */

var SegmentBookkeeper = function () {
  function SegmentBookkeeper() {
    _classCallCheck(this, SegmentBookkeeper);

    /**
     * The inventory keep track of all the segments which should be currently
     * in the browser's memory.
     * This array contains objects, each being related to a single downloaded
     * segment which is at least partially added in a source buffer.
     * Those objects have the following keys:
     *
     *   - bitrate {Number}: bitrate of the representation corresponding to
     *     the segment.
     *
     *   - start {Number}: time, in seconds, at which the segment should begin
     *     (parsed from the container or from the Segment Object)
     *
     *   - end {Number}: time, in seconds, at which the segment should end
     *     (parsed from the container or from the Segment Object)
     *
     *   - bufferedStart {Number|undefined}: time, in seconds, at which we infer
     *     the segment currently begin in the sourcebuffer
     *
     *   - bufferedEnd {Number|undefined}: time, in seconds, at which we infer
     *     the segment currently end in the sourcebuffer
     *
     *   - segment {Segment}: the corresponding segment object, as downloaded
     *     from the CDN.
     *
     * @type {Array.<Object>}
     */
    this._inventory = [];
  }

  /**
   * Infer each segment's bufferedStart and bufferedEnd from the TimeRanges
   * given (coming from the source buffer).
   * @param {TimeRanges}
   *
   * TODO implement management of segments whose end is not known
   */


  SegmentBookkeeper.prototype.addBufferedInfos = function addBufferedInfos(buffered) {
    var ranges = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_ranges_js__["h" /* convertToRanges */])(buffered);
    var maxI = ranges.length - 1;

    var _inventory = this._inventory;

    var inventoryIndex = 0;
    var thisSegment = _inventory[0];

    for (var i = 0; i <= maxI; i++) {
      if (!thisSegment) {
        // Those buffered do not link to any segment here.
        // It may be linked to another adaptation, for example
        return;
      }

      var _ranges$i = ranges[i],
          rangeStart = _ranges$i.start,
          rangeEnd = _ranges$i.end;


      if (rangeEnd - rangeStart < MINIMUM_SEGMENT_SIZE) {
        continue;
      }

      var indexBefore = inventoryIndex;

      // skip until first segment with at least MINIMUM_SEGMENT_SIZE past the
      // start of that range.
      while (thisSegment && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_takeFirstSet_js__["a" /* default */])(thisSegment.bufferedEnd, thisSegment.end) - rangeStart < MINIMUM_SEGMENT_SIZE) {
        thisSegment = _inventory[++inventoryIndex];
      }

      // might be useful to infer the bufferedStart of thisSegment
      var lastDeletedSegmentEnd = -1;

      // remove garbage-collected segments
      // (not in that range nor in the previous one)
      var numberOfSegmentToDelete = inventoryIndex - indexBefore;
      if (numberOfSegmentToDelete) {
        var lastDeletedSegment = _inventory[indexBefore + numberOfSegmentToDelete - 1];
        lastDeletedSegmentEnd = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_takeFirstSet_js__["a" /* default */])(lastDeletedSegment.bufferedEnd, lastDeletedSegment.end);
        _inventory.splice(indexBefore, numberOfSegmentToDelete);
        inventoryIndex = indexBefore;
      }

      // if no segment left for that range (or any other one), quit
      if (!thisSegment) {
        return;
      }

      // if the first segment past the start is actually outside that range,
      // skip the following part
      if (rangeEnd - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_takeFirstSet_js__["a" /* default */])(thisSegment.bufferedStart, thisSegment.start) >= MINIMUM_SEGMENT_SIZE) {

        // set the bufferedStart of the first segment in that range
        if (thisSegment.bufferedStart != null && thisSegment.bufferedStart < rangeStart) {
          // the segment appears to have been partially garbage collected.
          // Update bufferedStart
          thisSegment.bufferedStart = rangeStart;
        } else if (thisSegment.bufferedStart == null) {
          if (lastDeletedSegmentEnd !== -1 && lastDeletedSegmentEnd > rangeStart) {
            if (thisSegment.bufferedStart - lastDeletedSegmentEnd <= MAX_BUFFERED_DISTANCE) {
              thisSegment.bufferedStart = lastDeletedSegmentEnd;
            }
          } else if (thisSegment.start - rangeStart <= MAX_BUFFERED_DISTANCE) {
            thisSegment.bufferedStart = rangeStart;
          } else {
            thisSegment.bufferedStart = thisSegment.start;
          }
        }

        thisSegment = _inventory[++inventoryIndex];
      }

      // make contiguous until first segment outside that range
      // (i.e until the start of the next segment can not constitute a segment
      // in that range == less than MINIMUM_SEGMENT_SIZE into that range)
      while (thisSegment && rangeEnd - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_takeFirstSet_js__["a" /* default */])(thisSegment.bufferedStart, thisSegment.start) >= MINIMUM_SEGMENT_SIZE) {
        var prevSegment = _inventory[inventoryIndex - 1];

        // those segments are contiguous, we have no way to infer their real end
        if (prevSegment.bufferedEnd == null) {
          prevSegment.bufferedEnd = prevSegment.end;
        }

        thisSegment.bufferedStart = prevSegment.bufferedEnd;
        thisSegment = _inventory[++inventoryIndex];
      }

      // update the bufferedEnd of the last segment in that range
      // Note: lastSegmentInRange can be undefined
      var lastSegmentInRange = _inventory[inventoryIndex - 1];
      if (lastSegmentInRange) {
        if (lastSegmentInRange.bufferedEnd != null && lastSegmentInRange.bufferedEnd > rangeEnd) {
          // the segment appears to have been partially garbage collected.
          // Update bufferedEnd
          lastSegmentInRange.bufferedEnd = rangeEnd;
        } else if (lastSegmentInRange.bufferedEnd == null) {
          if (rangeEnd - lastSegmentInRange.end <= MAX_BUFFERED_DISTANCE) {
            lastSegmentInRange.bufferedEnd = rangeEnd;
          } else {
            lastSegmentInRange.bufferedEnd = lastSegmentInRange.end;
          }
        }
      }
    }

    // if we still have segments left, they are not affiliated to any range.
    // They might have been garbage collected, delete them from here.
    if (thisSegment) {
      _inventory.splice(inventoryIndex, _inventory.length - inventoryIndex);
    }
  };

  /**
   * Add a new segment in the inventory.
   *
   * Note: As new segments can "replace" partially or completely old ones, we
   * have to perform a complex logic and might update previously added segments.
   *
   * @param {Segment} segment
   * @param {Number} start - start time of the segment, in seconds
   * @param {Number|undefined} end - end time of the segment, in seconds. Can
   * be undefined in some rare cases
   * @param {Number} bitrate - bitrate of the representation the segment is in
   */


  SegmentBookkeeper.prototype.insert = function insert(segment, start, end, bitrate) {
    // TODO (*very* low-priority) manage segments whose end is unknown (rare but
    // could eventually happen).
    // This should be properly managed in this method, but it is not in some
    // other methods of this class, so I decided to not one of those to the
    // inventory by security
    if (false) {
      assert(end != null, "SegmentBookkeeper: ending time of the segment not defined");
    } else if (end == null) {
      // This leads to excessive re-downloads of segment without an ending time.
      return;
    }

    var _inventory = this._inventory;

    // infer start and end from the segment data
    // /!\ Can be a little different than their real start/end time in the
    // sourcebuffer.
    // const start = segment.time / segment.timescale;
    // const end = (segment.time + segment.duration) / segment.timescale;

    var newSegment = {
      bitrate: bitrate,
      start: start,
      end: end,
      bufferedStart: undefined,
      bufferedEnd: undefined,
      segment: segment
    };

    // begin by the end as in most use cases this will be faster
    for (var i = _inventory.length - 1; i >= 0; i--) {
      var segmentI = _inventory[i];

      if (segmentI.start /* - SEGMENT_EPSILON */ <= start) {
        if (segmentI.end /* - SEGMENT_EPSILON */ <= start) {
          // our segment is after, push it after this one
          //
          // Case 1:
          //   segmentI     : |======|
          //   newSegment   :        |======|
          //
          // Case 2:
          //   segmentI     : |======|
          //   newSegment   :          |======|
          this._inventory.splice(i + 1, 0, newSegment);
          return;
        } else {
          // /!\ also goes here if end is undefined
          if (segmentI.start >= start /* - SEGMENT_EPSILON */) {
            // In those cases, replace
            // Case 1:
            //  segmentI     : |=======|
            //  newSegment   : |=======|
            //
            // Case 2:
            //  segmentI     : |=======|
            //  newSegment   : |==========|
            //
            // Case 3:
            //  segmentI     : |=======|
            //  newSegment   : |???*
            //
            // Case 4:
            //  segmentI     : |???*
            //  newSegment   : |======|
            //
            // Case 5:
            //  segmentI     : |???*
            //  newSegment   : |???*
            //
            // *|??? = unknown end
            this._inventory.splice(i, 1, newSegment);
            return;
          } else {
            // our segment has a "complex" relation with this one,
            // update the old one end and add this one after it.
            //
            // Case 1:
            //  segmentI     : |=======|
            //  newSegment   :    |======|
            //
            // Case 2:
            //  segmentI     : |=======|
            //  newSegment   :    |====|
            //
            // Case 3:
            //  segmentI     : |=======|
            //  newSegment   :    |???*
            //
            // Case 4:
            //  segmentI     : |???*
            //  newSegment   :    |====|
            //
            // Case 5:
            //  segmentI     : |???*
            //  newSegment   :    |???*
            //
            // *|??? = unknown end

            // (if segment's end is not known yet, it could perfectly
            // end before the one we're adding now)
            if (segmentI.end != null) {
              segmentI.end = start;
            }
            this._inventory.splice(i + 1, 0, newSegment);
            return;
          }
        }
      }
    }

    // if we got here, we are the first segment
    // check bounds of the previous first segment
    var firstSegment = this._inventory[0];
    if (!firstSegment) {
      // we do not have any segment yet
      this._inventory.push(newSegment);
      return;
    }

    if (segment.end == null) {
      if (firstSegment.start === start) {
        // same beginning, unknown end, just replace
        // Case 1:
        //  firstSegment : |=======|
        //  newSegment   : |???*
        //
        // Case 2:
        //  firstSegment : |???*
        //  newSegment   : |???*
        //
        // *|??? = unknown end
        this._inventory.splice(0, 1, newSegment);
      } else {
        // our segment begins before this one, push at the beginning
        // Case 1:
        // firstSegment :   |=======|
        // newSegment   : |???*
        //
        // Case 2:
        // firstSegment :   |???*
        // newSegment   : |???*
        //
        // *|??? = unknown end
        this._inventory.splice(0, 0, newSegment);
      }
      return;
    }

    if (firstSegment.start >= segment.end) {
      // our segment is before, put it before
      // Case 1:
      //  firstSegment :      |====|
      //  newSegment   : |====|
      //
      // Case 2:
      //  firstSegment :        |====|
      //  newSegment   : |====|
      //
      // Case 3:
      //  firstSegment :        |???*
      //  newSegment   : |====|
      //
      // Case 4:
      //  firstSegment :      |???*
      //  newSegment   : |====|
      //
      // *|??? = unknown end
      this._inventory.splice(0, 0, newSegment);
    } else if (firstSegment.end /* - SEGMENT_EPSILON */ <= segment.end) {
      // Our segment is bigger, replace the first
      // Case 1:
      //  firstSegment :   |===|
      //  newSegment   : |=======|
      //
      // Case 2:
      //  firstSegment :   |=====|
      //  newSegment   : |=======|
      this._inventory.splice(0, 1, newSegment);
    } else {
      // our segment has a "complex" relation with the first one,
      // update the old one start and add this one before it.
      // Case 1:
      //  firstSegment :    |======|
      //  newSegment   : |======|
      //
      // Case 2:
      // firstSegment :   |???*
      // newSegment   : |=====|
      //
      // *|??? = unknown end
      firstSegment.start = segment.end;
      this._inventory.splice(0, 0, newSegment);
    }
  };

  /**
   * Returns segment infos for a segment corresponding to the given time,
   * duration and timescale.
   *
   * Returns null if either:
   *   - no segment can be linked exactly to the given time/duration
   *   - a segment is linked to this information, but is currently considered
   *     "incomplete" in the sourceBuffer.
   *
   * The main purpose of this method is to know if the segment asked should be
   * downloaded (or re-downloaded).
   *
   * /!\ Make sure that this class is synchronized with the sourceBuffer
   * (see addBufferedInfos method of the same class) before calling this method,
   * as it depends on it to categorize "incomplete" from "complete" segments.
   *
   * @param {Number} time
   * @param {Number} duration
   * @param {Number} timescale
   * @returns {Object|null}
   */


  SegmentBookkeeper.prototype.hasCompleteSegment = function hasCompleteSegment(time, duration, timescale) {
    var _inventory = this._inventory;

    for (var i = _inventory.length - 1; i >= 0; i--) {
      var segmentI = _inventory[i];
      var segment = segmentI.segment;

      var _time = time;
      var _duration = duration;
      if (segment.timescale !== timescale) {
        // Note: we could get rounding errors here
        _time = time * segment.timescale / timescale;
        _duration = duration * segment.timescale / timescale;
      }

      if (segment.time === _time && segment.duration === _duration) {
        // check complete-ness of the segment:
        //   - check that the real start and end is contiguous with the
        //     previous/next one.
        //   - if that's not the case for at least one of them, check the
        //     difference between what is announced and what seems to be
        //     in the sourcebuffer.

        var prevSegmentI = _inventory[i - 1];

        if (prevSegmentI && prevSegmentI.bufferedEnd == null || segmentI.bufferedStart == null) {
          // false negatives are better than false positives here.
          // When impossible to know, say the segment is not complete
          return null;
        }

        if (!prevSegmentI || prevSegmentI.bufferedEnd < segmentI.bufferedStart) {
          var timeDiff = segmentI.bufferedStart - segmentI.start;
          if (timeDiff > MAX_MISSING_FROM_COMPLETE_SEGMENT) {
            return null;
          }
        }

        var nextSegmentI = _inventory[i + 1];
        if (nextSegmentI && nextSegmentI.bufferedStart == null || segmentI.bufferedEnd == null) {
          // false negatives are better than false positives here.
          // When impossible to know, say the segment is not complete
          return null;
        }

        if (segmentI.end != null && (!nextSegmentI || nextSegmentI.bufferedStart > segmentI.bufferedEnd)) {
          var _timeDiff = segmentI.end - segmentI.bufferedEnd;
          if (_timeDiff > MAX_MISSING_FROM_COMPLETE_SEGMENT) {
            return null;
          }
        }

        return segmentI;
      }
    }
    return null;
  };

  return SegmentBookkeeper;
}();

/* harmony default export */ __webpack_exports__["a"] = (SegmentBookkeeper);

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KEY_STATUS_ERRORS; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var KEY_STATUS_ERRORS = {
  "expired": true,
  "internal-error": true
  // "released",
  // "output-restricted",
  // "output-downscaled",
  // "status-pending",
};

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export findCompatibleKeySystem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getKeySystem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors__ = __webpack_require__(6);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









var EME_DEFAULT_WIDEVINE_ROBUSTNESSES = __WEBPACK_IMPORTED_MODULE_1__config_js__["a" /* default */].EME_DEFAULT_WIDEVINE_ROBUSTNESSES,
    EME_KEY_SYSTEMS = __WEBPACK_IMPORTED_MODULE_1__config_js__["a" /* default */].EME_KEY_SYSTEMS;


function getCachedKeySystemAccess(keySystems) {
  var instanceInfos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var $keySystem = instanceInfos.$keySystem,
      $mediaKeys = instanceInfos.$mediaKeys,
      $mediaKeySystemConfiguration = instanceInfos.$mediaKeySystemConfiguration;

  // NOTE(pierre): alwaysRenew flag is used for IE11 which require the
  // creation of a new MediaKeys instance for each session creation

  if (!$keySystem || !$mediaKeys || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__compat__["e" /* shouldRenewMediaKeys */])()) {
    return null;
  }

  var configuration = $mediaKeySystemConfiguration;
  var foundKeySystem = keySystems.filter(function (ks) {
    if (ks.type !== $keySystem.type) {
      return false;
    }

    if (ks.persistentLicense && configuration.persistentState != "required") {
      return false;
    }

    if (ks.distinctiveIdentifierRequired && configuration.distinctiveIdentifier != "required") {
      return false;
    }

    return true;
  })[0];

  if (foundKeySystem) {
    return {
      keySystem: foundKeySystem,
      keySystemAccess: new __WEBPACK_IMPORTED_MODULE_3__compat__["f" /* KeySystemAccess */]($keySystem, $mediaKeys, $mediaKeySystemConfiguration)
    };
  } else {
    return null;
  }
}

/**
 * Build configuration for the requestMediaKeySystemAccess EME API, based
 * on the current keySystem object.
 * @param {Object} keySystem
 * @param {Boolean} [keySystem.persistentLicense]
 * @param {Boolean} [keySystem.persistentStateRequired]
 * @param {Boolean} [keySystem.distinctiveIdentifierRequired]
 * @returns {Array.<Object>} - Configuration to give to the
 * requestMediaKeySystemAccess API.
 */
function buildKeySystemConfigurations(keySystem) {
  var sessionTypes = ["temporary"];
  var persistentState = "optional";
  var distinctiveIdentifier = "optional";

  if (keySystem.persistentLicense) {
    persistentState = "required";
    sessionTypes.push("persistent-license");
  }

  if (keySystem.persistentStateRequired) {
    persistentState = "required";
  }

  if (keySystem.distinctiveIdentifierRequired) {
    distinctiveIdentifier = "required";
  }

  // TODO Widevine robustnesses should only be indicated for... Widevine-based
  // encryption
  var videoRobustnesses = keySystem.videoRobustnesses || EME_DEFAULT_WIDEVINE_ROBUSTNESSES;
  var audioRobustnesses = keySystem.audioRobustnesses || EME_DEFAULT_WIDEVINE_ROBUSTNESSES;

  // From the W3 EME spec, we have to provide videoCapabilities and
  // audioCapabilities.
  // These capabilities must specify a codec (even though your stream can use
  // a completely different codec afterward).
  // It is also strongly recommended to specify the required security
  // robustness. As we do not want to forbide any security level, we specify
  // every existing security level from highest to lowest so that the best
  // security level is selected.
  // More details here:
  // https://storage.googleapis.com/wvdocs/Chrome_EME_Changes_and_Best_Practices.pdf
  // https://www.w3.org/TR/encrypted-media/#get-supported-configuration-and-consent
  var videoCapabilities = videoRobustnesses.map(function (robustness) {
    return {
      contentType: "video/mp4;codecs=\"avc1.4d401e\"", // standard mp4 codec
      robustness: robustness
    };
  });
  var audioCapabilities = audioRobustnesses.map(function (robustness) {
    return {
      contentType: "audio/mp4;codecs=\"mp4a.40.2\"", // standard mp4 codec
      robustness: robustness
    };
  });

  return [{
    initDataTypes: ["cenc"],
    videoCapabilities: videoCapabilities,
    audioCapabilities: audioCapabilities,
    distinctiveIdentifier: distinctiveIdentifier,
    persistentState: persistentState,
    sessionTypes: sessionTypes
  }, {
    // add another with no {audio,video}Capabilities for some legacy browsers.
    // As of today's spec, this should return NotSupported but the first
    // candidate configuration should be good, so whe should have no downside
    // doing that.
    initDataTypes: ["cenc"],
    videoCapabilities: undefined,
    audioCapabilities: undefined,
    distinctiveIdentifier: distinctiveIdentifier,
    persistentState: persistentState,
    sessionTypes: sessionTypes
  }];
}

/**
 * Try to find a compatible key system from the keySystems array given.
 *
 * Returns an Observable which, when subscribed to, will request a
 * MediaKeySystemAccess based on the various keySystems provided. This
 * Observable will:
 *   - emit the MediaKeySystemAccess and the keySystems as an object, when
 *     found. The object is under this form:
 *     {
 *       keySystemAccess {MediaKeySystemAccess}
 *       keySystem {Object}
 *     }
 *   - complete immediately after emitting.
 *   - throw if no  compatible key system has been found.
 *
 * @param {Array.<Object>} keySystems - The keySystems you want to test.
 * @returns {Observable}
 */
function findCompatibleKeySystem(keySystems, instanceInfos) {
  // Fast way to find a compatible keySystem if the currently loaded
  // one as exactly the same compatibility options.
  var cachedKeySystemAccess = getCachedKeySystemAccess(keySystems, instanceInfos);
  if (cachedKeySystemAccess) {
    __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].debug("eme: found compatible keySystem quickly", cachedKeySystemAccess);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(cachedKeySystemAccess);
  }

  /**
   * Array of set keySystems for this content.
   * Each item of this array is an object containing two keys:
   *   - keyType {string}: keySystem type
   *   - keySystem {Object}: the original keySystem object
   * @type {Array.<Object>}
   */
  var keySystemsType = keySystems.reduce(function (arr, keySystem) {
    return arr.concat((EME_KEY_SYSTEMS[keySystem.type] || []).map(function (keyType) {
      return { keyType: keyType, keySystem: keySystem };
    }));
  }, []);

  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(function (obs) {
    var disposed = false;
    var sub = null;

    /**
     * Test the key system as defined in keySystemsType[index].
     * @param {Number} index
     */
    function testKeySystem(index) {
      // completely quit the loop if unsubscribed
      if (disposed) {
        return;
      }

      // if we iterated over the whole keySystemsType Array, quit on error
      if (index >= keySystemsType.length) {
        obs.error(new __WEBPACK_IMPORTED_MODULE_4__errors__["c" /* EncryptedMediaError */]("INCOMPATIBLE_KEYSYSTEMS", null, true));
        return;
      }

      var _keySystemsType$index = keySystemsType[index],
          keyType = _keySystemsType$index.keyType,
          keySystem = _keySystemsType$index.keySystem;

      var keySystemConfigurations = buildKeySystemConfigurations(keySystem);

      __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].debug("eme: request keysystem access " + keyType + "," + (index + 1 + " of " + keySystemsType.length), keySystemConfigurations);

      sub = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__compat__["g" /* requestMediaKeySystemAccess */])(keyType, keySystemConfigurations).subscribe(function (keySystemAccess) {
        __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].info("eme: found compatible keysystem", keyType, keySystemConfigurations);
        obs.next({ keySystem: keySystem, keySystemAccess: keySystemAccess });
        obs.complete();
      }, function () {
        __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].debug("eme: rejected access to keysystem", keyType, keySystemConfigurations);
        sub = null;
        testKeySystem(index + 1);
      });
    }

    testKeySystem(0);

    return function () {
      disposed = true;
      if (sub) {
        sub.unsubscribe();
      }
    };
  });
}

function getKeySystem() {
  var instanceInfos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return instanceInfos.$keySystem && instanceInfos.$keySystem.type;
}



/* harmony default export */ __webpack_exports__["a"] = (findCompatibleKeySystem);

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return trySettingServerCertificate; });
/* unused harmony export setServerCertificate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_castToObservable_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors__ = __webpack_require__(6);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * Call the setServerCertificate API with the given certificate.
 * Complete when worked, throw when failed.
 *
 * TODO Manage success?
 * From the spec:
 *   - setServerCertificate resolves with true if everything worked
 *   - it resolves with false if the CDM does not support server
 *     certificates.
 *
 * @param {MediaKeys} mediaKeys
 * @param {ArrayBuffer} serverCertificate
 * @returns {Observable}
 */
function setServerCertificate(mediaKeys, serverCertificate) {
  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].defer(function () {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_castToObservable_js__["a" /* default */])(mediaKeys.setServerCertificate(serverCertificate)).ignoreElements().catch(function (error) {
      throw new __WEBPACK_IMPORTED_MODULE_2__errors__["c" /* EncryptedMediaError */]("LICENSE_SERVER_CERTIFICATE_ERROR", error, true);
    });
  });
}

/**
 * Call the setCertificate API. If it fails just emit the error through the
 * errorStream and complete.
 * @param {MediaKeys} mediaKeys
 * @param {ArrayBuffer} serverCertificate
 * @returns {Observable}
 */
function trySettingServerCertificate(mediaKeys, serverCertificate, errorStream) {
  return setServerCertificate(mediaKeys, serverCertificate).catch(function (error) {
    error.fatal = false;
    errorStream.next(error);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
  });
}



/* unused harmony default export */ var _unused_webpack_default_export = (setServerCertificate);

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_util_TimeoutError__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_util_TimeoutError___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_util_TimeoutError__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_rx_tryCatch_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_castToObservable_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_retry__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__compat_events_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__errors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_js__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__globals_js__ = __webpack_require__(36);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


















function createMessage(name, session, options) {
  return { type: "eme", value: __WEBPACK_IMPORTED_MODULE_0_object_assign___default()({ name: name, session: session }, options) };
}

/*
 * listen to "message" events from session containing a challenge
 * blob and map them to licenses using the getLicense method from
 * selected keySystem.
 * @param {MediaKeySession} session
 * @param {Object} keySystem
 * @param {Subject} errorStream
 * @returns {Observable}
 */
function sessionEventsHandler(session, keySystem, errorStream) {
  __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].debug("eme: handle message events", session);
  var sessionId = void 0;

  function licenseErrorSelector(error, fatal) {
    if (error.type === __WEBPACK_IMPORTED_MODULE_7__errors__["a" /* ErrorTypes */].ENCRYPTED_MEDIA_ERROR) {
      error.fatal = fatal;
      return error;
    } else {
      return new __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* EncryptedMediaError */]("KEY_LOAD_ERROR", error, fatal);
    }
  }

  var getLicenseRetryOptions = {
    totalRetry: 2,
    retryDelay: 200,
    errorSelector: function errorSelector(error) {
      return licenseErrorSelector(error, true);
    },
    onRetry: function onRetry(error) {
      return errorStream.next(licenseErrorSelector(error, false));
    }
  };

  var keyErrors = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__compat_events_js__["h" /* onKeyError */])(session).map(function (error) {
    throw new __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* EncryptedMediaError */]("KEY_ERROR", error, true);
  });

  var keyStatusesChanges = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__compat_events_js__["j" /* onKeyStatusesChange */])(session).mergeMap(function (keyStatusesEvent) {
    sessionId = keyStatusesEvent.sessionId;
    __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].debug("eme: keystatuseschange event", sessionId, session, keyStatusesEvent);

    // find out possible errors associated with this event
    session.keyStatuses.forEach(function (keyId, keyStatus) {
      // TODO: remove this hack present because the order of the
      // arguments has changed in spec and is not the same between
      // Edge and Chrome.
      var reason = __WEBPACK_IMPORTED_MODULE_8__constants_js__["a" /* KEY_STATUS_ERRORS */][keyStatus] || __WEBPACK_IMPORTED_MODULE_8__constants_js__["a" /* KEY_STATUS_ERRORS */][keyId];
      if (reason) {
        throw new __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* EncryptedMediaError */]("KEY_STATUS_CHANGE_ERROR", keyStatus, true);
      }
    });

    // otherwise use the keysystem handler if disponible
    if (!keySystem.onKeyStatusesChange) {
      __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].info("eme: keystatuseschange event not handled");
      return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].empty();
    }

    var license = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_rx_tryCatch_js__["a" /* default */])(function () {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_castToObservable_js__["a" /* default */])(keySystem.onKeyStatusesChange(keyStatusesEvent, session));
    });

    return license.catch(function (error) {
      throw new __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* EncryptedMediaError */]("KEY_STATUS_CHANGE_ERROR", error, true);
    });
  });

  var keyMessages = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__compat_events_js__["i" /* onKeyMessage */])(session).mergeMap(function (messageEvent) {
    sessionId = messageEvent.sessionId;

    var message = new Uint8Array(messageEvent.message);
    var messageType = messageEvent.messageType || "license-request";

    __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].debug("eme: event message type " + messageType, session, messageEvent);

    var getLicense = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].defer(function () {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_castToObservable_js__["a" /* default */])(keySystem.getLicense(message, messageType)).timeout(10 * 1000).catch(function (error) {
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2_rxjs_util_TimeoutError__["TimeoutError"]) {
          throw new __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* EncryptedMediaError */]("KEY_LOAD_TIMEOUT", null, false);
        } else {
          throw error;
        }
      });
    });

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_retry__["a" /* retryWithBackoff */])(getLicense, getLicenseRetryOptions);
  });

  var sessionUpdates = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].merge(keyMessages, keyStatusesChanges).concatMap(function (res) {
    __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].debug("eme: update session", sessionId, res);

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_castToObservable_js__["a" /* default */])(session.update(res, sessionId)).catch(function (error) {
      throw new __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* EncryptedMediaError */]("KEY_UPDATE_ERROR", error, true);
    }).mapTo(createMessage("session-update", session, { updatedWith: res }));
  });

  var sessionEvents = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].merge(sessionUpdates, keyErrors);
  if (session.closed) {
    return sessionEvents.takeUntil(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_castToObservable_js__["a" /* default */])(session.closed));
  } else {
    return sessionEvents;
  }
}

/**
 * Create Key Session and link MediaKeySession events to the right events
 * handlers.
 * @param {MediaKeys} mediaKeys
 * @param {string} sessionType - Either "persistent-license" or "temporary"
 * @param {Object} keySystem
 * @param {UInt8Array} initData
 * @param {Subject} errorStream
 * @returns {Observable}
 */
function createSession(mediaKeys, sessionType, keySystem, initData, errorStream) {
  __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].debug("eme: create a new " + sessionType + " session");
  var session = mediaKeys.createSession(sessionType);
  var sessionEvents = sessionEventsHandler(session, keySystem, errorStream).finally(function () {
    __WEBPACK_IMPORTED_MODULE_10__globals_js__["b" /* $loadedSessions */].deleteAndClose(session);
    __WEBPACK_IMPORTED_MODULE_10__globals_js__["a" /* $storedSessions */].delete(initData);
  }).publish();

  return { session: session, sessionEvents: sessionEvents };
}

/**
 * @param {MediaKeys} mediaKeys
 * @param {Object} keySystem
 * @param {string} sessionType - Either "persistent-license" or "temporary"
 * @param {string} initDataType
 * @param {UInt8Array} initData
 * @param {Subject} errorStream
 * @returns {Observable}
 */
function createSessionAndKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream) {
  var _createSession = createSession(mediaKeys, sessionType, keySystem, initData, errorStream),
      session = _createSession.session,
      sessionEvents = _createSession.sessionEvents;

  __WEBPACK_IMPORTED_MODULE_10__globals_js__["b" /* $loadedSessions */].add(initData, session, sessionEvents);

  __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].debug("eme: generate request", initDataType, initData);

  var generateRequest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_castToObservable_js__["a" /* default */])(session.generateRequest(initDataType, initData)).catch(function (error) {
    throw new __WEBPACK_IMPORTED_MODULE_7__errors__["c" /* EncryptedMediaError */]("KEY_GENERATE_REQUEST_ERROR", error, false);
  }).do(function () {
    if (sessionType == "persistent-license") {
      __WEBPACK_IMPORTED_MODULE_10__globals_js__["a" /* $storedSessions */].add(initData, session);
    }
  }).mapTo(createMessage("generated-request", session, { initData: initData, initDataType: initDataType }));

  return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].merge(sessionEvents, generateRequest);
}

/**
 * @param {MediaKeys} mediaKeys
 * @param {Object} keySystem
 * @param {string} sessionType - Either "persistent-license" or "temporary"
 * @param {string} initDataType
 * @param {UInt8Array} initData
 * @param {Subject} errorStream
 * @returns {Observable}
 */
function createSessionAndKeyRequestWithRetry(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream) {
  return createSessionAndKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream).catch(function (error) {
    if (error.code !== __WEBPACK_IMPORTED_MODULE_7__errors__["b" /* ErrorCodes */].KEY_GENERATE_REQUEST_ERROR) {
      throw error;
    }

    var firstLoadedSession = __WEBPACK_IMPORTED_MODULE_10__globals_js__["b" /* $loadedSessions */].getFirst();
    if (!firstLoadedSession) {
      throw error;
    }

    __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].warn("eme: could not create a new session, " + "retry after closing a currently loaded session", error);

    return __WEBPACK_IMPORTED_MODULE_10__globals_js__["b" /* $loadedSessions */].deleteAndClose(firstLoadedSession).mergeMap(function () {
      return createSessionAndKeyRequest(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream);
    });
  });
}

function createPersistentSessionAndLoad(mediaKeys, keySystem, storedSessionId, initDataType, initData, errorStream) {
  __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].debug("eme: load persisted session", storedSessionId);

  var sessionType = "persistent-license";

  var _createSession2 = createSession(mediaKeys, sessionType, keySystem, initData, errorStream),
      session = _createSession2.session,
      sessionEvents = _createSession2.sessionEvents;

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_castToObservable_js__["a" /* default */])(session.load(storedSessionId)).catch(function () {
    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(false);
  }).mergeMap(function (success) {
    if (success) {
      __WEBPACK_IMPORTED_MODULE_10__globals_js__["b" /* $loadedSessions */].add(initData, session, sessionEvents);
      __WEBPACK_IMPORTED_MODULE_10__globals_js__["a" /* $storedSessions */].add(initData, session);
      return sessionEvents.startWith(createMessage("loaded-session", session, { storedSessionId: storedSessionId }));
    } else {
      __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].warn("eme: no data stored for the loaded session, do fallback", storedSessionId);

      __WEBPACK_IMPORTED_MODULE_10__globals_js__["b" /* $loadedSessions */].deleteById(storedSessionId);
      __WEBPACK_IMPORTED_MODULE_10__globals_js__["a" /* $storedSessions */].delete(initData);

      if (session.sessionId) {
        session.remove();
      }

      return createSessionAndKeyRequestWithRetry(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream).startWith(createMessage("loaded-session-failed", session, { storedSessionId: storedSessionId }));
    }
  });
}

/**
 * @param {MediaKeys} mediaKeys
 * @param {MediaKeySystemConfiguration} mksConfig
 * @param {Object} keySystem
 * @param {string} initDataType
 * @param {UInt8Array} initData
 * @param {Subject} errorStream
 * @returns {Observable}
 */
function manageSessionCreation(mediaKeys, mksConfig, keySystem, initDataType, initData, errorStream) {
  return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].defer(function () {
    // reuse currently loaded sessions without making a new key
    // request
    var loadedSession = __WEBPACK_IMPORTED_MODULE_10__globals_js__["b" /* $loadedSessions */].get(initData);
    if (loadedSession && loadedSession.sessionId) {
      __WEBPACK_IMPORTED_MODULE_9__utils_log__["a" /* default */].debug("eme: reuse loaded session", loadedSession.sessionId);
      return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(createMessage("reuse-session", loadedSession));
    }

    var sessionTypes = mksConfig.sessionTypes;
    var persistentLicenseSupported = sessionTypes && sessionTypes.indexOf("persistent-license") >= 0;

    var sessionType = persistentLicenseSupported && keySystem.persistentLicense ? "persistent-license" : "temporary";

    if (persistentLicenseSupported && keySystem.persistentLicense) {
      var storedEntry = __WEBPACK_IMPORTED_MODULE_10__globals_js__["a" /* $storedSessions */].get(initData);

      // if a persisted session exists in the store associated to this
      // initData, we reuse it without a new license request through
      // the `load` method.
      if (storedEntry) {
        return createPersistentSessionAndLoad(mediaKeys, keySystem, storedEntry.sessionId, initDataType, initData, errorStream);
      }
    }

    // we have a fresh session without persisted informations and need
    // to make a new key request that we will associate to this
    // session
    return createSessionAndKeyRequestWithRetry(mediaKeys, keySystem, sessionType, initDataType, initData, errorStream);
  });
}

/* harmony default export */ __webpack_exports__["a"] = (manageSessionCreation);

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_castToObservable_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abstract_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hash_init_data_js__ = __webpack_require__(59);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








/**
 * Set maintaining a representation of all currently loaded
 * MediaKeySessions. This set allow to reuse sessions without re-
 * negotiating a license exchange if the key is already used in a
 * loaded session.
 */

var InMemorySessionsSet = function (_SessionSet) {
  _inherits(InMemorySessionsSet, _SessionSet);

  function InMemorySessionsSet() {
    _classCallCheck(this, InMemorySessionsSet);

    return _possibleConstructorReturn(this, _SessionSet.apply(this, arguments));
  }

  InMemorySessionsSet.prototype.getFirst = function getFirst() {
    if (this._entries.length > 0) {
      return this._entries[0].session;
    }
  };

  InMemorySessionsSet.prototype.find = function find(func) {
    for (var i = 0; i < this._entries.length; i++) {
      if (func(this._entries[i]) === true) {
        return this._entries[i];
      }
    }
    return null;
  };

  InMemorySessionsSet.prototype.get = function get(initData) {
    initData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__hash_init_data_js__["a" /* default */])(initData);
    var entry = this.find(function (e) {
      return e.initData === initData;
    });
    if (entry) {
      return entry.session;
    } else {
      return null;
    }
  };

  InMemorySessionsSet.prototype.add = function add(initData, session, sessionEvents) {
    initData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__hash_init_data_js__["a" /* default */])(initData);
    var currentSession = this.get(initData);
    if (currentSession) {
      this.deleteAndClose(currentSession);
    }

    var eventSubscription = sessionEvents.connect();
    var entry = { session: session, initData: initData, eventSubscription: eventSubscription };
    __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].debug("eme-mem-store: add session", entry);
    this._entries.push(entry);
  };

  InMemorySessionsSet.prototype.deleteById = function deleteById(sessionId) {
    var entry = this.find(function (e) {
      return e.session.sessionId === sessionId;
    });
    if (entry) {
      return this.delete(entry.session);
    } else {
      return null;
    }
  };

  InMemorySessionsSet.prototype.delete = function _delete(session_) {
    var entry = this.find(function (e) {
      return e.session === session_;
    });
    if (!entry) {
      return null;
    }

    var session = entry.session,
        eventSubscription = entry.eventSubscription;

    __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].debug("eme-mem-store: delete session", entry);
    var idx = this._entries.indexOf(entry);
    this._entries.splice(idx, 1);
    eventSubscription.unsubscribe();
    return session;
  };

  InMemorySessionsSet.prototype.deleteAndClose = function deleteAndClose(session_) {
    var session = this.delete(session_);
    if (session) {
      __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].debug("eme-mem-store: close session", session);
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_castToObservable_js__["a" /* default */])(session.close()).catch(function () {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(null);
      });
    } else {
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(null);
    }
  };

  InMemorySessionsSet.prototype.dispose = function dispose() {
    var _this2 = this;

    var disposed = this._entries.map(function (e) {
      return _this2.deleteAndClose(e.session);
    });
    this._entries = [];
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge.apply(null, disposed);
  };

  return InMemorySessionsSet;
}(__WEBPACK_IMPORTED_MODULE_3__abstract_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (InMemorySessionsSet);

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_memory_js__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__persisted_js__ = __webpack_require__(114);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__in_memory_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__persisted_js__["a"]; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hash_init_data_js__ = __webpack_require__(59);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Set representing persisted licenses. Depends on a simple local-
 * storage implementation with a `save`/`load` synchronous interface
 * to persist informations on persisted sessions.
 *
 * This set is used only for a cdm/keysystem with license persistency
 * supported.
 */

var PersistedSessionsSet = function (_SessionSet) {
  _inherits(PersistedSessionsSet, _SessionSet);

  function PersistedSessionsSet(storage) {
    _classCallCheck(this, PersistedSessionsSet);

    var _this = _possibleConstructorReturn(this, _SessionSet.call(this));

    _this.setStorage(storage);
    return _this;
  }

  PersistedSessionsSet.prototype.setStorage = function setStorage(storage) {
    if (this._storage === storage) {
      return;
    }

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_assert__["a" /* default */])(storage, "no licenseStorage given for keySystem with persistentLicense");

    __WEBPACK_IMPORTED_MODULE_1__utils_assert__["a" /* default */].iface(storage, "licenseStorage", { save: "function", load: "function" });

    this._storage = storage;
    try {
      this._entries = this._storage.load();
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_assert__["a" /* default */])(Array.isArray(this._entries));
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].warn("eme-persitent-store: could not get entries from license storage", e);
      this.dispose();
    }
  };

  PersistedSessionsSet.prototype.get = function get(initData) {
    initData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__hash_init_data_js__["a" /* default */])(initData);
    var entry = this.find(function (e) {
      return e.initData === initData;
    });
    return entry || null;
  };

  PersistedSessionsSet.prototype.add = function add(initData, session) {
    var sessionId = session && session.sessionId;
    if (!sessionId) {
      return;
    }

    initData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__hash_init_data_js__["a" /* default */])(initData);
    var currentEntry = this.get(initData);
    if (currentEntry && currentEntry.sessionId === sessionId) {
      return;
    }

    if (currentEntry) {
      this.delete(initData);
    }

    __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].info("eme-persitent-store: add new session", sessionId, session);
    this._entries.push({ sessionId: sessionId, initData: initData });
    this._save();
  };

  PersistedSessionsSet.prototype.delete = function _delete(initData) {
    initData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__hash_init_data_js__["a" /* default */])(initData);

    var entry = this.find(function (e) {
      return e.initData === initData;
    });
    if (entry) {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].warn("eme-persitent-store: delete session from store", entry);

      var idx = this._entries.indexOf(entry);
      this._entries.splice(idx, 1);
      this._save();
    }
  };

  PersistedSessionsSet.prototype.dispose = function dispose() {
    this._entries = [];
    this._save();
  };

  PersistedSessionsSet.prototype._save = function _save() {
    try {
      this._storage.save(this._entries);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].warn("eme-persitent-store: could not save licenses in localStorage");
    }
  };

  return PersistedSessionsSet;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (PersistedSessionsSet);

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export setMediaKeys */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return disposeMediaKeys; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__globals_js__ = __webpack_require__(36);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Set the MediaKeys object on the videoElement.
 * @param {MediaKeys} mediaKeys
 * @param {Object} mksConfig - MediaKeySystemConfiguration used
 * @param {HTMLMediaElement} video
 * @param {Object} keySystem
 * @param {Object} instceInfos
 * @returns {Observable}
 */
function setMediaKeysObs(mediaKeys, mksConfig, video, keySystem, instceInfos) {
  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].defer(function () {
    var $videoElement = instceInfos.$videoElement,
        $mediaKeys = instceInfos.$mediaKeys;

    var oldVideoElement = $videoElement;
    var oldMediaKeys = $mediaKeys;

    instceInfos.$mediaKeys = mediaKeys;
    instceInfos.$mediaKeySystemConfiguration = mksConfig;
    instceInfos.$keySystem = keySystem;
    instceInfos.$videoElement = video;

    if (video.mediaKeys === mediaKeys) {
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(mediaKeys);
    }

    if (oldMediaKeys && oldMediaKeys !== mediaKeys) {
      // if we change our mediaKeys singleton, we need to dispose all existing
      // sessions linked to the previous one.
      __WEBPACK_IMPORTED_MODULE_3__globals_js__["b" /* $loadedSessions */].dispose();
    }

    var mediaKeysSetter = void 0;
    if (oldVideoElement && oldVideoElement !== video) {
      __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].debug("eme: unlink old video element and set mediakeys");
      mediaKeysSetter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__compat__["h" /* setMediaKeys */])(oldVideoElement, null).concat(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__compat__["h" /* setMediaKeys */])(video, mediaKeys));
    } else {
      __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].debug("eme: set mediakeys");
      mediaKeysSetter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__compat__["h" /* setMediaKeys */])(video, mediaKeys);
    }

    return mediaKeysSetter.mapTo(mediaKeys);
  });
}

function disposeMediaKeys(videoElement) {
  if (videoElement) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__compat__["h" /* setMediaKeys */])(videoElement, null);
  }
  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
}


/* harmony default export */ __webpack_exports__["a"] = (setMediaKeysObs);

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeManifest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getCodec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return updateManifest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_array_includes_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_url__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__errors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_languages__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manifest__ = __webpack_require__(140);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * TODO That file here should be progressively removed:
 *   - the net directory contains transport utils which include manifest
 *     parsers.
 *
 *   - the manifest directory defines a common class for manifest and sub-parts
 *     of a manifest.
 *
 * The best may be to have what is returned by net directly fed to the
 * instanciation of the manifest class.
 *
 * Due to that, some parts should be moved to net/, other to manifest/.
 *
 * Kept for now, as it just werks, but this might become a problem for
 * maintability and future evolutions.
 */











/**
 * Representation keys directly inherited from the adaptation.
 * If any of those keys are in an adaptation but not in one of its
 * representation, it will be inherited.
 */
var representationBaseType = ["audioSamplingRate", "codecs", "codingDependency", "frameRate", "height", "index", "maxPlayoutRate", "maximumSAPPeriod", "mimeType", "profiles", "segmentProfiles", "width"];

var uniqueId = 0;
var SUPPORTED_ADAPTATIONS_TYPE = ["audio", "video", "text", "image"];

function parseBaseURL(manifest) {
  var baseURL = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_url__["a" /* normalizeBaseURL */])(manifest.locations[0]);
  var period = manifest.periods[0];
  if (period && period.baseURL) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_url__["b" /* resolveURL */])(baseURL, period.baseURL);
  }
  return baseURL;
}

/**
 * @param {string} url - the manifest's url
 * @param {Object} manifest - the parsed manifest
 * @param {Array.<Object>|Object} externalTextTracks - Will be added to the
 * manifest as an adaptation.
 * @param {Array.<Object>|Object} externalImageTracks - Will be added to the
 * manifest as an adaptation.
 *
 * @throws MediaError - throw if the manifest has no transportType set
 * @throws MediaError - Throws if one of the periods has no id property defined
 *
 * @throws MediaError - Throws if one of the periods has no adaptation in the
 * types understood by the RxPlayer
 *
 * @throws MediaError - Throws if one of the periods has no representation in a
 * codec supported by the browser
 *
 * @throws MediaError - Throws if one of the adaptations has no id property
 * defined
 *
 * @throws MediaError - Throws if one of the adaptations does not have any type
 *
 * @throws MediaError - Throws if one of the representations has no id property
 * defined
 *
 * @returns {Object}
 */
function normalizeManifest(url, manifest, externalTextTracks, externalImageTracks) {
  // transportType == "smooth"|"dash"
  if (!manifest.transportType) {
    throw new __WEBPACK_IMPORTED_MODULE_5__errors__["f" /* MediaError */]("MANIFEST_PARSE_ERROR", null, true);
  }

  // TODO cleaner ID
  manifest.id = manifest.id || "gen-manifest-" + uniqueId++;

  // "static"|"dynamic"
  manifest.type = manifest.type || "static";
  manifest.isLive = manifest.type == "dynamic";

  var locations = manifest.locations;
  if (!locations || !locations.length) {
    manifest.locations = [url];
  }

  var rootURL = parseBaseURL(manifest);

  // TODO(pierre): support multi-locations/cdns
  var inherit = {
    rootURL: rootURL, // TODO needed for inheritance?
    baseURL: manifest.baseURL, // TODO so manifest.baseURL is more important
    // than manifest.periods[0].baseURL?
    // TODO needed for inheritance?
    isLive: manifest.isLive // TODO needed for inheritance?
  };

  var periods = manifest.periods.map(function (period) {
    return normalizePeriod(period, inherit, externalTextTracks, externalImageTracks);
  });

  // TODO(pierre): support multiple periods
  manifest = assignAndClone(manifest, periods[0]);
  manifest.periods = null;

  if (!manifest.duration) {
    manifest.duration = Infinity;
  }

  if (manifest.isLive) {
    manifest.suggestedPresentationDelay = manifest.suggestedPresentationDelay || 0;

    manifest.availabilityStartTime = manifest.availabilityStartTime || 0;
  }

  return new __WEBPACK_IMPORTED_MODULE_7__manifest__["a" /* default */](manifest);
}

// /**
//  * Put every IDs from the manifest in an array.
//  * It collects the ID from:
//  *   - the manifest
//  *   - the periods
//  *   - the adaptations
//  *   - the representations
//  *
//  * Can be used to ensure a newly created ID is not yet already defined.
//  *
//  * @param {Object} manifest
//  * @param {Array.<string|Number>}
//  */
// function collectEveryIDs(manifest) {
//   const currentIDs = [];

//   if (manifest.id != null) {
//     currentIDs.push(manifest.id);
//   }

//   manifest.periods.forEach(period => {
//     if (period.id != null) {
//       currentIDs.push(period.id);
//     }
//     period.adaptations.forEach(adaptation => {
//       if (adaptation.id != null) {
//         currentIDs.push(adaptation.id);
//       }
//       adaptation.representation.forEach(representation => {
//         if (representation.id != null) {
//           currentIDs.push(representation.id);
//         }
//       });
//     });
//   });

//   return currentIDs;
// }

// /**
//  * Set IDs if they are not found for:
//  */
// function setMissingIDs(manifest) {
//   const currentIDs = [];

//   if (manifest.id != null) {
//     currentIDs.push(manifest.id);
//   }

//   manifest.periods.forEach(period => {
//     if (period.id != null) {
//       currentIDs.push(period.id);
//     }
//     period.adaptations.forEach(adaptation => {
//       if (adaptation.id != null) {
//         currentIDs.push(adaptation.id);
//       }
//       adaptation.representation.forEach(representation => {
//         if (representation.id != null) {
//           currentIDs.push(representation.id);
//         }
//       });
//     });
//   });

//   if (manifest.id == null) {
//     let IDBase = 0;
//     const basename = "manifest-";
//     while (currentIDs.include(basename + ++IDBase)) {
//       if (IDBase === Number.MAX_VALUE) {
//         throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
//       }
//     }
//     manifest.id = basename + IDBase;
//     currentIDs.push(manifest.id);
//   }

//   manifest.periods.forEach(period => {
//     if (period.id == null) {
//       let IDBase = 0;
//       const basename = "period-";
//       while (currentIDs.include(basename + ++IDBase)) {
//         if (IDBase === Number.MAX_VALUE) {
//           throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
//         }
//       }
//       period.id = basename + IDBase;
//       currentIDs.push(period.id);
//     }
//     period.adaptations.forEach(adaptation => {
//       if (adaptation.id == null) {
//         let IDBase = 0;
//         const basename = "adaptation-";
//         while (currentIDs.include(basename + ++IDBase)) {
//           if (IDBase === Number.MAX_VALUE) {
//             throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
//           }
//         }
//         adaptation.id = basename + IDBase;
//         currentIDs.push(adaptation.id);
//       }
//       adaptation.representation.forEach(representation => {
//         if (representation.id == null) {
//           let IDBase = 0;
//           const basename = "representation-";
//           while (currentIDs.include(basename + ++IDBase)) {
//             if (IDBase === Number.MAX_VALUE) {
//               throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
//             }
//           }
//           representation.id = basename + IDBase;
//           currentIDs.push(representation.id);
//         }
//       });
//     });
//   });
// }

/**
 * @param {Object} period
 * @param {Object} inherit
 * @param {Array.<Object>|Object} [addedTextTracks]
 * @param {Array.<Object>|Object} [addedImageTracks]
 *
 * @throws MediaError - Throws if the period has no id property defined
 *
 * @throws MediaError - Throws if the period has no adaptation in the types
 * understood by the RxPlayer
 *
 * @throws MediaError - Throws if the period has no representation in a codec
 * supported by the browser
 *
 * @throws MediaError - Throws if one of the adaptations has no id property
 * defined
 *
 * @throws MediaError - Throws if one of the adaptations does not have any type
 *
 * @throws MediaError - Throws if one of the representations has no id property
 * defined
 *
 * @returns {Object} period
 */
function normalizePeriod(period, inherit, externalTextTracks, externalImageTracks) {
  if (typeof period.id == "undefined") {
    // TODO cleaner ID
    period.id = "gen-period-" + uniqueId++;

    // TODO Generate ID higher and throw here?
    // throw new MediaError("MANIFEST_PARSE_ERROR", null, true);
  }

  var adaptations = period.adaptations.map(function (adaptation) {
    return normalizeAdaptation(adaptation, inherit);
  });

  if (externalTextTracks) {
    adaptations.push.apply(adaptations, normalizeSupplementaryTextTracks(externalTextTracks).map(function (adaptation) {
      return normalizeAdaptation(adaptation, inherit);
    }));
  }

  if (externalImageTracks) {
    adaptations.push.apply(adaptations, normalizeSupplementaryImageTracks(externalImageTracks).map(function (adaptation) {
      return normalizeAdaptation(adaptation, inherit);
    }));
  }

  // filter out adaptations from unsupported types
  var filteredAdaptations = adaptations.filter(function (adaptation) {
    if (SUPPORTED_ADAPTATIONS_TYPE.indexOf(adaptation.type) < 0) {
      __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].info("not supported adaptation type", adaptation.type);
      return false;
    } else {
      return true;
    }
  });

  if (filteredAdaptations.length === 0) {
    throw new __WEBPACK_IMPORTED_MODULE_5__errors__["f" /* MediaError */]("MANIFEST_PARSE_ERROR", null, true);
  }

  var adaptationsByType = {};

  // construct adaptationsByType object
  for (var i = 0; i < filteredAdaptations.length; i++) {
    var adaptation = filteredAdaptations[i];
    var adaptationReps = adaptation.representations;
    var adaptationType = adaptation.type;

    if (!adaptationsByType[adaptationType]) {
      adaptationsByType[adaptationType] = [];
    }

    // only keep adaptations that have at least one representation
    if (adaptationReps.length > 0) {
      adaptationsByType[adaptationType].push(adaptation);
    }
  }

  // TODO Throwing this way is ugly and could not work with future improvements
  // Find better way to really detect if the codecs are incompatible
  for (var _adaptationType in adaptationsByType) {
    if (adaptationsByType[_adaptationType].length === 0) {
      throw new __WEBPACK_IMPORTED_MODULE_5__errors__["f" /* MediaError */]("MANIFEST_INCOMPATIBLE_CODECS_ERROR", null, true);
    }
  }

  period.adaptations = adaptationsByType;
  return period;
}

/**
 * TODO perform some cleanup like adaptations.index (indexes are
 * in the representations)
 *
 * @param {Object} initialAdaptation
 * @param {Object} inherit
 *
 * @throws MediaError - Throws if the adaptation has no id property defined
 * @throws MediaError - Throws if the adaptation does not have any type
 * @throws MediaError - Throws if one of the representations has no id property
 * defined
 *
 * @returns {Object} adaptation
 */
function normalizeAdaptation(initialAdaptation, inherit) {
  if (typeof initialAdaptation.id == "undefined") {
    throw new __WEBPACK_IMPORTED_MODULE_5__errors__["f" /* MediaError */]("MANIFEST_PARSE_ERROR", null, true);
  }

  var adaptation = assignAndClone(inherit, initialAdaptation);

  // representations in this adaptation will inherit the props of this object
  var toInheritFromAdaptation = {};
  representationBaseType.forEach(function (baseType) {
    if (baseType in adaptation) {
      toInheritFromAdaptation[baseType] = adaptation[baseType];
    }
  });

  var representations = adaptation.representations.map(function (representation) {
    return normalizeRepresentation(representation, toInheritFromAdaptation, adaptation.rootURL, adaptation.baseURL);
  }).sort(function (a, b) {
    return a.bitrate - b.bitrate;
  }); // bitrate ascending

  var type = adaptation.type,
      _adaptation$accessibi = adaptation.accessibility,
      accessibility = _adaptation$accessibi === undefined ? [] : _adaptation$accessibi;

  if (!type) {
    throw new __WEBPACK_IMPORTED_MODULE_5__errors__["f" /* MediaError */]("MANIFEST_PARSE_ERROR", null, true);
  }

  if (type == "video" || type == "audio") {
    representations = representations.filter(function (representation) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__compat__["p" /* isCodecSupported */])(getCodec(representation));
    });

    if (type === "audio") {
      var isAudioDescription = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_array_includes_js__["a" /* default */])(accessibility, "visuallyImpaired");
      adaptation.audioDescription = isAudioDescription;
    }
  } else if (type === "text") {
    var isHardOfHearing = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_array_includes_js__["a" /* default */])(accessibility, "hardOfHearing");
    adaptation.closedCaption = isHardOfHearing;
  }

  adaptation.representations = representations;
  adaptation.bitrates = representations.map(function (rep) {
    return rep.bitrate;
  });
  return adaptation;
}

/**
 * @param {Object} initialRepresentation
 * @param {Object} inherit
 * @param {string} [rootURL]
 * @param {string} [baseURL]
 *
* @throws MediaError - Throws if the representation has no id property defined
*
 * @returns {Object}
 */
function normalizeRepresentation(initialRepresentation, inherit, rootURL, baseURL) {
  if (typeof initialRepresentation.id == "undefined") {
    throw new __WEBPACK_IMPORTED_MODULE_5__errors__["f" /* MediaError */]("MANIFEST_PARSE_ERROR", null, true);
  }

  var representation = assignAndClone(inherit, initialRepresentation);

  representation.index = representation.index || {};
  if (!representation.index.timescale) {
    representation.index.timescale = 1;
  }

  if (!representation.bitrate) {
    representation.bitrate = 1;
  }

  // Fix issue in some packagers, like GPAC, generating a non
  // compliant mimetype with RFC 6381. Other closed-source packagers
  // may be impacted.
  if (representation.codecs == "mp4a.40.02") {
    representation.codecs = "mp4a.40.2";
  }

  representation.baseURL = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_url__["b" /* resolveURL */])(rootURL, baseURL, representation.baseURL);
  representation.codec = representation.codecs;
  return representation;
}

/**
 * Normalize text tracks Object/Array to a normalized manifest adaptation.
 * @param {Array.<Object>|Object} subtitles
 * @returns {Array.<Object>}
 */
function normalizeSupplementaryTextTracks(textTracks) {
  var _textTracks = Array.isArray(textTracks) ? textTracks : [textTracks];
  return _textTracks.reduce(function (allSubs, _ref) {
    var mimeType = _ref.mimeType,
        codecs = _ref.codecs,
        url = _ref.url,
        language = _ref.language,
        languages = _ref.languages,
        closedCaption = _ref.closedCaption;

    if (language) {
      languages = [language];
    }

    return allSubs.concat(languages.map(function (language) {
      return {
        // TODO cleaner ID
        id: "gen-text-ada-" + uniqueId++,
        type: "text",
        language: language,
        normalizedLanguage: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_languages__["a" /* normalize */])(language),
        accessibility: closedCaption ? ["hardOfHearing"] : [],
        baseURL: url,
        representations: [{
          // TODO cleaner ID
          id: "gen-text-rep-" + uniqueId++,
          mimeType: mimeType,
          codecs: codecs,
          index: {
            indexType: "template",
            duration: Number.MAX_VALUE,
            timescale: 1,
            startNumber: 0
          }
        }]
      };
    }));
  }, []);
}

/**
 * Normalize image tracks Object/Array to a normalized manifest adaptation.
 * @param {Array.<Object>|Object} images
 * @returns {Array.<Object>}
 */
function normalizeSupplementaryImageTracks(imageTracks) {
  var _imageTracks = Array.isArray(imageTracks) ? imageTracks : [imageTracks];
  return _imageTracks.map(function (_ref2) {
    var mimeType = _ref2.mimeType,
        url = _ref2.url;

    return {
      // TODO cleaner ID
      id: "gen-image-ada-" + uniqueId++,
      type: "image",
      baseURL: url,
      representations: [{
        // TODO cleaner ID
        id: "gen-image-rep-" + uniqueId++,
        mimeType: mimeType,
        index: {
          indexType: "template",
          duration: Number.MAX_VALUE,
          timescale: 1,
          startNumber: 0
        }
      }]
    };
  });
}

/**
 * Returns an object which is a merge of all arguments given
 * (Object.assign-like) but with all the corresponding merged attributes
 * cloned (they do not share the same references than the original attributes).
 *
 * This is useful to keep representations, for example, sharing inherited
 * Objects to also share their references. In that case, an update of a single
 * representation would update every other one.
 *
 * @param {...Object} args
 * @returns {Object}
 */
function assignAndClone() {
  var res = {};

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = args.length - 1; i >= 0; i--) {
    var arg = args[i];
    for (var attr in arg) {
      if (res.hasOwnProperty(attr)) {
        continue;
      }

      var val = arg[attr];
      if (val && (typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
        if (val instanceof Date) {
          res[attr] = new Date(val.getTime());
        } else if (Array.isArray(val)) {
          res[attr] = val.slice(0);
        } else {
          res[attr] = assignAndClone(val);
        }
      } else {
        res[attr] = val;
      }
    }
  }

  return res;
}

// XXX TODO Check and re-check the id thing
function updateManifest(oldManifest, newManifest) {
  var findElementFromId = function findElementFromId(id, elements) {
    return __WEBPACK_IMPORTED_MODULE_0_array_find___default()(elements, function (obj) {
      return obj.id === id;
    });
  };

  var oldAdaptations = oldManifest.getAdaptations();
  var newAdaptations = newManifest.getAdaptations();

  for (var i = 0; i < oldAdaptations.length; i++) {
    var newAdaptation = findElementFromId(oldAdaptations[i].id, newAdaptations);

    if (!newAdaptation) {
      __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].warn("manifest: adaptation \"" + oldAdaptations[i].id + "\" not found when merging.");
    } else {
      var oldRepresentations = oldAdaptations[i].representations;
      var newRepresentations = newAdaptation.representations;
      for (var j = 0; j < oldRepresentations.length; j++) {
        var newRepresentation = findElementFromId(oldRepresentations[j].id, newRepresentations);

        if (!newRepresentation) {
          __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].warn("manifest: representation \"" + oldRepresentations[j].id + "\" not found when merging.");
        } else {
          oldRepresentations[j].index.update(newRepresentation.index);
        }
      }
    }
  }
  return oldManifest;
}

/**
 * Construct the codec string from given codecs and mimetype.
 * @param {Object} representation
 * @returns {string}
 */
function getCodec(representation) {
  var codec = representation.codec,
      mimeType = representation.mimeType;

  return mimeType + ";codecs=\"" + codec + "\"";
}



/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_backoff_js__ = __webpack_require__(69);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Called on a pipeline's loader error.
 * Returns whether the loader request should be retried.
 * @param {Error} error
 * @returns {Boolean}
 */
function shouldRetry(error) {
  if (!(error instanceof __WEBPACK_IMPORTED_MODULE_1__errors__["h" /* RequestError */])) {
    return false;
  }
  if (error.type === __WEBPACK_IMPORTED_MODULE_1__errors__["j" /* RequestErrorTypes */].ERROR_HTTP_CODE) {
    return error.status >= 500 || error.status == 404;
  }
  return error.type === __WEBPACK_IMPORTED_MODULE_1__errors__["j" /* RequestErrorTypes */].TIMEOUT || error.type === __WEBPACK_IMPORTED_MODULE_1__errors__["j" /* RequestErrorTypes */].ERROR_EVENT;
}

function isOfflineError(error) {
  return error.type === __WEBPACK_IMPORTED_MODULE_1__errors__["j" /* RequestErrorTypes */].ERROR_EVENT && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__compat__["q" /* isOffline */])();
}

/**
 * Specific exponential backoff algorithm used for segments/manifest
 * downloading.
 *
 * The specificty here in comparaison to a "regular" backoff algorithm is
 * the separation between type of errors:
 *   - "offline" errors
 *   - other xhr errors
 * Both have their own counters which are resetted if the error type changes.
 * @param {Observable}
 * @param {Object} options
 * @param {Number} options.baseDelay - First delay set when and if:
 *   - the first observable throws
 *   - any observable throws an error which has a type different than the last
 *     one.
 * @param {Number} options.maxDelay - Maximum delay considered for the backoff.
 * Note that this delay is not exact as it will be "fuzzed".
 * @param {Number} options.maxRetryRegular - Maximum number of retry for
 * "regular" errors. That is, errors that are most likely due to the CDN.
 * @param {Number} options.maxRetryOffline - Maximum number of retry for
 * "offline" errors. That is, errors that are most likely due to the user being
 * offline.
 * @param {Function} [options.onRetry] - callback to call as an observable
 * throws. Will be called with two arguments:
 *   - The error thrown by the observable.
 *   - The counter for the current error type.
 * @returns {Observable}
 */
function downloadingBackoff(obs$, options) {
  var baseDelay = options.baseDelay,
      maxDelay = options.maxDelay,
      maxRetryRegular = options.maxRetryRegular,
      maxRetryOffline = options.maxRetryOffline,
      onRetry = options.onRetry;

  var retryCount = 0;

  var ERROR_TYPES = {
    NONE: 0,
    REGULAR: 1,
    OFFLINE: 2
  };

  var lastError = ERROR_TYPES.NONE;
  return obs$.catch(function (error, source) {
    if (!shouldRetry(error)) {
      throw error;
    }

    var currentError = isOfflineError(error) ? ERROR_TYPES.OFFLINE : ERROR_TYPES.REGULAR;

    var maxRetry = currentError === ERROR_TYPES.OFFLINE ? maxRetryOffline : maxRetryRegular;

    if (currentError !== lastError) {
      retryCount = 0;
      lastError = currentError;
    }

    if (++retryCount > maxRetry) {
      throw error;
    }

    if (onRetry) {
      onRetry(error, retryCount);
    }

    var delay = Math.min(baseDelay * Math.pow(2, retryCount - 1), maxDelay);

    var fuzzedDelay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_backoff_js__["b" /* getFuzzedDelay */])(delay);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].timer(fuzzedDelay).mergeMap(function () {
      return source;
    });
  });
}

/* harmony default export */ __webpack_exports__["a"] = (downloadingBackoff);

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createPipeline;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__errors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_array_includes_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_rx_tryCatch_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_castToObservable_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__backoff_js__ = __webpack_require__(117);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */














var DEFAULT_MAXIMUM_RETRY_ON_ERROR = __WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].DEFAULT_MAX_PIPELINES_RETRY_ON_ERROR;

var DEFAULT_MAXIMUM_RETRY_ON_OFFLINE = __WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].DEFAULT_MAX_PIPELINES_RETRY_ON_OFFLINE;

var MAX_BACKOFF_DELAY_BASE = __WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].MAX_BACKOFF_DELAY_BASE,
    INITIAL_BACKOFF_DELAY_BASE = __WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].INITIAL_BACKOFF_DELAY_BASE;

/**
 * Generate a new error from the infos given.
 * Also attach the pipeline type (audio/manifest...) to the _pipelineType_
 * property of the returned error.
 * @param {string} code
 * @param {string} pipelineType
 * @param {Error} error
 * @param {Boolean} [fatal=true] - Whether the error is fatal to the content's
 * playback.
 * @returns {Error}
 */

function errorSelector(code, error) {
  var fatal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__errors__["d" /* isKnownError */])(error)) {
    var ErrorType = error instanceof __WEBPACK_IMPORTED_MODULE_4__errors__["h" /* RequestError */] ? __WEBPACK_IMPORTED_MODULE_4__errors__["i" /* NetworkError */] : __WEBPACK_IMPORTED_MODULE_4__errors__["e" /* OtherError */];

    error = new ErrorType(code, error, fatal);
  }
  return error;
}

/**
 * Returns function allowing to download the wanted transport object through
 * the resolver -> loader -> parser pipeline.
 *
 * (A transport object can be for example: the manifest, audio and video
 * segments, text, images...)
 *
 * The function returned takes the initial data in arguments and returns an
 * Observable which will emit:
 *   - each time a request begins (type "request"). This is not emitted if the
 *     value is retrieved from a local js cache. This one emit the payload
 *     as a value.
 *   - each time a request ends (type "metrics"). This one contains
 *     informations about the metrics of the request.
 *   - each time a minor request error is encountered (type "error"). With the
 *     error as a value.
 *   - Lastly, with the obtained data (type "data").
 *
 * Each of these but "error" can be emitted at most one time.
 *
 * This observable will throw if, following the options given, the request and
 * possible retry all failed.
 *
 * This observable will complete after emitting the data.
 * @param {Object} transportObject
 * @param {Function} transportObject.resolver
 * @param {Function} transportObject.loader
 * @param {Function} transportObject.parser
 * @param {Object} [options={}]
 * @param {Number} [options.maxRetry=DEFAULT_MAXIMUM_RETRY_ON_ERROR]
 * @param {Object} [options.cache]
 * @returns {Function}
 */
function createPipeline(_ref) {
  var resolver = _ref.resolver,
      loader = _ref.loader,
      parser = _ref.parser;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var maxRetry = options.maxRetry,
      cache = options.cache;

  /**
   * Subject that will emit non-fatal errors.
   */

  var retryErrorSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();

  if (!resolver) {
    resolver = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of;
  }
  if (!loader) {
    loader = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of;
  }
  if (!parser) {
    parser = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of;
  }

  var totalRetry = typeof maxRetry === "number" ? maxRetry : DEFAULT_MAXIMUM_RETRY_ON_ERROR;

  /**
   * Backoff options given to the backoff retry done with the loader function.
   * @see retryWithBackoff
   */
  var backoffOptions = {
    baseDelay: INITIAL_BACKOFF_DELAY_BASE,
    maxDelay: MAX_BACKOFF_DELAY_BASE,
    maxRetryRegular: totalRetry,
    maxRetryOffline: DEFAULT_MAXIMUM_RETRY_ON_OFFLINE,
    onRetry: function onRetry(error) {
      retryErrorSubject.next(errorSelector("PIPELINE_LOAD_ERROR", error, false));
    }
  };

  var _resolver = function _resolver(pipelineInputData) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_rx_tryCatch_js__["a" /* default */])(resolver, pipelineInputData).catch(function (error) {
      throw errorSelector("PIPELINE_RESOLVE_ERROR", error);
    });
  };

  var _loader = function _loader(resolvedInfos, pipelineInputData) {
    var loaderWithRetry = function loaderWithRetry(resolvedInfos) {
      return (
        // XXX do something about bufferdepth to avoid infinite errors?
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__backoff_js__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_rx_tryCatch_js__["a" /* default */])(loader, resolvedInfos), backoffOptions).catch(function (error) {
          throw errorSelector("PIPELINE_LOAD_ERROR", error);
        }).do(function (_ref2) {
          var type = _ref2.type,
              value = _ref2.value;

          if (type === "response" && cache) {
            cache.add(resolvedInfos, value);
          }
        }).startWith({
          type: "request",
          value: pipelineInputData
        })
      );
    };

    var fromCache = cache ? cache.get(resolvedInfos) : null;
    return fromCache === null ? loaderWithRetry(resolvedInfos) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_castToObservable_js__["a" /* default */])(fromCache).map(function (response) {
      return {
        type: "cache",
        value: response
      };
    }).catch(function () {
      return loaderWithRetry(resolvedInfos);
    });
  };

  var _parser = function _parser(loadedInfos) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_rx_tryCatch_js__["a" /* default */])(parser, loadedInfos).catch(function (error) {
      throw errorSelector("PIPELINE_PARSING_ERROR", error);
    });
  };

  return function (pipelineInputData) {
    var pipeline$ = _resolver(pipelineInputData).mergeMap(function (resolvedInfos) {
      return _loader(resolvedInfos, pipelineInputData).mergeMap(function (_ref3) {
        var type = _ref3.type,
            value = _ref3.value;

        // "cache": taken from cache
        // "data": no request have been done
        // "response": a request has been done
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_array_includes_js__["a" /* default */])(["cache", "data", "response"], type)) {
          var loaderResponse = value;
          var loadedInfos = __WEBPACK_IMPORTED_MODULE_0_object_assign___default()({ response: loaderResponse }, resolvedInfos);

          // add metrics if a request was made
          var metrics = type === "response" ? __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of({
            type: "metrics",
            value: {
              size: value.size,
              duration: value.duration
            }
          }) : __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].empty();

          return metrics.concat(_parser(loadedInfos).map(function (parserResponse) {
            return {
              type: "data",
              value: __WEBPACK_IMPORTED_MODULE_0_object_assign___default()({
                parsed: parserResponse
              }, loadedInfos)
            };
          }));
        } else {
          return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of({ type: type, value: value });
        }
      });
    }).do(null, null, function () {
      retryError$.complete();
    });

    var retryError$ = retryErrorSubject.map(function (error) {
      return { type: "error", value: error };
    });

    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].merge(pipeline$, retryError$);
  };
}

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eme__ = __webpack_require__(57);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * Perform EME management if needed.
 * @param {HTMLMediaElement} videoElement
 * @param {Array.<Object>} [keySystems]
 * @param {Subject} errorStream
 * @returns {Observable}
 */
function createEMEIfKeySystems(videoElement, keySystems, errorStream) {
  if (keySystems && keySystems.length) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__eme__["c" /* createEME */])(videoElement, keySystems, errorStream);
  } else {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__eme__["d" /* onEncrypted */])(videoElement).map(function () {
      __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].error("eme: ciphered media and no keySystem passed");
      throw new __WEBPACK_IMPORTED_MODULE_0__errors__["c" /* EncryptedMediaError */]("MEDIA_IS_ENCRYPTED_ERROR", null, true);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (createEMEIfKeySystems);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createMediaErrorStream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_rx_onEvent_js__ = __webpack_require__(31);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Returns an observable which throws the right MediaError as soon an "error"
 * event is received through the videoElement.
 * @see MediaError
 * @returns {Observable}
 */
function createMediaErrorStream(videoElement) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_rx_onEvent_js__["a" /* default */])(videoElement, "error").mergeMap(function () {
    var errorCode = videoElement.error.code;
    var errorDetail = void 0;
    switch (errorCode) {
      case 1:
        errorDetail = "MEDIA_ERR_ABORTED";
        break;
      case 2:
        errorDetail = "MEDIA_ERR_NETWORK";
        break;
      case 3:
        errorDetail = "MEDIA_ERR_DECODE";
        break;
      case 4:
        errorDetail = "MEDIA_ERR_SRC_NOT_SUPPORTED";
        break;
    }
    __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].error("stream: video element MEDIA_ERR(" + errorDetail + ")");
    throw new MediaError(errorDetail, null, true);
  });
}

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Stream;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_array_includes_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_retry__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_rx_throttle_js__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_initialization_segment_cache_js__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__errors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__compat_events_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__manifest__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__buffer__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pipelines_index_js__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__abr__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__initial_time_js__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__source_buffers__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__media_source_js__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__timings_js__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__error_stream_js__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__process_pipeline_js__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__speed_manager_js__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__stalling_obs_js__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__eme_js__ = __webpack_require__(119);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


































var END_OF_PLAY = __WEBPACK_IMPORTED_MODULE_4__config_js__["a" /* default */].END_OF_PLAY;

/**
 * Returns the pipeline options depending on the type of pipeline concerned.
 * @param {string} bufferType - e.g. "audio"|"text"...
 * @returns {Object} - Options to give to the Pipeline
 */

var getPipelineOptions = function getPipelineOptions(bufferType) {
  var downloaderOptions = {};
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_array_includes_js__["a" /* default */])(["audio", "video"], bufferType)) {
    downloaderOptions.cache = new __WEBPACK_IMPORTED_MODULE_10__utils_initialization_segment_cache_js__["a" /* default */]();
  } else if (bufferType === "image") {
    downloaderOptions.maxRetry = 0; // Deactivate BIF fetching if it fails
  }
  return downloaderOptions;
};

/**
 * Central part of the player. Play a given stream described by the given
 * manifest with given options.
 *
 * On subscription:
 *  - Creates the MediaSource and attached sourceBuffers instances.
 *  - download the content's manifest
 *  - Perform EME management if needed
 *  - create Buffer instances for each adaptation to manage buffers.
 *  - give adaptation control to the caller (e.g. to choose a language)
 *  - perform ABR Management
 *  - returns Observable emitting notifications about the stream lifecycle.
 *
 * TODO TOO MANY PARAMETERS something is wrong here.
 * @param {Object} args
 * @returns {Observable}
 */
function Stream(_ref) {
  var adaptiveOptions = _ref.adaptiveOptions,
      autoPlay = _ref.autoPlay,
      bufferOptions = _ref.bufferOptions,
      keySystems = _ref.keySystems,
      startAt = _ref.startAt,
      url = _ref.url,
      videoElement = _ref.videoElement,
      speed$ = _ref.speed$,
      supplementaryTextTracks = _ref.supplementaryTextTracks,
      supplementaryImageTracks = _ref.supplementaryImageTracks,
      timings$ = _ref.timings$,
      hideNativeSubtitle = _ref.hideNativeSubtitle,
      errorStream = _ref.errorStream,
      _ref$withMediaSource = _ref.withMediaSource,
      withMediaSource = _ref$withMediaSource === undefined ? true : _ref$withMediaSource,
      transport = _ref.transport;
  var wantedBufferAhead$ = bufferOptions.wantedBufferAhead$,
      maxBufferAhead$ = bufferOptions.maxBufferAhead$,
      maxBufferBehind$ = bufferOptions.maxBufferBehind$;
  /**
   * Subject through which network metrics will be sent to the ABR manager.
   */

  var network$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();

  /**
   * Subject through which each request progression will be reported to the ABR
   * manager.
   */
  var requestsInfos$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();

  /**
   * Pipeline used to download the manifest file.
   * @see ../pipelines
   * @type {Function} - take in argument the pipeline data, returns a pipeline
   * observable.
   */
  var manifestPipeline = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__pipelines_index_js__["a" /* default */])(transport.manifest);

  /*
   * ...Fetch the manifest file given.
   * Throttled to avoid doing multiple simultaneous requests because multiple
   * source buffers are out-of-index
   * TODO check if that throttle works as expected
   * @param {string} url - the manifest url
   * @returns {Observable} - the parsed manifest
   */
  var fetchManifest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_rx_throttle_js__["a" /* default */])(function (url) {
    var manifest$ = manifestPipeline({ url: url });
    var fakeSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_23__process_pipeline_js__["a" /* default */])("manifest", manifest$, fakeSubject, // we don't care about metrics here
    fakeSubject, // and we don't care about the request progress
    errorStream).map(function (_ref2) {
      var parsed = _ref2.parsed;
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__manifest__["a" /* normalizeManifest */])(parsed.url, parsed.manifest, supplementaryTextTracks, supplementaryImageTracks);
    });
  });

  var nativeBuffers = {}; // SourceBuffers added to the MediaSource
  var customBuffers = {}; // custom SourceBuffers

  /**
   * Backoff options used given to the backoff retry done with the manifest
   * pipeline.
   * @see retryWithBackoff
   */
  var retryOptions = {
    totalRetry: 3,
    retryDelay: 250,
    resetDelay: 60 * 1000,
    shouldRetry: function shouldRetry(error) {
      return error.fatal !== true;
    },
    errorSelector: function errorSelector(error) {
      if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__errors__["d" /* isKnownError */])(error)) {
        error = new __WEBPACK_IMPORTED_MODULE_11__errors__["e" /* OtherError */]("NONE", error, true);
      }
      error.fatal = true;
      return error;
    },
    onRetry: function onRetry(error, tryCount) {
      __WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */].warn("stream retry", error, tryCount);
      errorStream.next(error);
    }
  };

  /**
   * End-Of-Play emit when the current timing is really close to the end.
   * @see END_OF_PLAY
   * @type {Observable}
   */
  var endOfPlay = timings$.filter(function (_ref3) {
    var currentTime = _ref3.currentTime,
        duration = _ref3.duration;
    return duration > 0 && duration - currentTime < END_OF_PLAY;
  });

  /**
   * On subscription:
   *   - load the manifest (through its pipeline)
   *   - wiat for the given mediasource to be open
   * Once those are done, initialize the source duration and creates every
   * SourceBuffers and Buffers instances.
   *
   * This Observable can be retried on the basis of the retryOptions defined
   * here.
   * @param {Object} params
   * @param {string} params.url
   * @param {MediaSource|null} params.mediaSource
   * @returns {Observable}
   */
  var startStream = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_retry__["b" /* retryableFuncWithBackoff */])(function (_ref4) {
    var url = _ref4.url,
        mediaSource = _ref4.mediaSource;

    var sourceOpening = mediaSource ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__compat_events_js__["e" /* sourceOpen */])(mediaSource) : __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(null);

    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(fetchManifest(url), sourceOpening).mergeMap(function (_ref5) {
      var manifest = _ref5[0];
      return createStream(mediaSource, manifest);
    });
  }, retryOptions);

  /**
   * Creates a stream of audio/video/text buffers given a set of
   * adaptations and a codec information.
   *
   * For each buffer stream, a unique "sourceBuffer" observable is
   * created that will be reused for each created buffer.
   *
   * An "adaptations choice" observable is also created and
   * responsible for changing the video or audio adaptation choice in
   * reaction to user choices (ie. changing the language).
   *
   * @param {MediaSource} mediaSource
   * @param {Object} bufferInfos - Per-type object containing the adaptions,
   * the codec and the type
   * @param {Observable} timings
   * @param {Observable} seekings
   * @returns {Observable}
   */
  function createBuffer(mediaSource, bufferType, codec, timings, seekings, manifest, adaptation$, abrManager) {
    if (false) {
      assert(transport[bufferType], "stream: no management found for type " + bufferType);
    }
    var pipelineOptions = getPipelineOptions(bufferType);
    return adaptation$.switchMap(function (adaptation) {
      if (!adaptation) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__source_buffers__["a" /* disposeSourceBuffer */])(videoElement, mediaSource, bufferType, nativeBuffers, customBuffers);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__buffer__["a" /* EmptyBuffer */])({ bufferType: bufferType }).startWith({
          type: "adaptationChange",
          value: {
            type: bufferType,
            adaptation: adaptation
          }
        });
      }

      /**
       * Keep the current representation to add informations to the ABR clock.
       * TODO isn't that a little bit ugly?
       * @type {Object|null}
       */
      var currentRepresentation = null;

      var abrClock$ = timings$.map(function (timing) {
        var bitrate = void 0,
            lastIndexPosition = void 0;

        if (currentRepresentation) {
          bitrate = currentRepresentation.bitrate;

          if (currentRepresentation.index) {
            lastIndexPosition = currentRepresentation.index.getLastPosition();
          }
        }

        return {
          bitrate: bitrate,
          bufferGap: timing.bufferGap,
          duration: timing.duration,
          isLive: manifest.isLive,
          lastIndexPosition: lastIndexPosition,
          position: timing.currentTime,
          speed: speed$.getValue()
        };
      });

      var representations = adaptation.representations;


      var abr$ = abrManager.get$(bufferType, abrClock$, representations);
      var representation$ = abr$.map(function (_ref6) {
        var representation = _ref6.representation;
        return representation;
      }).distinctUntilChanged(function (a, b) {
        return (a && a.bitrate) === (b && b.bitrate) && (a && a.id) === (b && b.id);
      }).do(function (representation) {
        return currentRepresentation = representation;
      });

      var sourceBuffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__source_buffers__["b" /* createSourceBuffer */])(videoElement, mediaSource, bufferType, codec, nativeBuffers, customBuffers, { hideNativeSubtitle: hideNativeSubtitle });

      var downloader = function downloader(_ref7) {
        var segment = _ref7.segment,
            representation = _ref7.representation,
            init = _ref7.init;

        var pipeline$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__pipelines_index_js__["a" /* default */])(transport[bufferType], pipelineOptions)({
          segment: segment,
          representation: representation,
          adaptation: adaptation,
          manifest: manifest,
          init: init
        });
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_23__process_pipeline_js__["a" /* default */])(bufferType, pipeline$, network$, requestsInfos$, errorStream);
      };

      var switchRepresentation$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(representation$, seekings).map(function (_ref8) {
        var representation = _ref8[0];
        return representation;
      });

      var buffer$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__buffer__["b" /* Buffer */])({
        sourceBuffer: sourceBuffer,
        downloader: downloader,
        switch$: switchRepresentation$,
        clock$: timings,
        wantedBufferAhead: wantedBufferAhead$,
        maxBufferBehind: maxBufferBehind$,
        maxBufferAhead: maxBufferAhead$,
        bufferType: bufferType,
        isLive: manifest.isLive
      }).startWith({
        type: "adaptationChange",
        value: {
          type: bufferType,
          adaptation: adaptation
        }
      }).catch(function (error) {
        __WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */].error("buffer", bufferType, "has crashed", error);

        // non native buffer should not impact the stability of the
        // player. ie: if a text buffer sends an error, we want to
        // continue streaming without any subtitles
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__source_buffers__["c" /* shouldHaveNativeSourceBuffer */])(bufferType)) {
          errorStream.next(error);
          return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
        }
        throw error; // else, throw
      });

      var bitrateEstimate$ = abr$.filter(function (_ref9) {
        var bitrate = _ref9.bitrate;
        return bitrate != null;
      }).map(function (_ref10) {
        var bitrate = _ref10.bitrate;

        return {
          type: "bitrateEstimationChange",
          value: {
            type: bufferType,
            bitrate: bitrate
          }
        };
      });

      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(buffer$, bitrateEstimate$);
    });
  }

  /**
   * Creates an observable waiting for the "loadedmetadata" and "canplay"
   * events, and emitting a "loaded" event as both are received.
   *
   * /!\ This has also the side effect of setting the initial time as soon as
   * the loadedmetadata event pops up.
   * @param {Object} manifest
   * @returns {Observable}
   */
  function createVideoEventsObservables(manifest, timings) {
    var startTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__initial_time_js__["a" /* default */])(manifest, startAt);

    /**
     * Time offset is an offset to add to the timing's current time to have
     * the "real" position.
     * For now, this is seen when the video has not yet seeked to its initial
     * position, the currentTime will most probably be 0 where the effective
     * starting position will be _startTime_.
     * Thus we initially set a timeOffset equal to startTime.
     * TODO That look ugly, find better solution?
     * @type {Number}
     */
    var timeOffset = startTime;

    var canSeek$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__compat__["i" /* canSeek */])(videoElement).do(function () {
      __WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */].info("set initial time", startTime);

      // reset playbackRate to 1 in case we were at 0 (from a stalled
      // retry for instance)
      videoElement.playbackRate = 1;
      videoElement.currentTime = startTime;
      timeOffset = 0;
    });

    var canPlay$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__compat__["j" /* canPlay */])(videoElement).do(function () {
      __WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */].info("canplay event");
      if (autoPlay) {
        videoElement.play();
      }
      autoPlay = true;
    });

    return {
      clock$: timings.map(function (timing) {
        return __WEBPACK_IMPORTED_MODULE_3_object_assign___default()({ timeOffset: timeOffset }, timing);
      }),

      loaded$: __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].combineLatest(canSeek$, canPlay$).take(1).mapTo({ type: "loaded", value: true })
    };
  }

  /**
   * Re-fetch the manifest and merge it with the previous version.
   * @param {Object} manifest
   * @returns {Observable}
   */
  function refreshManifest(manifest) {
    return fetchManifest(manifest.getUrl()).map(function (parsed) {
      var newManifest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__manifest__["b" /* updateManifest */])(manifest, parsed);
      return {
        type: "manifestUpdate",
        value: {
          manifest: newManifest
        }
      };
    });
  }

  /**
   * Handle events happening only in live contexts.
   * @param {Object} message
   * @param {Object} manifest
   * @returns {Observable}
   */
  function liveMessageHandler(message, manifest) {
    switch (message.type) {
      case "index-discontinuity":
        __WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */].warn("explicit discontinuity seek", message.value.ts);
        videoElement.currentTime = message.value.ts;
        break;

      // precondition-failed messages require a change of live-gap to
      // calibrate the live representation of the player
      // TODO(pierre): smarter converging algorithm
      case "precondition-failed":
        manifest.updateLiveGap(1); // go back 1s for now
        __WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */].warn("precondition failed", manifest.presentationLiveGap);
        break;

      case "out-of-index":
        // out-of-index messages require a complete reloading of the
        // manifest to refresh the current index
        __WEBPACK_IMPORTED_MODULE_6__utils_log__["a" /* default */].info("out of index");
        return refreshManifest(manifest);
    }

    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(message);
  }

  /**
   * Creates a stream merging all observable that are required to make
   * the system cooperate.
   * @param {MediaSource} mediaSource
   * @param {Object} manifest
   * @returns {Observable}
   */
  function createStream(mediaSource, manifest) {
    if (mediaSource) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_20__media_source_js__["a" /* setDurationToMediaSource */])(mediaSource, manifest.getDuration());
    }

    var _createTimings = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_21__timings_js__["a" /* default */])(manifest, timings$),
        _timings = _createTimings.timings,
        seekings = _createTimings.seekings;

    var _createVideoEventsObs = createVideoEventsObservables(manifest, _timings),
        loaded$ = _createVideoEventsObs.loaded$,
        clock$ = _createVideoEventsObs.clock$;

    var abrManager = new __WEBPACK_IMPORTED_MODULE_17__abr__["a" /* default */](requestsInfos$, network$, // emit network metrics such as the observed bandwidth
    adaptiveOptions);

    var adaptations$ = {};
    var _buffersArray = Object.keys(manifest.adaptations).map(function (type) {
      adaptations$[type] = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["ReplaySubject"](1);

      // TODO re-check that
      var codec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__manifest__["c" /* getCodec */])(manifest.adaptations[type][0].representations[0]);

      // Initialize all native source buffer at the same time. We cannot
      // lazily create native sourcebuffers since the spec does not
      // allow adding them during playback.
      //
      // From https://w3c.github.io/media-source/#methods
      //    For example, a user agent may throw a QuotaExceededError
      //    exception if the media element has reached the HAVE_METADATA
      //    readyState. This can occur if the user agent's media engine
      //    does not support adding more tracks during playback.
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__source_buffers__["c" /* shouldHaveNativeSourceBuffer */])(type)) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__source_buffers__["d" /* addNativeSourceBuffer */])(mediaSource, type, codec, nativeBuffers);
      }

      return createBuffer(mediaSource, type, codec, clock$, seekings, manifest, adaptations$[type], abrManager);
    });

    var buffers$ = manifest.isLive ? __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"], _buffersArray).mergeMap(function (message) {
      return liveMessageHandler(message, manifest);
    }) : __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge.apply(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"], _buffersArray);

    var manifest$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({
      type: "manifestChange",
      value: {
        manifest: manifest,
        adaptations$: adaptations$,
        abrManager: abrManager
      }
    });

    var emeManager$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_26__eme_js__["a" /* default */])(videoElement, keySystems, errorStream);

    var speedManager$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_24__speed_manager_js__["a" /* default */])(videoElement, speed$, _timings, {
      changePlaybackRate: withMediaSource
    }).map(function (newSpeed) {
      return { type: "speed", value: newSpeed };
    });

    var stallingManager$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_25__stalling_obs_js__["a" /* default */])(videoElement, manifest, _timings).map(function (stalledStatus) {
      return { type: "stalled", value: stalledStatus };
    });

    var mediaErrorManager$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_22__error_stream_js__["a" /* default */])(videoElement);

    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(buffers$, emeManager$, loaded$, manifest$, mediaErrorManager$, speedManager$, stallingManager$).finally(function () {
      return abrManager.dispose();
    });
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_20__media_source_js__["b" /* createAndPlugMediaSource */])(url, videoElement, withMediaSource, customBuffers, nativeBuffers).mergeMap(startStream).takeUntil(endOfPlay);
}

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getInitialTime;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manifest_timings_js__ = __webpack_require__(28);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




var DEFAULT_LIVE_GAP = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_LIVE_GAP;

/**
 * Returns the calculated initial time for the stream described by the given
 * manifest:
 *   1. if a start time is defined by user, calculate video starting time from
 *      the manifest informations
 *   2. else if the video is live, use the live edge and suggested delays from
 *      it
 *   3. else returns 0 (beginning)
 *
 * @param {Manifest} manifest
 * @param {Object} startAt
 * @returns {Number}
 */

function getInitialTime(manifest, startAt) {
  if (startAt) {
    var _getBufferLimits = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__manifest_timings_js__["e" /* getBufferLimits */])(manifest),
        min = _getBufferLimits[0],
        max = _getBufferLimits[1];

    if (startAt.position != null) {
      return Math.max(Math.min(startAt.position, max), min);
    } else if (startAt.wallClockTime != null) {
      var position = manifest.isLive ? startAt.wallClockTime - manifest.availabilityStartTime : startAt.wallClockTime;

      return Math.max(Math.min(position, max), min);
    } else if (startAt.fromFirstPosition != null) {
      var fromFirstPosition = startAt.fromFirstPosition;

      return fromFirstPosition <= 0 ? min : Math.min(min + fromFirstPosition, max);
    } else if (startAt.fromLastPosition != null) {
      var fromLastPosition = startAt.fromLastPosition;

      return fromLastPosition >= 0 ? max : Math.max(min, max + fromLastPosition);
    }
  }

  if (manifest.isLive) {
    var sgp = manifest.suggestedPresentationDelay;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__manifest_timings_js__["d" /* getMaximumBufferPosition */])(manifest) - (sgp == null ? DEFAULT_LIVE_GAP : sgp);
  }
  return 0;
}

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createAndPlugMediaSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return setDurationToMediaSource; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__compat__ = __webpack_require__(7);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Side effect that set the media duration in the mediaSource. This side
 * effect occurs when we receive the "sourceopen" from the
 * mediaSource.
 * @param {MediaSource} mediaSource
 * @param {Object} manifest
 */
var setDurationToMediaSource = function setDurationToMediaSource(mediaSource, duration) {
  var newDuration = void 0;
  if (duration === Infinity) {
    // TODO(pierre): hack for Chrome 42
    // is it "https://bugs.chromium.org/p/chromium/issues/detail?id=461733"?
    newDuration = Number.MAX_VALUE;
  } else {
    newDuration = duration;
  }

  if (mediaSource.duration !== newDuration) {
    mediaSource.duration = newDuration;
    __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].info("set duration", mediaSource.duration);
  }
};

/**
 * Create, on subscription, a MediaSource instance and attach it to the given
 * video element's src attribute.
 *
 * Returns an Observable which emits one time when done an object with the
 * following properties:
 *
 *   - src {string} - the src given
 *
 *   - mediaSource {MediaSource|null} - the MediaSource instance. Can be null
 *     in the case no MediaSource is needed.
 *
 * This Observable never completes. It can throw if MediaSource is needed but
 * is not available in the current environment.
 *
 * On unsubscription, the video.src is cleaned, MediaSource sourcenuffers and
 * customBuffers are aborted and some minor cleaning is done.
 *
 * @param {string} url
 * @param {HTMLMediaElement} video
 * @param {Boolean} withMediaSource
 * @param {Object} customBuffers
 * @param {Object} nativeBuffers
 * @returns {Observable}
 */
var createAndPlugMediaSource = function createAndPlugMediaSource(url, video, withMediaSource, customBuffers, nativeBuffers) {
  return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(function (observer) {
    var mediaSource = void 0,
        objectURL = void 0;

    function resetMediaElement() {
      if (mediaSource && mediaSource.readyState != "closed") {
        var _mediaSource = mediaSource,
            readyState = _mediaSource.readyState,
            sourceBuffers = _mediaSource.sourceBuffers;

        for (var i = 0; i < sourceBuffers.length; i++) {
          var sourceBuffer = sourceBuffers[i];
          try {
            if (readyState == "open") {
              sourceBuffer.abort();
            }

            mediaSource.removeSourceBuffer(sourceBuffer);
          } catch (e) {
            __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].warn("error while disposing souceBuffer", e);
          }
        }
      }

      Object.keys(nativeBuffers).forEach(function (type) {
        delete nativeBuffers[type];
      });

      Object.keys(customBuffers).forEach(function (sourceBufferType) {
        var sourceBuffer = customBuffers[sourceBufferType];
        try {
          sourceBuffer.abort();
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].warn("error while disposing souceBuffer", e);
        }
        delete customBuffers[sourceBufferType];
      });

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__compat__["k" /* clearVideoSrc */])(video);

      if (objectURL) {
        try {
          URL.revokeObjectURL(objectURL);
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].warn("error while revoking ObjectURL", e);
        }
      }

      mediaSource = null;
      objectURL = null;
    }

    // make sure the media has been correctly reset
    resetMediaElement();

    if (withMediaSource) {
      if (!__WEBPACK_IMPORTED_MODULE_2__compat__["l" /* MediaSource_ */]) {
        throw new MediaError("MEDIA_SOURCE_NOT_SUPPORTED", null, true);
      }
      mediaSource = new __WEBPACK_IMPORTED_MODULE_2__compat__["l" /* MediaSource_ */]();
      objectURL = URL.createObjectURL(mediaSource);
    } else {
      mediaSource = null;
      objectURL = url;
    }

    video.src = objectURL;

    observer.next({ url: url, mediaSource: mediaSource });
    __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].info("create mediasource object", objectURL);

    return resetMediaElement;
  });
};



/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = processPipeline;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Process a pipeline observable to adapt it to the Stream way:
 *   - use the network$ subject for network metrics (bandwitdh mesure)
 *   - use the requests subject for network requests and their progress
 *   - use the warning$ subject for retries' error messages
 *   - only emit the data
 *
 * @param {string} pipelineType
 * @param {Observable} pipeline$
 * @param {Subject} network$
 * @param {Subject} warning$
 * @returns {Observable}
 */
function processPipeline(pipelineType, pipeline$, network$, requests$, warning$) {
  var request$ = void 0;
  var segmentId = void 0;
  return pipeline$.filter(function (_ref) {
    var type = _ref.type,
        value = _ref.value;

    if (type === "data") {
      return true;
    }

    // ugly to do side effect in a filter, but heh
    if (type === "error") {
      // value is an Error. Add the pipeline type information to it.
      value.pipelineType = pipelineType;
      warning$.next(value);
    } else if (pipelineType === "manifest") {
      return;
    } else if (type === "metrics") {
      // format it for ABR Handling
      network$.next({ type: pipelineType, value: value });
    } else if (type === "request") {
      // format it for ABR Handling if the right format
      var segment = value && value.segment;
      if (segment != null) {
        var duration = segment.duration / segment.timescale;
        var time = segment.time / segment.timescale;
        segmentId = segment.id;

        var segmentInfos = {
          duration: isNaN(duration) ? undefined : duration,
          time: isNaN(time) ? undefined : time,
          requestTimestamp: Date.now(),
          id: segmentId
        };

        request$ = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        requests$.next(request$);

        request$.next({
          type: pipelineType,
          event: "requestBegin",
          value: segmentInfos
        });
      }
    } else if (type === "progress") {
      if (value.size === value.totalSize) {
        return;
      }
      var progressInfos = {
        duration: value.duration,
        size: value.size,
        totalSize: value.totalSize,
        timestamp: Date.now(),
        id: segmentId
      };

      request$.next({
        type: pipelineType,
        event: "progress",
        value: progressInfos
      });
    }
  }).map(function (_ref2) {
    var value = _ref2.value;

    return value;
  }) // take only value from data/cache events
  .finally(function () {
    if (request$) {
      if (segmentId != null) {
        request$.next({
          type: pipelineType,
          event: "requestEnd",
          value: { id: segmentId }
        });
      }
      request$.complete();
    }
  }).share(); // avoid multiple side effects if multiple subs
}

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_js__ = __webpack_require__(60);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var ImageSourceBuffer = function (_AbstractSourceBuffer) {
  _inherits(ImageSourceBuffer, _AbstractSourceBuffer);

  function ImageSourceBuffer() {
    _classCallCheck(this, ImageSourceBuffer);

    return _possibleConstructorReturn(this, _AbstractSourceBuffer.apply(this, arguments));
  }

  ImageSourceBuffer.prototype._append = function _append() {
    // TODO: handle live case.
    // We suppose here that the first received bsi includes all images
    this.buffered.insert(0, Number.MAX_VALUE);
  };

  return ImageSourceBuffer;
}(__WEBPACK_IMPORTED_MODULE_0__abstract_js__["a" /* AbstractSourceBuffer */]);

/* harmony default export */ __webpack_exports__["a"] = (ImageSourceBuffer);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return shouldHaveNativeSourceBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return addNativeSourceBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createSourceBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return disposeSourceBuffer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__text_buffer_js__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_buffer_js__ = __webpack_require__(125);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Returns true if the given buffeType is a native buffer, false otherwise.
 * "Native" source buffers are directly added to the MediaSource.
 * @param {string} bufferType
 * @returns {Boolean}
 */
var shouldHaveNativeSourceBuffer = function shouldHaveNativeSourceBuffer(bufferType) {
  return bufferType == "audio" || bufferType == "video";
};

/**
 * Adds a SourceBuffer to the MediaSource.
 * @param {MediaSource} mediaSource
 * @param {string} type - The "type" of SourceBuffer (audio/video...)
 * @param {string} codec
 * @param {Object} nativeBuffers
 * @returns {SourceBuffer}
 */
var addNativeSourceBuffer = function addNativeSourceBuffer(mediaSource, type, codec, nativeBuffers) {
  if (!nativeBuffers[type]) {
    __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].info("add sourcebuffer", codec);
    nativeBuffers[type] = mediaSource.addSourceBuffer(codec);
  }
  return nativeBuffers[type];
};

/**
 * Creates a new SourceBuffer.
 * Can be a native one (audio/video) as well as a custom one (image/text).
 * @throws MediaError - The type of bugger given is unknown.
 * @param {HTMLMediaElement} video
 * @param {MediaSource} mediaSource
 * @param {string} type
 * @param {string} codex
 * @param {Object} customBuffers
 * @returns {SourceBuffer|AbstractSourceBuffer}
 */
var createSourceBuffer = function createSourceBuffer(video, mediaSource, type, codec, nativeBuffers, customBuffers) {
  var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

  var sourceBuffer = void 0;

  if (shouldHaveNativeSourceBuffer(type)) {
    sourceBuffer = addNativeSourceBuffer(mediaSource, type, codec, nativeBuffers);
  } else {
    var oldSourceBuffer = customBuffers[type];
    if (oldSourceBuffer) {
      try {
        oldSourceBuffer.abort();
      } catch (e) {
        __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].warn(e);
      } finally {
        delete customBuffers[type];
      }
    }

    if (type == "text") {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].info("add text sourcebuffer", codec);
      sourceBuffer = new __WEBPACK_IMPORTED_MODULE_1__text_buffer_js__["a" /* default */](video, codec, options.hideNativeSubtitle);
    } else if (type == "image") {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].info("add image sourcebuffer", codec);
      sourceBuffer = new __WEBPACK_IMPORTED_MODULE_2__image_buffer_js__["a" /* default */](codec);
    } else {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].error("unknown buffer type " + type);
      throw new MediaError("BUFFER_TYPE_UNKNOWN", null, true);
    }

    customBuffers[type] = sourceBuffer;
  }

  return sourceBuffer;
};

/**
 * Abort and remove the SourceBuffer given.
 * @param {HTMLMediaElement} video
 * @param {MediaSource} mediaSource
 * @param {string} type
 */
var disposeSourceBuffer = function disposeSourceBuffer(video, mediaSource, type, nativeBuffers, customBuffers) {
  var oldSourceBuffer = void 0;

  var isNative = shouldHaveNativeSourceBuffer(type);
  if (isNative) {
    oldSourceBuffer = nativeBuffers[type];
    delete nativeBuffers[type];
  } else {
    oldSourceBuffer = customBuffers[type];
    delete customBuffers[type];
  }

  if (oldSourceBuffer) {
    try {
      oldSourceBuffer.abort();

      if (isNative) {
        mediaSource.removeSourceBuffer(oldSourceBuffer);
      }
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].warn(e);
    }
  }
};



/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compat__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_log__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





var Cue = window.VTTCue || window.TextTrackCue;

/**
 * Creates an array of VTTCue/TextTrackCue from a given array of cue objects.
 * @param {Array.<Object>} - Objects containing the start, end and text.
 * @returns {Array.<Cue>}
 */
function createCuesFromArray(cuesArray) {
  var nativeCues = [];
  for (var i = 0; i < cuesArray.length; i++) {
    var _cuesArray$i = cuesArray[i],
        start = _cuesArray$i.start,
        end = _cuesArray$i.end,
        text = _cuesArray$i.text;

    if (text) {
      nativeCues.push(new Cue(start, end, text));
    }
  }
  return nativeCues;
}

/**
 * Implementation of a SourceBuffer used for TextTracks.
 *
 * The data appended through ``appendBuffer`` should be an object with the
 * following keys:
 *
 *   - data {*}: The texttrack data
 *
 *   - timescale {Number}: the timescale. That is, the number of time units that
 *     pass in one second. For example, a time coordinate system that measures
 *     time in sixtieths of a second has a timescale of 60.
 *
 *   - start {Number}: The start time, timescaled, those texttracks are for.
 *     Note that this value is different than the start of the first cue:
 *       - the start of the first cue is the time at which the first cue in the
 *         data given should begin to be displayed.
 *       - ``start`` is the absolute start time for which the data apply.
 *     That means, if the given data is for a segment that begins with 10s
 *     without any cue, the ``start`` value should be 10s (timescaled) inferior
 *     to the start of the first cue.
 *     This is useful to copy the behavior of "native" SourceBuffer to indicate
 *     which segments have been "buffered".
 *
 *   - end {Number|undefined}: The end time, timescaled, those texttracks are
 *     for.
 *     Check ``start`` for more informations about the difference between this
 *     value and the end of the last cue in the data.
 *     This number can be undefined to raise the error resilience. In that case,
 *     the end time will be defined from the last text track in the data.
 *
 * @class TextSourceBuffer
 * @extends AbstractSourceBuffer
 */

var TextSourceBuffer = function (_AbstractSourceBuffer) {
  _inherits(TextSourceBuffer, _AbstractSourceBuffer);

  function TextSourceBuffer(video, codec, hideNativeSubtitle) {
    _classCallCheck(this, TextSourceBuffer);

    var _this = _possibleConstructorReturn(this, _AbstractSourceBuffer.call(this, codec));

    var _addTextTrack = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__compat__["n" /* addTextTrack */])(video, hideNativeSubtitle),
        track = _addTextTrack.track,
        trackElement = _addTextTrack.trackElement;

    _this._videoElement = video;
    _this._isVtt = /^text\/vtt/.test(codec);
    _this._track = track;
    _this._trackElement = trackElement;
    return _this;
  }

  /**
   * Append text tracks.
   * @param {Object} data
   * @param {*} data.data
   * @param {Number} data.timescale
   * @param {Number} data.start
   * @param {Number|undefined} data.end
   */


  TextSourceBuffer.prototype._append = function _append(data) {
    var _this2 = this;

    var timescale = data.timescale,
        timescaledStart = data.start,
        timescaledEnd = data.end,
        cues = data.data;

    if (timescaledEnd - timescaledStart <= 0) {
      return;
    }
    var startTime = timescaledStart / timescale;
    var endTime = timescaledEnd != null ? timescaledEnd / timescale : undefined;

    if (this._isVtt) {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__compat__["o" /* isVTTSupported */])() && this._trackElement) {
        var blob = new Blob([cues], { type: "text/vtt" });
        var url = URL.createObjectURL(blob);
        this._trackElement.src = url;
        this.buffered.insert(startTime, endTime != null ? endTime : Number.MAX_VALUE);
      } else {
        __WEBPACK_IMPORTED_MODULE_2__utils_log__["a" /* default */].warn("vtt subtitles not supported");
      }
    } else {
      var newCues = createCuesFromArray(cues);
      if (newCues.length > 0) {
        var firstCue = newCues[0];

        // NOTE(compat): cleanup all current cues if the newly added
        // ones are in the past. this is supposed to fix an issue on
        // IE/Edge.
        var currentCues = this._track.cues;
        if (currentCues.length > 0) {
          if (firstCue.startTime < currentCues[currentCues.length - 1].startTime) {
            this._remove(firstCue.startTime, +Infinity);
          }
        }

        newCues.forEach(function (cue) {
          return _this2._track.addCue(cue);
        });
        this.buffered.insert(startTime, endTime != null ? endTime : newCues[newCues.length - 1].endTime);
      }
    }
  };

  /**
   * @param {Number} from
   * @param {Number} to
   */


  TextSourceBuffer.prototype._remove = function _remove(from, to) {
    var track = this._track;
    var cues = track.cues;
    for (var i = cues.length - 1; i >= 0; i--) {
      var cue = cues[i];
      var startTime = cue.startTime,
          endTime = cue.endTime;

      if (startTime >= from && startTime <= to && endTime <= to) {
        track.removeCue(cue);
      }
    }
    this.buffered.remove(from, to);
  };

  TextSourceBuffer.prototype._abort = function _abort() {
    var _trackElement = this._trackElement,
        _videoElement = this._videoElement;

    if (_trackElement && _videoElement && _videoElement.hasChildNodes(_trackElement)) {
      _videoElement.removeChild(_trackElement);
    }
    this._track.mode = "disabled";
    this.size = 0;
    this._trackElement = null;
    this._track = null;
    this._videoElement = null;
  };

  return TextSourceBuffer;
}(__WEBPACK_IMPORTED_MODULE_0__abstract_js__["a" /* AbstractSourceBuffer */]);

/* harmony default export */ __webpack_exports__["a"] = (TextSourceBuffer);

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_assert_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ranges_js__ = __webpack_require__(10);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * Simulate TimeRanges as returned by SourceBuffer.prototype.buffered.
 * Add an "insert" and "remove" methods to manually update it.
 * @class ManualTimeRanges
 */

var ManualTimeRanges = function () {
  function ManualTimeRanges() {
    _classCallCheck(this, ManualTimeRanges);

    this._ranges = [];
    this.length = 0;
  }

  ManualTimeRanges.prototype.insert = function insert(start, end) {
    if (false) {
      assert(start >= 0, "invalid start time");
      assert(end - start > 0, "invalid end time");
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_ranges_js__["e" /* insertInto */])(this._ranges, { start: start, end: end });
    this.length = this._ranges.length;
  };

  ManualTimeRanges.prototype.remove = function remove(start, end) {
    if (false) {
      assert(start >= 0, "invalid start time");
      assert(end - start > 0, "invalid end time");
    }
    var rangesToIntersect = [];
    if (start > 0) {
      rangesToIntersect.push({ start: 0, end: start });
    }
    if (end < Infinity) {
      rangesToIntersect.push({ start: end, end: Infinity });
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_ranges_js__["f" /* keepRangeIntersection */])(this._ranges, rangesToIntersect);
    this.length = this._ranges.length;
  };

  ManualTimeRanges.prototype.start = function start(index) {
    if (index >= this._ranges.length) {
      throw new Error("INDEX_SIZE_ERROR");
    }
    return this._ranges[index].start;
  };

  ManualTimeRanges.prototype.end = function end(index) {
    if (index >= this._ranges.length) {
      throw new Error("INDEX_SIZE_ERROR");
    }
    return this._ranges[index].end;
  };

  return ManualTimeRanges;
}();

/* harmony default export */ __webpack_exports__["a"] = (ManualTimeRanges);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Manage playback speed.
 * Set playback rate set by the user, pause playback when the player appear to
 * stall and restore the speed once it appears to un-stall.
 *
 * @param {HTMLMediaElement} videoElement
 * @param {BehaviorSubject} speed$ - emit speed set by the user
 * @param {Observable} clock$
 * @param {Object} options
 * @param {Boolean} [options.pauseWhenStalled=true] - true if the player
 * stalling should lead to a pause until it un-stalls.
 * @returns {Observable}
 */
var SpeedManager = function SpeedManager(videoElement, speed$, clock$, _ref) {
  var _ref$pauseWhenStalled = _ref.pauseWhenStalled,
      pauseWhenStalled = _ref$pauseWhenStalled === undefined ? true : _ref$pauseWhenStalled;

  var forcePause$ = void 0;

  if (!pauseWhenStalled) {
    forcePause$ = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(false).concat(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].never());
  } else {
    forcePause$ = clock$.pairwise().map(function (_ref2) {
      var prevTiming = _ref2[0],
          timing = _ref2[1];

      var isStalled = timing.stalled;
      var wasStalled = prevTiming.stalled;
      if (!wasStalled !== !isStalled || // xor
      wasStalled && isStalled && wasStalled.state !== isStalled.state) {
        return !wasStalled;
      }
    }).filter(function (val) {
      return val != null;
    }).startWith(false);
  }

  return forcePause$.switchMap(function (shouldForcePause) {
    if (shouldForcePause) {
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].defer(function () {
        __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].info("pause playback to build buffer");
        videoElement.playbackRate = 0;
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(0);
      });
    }
    return speed$.do(function (speed) {
      __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].info("resume playback speed", speed);
      videoElement.playbackRate = speed;
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = (SpeedManager);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_ranges_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__compat__ = __webpack_require__(7);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var DISCONTINUITY_THRESHOLD = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DISCONTINUITY_THRESHOLD;

/**
 * Receive "stalling" events from the clock, try to get out of it, and re-emit
 * them for the player if the stalling status changed.
 * @param {HTMLMediaElement} videoElement
 * @param {Manifest} manifest
 * @param {Observable} timings$
 * @returns {Observable}
 */

function StallingManager(videoElement, manifest, timings$) {
  return timings$.do(function (timing) {
    if (!timing.stalled) {
      return;
    }

    // Perform various checks to try to get out of the stalled state:
    //   1. is it a browser bug? -> force seek at the same current time
    //   2. is it a short discontinuity? -> Seek at the beginning of the
    //                                      next range
    //   3. are we before the buffer depth? -> Seek a little after it
    var buffered = timing.buffered,
        currentTime = timing.currentTime;

    var nextRangeGap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_ranges_js__["d" /* getNextRangeGap */])(buffered, currentTime);

    // Discontinuity check in case we are close a buffer but still
    // calculate a stalled state. This is useful for some
    // implementation that might drop an injected segment, or in
    // case of small discontinuity in the stream.
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__compat__["m" /* isPlaybackStuck */])(timing)) {
      __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].warn("after freeze seek", currentTime, timing.range);
      videoElement.currentTime = currentTime;
    } else if (nextRangeGap < DISCONTINUITY_THRESHOLD) {
      var seekTo = currentTime + nextRangeGap + 1 / 60;
      __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].warn("discontinuity seek", currentTime, nextRangeGap, seekTo);
      videoElement.currentTime = seekTo;
    }
  }).share().map(function (timing) {
    return timing.stalled;
  }).distinctUntilChanged(function (wasStalled, isStalled) {
    return !wasStalled && !isStalled || wasStalled && isStalled && wasStalled.state === isStalled.state;
  });
}

/* harmony default export */ __webpack_exports__["a"] = (StallingManager);

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manifest_timings_js__ = __webpack_require__(28);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * TODO I'm not sure that's useful here.
 * seek gap in seconds.
 */
var SEEK_GAP = 2;

/**
 * Observable emitting each time the player is in a true seeking state.
 * That is, the player is seeking and no buffer has been constructed for this
 * range yet.
 * @param {Observable} timingsSampling - the timings observable emitting every
 * seeking events.
 * @returns {Observable}
 */
function seekingsSampler(timingsSampling) {
  return timingsSampling.filter(function (timing) {
    return timing.state == "seeking" && (timing.bufferGap === Infinity ||

    // TODO I don't think that's possible here:
    // the gap is based on the current position and the difference
    // between it and the end of the range this position is in.
    // I don't see how it could be negative.
    // It is Infinity when no range is found for the current position
    timing.bufferGap < -SEEK_GAP);
  })
  // skip the first seeking event generated by the set of the
  // initial seeking time in the video
  // TODO Always the case? check that up
  .skip(1).startWith(true); // TODO What's with the true?
}

/**
 * Create timings and seekings Observables:
 *   - timings is the given timings observable with added informations.
 *   - seekings emits each time the player go in a seeking state.
 * @param {Object} manifest
 * @returns {Object}
 */
function createTimingsAndSeekingsObservables(manifest, timings) {
  var augmentedTimings = timings.map(function (timing) {
    var clonedTiming = __WEBPACK_IMPORTED_MODULE_0_object_assign___default()({}, timing);

    // TODO remove liveGap for non-live?
    clonedTiming.liveGap = manifest.isLive ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__manifest_timings_js__["d" /* getMaximumBufferPosition */])(manifest) - timing.currentTime : Infinity;
    return clonedTiming;
  });

  var seekings = seekingsSampler(augmentedTimings);

  return {
    timings: augmentedTimings,
    seekings: seekings
  };
}

/* harmony default export */ __webpack_exports__["a"] = (createTimingsAndSeekingsObservables);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorMessage_js__ = __webpack_require__(22);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @class EncryptedMediaError
 */
function EncryptedMediaError(code, reason, fatal) {
  this.name = "EncryptedMediaError";
  this.type = __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* ErrorTypes */].ENCRYPTED_MEDIA_ERROR;

  this.reason = reason;
  this.code = __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* ErrorCodes */][code];
  this.fatal = fatal;
  this.message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__errorMessage_js__["a" /* default */])(this.name, this.code, this.reason);
}
EncryptedMediaError.prototype = new Error();

/* harmony default export */ __webpack_exports__["a"] = (EncryptedMediaError);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorMessage_js__ = __webpack_require__(22);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @class IndexError
 */
function IndexError(code, indexType, fatal) {
  this.name = "IndexError";
  this.type = __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* ErrorTypes */].INDEX_ERROR;

  this.indexType = indexType;

  this.reason = null;
  this.code = __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* ErrorCodes */][code];
  this.fatal = fatal;
  this.message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__errorMessage_js__["a" /* default */])(this.name, this.code, null);
}
IndexError.prototype = new Error();

/* harmony default export */ __webpack_exports__["a"] = (IndexError);

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorMessage_js__ = __webpack_require__(22);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @class MediaError
 */
function MediaError(code, reason, fatal) {
  this.name = "MediaError";
  this.type = __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* ErrorTypes */].MEDIA_ERROR;

  this.reason = reason;
  this.code = __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* ErrorCodes */][code];
  this.fatal = fatal;
  this.message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__errorMessage_js__["a" /* default */])(this.name, this.code, this.reason);
}
MediaError.prototype = new Error();

/* harmony default export */ __webpack_exports__["a"] = (MediaError);

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorMessage_js__ = __webpack_require__(22);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @class NetworkError
 */
function NetworkError(code, reason, fatal) {
  this.name = "NetworkError";
  this.type = __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* ErrorTypes */].NETWORK_ERROR;

  this.xhr = reason.xhr;
  this.url = reason.url;
  this.status = reason.status;
  this.reqType = reason.type;

  this.reason = reason;
  this.code = __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* ErrorCodes */][code];
  this.fatal = fatal;
  if (this.reason) {
    this.message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__errorMessage_js__["a" /* default */])(this.name, this.code, this.reason);
  } else {
    var reasonMessage = "" + this.reqType + (this.status > 0 ? "(" + this.status + ")" : "") + " on " + this.url;
    this.message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__errorMessage_js__["a" /* default */])(this.name, this.code, {
      message: reasonMessage
    });
  }
}
NetworkError.prototype = new Error();

NetworkError.prototype.isHttpError = function (httpErrorCode) {
  return this.reqType == __WEBPACK_IMPORTED_MODULE_0__constants_js__["c" /* RequestErrorTypes */].ERROR_HTTP_CODE && this.status == httpErrorCode;
};

/* harmony default export */ __webpack_exports__["a"] = (NetworkError);

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errorMessage_js__ = __webpack_require__(22);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @class OtherError
 */
function OtherError(code, reason, fatal) {
  this.name = "OtherError";
  this.type = __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* ErrorTypes */].OTHER_ERROR;

  this.reason = reason;
  this.code = __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* ErrorCodes */][code];
  this.fatal = fatal;
  this.message = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__errorMessage_js__["a" /* default */])(this.name, this.code, this.reason);
}
OtherError.prototype = new Error();

/* harmony default export */ __webpack_exports__["a"] = (OtherError);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @class RequestError
 */
function RequestError(xhr, url, type) {
  this.name = "RequestError";
  this.url = url;
  this.xhr = xhr;
  this.status = xhr.status;
  this.type = type;
  this.message = type;
}
RequestError.prototype = new Error();

/* harmony default export */ __webpack_exports__["a"] = (RequestError);

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ugly webpack workaround to export require-style
module.exports = __webpack_require__(87).default;

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_array_find__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__representation_js__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_id_js__ = __webpack_require__(40);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/**
 * Normalized Adaptation structure.
 *
 * API Public Properties:
 *   - id {string|Number}:
 *   - type {string}
 *   - language {string|undefined}
 *   - normalizedLanguage {string|undefined}
 *   - isAudioDescription {Boolean|undefined}
 *   - isClosedCaption {Boolean|undefined}
 *   - representations {[]Representation}
 *
 * API Public Methods:
 *   - getAvailableBitrates () => {[]Number}
 */

var Adaptation = function () {
  /**
   * @constructor
   * @param {Object} [args={}]
   * @param {string|Number} [args.id]
   * @param {string} args.type
   * @param {string} [args.language]
   * @param {string} [args.normalizedLanguage]
   * @param {Array.<Object>} args.representations
   * @param {Boolean} [args.closedCaption]
   * @param {Boolean} [args.audioDescription]
   * @param {Boolean} args.manual
   */
  function Adaptation() {
    var _this = this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Adaptation);

    var nId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_id_js__["a" /* default */])();
    this.id = args.id == null ? nId : "" + args.id;
    this.type = args.type || "";
    this.representations = Array.isArray(args.representations) ? args.representations.map(function (r) {
      return new __WEBPACK_IMPORTED_MODULE_2__representation_js__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0_object_assign___default()({ rootId: _this.id }, r));
    }).sort(function (a, b) {
      return a.bitrate - b.bitrate;
    }) : [];

    if (args.language != null) {
      this.language = args.language;
    }

    if (args.normalizedLanguage != null) {
      this.normalizedLanguage = args.normalizedLanguage;
    }

    if (args.closedCaption != null) {
      this.isClosedCaption = args.closedCaption;
    }
    if (args.audioDescription != null) {
      this.isAudioDescription = args.audioDescription;
    }

    // TODO rename both protectionData?
    if (args.contentProtection != null) {
      this.contentProtection = args.contentProtection;
    }
    if (args.smoothProtection != null) {
      this._smoothProtection = args.smoothProtection;
    }

    // for manual adaptations (not in the manifest)
    this.manual = args.manual;

    // ---------
    // this._rootURL = args.rootURL;
    // this._baseURL = args.baseURL;
  }

  /**
   * @returns {Array.<Number>}
   */


  Adaptation.prototype.getAvailableBitrates = function getAvailableBitrates() {
    return this.representations.map(function (r) {
      return r.bitrate;
    });
  };

  Adaptation.prototype.getRepresentation = function getRepresentation(wantedId) {
    return __WEBPACK_IMPORTED_MODULE_1_array_find___default()(this.representations, function (_ref) {
      var id = _ref.id;
      return wantedId === id;
    });
  };

  /**
   * @param {Number} bitrate
   * @returns {Representation|null}
   */


  Adaptation.prototype.getRepresentationsForBitrate = function getRepresentationsForBitrate(bitrate) {
    return this.representations.filter(function (r) {
      return r.bitrate === bitrate;
    }) || null;
  };

  return Adaptation;
}();

/* harmony default export */ __webpack_exports__["a"] = (Adaptation);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adaptation_js__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_id_js__ = __webpack_require__(40);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Normalized Manifest structure.
 *
 * API Public Properties:
 *   - id {string|Number}
 *   - adaptations {Object}:
 *       adaptations.video {[]Adaptation|undefined}
 *       adaptations.audio {[]Adaptation|undefined}
 *       adaptations.text {[]Adaptation|undefined}
 *       adaptations.image {[]Adaptation|undefined}
 *       adaptations.other {[]adaptation|undefined}
 *   - periods {[]Object} TODO
 *   - isLive {Boolean}
 *   - uris {[]string}
 *   - transport {string}
 *
 * API Public Methods:
 *   - getDuration () => {Number} - Returns duration of the entire content, in s
 */

var Manifest = function () {
  /**
   * @constructor
   * @param {Object} [args={}]
   * @param {string|Number} [args.id]
   * @param {string} args.transportType
   * @param {Array.<Object>} args.adaptations
   * @param {string} args.type
   * @param {Array.<string>} args.locations
   * @param {Number} args.duration
   */
  function Manifest() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Manifest);

    var nId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_id_js__["a" /* default */])();
    this.id = args.id == null ? nId : "" + args.id;
    this.transport = args.transportType || "";
    this.adaptations = args.adaptations ? Object.keys(args.adaptations).reduce(function (acc, val) {
      acc[val] = args.adaptations[val].map(function (a) {
        return new __WEBPACK_IMPORTED_MODULE_1__adaptation_js__["a" /* default */](a);
      });
      return acc;
    }, {}) : [];

    // TODO Real period management
    this.periods = [{
      adaptations: this.adaptations
    }];

    this.isLive = args.type === "dynamic";
    this.uris = args.locations || [];

    // --------- private data
    this._duration = args.duration;

    // Will be needed here
    this.suggestedPresentationDelay = args.suggestedPresentationDelay;
    this.availabilityStartTime = args.availabilityStartTime;
    this.presentationLiveGap = args.presentationLiveGap;
    this.timeShiftBufferDepth = args.timeShiftBufferDepth;
  }

  /**
   * @returns {Number}
   */


  Manifest.prototype.getDuration = function getDuration() {
    return this._duration;
  };

  Manifest.prototype.getUrl = function getUrl() {
    return this.uris[0];
  };

  /**
   * @returns {Array.<Object>}
   */


  Manifest.prototype.getAdaptations = function getAdaptations() {
    var adaptationsByType = this.adaptations;
    if (!adaptationsByType) {
      return [];
    }

    var adaptationsList = [];
    for (var type in adaptationsByType) {
      var adaptations = adaptationsByType[type];
      adaptationsList.push.apply(adaptationsList, adaptations);
    }
    return adaptationsList;
  };

  Manifest.prototype.getAdaptation = function getAdaptation(wantedId) {
    return __WEBPACK_IMPORTED_MODULE_0_array_find___default()(this.getAdaptations(), function (_ref) {
      var id = _ref.id;
      return wantedId === id;
    });
  };

  Manifest.prototype.updateLiveGap = function updateLiveGap(delta) {
    if (this.isLive) {
      this.presentationLiveGap += delta;
    }
  };

  return Manifest;
}();

/* harmony default export */ __webpack_exports__["a"] = (Manifest);

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timeline_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(23);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Provide helpers for SegmentBase-based indexes.
 * @type {Object}
 * TODO weird that everything is inherited from Timeline...
 * Reimplement from scratch
 */
/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_object_assign___default()({}, __WEBPACK_IMPORTED_MODULE_1__timeline_js__["default"], {
  getInitSegment: __WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* getInitSegment */],
  setTimescale: __WEBPACK_IMPORTED_MODULE_2__helpers_js__["b" /* setTimescale */],
  scale: __WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* scale */],

  /**
   * Add a new segment to the index.
   *
   * /!\ Mutate the given index
   * @param {Object} index
   * @param {Object} segmentInfos
   * @param {Number} segmentInfos.timescale
   * @param {Number} segmentInfos.duration
   * @param {Number} segmentInfos.count
   * @param {*} segmentInfos.range - TODO check type
   * @returns {Boolean} - true if the segment has been added
   */
  _addSegmentInfos: function _addSegmentInfos(index, segmentInfos) {
    if (segmentInfos.timescale !== index.timescale) {
      var timescale = index.timescale;

      index.timeline.push({
        ts: segmentInfos.time / segmentInfos.timescale * timescale,
        d: segmentInfos.duration / segmentInfos.timescale * timescale,
        r: segmentInfos.count,
        range: segmentInfos.range
      });
    } else {
      index.timeline.push({
        ts: segmentInfos.time,
        d: segmentInfos.duration,
        r: segmentInfos.count,
        range: segmentInfos.range
      });
    }
    return true;
  },


  /**
   * Returns false as no Segment-Base based index should need to be refreshed.
   * @returns {Boolean}
   */
  shouldRefresh: function shouldRefresh() {
    return false;
  }
}));

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var indexes = {};

if (true) {
  indexes.smooth = __webpack_require__(144).default;
}
if (true) {
  indexes.timeline = __webpack_require__(37).default;
  indexes.template = __webpack_require__(145).default;
  indexes.list = __webpack_require__(143).default;
  indexes.base = __webpack_require__(141).default;
}

/**
 * Indexes have multiple "flavors" depending on the manifest concerned.
 * Here we returns the helpers best adapted to the given index.
 * @param {Object} index
 * @returns {Object|undefined}
 */
var getRightIndexHelpers = function getRightIndexHelpers(index) {
  return indexes[index.indexType];
};

/* harmony default export */ __webpack_exports__["a"] = (getRightIndexHelpers);

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__segment_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(23);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * NEEDED IN INDEX
 * duration
 * list []
 *   ?range
 * timescale
 */

/**
 * Provide helpers for SegmentList-based indexes.
 * @type {Object}
 */
var ListIndexHelpers = {
  getInitSegment: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* getInitSegment */],
  setTimescale: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* setTimescale */],
  scale: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* scale */],

  /**
   * @param {string|Number} repId
   * @param {Object} index
   * @param {Number} _up
   * @param {Number} _to
   * @returns {Array.<Segment>}
   */
  getSegments: function getSegments(repId, index, _up, _to) {
    var _normalizeRange = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["d" /* normalizeRange */])(index, _up, _to),
        up = _normalizeRange.up,
        to = _normalizeRange.to;

    var duration = index.duration,
        list = index.list,
        timescale = index.timescale;

    var length = Math.min(list.length - 1, Math.floor(to / duration));
    var segments = [];
    var i = Math.floor(up / duration);
    while (i <= length) {
      var range = list[i].range;
      var media = list[i].media;
      var args = {
        id: "" + repId + "_" + i,
        time: i * duration,
        init: false,
        range: range,
        duration: duration,
        indexRange: null,
        timescale: timescale,
        media: media
      };
      segments.push(new __WEBPACK_IMPORTED_MODULE_0__segment_js__["a" /* default */](args));
      i++;
    }
    return segments;
  },


  /**
   * Returns first position in index.
   * @returns {Number}
   */
  getFirstPosition: function getFirstPosition() {
    return 0;
  },


  /**
   * Returns last position in index.
   * @param {Object} index
   * @returns {Number}
   */
  getLastPosition: function getLastPosition(index) {
    var duration = index.duration,
        list = index.list;

    return list.length * duration / index.timescale;
  },


  /**
   * Returns true if, based on the arguments, the index should be refreshed.
   * (If we should re-fetch the manifest)
   * @param {Object} index
   * @param {Number} up
   * @param {Number} to
   * @returns {Boolean}
   */
  shouldRefresh: function shouldRefresh(index, time, up, to) {
    var timescale = index.timescale,
        duration = index.duration,
        list = index.list,
        _index$presentationTi = index.presentationTimeOffset,
        presentationTimeOffset = _index$presentationTi === undefined ? 0 : _index$presentationTi;


    var scaledTo = to * timescale - presentationTimeOffset;
    var i = Math.floor(scaledTo / duration);
    return !(i >= 0 && i < list.length);
  },


  /**
   * We do not have to add new segments to SegmentList-based indexes.
   * Return false in any case.
   * @returns {Boolean}
   */
  _addSegmentInfos: function _addSegmentInfos() {
    return false;
  },


  /**
   * We do not check for discontinuity in SegmentList-based indexes.
   * @returns {Number}
   */
  checkDiscontinuity: function checkDiscontinuity() {
    return -1;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (ListIndexHelpers);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timeline_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(23);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/* harmony default export */ __webpack_exports__["default"] = ({
  getSegments: __WEBPACK_IMPORTED_MODULE_0__timeline_js__["default"].getSegments, // TODO Re-implement?
  getInitSegment: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* getInitSegment */],
  checkDiscontinuity: __WEBPACK_IMPORTED_MODULE_0__timeline_js__["default"].checkDiscontinuity, // TODO Re-implement?
  _addSegmentInfos: __WEBPACK_IMPORTED_MODULE_0__timeline_js__["default"]._addSegmentInfos,
  setTimescale: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* setTimescale */],
  scale: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* scale */],

  /**
   * Returns true if, based on the arguments, the index should be refreshed.
   * (If we should re-fetch the manifest)
   * @param {Object} index
   * @param {Number} time
   * @param {Number} from
   * @param {Number} to
   * @returns {Boolean}
   */
  shouldRefresh: function shouldRefresh(index, time, from, to) {
    var timeline = index.timeline,
        timescale = index.timescale,
        _index$presentationTi = index.presentationTimeOffset,
        presentationTimeOffset = _index$presentationTi === undefined ? 0 : _index$presentationTi;


    var scaledTime = time * timescale - presentationTimeOffset;
    var last = timeline[timeline.length - 1];
    if (!last) {
      return false;
    }

    if (last.d < 0) {
      last = { ts: last.ts, d: 0, r: last.r };
    }

    var lastEnd = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["e" /* getTimelineRangeEnd */])(last);
    var scaledTo = to * timescale - presentationTimeOffset;

    // TODO This is an ugly hack, see buffer code.
    // What we do here is to check if we are currently close to the end
    // of the index and if we still have no informations about the next
    // segments.
    // If that's the case we have to refresh.
    return (lastEnd - scaledTime) / timescale <= 1 && scaledTo > lastEnd;
  },


  /**
   * Returns first position in index.
   * @param {Object} index
   * @returns {Number}
   */
  getFirstPosition: function getFirstPosition(index) {
    if (!index.timeline.length) {
      return undefined;
    }
    return index.timeline[0].ts / index.timescale;
  },


  /**
   * Returns last position in index.
   * @param {Object} index
   * @returns {Number}
   */
  getLastPosition: function getLastPosition(index) {
    if (!index.timeline.length) {
      return undefined;
    }
    var lastTimelineElement = index.timeline[index.timeline.length - 1];
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["e" /* getTimelineRangeEnd */])(lastTimelineElement) / index.timescale;
  }
});

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__segment_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_js__ = __webpack_require__(23);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/* harmony default export */ __webpack_exports__["default"] = ({
  getInitSegment: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["a" /* getInitSegment */],
  setTimescale: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["b" /* setTimescale */],
  scale: __WEBPACK_IMPORTED_MODULE_1__helpers_js__["c" /* scale */],

  /**
   * @param {string|Number} repId
   * @param {Object} index
   * @param {Number} _up
   * @param {Number} _to
   * @returns {Array.<Segment>}
   */
  getSegments: function getSegments(repId, index, _up, _to) {
    var _normalizeRange = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_js__["d" /* normalizeRange */])(index, _up, _to),
        up = _normalizeRange.up,
        to = _normalizeRange.to;

    var duration = index.duration,
        startNumber = index.startNumber,
        timescale = index.timescale,
        media = index.media;


    var segments = [];
    for (var time = up; time <= to; time += duration) {
      var number = Math.floor(time / duration) + (startNumber == null ? 1 : startNumber);

      var args = {
        id: "" + repId + "_" + number,
        number: number,
        time: number * duration,
        init: false,
        duration: duration,
        range: null,
        indexRange: null,
        timescale: timescale,
        media: media
      };
      segments.push(new __WEBPACK_IMPORTED_MODULE_0__segment_js__["a" /* default */](args));
    }

    return segments;
  },


  /**
   * Returns first position in index.
   * @returns {undefined}
   */
  getFirstPosition: function getFirstPosition() {
    return undefined;
  },


  /**
   * Returns last position in index.
   * @returns {undefined}
   */
  getLastPosition: function getLastPosition() {
    return undefined;
  },


  /**
   * Returns true if, based on the arguments, the index should be refreshed.
   * We never have to refresh a SegmentTemplate-based manifest.
   * @returns {Boolean}
   */
  shouldRefresh: function shouldRefresh() {
    return false;
  },


  /**
   * We cannot check for discontinuity in SegmentTemplate-based indexes.
   * @returns {Number}
   */
  checkDiscontinuity: function checkDiscontinuity() {
    return -1;
  },


  /**
   * We do not have to add new segments to SegmentList-based indexes.
   * Return false in any case.
   * @returns {Boolean}
   */
  _addSegmentInfos: function _addSegmentInfos() {
    return false;
  }
});

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_id_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__representation_index_js__ = __webpack_require__(147);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * Normalized Representation structure.
 *
 * API Public Properties:
 *   - id {string|Number}
 *   - bitrate {Number}
 *   - codec {string}
 *   - height {Number|undefined}
 *   - width {Number|undefined}
 *   - mimeType {Number|undefined}
 *
 * API Public Methods:
 *   - getSegments () => {[]Segment}
 */

var Representation =
/**
 * @constructor
 * @param {Object} [args={}]
 * @param {string|Number} [args.rootId]
 * @param {string|Number} [args.id]
 * @param {Number} args.bitrate
 * @param {string} args.codecs
 * @param {Number} args.height
 * @param {Number} args.width
 * @param {string} args.mimeType
 * @param {Object} args.index
 */
function Representation() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Representation);

  var nId = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_id_js__["a" /* default */])();
  this.id = args.id == null ? nId : args.id;
  this.bitrate = args.bitrate;
  this.codec = args.codecs;

  if (args.height != null) {
    this.height = args.height;
  }

  if (args.width != null) {
    this.width = args.width;
  }

  if (args.mimeType != null) {
    this.mimeType = args.mimeType;
  }

  this.index = new __WEBPACK_IMPORTED_MODULE_1__representation_index_js__["a" /* default */]({
    index: args.index,
    rootId: this.id
  });

  this.baseURL = args.baseURL;

  // Most of those are for the smooth init segment
  if (args.codecPrivateData != null) {
    this._codecPrivateData = args.codecPrivateData;
  }
  if (args.channels != null) {
    this._channels = args.channels;
  }
  if (args.bitsPerSample != null) {
    this._bitsPerSample = args.bitsPerSample;
  }
  if (args.packetSize != null) {
    this._packetSize = args.packetSize;
  }
  if (args.samplingRate != null) {
    this._samplingRate = args.samplingRate;
  }

  // this._audioSamplingRate = args.audioSamplingRate;
  // this._codingDependency = args.codingDependency;
  // this._frameRate = args.frameRate;
  // this._maxPlayoutRate = args.maxPlayoutRate;
  // this._maximumSAPPeriod = args.maximumSAPPeriod;
  // this._profiles = args.profiles;
  // this._segmentProfiles = args.segmentProfiles;
};

/* harmony default export */ __webpack_exports__["a"] = (Representation);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__indexes_index_js__ = __webpack_require__(142);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var RepresentationIndex = function () {
  /**
   * @constructor
   * @param {Object} args
   * @param {Object} args.index
   * @param {string|Number} args.rootId
   */
  function RepresentationIndex(args) {
    _classCallCheck(this, RepresentationIndex);

    this._index = args.index;
    this._rootId = args.rootId;
    this._indexHelpers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__indexes_index_js__["a" /* default */])(this._index);
  }

  RepresentationIndex.prototype.getInitSegment = function getInitSegment() {
    return this._indexHelpers.getInitSegment(this._rootId, this._index);
  };

  RepresentationIndex.prototype.getSegments = function getSegments(up, duration) {
    return this._indexHelpers.getSegments(this._rootId, this._index, up, duration);
  };

  RepresentationIndex.prototype.shouldRefresh = function shouldRefresh(time, up, to) {
    return this._indexHelpers.shouldRefresh(this._index, time, up, to);
  };

  RepresentationIndex.prototype.getFirstPosition = function getFirstPosition() {
    return this._indexHelpers.getFirstPosition(this._index);
  };

  RepresentationIndex.prototype.getLastPosition = function getLastPosition() {
    return this._indexHelpers.getLastPosition(this._index);
  };

  RepresentationIndex.prototype.checkDiscontinuity = function checkDiscontinuity(time) {
    return this._indexHelpers.checkDiscontinuity(this._index, time);
  };

  /**
   * Returns time given scaled into seconds.
   * @param {Number} time
   * @returns {Number}
   */


  RepresentationIndex.prototype.scale = function scale(time) {
    return this._indexHelpers.scale(this._index, time);
  };

  /**
   * Update the timescale used (for all segments).
   * @param {Number} timescale
   */


  RepresentationIndex.prototype.setTimescale = function setTimescale(timescale) {
    return this._indexHelpers.setTimescale(this._index, timescale);
  };

  RepresentationIndex.prototype._addSegments = function _addSegments(nextSegments, currentSegment) {
    var addedSegments = [];
    for (var i = 0; i < nextSegments.length; i++) {
      if (this._indexHelpers._addSegmentInfos(this._index, nextSegments[i], currentSegment)) {
        addedSegments.push(nextSegments[i]);
      }
    }
    return addedSegments;
  };

  RepresentationIndex.prototype.update = function update(newIndex) {
    this._index = newIndex._index;
  };

  RepresentationIndex.prototype.getType = function getType() {
    return this._index.indexType || "";
  };

  return RepresentationIndex;
}();

/* harmony default export */ __webpack_exports__["a"] = (RepresentationIndex);

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var exported = {};
if (true) {
  exported.smooth = __webpack_require__(157).default;
}
if (true) {
  exported.dash = __webpack_require__(149).default;
}
if (true) {
  exported.directfile = __webpack_require__(156).default;
}

/* harmony default export */ __webpack_exports__["a"] = (exported);

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_url__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_bytes_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parsers_isobmff_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parsers_texttracks_sami_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parsers_texttracks_ttml_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parsers_bif_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__manifest__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__isobmff_timing_infos_js__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__request_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__segment_loader_js__ = __webpack_require__(155);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


















// TODO Put that doc elsewhere for all transports
// TODO Separate manifest pipeline from other pipelines?
// TODO delete resolver (or move some segment logic into a resolver)?
// TODO merge loader and parser? (DASH xlink)

/**
 * The object returned by the observable of a resolver has the following key:
 *   - url {string}: the url on which the request should be done.
 */

/**
 * The objects returned by the observable of a loader are linked to a request.
 * They can be under two forms:
 *   - 0+ progress reports
 *   - 1 response (always the last object emitted)
 *
 * Those objects have two keys: type {string} and value {Object}. _type_ allows
 * to know which type of object we have:
 *   - "progress": means it is a progress report
 *   - "response" means it is a response
 *
 * The _value_ object differs depending on the type.
 *
 * For progress reports, _value_ has the following keys:
 *   - size {Number}: number of bytes currently loaded
 *   - totalSize {Number|undefined}: number of bytes to download in total
 *   - duration {Number}: amount of time since the beginning of the request, in
 *     ms
 *   - url {string}: the url on which the request was done
 *
 * For a _response_, _value_ has the following keys:
 *   - size {Number|undefined}: number of bytes of the response
 *   - duration {Number}: total amount of time for the request, in ms
 *   - url {string}: the url on which the request was done
 *   - responseData {*}: the response, its value depends on the responseType
 *     header.
 */

/**
 * The object returned by the observable of the manifest parser has the
 * following keys:
 *   - manifest {Object}: The parsed manifest
 *   - url {string}: url at which the manifest was downloaded
 */

/**
 * The object returned by the observable of the audio, video, text and image's
 * parser has the following keys:
 *
 *   - segmentData {*}: The raw exploitable data of the downloaded segment.
 *     The type of data depends on the type of pipeline concerned (audio/video
 *     returns an ArrayBuffer, image an object, text an Array).
 *
 *   - segmentInfos {Object|undefined}: Informations about the parsed segment.
 *     Contains the following keys:
 *
 *       - time {Number}: initial start time for that segment, in the segment
 *         timescale.
 *         Can be -1 if the segment is not meant to be played (e.g. init
 *         segments).
 *
 *       - duration {Number}: duration for that segment, in the segment
 *         timescale. Can be 0 if the segment has no duration (e.g init
 *         segments).
 *
 *       - timescale {Number|undefined}: timescale in which the duration
 *         and time of this same object are defined. For init segments, this
 *         value can be undefined.
 *
 *     For init segments, this object can be important for subsequent download
 *     of "regular" segments. As such, it should be re-fed as an "init" object
 *     to the load function of the corresponding pipeline, for segments linked
 *     to this init segment (the pipelines here do not save any state).
 *
 *   - nextSegments {Array.<Object>|undefined}: Supplementary informations on
 *   subsequent segment. TODO documentation of nextSegments.
 */

/**
 * More specifically, the text parser's segmentData should be an object, with
 * the following keys:
 *
 *   - data {*}: The texttrack data TODO explain
 *
 *   - timescale {Number}: the timescale. That is, the number of time units that
 *     pass in one second. For example, a time coordinate system that measures
 *     time in sixtieths of a second has a timescale of 60.
 *
 *   - start {Number}: The start time, timescaled, those texttracks are for.
 *     Note that this value is different than the start of the first cue:
 *       - the start of the first cue is the time at which the first cue in the
 *         data given should begin to be displayed.
 *       - ``start`` is the absolute start time for which the data apply.
 *     That means, if the given data is for a segment that begins with 10s
 *     without any cue, the ``start`` value should be 10s (timescaled) inferior
 *     to the start of the first cue.
 *     This is useful to copy the behavior of "native" SourceBuffer to indicate
 *     which segments have been "buffered".
 *
 *   - end {Number|undefined}: The end time, timescaled, those texttracks are
 *     for.
 *     Check ``start`` for more informations about the difference between this
 *     value and the end of the last cue in the data.
 *     This number can be undefined to raise the error resilience. In that case,
 *     the end time will be defined from the last text track in the data.
 */

/**
 * Returns pipelines used for DASH streaming.
 * @param {Object} options
 * implementation. Used for each generated http request.
 * @param {Function} [options.contentProtectionParser] - Optional parser for the
 * manifest's content Protection.
 * @returns {Object}
 */
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var segmentLoader = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__segment_loader_js__["a" /* default */])(options.segmentLoader);
  var contentProtectionParser = options.contentProtectionParser;


  if (!contentProtectionParser) {
    contentProtectionParser = function contentProtectionParser() {};
  }

  var manifestPipeline = {
    loader: function loader(_ref) {
      var url = _ref.url;

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__request_js__["a" /* default */])({
        url: url,
        responseType: "document"
      });
    },
    parser: function parser(_ref2) {
      var response = _ref2.response;

      var data = response.responseData;
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({
        manifest: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__manifest__["a" /* default */])(data, contentProtectionParser),
        url: response.url
      });
    }
  };

  var segmentPipeline = {
    loader: function loader(_ref3) {
      var segment = _ref3.segment,
          representation = _ref3.representation,
          adaptation = _ref3.adaptation,
          manifest = _ref3.manifest;

      return segmentLoader({
        segment: segment,
        representation: representation,
        adaptation: adaptation,
        manifest: manifest
      });
    },
    parser: function parser(_ref4) {
      var segment = _ref4.segment,
          adaptation = _ref4.adaptation,
          response = _ref4.response,
          init = _ref4.init;

      var responseData = new Uint8Array(response.responseData);
      var nextSegments = void 0,
          segmentInfos = void 0;
      var segmentData = responseData;

      var indexRange = segment.indexRange;
      var sidxSegments = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__parsers_isobmff_js__["a" /* parseSidx */])(responseData, indexRange ? indexRange[0] : 0);
      if (sidxSegments) {
        nextSegments = sidxSegments;
      }

      if (segment.isInit) {
        segmentInfos = { time: -1, duration: 0 };
        var timescale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__parsers_isobmff_js__["b" /* getMDHDTimescale */])(responseData);
        if (timescale > 0) {
          segmentInfos.timescale = timescale;
        }
        if (adaptation.contentProtection) {
          segmentData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__parsers_isobmff_js__["c" /* patchPssh */])(responseData, adaptation.contentProtection);
        }
      } else {
        segmentInfos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__isobmff_timing_infos_js__["a" /* default */])(segment, responseData, sidxSegments, init);
      }

      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ segmentData: segmentData, segmentInfos: segmentInfos, nextSegments: nextSegments });
    }
  };

  var textTrackPipeline = {
    // TODO DRY this (code too similar to segmentPipeline)
    loader: function loader(_ref5) {
      var segment = _ref5.segment,
          representation = _ref5.representation;
      var media = segment.media,
          range = segment.range,
          indexRange = segment.indexRange,
          isInit = segment.isInit;


      var responseType = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_js__["a" /* isMP4EmbeddedTrack */])(representation) ? "arraybuffer" : "text";

      // init segment without initialization media/range/indexRange:
      // we do nothing on the network
      if (isInit && !(media || range || indexRange)) {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
      }

      var path = media ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_js__["b" /* replaceTokens */])(media, segment, representation) : "";

      var mediaUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_url__["b" /* resolveURL */])(representation.baseURL, path);

      // fire a single time contiguous init and index ranges.
      if (range && indexRange && range[1] === indexRange[0] - 1) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__request_js__["a" /* default */])({
          url: mediaUrl,
          responseType: responseType,
          headers: {
            Range: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_js__["c" /* byteRange */])([range[0], indexRange[1]])
          }
        });
      }

      var mediaOrInitRequest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__request_js__["a" /* default */])({
        url: mediaUrl,
        responseType: responseType,
        headers: range ? {
          Range: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_js__["c" /* byteRange */])(range)
        } : null
      });

      // If init segment has indexRange metadata, we need to fetch
      // both the initialization data and the index metadata. We do
      // this in parallel and send the both blobs into the pipeline.
      if (indexRange) {
        var indexRequest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__request_js__["a" /* default */])({
          url: mediaUrl,
          responseType: responseType,
          headers: {
            Range: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_js__["c" /* byteRange */])(indexRange)
          }
        });
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(mediaOrInitRequest, indexRequest);
      } else {
        return mediaOrInitRequest;
      }
    },
    parser: function parser(_ref6) {
      var response = _ref6.response,
          segment = _ref6.segment,
          adaptation = _ref6.adaptation,
          representation = _ref6.representation,
          init = _ref6.init;
      var language = adaptation.language;
      var isInit = segment.isInit,
          indexRange = segment.indexRange;

      var responseData = void 0;
      var text = void 0;
      var nextSegments = void 0,
          segmentInfos = void 0;
      var segmentData = void 0;

      var isMP4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_js__["a" /* isMP4EmbeddedTrack */])(representation);
      if (isMP4) {
        responseData = new Uint8Array(response.responseData);
        text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_bytes_js__["a" /* bytesToStr */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__parsers_isobmff_js__["d" /* getMdat */])(responseData));

        var sidxSegments = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__parsers_isobmff_js__["a" /* parseSidx */])(responseData, indexRange ? indexRange[0] : 0);

        if (sidxSegments) {
          nextSegments = sidxSegments;
        }
        if (!isInit) {
          segmentInfos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__isobmff_timing_infos_js__["a" /* default */])(segment, responseData, sidxSegments, init);
        }
      } else {
        responseData = text = response.responseData;
        segmentInfos = {
          time: segment.time,
          duration: segment.duration,
          timescale: segment.timescale
        };
      }

      if (isInit) {
        segmentInfos = { time: -1, duration: 0 };
        if (isMP4) {
          var timescale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__parsers_isobmff_js__["b" /* getMDHDTimescale */])(responseData);
          if (timescale > 0) {
            segmentInfos.timescale = timescale;
          }
        }

        // void data
        segmentData = {
          start: 0,
          end: 0,
          timescale: segmentInfos.timescale || 0,
          data: []
        };
      } else if (isMP4) {
        var _representation$codec = representation.codec,
            codec = _representation$codec === undefined ? "" : _representation$codec;


        switch (codec.toLowerCase()) {
          case "stpp":
            segmentData = {
              start: segmentInfos.time,
              end: segmentInfos.time + segmentInfos.duration,
              timescale: segmentInfos.timescale,
              data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__parsers_texttracks_ttml_js__["a" /* parseTTML */])(text, language, 0)
            };
            break;
          default:
            __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].warn("The codec used for the subtitle is not managed yet.");
        }
      } else {
        switch (representation.mimeType) {
          case "application/ttml+xml":
            segmentData = {
              start: segmentInfos.time,
              end: segmentInfos.time + segmentInfos.duration,
              timescale: segmentInfos.timescale,
              data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__parsers_texttracks_ttml_js__["a" /* parseTTML */])(text, language, 0)
            };
            break;
          case "application/x-sami":
          case "application/smil":
            segmentData = {
              start: segmentInfos.time,
              end: segmentInfos.time + segmentInfos.duration,
              timescale: segmentInfos.timescale,
              data: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__parsers_texttracks_sami_js__["a" /* parseSami */])(text, language, 0)
            };
            break;
          case "text/vtt":
            segmentData = {
              start: segmentInfos.time,
              end: segmentInfos.time + segmentInfos.duration,
              timescale: segmentInfos.timescale,
              data: text
            };
            break;
          default:
            __WEBPACK_IMPORTED_MODULE_1__utils_log__["a" /* default */].warn("The codec used for the subtitle is not managed yet.");
        }
      }
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ segmentData: segmentData, segmentInfos: segmentInfos, nextSegments: nextSegments });
    }
  };

  var imageTrackPipeline = {
    loader: function loader(_ref7) {
      var segment = _ref7.segment,
          representation = _ref7.representation;
      var isInit = segment.isInit;


      if (isInit) {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
      } else {
        var media = segment.media;


        var path = media ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__utils_js__["b" /* replaceTokens */])(media, segment, representation) : "";
        var mediaUrl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_url__["b" /* resolveURL */])(representation.baseURL, path);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__request_js__["a" /* default */])({
          url: mediaUrl,
          responseType: "arraybuffer"
        });
      }
    },
    parser: function parser(_ref8) {
      var response = _ref8.response;

      var responseData = response.responseData;
      var blob = new Uint8Array(responseData);

      var segmentInfos = {
        time: 0,
        duration: Number.MAX_VALUE
      };

      var segmentData = void 0;
      if (blob) {
        var bif = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__parsers_bif_js__["a" /* parseBif */])(blob);
        segmentData = bif.thumbs;
        segmentInfos.timescale = bif.timescale;

        // TODO
        // var firstThumb = blob[0];
        // var lastThumb  = blob[blob.length - 1];

        // segmentInfos = {
        //   time: firstThumb.ts,
        //   duration:  lastThumb.ts
        // };
      }

      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ segmentData: segmentData, segmentInfos: segmentInfos });
    }
  };

  return {
    directFile: false,
    manifest: manifestPipeline,
    audio: segmentPipeline,
    video: segmentPipeline,
    text: textTrackPipeline,
    image: imageTrackPipeline
  };
});

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parsers_isobmff_js__ = __webpack_require__(38);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Get precize start and duration of a segment from ISOBMFF.
 *   1. get start from tfdt
 *   2. get duration from trun
 *   3. if at least one is missing, get both informations from sidx
 *   4. As a fallback take segment infos.
 * @param {Segment} segment
 * @param {UInt8Array} buffer - The entire isobmff container
 * @param {Array.<Object>} [sidxSegments=[]] - Segments from sidx. Here
 * pre-parsed for performance reasons as it is usually available when
 * this function is called.
 * @param {Object} initInfos
 * @returns {Object}
 */
function getISOBMFFTimingInfos(segment, buffer, sidxSegments, initInfos) {
  if (!sidxSegments) {
    sidxSegments = [];
  }
  var startTime = void 0,
      duration = void 0;

  var decodeTime = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__parsers_isobmff_js__["e" /* parseTfdt */])(buffer);
  var trunDuration = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__parsers_isobmff_js__["f" /* getDurationFromTrun */])(buffer);

  var timescale = initInfos && initInfos.timescale > 0 ? initInfos.timescale : segment.timescale;

  // we could always make a mistake when reading a container.
  // If the estimate is too far from what the segment seems to imply, take
  // the segment infos instead.
  var maxDecodeTimeDelta = void 0;

  // Scaled start time and duration as announced in the segment data
  var segmentDuration = void 0,
      segmentStart = void 0;

  if (timescale === segment.timescale) {
    maxDecodeTimeDelta = Math.min(0.9 * timescale, segment.duration / 4);
    segmentStart = segment.time;
    segmentDuration = segment.duration;
  } else {
    maxDecodeTimeDelta = Math.min(0.9 * timescale, segment.duration / segment.timescale * timescale / 4);
    segmentStart = segment.time / segment.timescale * timescale;
    segmentDuration = segment.duration / segment.timescale * timescale;
  }

  if (decodeTime >= 0 && (segmentStart == null || Math.abs(decodeTime - segmentStart) <= maxDecodeTimeDelta)) {
    startTime = decodeTime;
  }

  if (trunDuration >= 0 && (segmentDuration == null || Math.abs(trunDuration - segmentDuration) <= maxDecodeTimeDelta)) {
    duration = trunDuration;
  }

  if (startTime == null) {
    if (sidxSegments.length === 1) {
      var sidxStart = sidxSegments[0].time;
      if (sidxStart >= 0 && (segmentStart == null || Math.abs(segmentStart - sidxStart) <= maxDecodeTimeDelta)) {
        var sidxTimescale = sidxSegments[0].timescale;
        if (sidxTimescale != null && sidxTimescale !== timescale) {
          startTime = sidxStart / sidxTimescale * timescale;
        } else {
          startTime = sidxStart;
        }
      } else {
        startTime = segmentStart;
      }
    } else {
      startTime = segmentStart;
    }
  }

  if (duration == null) {
    if (sidxSegments.length === 1) {
      var sidxDuration = sidxSegments[0].duration;
      if (sidxDuration >= 0 && (segmentDuration == null || Math.abs(segmentDuration - sidxDuration) <= maxDecodeTimeDelta)) {
        var _sidxTimescale = sidxSegments[0].timescale;
        if (_sidxTimescale != null && _sidxTimescale !== timescale) {
          duration = sidxDuration / _sidxTimescale * timescale;
        } else {
          duration = sidxDuration;
        }
      } else {
        duration = segmentDuration;
      }
    } else {
      duration = segmentDuration;
    }
  }

  if (false) {
    assert(startTime != null);
    assert(duration != null);
  }

  return {
    timescale: timescale,
    time: startTime || 0,
    duration: duration || 0
  };
}

/* harmony default export */ __webpack_exports__["a"] = (getISOBMFFTimingInfos);

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_assert_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_languages__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_js__ = __webpack_require__(64);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Parse initialization attribute found in segment Template to
 * correspond to the initialization found in a regular segmentBase.
 * @param {string} attrValue
 * @returns {Object}
 */
function parseInitializationAttribute(attrValue) {
  return { media: attrValue, range: undefined };
}

// @see attributes
var RepresentationBaseType = [{ k: "profiles", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "width", fn: parseInt }, { k: "height", fn: parseInt }, { k: "frameRate", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["h" /* parseFrameRate */] }, { k: "audioSamplingRate", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "mimeType", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "segmentProfiles", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "codecs", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "maximumSAPPeriod", fn: parseFloat }, { k: "maxPlayoutRate", fn: parseFloat }, { k: "codingDependency", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["i" /* parseBoolean */] }];

// @see attributes
var SegmentBaseType = [{ k: "timescale", fn: parseInt, def: 1 }, { k: "timeShiftBufferDepth", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */] }, { k: "presentationTimeOffset", fn: parseFloat, def: 0 }, { k: "indexRange", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["f" /* parseByteRange */] }, { k: "indexRangeExact", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["i" /* parseBoolean */], def: false }, { k: "availabilityTimeOffset", fn: parseFloat }, { k: "availabilityTimeComplete", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["i" /* parseBoolean */], def: true }];

// @see attributes
var MultipleSegmentBaseType = SegmentBaseType.concat([{ k: "duration", fn: parseInt }, { k: "startNumber", fn: parseInt }]);

/**
 * Object describing how a Dash MPD should be parsed automatically.
 *
 * Basically, immediate keys are the nodeName concerned.
 * They contain array of Objects, each concerning a unique node attributes.
 *
 * The keys these Objects have are as such:
 *
 *   - k {string}: the name of the node attribute
 *
 *   - fn {Function}: the function called to parse this attribute. It takes
 *     as argument the attribute value and should return the parsed value.
 *
 *   - n {string}: new name used for the attribute in the parsed object.
 *
 *   - def {*}: the default value used if the attribute is not found in the
 *     MPD.
 */
var attributes = {
  "ContentProtection": [{ k: "schemeIdUri", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "value", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }],

  "SegmentURL": [{ k: "media", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "mediaRange", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["f" /* parseByteRange */] }, { k: "index", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "indexRange", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["f" /* parseByteRange */] }],

  "S": [{ k: "t", fn: parseInt, n: "ts" }, { k: "d", fn: parseInt }, { k: "r", fn: parseInt }],

  "SegmentTimeline": [],
  "SegmentBase": SegmentBaseType,
  "SegmentTemplate": MultipleSegmentBaseType.concat([{ k: "initialization", fn: parseInitializationAttribute }, { k: "index", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "media", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "bitstreamSwitching", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }]),
  "SegmentList": MultipleSegmentBaseType,

  "ContentComponent": [{ k: "id", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "lang", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */], n: "language" }, { k: "lang", fn: __WEBPACK_IMPORTED_MODULE_2__utils_languages__["a" /* normalize */], n: "normalizedLanguage" }, { k: "contentType", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "par", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["k" /* parseRatio */] }],

  "Representation": RepresentationBaseType.concat([{ k: "id", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "bandwidth", fn: parseInt, n: "bitrate" }, { k: "qualityRanking", fn: parseInt }]),

  "AdaptationSet": RepresentationBaseType.concat([{ k: "id", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "group", fn: parseInt }, { k: "lang", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */], n: "language" }, { k: "lang", fn: __WEBPACK_IMPORTED_MODULE_2__utils_languages__["a" /* normalize */], n: "normalizedLanguage" }, { k: "contentType", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "par", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["k" /* parseRatio */] }, { k: "minBandwidth", fn: parseInt, n: "minBitrate" }, { k: "maxBandwidth", fn: parseInt, n: "maxBitrate" }, { k: "minWidth", fn: parseInt }, { k: "maxWidth", fn: parseInt }, { k: "minHeight", fn: parseInt }, { k: "maxHeight", fn: parseInt }, { k: "minFrameRate", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["h" /* parseFrameRate */] }, { k: "maxFrameRate", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["h" /* parseFrameRate */] }, { k: "segmentAlignment", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["l" /* parseIntOrBoolean */] }, { k: "subsegmentAlignment", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["l" /* parseIntOrBoolean */] }, { k: "bitstreamSwitching", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["i" /* parseBoolean */] }]),

  "Period": [{ k: "id", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "start", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */] }, { k: "duration", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */] }, { k: "bitstreamSwitching", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["i" /* parseBoolean */] }],

  "MPD": [{ k: "id", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "profiles", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "type", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */], def: "static" }, { k: "availabilityStartTime", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["m" /* parseDateTime */] }, { k: "availabilityEndTime", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["m" /* parseDateTime */] }, { k: "publishTime", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["m" /* parseDateTime */] }, { k: "mediaPresentationDuration", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */], n: "duration" }, { k: "minimumUpdatePeriod", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */] }, { k: "minBufferTime", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */] }, { k: "timeShiftBufferDepth", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */] }, {
    k: "suggestedPresentationDelay",
    fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */],
    def: __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */].DEFAULT_SUGGESTED_PRESENTATION_DELAY.DASH
  }, { k: "maxSegmentDuration", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */] }, { k: "maxSubsegmentDuration", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["j" /* parseDuration */] }],

  "Role": [{ k: "schemeIdUri", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "value", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }],

  "Accessibility": [{ k: "schemeIdUri", fn: __WEBPACK_IMPORTED_MODULE_3__helpers_js__["g" /* parseString */] }, { k: "value", fn: parseInt }]
};

/**
 * @param {Document} node - The Node content
 * @param {Object} [base] - Base object that will be enriched
 * @returns {Object}
 */
function feedAttributes(node, base) {
  var attrs = attributes[node.nodeName];

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_assert_js__["a" /* default */])(attrs, "no attributes for " + node.nodeName);

  var obj = base || {};
  for (var i = 0; i < attrs.length; i++) {
    var _attrs$i = attrs[i],
        k = _attrs$i.k,
        fn = _attrs$i.fn,
        n = _attrs$i.n,
        def = _attrs$i.def;

    if (node.hasAttribute(k)) {
      obj[n || k] = fn(node.getAttribute(k));
    } else if (def != null) {
      obj[n || k] = def;
    }
  }
  return obj;
}

/* harmony default export */ __webpack_exports__["a"] = (feedAttributes);

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return filterMPD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return filterPeriod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return filterAdaptation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return filterRepresentation; });
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Keys in a parsed manifest are, after parsing, filtered to only the keys
 * actually used to simplify manifest management and debugging in the core.
 *
 * This allows to clearly see what manifest property is exploited in this player
 * for now and allows a cleaner management down the line. It also allows to
 * greatly simplify the update / creation of other streaming technologies
 * (MSS, HLS...) for this player, as they should all give the same properties.
 *
 * The arrays of strings declared here are the keys used in each type of object
 * (periods, adaptations, etc.).
 *
 * NOTE: This object can be totally removed without losing any feature. It had
 * mainly been added to simplify debugging.
 */
var FILTERED_KEYS = {

  /**
   * Every keys in a returned manifest (@see parseMDP).
   * The commented ones are the ones available here but not yet exploited.
   */
  MPD: [
  // "availabilityEndTime",
  // "minimumUpdatePeriod",
  // "profiles",
  // "publishTime",
  // "maxSegmentDuration",
  // "maxSubsegmentDuration",
  // "minBufferTime",
  "availabilityStartTime", "baseURL", "duration", "id", "locations", "periods", "presentationLiveGap", "suggestedPresentationDelay", "timeShiftBufferDepth", "transportType", "type"],

  /**
   * Every keys in a returned period (@see parsePeriod).
   * The commented ones are the ones available here but not yet exploited.
   */
  PERIOD: [
  // "bitstreamSwitching",
  "adaptations", "baseURL", "duration", "id", "start"],

  /**
   * Every keys in a returned adaptation (@see parseAdaptationSet).
   * The commented ones are the ones available here but not yet exploited.
   */
  ADAPTATION: [
  // "audioSamplingRate",
  // "bitstreamSwitching",
  // "codingDependency",
  // "contentComponent",
  // "contentType",
  // "frameRate",
  // "group",
  // "maxBitrate",
  // "maxFrameRate",
  // "maxHeight",
  // "maxPlayoutRate",
  // "maxWidth",
  // "maximumSAPPeriod",
  // "minBitrate",
  // "minFrameRate",
  // "minHeight",
  // "minWidth",
  // "par",
  // "profiles",
  // "role",
  // "segmentAlignment",
  // "segmentProfiles",
  // "subsegmentAlignment",
  "contentProtection", "accessibility", "baseURL", "contentProtection", "id", "language", "normalizedLanguage", "representations", "type"],

  /**
   * Every keys in a returned representation (@see parseRepresentation).
   * The commented ones are the ones available here but not yet exploited.
   */
  REPRESENTATION: [
  // "audioSamplingRate",
  // "codingDependency",
  // "frameRate",
  // "maxPlayoutRate",
  // "maximumSAPPeriod",
  // "profiles",
  // "qualityRanking",
  // "segmentProfiles",
  "bitrate", "baseURL", "codecs", "height", "id", "index", "mimeType", "width"]
};

/**
 * Create filter function for a corresponding FILTERED_KEYS array
 * of string.
 * @param {Array.<string>} filter - Array containing only the keys to filter in.
 * @returns {Function} - Function taking in argument an object and applying the
 * filter on it (keeping only the declared keys).
 */
var createFilter = function createFilter(filter) {
  return function (obj) {
    return filter.reduce(function (acc, key) {
      if (obj.hasOwnProperty(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };
};

var filterMPD = createFilter(FILTERED_KEYS.MPD);
var filterPeriod = createFilter(FILTERED_KEYS.PERIOD);
var filterAdaptation = createFilter(FILTERED_KEYS.ADAPTATION);
var filterRepresentation = createFilter(FILTERED_KEYS.REPRESENTATION);

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parseFromString */
/* unused harmony export parseFromDocument */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parsers_js__ = __webpack_require__(154);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * @param {Document} manifest - Original manifest as returned by the server
 * @param {Function} [contentProtectionParser]
 * @returns {Object} - parsed manifest
 */
function parseFromDocument(document, contentProtectionParser) {
  var root = document.documentElement;
  __WEBPACK_IMPORTED_MODULE_0__utils_assert__["a" /* default */].equal(root.nodeName, "MPD", "document root should be MPD");
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__parsers_js__["a" /* parseMPD */])(root, contentProtectionParser);
}

/**
 * @param {string} manifest - manifest file in a string format
 * @param {Function} [contentProtectionParser]
 * @returns {Object} - parsed manifest
 */
function parseFromString(manifest, contentProtectionParser) {
  return parser.parseFromDocument(new DOMParser().parseFromString(manifest, "application/xml"), contentProtectionParser);
}

/**
 * @param {string|Document} manifest - Original manifest as returned by the
 * server. Either in string format, or in a Document Object format.
 * @param {Function} [contentProtectionParser]
 * @returns {Object} - parsed manifest
 */
function parser(manifest, contentProtectionParser) {
  if (typeof manifest == "string") {
    return parser.parseFromString(manifest, contentProtectionParser);
  } else {
    return parser.parseFromDocument(manifest, contentProtectionParser);
  }
}

parser.parseFromString = parseFromString;
parser.parseFromDocument = parseFromDocument;



/* harmony default export */ __webpack_exports__["a"] = (parser);

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseMPD; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_assert_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filters_js__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__attributes_js__ = __webpack_require__(151);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var representationKeysInheritedFromAdaptation = ["codecs", "height", "index", "mimeType", "width"];

function parseMPD(root, contentProtectionParser) {
  var parser = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* reduceChildren */])(root, function (res, name, node) {
    switch (name) {

      case "BaseURL":
        res.baseURL = node.textContent;
        break;

      case "Location":
        res.locations.push(node.textContent);
        break;

      case "Period":
        res.periods.push(parsePeriod(node, contentProtectionParser));
        break;
    }

    return res;
  }, {
    transportType: "dash",
    periods: [],
    locations: []
  });

  var parsed = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root, parser);

  if (/dynamic/.test(parsed.type)) {
    var adaptations = parsed.periods[0].adaptations;

    var videoAdaptation = adaptations.filter(function (a) {
      return a.type == "video";
    })[0];

    var lastRef = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["b" /* getLastLiveTimeReference */])(videoAdaptation);

    if (false) {
      assert(lastRef);
      assert(parsed.availabilityStartTime);
    }

    // if last time not found / something was invalid in the indexes, set a
    // default live time.
    if (!lastRef) {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].warn("Live edge not deduced from manifest, setting a default one");
      lastRef = Date.now() / 1000 - 60;
    }

    parsed.availabilityStartTime = parsed.availabilityStartTime.getTime() / 1000;
    parsed.presentationLiveGap = Date.now() / 1000 - (lastRef + parsed.availabilityStartTime);
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__filters_js__["a" /* filterMPD */])(parsed);
}

/**
 * Parse a single manifest period.
 * @param {Document} root
 * @param {Function} contentProtectionParser
 * @returns {Object}
 */
function parsePeriod(root, contentProtectionParser) {
  var parsed = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* reduceChildren */])(root, function (res, name, node) {
    switch (name) {

      case "BaseURL":
        res.baseURL = node.textContent;
        break;

      case "AdaptationSet":
        var ada = parseAdaptationSet(node, contentProtectionParser);
        if (ada.id == null) {
          ada.id = res.adaptations.length;
        }
        res.adaptations.push(ada);
        break;

    }
    return res;
  }, { adaptations: [] }));

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__filters_js__["b" /* filterPeriod */])(parsed);
}

function parseAdaptationSet(root, contentProtectionParser) {
  var accessibility = void 0;
  var parser = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* reduceChildren */])(root, function (res, name, node) {
    switch (name) {
      // case "Rating": break;
      // case "Viewpoint": break;

      case "Accessibility":
        accessibility = parseAccessibility(node);
        break;

      case "BaseURL":
        res.baseURL = node.textContent;
        break;

      // TODO seems to be unused
      case "ContentComponent":
        res.contentComponent = parseContentComponent(node);
        break;

      // TODO seems to be unused
      case "ContentProtection":
        res.contentProtection = parseContentProtection(node, contentProtectionParser);
        break;

      case "Representation":
        var rep = parseRepresentation(node);
        if (rep.id == null) {
          rep.id = res.representations.length;
        }
        res.representations.push(rep);break;

      case "Role":
        res.role = parseRole(node);
        break;

      case "SegmentBase":
        res.index = parseSegmentBase(node);
        break;

      case "SegmentList":
        res.index = parseSegmentList(node);
        break;

      case "SegmentTemplate":
        res.index = parseSegmentTemplate(node);
        break;
    }

    return res;
  }, { representations: [] });

  var parsed = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root, parser);

  parsed.type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["c" /* inferAdaptationType */])(parsed);

  parsed.accessibility = [];

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["d" /* isHardOfHearing */])(accessibility)) {
    parsed.accessibility.push("hardOfHearing");
  }

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["e" /* isVisuallyImpaired */])(accessibility)) {
    parsed.accessibility.push("visuallyImpaired");
  }

  // representations inherit some adaptation keys
  parsed.representations = parsed.representations.map(function (representation) {
    representationKeysInheritedFromAdaptation.forEach(function (key) {
      if (!representation.hasOwnProperty(key) && parsed.hasOwnProperty(key)) {
        // TODO clone objects, they should not share the same ref
        representation[key] = parsed[key];
      }
    });

    return representation;
  });

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__filters_js__["c" /* filterAdaptation */])(parsed);
}

function parseRepresentation(root) {
  var parser = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* reduceChildren */])(root, function (res, name, node) {
    switch (name) {
      // case "FramePacking": break;
      // case "AudioChannelConfiguration": break;
      // case "ContentProtection":
      //   res.contentProtection = parseContentProtection(node);
      //   break;
      // case "EssentialProperty": break;
      // case "SupplementalProperty": break;
      // case "InbandEventStream": break;
      // case "SubRepresentation": break;

      case "BaseURL":
        res.baseURL = node.textContent;
        break;

      case "SegmentBase":
        res.index = parseSegmentBase(node);
        break;

      case "SegmentList":
        res.index = parseSegmentList(node);
        break;

      case "SegmentTemplate":
        res.index = parseSegmentTemplate(node);
        break;
    }
    return res;
  }, {});

  var parsed = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root, parser);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__filters_js__["d" /* filterRepresentation */])(parsed);
}

function parseRole(root) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root);
}

function parseAccessibility(root) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root);
}

function parseContentComponent(root) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root);
}

function parseSegmentTemplate(root) {
  var base = parseMultipleSegmentBase(root);
  if (!base.indexType) {
    base.indexType = "template";
  }
  return base;
}

function parseSegmentList(root) {
  var base = parseMultipleSegmentBase(root);
  base.list = [];
  base.indexType = "list";
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* reduceChildren */])(root, function (res, name, node) {
    if (name == "SegmentURL") {
      res.list.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(node));
    }
    return res;
  }, base);
}

/**
 * Parse the contentProtection node of a MPD.
 * @param {Document} root
 * @param {Function} contentProtectionParser
 * @returns {Object}
 */
function parseContentProtection(root, contentProtectionParser) {
  return contentProtectionParser(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root), root);
}

function parseSegmentBase(root) {
  var index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* reduceChildren */])(root, function (res, name, node) {
    if (name == "Initialization") {
      res.initialization = parseInitialization(node);
    }
    return res;
  }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(root));

  if (root.nodeName == "SegmentBase") {
    index.indexType = "base";
    index.timeline = [];
  }
  return index;
}

function parseMultipleSegmentBase(root) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* reduceChildren */])(root, function (res, name, node) {
    if (name == "SegmentTimeline") {
      res.indexType = "timeline";
      res.timeline = parseSegmentTimeline(node);
    }
    return res;
  }, parseSegmentBase(root));
}

function parseSegmentTimeline(root) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["a" /* reduceChildren */])(root, function (arr, name, node) {
    var len = arr.length;
    var seg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__attributes_js__["a" /* default */])(node);
    if (seg.ts == null) {
      var prev = len > 0 && arr[len - 1];
      seg.ts = prev ? prev.ts + prev.d * (prev.r + 1) : 0;
    }
    if (seg.r == null) {
      seg.r = 0;
    }
    arr.push(seg);
    return arr;
  }, []);
}

function parseInitialization(root) {
  var range = void 0,
      media = void 0;

  if (root.hasAttribute("range")) {
    range = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers_js__["f" /* parseByteRange */])(root.getAttribute("range"));
  }

  if (root.hasAttribute("sourceURL")) {
    media = root.getAttribute("sourceURL");
  }

  return { range: range, media: media };
}



/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_url__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_js__ = __webpack_require__(66);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








function regularSegmentLoader(_ref) {
  var url = _ref.url,
      segment = _ref.segment;
  var range = segment.range,
      indexRange = segment.indexRange;

  // fire a single time contiguous init and index ranges.

  if (range && indexRange && range[1] === indexRange[0] - 1) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__request_js__["a" /* default */])({
      url: url,
      responseType: "arraybuffer",
      headers: {
        Range: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_js__["c" /* byteRange */])([range[0], indexRange[1]])
      }
    });
  }

  var mediaHeaders = range ? { "Range": __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_js__["c" /* byteRange */])(range) } : null;

  var mediaOrInitRequest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__request_js__["a" /* default */])({
    url: url,
    responseType: "arraybuffer",
    headers: mediaHeaders
  });

  // If init segment has indexRange metadata, we need to fetch
  // both the initialization data and the index metadata. We do
  // this in parallel and send the both blobs into the pipeline.
  if (indexRange) {
    var indexRequest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__request_js__["a" /* default */])({
      url: url,
      responseType: "arraybuffer",
      headers: { "Range": __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_js__["c" /* byteRange */])(indexRange) }
    });
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(mediaOrInitRequest, indexRequest);
  } else {
    return mediaOrInitRequest;
  }
}

var segmentPreLoader = function segmentPreLoader(customSegmentLoader) {
  return function (_ref2) {
    var segment = _ref2.segment,
        adaptation = _ref2.adaptation,
        representation = _ref2.representation,
        manifest = _ref2.manifest;
    var media = segment.media,
        range = segment.range,
        indexRange = segment.indexRange,
        isInit = segment.isInit;

    // init segment without initialization media/range/indexRange:
    // we do nothing on the network

    if (isInit && !(media || range || indexRange)) {
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
    }

    var path = media ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_js__["b" /* replaceTokens */])(media, segment, representation) : "";
    var url = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_url__["b" /* resolveURL */])(representation.baseURL, path);

    var args = {
      adaptation: adaptation,
      representation: representation,
      manifest: manifest,
      segment: segment,
      transport: "dash",
      url: url
    };

    if (!customSegmentLoader) {
      return regularSegmentLoader(args);
    }

    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(function (obs) {
      var hasFinished = false;
      var hasFallbacked = false;

      var resolve = function resolve() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!hasFallbacked) {
          hasFinished = true;
          obs.next({
            responseData: args.data,
            size: args.size || 0,
            duration: args.duration || 0
          });
          obs.complete();
        }
      };

      var reject = function reject() {
        var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (!hasFallbacked) {
          hasFinished = true;
          obs.error(err);
        }
      };

      var fallback = function fallback() {
        hasFallbacked = true;
        regularSegmentLoader(args).subscribe(obs);
      };

      var callbacks = { reject: reject, resolve: resolve, fallback: fallback };
      var abort = customSegmentLoader(args, callbacks);

      return function () {
        if (!hasFinished && !hasFallbacked && typeof abort === "function") {
          abort();
        }
      };
    });
  };
};

/* harmony default export */ __webpack_exports__["a"] = (segmentPreLoader);

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var manifestPipeline = {
  parser: function parser(_ref) {
    var url = _ref.url;

    var manifest = {
      transportType: "directfile",
      locations: [url],
      periods: [],
      isLive: false,
      duration: Infinity,
      adaptations: null
    };

    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ manifest: manifest, url: url });
  }
};

/* harmony default export */ __webpack_exports__["default"] = ({
  directFile: true,
  manifest: manifestPipeline
});

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_bytes__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_url__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_request__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parser__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parsers_bif__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parsers_texttracks_sami_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parsers_texttracks_ttml_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mp4_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__request_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__isobmff_timings_infos_js__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__segment_loader_js__ = __webpack_require__(160);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


















var patchSegment = __WEBPACK_IMPORTED_MODULE_8__mp4_js__["a" /* default */].patchSegment,
    getMdat = __WEBPACK_IMPORTED_MODULE_8__mp4_js__["a" /* default */].getMdat;


var TT_PARSERS = {
  "application/x-sami": __WEBPACK_IMPORTED_MODULE_6__parsers_texttracks_sami_js__["a" /* parseSami */],
  "application/smil": __WEBPACK_IMPORTED_MODULE_6__parsers_texttracks_sami_js__["a" /* parseSami */],
  "application/ttml+xml": __WEBPACK_IMPORTED_MODULE_7__parsers_texttracks_ttml_js__["a" /* parseTTML */],
  "application/ttml+xml+mp4": __WEBPACK_IMPORTED_MODULE_7__parsers_texttracks_ttml_js__["a" /* parseTTML */],
  "text/vtt": function textVtt(text) {
    return text;
  }
};

var WSX_REG = /\.wsx?(\?token=\S+)?/;

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var smoothManifestParser = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__parser__["a" /* default */])(options);
  var segmentLoader = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__segment_loader_js__["a" /* default */])(options.segmentLoader);

  var manifestPipeline = {
    resolver: function resolver(_ref) {
      var url = _ref.url;

      var resolving = void 0;
      var token = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_js__["a" /* extractToken */])(url);

      // TODO Remove WSX logic
      if (WSX_REG.test(url)) {
        resolving = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_request__["a" /* default */])({
          url: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_js__["b" /* replaceToken */])(url, ""),
          responseType: "document",
          ignoreProgressEvents: true
        }).map(function (_ref2) {
          var value = _ref2.value;
          return value;
        }).map(__WEBPACK_IMPORTED_MODULE_10__utils_js__["c" /* extractISML */]); // TODO remove completely
      } else {
        resolving = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(url);
      }

      return resolving.map(function (url) {
        return { url: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_js__["b" /* replaceToken */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_js__["d" /* resolveManifest */])(url), token) };
      });
    },
    loader: function loader(_ref3) {
      var url = _ref3.url;

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__request_js__["a" /* default */])({
        url: url,
        responseType: "document"
      });
    },
    parser: function parser(_ref4) {
      var response = _ref4.response;

      var manifest = smoothManifestParser(response.responseData);
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ manifest: manifest, url: response.url });
    }
  };

  var segmentPipeline = {
    loader: function loader(_ref5) {
      var segment = _ref5.segment,
          representation = _ref5.representation,
          adaptation = _ref5.adaptation,
          manifest = _ref5.manifest;

      return segmentLoader({
        segment: segment,
        representation: representation,
        adaptation: adaptation,
        manifest: manifest
      });
    },
    parser: function parser(_ref6) {
      var segment = _ref6.segment,
          response = _ref6.response,
          manifest = _ref6.manifest;
      var responseData = response.responseData;


      if (segment.isInit) {
        // smooth init segments are crafted by hand. Their timescale is the one
        // from the manifest.
        var _segmentInfos = {
          timescale: segment.timescale,
          time: -1,
          duration: 0
        };
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ segmentData: responseData, segmentInfos: _segmentInfos });
      }

      var responseBuffer = new Uint8Array(responseData);

      var _extractTimingsInfos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__isobmff_timings_infos_js__["a" /* default */])(responseBuffer, segment, manifest.isLive),
          nextSegments = _extractTimingsInfos.nextSegments,
          segmentInfos = _extractTimingsInfos.segmentInfos;

      var segmentData = patchSegment(responseBuffer, segmentInfos.time);
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ segmentData: segmentData, segmentInfos: segmentInfos, nextSegments: nextSegments });
    }
  };

  var textTrackPipeline = {
    loader: function loader(_ref7) {
      var segment = _ref7.segment,
          representation = _ref7.representation;

      if (segment.isInit) {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
      }

      var mimeType = representation.mimeType;

      var base = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_url__["b" /* resolveURL */])(representation.baseURL);
      var url = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_js__["e" /* buildSegmentURL */])(base, representation, segment);

      if (mimeType.indexOf("mp4") >= 0) {
        // in case of TTML declared inside playlists, the TTML file is
        // embededded inside an mp4 fragment.
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__request_js__["a" /* default */])({ url: url, responseType: "arraybuffer" });
      } else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__request_js__["a" /* default */])({ url: url, responseType: "text" });
      }
    },
    parser: function parser(_ref8) {
      var response = _ref8.response,
          segment = _ref8.segment,
          representation = _ref8.representation,
          adaptation = _ref8.adaptation,
          manifest = _ref8.manifest;
      var language = adaptation.language;
      var mimeType = representation.mimeType;


      var ttParser = TT_PARSERS[mimeType];
      if (!ttParser) {
        throw new Error("could not find a text-track parser for the type " + mimeType);
      }

      var responseData = response.responseData;
      var text = void 0;
      var nextSegments = void 0,
          segmentInfos = void 0;
      var segmentData = {};

      // in case of TTML declared inside playlists, the TTML file is
      // embededded inside an mp4 fragment.
      if (mimeType.indexOf("mp4") >= 0) {
        responseData = new Uint8Array(responseData);
        text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_bytes__["a" /* bytesToStr */])(getMdat(responseData));
        var timings = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__isobmff_timings_infos_js__["a" /* default */])(responseData, segment, manifest.isLive);

        nextSegments = timings.nextSegments;
        segmentInfos = timings.segmentInfos;
        segmentData.start = segmentInfos.start;
        segmentData.end = segmentInfos.duration != null ? segmentInfos.start + segmentInfos.duration : undefined;
        segmentData.timescale = segmentInfos.timescale;
      } else {
        // vod is simple WebVTT or TTML text
        text = responseData;
        segmentData.start = segment.time;
        segmentData.end = segment.duration != null ? segment.time + segment.duration : undefined;
        segmentData.timescale = segment.timescale;
      }

      segmentData.data = ttParser(text, language, segment.time / segment.timescale);

      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ segmentData: segmentData, segmentInfos: segmentInfos, nextSegments: nextSegments });
    }
  };

  var imageTrackPipeline = {
    loader: function loader(_ref9) {
      var segment = _ref9.segment,
          representation = _ref9.representation;

      if (segment.isInit) {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
      } else {
        var baseURL = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_url__["b" /* resolveURL */])(representation.baseURL);
        var url = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_js__["e" /* buildSegmentURL */])(baseURL, representation, segment);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__request_js__["a" /* default */])({ url: url, responseType: "arraybuffer" });
      }
    },
    parser: function parser(_ref10) {
      var response = _ref10.response;

      var responseData = response.responseData;
      var blob = new Uint8Array(responseData);

      var segmentInfos = {
        time: 0,
        duration: Number.MAX_VALUE
      };

      var segmentData = void 0;
      if (blob) {
        var bif = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__parsers_bif__["a" /* parseBif */])(blob);
        segmentData = bif.thumbs;
        segmentInfos.timescale = bif.timescale;

        // var firstThumb = blob[0];
        // var lastThumb  = blob[blob.length - 1];

        // segmentInfos = {
        //   time: firstThumb.ts,
        //   duration: lastThumb.ts
        // };
      }

      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ segmentData: segmentData, segmentInfos: segmentInfos });
    }
  };

  return {
    directFile: false,
    manifest: manifestPipeline,
    audio: segmentPipeline,
    video: segmentPipeline,
    text: textTrackPipeline,
    image: imageTrackPipeline
  };
});

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_log__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parsers_isobmff_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mp4_js__ = __webpack_require__(39);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





var getTraf = __WEBPACK_IMPORTED_MODULE_2__mp4_js__["a" /* default */].getTraf,
    parseTfrf = __WEBPACK_IMPORTED_MODULE_2__mp4_js__["a" /* default */].parseTfrf,
    parseTfxd = __WEBPACK_IMPORTED_MODULE_2__mp4_js__["a" /* default */].parseTfxd;


function extractTimingsInfos(responseData, segment, isLive) {
  var nextSegments = void 0;
  var segmentInfos = void 0;

  if (isLive) {
    var traf = getTraf(responseData);
    if (traf) {
      nextSegments = parseTfrf(traf);
      segmentInfos = parseTfxd(traf);
    } else {
      __WEBPACK_IMPORTED_MODULE_0__utils_log__["a" /* default */].warn("smooth: could not find traf atom");
    }
  } else {
    nextSegments = null;
  }

  if (!segmentInfos) {
    // we could always make a mistake when reading a container.
    // If the estimate is too far from what the segment seems to imply, take
    // the segment infos instead.
    var maxDecodeTimeDelta = Math.min(0.9 * segment.timescale, segment.duration / 4);

    var trunDuration = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__parsers_isobmff_js__["f" /* getDurationFromTrun */])(responseData);
    if (trunDuration >= 0 && Math.abs(trunDuration - segment.duration) <= maxDecodeTimeDelta) {
      segmentInfos = {
        time: segment.time,
        duration: trunDuration
      };
    } else {
      segmentInfos = {
        time: segment.time,
        duration: segment.duration
      };
    }
  }

  if (nextSegments) {
    for (var i = nextSegments.length - 1; i >= 0; i--) {
      nextSegments[i].timescale = segment.timescale;
    }
  }

  if (segmentInfos) {
    segmentInfos.timescale = segment.timescale;
  }
  return { nextSegments: nextSegments, segmentInfos: segmentInfos };
}

/* harmony default export */ __webpack_exports__["a"] = (extractTimingsInfos);

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_array_includes_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_bytes__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_assert__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_languages__ = __webpack_require__(30);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








var DEFAULT_MIME_TYPES = {
  audio: "audio/mp4",
  video: "video/mp4",
  text: "application/ttml+xml"
};

var DEFAULT_CODECS = {
  audio: "mp4a.40.2",
  video: "avc1.4D401E"
};

var MIME_TYPES = {
  "AACL": "audio/mp4",
  "AVC1": "video/mp4",
  "H264": "video/mp4",
  "TTML": "application/ttml+xml+mp4"
};

var profiles = {
  audio: [["Bitrate", "bitrate", parseInt], ["AudioTag", "audiotag", parseInt], ["FourCC", "mimeType", MIME_TYPES], ["Channels", "channels", parseInt], ["SamplingRate", "samplingRate", parseInt], ["BitsPerSample", "bitsPerSample", parseInt], ["PacketSize", "packetSize", parseInt], ["CodecPrivateData", "codecPrivateData", String]],
  video: [["Bitrate", "bitrate", parseInt], ["FourCC", "mimeType", MIME_TYPES], ["CodecPrivateData", "codecs", extractVideoCodecs], ["MaxWidth", "width", parseInt], ["MaxHeight", "height", parseInt], ["CodecPrivateData", "codecPrivateData", String]],
  text: [["Bitrate", "bitrate", parseInt], ["FourCC", "mimeType", MIME_TYPES]]
};

function extractVideoCodecs(codecPrivateData) {
  // we can extract codes only if fourCC is on of "H264", "X264", "DAVC", "AVC1"
  var _ref = /00000001\d7([0-9a-fA-F]{6})/.exec(codecPrivateData) || [],
      avcProfile = _ref[1];

  return avcProfile ? "avc1." + avcProfile : "";
}

function extractAudioCodecs(fourCC, codecPrivateData) {
  var mpProfile = void 0;
  if (fourCC == "AACH") {
    mpProfile = 5; // High Efficiency AAC Profile
  } else {
    if (codecPrivateData) {
      mpProfile = (parseInt(codecPrivateData.substr(0, 2), 16) & 0xF8) >> 3;
    } else {
      mpProfile = 2; // AAC Main Low Complexity
    }
  }
  return mpProfile ? "mp4a.40." + mpProfile : "";
}

function parseBoolean(val) {
  if (typeof val == "boolean") {
    return val;
  } else if (typeof val == "string") {
    return val.toUpperCase() === "TRUE";
  } else {
    return false;
  }
}

function calcLastRef(adaptation) {
  if (!adaptation) {
    return Infinity;
  }
  var index = adaptation.index;
  var _index$timeline = index.timeline[index.timeline.length - 1],
      ts = _index$timeline.ts,
      r = _index$timeline.r,
      d = _index$timeline.d;

  return (ts + (r + 1) * d) / index.timescale;
}

function getKeySystems(keyIdBytes) {
  return [{
    // Widevine
    systemId: "edef8ba9-79d6-4ace-a3c8-27dcd51d21ed",
    privateData: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["i" /* concat */])([0x08, 0x01, 0x12, 0x10], keyIdBytes)
    // keyIds: [keyIdBytes],
  }];
}

function createSmoothStreamingParser() {
  var parserOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var SUGGESTED_PERSENTATION_DELAY = parserOptions.suggestedPresentationDelay == null ? __WEBPACK_IMPORTED_MODULE_1__config_js__["a" /* default */].DEFAULT_SUGGESTED_PRESENTATION_DELAY.SMOOTH : parserOptions.suggestedPresentationDelay;

  var REFERENCE_DATE_TIME = parserOptions.referenceDateTime || Date.UTC(1970, 0, 1, 0, 0, 0, 0) / 1000;
  var MIN_REPRESENTATION_BITRATE = parserOptions.minRepresentationBitrate || 190000;

  var keySystems = parserOptions.keySystems || getKeySystems;

  function getHexKeyId(buf) {
    var len = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["d" /* le2toi */])(buf, 8);
    var xml = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["l" /* bytesToUTF16Str */])(buf.subarray(10, 10 + len));
    var doc = new DOMParser().parseFromString(xml, "application/xml");
    var kid = doc.querySelector("KID").textContent;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["m" /* guidToUuid */])(atob(kid)).toLowerCase();
  }

  function reduceChildren(root, fn, init) {
    var node = root.firstElementChild,
        r = init;
    while (node) {
      r = fn(r, node.nodeName, node);
      node = node.nextElementSibling;
    }
    return r;
  }

  function parseProtection(root) {
    var header = root.firstElementChild;
    __WEBPACK_IMPORTED_MODULE_3__utils_assert__["a" /* default */].equal(header.nodeName, "ProtectionHeader", "Protection should have ProtectionHeader child");
    var privateData = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["b" /* strToBytes */])(atob(header.textContent));
    var keyId = getHexKeyId(privateData);
    var keyIdBytes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_bytes__["k" /* hexToBytes */])(keyId);

    // remove possible braces
    var systemId = header.getAttribute("SystemID").toLowerCase().replace(/\{|\}/g, "");

    return {
      keyId: keyId,
      keySystems: [{
        systemId: systemId,
        privateData: privateData
        // keyIds: [keyIdBytes],
      }].concat(keySystems(keyIdBytes))
    };
  }

  function parseC(node, timeline) {
    var l = timeline.length;
    var prev = l > 0 ? timeline[l - 1] : { d: 0, ts: 0, r: 0 };
    var d = +node.getAttribute("d");
    var t = node.getAttribute("t");
    var r = +node.getAttribute("r");

    // in smooth streaming format,
    // r refers to number of same duration
    // chunks, not repetitions (defers from DASH)
    if (r) {
      r--;
    }

    if (l > 0 && !prev.d) {
      prev.d = t - prev.ts;
      timeline[l - 1] = prev;
    }

    if (l > 0 && d == prev.d && t == null) {
      prev.r += (r || 0) + 1;
    } else {
      var ts = t == null ? prev.ts + prev.d * (prev.r + 1) : +t;
      timeline.push({ d: d, ts: ts, r: r });
    }
    return timeline;
  }

  function parseQualityLevel(q, prof) {
    var obj = {};
    for (var i = 0; i < prof.length; i++) {
      var _prof$i = prof[i],
          key = _prof$i[0],
          name = _prof$i[1],
          parse = _prof$i[2];

      obj[name] = typeof parse == "function" ? parse(q.getAttribute(key)) : parse[q.getAttribute(key)];
    }
    return obj;
  }

  // Parse the adaptations (<StreamIndex>) tree containing
  // representations (<QualityLevels>) and timestamp indexes (<c>).
  // Indexes can be quite huge, and this function needs to
  // to be optimized.
  function parseAdaptation(root, timescale) {
    if (root.hasAttribute("Timescale")) {
      timescale = +root.getAttribute("Timescale");
    }

    var type = root.getAttribute("Type");
    var subType = root.getAttribute("Subtype");
    var name = root.getAttribute("Name");
    var language = root.getAttribute("Language");
    var normalizedLanguage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_languages__["a" /* normalize */])(language);
    var baseURL = root.getAttribute("Url");
    var profile = profiles[type];

    var accessibility = [];

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_assert__["a" /* default */])(profile, "unrecognized QualityLevel type " + type);

    var representationCount = 0;

    var _reduceChildren = reduceChildren(root, function (res, name, node) {
      switch (name) {
        case "QualityLevel":
          var rep = parseQualityLevel(node, profile);

          if (type == "audio") {
            var fourCC = node.getAttribute("FourCC") || "";
            rep.codecs = extractAudioCodecs(fourCC, rep.codecPrivateData);
          }

          // filter out video representations with small bitrates
          if (type != "video" || rep.bitrate > MIN_REPRESENTATION_BITRATE) {
            rep.id = representationCount++;
            res.representations.push(rep);
          }
          break;
        case "c":
          res.index.timeline = parseC(node, res.index.timeline);
          break;
      }
      return res;
    }, {
      representations: [],
      index: {
        timeline: [],
        indexType: "smooth",
        timescale: timescale,
        initialization: {}
      }
    }),
        representations = _reduceChildren.representations,
        index = _reduceChildren.index;

    // we assume that all representations have the same
    // codec and mimeType


    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_assert__["a" /* default */])(representations.length, "adaptation should have at least one representation");

    // apply default codec if non-supported
    representations.forEach(function (rep) {
      return rep.codecs = rep.codecs || DEFAULT_CODECS[type];
    });

    // apply default mimetype if non-supported
    representations.forEach(function (rep) {
      return rep.mimeType = rep.mimeType || DEFAULT_MIME_TYPES[type];
    });

    // TODO(pierre): real ad-insert support
    if (subType == "ADVT") {
      return null;
    } else if (type === "text" && subType === "DESC") {
      accessibility.push("hardOfHearing");
    }

    // TODO check that one, I did not find it in the spec
    // else if (type === "audio" && subType === "DESC") {
    //   accessibility.push("visuallyImpaired");
    // }

    return {
      type: type,
      accessibility: accessibility,
      index: index,
      representations: representations,
      name: name,
      language: language,
      normalizedLanguage: normalizedLanguage,
      baseURL: baseURL
    };
  }

  function parseFromString(manifest) {
    return parseFromDocument(new DOMParser().parseFromString(manifest, "application/xml"));
  }

  function parseFromDocument(doc) {
    var root = doc.documentElement;
    __WEBPACK_IMPORTED_MODULE_3__utils_assert__["a" /* default */].equal(root.nodeName, "SmoothStreamingMedia", "document root should be SmoothStreamingMedia");
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_assert__["a" /* default */])(/^[2]-[0-2]$/.test(root.getAttribute("MajorVersion") + "-" + root.getAttribute("MinorVersion")), "Version should be 2.0, 2.1 or 2.2");

    var timescale = +root.getAttribute("Timescale") || 10000000;
    var adaptationIds = [];

    var _reduceChildren2 = reduceChildren(root, function (res, name, node) {
      switch (name) {
        case "Protection":
          res.protection = parseProtection(node);break;
        case "StreamIndex":
          var ada = parseAdaptation(node, timescale);
          if (ada) {
            var i = 0;
            var id = void 0;
            do {
              id = ada.type + "_" + (ada.language ? ada.language + "_" : "") + i++;
            } while (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_array_includes_js__["a" /* default */])(adaptationIds, id));
            ada.id = id;
            adaptationIds.push(id);
            res.adaptations.push(ada);
          }
          break;
      }
      return res;
    }, {
      protection: null,
      adaptations: []
    }),
        protection = _reduceChildren2.protection,
        adaptations = _reduceChildren2.adaptations;

    adaptations.forEach(function (a) {
      return a.smoothProtection = protection;
    });

    var suggestedPresentationDelay = void 0,
        presentationLiveGap = void 0,
        timeShiftBufferDepth = void 0,
        availabilityStartTime = void 0;

    var isLive = parseBoolean(root.getAttribute("IsLive"));
    if (isLive) {
      suggestedPresentationDelay = SUGGESTED_PERSENTATION_DELAY;
      timeShiftBufferDepth = +root.getAttribute("DVRWindowLength") / timescale;
      availabilityStartTime = REFERENCE_DATE_TIME;
      var video = adaptations.filter(function (a) {
        return a.type == "video";
      })[0];
      var audio = adaptations.filter(function (a) {
        return a.type == "audio";
      })[0];
      var lastRef = Math.min(calcLastRef(video), calcLastRef(audio));
      presentationLiveGap = Date.now() / 1000 - (lastRef + availabilityStartTime);
    }

    return {
      transportType: "smooth",
      profiles: "",
      type: isLive ? "dynamic" : "static",
      suggestedPresentationDelay: suggestedPresentationDelay,
      timeShiftBufferDepth: timeShiftBufferDepth,
      presentationLiveGap: presentationLiveGap,
      availabilityStartTime: availabilityStartTime,
      periods: [{
        duration: (+root.getAttribute("Duration") || Infinity) / timescale,
        adaptations: adaptations,
        laFragCount: +root.getAttribute("LookAheadFragmentCount")
      }]
    };
  }

  function parser(val) {
    if (typeof val == "string") {
      return parseFromString(val);
    } else {
      return parseFromDocument(val);
    }
  }

  parser.parseFromString = parseFromString;
  parser.parseFromDocument = parseFromDocument;

  return parser;
}

/* harmony default export */ __webpack_exports__["a"] = (createSmoothStreamingParser);

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_url__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mp4_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__request_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_js__ = __webpack_require__(68);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var createVideoInitSegment = __WEBPACK_IMPORTED_MODULE_2__mp4_js__["a" /* default */].createVideoInitSegment,
    createAudioInitSegment = __WEBPACK_IMPORTED_MODULE_2__mp4_js__["a" /* default */].createAudioInitSegment;


function regularSegmentLoader(_ref) {
  var url = _ref.url,
      segment = _ref.segment;

  var headers = void 0;
  var range = segment.range;
  if (range) {
    headers = {
      Range: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_js__["f" /* byteRange */])(range)
    };
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__request_js__["a" /* default */])({
    url: url,
    responseType: "arraybuffer",
    headers: headers
  });
}

/**
 * Defines the url for the request, load the right loader (custom/default
 * one).
 */
var segmentLoader = function segmentLoader(customSegmentLoader) {
  return function (_ref2) {
    var segment = _ref2.segment,
        representation = _ref2.representation,
        adaptation = _ref2.adaptation,
        manifest = _ref2.manifest;

    if (segment.isInit) {
      var responseData = {};
      var protection = adaptation._smoothProtection || {};

      switch (adaptation.type) {
        case "video":
          responseData = createVideoInitSegment(segment.timescale, representation.width, representation.height, 72, 72, 4, // vRes, hRes, nal
          representation._codecPrivateData, protection.keyId, // keyId
          protection.keySystems // pssList
          );
          break;
        case "audio":
          responseData = createAudioInitSegment(segment.timescale, representation._channels, representation._bitsPerSample, representation._packetSize, representation._samplingRate, representation._codecPrivateData, protection.keyId, // keyId
          protection.keySystems // pssList
          );
          break;
      }

      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of({ type: "data", value: { responseData: responseData } });
    } else {
      var url = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_js__["e" /* buildSegmentURL */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_url__["b" /* resolveURL */])(representation.baseURL), representation, segment);

      var args = {
        adaptation: adaptation,
        representation: representation,
        segment: segment,
        transport: "smooth",
        url: url,
        manifest: manifest
      };

      if (!customSegmentLoader) {
        return regularSegmentLoader(args);
      }

      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(function (obs) {
        var hasFinished = false;
        var hasFallbacked = false;

        var resolve = function resolve() {
          var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (!hasFallbacked) {
            hasFinished = true;
            obs.next({
              type: "response",
              value: {
                responseData: args.data,
                size: args.size || 0,
                duration: args.duration || 0
              }
            });
            obs.complete();
          }
        };

        var reject = function reject() {
          var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (!hasFallbacked) {
            hasFinished = true;
            obs.error(err);
          }
        };

        var fallback = function fallback() {
          hasFallbacked = true;
          segmentLoader(args).subscribe(obs);
        };

        var callbacks = { reject: reject, resolve: resolve, fallback: fallback };
        var abort = customSegmentLoader(args, callbacks);

        return function () {
          if (!hasFinished && !hasFallbacked && typeof abort === "function") {
            abort();
          }
        };
      });
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (segmentLoader);

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimpleSet; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Simple hash-based set.
 * @class SimpleSet
 */
var SimpleSet = function () {
  function SimpleSet() {
    _classCallCheck(this, SimpleSet);

    this.hash = {};
  }

  SimpleSet.prototype.add = function add(x) {
    this.hash[x] = true;
  };

  SimpleSet.prototype.remove = function remove(x) {
    delete this.hash[x];
  };

  SimpleSet.prototype.test = function test(x) {
    return this.hash[x] === true;
  };

  return SimpleSet;
}();



/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Caching object used to cache initialization segments.
 * This allow to have a faster representation switch and faster seeking.
 */
var InitializationSegmentCache = function () {
  function InitializationSegmentCache() {
    _classCallCheck(this, InitializationSegmentCache);

    this.cache = {};
  }

  InitializationSegmentCache.prototype.add = function add(_ref, response) {
    var segment = _ref.segment;

    if (segment.isInit) {
      this.cache[segment.id] = response;
    }
  };

  InitializationSegmentCache.prototype.get = function get(_ref2) {
    var segment = _ref2.segment;

    if (segment.isInit) {
      var value = this.cache[segment.id];
      if (value != null) {
        return value;
      }
    }
    return null;
  };

  return InitializationSegmentCache;
}();

/* harmony default export */ __webpack_exports__["a"] = (InitializationSegmentCache);

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Translate ISO 639-1 language codes into ISO 639-3 ones.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  aa: "aar", // Afar
  ab: "abk", // Abkhazian
  ae: "ave", // Avestan
  af: "afr", // Afrikaans
  ak: "aka", // Akan
  am: "amh", // Amharic
  an: "arg", // Aragonese
  ar: "ara", // Arabic
  as: "asm", // Assamese
  av: "ava", // Avaric
  ay: "aym", // Aymara
  az: "aze", // Azerbaijani
  ba: "bak", // Bashkir
  be: "bel", // Belarusian
  bg: "bul", // Bulgarian
  bi: "bis", // Bislama
  bm: "bam", // Bambara
  bn: "ben", // Bengali
  bo: "bod", // Tibetan
  br: "bre", // Breton
  bs: "bos", // Bosnian
  ca: "cat", // Catalan, Valencian
  ce: "che", // Chechen
  ch: "cha", // Chamorro
  co: "cos", // Corsican
  cr: "cre", // Cree
  cs: "ces", // Czech
  cu: "chu", // Church Slavic, Church Slavonic, Old Church Slavonic,
  // Old Slavonic, Old Bulgarian
  cv: "chv", // Chuvash
  cy: "cym", // Welsh
  da: "dan", // Danish
  de: "deu", // German
  dv: "div", // Divehi, Dhivehi, Maldivian
  dz: "dzo", // Dzongkha
  ee: "ewe", // Ewe
  el: "ell", // Greek (modern)
  en: "eng", // English
  eo: "epo", // Esperanto
  es: "spa", // Spanish, Castilian
  et: "est", // Estonian
  eu: "eus", // Basque
  fa: "fas", // Persian
  ff: "ful", // Fulah
  fi: "fin", // Finnish
  fj: "fij", // Fijian
  fo: "fao", // Faroese
  fr: "fra", // French
  fy: "fry", // Western Frisian
  ga: "gle", // Irish
  gd: "gla", // Gaelic, Scottish Gaelic
  gl: "glg", // Galician
  gn: "grn", // Guaraní
  gu: "guj", // Gujarati
  gv: "glv", // Manx
  ha: "hau", // Hausa
  he: "heb", // Hebrew (modern)
  hi: "hin", // Hindi
  ho: "hmo", // Hiri Motu
  hr: "hrv", // Croatian
  ht: "hat", // Haitian, Haitian Creole
  hu: "hun", // Hungarian
  hy: "hye", // Armenian
  hz: "her", // Herero
  ia: "ina", // Interlingua
  id: "ind", // Indonesian
  ie: "ile", // Interlingue
  ig: "ibo", // Igbo
  ii: "iii", // Sichuan Yi, Nuosu
  ik: "ipk", // Inupiaq
  io: "ido", // Ido
  is: "isl", // Icelandic
  it: "ita", // Italian
  iu: "iku", // Inuktitut
  ja: "jpn", // Japanese
  jv: "jav", // Javanese
  ka: "kat", // Georgian
  kg: "kon", // Kongo
  ki: "kik", // Kikuyu, Gikuyu
  kj: "kua", // Kuanyama, Kwanyama
  kk: "kaz", // Kazakh
  kl: "kal", // Kalaallisut, Greenlandic
  km: "khm", // Central Khmer
  kn: "kan", // Kannada
  ko: "kor", // Korean
  kr: "kau", // Kanuri
  ks: "kas", // Kashmiri
  ku: "kur", // Kurdish
  kv: "kom", // Komi
  kw: "cor", // Cornish
  ky: "kir", // Kirghiz, Kyrgyz
  la: "lat", // Latin
  lb: "ltz", // Luxembourgish, Letzeburgesch
  lg: "lug", // Ganda
  li: "lim", // Limburgan, Limburger, Limburgish
  ln: "lin", // Lingala
  lo: "lao", // Lao
  lt: "lit", // Lithuanian
  lu: "lub", // Luba-Katanga
  lv: "lav", // Latvian
  mg: "mlg", // Malagasy
  mh: "mah", // Marshallese
  mi: "mri", // Maori
  mk: "mkd", // Macedonian
  ml: "mal", // Malayalam
  mn: "mon", // Mongolian
  mr: "mar", // Marathi
  ms: "msa", // Malay
  mt: "mlt", // Maltese
  my: "mya", // Burmese
  na: "nau", // Nauru
  nb: "nob", // Norwegian Bokmål
  nd: "nde", // North Ndebele
  ne: "nep", // Nepali
  ng: "ndo", // Ndonga
  nl: "nld", // Dutch, Flemish
  nn: "nno", // Norwegian Nynorsk
  no: "nor", // Norwegian
  nr: "nbl", // South Ndebele
  nv: "nav", // Navajo, Navaho
  ny: "nya", // Chichewa, Chewa, Nyanja
  oc: "oci", // Occitan
  oj: "oji", // Ojibwa
  om: "orm", // Oromo
  or: "ori", // Oriya
  os: "oss", // Ossetian, Ossetic
  pa: "pan", // Panjabi, Punjabi
  pi: "pli", // Pali
  pl: "pol", // Polish
  ps: "pus", // Pashto, Pushto
  pt: "por", // Portuguese
  qu: "que", // Quechua
  rm: "roh", // Romansh
  rn: "run", // Rundi
  ro: "ron", // Romanian, Moldavian, Moldovan
  ru: "rus", // Russian
  rw: "kin", // Kinyarwanda
  sa: "san", // Sanskrit
  sc: "srd", // Sardinian
  sd: "snd", // Sindhi
  se: "sme", // Northern Sami
  sg: "sag", // Sango
  si: "sin", // Sinhala, Sinhalese
  sk: "slk", // Slovak
  sl: "slv", // Slovenian
  sm: "smo", // Samoan
  sn: "sna", // Shona
  so: "som", // Somali
  sq: "sqi", // Albanian
  sr: "srp", // Serbian
  ss: "ssw", // Swati
  st: "sot", // Southern Sotho
  su: "sun", // Sundanese
  sv: "swe", // Swedish
  sw: "swa", // Swahili
  ta: "tam", // Tamil
  te: "tel", // Telugu
  tg: "tgk", // Tajik
  th: "tha", // Thai
  ti: "tir", // Tigrinya
  tk: "tuk", // Turkmen
  tl: "tgl", // Tagalog
  tn: "tsn", // Tswana
  to: "ton", // Tonga (Tonga Islands)
  tr: "tur", // Turkish
  ts: "tso", // Tsonga
  tt: "tat", // Tatar
  tw: "twi", // Twi
  ty: "tah", // Tahitian
  ug: "uig", // Uighur, Uyghur
  uk: "ukr", // Ukrainian
  ur: "urd", // Urdu
  uz: "uzb", // Uzbek
  ve: "ven", // Venda
  vi: "vie", // Vietnamese
  vo: "vol", // Volapük
  wa: "wln", // Walloon
  wo: "wol", // Wolof
  xh: "xho", // Xhosa
  yi: "yid", // Yiddish
  yo: "yor", // Yoruba
  za: "zha", // Zhuang, Chuang
  zh: "zho", // Chinese
  zu: "zul" // Zulu
});

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Translate ISO 639-2 synonyms to their ISO 639-3 counterparts.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  alb: "sqi", // Albanian
  arm: "hye", // Armenian
  baq: "eus", // Basque
  bur: "mya", // Burmese
  chi: "zho", // Chinese
  cze: "ces", // Czech
  dut: "nld", // Dutch; Flemish
  fre: "fra", // French
  geo: "kat", // Georgian
  ger: "deu", // German
  gre: "ell", // Modern Greek (1453–)
  ice: "isl", // Icelandic
  mac: "mkd", // Macedonian
  mao: "mri", // Maori
  may: "msa", // Malay
  per: "fas", // Persian
  slo: "slk", // Slovak
  rum: "ron", // Moldovan
  tib: "bod", // Tibetan
  wel: "cym" // Welsh
});

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToMap;
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Transform an array of strings into an Object with the key and value
 * mirrored.
 * @param {Array.<string>} list
 * @returns {Object}
 */
function listToMap(list) {
  var map = list.reduce(function (map, name) {
    map[name] = name;
    return map;
  }, {});

  map.keys = list;
  return map;
}

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throttle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__castToObservable_js__ = __webpack_require__(9);
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Throttle an asynchronous function (returning an Observable or Promise) to
 * drop calls done before a previous one has finished or failed.
 *
 * @example
 * ```js
 * const fn = (time) => Observable.timer(time);
 * const throttled = throttle(fn);
 *
 * const Obs1 = throttled(2000); // -> call fn(2000) and returns its Observable
 * const Obs2 = throttled(1000); // -> won't do anything, Obs2 is an empty
 *                               //    observable (it directly completes)
 * setTimeout(() => {
 *   const Obs3 = throttled(1000); // -> will call fn(1000)
 * }, 2001);
 * ```
 *
 * @param {Function} func
 * @returns {Function} - Function taking in argument the arguments you want
 * to give your function, and returning an Observable.
 */
function throttle(func) {
  var isPending = false;

  return function () {
    if (isPending) {
      return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].empty();
    }

    isPending = true;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__castToObservable_js__["a" /* default */])(func.apply(undefined, arguments)).do(null, function () {
      return isPending = false;
    }, function () {
      return isPending = false;
    });
  };
}

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the first argument given different from undefined.
 * @param {...*} args
 * @returns {*}
 */
/* harmony default export */ __webpack_exports__["a"] = (function () {
  var i = 0;
  var len = arguments.length;
  while (i < len) {
    if ((arguments.length <= i ? undefined : arguments[i]) !== undefined) {
      return arguments.length <= i ? undefined : arguments[i];
    }
    i++;
  }
});

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the first argument given different from undefined or null.
 * @param {...*} args
 * @returns {*}
 */
/* harmony default export */ __webpack_exports__["a"] = (function () {
  var i = 0;
  var len = arguments.length;
  while (i < len) {
    if ((arguments.length <= i ? undefined : arguments[i]) != null) {
      return arguments.length <= i ? undefined : arguments[i];
    }
    i++;
  }
});

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(171);
var isArguments = __webpack_require__(170);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 170 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 171 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.error);
            case 'C':
                return Observable_1.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(5);
var queue_1 = __webpack_require__(260);
var Subscription_1 = __webpack_require__(11);
var observeOn_1 = __webpack_require__(77);
var ObjectUnsubscribedError_1 = __webpack_require__(50);
var SubjectSubscription_1 = __webpack_require__(72);
/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 */
var Scheduler = (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
//# sourceMappingURL=Scheduler.js.map

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var combineLatest_1 = __webpack_require__(223);
Observable_1.Observable.combineLatest = combineLatest_1.combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var defer_1 = __webpack_require__(224);
Observable_1.Observable.defer = defer_1.defer;
//# sourceMappingURL=defer.js.map

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var empty_1 = __webpack_require__(225);
Observable_1.Observable.empty = empty_1.empty;
//# sourceMappingURL=empty.js.map

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var from_1 = __webpack_require__(226);
Observable_1.Observable.from = from_1.from;
//# sourceMappingURL=from.js.map

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var fromEvent_1 = __webpack_require__(227);
Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var fromPromise_1 = __webpack_require__(228);
Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
//# sourceMappingURL=fromPromise.js.map

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var interval_1 = __webpack_require__(229);
Observable_1.Observable.interval = interval_1.interval;
//# sourceMappingURL=interval.js.map

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var merge_1 = __webpack_require__(230);
Observable_1.Observable.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var never_1 = __webpack_require__(231);
Observable_1.Observable.never = never_1.never;
//# sourceMappingURL=never.js.map

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var of_1 = __webpack_require__(232);
Observable_1.Observable.of = of_1.of;
//# sourceMappingURL=of.js.map

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var throw_1 = __webpack_require__(233);
Observable_1.Observable.throw = throw_1._throw;
//# sourceMappingURL=throw.js.map

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var timer_1 = __webpack_require__(234);
Observable_1.Observable.timer = timer_1.timer;
//# sourceMappingURL=timer.js.map

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var catch_1 = __webpack_require__(235);
Observable_1.Observable.prototype.catch = catch_1._catch;
Observable_1.Observable.prototype._catch = catch_1._catch;
//# sourceMappingURL=catch.js.map

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var concat_1 = __webpack_require__(74);
Observable_1.Observable.prototype.concat = concat_1.concat;
//# sourceMappingURL=concat.js.map

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var concatAll_1 = __webpack_require__(237);
Observable_1.Observable.prototype.concatAll = concatAll_1.concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var concatMap_1 = __webpack_require__(238);
Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var debounceTime_1 = __webpack_require__(239);
Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;
//# sourceMappingURL=debounceTime.js.map

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var distinctUntilChanged_1 = __webpack_require__(240);
Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var do_1 = __webpack_require__(241);
Observable_1.Observable.prototype.do = do_1._do;
Observable_1.Observable.prototype._do = do_1._do;
//# sourceMappingURL=do.js.map

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var filter_1 = __webpack_require__(242);
Observable_1.Observable.prototype.filter = filter_1.filter;
//# sourceMappingURL=filter.js.map

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var finally_1 = __webpack_require__(243);
Observable_1.Observable.prototype.finally = finally_1._finally;
Observable_1.Observable.prototype._finally = finally_1._finally;
//# sourceMappingURL=finally.js.map

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var ignoreElements_1 = __webpack_require__(244);
Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
//# sourceMappingURL=ignoreElements.js.map

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var map_1 = __webpack_require__(245);
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var mapTo_1 = __webpack_require__(246);
Observable_1.Observable.prototype.mapTo = mapTo_1.mapTo;
//# sourceMappingURL=mapTo.js.map

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var merge_1 = __webpack_require__(75);
Observable_1.Observable.prototype.merge = merge_1.merge;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var mergeMap_1 = __webpack_require__(76);
Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
//# sourceMappingURL=mergeMap.js.map

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var multicast_1 = __webpack_require__(46);
Observable_1.Observable.prototype.multicast = multicast_1.multicast;
//# sourceMappingURL=multicast.js.map

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var pairwise_1 = __webpack_require__(247);
Observable_1.Observable.prototype.pairwise = pairwise_1.pairwise;
//# sourceMappingURL=pairwise.js.map

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var publish_1 = __webpack_require__(248);
Observable_1.Observable.prototype.publish = publish_1.publish;
//# sourceMappingURL=publish.js.map

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var scan_1 = __webpack_require__(249);
Observable_1.Observable.prototype.scan = scan_1.scan;
//# sourceMappingURL=scan.js.map

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var share_1 = __webpack_require__(250);
Observable_1.Observable.prototype.share = share_1.share;
//# sourceMappingURL=share.js.map

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var skip_1 = __webpack_require__(251);
Observable_1.Observable.prototype.skip = skip_1.skip;
//# sourceMappingURL=skip.js.map

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var startWith_1 = __webpack_require__(252);
Observable_1.Observable.prototype.startWith = startWith_1.startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var switchMap_1 = __webpack_require__(253);
Observable_1.Observable.prototype.switchMap = switchMap_1.switchMap;
//# sourceMappingURL=switchMap.js.map

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var take_1 = __webpack_require__(254);
Observable_1.Observable.prototype.take = take_1.take;
//# sourceMappingURL=take.js.map

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var takeUntil_1 = __webpack_require__(255);
Observable_1.Observable.prototype.takeUntil = takeUntil_1.takeUntil;
//# sourceMappingURL=takeUntil.js.map

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__(0);
var timeout_1 = __webpack_require__(256);
Observable_1.Observable.prototype.timeout = timeout_1.timeout;
//# sourceMappingURL=timeout.js.map

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var ScalarObservable_1 = __webpack_require__(44);
var EmptyObservable_1 = __webpack_require__(25);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = (function (_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (length === 1) {
            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(Observable_1.Observable));
exports.ArrayLikeObservable = ArrayLikeObservable;
//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__(5);
var Observable_1 = __webpack_require__(0);
var Subscriber_1 = __webpack_require__(3);
var Subscription_1 = __webpack_require__(11);
/**
 * @class ConnectableObservable<T>
 */
var ConnectableObservable = (function (_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        _super.call(this);
        this.source = source;
        this.subjectFactory = subjectFactory;
        this._refCount = 0;
        this._isComplete = false;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription_1.Subscription();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = Subscription_1.Subscription.EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return this.lift(new RefCountOperator(this));
    };
    return ConnectableObservable;
}(Observable_1.Observable));
exports.ConnectableObservable = ConnectableObservable;
var connectableProto = ConnectableObservable.prototype;
exports.connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableSubscriber = (function (_super) {
    __extends(ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(Subject_1.SubjectSubscriber));
var RefCountOperator = (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = (function (_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        _super.call(this, destination);
        this.connectable = connectable;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        ///
        // Compare the local RefCountSubscriber's connection Subscription to the
        // connection Subscription on the shared ConnectableObservable. In cases
        // where the ConnectableObservable source synchronously emits values, and
        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
        // execution continues to here before the RefCountOperator has a chance to
        // supply the RefCountSubscriber with the shared connection Subscription.
        // For example:
        // ```
        // Observable.range(0, 10)
        //   .publish()
        //   .refCount()
        //   .take(5)
        //   .subscribe();
        // ```
        // In order to account for this case, RefCountSubscriber should only dispose
        // the ConnectableObservable's shared connection Subscription if the
        // connection Subscription exists, *and* either:
        //   a. RefCountSubscriber doesn't have a reference to the shared connection
        //      Subscription yet, or,
        //   b. RefCountSubscriber's connection Subscription reference is identical
        //      to the shared connection Subscription
        ///
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=ConnectableObservable.js.map

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var subscribeToResult_1 = __webpack_require__(16);
var OuterSubscriber_1 = __webpack_require__(14);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var DeferObservable = (function (_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
        _super.call(this);
        this.observableFactory = observableFactory;
    }
    /**
     * Creates an Observable that, on subscribe, calls an Observable factory to
     * make an Observable for each new Observer.
     *
     * <span class="informal">Creates the Observable lazily, that is, only when it
     * is subscribed.
     * </span>
     *
     * <img src="./img/defer.png" width="100%">
     *
     * `defer` allows you to create the Observable only when the Observer
     * subscribes, and create a fresh Observable for each Observer. It waits until
     * an Observer subscribes to it, and then it generates an Observable,
     * typically with an Observable factory function. It does this afresh for each
     * subscriber, so although each subscriber may think it is subscribing to the
     * same Observable, in fact each subscriber gets its own individual
     * Observable.
     *
     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
     * var clicksOrInterval = Rx.Observable.defer(function () {
     *   if (Math.random() > 0.5) {
     *     return Rx.Observable.fromEvent(document, 'click');
     *   } else {
     *     return Rx.Observable.interval(1000);
     *   }
     * });
     * clicksOrInterval.subscribe(x => console.log(x));
     *
     * // Results in the following behavior:
     * // If the result of Math.random() is greater than 0.5 it will listen
     * // for clicks anywhere on the "document"; when document is clicked it
     * // will log a MouseEvent object to the console. If the result is less
     * // than 0.5 it will emit ascending numbers, one every second(1000ms).
     *
     * @see {@link create}
     *
     * @param {function(): SubscribableOrPromise} observableFactory The Observable
     * factory function to invoke for each Observer that subscribes to the output
     * Observable. May also return a Promise, which will be converted on the fly
     * to an Observable.
     * @return {Observable} An Observable whose Observers' subscriptions trigger
     * an invocation of the given Observable factory function.
     * @static true
     * @name defer
     * @owner Observable
     */
    DeferObservable.create = function (observableFactory) {
        return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function (subscriber) {
        return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
}(Observable_1.Observable));
exports.DeferObservable = DeferObservable;
var DeferSubscriber = (function (_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
        _super.call(this, destination);
        this.factory = factory;
        this.tryDefer();
    }
    DeferSubscriber.prototype.tryDefer = function () {
        try {
            this._callFactory();
        }
        catch (err) {
            this._error(err);
        }
    };
    DeferSubscriber.prototype._callFactory = function () {
        var result = this.factory();
        if (result) {
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return DeferSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=DeferObservable.js.map

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ErrorObservable = (function (_super) {
    __extends(ErrorObservable, _super);
    function ErrorObservable(error, scheduler) {
        _super.call(this);
        this.error = error;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits an error notification.
     *
     * <span class="informal">Just emits 'error', and nothing else.
     * </span>
     *
     * <img src="./img/throw.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the error notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then emit an error.</caption>
     * var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @example <caption>Map and flatten numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x === 13 ?
     *     Rx.Observable.throw('Thirteens are bad') :
     *     Rx.Observable.of('a', 'b', 'c')
     * );
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link of}
     *
     * @param {any} error The particular Error to pass to the error notification.
     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
     * the emission of the error notification.
     * @return {Observable} An error Observable: emits only the error notification
     * using the given error argument.
     * @static true
     * @name throw
     * @owner Observable
     */
    ErrorObservable.create = function (error, scheduler) {
        return new ErrorObservable(error, scheduler);
    };
    ErrorObservable.dispatch = function (arg) {
        var error = arg.error, subscriber = arg.subscriber;
        subscriber.error(error);
    };
    ErrorObservable.prototype._subscribe = function (subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        subscriber.syncErrorThrowable = true;
        if (scheduler) {
            return scheduler.schedule(ErrorObservable.dispatch, 0, {
                error: error, subscriber: subscriber
            });
        }
        else {
            subscriber.error(error);
        }
    };
    return ErrorObservable;
}(Observable_1.Observable));
exports.ErrorObservable = ErrorObservable;
//# sourceMappingURL=ErrorObservable.js.map

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var tryCatch_1 = __webpack_require__(52);
var isFunction_1 = __webpack_require__(51);
var errorObject_1 = __webpack_require__(33);
var Subscription_1 = __webpack_require__(11);
var toString = Object.prototype.toString;
function isNodeStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console everytime a click
     * // occurs on the document.
     *
     * @see {@link from}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOMElement, event target, Node.js
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=FromEventObservable.js.map

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__(26);
var isArrayLike_1 = __webpack_require__(81);
var isPromise_1 = __webpack_require__(85);
var PromiseObservable_1 = __webpack_require__(73);
var IteratorObservable_1 = __webpack_require__(220);
var ArrayObservable_1 = __webpack_require__(15);
var ArrayLikeObservable_1 = __webpack_require__(213);
var iterator_1 = __webpack_require__(47);
var Observable_1 = __webpack_require__(0);
var observeOn_1 = __webpack_require__(77);
var observable_1 = __webpack_require__(48);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = (function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * @example <caption>Converts an array to an Observable</caption>
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {@link create}
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     * @see {@link fromPromise}
     *
     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * emissions of values.
     * @return {Observable<T>} The Observable whose values are originally from the
     * input object that was converted.
     * @static true
     * @name from
     * @owner Observable
     */
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[observable_1.observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1.iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike_1.isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1.observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1.Observable));
exports.FromObservable = FromObservable;
//# sourceMappingURL=FromObservable.js.map

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = __webpack_require__(83);
var Observable_1 = __webpack_require__(0);
var async_1 = __webpack_require__(32);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IntervalObservable = (function (_super) {
    __extends(IntervalObservable, _super);
    function IntervalObservable(period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        _super.call(this);
        this.period = period;
        this.scheduler = scheduler;
        if (!isNumeric_1.isNumeric(period) || period < 0) {
            this.period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = async_1.async;
        }
    }
    /**
     * Creates an Observable that emits sequential numbers every specified
     * interval of time, on a specified IScheduler.
     *
     * <span class="informal">Emits incremental numbers periodically in time.
     * </span>
     *
     * <img src="./img/interval.png" width="100%">
     *
     * `interval` returns an Observable that emits an infinite sequence of
     * ascending integers, with a constant interval of time of your choosing
     * between those emissions. The first emission is not sent immediately, but
     * only after the first period has passed. By default, this operator uses the
     * `async` IScheduler to provide a notion of time, but you may pass any
     * IScheduler to it.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
     * var numbers = Rx.Observable.interval(1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link timer}
     * @see {@link delay}
     *
     * @param {number} [period=0] The interval size in milliseconds (by default)
     * or the time unit determined by the scheduler's clock.
     * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a sequential number each time
     * interval.
     * @static true
     * @name interval
     * @owner Observable
     */
    IntervalObservable.create = function (period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = async_1.async; }
        return new IntervalObservable(period, scheduler);
    };
    IntervalObservable.dispatch = function (state) {
        var index = state.index, subscriber = state.subscriber, period = state.period;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        state.index += 1;
        this.schedule(state, period);
    };
    IntervalObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var period = this.period;
        var scheduler = this.scheduler;
        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
            index: index, subscriber: subscriber, period: period
        }));
    };
    return IntervalObservable;
}(Observable_1.Observable));
exports.IntervalObservable = IntervalObservable;
//# sourceMappingURL=IntervalObservable.js.map

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(12);
var Observable_1 = __webpack_require__(0);
var iterator_1 = __webpack_require__(47);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IteratorObservable = (function (_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function (iterator, scheduler) {
        return new IteratorObservable(iterator, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, iterator = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
            if (typeof iterator.return === 'function') {
                iterator.return();
            }
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator = _a.iterator, scheduler = _a.scheduler;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, iterator: iterator, subscriber: subscriber
            });
        }
        else {
            do {
                var result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.closed) {
                    if (typeof iterator.return === 'function') {
                        iterator.return();
                    }
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
}(Observable_1.Observable));
exports.IteratorObservable = IteratorObservable;
var StringIterator = (function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = str.length; }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[iterator_1.iterator] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
}());
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = toLength(arr); }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[iterator_1.iterator] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
}());
function getIterator(obj) {
    var i = obj[iterator_1.iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[iterator_1.iterator]();
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
//# sourceMappingURL=IteratorObservable.js.map

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(0);
var noop_1 = __webpack_require__(86);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var NeverObservable = (function (_super) {
    __extends(NeverObservable, _super);
    function NeverObservable() {
        _super.call(this);
    }
    /**
     * Creates an Observable that emits no items to the Observer.
     *
     * <span class="informal">An Observable that never emits anything.</span>
     *
     * <img src="./img/never.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that emits
     * neither values nor errors nor the completion notification. It can be used
     * for testing purposes or for composing with other Observables. Please note
     * that by never emitting a complete notification, this Observable keeps the
     * subscription from being disposed automatically. Subscriptions need to be
     * manually disposed.
     *
     * @example <caption>Emit the number 7, then never emit anything else (not even complete).</caption>
     * function info() {
     *   console.log('Will not be called');
     * }
     * var result = Rx.Observable.never().startWith(7);
     * result.subscribe(x => console.log(x), info, info);
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link of}
     * @see {@link throw}
     *
     * @return {Observable} A "never" Observable: never emits anything.
     * @static true
     * @name never
     * @owner Observable
     */
    NeverObservable.create = function () {
        return new NeverObservable();
    };
    NeverObservable.prototype._subscribe = function (subscriber) {
        noop_1.noop();
    };
    return NeverObservable;
}(Observable_1.Observable));
exports.NeverObservable = NeverObservable;
//# sourceMappingURL=NeverObservable.js.map

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isNumeric_1 = __webpack_require__(83);
var Observable_1 = __webpack_require__(0);
var async_1 = __webpack_require__(32);
var isScheduler_1 = __webpack_require__(20);
var isDate_1 = __webpack_require__(82);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var TimerObservable = (function (_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        _super.call(this);
        this.period = -1;
        this.dueTime = 0;
        if (isNumeric_1.isNumeric(period)) {
            this.period = Number(period) < 1 && 1 || Number(period);
        }
        else if (isScheduler_1.isScheduler(period)) {
            scheduler = period;
        }
        if (!isScheduler_1.isScheduler(scheduler)) {
            scheduler = async_1.async;
        }
        this.scheduler = scheduler;
        this.dueTime = isDate_1.isDate(dueTime) ?
            (+dueTime - this.scheduler.now()) :
            dueTime;
    }
    /**
     * Creates an Observable that starts emitting after an `initialDelay` and
     * emits ever increasing numbers after each `period` of time thereafter.
     *
     * <span class="informal">Its like {@link interval}, but you can specify when
     * should the emissions start.</span>
     *
     * <img src="./img/timer.png" width="100%">
     *
     * `timer` returns an Observable that emits an infinite sequence of ascending
     * integers, with a constant interval of time, `period` of your choosing
     * between those emissions. The first emission happens after the specified
     * `initialDelay`. The initial delay may be a {@link Date}. By default, this
     * operator uses the `async` IScheduler to provide a notion of time, but you
     * may pass any IScheduler to it. If `period` is not specified, the output
     * Observable emits only one value, `0`. Otherwise, it emits an infinite
     * sequence.
     *
     * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption>
     * var numbers = Rx.Observable.timer(3000, 1000);
     * numbers.subscribe(x => console.log(x));
     *
     * @example <caption>Emits one number after five seconds</caption>
     * var numbers = Rx.Observable.timer(5000);
     * numbers.subscribe(x => console.log(x));
     *
     * @see {@link interval}
     * @see {@link delay}
     *
     * @param {number|Date} initialDelay The initial delay time to wait before
     * emitting the first value of `0`.
     * @param {number} [period] The period of time between emissions of the
     * subsequent numbers.
     * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
     * the emission of values, and providing a notion of "time".
     * @return {Observable} An Observable that emits a `0` after the
     * `initialDelay` and ever increasing numbers after each `period` of time
     * thereafter.
     * @static true
     * @name timer
     * @owner Observable
     */
    TimerObservable.create = function (initialDelay, period, scheduler) {
        if (initialDelay === void 0) { initialDelay = 0; }
        return new TimerObservable(initialDelay, period, scheduler);
    };
    TimerObservable.dispatch = function (state) {
        var index = state.index, period = state.period, subscriber = state.subscriber;
        var action = this;
        subscriber.next(index);
        if (subscriber.closed) {
            return;
        }
        else if (period === -1) {
            return subscriber.complete();
        }
        state.index = index + 1;
        action.schedule(state, period);
    };
    TimerObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, period = _a.period, dueTime = _a.dueTime, scheduler = _a.scheduler;
        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
            index: index, period: period, subscriber: subscriber
        });
    };
    return TimerObservable;
}(Observable_1.Observable));
exports.TimerObservable = TimerObservable;
//# sourceMappingURL=TimerObservable.js.map

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isScheduler_1 = __webpack_require__(20);
var isArray_1 = __webpack_require__(26);
var ArrayObservable_1 = __webpack_require__(15);
var combineLatest_1 = __webpack_require__(236);
/* tslint:enable:max-line-length */
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from all the Observables passed as
 * arguments. This is done by subscribing to each Observable in order and,
 * whenever any Observable emits, collecting an array of the most recent
 * values from each Observable. So if you pass `n` Observables to operator,
 * returned Observable will always emit an array of `n` values, in order
 * corresponding to order of passed Observables (value from the first Observable
 * on the first place and so on).
 *
 * Static version of `combineLatest` accepts either an array of Observables
 * or each Observable can be put directly as an argument. Note that array of
 * Observables is good choice, if you don't know beforehand how many Observables
 * you will combine. Passing empty array will result in Observable that
 * completes immediately.
 *
 * To ensure output array has always the same length, `combineLatest` will
 * actually wait for all input Observables to emit at least once,
 * before it starts emitting results. This means if some Observable emits
 * values before other Observables started emitting, all that values but last
 * will be lost. On the other hand, is some Observable does not emit value but
 * completes, resulting Observable will complete at the same moment without
 * emitting anything, since it will be now impossible to include value from
 * completed Observable in resulting array. Also, if some input Observable does
 * not emit any value and never completes, `combineLatest` will also never emit
 * and never complete, since, again, it will wait for all streams to emit some
 * value.
 *
 * If at least one Observable was passed to `combineLatest` and all passed Observables
 * emitted something, resulting Observable will complete when all combined
 * streams complete. So even if some Observable completes, result of
 * `combineLatest` will still emit values when other Observables do. In case
 * of completed Observable, its value from now on will always be the last
 * emitted value. On the other hand, if any Observable errors, `combineLatest`
 * will error immediately as well, and all other Observables will be unsubscribed.
 *
 * `combineLatest` accepts as optional parameter `project` function, which takes
 * as arguments all values that would normally be emitted by resulting Observable.
 * `project` can return any kind of value, which will be then emitted by Observable
 * instead of default array. Note that `project` does not take as argument that array
 * of values, but values themselves. That means default `project` can be imagined
 * as function that takes all its arguments and puts them into an array.
 *
 *
 * @example <caption>Combine two timer Observables</caption>
 * const firstTimer = Rx.Observable.timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
 * const secondTimer = Rx.Observable.timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
 * const combinedTimers = Rx.Observable.combineLatest(firstTimer, secondTimer);
 * combinedTimers.subscribe(value => console.log(value));
 * // Logs
 * // [0, 0] after 0.5s
 * // [1, 0] after 1s
 * // [1, 1] after 1.5s
 * // [2, 1] after 2s
 *
 *
 * @example <caption>Combine an array of Observables</caption>
 * const observables = [1, 5, 10].map(
 *   n => Rx.Observable.of(n).delay(n * 1000).startWith(0) // emit 0 and then emit n after n seconds
 * );
 * const combined = Rx.Observable.combineLatest(observables);
 * combined.subscribe(value => console.log(value));
 * // Logs
 * // [0, 0, 0] immediately
 * // [1, 0, 0] after 1s
 * // [1, 5, 0] after 5s
 * // [1, 5, 10] after 10s
 *
 *
 * @example <caption>Use project function to dynamically calculate the Body-Mass Index</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * // With output to console:
 * // BMI is 24.212293388429753
 * // BMI is 23.93948099205209
 * // BMI is 23.671253629592222
 *
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {ObservableInput} observable1 An input Observable to combine with other Observables.
 * @param {ObservableInput} observable2 An input Observable to combine with other Observables.
 * More than one input Observables may be given as arguments
 * or an array of Observables may be given as the first argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
 * each input Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @static true
 * @name combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    var scheduler = null;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new combineLatest_1.CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DeferObservable_1 = __webpack_require__(215);
exports.defer = DeferObservable_1.DeferObservable.create;
//# sourceMappingURL=defer.js.map

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var EmptyObservable_1 = __webpack_require__(25);
exports.empty = EmptyObservable_1.EmptyObservable.create;
//# sourceMappingURL=empty.js.map

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FromObservable_1 = __webpack_require__(218);
exports.from = FromObservable_1.FromObservable.create;
//# sourceMappingURL=from.js.map

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FromEventObservable_1 = __webpack_require__(217);
exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
//# sourceMappingURL=fromEvent.js.map

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var PromiseObservable_1 = __webpack_require__(73);
exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
//# sourceMappingURL=fromPromise.js.map

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IntervalObservable_1 = __webpack_require__(219);
exports.interval = IntervalObservable_1.IntervalObservable.create;
//# sourceMappingURL=interval.js.map

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var merge_1 = __webpack_require__(75);
exports.merge = merge_1.mergeStatic;
//# sourceMappingURL=merge.js.map

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NeverObservable_1 = __webpack_require__(221);
exports.never = NeverObservable_1.NeverObservable.create;
//# sourceMappingURL=never.js.map

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayObservable_1 = __webpack_require__(15);
exports.of = ArrayObservable_1.ArrayObservable.of;
//# sourceMappingURL=of.js.map

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ErrorObservable_1 = __webpack_require__(216);
exports._throw = ErrorObservable_1.ErrorObservable.create;
//# sourceMappingURL=throw.js.map

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TimerObservable_1 = __webpack_require__(222);
exports.timer = TimerObservable_1.TimerObservable.create;
//# sourceMappingURL=timer.js.map

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(14);
var subscribeToResult_1 = __webpack_require__(16);
/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *
 * <img src="./img/catch.png" width="100%">
 *
 * @example <caption>Continues with a different Observable when there's an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n == 4) {
 * 	     throw 'four!';
 *     }
 *	   return n;
 *   })
 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, I, II, III, IV, V
 *
 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n === 4) {
 * 	     throw 'four!';
 *     }
 * 	   return n;
 *   })
 *   .catch((err, caught) => caught)
 *   .take(30)
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, 1, 2, 3, ...
 *
 * @example <caption>Throws a new error when the source Observable throws an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 *     if (n == 4) {
 *       throw 'four!';
 *     }
 *     return n;
 *   })
 *   .catch(err => {
 *     throw 'error in source. Details: ' + err;
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => console.log(err)
 *   );
 *   // 1, 2, 3, error in source. Details: four!
 *
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method catch
 * @name catch
 * @owner Observable
 */
function _catch(selector) {
    var operator = new CatchOperator(selector);
    var caught = this.lift(operator);
    return (operator.caught = caught);
}
exports._catch = _catch;
var CatchOperator = (function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CatchSubscriber = (function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        _super.call(this, destination);
        this.selector = selector;
        this.caught = caught;
    }
    // NOTE: overriding `error` instead of `_error` because we don't want
    // to have this flag this subscriber as `isStopped`. We can mimic the
    // behavior of the RetrySubscriber (from the `retry` operator), where
    // we unsubscribe from our source chain, reset our Subscriber flags,
    // then subscribe to the selector result.
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return CatchSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=catch.js.map

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArrayObservable_1 = __webpack_require__(15);
var isArray_1 = __webpack_require__(26);
var OuterSubscriber_1 = __webpack_require__(14);
var subscribeToResult_1 = __webpack_require__(16);
var none = {};
/* tslint:enable:max-line-length */
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * // With output to console:
 * // BMI is 24.212293388429753
 * // BMI is 23.93948099205209
 * // BMI is 23.671253629592222
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {ObservableInput} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0].slice();
    }
    observables.unshift(this);
    return this.lift.call(new ArrayObservable_1.ArrayObservable(observables), new CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        this.project = project;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
}());
exports.CombineLatestOperator = CombineLatestOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CombineLatestSubscriber = (function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
        _super.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(none);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond
            ? 0
            : oldVal === none ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.project) {
                this._tryProject(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryProject = function (values) {
        var result;
        try {
            result = this.project.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.CombineLatestSubscriber = CombineLatestSubscriber;
//# sourceMappingURL=combineLatest.js.map

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeAll_1 = __webpack_require__(45);
/* tslint:enable:max-line-length */
/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return this.lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatAll = concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeMap_1 = __webpack_require__(76);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var async_1 = __webpack_require__(32);
/**
 * Emits a value from the source Observable only after a particular time span
 * has passed without another source emission.
 *
 * <span class="informal">It's like {@link delay}, but passes only the most
 * recent value from each burst of emissions.</span>
 *
 * <img src="./img/debounceTime.png" width="100%">
 *
 * `debounceTime` delays values emitted by the source Observable, but drops
 * previous pending delayed emissions if a new value arrives on the source
 * Observable. This operator keeps track of the most recent value from the
 * source Observable, and emits that only when `dueTime` enough time has passed
 * without any other value appearing on the source Observable. If a new value
 * appears before `dueTime` silence occurs, the previous value will be dropped
 * and will not be emitted on the output Observable.
 *
 * This is a rate-limiting operator, because it is impossible for more than one
 * value to be emitted in any time window of duration `dueTime`, but it is also
 * a delay-like operator since output emissions do not occur at the same time as
 * they did on the source Observable. Optionally takes a {@link IScheduler} for
 * managing timers.
 *
 * @example <caption>Emit the most recent click after a burst of clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.debounceTime(1000);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link auditTime}
 * @see {@link debounce}
 * @see {@link delay}
 * @see {@link sampleTime}
 * @see {@link throttleTime}
 *
 * @param {number} dueTime The timeout duration in milliseconds (or the time
 * unit determined internally by the optional `scheduler`) for the window of
 * time required to wait for emission silence before emitting the most recent
 * source value.
 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
 * managing the timers that handle the timeout for each value.
 * @return {Observable} An Observable that delays the emissions of the source
 * Observable by the specified `dueTime`, and may drop some values if they occur
 * too frequently.
 * @method debounceTime
 * @owner Observable
 */
function debounceTime(dueTime, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
}
exports.debounceTime = debounceTime;
var DebounceTimeOperator = (function () {
    function DebounceTimeOperator(dueTime, scheduler) {
        this.dueTime = dueTime;
        this.scheduler = scheduler;
    }
    DebounceTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    };
    return DebounceTimeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DebounceTimeSubscriber = (function (_super) {
    __extends(DebounceTimeSubscriber, _super);
    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
        _super.call(this, destination);
        this.dueTime = dueTime;
        this.scheduler = scheduler;
        this.debouncedSubscription = null;
        this.lastValue = null;
        this.hasValue = false;
    }
    DebounceTimeSubscriber.prototype._next = function (value) {
        this.clearDebounce();
        this.lastValue = value;
        this.hasValue = true;
        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    };
    DebounceTimeSubscriber.prototype._complete = function () {
        this.debouncedNext();
        this.destination.complete();
    };
    DebounceTimeSubscriber.prototype.debouncedNext = function () {
        this.clearDebounce();
        if (this.hasValue) {
            this.destination.next(this.lastValue);
            this.lastValue = null;
            this.hasValue = false;
        }
    };
    DebounceTimeSubscriber.prototype.clearDebounce = function () {
        var debouncedSubscription = this.debouncedSubscription;
        if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
        }
    };
    return DebounceTimeSubscriber;
}(Subscriber_1.Subscriber));
function dispatchNext(subscriber) {
    subscriber.debouncedNext();
}
//# sourceMappingURL=debounceTime.js.map

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var tryCatch_1 = __webpack_require__(52);
var errorObject_1 = __webpack_require__(33);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 *
 * If a comparator function is not provided, an equality check is used by default.
 *
 * @example <caption>A simple example with numbers</caption>
 * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
 *   .distinctUntilChanged()
 *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
 *
 * @example <caption>An example using a compare function</caption>
 * interface Person {
 *    age: number,
 *    name: string
 * }
 *
 * Observable.of<Person>(
 *     { age: 4, name: 'Foo'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo'})
 *     { age: 6, name: 'Foo'})
 *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
 *     .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 *
 * @see {@link distinct}
 * @see {@link distinctUntilKeyChanged}
 *
 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
 * @method distinctUntilChanged
 * @owner Observable
 */
function distinctUntilChanged(compare, keySelector) {
    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
}
exports.distinctUntilChanged = distinctUntilChanged;
var DistinctUntilChangedOperator = (function () {
    function DistinctUntilChangedOperator(compare, keySelector) {
        this.compare = compare;
        this.keySelector = keySelector;
    }
    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
    };
    return DistinctUntilChangedOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DistinctUntilChangedSubscriber = (function (_super) {
    __extends(DistinctUntilChangedSubscriber, _super);
    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
        _super.call(this, destination);
        this.keySelector = keySelector;
        this.hasKey = false;
        if (typeof compare === 'function') {
            this.compare = compare;
        }
    }
    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
        return x === y;
    };
    DistinctUntilChangedSubscriber.prototype._next = function (value) {
        var keySelector = this.keySelector;
        var key = value;
        if (keySelector) {
            key = tryCatch_1.tryCatch(this.keySelector)(value);
            if (key === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        var result = false;
        if (this.hasKey) {
            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
            if (result === errorObject_1.errorObject) {
                return this.destination.error(errorObject_1.errorObject.e);
            }
        }
        else {
            this.hasKey = true;
        }
        if (Boolean(result) === false) {
            this.key = key;
            this.destination.next(value);
        }
    };
    return DistinctUntilChangedSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=distinctUntilChanged.js.map

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/* tslint:enable:max-line-length */
/**
 * Perform a side effect for every emission on the source Observable, but return
 * an Observable that is identical to the source.
 *
 * <span class="informal">Intercepts each emission on the source and runs a
 * function, but returns an output which is identical to the source as long as errors don't occur.</span>
 *
 * <img src="./img/do.png" width="100%">
 *
 * Returns a mirrored Observable of the source Observable, but modified so that
 * the provided Observer is called to perform a side effect for every value,
 * error, and completion emitted by the source. Any errors that are thrown in
 * the aforementioned Observer or handlers are safely sent down the error path
 * of the output Observable.
 *
 * This operator is useful for debugging your Observables for the correct values
 * or performing other side effects.
 *
 * Note: this is different to a `subscribe` on the Observable. If the Observable
 * returned by `do` is not subscribed, the side effects specified by the
 * Observer will never happen. `do` therefore simply spies on existing
 * execution, it does not trigger an execution to happen like `subscribe` does.
 *
 * @example <caption>Map every click to the clientX position of that click, while also logging the click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks
 *   .do(ev => console.log(ev))
 *   .map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link map}
 * @see {@link subscribe}
 *
 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
 * callback for `next`.
 * @param {function} [error] Callback for errors in the source.
 * @param {function} [complete] Callback for the completion of the source.
 * @return {Observable} An Observable identical to the source, but runs the
 * specified Observer or callback(s) for each item.
 * @method do
 * @name do
 * @owner Observable
 */
function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
}
exports._do = _do;
var DoOperator = (function () {
    function DoOperator(nextOrObserver, error, complete) {
        this.nextOrObserver = nextOrObserver;
        this.error = error;
        this.complete = complete;
    }
    DoOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var DoSubscriber = (function (_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
        _super.call(this, destination);
        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        safeSubscriber.syncErrorThrowable = true;
        this.add(safeSubscriber);
        this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function (value) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.next(value);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.next(value);
        }
    };
    DoSubscriber.prototype._error = function (err) {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.error(err);
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.error(err);
        }
    };
    DoSubscriber.prototype._complete = function () {
        var safeSubscriber = this.safeSubscriber;
        safeSubscriber.complete();
        if (safeSubscriber.syncErrorThrown) {
            this.destination.error(safeSubscriber.syncErrorValue);
        }
        else {
            this.destination.complete();
        }
    };
    return DoSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=do.js.map

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=filter.js.map

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var Subscription_1 = __webpack_require__(11);
/**
 * Returns an Observable that mirrors the source Observable, but will call a specified function when
 * the source terminates on complete or error.
 * @param {function} callback Function to be called when source terminates.
 * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
 * @method finally
 * @owner Observable
 */
function _finally(callback) {
    return this.lift(new FinallyOperator(callback));
}
exports._finally = _finally;
var FinallyOperator = (function () {
    function FinallyOperator(callback) {
        this.callback = callback;
    }
    FinallyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FinallySubscriber(subscriber, this.callback));
    };
    return FinallyOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FinallySubscriber = (function (_super) {
    __extends(FinallySubscriber, _super);
    function FinallySubscriber(destination, callback) {
        _super.call(this, destination);
        this.add(new Subscription_1.Subscription(callback));
    }
    return FinallySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=finally.js.map

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var noop_1 = __webpack_require__(86);
/**
 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
 *
 * <img src="./img/ignoreElements.png" width="100%">
 *
 * @return {Observable} An empty Observable that only calls `complete`
 * or `error`, based on which one is called by the source Observable.
 * @method ignoreElements
 * @owner Observable
 */
function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
}
exports.ignoreElements = ignoreElements;
;
var IgnoreElementsOperator = (function () {
    function IgnoreElementsOperator() {
    }
    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var IgnoreElementsSubscriber = (function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        _super.apply(this, arguments);
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {
        noop_1.noop();
    };
    return IgnoreElementsSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=ignoreElements.js.map

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * Emits the given constant value on the output Observable every time the source
 * Observable emits a value.
 *
 * <span class="informal">Like {@link map}, but it maps every source value to
 * the same output value every time.</span>
 *
 * <img src="./img/mapTo.png" width="100%">
 *
 * Takes a constant `value` as argument, and emits that whenever the source
 * Observable emits a value. In other words, ignores the actual source value,
 * and simply uses the emission moment to know when to emit the given `value`.
 *
 * @example <caption>Map every click to the string 'Hi'</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var greetings = clicks.mapTo('Hi');
 * greetings.subscribe(x => console.log(x));
 *
 * @see {@link map}
 *
 * @param {any} value The value to map each source value to.
 * @return {Observable} An Observable that emits the given `value` every time
 * the source Observable emits something.
 * @method mapTo
 * @owner Observable
 */
function mapTo(value) {
    return this.lift(new MapToOperator(value));
}
exports.mapTo = mapTo;
var MapToOperator = (function () {
    function MapToOperator(value) {
        this.value = value;
    }
    MapToOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapToSubscriber(subscriber, this.value));
    };
    return MapToOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapToSubscriber = (function (_super) {
    __extends(MapToSubscriber, _super);
    function MapToSubscriber(destination, value) {
        _super.call(this, destination);
        this.value = value;
    }
    MapToSubscriber.prototype._next = function (x) {
        this.destination.next(this.value);
    };
    return MapToSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=mapTo.js.map

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * Groups pairs of consecutive emissions together and emits them as an array of
 * two values.
 *
 * <span class="informal">Puts the current value and previous value together as
 * an array, and emits that.</span>
 *
 * <img src="./img/pairwise.png" width="100%">
 *
 * The Nth emission from the source Observable will cause the output Observable
 * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
 * pair. For this reason, `pairwise` emits on the second and subsequent
 * emissions from the source Observable, but not on the first emission, because
 * there is no previous value in that case.
 *
 * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var pairs = clicks.pairwise();
 * var distance = pairs.map(pair => {
 *   var x0 = pair[0].clientX;
 *   var y0 = pair[0].clientY;
 *   var x1 = pair[1].clientX;
 *   var y1 = pair[1].clientY;
 *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
 * });
 * distance.subscribe(x => console.log(x));
 *
 * @see {@link buffer}
 * @see {@link bufferCount}
 *
 * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
 * consecutive values from the source Observable.
 * @method pairwise
 * @owner Observable
 */
function pairwise() {
    return this.lift(new PairwiseOperator());
}
exports.pairwise = pairwise;
var PairwiseOperator = (function () {
    function PairwiseOperator() {
    }
    PairwiseOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var PairwiseSubscriber = (function (_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
        _super.call(this, destination);
        this.hasPrev = false;
    }
    PairwiseSubscriber.prototype._next = function (value) {
        if (this.hasPrev) {
            this.destination.next([this.prev, value]);
        }
        else {
            this.hasPrev = true;
        }
        this.prev = value;
    };
    return PairwiseSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=pairwise.js.map

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subject_1 = __webpack_require__(5);
var multicast_1 = __webpack_require__(46);
/* tslint:enable:max-line-length */
/**
 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
 * before it begins emitting items to those Observers that have subscribed to it.
 *
 * <img src="./img/publish.png" width="100%">
 *
 * @param {Function} [selector] - Optional selector function which can use the multicasted source sequence as many times
 * as needed, without causing multiple subscriptions to the source sequence.
 * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
 * @return A ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
 * @method publish
 * @owner Observable
 */
function publish(selector) {
    return selector ? multicast_1.multicast.call(this, function () { return new Subject_1.Subject(); }, selector) :
        multicast_1.multicast.call(this, new Subject_1.Subject());
}
exports.publish = publish;
//# sourceMappingURL=publish.js.map

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns each
 * intermediate result, with an optional seed value.
 *
 * <span class="informal">It's like {@link reduce}, but emits the current
 * accumulation whenever the source emits a value.</span>
 *
 * <img src="./img/scan.png" width="100%">
 *
 * Combines together all values emitted on the source, using an accumulator
 * function that knows how to join a new source value into the accumulation from
 * the past. Is similar to {@link reduce}, but emits the intermediate
 * accumulations.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var ones = clicks.mapTo(1);
 * var seed = 0;
 * var count = ones.scan((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link reduce}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator
 * The accumulator function called on each source value.
 * @param {T|R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @method scan
 * @owner Observable
 */
function scan(accumulator, seed) {
    var hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ScanOperator(accumulator, seed, hasSeed));
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) { hasSeed = false; }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this._seed = _seed;
        this.hasSeed = hasSeed;
        this.index = 0;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=scan.js.map

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var multicast_1 = __webpack_require__(46);
var Subject_1 = __webpack_require__(5);
function shareSubjectFactory() {
    return new Subject_1.Subject();
}
/**
 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
 * This is an alias for .publish().refCount().
 *
 * <img src="./img/share.png" width="100%">
 *
 * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
 * @method share
 * @owner Observable
 */
function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
}
exports.share = share;
;
//# sourceMappingURL=share.js.map

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
/**
 * Returns an Observable that skips the first `count` items emitted by the source Observable.
 *
 * <img src="./img/skip.png" width="100%">
 *
 * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
 * @return {Observable} An Observable that skips values emitted by the source Observable.
 *
 * @method skip
 * @owner Observable
 */
function skip(count) {
    return this.lift(new SkipOperator(count));
}
exports.skip = skip;
var SkipOperator = (function () {
    function SkipOperator(total) {
        this.total = total;
    }
    SkipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SkipSubscriber(subscriber, this.total));
    };
    return SkipOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SkipSubscriber = (function (_super) {
    __extends(SkipSubscriber, _super);
    function SkipSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    SkipSubscriber.prototype._next = function (x) {
        if (++this.count > this.total) {
            this.destination.next(x);
        }
    };
    return SkipSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=skip.js.map

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayObservable_1 = __webpack_require__(15);
var ScalarObservable_1 = __webpack_require__(44);
var EmptyObservable_1 = __webpack_require__(25);
var concat_1 = __webpack_require__(74);
var isScheduler_1 = __webpack_require__(20);
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits the items you specify as arguments before it begins to emit
 * items emitted by the source Observable.
 *
 * <img src="./img/startWith.png" width="100%">
 *
 * @param {...T} values - Items you want the modified Observable to emit first.
 * @param {Scheduler} [scheduler] - A {@link IScheduler} to use for scheduling
 * the emissions of the `next` notifications.
 * @return {Observable} An Observable that emits the items in the specified Iterable and then emits the items
 * emitted by the source Observable.
 * @method startWith
 * @owner Observable
 */
function startWith() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
    }
    var scheduler = array[array.length - 1];
    if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
    }
    else {
        scheduler = null;
    }
    var len = array.length;
    if (len === 1) {
        return concat_1.concatStatic(new ScalarObservable_1.ScalarObservable(array[0], scheduler), this);
    }
    else if (len > 1) {
        return concat_1.concatStatic(new ArrayObservable_1.ArrayObservable(array, scheduler), this);
    }
    else {
        return concat_1.concatStatic(new EmptyObservable_1.EmptyObservable(scheduler), this);
    }
}
exports.startWith = startWith;
//# sourceMappingURL=startWith.js.map

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(14);
var subscribeToResult_1 = __webpack_require__(16);
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, emitting values only from the most recently projected Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link switch}.</span>
 *
 * <img src="./img/switchMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each time it observes one of these
 * inner Observables, the output Observable begins emitting the items emitted by
 * that inner Observable. When a new inner Observable is emitted, `switchMap`
 * stops emitting items from the earlier-emitted inner Observable and begins
 * emitting items from the new one. It continues to behave like this for
 * subsequent inner Observables.
 *
 * @example <caption>Rerun an interval Observable on every click event</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
 * result.subscribe(x => console.log(x));
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switch}
 * @see {@link switchMapTo}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking only the values from the most recently
 * projected inner Observable.
 * @method switchMap
 * @owner Observable
 */
function switchMap(project, resultSelector) {
    return this.lift(new SwitchMapOperator(project, resultSelector));
}
exports.switchMap = switchMap;
var SwitchMapOperator = (function () {
    function SwitchMapOperator(project, resultSelector) {
        this.project = project;
        this.resultSelector = resultSelector;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchMapOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SwitchMapSubscriber = (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project, resultSelector) {
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.index = 0;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result, value, index);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        this.add(this.innerSubscription = subscribeToResult_1.subscribeToResult(this, result, value, index));
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = null;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
        this.remove(innerSub);
        this.innerSubscription = null;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return SwitchMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=switchMap.js.map

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(3);
var ArgumentOutOfRangeError_1 = __webpack_require__(261);
var EmptyObservable_1 = __webpack_require__(25);
/**
 * Emits only the first `count` values emitted by the source Observable.
 *
 * <span class="informal">Takes the first `count` values from the source, then
 * completes.</span>
 *
 * <img src="./img/take.png" width="100%">
 *
 * `take` returns an Observable that emits only the first `count` values emitted
 * by the source Observable. If the source emits fewer than `count` values then
 * all of its values are emitted. After that, it completes, regardless if the
 * source completes.
 *
 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
 * var interval = Rx.Observable.interval(1000);
 * var five = interval.take(5);
 * five.subscribe(x => console.log(x));
 *
 * @see {@link takeLast}
 * @see {@link takeUntil}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
 *
 * @param {number} count The maximum number of `next` values to emit.
 * @return {Observable<T>} An Observable that emits only the first `count`
 * values emitted by the source Observable, or all of the values from the source
 * if the source emits fewer than `count` values.
 * @method take
 * @owner Observable
 */
function take(count) {
    if (count === 0) {
        return new EmptyObservable_1.EmptyObservable();
    }
    else {
        return this.lift(new TakeOperator(count));
    }
}
exports.take = take;
var TakeOperator = (function () {
    function TakeOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
        }
    }
    TakeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeSubscriber(subscriber, this.total));
    };
    return TakeOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeSubscriber = (function (_super) {
    __extends(TakeSubscriber, _super);
    function TakeSubscriber(destination, total) {
        _super.call(this, destination);
        this.total = total;
        this.count = 0;
    }
    TakeSubscriber.prototype._next = function (value) {
        var total = this.total;
        var count = ++this.count;
        if (count <= total) {
            this.destination.next(value);
            if (count === total) {
                this.destination.complete();
                this.unsubscribe();
            }
        }
    };
    return TakeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=take.js.map

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__(14);
var subscribeToResult_1 = __webpack_require__(16);
/**
 * Emits the values emitted by the source Observable until a `notifier`
 * Observable emits a value.
 *
 * <span class="informal">Lets values pass until a second Observable,
 * `notifier`, emits something. Then, it completes.</span>
 *
 * <img src="./img/takeUntil.png" width="100%">
 *
 * `takeUntil` subscribes and begins mirroring the source Observable. It also
 * monitors a second Observable, `notifier` that you provide. If the `notifier`
 * emits a value or a complete notification, the output Observable stops
 * mirroring the source Observable and completes.
 *
 * @example <caption>Tick every second until the first click happens</caption>
 * var interval = Rx.Observable.interval(1000);
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = interval.takeUntil(clicks);
 * result.subscribe(x => console.log(x));
 *
 * @see {@link take}
 * @see {@link takeLast}
 * @see {@link takeWhile}
 * @see {@link skip}
 *
 * @param {Observable} notifier The Observable whose first emitted value will
 * cause the output Observable of `takeUntil` to stop emitting values from the
 * source Observable.
 * @return {Observable<T>} An Observable that emits the values from the source
 * Observable until such time as `notifier` emits its first value.
 * @method takeUntil
 * @owner Observable
 */
function takeUntil(notifier) {
    return this.lift(new TakeUntilOperator(notifier));
}
exports.takeUntil = takeUntil;
var TakeUntilOperator = (function () {
    function TakeUntilOperator(notifier) {
        this.notifier = notifier;
    }
    TakeUntilOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
    };
    return TakeUntilOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TakeUntilSubscriber = (function (_super) {
    __extends(TakeUntilSubscriber, _super);
    function TakeUntilSubscriber(destination, notifier) {
        _super.call(this, destination);
        this.notifier = notifier;
        this.add(subscribeToResult_1.subscribeToResult(this, notifier));
    }
    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.complete();
    };
    TakeUntilSubscriber.prototype.notifyComplete = function () {
        // noop
    };
    return TakeUntilSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=takeUntil.js.map

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var async_1 = __webpack_require__(32);
var isDate_1 = __webpack_require__(82);
var Subscriber_1 = __webpack_require__(3);
var TimeoutError_1 = __webpack_require__(80);
/**
 *
 * Errors if Observable does not emit a value in given time span.
 *
 * <span class="informal">Timeouts on Observable that doesn't emit values fast enough.</span>
 *
 * <img src="./img/timeout.png" width="100%">
 *
 * `timeout` operator accepts as an argument either a number or a Date.
 *
 * If number was provided, it returns an Observable that behaves like a source
 * Observable, unless there is a period of time where there is no value emitted.
 * So if you provide `100` as argument and first value comes after 50ms from
 * the moment of subscription, this value will be simply re-emitted by the resulting
 * Observable. If however after that 100ms passes without a second value being emitted,
 * stream will end with an error and source Observable will be unsubscribed.
 * These checks are performed throughout whole lifecycle of Observable - from the moment
 * it was subscribed to, until it completes or errors itself. Thus every value must be
 * emitted within specified period since previous value.
 *
 * If provided argument was Date, returned Observable behaves differently. It throws
 * if Observable did not complete before provided Date. This means that periods between
 * emission of particular values do not matter in this case. If Observable did not complete
 * before provided Date, source Observable will be unsubscribed. Other than that, resulting
 * stream behaves just as source Observable.
 *
 * `timeout` accepts also a Scheduler as a second parameter. It is used to schedule moment (or moments)
 * when returned Observable will check if source stream emitted value or completed.
 *
 * @example <caption>Check if ticks are emitted within certain timespan</caption>
 * const seconds = Rx.Observable.interval(1000);
 *
 * seconds.timeout(1100) // Let's use bigger timespan to be safe,
 *                       // since `interval` might fire a bit later then scheduled.
 * .subscribe(
 *     value => console.log(value), // Will emit numbers just as regular `interval` would.
 *     err => console.log(err) // Will never be called.
 * );
 *
 * seconds.timeout(900).subscribe(
 *     value => console.log(value), // Will never be called.
 *     err => console.log(err) // Will emit error before even first value is emitted,
 *                             // since it did not arrive within 900ms period.
 * );
 *
 * @example <caption>Use Date to check if Observable completed</caption>
 * const seconds = Rx.Observable.interval(1000);
 *
 * seconds.timeout(new Date("December 17, 2020 03:24:00"))
 * .subscribe(
 *     value => console.log(value), // Will emit values as regular `interval` would
 *                                  // until December 17, 2020 at 03:24:00.
 *     err => console.log(err) // On December 17, 2020 at 03:24:00 it will emit an error,
 *                             // since Observable did not complete by then.
 * );
 *
 * @see {@link timeoutWith}
 *
 * @param {number|Date} due Number specifying period within which Observable must emit values
 *                          or Date specifying before when Observable should complete
 * @param {Scheduler} [scheduler] Scheduler controlling when timeout checks occur.
 * @return {Observable<T>} Observable that mirrors behaviour of source, unless timeout checks fail.
 * @method timeout
 * @owner Observable
 */
function timeout(due, scheduler) {
    if (scheduler === void 0) { scheduler = async_1.async; }
    var absoluteTimeout = isDate_1.isDate(due);
    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError_1.TimeoutError()));
}
exports.timeout = timeout;
var TimeoutOperator = (function () {
    function TimeoutOperator(waitFor, absoluteTimeout, scheduler, errorInstance) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
    }
    TimeoutOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
    };
    return TimeoutOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var TimeoutSubscriber = (function (_super) {
    __extends(TimeoutSubscriber, _super);
    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
        _super.call(this, destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.scheduler = scheduler;
        this.errorInstance = errorInstance;
        this.action = null;
        this.scheduleTimeout();
    }
    TimeoutSubscriber.dispatchTimeout = function (subscriber) {
        subscriber.error(subscriber.errorInstance);
    };
    TimeoutSubscriber.prototype.scheduleTimeout = function () {
        var action = this.action;
        if (action) {
            // Recycle the action if we've already scheduled one. All the production
            // Scheduler Actions mutate their state/delay time and return themeselves.
            // VirtualActions are immutable, so they create and return a clone. In this
            // case, we need to set the action reference to the most recent VirtualAction,
            // to ensure that's the one we clone from next time.
            this.action = action.schedule(this, this.waitFor);
        }
        else {
            this.add(this.action = this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, this));
        }
    };
    TimeoutSubscriber.prototype._next = function (value) {
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
        _super.prototype._next.call(this, value);
    };
    TimeoutSubscriber.prototype._unsubscribe = function () {
        this.action = null;
        this.scheduler = null;
        this.errorInstance = null;
    };
    return TimeoutSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=timeout.js.map

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(11);
/**
 * A unit of work to be executed in a {@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        _super.call(this);
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        return this;
    };
    return Action;
}(Subscription_1.Subscription));
exports.Action = Action;
//# sourceMappingURL=Action.js.map

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncAction_1 = __webpack_require__(78);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var QueueAction = (function (_super) {
    __extends(QueueAction, _super);
    function QueueAction(scheduler, work) {
        _super.call(this, scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    };
    return QueueAction;
}(AsyncAction_1.AsyncAction));
exports.QueueAction = QueueAction;
//# sourceMappingURL=QueueAction.js.map

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AsyncScheduler_1 = __webpack_require__(79);
var QueueScheduler = (function (_super) {
    __extends(QueueScheduler, _super);
    function QueueScheduler() {
        _super.apply(this, arguments);
    }
    return QueueScheduler;
}(AsyncScheduler_1.AsyncScheduler));
exports.QueueScheduler = QueueScheduler;
//# sourceMappingURL=QueueScheduler.js.map

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var QueueAction_1 = __webpack_require__(258);
var QueueScheduler_1 = __webpack_require__(259);
/**
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * @examples <caption>Schedule recursively first, then do something</caption>
 *
 * Rx.Scheduler.queue.schedule(() => {
 *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 *
 *
 * @example <caption>Reschedule itself recursively</caption>
 *
 * Rx.Scheduler.queue.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 *
 *
 * @static true
 * @name queue
 * @owner Scheduler
 */
exports.queue = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
//# sourceMappingURL=queue.js.map

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an element was queried at a certain index of an
 * Observable, but no such index or position exists in that sequence.
 *
 * @see {@link elementAt}
 * @see {@link take}
 * @see {@link takeLast}
 *
 * @class ArgumentOutOfRangeError
 */
var ArgumentOutOfRangeError = (function (_super) {
    __extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError() {
        var err = _super.call(this, 'argument out of range');
        this.name = err.name = 'ArgumentOutOfRangeError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ArgumentOutOfRangeError;
}(Error));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(3);
var rxSubscriber_1 = __webpack_require__(49);
var Observer_1 = __webpack_require__(71);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 264 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});