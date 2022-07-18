import { newSpecPage } from '@stencil/core/testing';
import { AppScoreItem } from '../app-score-item';

describe('app-score-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppScoreItem],
      html: `<app-score-box></app-score-box>`,
    });
    expect(page.root).toEqualHtml(`
      <app-score-box>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-score-box>
    `);
  });
});
