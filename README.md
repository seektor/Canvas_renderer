# Canvas_renderer

http://krzysztoflukawski.com/jarvis/

Analytical dashboard created using canvas components.

The main purpose of this project was to create a canvas renderer in order to test the capabilities of the canvas api.

The rendering structure contains of single canvas layers and stages which are like html divs, they can group other layers in order to add extra restrictions (like prevent dragged child from getting out of parent's rect) or improve drawing performance by caching. Each widget can be used as a layer in another widget (grid's sliders are seperate components which are nested on the grid's main stage along with the data layer).

**Dynamic elements**

- `Grid` - both of the sliders are functional. Columns' width can adjusted by dragging the the right border of the single header.
- `Gauge` - value can be adjusted by dragging the slider

- `Theme` - Theme can be changed by clicking the cog icon in the upper left corner of the app and switching the button.

- `Other dynamic elements` - The digital display behaves as a normal clock and changes every minute. The flat display in the bottom right corner changes its value every couple of seconds.

