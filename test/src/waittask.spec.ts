/**
 * @license
 * Copyright 2018 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import expect from 'expect';

import {
  setupSeparateTestBrowserHooks,
  setupTestBrowserHooks,
} from './mocha-utils.js';

describe('waittask specs', function () {
  setupTestBrowserHooks();

  describe('protocol timeout', () => {
    const state = setupSeparateTestBrowserHooks({
      protocolTimeout: 9_000,
    });

    it('should error if underyling protocol command times out with raf polling', async () => {
      let error!: Error;
      await state.page
        .waitForFunction(
          () => {
            return false;
          },
          {timeout: 12_000},
        )
        .catch(error_ => {
          return (error = error_);
        });

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Waiting failed');
      expect(error.stack).toContain('waittask.spec.ts');
      expect(error.cause).toBeInstanceOf(Error);
    });
  });
});
