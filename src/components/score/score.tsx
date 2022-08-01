import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import store from '../../store'

@Component({
  tag: 'app-score',
  styleUrl: 'score.css',
  scoped: true,
})
export class Score {
  @Prop() score: number = 0;
  @Prop() label: string;
  @Prop() disabled: boolean;
  @Prop() position: number;

  @Event() selectScore: EventEmitter<boolean>;
  handleSelectScore() {
    this.selectScore.emit(true);
  }

  render() {
    const { label, score, position } = this;
    return (
      <Host>
        <div>{label}</div>
        { position === 6 ? (
          <div class="score">0</div>
        ) : (
          <div>
            <input type="radio" name="score"
              disabled={!store.board.roundStarted}
              checked={store.board.roundStarted ? false : null}
              id={label.replace(' ', '-')}
              value={label.replace(' ', '-')}
              onChange={() => this.handleSelectScore()}
              />
            <label htmlFor={label.replace(' ', '-')}>
              {score}
            </label>
          </div>
        )}
      </Host>
    );
  }

}
