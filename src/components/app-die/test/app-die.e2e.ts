import { newE2EPage } from '@stencil/core/testing';

describe('app-die', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-die></app-die>');

    const element = await page.find('app-die');
    expect(element).toHaveClass('hydrated');
  });
});
