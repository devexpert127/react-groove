# useGeoVisibility hook

This hook allows you to control if you want to show some banner/modal/etc to site visitor based on his location. 

## Configuration

`useGeoVisibility` hook allows you to configure the visibility with a configuration object. Supported configuration keys are:


| Name      | Required | Type     | Default value | Description                                                                                    |
|-----------|----------|----------|---------------|------------------------------------------------------------------------------------------------|
| cities    | -        | string[] | -             | Array of cities where your container will be visible                                           |
| states    | -        | string[] | -             | Array of states where your container will be visible                                           |
| countries | -        | string[] | -             | Array of countries where your container will be visible. Supports shorthands like NL, CA, etc. |

Cities has greater priority comparing to states and countries.
States has greater priority comparing to countries.
If no cities or states are specified the component will fallback to countries.
The banner will not be visible if no config is provided.

## Return values

`useGeoVisibility` hook returns an object containing 2 keys: `isVisible` and `hideBanner`.

| Name       | Type       | Description                                             |
|------------|------------|---------------------------------------------------------|
| isVisible  | boolean    | When true banner should be visible for specified config |
| hideBanner | () => void | Callback function to hide the banner                    |

### Usage
    const cities = ['Amsterdam']
    const states = ['California']
    const countries = ['Australia', 'China']
    const { isVisible, hideBanner } = useGeoVisibility({
      cities,
      states,
      countries
    })