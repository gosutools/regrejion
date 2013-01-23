package org.gosutools.regrejion.io
/*
    Copyright 2013 Michael A. Wright

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
uses java.io.BufferedReader;
uses java.io.InputStream;
uses java.io.InputStreamReader;
uses java.lang.Runnable

class Spooler implements Runnable {
  var _inStream : InputStream
  var _outStrings : List<String>

  construct (inStream : InputStream, outStrings : List<String>) {
    _inStream = inStream;
    _outStrings = outStrings
  }

  override function run() {
    try {
      var bufferedReader = new BufferedReader(new InputStreamReader(_inStream))
      var line : String
      print("Spooler: copying inStream=${_inStream} to outStrings=${_outStrings}")
      while (true) {
        line = bufferedReader.readLine()
        if (line == null) {
          break;
        }
        _outStrings.add(line)
        print("Spooler.run add: ${line}")
      }
      print("Spooler: done with inStream=${_inStream}, outStrings.size()=${_outStrings.size()}")
    } catch (unexpected) {
      print("Spooler: caught unexpected=${unexpected}")
    }
  }

}
