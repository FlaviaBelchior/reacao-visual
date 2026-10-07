export type SinquiTerm = {
  id: string;
  videoId: string;
  visual: string;
  stage: number;
};

export type SinquiStage = {
  id: number;
  icon: string;
  terms: SinquiTerm[];
};

const all: SinquiTerm[] = [
  { id:'atom', videoId:'uW3w7jOu4zU', visual:'atom', stage:1 },
  { id:'electron', videoId:'tekJjT2Iz2Q', visual:'electron', stage:1 },
  { id:'electrosphere', videoId:'Dr_XjFGrjqo', visual:'electrosphere', stage:1 },
  { id:'nucleus', videoId:'nTHM2s7ZBI0', visual:'nucleus', stage:1 },
  { id:'proton', videoId:'zrBSzvV0teM', visual:'proton', stage:1 },
  { id:'neutron', videoId:'wYRO_9cvHAQ', visual:'neutron', stage:1 },

  { id:'element', videoId:'xkwbcSiLyC0', visual:'element', stage:2 },
  { id:'cation', videoId:'znJiOE8kjq4', visual:'cation', stage:2 },
  { id:'anion', videoId:'KSAjMbELOwM', visual:'anion', stage:2 },
  { id:'ion', videoId:'h9B2v-WaRBE', visual:'ion', stage:2 },
  { id:'covalent', videoId:'cNsdfCymE2Q', visual:'covalent', stage:2 },
  { id:'ionic', videoId:'islHpEil2kc', visual:'ionic', stage:2 },

  { id:'simple-substance', videoId:'Vbjc9YA1wZw', visual:'simple-substance', stage:3 },
  { id:'compound-substance', videoId:'A_1XQeodyww', visual:'compound-substance', stage:3 },
  { id:'molecule', videoId:'1yPrwo8RgpE', visual:'molecule', stage:3 },
  { id:'homogeneous', videoId:'fuPXdyAqUIA', visual:'homogeneous', stage:3 },
  { id:'heterogeneous', videoId:'f8H19HkyXCQ', visual:'heterogeneous', stage:3 },

  { id:'solid', videoId:'F6R3CX47U0c', visual:'solid', stage:4 },
  { id:'liquid', videoId:'cXCnyonUg9U', visual:'liquid', stage:4 },
  { id:'gas', videoId:'85Enuwc6sfw', visual:'gas', stage:4 },
  { id:'fusion', videoId:'yxotze8fUQ4', visual:'fusion', stage:4 },
  { id:'vaporization', videoId:'twUaNgUnaJE', visual:'vaporization', stage:4 },
  { id:'solidification', videoId:'YkbXhkk-xl4', visual:'solidification', stage:4 },
  { id:'condensation', videoId:'6EGFmkxi7JA', visual:'condensation', stage:4 },
  { id:'sublimation', videoId:'RKEr2vyOlWM', visual:'sublimation', stage:4 },

  { id:'physical-phenomenon', videoId:'6EgX0y3tTxA', visual:'physical-phenomenon', stage:5 },
  { id:'chemical-phenomenon', videoId:'b-TGAenIVqY', visual:'chemical-phenomenon', stage:5 },
  { id:'chemical-reaction', videoId:'ETtyAPtwfCA', visual:'chemical-reaction', stage:5 },
  { id:'endothermic', videoId:'XY5RPdNWumY', visual:'endothermic', stage:5 },
  { id:'exothermic', videoId:'Q0ZBWlbmgPo', visual:'exothermic', stage:5 },

  { id:'energy', videoId:'D9KyGb33rFE', visual:'energy', stage:6 },
  { id:'electrical-energy', videoId:'Bagm6EXiqQM', visual:'electrical-energy', stage:6 },
  { id:'chemical-energy', videoId:'cLDwhgAbZCY', visual:'chemical-energy', stage:6 },
  { id:'heat', videoId:'AwItfqRmFqc', visual:'heat', stage:6 },
  { id:'thermal-energy', videoId:'iZtslTmqBVg', visual:'thermal-energy', stage:6 },
  { id:'light-energy', videoId:'72ObPK-8ygY', visual:'light-energy', stage:6 },
  { id:'sound-energy', videoId:'P0iOpfzOrdg', visual:'sound-energy', stage:6 },

  { id:'rutherford', videoId:'FaUMGE-PSeg', visual:'rutherford', stage:7 },
  { id:'thomson', videoId:'39m7aUATFZo', visual:'thomson', stage:7 },
  { id:'dalton', videoId:'JAeFZzG0S-U', visual:'dalton', stage:7 },
  { id:'mendeleev', videoId:'uYunuCjWywk', visual:'mendeleev', stage:7 },
  { id:'bohr', videoId:'3PHF9u080bQ', visual:'bohr', stage:7 },
];

const stageIcons: Record<number,string> = {
  1:'⚛️',
  2:'⚡',
  3:'🧪',
  4:'🧊',
  5:'🔥',
  6:'💡',
  7:'👨‍🔬',
};

export const sinquiStages: SinquiStage[] = Array.from({ length: 7 }, (_, index) => {
  const id = index + 1;
  return { id, icon: stageIcons[id], terms: all.filter((term) => term.stage === id) };
});

export const sinquiTerms = all;
