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

uses java.io.ByteArrayOutputStream
uses org.fest.assertions.Assertions
uses junit.framework.TestCase

class TestLogger extends TestCase {
  function testLog() {
    var stream = new ByteArrayOutputStream()
    var subject = Logger.setLogger(stream)
    subject.log("stuff")
    var logged = stream.toString()
    Assertions.assertThat(logged).contains("stuff")
  }
}