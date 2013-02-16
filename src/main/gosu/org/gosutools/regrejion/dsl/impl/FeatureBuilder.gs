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
package org.gosutools.regrejion.dsl.impl

uses org.gosutools.regrejion.dsl.feature.FeatureAfterEachScenario
uses org.gosutools.regrejion.dsl.feature.FeatureAfterLastScenario
uses org.gosutools.regrejion.dsl.feature.FeatureBeforeEachScenario
uses org.gosutools.regrejion.dsl.feature.FeatureBeforeFirstScenario
uses org.gosutools.regrejion.dsl.feature.FeatureWithOneScenario
uses org.gosutools.regrejion.dsl.feature.FeatureWithScenarios
uses org.gosutools.regrejion.dsl.feature.NamedFeature
uses org.gosutools.regrejion.dsl.feature.PurposefulFeature
uses org.gosutools.regrejion.dsl.impl.FeatureInspectorImpl
uses org.gosutools.regrejion.dsl.steps.Step
uses org.gosutools.regrejion.dsl.Feature
uses org.gosutools.regrejion.dsl.Scenario

class FeatureBuilder {
  static function namedFeature(feature: InspectableFeature, name: String): NamedFeature {
    var it = new NamedFeature() {
    }
    mapToNextInspector(it, feature).Name = name
    return it
  }

  static function purposefulFeature(namedFeature: NamedFeature, purpose: String): PurposefulFeature {
    var it = new PurposefulFeature() {
    }
    mapToNextInspector(it, namedFeature).Purpose = purpose
    return it
  }

  static function featureWithStepsBeforeFirstScenario(purposefulFeature: PurposefulFeature,
                                                      steps: List <? extends Step>): FeatureBeforeFirstScenario {
    var it = new FeatureBeforeFirstScenario() {
    }
    mapToNextInspector(it, purposefulFeature).StepsBeforeFirstScenario = steps
    return it
  }

  static function featureWithStepsBeforeEachScenario(featureWithStepsBeforeFirstScenario: FeatureBeforeFirstScenario,
                                                     steps: List <? extends Step>): FeatureBeforeEachScenario {
    var it = new FeatureBeforeEachScenario() {
    }
    mapToNextInspector(it, featureWithStepsBeforeFirstScenario).StepsBeforeEachScenario = steps
    return it
  }

  static function featureWithOneScenario(featureWithStepsBeforeEachScenario: FeatureBeforeEachScenario,
                                         scenario: BuiltScenario): FeatureWithOneScenario {
    var it = new FeatureWithOneScenario() {
    }
    mapToNextInspector(it, featureWithStepsBeforeEachScenario).FirstScenario = scenario
    return it
  }

  static function featureWithScenarios(featureWithOneScenario: FeatureWithOneScenario,
                                       scenarios: List <BuiltScenario>): FeatureWithScenarios {
    var it = new FeatureWithScenarios() {
    }
    mapToNextInspector(it, featureWithOneScenario).MoreScenarios = scenarios
    return it
  }

  static function featureWithStepsAfterEachScenario(featureWithScenarios: FeatureWithScenarios,
                                                    steps: List <? extends Step>): FeatureAfterEachScenario {
    var it = new FeatureAfterEachScenario() {
    }
    mapToNextInspector(it, featureWithScenarios).StepsAfterEachScenario = steps
    return it
  }

  static function featureWithStepsAfterLastScenario(featureWithStepsAfterEachScenario: FeatureAfterEachScenario,
                                                    steps: List <? extends Step>): FeatureAfterLastScenario {
    var it = new FeatureAfterLastScenario() {
    }
    mapToNextInspector(it, featureWithStepsAfterEachScenario).StepsAfterLastScenario = steps
    return it
  }

  static function build(featureWithStepsAfterLastScenario: FeatureAfterLastScenario): BuiltFeature {
    var builtFeature = FeatureInspector.inspect(featureWithStepsAfterLastScenario).BuiltFeature
    if (true) {
      // @TODO check that everything is initialized
      builtFeature.Built = true
    }
    return builtFeature
  }

  //--

  static private function mapToNextInspector(nextInChain: InspectableFeature,
                                             previous: InspectableFeature): BuiltFeature {
    var inspector = FeatureInspector.inspect(previous)
    if (null == inspector) {
      inspector = new FeatureInspectorImpl (previous, new BuiltFeature() {
      })
      FeatureInspector._inspectors.put(previous, inspector)
    }
    FeatureInspector._inspectors.put(nextInChain, inspector)
    return inspector.BuiltFeature
  }
}