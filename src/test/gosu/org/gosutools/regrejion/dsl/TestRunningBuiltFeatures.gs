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
uses org.gosutools.regrejion.dsl.common.SubjectFeatureFactory
uses org.gosutools.regrejion.dsl.double.SpyScenario
uses org.gosutools.regrejion.dsl.steps.Preparation
uses org.gosutools.regrejion.dsl.double.SpyPreparation

class TestRunningBuiltFeatures extends TestCase {
  function testRunningDegenerateFeature() {
     var subject = SubjectFeatureFactory.createDegenerateSubjectFeatureSpy("degenerate","test running",new SpyScenario())
     subject.FirstScenario.Preparations.each( \ elt : Preparation -> {
       var preparation = elt as SpyPreparation
       print("trdf preparation.Ran=${preparation.Ran}")  // @TODO get this to print true (implement scenario running)
     })
  }
}