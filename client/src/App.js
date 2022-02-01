import React, {useState, useEffect} from 'react'

function App() {
  const [data, setData] = useState([{}])


  useEffect(() => {
    fetch('/recipes').then(
      response => response.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <div>
      {(typeof data.recipes === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.recipes.map((member, i ) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  )
}


export default App