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
package org.gosutools.regrejion.dsl.doubles

uses org.gosutools.regrejion.dsl.impl.BuiltScenario
uses org.gosutools.regrejion.dsl.steps.Preparation
uses java.util.ArrayList
uses org.gosutools.regrejion.dsl.steps.Verification

class SpyScenario extends BuiltScenario {
   construct() {
     super.Built = true
     super.Name = "Spy Scenario"
     super.Purpose = "To log execution of scenario"
     super.Preparations = new ArrayList<Preparation>()
     super.Preparations.add(new SpyPreparation())
     super.Subject = new SpySubject()
     super.Verifications = new ArrayList<Verification>()
     super.Verifications.add(new SpyVerification())
   }
}