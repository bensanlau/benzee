import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'app-score-item',
  styleUrl: 'app-score-item.css',
  scoped: true,
})
export class AppScoreItem {
  @Prop() score: number;
  @Prop() label: string;
  @Prop() disabled: boolean;

  @Event() scoreSelected: EventEmitter<boolean>;
  handleScoreSelect() {
    this.scoreSelected.emit(true);
  }

  render() {
    const { label, score, disabled } = this;
    return (
      <Host>
        <div>{label}</div>
        <label htmlFor={label.replace(' ', '-')}>
          {score}
          <input type="radio" name="score"
            disabled={disabled}
            id={label.replace(' ', '-')}
            value={label.replace(' ', '-')}
            onChange={() => this.handleScoreSelect()}
            checked={this.disabled ? false : null}
          />
        </label>
      </Host>
    );
  }

}
