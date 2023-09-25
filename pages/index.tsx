import React, { useState, Dispatch, SetStateAction } from "react"

type handleAddType = {
  targetList: string[],
  setTargetList: Dispatch<SetStateAction<string[]>>,
}

type handleMoveType = {
  item: string,
  sourceList: string[],
  targetList: string[],
  setSourceList: Dispatch<SetStateAction<string[]>>,
  setTargetList: Dispatch<SetStateAction<string[]>>
}

type ListType = {
  sourceList: string[],
  setSourceList: Dispatch<SetStateAction<string[]>>,
  label: string
  prevList?: string[],
  setPrevList?: Dispatch<SetStateAction<string[]>>,
  nextList?: string[],
  setNextList?: Dispatch<SetStateAction<string[]>>,
  handleMove: (
    props: handleMoveType
  ) => void,
  handleAdd: (
    props: handleAddType
  ) => void,
  color: string,
}

export function List ({
  sourceList,
  setSourceList,
  label,
  prevList,
  setPrevList,
  nextList,
  setNextList,
  handleMove,
  handleAdd,
  color
}:ListType) {
  return (
    <div className="border black-black">
      <h3 className={`p-2 ${color}`}>
        {label}
        <button
          className="border border-black text-sm ml-3 p-1 rounded"
          onClick={e => handleAdd({
            targetList: sourceList,
            setTargetList: setSourceList
          })}
        >+ add button</button>
      </h3>
      <ul>
        {sourceList.map(item => (
          <li key={item} className="p-2">
            {prevList && setPrevList && (
              <span>
                <button
                  className="border rounded-full text-sm"
                  onClick={e => handleMove({
                    item: item,
                    sourceList: sourceList,
                    setSourceList: setSourceList,
                    targetList: prevList,
                    setTargetList: setPrevList,
                  })}
                >&lt;</button>
                {' '}
              </span>
            )}
            {item}
            {nextList && setNextList && (
              <span>
                {' '}
                <button
                  className="border rounded-full text-sm"
                  onClick={e => handleMove({
                    item: item,
                    sourceList: sourceList,
                    setSourceList: setSourceList,
                    targetList: nextList,
                    setTargetList: setNextList,
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
  const [list1, setList1] = useState([
    'apple',
    'banana',
    'lemon'
  ])

  const [list2, setList2] = useState([
    'farm',
    'city',
    'woods'
  ])

  const [list3, setList3] = useState([
    'renato',
    'john',
    'sam'
  ])

  const handleAdd = function ({
    targetList,
    setTargetList
  }:handleAddType) {
    const newItem = window.prompt('Please type the name of the new item...')

    if (newItem) {
      setTargetList([
        ...targetList,
        newItem,
      ])
    }
  }

  const handleMove = function ({
    item,
    sourceList,
    setSourceList,
    targetList,
    setTargetList
  }:handleMoveType) {
    const itemIndex = sourceList.indexOf(item)

    const newSourceList = [...sourceList.slice(0, itemIndex), ...sourceList.slice(itemIndex + 1)]

    setSourceList(newSourceList)

    const newTargetList = [...targetList.slice(0, itemIndex), item, ...targetList.slice(itemIndex)]

    setTargetList(newTargetList)
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <List
        sourceList={list1}
        label={"List1"}
        setSourceList={setList1}
        nextList={list2}
        setNextList={setList2}
        handleMove={handleMove}
        handleAdd={handleAdd}
        color={'bg-green-200'}
      ></List>

      <List
        sourceList={list2}
        label={"List2"}
        setSourceList={setList2}
        prevList={list1}
        setPrevList={setList1}
        nextList={list3}
        setNextList={setList3}
        handleMove={handleMove}
        handleAdd={handleAdd}
        color={'bg-blue-200'}
      ></List>

      <List
        sourceList={list3}
        label={"List3"}
        setSourceList={setList3}
        prevList={list2}
        setPrevList={setList2}
        handleMove={handleMove}
        handleAdd={handleAdd}
        color={'bg-purple-200'}

      ></List>
    </div>
  )
}
