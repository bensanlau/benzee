import { Component, h, Prop } from '@stencil/core';

interface ScoreItem {
  label: string;
  value: number;
}

const SCORE_CARD = [
  '1', '2', '3', '4', '5', '6', 'Bonus', // lower section
  '3x', '4x', 'full house', 'small straight', 'big straight', 'benzee', '?' // upper section
];

@Component({
  tag: 'app-scores',
  styleUrl: 'app-scores.css',
  scoped: true,
})
export class AppScores {
  @Prop() rolled: boolean;

  render() {
    const { rolled } = this;

    return (
      <section>
        {SCORE_CARD.map((item) =>
          <app-score-item
            disabled={!rolled}
            label={item}
          />
        )}
      </section>
    );
  }

}
