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

uses java.util.Map
uses java.util.ArrayList
uses org.gosutools.regrejion.impl.ActualResult
uses org.gosutools.regrejion.dsl.steps.Preparation
uses org.gosutools.regrejion.exec.CommandProcess
uses org.gosutools.regrejion.exec.ProcessRunner

class ScenarioRunner {
  var _scenario : BuiltScenario
  construct(scenario: BuiltScenario) {
    _scenario = scenario
  }
  function run() {
    var accumulator = new ArrayList<Map<String, ActualResult>>()
    _scenario.Preparations.each( \ elt : Preparation -> {
      print("elt=${elt}")
      elt.run()
      // accumulator.add(runOne("type foo")) // @TODO remove this scaffolding
    })
//    _scenario.Preparations.each( \ preparation : Preparation ->  {
//      preparation.Runner = \x -> accumulator.add(runOne(x))
//      preparation.run()
//    })
  }

 private function runOne(command : String) : Map<String,ActualResult> {
    var subject = new ProcessRunner()
    var commandProcess = new CommandProcess(command)
    return subject.exec(commandProcess, 1000L)
  }
}