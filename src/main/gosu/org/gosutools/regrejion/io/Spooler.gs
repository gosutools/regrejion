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
package org.gosutools.regrejion.io

uses java.io.BufferedReader;
uses java.io.InputStream;
uses java.io.InputStreamReader;
uses java.lang.Runnable
uses org.gosutools.regrejion.util.Logger

class Spooler implements Runnable {
  var _inStream: InputStream
  var _logger = Logger.getLogger()
  var _outStrings: List <String>
  construct(inStream: InputStream, outStrings: List <String>) {
    _inStream = inStream;
    _outStrings = outStrings
  }

  override function run() {
    try {
      var bufferedReader = new BufferedReader(new InputStreamReader(_inStream))
      var line: String
      _logger.log("Spooler: copying inStream=${_inStream} to outStrings=${_outStrings}")
      while (true) {
        line = bufferedReader.readLine()
        if (line == null) {
          break;
        }
        _outStrings.add(line)
        _logger.log("Spooler.run add: ${line}")
      }
      _logger.log("Spooler: done with inStream=${_inStream}, outStrings.size()=${_outStrings.size()}")
    } catch (unexpected) {
      _logger.log("Spooler: caught unexpected=${unexpected}")
    }
  }
}
