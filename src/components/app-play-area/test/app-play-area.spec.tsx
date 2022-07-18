import { newSpecPage } from '@stencil/core/testing';
import { AppScoreBox } from '../app-play-area';

describe('app-score-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppScoreBox],
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
