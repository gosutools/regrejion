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
uses org.gosutools.regrejion.dsl.impl.Inspector
uses org.gosutools.regrejion.dsl.steps.Command
uses junit.framework.Assert

class TestFeature extends TestCase {
  function testDegenerativeBuiltFeature() {
    var subject = Feature.named("x")
        .withPurpose("y")
        .withNoStepsRunOnceBeforeFirstScenario()
        .withNoStepsRunBeforeEachScenario()
        .withScenario(new Scenario())
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
            new Command("echo 'step 1 before first'"),
            new Command("echo 'step 2 before first'")})
        .withStepsRunOnceBeforeEachScenario({
            new Command("echo 'step A before each'"),
            new Command("echo 'step B before each'")})
        .withScenario(new Scenario())
        .withMoreScenarios({new Scenario()})
        .withStepsRunAfterEachScenario({
            new Command("echo 'step W after each'"),
            new Command("echo 'step X after each'")})
        .withStepsRunAfterEachScenario({
            new Command("echo 'step Y after last'"),
            new Command("echo 'step Z after last'")})
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

    subject.run()
  }

  function testAnotherOne() {
    var subject = Feature.named("foo").withPurpose("bar")
        .withNoStepsRunOnceBeforeFirstScenario()
        .withStepsRunOnceBeforeEachScenario({new Command("ls -e")})
        .withScenario(new Scenario()).withNoMoreScenarios().withNoStepsRunAfterEachScenario().withNoStepsRunAfterLastScenario().build()

    Assertions.assertThat(subject.FirstScenario).isNotNull()

  }
}