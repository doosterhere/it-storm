export type CategoriesType = {
  id: string,
  name: CategoryName,
  url: CategoryUrl
}

export enum CategoryName {
  copyrighting = 'Копирайтинг',
  design = 'Дизайн',
  freelance = 'Фриланс',
  smm = 'SMM',
  target = 'Таргет'
}

export enum CategoryUrl {
  copyrighting = 'kopiraiting',
  design = 'dizain',
  freelance = 'frilans',
  smm = 'smm',
  target = 'target'
}
