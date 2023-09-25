import React, { useState, Dispatch, SetStateAction } from "react"

type List = {
  items: string[]
  label: string,
  color: string,
}

type handleAddType = {
  list: List,
  lists: List[],
  setLists: Dispatch<SetStateAction<List[]>>,
}

type handleMoveType = {
  item: string,
  list: List,
  lists: List[],
  setLists: Dispatch<SetStateAction<List[]>>
  movIndex: number,
}

type ListType = {
  list: List,
  lists: List[],
  setLists: Dispatch<SetStateAction<List[]>>,
  handleMove: (
    props: handleMoveType
  ) => void,
  handleAdd: (
    props: handleAddType
  ) => void,
}

export function List ({
  list,
  lists,
  setLists,
  handleMove,
  handleAdd,
}:ListType) {
  return (
    <div className="border black-black">
      <h3 className={`p-2 ${list.color}`}>
        {list.label}
        <button
          className="border border-black text-sm ml-3 p-1 rounded"
          onClick={e => handleAdd({
            list,
            lists,
            setLists
          })}
        >+ add button</button>
      </h3>
      <ul>
        {list.items.map((item, index) => (
          <li key={index} className="p-2">
            {lists.indexOf(list) > 0 && (
              <span>
                <button
                  className="border rounded-full text-sm"
                  onClick={e => handleMove({
                    movIndex: -1,
                    item,
                    list,
                    lists,
                    setLists,
                  })}
                >&lt;</button>
                {' '}
              </span>
            )}
            {item}
            {lists.indexOf(list) != lists.length - 1 && (
              <span>
                {' '}
                <button
                  className="border rounded-full text-sm"
                  onClick={e => handleMove({
                    movIndex: +1,
                    item,
                    list,
                    lists,
                    setLists,
                  })}
                >&gt;</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Index () {
  const [lists, setLists] = useState([
    {
      label:'List 1',
      color: 'bg-green-200',
      items: [
        'apple',
        'banana',
        'lemon'
      ]
    }, {
      label: 'List 2',
      color: 'bg-blue-200',
      items: [
        'farm',
        'city',
        'woods'
      ]
    }, {
      label: 'List 3',
      color: 'bg-purple-200',
      items: [
        'renato',
        'john',
        'sam'
      ]
    }
  ])

  const handleAdd = function ({
    list,
    lists,
    setLists
  }:handleAddType) {
    const newItem = window.prompt('Please type the name of the new item...')

    if (newItem) {
      const newTargetList = {
        ...list,
        items: [
          ...list.items,
          newItem
        ],
      }

      const newLists = lists.map(tempList => {
        if (tempList == list) return newTargetList
        return tempList
      })

      setLists(newLists)
    }
  }

  const handleMove = function ({
    item,
    list,
    lists,
    setLists,
    movIndex
  }:handleMoveType) {
    const itemIndex = list.items.indexOf(item)
    const listIndex = lists.indexOf(list)
    const targetList = lists[listIndex + movIndex]

    const newSourceList = {
      ...list,
      items: [...list.items.slice(0, itemIndex), ...list.items.slice(itemIndex + 1)]
    }
    const newTargetList = {
      ...targetList,
      items: [...targetList.items.slice(0, itemIndex), item, ...targetList.items.slice(itemIndex)]
    }
    const newLists = lists.map(tempList => {
      if (tempList == list) return newSourceList
      if (tempList == targetList) return newTargetList
      return tempList
    })

    setLists(newLists)
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {lists.map((list, index) => (
        <List
          key={index}
          list={list}
          lists={lists}
          setLists={setLists}
          handleMove={handleMove}
          handleAdd={handleAdd}
        ></List>
      ))}
    </div>
  )
}
