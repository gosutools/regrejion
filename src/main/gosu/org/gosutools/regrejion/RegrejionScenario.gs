
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
package org.gosutools.regrejion

uses java.lang.String
uses java.util.List
uses org.gosutools.regrejion.dsl.steps.builtin.PreparationStep
uses org.gosutools.regrejion.dsl.steps.builtin.SubjectStep
uses org.gosutools.regrejion.dsl.steps.builtin.VerificationStep
uses org.gosutools.regrejion.dsl.impl.BuiltScenario
uses org.gosutools.regrejion.dsl.Scenario

class RegrejionScenario {
  var _name : String as Name
  var _purpose : String as Purpose
  var _preparations : List<PreparationStep>  as PreparationSteps
  var _subject : SubjectStep as SubjectStep
  var _verifications : List<VerificationStep> as VerificationSteps

  function build() : BuiltScenario {
    return Scenario.named(_name)
        .withPurpose(_purpose)
        .withPrepartionsBeforeSubject(_preparations)
        .withSubject(_subject)
        .withVerificationsAfterSubject(_verifications)
        .build()
  }

}