/**
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
package org.gosutools.regrejion.e2e

uses junit.framework.TestCase
uses org.gosutools.regrejion.dsl.Feature
uses org.gosutools.regrejion.dsl.steps.builtin.EchoMessageStdout
uses org.gosutools.regrejion.dsl.Scenario
uses org.gosutools.regrejion.dsl.steps.builtin.PreparationStep
uses org.gosutools.regrejion.dsl.steps.builtin.SubjectStep
uses org.gosutools.regrejion.dsl.steps.builtin.VerificationStep

class TestWithoutInstall extends TestCase {
  var _scenario1 = Scenario.named("Not a real scenario 1")
      .withPurpose("first scenario in a test feature")
      .withPrepartionsBeforeSubject({
          new PreparationStep() { :Step = new EchoMessageStdout() {:Message = "prep 1 before scenario 1"} },
          new PreparationStep() { :Step = new EchoMessageStdout() {:Message = "prep 2 before scenario 1"} }})
      .withSubject(new SubjectStep() { :Step = new EchoMessageStdout() {:Message = "subject of scenario 1"} })
      .withVerificationsAfterSubject({
          new VerificationStep() { :Step = new EchoMessageStdout() { :Message = "verification 1 after scenario 1"}},
          new VerificationStep() { :Step = new EchoMessageStdout() { :Message = "verification 2 after scenario 1"}}})
      .build()
  var _scenario2 = Scenario.named("Not a real scenario 2")
      .withPurpose("second scenario in a test feature")
      .withPrepartionsBeforeSubject({
          new PreparationStep() { :Step = new EchoMessageStdout() {:Message = "prep 1 before scenario 2"} },
          new PreparationStep() { :Step = new EchoMessageStdout() {:Message = "prep 2 before scenario 2"} }})
      .withSubject(new SubjectStep() { :Step = new EchoMessageStdout() {:Message = "subject of scenario 2"} })
      .withVerificationsAfterSubject({
          new VerificationStep() { :Step = new EchoMessageStdout() { :Message = "verification 1 after scenario 2"}},
          new VerificationStep() { :Step = new EchoMessageStdout() { :Message = "verification 2 after scenario 2"}}})
      .build()
  var _subject = Feature.named("Not a real feature")
      .withPurpose("to test end-to-end running without using installer")
      .withStepsRunOnceBeforeFirstScenario({
          new EchoMessageStdout () { :Message = "step 1 before first" },
          new EchoMessageStdout () { :Message = "step 2 before first" }})
      .withStepsRunOnceBeforeEachScenario({
          new EchoMessageStdout () { :Message = "step A before each" },
          new EchoMessageStdout () { :Message = "step B before each" }})
      .withScenario(_scenario1)
      .withMoreScenarios({_scenario2})
      .withStepsRunAfterEachScenario({
          new EchoMessageStdout () { :Message = "step W after each" },
          new EchoMessageStdout () { :Message = "step X after each" }})
      .withStepsRunAfterLastScenario({
          new EchoMessageStdout () { :Message = "step Y after last" },
          new EchoMessageStdout () { :Message = "step Z after last" }})
      .build()

  function testFeatureWithTwoScenarios() {
    var subject = _subject
    subject.run()
    // @TODO verify run -- currently missing scenario execution of subject and verifications
  }
}