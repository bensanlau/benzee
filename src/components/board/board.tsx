import { Component, h } from '@stencil/core';

const BOARD = [
  '1', '2', '3', '4', '5', '6', 'Bonus', // lower section
  '3x', '4x', 'full house', 'small straight', 'big straight', 'benzee', '?' // upper section
]
@Component({
  tag: 'app-board',
  styleUrl: 'board.css',
  scoped: true,
})
export class Board {
  render() {
    return (
      <section>
        {BOARD.map((item, key) =>
          <app-score label={item} position={key} />
        )}
      </section>
    );
  }
}
