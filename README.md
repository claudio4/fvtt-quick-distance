# Quick-Distance Foundry Module

The Quick-Distance module provides a convenient way to quickly and easily see the distance between your selected token and any other token on the map. Simply hover your mouse over another token, and a tooltip will appear showing the distance between the two tokens, taking into account both the horizontal distance and the difference in elevation. This can be especially useful for determining the range of spells or abilities, or for planning out movement and positioning in combat.

![demo](https://user-images.githubusercontent.com/9874071/206549442-5dbf2b08-e609-4d08-aa15-6a0d9ea07444.gif)

## Features

- Displays the distance between two tokens on the map, using either game system distance measurements or Euclidean distance
- Can be enabled or disabled for each individual client, allowing users to control whether they see the distance information
- Can be toggled to only show the distance information in combat situations
- Can handle creatures of all sizes, from sub-square to multi-square, and accurately displays the distance information for each

## Prerequisites

- Foundry VTT version 9 or higher (including 10).

## Install instructions

1. Go to the "releases" page on this repository.

![](https://user-images.githubusercontent.com/9874071/207355820-7fafd5e4-984f-4209-b311-7aaf7e7c5393.png)

2. Find the latest stable release, copy the link address of the "manifest.json".

![](https://user-images.githubusercontent.com/9874071/207356421-6a4dca9e-6c53-4c78-8f2a-f209d8f7f82f.png)

3. Go to your Foundry instance "Setup" screen and click on the "Add-on Modules" tab.

![](https://user-images.githubusercontent.com/9874071/207356928-5ab088ae-82cb-43a9-930a-89fc52d740bb.png)

4. Click on the "Install module" button.

![](https://user-images.githubusercontent.com/9874071/207357275-b5bf8438-0d63-4c9a-bb9b-b10af6670c2c.png)

5. Paste the link in our clipboard in the "Manifest URL" field at the bottom of the page, then click the "Install" button.

![](https://user-images.githubusercontent.com/9874071/207357907-2b4f76e6-1068-4815-bd22-655349cae93a.png)

## Public API

The Quick-Distance module provides a public API for developers through the `QuickDistance` global variable. This allows module and macro developers to calculate distances between tokens programmatically.

### Available Methods

#### `calculateDistanceBetweenTokens(t1, t2)`

**Description:** Calculates the distance between two tokens on the map, taking into account both horizontal and elevation differences. The calculation respects the configured distance measurement (game system or Euclidean).

**Parameters:**

- `t1` (**Token**) - The first token.
- `t2` (**Token**) - The second token.

**Returns:**

- `number` - The distance between the two tokens using the current scene units.

**Usage Example:**

```javascript
const distance = QuickDistance.calculateDistanceBetweenTokens(token1, token2);
console.log(`Distance: ${distance} ${canvas.scene.grid.units}`);
```

## Known Issues

- The Quick-Distance module does not currently have a concept of token height, so all calculations treat tokens as if they are 1 pixel tall. This means that sometimes the distance will be slightly inaccurate, as in a more accurate measurement the source/targets height might need to be subtracted.

## Acknowledgments

The Quick-Distance module was created as a free and open-source (FOSS) alternative to [TheRipper93's Hover Distance](https://theripper93.com/module/hover-distance) module, and was developed with the goal of providing a similar set of features and functionality to the Foundry community. I am grateful to Ripper93 for their contributions to the Foundry platform and for serving as a source of inspiration for this project.

## License

- This module is distributed under the MIT license. more information is available in the [LICENSE](/LICENSE) file.
