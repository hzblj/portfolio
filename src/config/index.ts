const areas = [
  'g1',
  'g2',
  'g3',
  'g28',
  'g6',
  'g7',
  'g9',
  'g14',
  'g17',
  'g18',
  'info',
  'g27',
  'g30',
  'stories',
  'g23',
  'g24',
  'g26',
  'g20',
  'g21',
  'g22',
  'g4',
  'g15',
  'g29',
  'g8',
  'g12',
  'g33',
  'g32',
  'g34',
] as const

export const Config = {
  areas,
  height: 2256,
  width: 3008,
} as const

// RECAP
// Grid width -> grid columns
// 8 * 360 + (4 * (8 * 4)) === 3008
// col * wItem + (gap * (col * gap)) === Width

// Grid height -> grid rows
// 6 * 360 + (4 * (6 * 4)) === 2256
// countRow * h + (gap * (countRow * gap)) === Height

// PORTFOLIO
// Grid width -> grid columns
// 8 * 290 + (16 * (8 * 16)) === 4368
// countCol * wItem + (gap * (countCol * gap)) === Width

// Grid height -> grid rows
// 7 * 218 + (16 * (7 * 16)) === 3318
// countRow * h + (gap * (countRow * gap)) === Height

// 8 col
// 7 col
// 290w x 218h
// gap 16

// W = 2432 + (16 * 4) = 2496
// H = 1622 + (16 * 4) = 1686

// W = 2432 + 16 = 2448
// H = 1622 + 16 = 1638
