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

uses java.io.ByteArrayInputStream
uses java.util.ArrayList
uses junit.framework.TestCase
uses org.fest.assertions.Assertions

class TestSpooler extends TestCase {

  function testRun() {
    var testData = new ByteArrayInputStream("one\ntwo\nthree".getBytes("utf-8"))
    var actualOutStrings = new ArrayList<String>()
    var subject = new Spooler(testData, actualOutStrings)

    subject.run()

    Assertions.assertThat(actualOutStrings).hasSize(3)
  }
}