import { useRef } from 'react'
import { useRecoilState,useRecoilValue } from 'recoil'
import './App.css'

// State
import { selectedItems, cardCount, isSelectedItemsSame }  from './atoms'
import fruits  from './fruits'

function App() {
	const [selected, selectedSet] = useRecoilState(selectedItems)

	return (
		<div className="App">

			<Header />

			<Grid col={2} gap={15}>
			<Grid col={2} gap={5}>
				{fruits.map(product => (
					<div key={product.name}>
						<ProductCard 
							{...product}
							selected={selected.includes(product.name)}
							onClick={()=>{
								if (selected.includes(product.name)) {
									selectedSet(v=>v.filter(n=>n!==product.name))
								} else {
									selectedSet(v=>[...v,product.name])
								}
							}}
						/>
					</div>
				))}
			</Grid>
			<Grid col={2} gap={5}>
			<h2>Bill</h2>
			</Grid>
			</Grid>

			<PersistButtonFloating id='selectedItems' data={selected}>
			Persist Selected
			</PersistButtonFloating>
		</div>
	)
}

function ProductCard({name,color,selected,onClick}) {
	const style = { 
		gridGap: 10,
		background: color,
		borderRadius: 8,
		boxShadow: "1px 2px 4px grey",
		textShadow: "0px 0px 4px black",
		minWidth: 200
	}
	return (
		<div style={{color, ...style}}>
			<div style={{padding: 10}}>
				<h3>{name}</h3>
				<button className={selected?"selected":""} onClick={onClick}>{!selected ? "Select" : "Selected"}</button>
			</div>
		</div>
	)
}

function Grid({col,gap,children}) {
	return (
	  <div style={{display:"grid",gridTemplateColumns:`repeat(${col}, 1fr)`,gap}}>
			{children}
		</div>
	)
}

function Header({children=null}) {
	const count = useRecoilValue(cardCount)
	return (
		<header>
			{children}
			{count}	item(s)	
		</header>
	)
}

function PersistButtonFloating({children,id,data}) {
	const btnRef = useRef(null)
	// BUG: doesn''t update the disabled on saving the data to local
	// only updates if the state changes
	const disabled = useRecoilValue(isSelectedItemsSame)
	function saveOnLocalStorage() {
		localStorage.setItem(id,JSON.stringify(data))
	}
	return (
		<button 
			ref={btnRef}
			className="persist right bottom" 
			onClick={saveOnLocalStorage}
			disabled={disabled}>
		 {children}
		</button>
	)
}

export default App
