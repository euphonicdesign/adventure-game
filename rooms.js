export const rooms = [
  {
    number: 1,
    name: "starting place",
    description: `It is a beautiful day outside. The room is full of sunshine.
    You decide to go out, and explore the surroundings.
    `,
    actions: [
      {
        action: "left",
        destination: "room 2",
      },
      {
        action: "right",
        destination: "room 3",
      },
      {
        action: "up",
        destination: "room 4",
      },
      {
        action: "down",
        destination: "room 5",
      },
    ],
    npcs: [
      {
        name: "dragon",
        state: {
          happiness: false,
          hunger: true,
        },
        actions: ["say a joke", "talk", "offer food"],
      },
      {
        name: "tiger",
        state: {
          happiness: false,
          hunger: true,
        },
        actions: ["feed", "talk", "annoy"],
      },
    ],
  },
  {
    number: 2,
    name: "room 2",
    description: `You chose to go to the creative side of the realm.
    `,
    actions: [
      {
        action: "return",
        destination: "starting place",
      },
    ],
  },
  {
    number: 3,
    name: "room 3",
    description: `You have arrived at the bottom of a hill.
    `,
    actions: [
      {
        action: "left",
        destination: "starting place",
      },
    ],
  },
  {
    number: 4,
    name: "room 4",
    description: `You are at the top of a mountain.
    `,
    actions: [
      {
        action: "down",
        destination: "starting place",
      },
    ],
  },
  {
    number: 5,
    name: "room 5",
    description: `You went down the river.
    `,
    actions: [
      {
        action: "up",
        destination: "starting place",
      },
    ],
  },
];
