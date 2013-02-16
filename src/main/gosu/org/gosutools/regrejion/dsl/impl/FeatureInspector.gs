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

uses java.util.HashMap
uses java.util.Map
uses org.gosutools.regrejion.dsl.Feature

class FeatureInspector {
  static protected var _inspectors: Map <InspectableFeature, FeatureInspector> = new HashMap <InspectableFeature, FeatureInspector>()
  protected var _builtFeature: BuiltFeature as readonly BuiltFeature
  static function inspect(feature: InspectableFeature): FeatureInspector {
    return _inspectors.get(feature)
  }
}