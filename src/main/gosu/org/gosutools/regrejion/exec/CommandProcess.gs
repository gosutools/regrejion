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

uses java.io.File
uses java.lang.Process
uses java.lang.StringBuilder
uses org.gosutools.regrejion.exec.CommandProcess
uses org.gosutools.regrejion.util.Logger

class CommandProcess {
  var _command: String
  var _dir: File
  var _logger = Logger.getLogger()
  var _process: Process
  construct(command: String) {
    Logger.getLogger().log("CommandProcess.construct(${command})")
    _command = command
  }

  property get Command(): String {
    return _command
  }

  property get Dir(): File {
    return _dir
  }

  property get Process(): Process {
    return _process
  }

  property set Command(command: String) {
    _logger.log("Command=${command}")
    _command = command
  }

  property set Dir(dir: File) {
    _logger.log("Dir=${dir.AbsolutePath}")
    _dir = dir
  }

  property set Process(process: Process) {
    _logger.log("Process=${process}")
    _process = process
  }

  function kill(reason: String) {
    _logger.log("CommandProcess.kill(${reason}), killing process=${_process}")
    _process.destroy()
  }

  override function toString(): String {
    return "CommandProcess: command=${_command}, dir=${_dir}, process=${_process}"
  }
}