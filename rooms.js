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
        destination: "swamp",
      },
      {
        action: "right",
        destination: "hill",
      },
      {
        action: "up",
        destination: "dragon cave entrance",
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
    name: "swamp",
    description: `You arrive at the swamp. What will you do next?
    `,
    actions: [
      {
        action: "right",
        destination: "starting place",
      },
      // {
      //   action: "underwater",
      //   destination: "underwater",
      // },
    ],
    npcs: [
      {
        name: "monkey",
        state: {},
        actions: ["talk", "offer food"],
      },
      {
        name: "tiger",
        state: {},
        actions: ["talk", "feed"],
      },
    ],
  },
  {
    number: 3,
    name: "underwater",
    description: `You are now underwater`,
    actions: [
      {
        action: "surface",
        destination: "swamp",
      },
    ],
  },
  {
    number: 4,
    name: "dragon cave entrance",
    description: `You are at the entrance of a dragon cave. A large rock is blocking the way in.
    `,
    actions: [
      {
        action: "down",
        destination: "starting place",
      },
    ],
    npcs: [
      {
        name: "rock",
        state: {
          moved: false,
        },
        actions: ["move", "cry"],
      },
    ],
  },
  {
    number: 5,
    name: "dragon cave",
    description: `You are deep inside the cave. You stand in front of a fierce dragon...
    `,
    actions: [
      {
        action: "outside",
        destination: "dragon cave entrance",
      },
    ],
    npcs: [
      {
        name: "dragon",
        state: {
          defeated: false,
        },
        actions: ["attack"],
      },
    ],
  },
  {
    number: 6,
    name: "hill",
    description: `You are at the top of a hill... You notice a windmill and someone nearby.
    `,
    actions: [
      {
        action: "left",
        destination: "starting place",
      },
    ],
    npcs: [
      {
        name: "inventor",
        state: {
          hadTalked: false,
          usedBinoculars: false,
        },
        actions: ["talk"],
      },
    ],
  },
  {
    number: 7,
    name: "house",
    description: `You are inside the house.
    `,
    actions: [
      {
        action: "left",
        destination: "hill",
      },
    ],
    npcs: [
      {
        name: "house",
        state: {
          hasPickedFood: false,
          hasPickedMoney: false,
        },
        actions: ["pick food", "pick money"],
      },
    ],
  },
];
