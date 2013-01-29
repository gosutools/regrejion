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

uses java.util.ArrayList
uses java.util.Map
uses org.gosutools.regrejion.impl.ActualResult
uses java.util.HashMap
uses org.gosutools.regrejion.exec.ProcessRunner
uses org.gosutools.regrejion.exec.CommandProcess

class FeatureRunner {
  var _feature : BuiltFeature
  construct(feature : BuiltFeature) {
    _feature = feature
  }
  function run() {
    var accumulator = new ArrayList<Map<String, ActualResult>>()
    _feature.StepsBeforeFirstScenario.each( \ step ->  {
      step.run( \ x -> accumulator.add(runOne(x)))
    })
    _feature.StepsBeforeEachScenario.each( \ step -> {
      step.run( \ x -> accumulator.add(runOne(x)))
    })
    var scenario1label = new HashMap<String, ActualResult>()
    scenario1label.put("stdout", new ActualResult() { :Contents = {"${_feature.FirstScenario}"}})
    accumulator.add(scenario1label)
    _feature.StepsAfterEachScenario.each( \ step -> {
      step.run( \ x -> accumulator.add(runOne(x)))
    })
    _feature.MoreScenarios.each( \ scenario -> {
      _feature.StepsBeforeEachScenario.each( \ step -> {
        step.run( \ x ->  accumulator.add(runOne(x)))
      })

      var scenarioNlabel = new HashMap<String, ActualResult>()
      scenarioNlabel.put("stdout", new ActualResult() { :Contents = {"${scenario}"}})
      accumulator.add(scenarioNlabel)

      _feature.StepsAfterEachScenario.each( \ step -> {
        step.run( \ x -> accumulator.add(runOne(x)))
      })
    })
    _feature.StepsAfterLastScenario.each( \ step ->  {
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