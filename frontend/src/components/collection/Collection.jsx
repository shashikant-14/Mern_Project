import React from 'react'

const Collection = () => {
  const [collection, setCollection] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5555/api/collections').then((response)=>response.json()).then((response)=>setCollection(response));
  },[]);

  const addCollection = () =>{
    fetch('http://localhost:5555/api/addCollection', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({collectionName:'qwer'})}).then(res=>res.json()).then((res)=>console.log(res));
  }
  return (
    <>
    <ul>
    {collection.map((item)=><li>{item}</li>)}
    </ul>
    <button onClick={addCollection}>Add New</button>
    </>
  )
}

export default Collection
