package org.gosutools.regrejion.exec
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
uses java.io.ByteArrayInputStream
uses java.util.ArrayList
uses junit.framework.TestCase
uses org.fest.assertions.Assertions

class TestProcessRunner extends TestCase {
  function testExecJavaVersion() {
    var subject = new ProcessRunner()
    var commandProcess = new CommandProcess("java -version")

    var results = subject.exec(commandProcess, 1000L)

    var stdoutResult = results.get("stdout").Contents
    var stderrResult = results.get("stderr").Contents

    print("stdoutResult=${stdoutResult}, stderrResult=${stderrResult}")

    Assertions.assertThat(stdoutResult).hasSize(0)

    Assertions.assertThat(stderrResult).isNotEmpty()
    Assertions.assertThat(stderrResult).toString().contains("java")
    Assertions.assertThat(stderrResult).toString().contains("version")
    Assertions.assertThat(stderrResult).toString().contains("Java(TM)")
    Assertions.assertThat(stderrResult).toString().endsWith(")")
  }
}