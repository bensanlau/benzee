import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-play-area',
  styleUrl: 'app-play-area.css',
  shadow: true,
})
export class AppPlayArea {

  render() {
    return (
      <Host>
        <div class="">

        </div>
        <button>Roll</button>
        <button>Play</button>
      </Host>
    );
  }

}
