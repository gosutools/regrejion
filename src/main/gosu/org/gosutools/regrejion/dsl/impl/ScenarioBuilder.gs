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

uses org.gosutools.regrejion.dsl.impl.Inspectable
uses org.gosutools.regrejion.dsl.scenario.NamedScenario
uses org.gosutools.regrejion.dsl.scenario.PurposefulScenario
uses org.gosutools.regrejion.dsl.scenario.ScenarioWithPreparationsBeforeSubject
uses org.gosutools.regrejion.dsl.scenario.ScenarioWithSubject
uses org.gosutools.regrejion.dsl.scenario.ScenarioWithVerificationsAfterSubject
uses org.gosutools.regrejion.dsl.steps.Preparation
uses org.gosutools.regrejion.dsl.steps.Subject
uses org.gosutools.regrejion.dsl.steps.Verification
uses org.gosutools.regrejion.dsl.Scenario

class ScenarioBuilder {
  static function namedScenario(scenario: Scenario, name: String): NamedScenario {
    var it = new NamedScenario() {
  }
    //mapToNextInspector(it, Scenario).Name = name
    return it
  }

  static function purposefulScenario(namedScenario: NamedScenario, purpose: String): PurposefulScenario {
    var it = new PurposefulScenario() {
  }
    //mapToNextInspector(it, namedScenario).Purpose = purpose
    return it
  }

  static function scenarioWithPreparationsBeforeSubject(purposefulScenario: PurposefulScenario,
                                                      preparations: List <? extends Preparation>): ScenarioWithPreparationsBeforeSubject {
    var it = new ScenarioWithPreparationsBeforeSubject() {
  }
    //mapToNextInspector(it, purposefulScenario).Preparations = preparations
    return it
  }

  static function scenarioWithSubject(scenarioWithPreparationsBeforeSubject: ScenarioWithPreparationsBeforeSubject,
                                                     subject: Subject): ScenarioWithSubject {
    var it = new ScenarioWithSubject() {
  }
    //mapToNextInspector(it, scenarioWithPreparationsBeforeSubject).Subject = subject
    return it
  }

  static function scenarioWithVerificationsAfterSubject(scenarioWithSubject: ScenarioWithSubject,
                                      verifications: List <? extends Verification>): ScenarioWithVerificationsAfterSubject {
    var it = new ScenarioWithVerificationsAfterSubject() {
    }
    //mapToNextInspector(it, scenarioWithVerificationsAfterSubject).Verifications = verifications
    return it
  }

  static function build(scenarioWithVerificationsAfterSubject: ScenarioWithVerificationsAfterSubject): BuiltScenario {
    var builtScenario = new BuiltScenario() // @TODO use inspector to initialize BuiltScenario name, purpose, etc.
    if (true) {
      // @TODO check that everything is initialized
      builtScenario.Built = true
    }
    return builtScenario
  }

}