import { newSpecPage } from '@stencil/core/testing';
import { AppScores } from '../app-scores';

describe('app-scores', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppScores],
      html: `<app-scores></app-scores>`,
    });
    expect(page.root).toEqualHtml(`
      <app-scores>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-scores>
    `);
  });
});
