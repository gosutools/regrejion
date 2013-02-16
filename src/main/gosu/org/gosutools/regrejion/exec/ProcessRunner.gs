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
package org.gosutools.regrejion.exec

uses java.io.InputStream
uses java.lang.Long
uses java.lang.Process
uses java.lang.ProcessBuilder
uses java.lang.Thread
uses java.util.ArrayList
uses java.util.HashMap
uses java.util.Map
uses org.gosutools.regrejion.io.Spooler
uses org.gosutools.regrejion.impl.ActualResult

class ProcessRunner {
  function exec(command: CommandProcess, maxMs: Long): Map <String, ActualResult> {
    var result = new HashMap <String, ActualResult>()
    var pb = new ProcessBuilder(command.Command.split("\\s"))
    pb.directory(command.Dir)
    command.Process = pb.start()
    spool(command.Process.ErrorStream, "stderr", result)
    spool(command.Process.InputStream, "stdout", result)
    command.Process.waitFor()
    try {
      Thread.sleep(100L)
    } catch (_) {
      //
    }
    return result
  }

  private function spool(stream: InputStream, name: String, result: Map <String, ActualResult>) {
    result.put(name, new ActualResult() {
        : Contents = new ArrayList <String>()
    })
    var t = (new Thread(new Spooler(stream, result.get(name).Contents)))
    t.setDaemon(true)
    t.start()
  }
}