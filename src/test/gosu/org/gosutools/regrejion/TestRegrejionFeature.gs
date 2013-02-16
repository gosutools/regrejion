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

uses junit.framework.TestCase
uses org.gosutools.regrejion.dsl.steps.builtin.EchoMessageStdout
uses org.gosutools.regrejion.dsl.steps.builtin.PreparationStep
uses org.gosutools.regrejion.dsl.steps.builtin.SubjectStep
uses org.gosutools.regrejion.dsl.steps.builtin.VerificationStep

class TestRegrejionFeature extends TestCase {

  function testRun() {
    var subject = new RegrejionFeature() {
      :Name = "rf1name",
      :Purpose = "rf1purpose",
      :BeforeFirst = {
          new EchoMessageStdout() { :Message = "rf1bf1"},
          new EchoMessageStdout() { :Message = "rf1bf2"}},
      :BeforeEach = {
          new EchoMessageStdout() { :Message = "rf1be1"},
          new EchoMessageStdout() { :Message = "rf1be2"}},
      :Scenarios = {
        new RegrejionScenario() {
          :Name = "rf1rs1n",
          :Purpose = "rf1rs1p",
          :PreparationSteps = {
              new PreparationStep() { :Step = new EchoMessageStdout() { :Message = "rf1s1p1"}},
              new PreparationStep() { :Step = new EchoMessageStdout() { :Message = "rf1s1p2"}}
          },
          :SubjectStep = new SubjectStep() { :Step = new EchoMessageStdout() { :Message = "rf1s1subject"}},
          :VerificationSteps = {
              new VerificationStep() { :Step = new EchoMessageStdout() { :Message = "rf1s1v1"}},
              new VerificationStep() { :Step = new EchoMessageStdout() { :Message = "rf1s1v2"}}
          }
        }.build(),
          new RegrejionScenario() {
              :Name = "rf1rs2n",
              :Purpose = "rf1rs2p",
              :PreparationSteps = {
                  new PreparationStep() { :Step = new EchoMessageStdout() { :Message = "rf1s2p1"}},
                  new PreparationStep() { :Step = new EchoMessageStdout() { :Message = "rf1s2p2"}}
              },
              :SubjectStep = new SubjectStep() { :Step = new EchoMessageStdout() { :Message = "rf1s2subject"}},
              :VerificationSteps = {
                  new VerificationStep() { :Step = new EchoMessageStdout() { :Message = "rf1s2v1"}},
                  new VerificationStep() { :Step = new EchoMessageStdout() { :Message = "rf1s2v2"}}
              }
          }.build()
      },
      :AfterEach = {
          new EchoMessageStdout() { :Message = "rf1ae1"},
          new EchoMessageStdout() { :Message = "rf1ae2"}},
      :AfterLast = {
          new EchoMessageStdout() { :Message = "rf1al1"},
          new EchoMessageStdout() { :Message = "rf1al2"}}
    }
    subject.run()

  }

// @TODO verify run



}