/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {RenderOptions as BaseRenderOptions, render} from '@testing-library/react';
import type {ProviderProps} from '@react-spectrum/provider';
import {ProviderWrapper} from './ProviderWrapper';
import React, {ReactElement} from 'react';

let reactTestingLibrary = require('@testing-library/react');

// export everything
export * from '@testing-library/react';

// export renderHook and actHook from testing-library/react-hooks library if they don't exist in @testing-library/react
// (i.e. renderHook is only in v13+ of testing library)
export let renderHook = reactTestingLibrary.renderHook;
export let actHook = reactTestingLibrary.act;
if (!renderHook) {
  let rhtl = require('@testing-library/react-hooks');
  renderHook = rhtl.renderHook;
  actHook = rhtl.act;
}

interface RenderOptions extends BaseRenderOptions {
  providerProps: Omit<ProviderProps, 'children'>
}

// TODO: perhaps export this as a non-overide of render?
function providerWrapperRender(ui: ReactElement, options?: RenderOptions) {
  let rendered = render(ui, {wrapper: (props) => <ProviderWrapper {...props} {...options?.providerProps} />, ...options});
  return {
    ...rendered,
    rerender: (ui, options) => providerWrapperRender(ui, {container: rendered.container, ...options})
  };
}
// TODO how to re-export with the new RenderOptions definition
// override render method with
export {providerWrapperRender as render};
