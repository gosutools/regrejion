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
package org.gosutools.regrejion.dsl

uses junit.framework.TestCase
uses org.fest.assertions.Assertions
uses org.gosutools.regrejion.dsl.impl.BuiltFeature
uses org.gosutools.regrejion.dsl.impl.FeatureInspector
uses org.gosutools.regrejion.dsl.steps.builtin.EchoEnvironmentVariable
uses org.gosutools.regrejion.dsl.steps.builtin.EchoMessageStdout
uses org.gosutools.regrejion.dsl.steps.Preparation
uses org.gosutools.regrejion.dsl.steps.Subject
uses org.gosutools.regrejion.dsl.steps.Verification
uses org.gosutools.regrejion.dsl.impl.BuiltScenario
uses org.gosutools.regrejion.dsl.mock.MockScenario

class TestBuildingFeatures extends TestCase {

  function testDegenerativeBuiltFeature() {


    var subject = Feature.named("x")
        .withPurpose("y")
        .withNoStepsRunOnceBeforeFirstScenario()
        .withNoStepsRunBeforeEachScenario()
        .withScenario(new MockScenario())
        .withNoMoreScenarios()
        .withNoStepsRunAfterEachScenario()
        .withNoStepsRunAfterLastScenario()
        .build()

    Assertions.assertThat(subject.Name).contains("x")
    Assertions.assertThat(subject.Purpose).contains("y")
    Assertions.assertThat(subject.StepsBeforeFirstScenario).hasSize(0)
    Assertions.assertThat(subject.StepsBeforeEachScenario).hasSize(0)
    Assertions.assertThat(subject.FirstScenario).isNotNull()
    Assertions.assertThat(subject.MoreScenarios).hasSize(0)
    Assertions.assertThat(subject.StepsAfterEachScenario).hasSize(0)
    Assertions.assertThat(subject.StepsAfterLastScenario).hasSize(0)
    Assertions.assertThat(subject.Built).isTrue()
  }

  function testTypicalBuiltFeature() {
    var subject = Feature.named("foo")
        .withPurpose("bar")
        .withStepsRunOnceBeforeFirstScenario({
            new EchoMessageStdout () { :Message = "step 1 before first" },
            new EchoMessageStdout () { :Message = "step 2 before first" }})
        .withStepsRunOnceBeforeEachScenario({
            new EchoMessageStdout () { :Message = "step A before each" },
            new EchoMessageStdout () { :Message = "step B before each" }})
        .withScenario(new BuiltScenario())       // @TODO make BuiltScenario ctor private, hide factory
        .withMoreScenarios({new BuiltScenario()})
        .withStepsRunAfterEachScenario({
            new EchoMessageStdout () { :Message = "step W after each" },
            new EchoMessageStdout () { :Message = "step X after each" }})
        .withStepsRunAfterLastScenario({
            new EchoMessageStdout () { :Message = "step Y after last" },
            new EchoMessageStdout () { :Message = "step Z after last" }})
        .build()

    Assertions.assertThat(subject.Name).contains("foo")
    Assertions.assertThat(subject.Purpose).contains("bar")
    Assertions.assertThat(subject.StepsBeforeFirstScenario).hasSize(2)
    Assertions.assertThat(subject.StepsBeforeEachScenario).hasSize(2)
    Assertions.assertThat(subject.FirstScenario).isNotNull()
    Assertions.assertThat(subject.MoreScenarios).hasSize(1)
    Assertions.assertThat(subject.StepsAfterEachScenario).hasSize(2)
    Assertions.assertThat(subject.StepsAfterLastScenario).hasSize(2)
    Assertions.assertThat(subject.Built).isTrue()

    //subject.run()
  }

  function testAnotherOne() {
    var subject = Feature.named("foo").withPurpose("bar")
        .withNoStepsRunOnceBeforeFirstScenario()
        .withStepsRunOnceBeforeEachScenario({new EchoEnvironmentVariable() { :Name = "PATH"}})
        .withScenario(new BuiltScenario())
        .withNoMoreScenarios()
        .withNoStepsRunAfterEachScenario()
        .withNoStepsRunAfterLastScenario()
        .build()

    Assertions.assertThat(subject.FirstScenario).isNotNull()
    subject.run()
    var ex = Feature.named("ex").withPurpose("demo fw")
        .withNoStepsRunOnceBeforeFirstScenario()
        .withNoStepsRunBeforeEachScenario()
        .withScenario(new BuiltScenario())
        .withNoMoreScenarios()
        .withNoStepsRunAfterEachScenario()
        .withNoStepsRunAfterLastScenario()
        .build()

    //ex.run()
  }
}