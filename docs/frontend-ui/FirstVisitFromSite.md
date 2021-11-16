# useIsFirstVisitFromSite hook

This hook allows you to control if you want to show some banner/modal/etc to someone visiting website for the first time and navigated from a social network.

## Configuration

`useIsFirstVisitFromSite` hook allows you to configurate which social networks you want to track. If user is navigated from any of those networks for the first time he will see the container. Configuration object supports the following keys:

| Name      | Required | Type    | Default value | Description                                          |     |
| --------- | -------- | ------- | ------------- | ---------------------------------------------------- | --- |
| instagram | -        | boolean | -             | Shows the banner if user is navigated from Instagram |     |
| facebook  | -        | boolean | -             | Shows the banner if user is navigated from Facebook  |     |
| linkedin  | -        | boolean | -             | Shows the banner if user is navigated from LinkedIn  |     |
| pinterest | -        | boolean | -             | Shows the banner if user is navigated from Pinterest |     |

## Return values

`useIsFirstVisitFromSite` hook returns an object containing 2 keys: `isVisible` and `hideBanner`.

| Name       | Type       | Description                                             |
| ---------- | ---------- | ------------------------------------------------------- |
| isVisible  | boolean    | When true banner should be visible for specified config |
| hideBanner | () => void | Callback function to hide the banner                    |

### Usage

    const config = { instagram: true, facebook: true }
    const { isVisible, hideBanner } = useIsFirstVisitFromSite(config)
