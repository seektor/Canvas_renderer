1. Proper adjusting on resizes should be implemented.
2. There is still some weird problem when scrolling vertically. Rarely there is some missing space on the bottom of the view, like there would not be a row drawn?
3. Redux subscribe mechanism for the time being forces all the subscribers to rerender. Need a mechanism to distinguish which data was changed specifically.
4. TCoords, TParentRelativeCoords. Maybe the second one should be removed?
5. Unify painter into CanvasPainter maybe or vice versa.
6. Inspect where clear should be added/removed when rendering.