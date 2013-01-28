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
package org.gosutools.regrejion.dsl.impl

uses org.gosutools.regrejion.dsl.steps.Step
uses org.gosutools.regrejion.dsl.Scenario

abstract class BuiltFeature {
  var _name: String as Name
  var _isBuilt: boolean as Built
  var _purpose: String as Purpose
  var _scenarios: List <Scenario> as Scenarios
  var _stepsAfterEachScenario: List <? extends Step> as StepsAfterEachScenario
  var _stepsAfterLastScenario: List <? extends Step> as StepsAfterLastScenario
  var _stepsBeforeFirstScenario: List <? extends Step> as StepsBeforeFirstScenario
  var _stepsBeforeEachScenario: List <? extends Step> as StepsBeforeEachScenario
}