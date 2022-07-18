import { newE2EPage } from '@stencil/core/testing';

describe('app-score-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-score-box></app-score-box>');

    const element = await page.find('app-score-box');
    expect(element).toHaveClass('hydrated');
  });
});
