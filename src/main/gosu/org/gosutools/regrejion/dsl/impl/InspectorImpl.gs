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

class InspectorImpl extends Inspector {
  var _feature: Inspectable
  construct(feature: Inspectable, builtFeature : BuiltFeature) {
    _feature = feature
    super._builtFeature = builtFeature
  }

  static function addFeatureInspector(feature: Inspectable, inspector: Inspector) {
    Inspector._inspectors.put(feature, inspector)
  }
}