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
uses org.gosutools.regrejion.exec.ProcessRunner
uses org.gosutools.regrejion.exec.CommandProcess
uses org.gosutools.regrejion.impl.ActualResult
uses java.util.Map
uses java.util.ArrayList
uses java.util.HashMap

abstract class BuiltFeature {
  var _built: boolean as Built
  var _firstScenario: Scenario as FirstScenario
  var _moreScenarios: List <Scenario> as MoreScenarios
  var _name: String as Name
  var _purpose: String as Purpose
  var _stepsAfterEachScenario: List <? extends Step> as StepsAfterEachScenario
  var _stepsAfterLastScenario: List <? extends Step> as StepsAfterLastScenario
  var _stepsBeforeFirstScenario: List <? extends Step> as StepsBeforeFirstScenario
  var _stepsBeforeEachScenario: List <? extends Step> as StepsBeforeEachScenario

  function run() {
    var accumulator = new ArrayList<Map<String, ActualResult>>()
    _stepsBeforeFirstScenario.each( \ step ->  {
      step.run( \ x -> accumulator.add(runOne(x)))
    })
    _stepsBeforeEachScenario.each( \ step -> {
      step.run( \ x -> accumulator.add(runOne(x)))
    })
    var scenario1label = new HashMap<String, ActualResult>()
    scenario1label.put("stdout", new ActualResult() { :Contents = {"${_firstScenario}"}})
    accumulator.add(scenario1label)
    _stepsAfterEachScenario.each( \ step -> {
      step.run( \ x -> accumulator.add(runOne(x)))
    })
    _moreScenarios.each( \ scenario -> {
      _stepsBeforeEachScenario.each( \ step -> {
        step.run( \ x ->  accumulator.add(runOne(x)))
      })

      var scenarioNlabel = new HashMap<String, ActualResult>()
      scenarioNlabel.put("stdout", new ActualResult() { :Contents = {"${scenario}"}})
      accumulator.add(scenarioNlabel)

      _stepsAfterEachScenario.each( \ step -> {
        step.run( \ x -> accumulator.add(runOne(x)))
      })
    })
    _stepsAfterLastScenario.each( \ step ->  {
      step.run( \ x -> accumulator.add(runOne(x)))
    })
    print("accumulator=${accumulator}")
    accumulator.each( \ result -> print(result.get("stdout").Contents + "\n") )
  }
  private function runOne(command : String) : Map<String,ActualResult> {
    var subject = new ProcessRunner()
    var commandProcess = new CommandProcess(command)
    return subject.exec(commandProcess, 1000L)
  }
}