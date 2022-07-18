import { newE2EPage } from '@stencil/core/testing';

describe('app-scores', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-scores></app-scores>');

    const element = await page.find('app-scores');
    expect(element).toHaveClass('hydrated');
  });
});
