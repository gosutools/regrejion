/**
    Copyright (c) 2013 Michael A. Wright.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */
package org.gosutools.regrejion.util

uses java.lang.Thread
uses java.lang.System
uses java.io.OutputStream
uses java.lang.IllegalStateException

class Logger {
  static var _instance: Logger = null;
  var _stream: OutputStream
  private construct() {
    _stream = System.out
  }

  private construct(stream: OutputStream) {
    _stream = stream
  }

  static function getLogger(): Logger {
    if (null == _instance) {
      _instance = new Logger()
    }
    return _instance
  }

  static function setLogger(stream: OutputStream): Logger {
    _instance = new Logger(stream)
    return _instance
  }

  function log(diag: String) {
    _stream.write("Logger.log(${diag}), thread=${Thread.currentThread()}".getBytes("utf-8"))
  }
}