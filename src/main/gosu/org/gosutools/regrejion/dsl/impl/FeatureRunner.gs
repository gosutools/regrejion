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
uses java.util.HashMap
uses java.util.Map
uses org.gosutools.regrejion.exec.CommandProcess
uses org.gosutools.regrejion.exec.ProcessRunner
uses org.gosutools.regrejion.impl.ActualResult
uses org.gosutools.regrejion.dsl.steps.Step
uses org.gosutools.regrejion.api.Result

class FeatureRunner {
  var _feature : BuiltFeature
  construct(feature : BuiltFeature) {
    _feature = feature
  }
  function run() {
    var accumulator = new ArrayList<Map<String, ActualResult>>()

    _feature.StepsBeforeFirstScenario.each( \ step : Step ->  {
      step.Runner = \x -> accumulator.add(runOne(x))
      step.run()
    })
    _feature.StepsBeforeEachScenario.each( \ step : Step -> {
      step.Runner = \ x -> accumulator.add(runOne(x))
      step.run()

    })
    var firstScenarioLabel = new HashMap<String, ActualResult>()

    var fs = _feature.FirstScenario

    new ScenarioRunner(_feature.FirstScenario).run()

    firstScenarioLabel.put("stdout", new ActualResult() { :Contents = {"${_feature.FirstScenario}"}})
    accumulator.add(firstScenarioLabel)


    _feature.StepsAfterEachScenario.each( \ step : Step -> {
      step.Runner = \ x -> accumulator.add(runOne(x))
      step.run()
    })

    _feature.MoreScenarios.each( \ scenario : BuiltScenario -> {
      _feature.StepsBeforeEachScenario.each( \ step : Step -> {
        step.Runner = \ x ->  accumulator.add(runOne(x))
        step.run()
      })

      var moreScenariosLabel = new HashMap<String, ActualResult>()
      moreScenariosLabel.put("stdout", new ActualResult() { :Contents = {"${scenario}"}})
      accumulator.add(moreScenariosLabel)

      new ScenarioRunner(scenario).run()

      _feature.StepsAfterEachScenario.each( \ step : Step -> {
        step.Runner = \ x -> accumulator.add(runOne(x))
        step.run()
      })
    })

    _feature.StepsAfterLastScenario.each( \ step : Step ->  {
      step.Runner = \ x -> accumulator.add(runOne(x))
      step.run()
    })
    print("accumulator=${accumulator}")
    accumulator.each( \ elt : Map<String, ActualResult> -> {
      var result = elt
      print("elt=" + elt)
      print("result=" + result.get("stdout").Contents)
    })
//    accumulator.each( \ result : Map<String, ActualResult> ->  print(result.get("stdout").Contents + "\n") )
  }
  private function runOne(command : String) : Map<String,ActualResult> {
    var subject = new ProcessRunner()
    var commandProcess = new CommandProcess(command)
    return subject.exec(commandProcess, 1000L)
  }
}