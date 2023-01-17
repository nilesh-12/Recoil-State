import { atom,selector } from 'recoil'

function getFromLS(id) {
  return JSON.parse(localStorage.getItem(id))
}

export const selectedItems = atom({
  key:'selectedItems',
  default:getFromLS('selectedItems') ?? []
})

export const cardCount = selector({
  key:'cardCount',
  get: ({get})=>{
    return get(selectedItems).length
  }
})

export const isSelectedItemsSame = selector({
  key:'persistBtnDis',
  get: ({get})=>{
    console.log(localStorage.getItem('selectedItems')===JSON.stringify(get(selectedItems)))
    return localStorage.getItem('selectedItems')===JSON.stringify(get(selectedItems))
    }
})
