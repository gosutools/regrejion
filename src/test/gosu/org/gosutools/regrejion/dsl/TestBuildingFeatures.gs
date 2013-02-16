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
uses org.fest.assertions.Assertions
uses org.gosutools.regrejion.dsl.common.SubjectFeatureFactory
uses org.gosutools.regrejion.dsl.doubles.DummyScenario
uses org.gosutools.regrejion.dsl.impl.BuiltFeature
uses org.gosutools.regrejion.dsl.impl.BuiltScenario
uses org.gosutools.regrejion.dsl.impl.FeatureInspector
uses org.gosutools.regrejion.dsl.steps.builtin.EchoEnvironmentVariable
uses org.gosutools.regrejion.dsl.steps.builtin.EchoMessageStdout
uses org.gosutools.regrejion.dsl.steps.Preparation
uses org.gosutools.regrejion.dsl.steps.Subject
uses org.gosutools.regrejion.dsl.steps.Verification

class TestBuildingFeatures extends TestCase {

  final static var FEATURE_NAME_DEGENERATE = "degenerate"
  final static var FEATURE_NAME_TYPICAL = "typical"
  final static var FEATURE_PURPOSE_DEGENERATE = "test simplest feature building"
  final static var FEATURE_PURPOSE_TYPICAL = "test typical feature building"
  final static var FEATURE_SINGLE_SCENARIO_DEGENERATE = new DummyScenario ()
  final static var FEATURE_SINGLE_SCENARIO_TYPICAL1 = new DummyScenario ()
  final static var FEATURE_SINGLE_SCENARIO_TYPICAL2 = new DummyScenario ()

  function testDegenerativeBuiltFeature() {

    var subject = SubjectFeatureFactory
        .createDegenerateSubjectFeatureSpy(FEATURE_NAME_DEGENERATE,
            FEATURE_PURPOSE_DEGENERATE,
            FEATURE_SINGLE_SCENARIO_DEGENERATE)

    Assertions.assertThat(subject.Name).contains(FEATURE_NAME_DEGENERATE)
    Assertions.assertThat(subject.Purpose).contains(FEATURE_PURPOSE_DEGENERATE)
    Assertions.assertThat(subject.StepsBeforeFirstScenario).hasSize(0)
    Assertions.assertThat(subject.StepsBeforeEachScenario).hasSize(0)
    Assertions.assertThat(subject.FirstScenario).isNotNull()
    Assertions.assertThat(subject.FirstScenario).isEqualTo(FEATURE_SINGLE_SCENARIO_DEGENERATE)
    Assertions.assertThat(subject.MoreScenarios).hasSize(0)
    Assertions.assertThat(subject.StepsAfterEachScenario).hasSize(0)
    Assertions.assertThat(subject.StepsAfterLastScenario).hasSize(0)
    Assertions.assertThat(subject.Built).isTrue()
  }

  function testTypicalBuiltFeature() {
    var subject = Feature.named(FEATURE_NAME_TYPICAL)
        .withPurpose(FEATURE_PURPOSE_TYPICAL)
        .withStepsRunOnceBeforeFirstScenario({
            new EchoMessageStdout () { :Message = "step 1 before first" },
            new EchoMessageStdout () { :Message = "step 2 before first" }})
        .withStepsRunOnceBeforeEachScenario({
            new EchoMessageStdout () { :Message = "step A before each" },
            new EchoMessageStdout () { :Message = "step B before each" }})
        .withScenario(FEATURE_SINGLE_SCENARIO_TYPICAL1)
        .withMoreScenarios({FEATURE_SINGLE_SCENARIO_TYPICAL2})
        .withStepsRunAfterEachScenario({
            new EchoMessageStdout () { :Message = "step W after each" },
            new EchoMessageStdout () { :Message = "step X after each" }})
        .withStepsRunAfterLastScenario({
            new EchoMessageStdout () { :Message = "step Y after last" },
            new EchoMessageStdout () { :Message = "step Z after last" }})
        .build()

    Assertions.assertThat(subject.Name).contains(FEATURE_NAME_TYPICAL)
    Assertions.assertThat(subject.Purpose).contains(FEATURE_PURPOSE_TYPICAL)
    Assertions.assertThat(subject.StepsBeforeFirstScenario).hasSize(2)
    Assertions.assertThat(subject.StepsBeforeEachScenario).hasSize(2)
    Assertions.assertThat(subject.FirstScenario).isNotNull()
    Assertions.assertThat(subject.FirstScenario).isEqualTo(FEATURE_SINGLE_SCENARIO_TYPICAL1)
    Assertions.assertThat(subject.MoreScenarios).hasSize(1)
    Assertions.assertThat(subject.MoreScenarios.get(0)).isEqualTo(FEATURE_SINGLE_SCENARIO_TYPICAL2)
    Assertions.assertThat(subject.StepsAfterEachScenario).hasSize(2)
    Assertions.assertThat(subject.StepsAfterLastScenario).hasSize(2)
    Assertions.assertThat(subject.Built).isTrue()

    //subject.run()
  }

  function testAnotherOne() {
    var subject = Feature.named("foo").withPurpose("bar")
        .withNoStepsRunOnceBeforeFirstScenario()
        .withStepsRunOnceBeforeEachScenario({new EchoEnvironmentVariable() { :Name = "PATH"}})
        .withScenario(new DummyScenario ())
        .withNoMoreScenarios()
        .withNoStepsRunAfterEachScenario()
        .withNoStepsRunAfterLastScenario()
        .build()

    Assertions.assertThat(subject.FirstScenario).isNotNull()
    // subject.run() @TODO move to TestRunningBuiltFeatures (along with other commented-out .run() calls)

    var ex = Feature.named("ex").withPurpose("demo fw")
        .withNoStepsRunOnceBeforeFirstScenario()
        .withNoStepsRunBeforeEachScenario()
        .withScenario(new DummyScenario ())
        .withNoMoreScenarios()
        .withNoStepsRunAfterEachScenario()
        .withNoStepsRunAfterLastScenario()
        .build()

    //ex.run()
  }
}