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
package org.gosutools.regrejion

uses org.gosutools.regrejion.dsl.impl.BuiltFeature
uses org.gosutools.regrejion.dsl.steps.Step
uses org.gosutools.regrejion.dsl.Scenario
uses org.gosutools.regrejion.dsl.Feature
uses org.gosutools.regrejion.dsl.impl.BuiltScenario
uses java.util.ArrayList
uses org.gosutools.regrejion.api.Result

class RegrejionFeature {
  var _name : String as Name
  var _purpose : String as Purpose
  var _beforeFirst : List<Step> as BeforeFirst
  var _beforeEach : List<Step> as BeforeEach
  var _scenarios : List<BuiltScenario> as Scenarios
  var _afterEach : List<Step> as AfterEach
  var _afterLast : List<Step> as AfterLast
  function run() {
    Feature.named(_name)
        .withPurpose(_purpose)
        .withStepsRunOnceBeforeFirstScenario(_beforeFirst)
        .withStepsRunOnceBeforeEachScenario(_beforeEach)
        .withScenario(first(_scenarios))
        .withMoreScenarios(rest(_scenarios))
        .withStepsRunAfterEachScenario(_afterEach)
        .withStepsRunAfterLastScenario(_afterLast)
        .build()
        .run()
  }

  private function first(scenarios : List<BuiltScenario>) : BuiltScenario {
    return scenarios.get(0)
  }

  private function rest(scenarios : List<BuiltScenario>) : List<BuiltScenario> {
    var result = new ArrayList<BuiltScenario>()
    result.addAll(scenarios)
    result.remove(0)
    return result
  }

}