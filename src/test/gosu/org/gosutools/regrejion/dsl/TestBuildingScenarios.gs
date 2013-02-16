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
package org.gosutools.regrejion.dsl

uses junit.framework.TestCase
uses org.gosutools.regrejion.dsl.doubles.DummySubject
uses org.gosutools.regrejion.dsl.doubles.DummyVerification
uses org.gosutools.regrejion.dsl.steps.Preparation
uses org.gosutools.regrejion.dsl.steps.Verification
uses org.gosutools.regrejion.dsl.steps.Subject
uses org.fest.assertions.Assertions

class TestBuildingScenarios extends TestCase {
  function testDegenerateScenario() {
    var dummySubject = new DummySubject()
    var scenario = Scenario.named("degenerate")
        .withPurpose("test dsl builder")
        .withNoPreparationsBeforeSubject()
        .withSubject(dummySubject)
        .withVerificationsAfterSubject({new DummyVerification()})
        .build()
    Assertions.assertThat(scenario.Built).isTrue()
    Assertions.assertThat(scenario.Name).contains("degenerate")
    Assertions.assertThat(scenario.Purpose).contains("test dsl builder")
    Assertions.assertThat(scenario.Preparations).hasSize(0)
    Assertions.assertThat(scenario.Subject).isEqualTo(dummySubject)
    Assertions.assertThat(scenario.Verifications).hasSize(1)
  }

  function testTypicalScenario() {
    var prep1 = new Preparation() {
    }
    var prep2 = new Preparation() {
    }
    var verify1 = new Verification() {
    }
    var verify2 = new Verification() {
    }
    var scenario = Scenario.named("s1").withPurpose("s1p").withPrepartionsBeforeSubject({prep1, prep2}).withSubject(new Subject(){
    }).withVerificationsAfterSubject({verify1, verify2}).build()
    // @TODO asserts
  }
}