# GearShare Main Page

## Features

- White background with a prominent map/route visual (see [location-visual.png](public/location-visual.png)).
- Shows user's current location using [OpenCage Data API](https://opencagedata.com/).
- Search box for car parts powered by Microsoft SQL (see `api/carparts.ts`).
- Car parts list pulled from SQL (GET) and supports adding new (POST).
- Responsive, modern UI inspired by [this visual](https://medium.com/@vignesh.slm666/location-tracking-using-seeker-in-kali-linux-a-step-by-step-guide-c9ab81a2f10a).

## Setup

1. Add your OpenCage API key in `MainPage.tsx`.
2. Replace SQL config in `api/carparts.ts` with your SQL server details.
3. Place the provided map visual in `public/location-visual.png` or use your own.
4. Run your Next.js app as usual.

## Example

![Main Page Preview](public/location-visual.png)