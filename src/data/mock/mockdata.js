export const scooterOverview = {
  totalScooters: 233,
  liveScooters: 89,
  chargingScooters: 22,
  maintenceScooters: 2,
};

export const scooters = {
  scooters: [
    {
      _id: "637d4ec0fe898c05f558fcb4",
      status: "Available",
      battery: 100,
      speed: 0,
      owner: "Stockholm",
      coordinates: {
        longitude: "5.0",
        latitude: "1.0",
      },
      currentTrip: {
        startPosition: {
          longitude: "5.0",
          latitude: "1.0",
        },
        startTime: 0,
        endTime: 0,
      },
    },
    {
      _id: "637d4ec0fe898c05f558fcb5",
      status: "Not available",
      battery: 54,
      speed: 0,
      owner: "Karlskrona",
      position: {
        longitude: "2.0",
        latitude: "15.0",
      },
      currentTrip: {
        startPosition: {
          longitude: "2.0",
          latitude: "15.0",
        },
        startTime: 0,
        endTime: 0,
      },
    },
  ],
};

export const scooterData = {
  scooters: [
    {
      status: "Available",
      battery: 100,
      owner: "Stockholm",
      position: {
        longitude: "5.0",
        latitude: "1.0",
      },
    },
    {
      status: "Not available",
      battery: 54,
      owner: "Karlskrona",
      position: {
        longitude: "2.0",
        latitude: "15.0",
      },
    },
    {
      status: "In use",
      battery: 42,
      owner: "Halmstad",
      position: {
        longitude: "22.0",
        latitude: "145.0",
      },
    },
    {
      status: "Available",
      battery: 100,
      owner: "Stockholm",
      position: {
        longitude: "5.0",
        latitude: "1.0",
      },
    },
    {
      status: "Not available",
      battery: 54,
      owner: "Karlskrona",
      position: {
        longitude: "2.0",
        latitude: "15.0",
      },
    },
    {
      status: "In use",
      battery: 42,
      owner: "Halmstad",
      position: {
        longitude: "22.0",
        latitude: "145.0",
      },
    },
    {
      status: "Available",
      battery: 100,
      owner: "Stockholm",
      position: {
        longitude: "5.0",
        latitude: "1.0",
      },
    },
    {
      status: "Not available",
      battery: 54,
      owner: "Karlskrona",
      position: {
        longitude: "2.0",
        latitude: "15.0",
      },
    },
    {
      status: "In use",
      battery: 42,
      owner: "Halmstad",
      position: {
        longitude: "22.0",
        latitude: "145.0",
      },
    },
  ],
};

export const markers = {
  markerPoints: [
    [15.558929, 56.155583],
    [15.656844, 56.228932],
  ],
};

export const areas = {
  geoObjects: [
    {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            kind: "Municipality",
            name: "Karlskrona",
            state: "KS",
          },
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              [
                [
                  [15.558929, 56.155583],
                  [15.572597, 56.18663],
                  [15.591939, 56.198839],
                  [15.605424, 56.192853],
                  [15.617583, 56.188028],
                  [15.607509, 56.172125],
                  [15.602819, 56.169909],
                  [15.597434, 56.165952],
                  [15.601777, 56.161801],
                  [15.59535, 56.156683],
                ],
              ],
            ],
          },
        },
      ],
    },
    {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            kind: "Municipality",
            name: "Karlskrona",
            state: "KS",
          },
          geometry: {
            type: "MultiPolygon",
            coordinates: [
              [
                [
                  [15.62098, 56.207234],
                  [15.639962, 56.219633],
                  [15.656844, 56.228932],
                  [15.68875, 56.21497],
                  [15.684388, 56.204147],
                  [15.68253, 56.195658],
                ],
              ],
            ],
          },
        },
      ],
    },
  ],
};
