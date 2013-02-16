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

uses org.gosutools.regrejion.dsl.steps.Preparation
uses org.gosutools.regrejion.dsl.steps.Verification
uses org.gosutools.regrejion.dsl.steps.Subject

class BuiltScenario {
  var _built: boolean as Built
  var _name: String as Name
  var _preparations: List <Preparation> as Preparations
  var _purpose: String as Purpose
  var _subject: Subject as Subject
  var _verifications: List <Verification> as Verifications
  protected construct() {
  }
}