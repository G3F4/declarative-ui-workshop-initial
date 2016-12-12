// CATEGORIES
const IT_CATEGORY = {
  id: '1',
  name: 'IT',
  description: 'IT description',
  events: ['1', '2', '3', '4', '5'],
};

const SPORT_CATEGORY = {
  id: '2',
  name: 'SPORT',
  description: 'SPORT description',
  events: ['6', '7', '8'],
};

const MUSIC_CATEGORY = {
  id: '3',
  name: 'MUSIC',
  description: 'MUSIC description',
  events: ['9', '11', '10'],
};


// EVENTS MOCKS
const WARSAWJS_EVENT = {
  id: '1',
  description: 'WarsawJS description',
  name: 'WarsawJS',
};

const REACTWARSAW_EVENT = {
  id: '2',
  description: 'ReactWarsaw description',
  name: 'ReactWarsaw',
};

const RUNMAGEDON_EVENT = {
  id: '3',
  description: 'Runmagedon description',
  name: 'Runmagedon',
};

const PYCON_EVENT = {
  id: '4',
  description: 'PyCon description',
  name: 'PyCon',
};

const KONFITURA_EVENT = {
  id: '5',
  description: 'Konfitura description',
  name: 'Konfitura',
};

const POLSKA_RESZTA_SWIATA_EVENT = {
  id: '6',
  description: 'Mecz Polska vs Reszta świata description',
  name: 'Mecz Polska vs Reszta świata',
};

const ROLKI_NOCA_EVENT = {
  id: '7',
  description: 'Rolki nocą description',
  name: 'Rolki nocą',
};

const EXTREME_SWIMMING_EVENT = {
  id: '8',
  description: 'Extreme swimming description',
  name: 'Extreme swimming',
};

const ORANGE_FESTIVAL_EVENT = {
  id: '9',
  description: 'Orange festival description',
  name: 'Orange festival',
};

const MUSIC_FEST_EVENT = {
  id: '10',
  description: 'Music fest description',
  name: 'Music fest nocą',
};

const MAYDAY_EVENT = {
  id: '11',
  description: 'Mayday description',
  name: 'Mayday',
};



const data = {
  Category: {
    1: IT_CATEGORY,
    2: SPORT_CATEGORY,
    3: MUSIC_CATEGORY
  },
  Event: {
    1: WARSAWJS_EVENT,
    2: REACTWARSAW_EVENT,
    3: RUNMAGEDON_EVENT,
    4: PYCON_EVENT,
    5: KONFITURA_EVENT,
    6: POLSKA_RESZTA_SWIATA_EVENT,
    7: ROLKI_NOCA_EVENT,
    8: EXTREME_SWIMMING_EVENT,
    9: ORANGE_FESTIVAL_EVENT,
    10: MUSIC_FEST_EVENT,
    11: MAYDAY_EVENT
  },
};


export function getEvent(id) {
  return data.Event[id];
}

export function getCategory(id) {
  return data.Category[id];
}

export function getCategories(names) {
  return names.map(name => {
    if (name === SPORT_CATEGORY.name) {
      return SPORT_CATEGORY;
    }
    if (name === IT_CATEGORY.name) {
      return IT_CATEGORY;
    }

    if (name === MUSIC_CATEGORY.name) {
      return MUSIC_CATEGORY;
    }

    return null;
  });
}
