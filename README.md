# Quick-Distance Foundry Module

The Quick-Distance module provides a convenient way to quickly and easily see the distance between your selected token and any other token on the map. Simply hover your mouse over another token, and a tooltip will appear showing the distance between the two tokens, taking into account both the horizontal distance and the difference in elevation. This can be especially useful for determining the range of spells or abilities, or for planning out movement and positioning in combat.


## Features

- Displays the distance between two tokens on the map, using either game system distance measurements or Euclidean distance
- Can be enabled or disabled for each individual client, allowing users to control whether they see the distance information
- Can be toggled to only show the distance information in combat situations
- Can handle creatures of all sizes, from sub-square to multi-square, and accurately displays the distance information for each

## Prerequisites

- Foundry VTT version 9 or higher (including 10).

## Known Issues
- The Quick-Distance module does not currently have a concept of token height, so all calculations treat tokens as if they are 1 pixel tall. This means that sometimes the distance will be slightly innacurate, as in a more accurate measurement the soruce/targets height might need to be suctracted.


## License

- This module is distributed under the MIT license. more information is avalible in the [LICENSE](/LICENSE) file.
