module.exports = [
  {
    id: '0',
    name: 'cat0',
    subCategory: [
      { id: '00' }, { id: '01' }, { id: '02' }
    ],
    parentCategory: []
  },
  {
    id: '1',
    name: 'cat1',
    subCategory: [{ id: '10' }, { id: '11' }],
    parentCategory: []
  },
  {
    id: '2',
    name: 'cat2',
    subCategory: [{ id: '20' }],
    parentCategory: []
  },
  {
    id: '01',
    name: 'cat01',
    subCategory: [{ id: '011'}],
    parentCategory: [{ id: '0' }]
  },
  {
    id: '02',
    name: 'cat02',
    subCategory: [],
    parentCategory: [{ id: '0' }]
  },
  {
    id: '10',
    name: 'cat11',
    subCategory: [],
    parentCategory: [{ id: '1' }]
  },
  {
    id: '11',
    name: 'cat11',
    subCategory: [],
    parentCategory: [{ id: '1' }]
  },
  {
    id: '20',
    name: 'cat20',
    subCategory: [],
    parentCategory: [{ id: '2' }]
  },
  {
    id: '011',
    name: 'cat011',
    subCategory: [],
    parentCategory: [{ id: '01'}],
  }
]