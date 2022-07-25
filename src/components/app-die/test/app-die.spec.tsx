import { newSpecPage } from '@stencil/core/testing';
import { AppDie } from '../app-die';

describe('app-die', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppDie],
      html: `<app-die></app-die>`,
    });
    expect(page.root).toEqualHtml(`
      <app-die>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-die>
    `);
  });
});
