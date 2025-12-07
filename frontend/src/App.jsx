import React, { useEffect, useState } from 'react'
import "./App.css"
import "prismjs/themes/prism-tomorrow.css"
import Editer from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"
import axios from "axios"

const App = () => {

  const [code, setCode] = useState(` function sum(){
    return 1+1
    }`)

    const [data, setData] = useState("")

  useEffect(() =>{
    prism.highlightAll()
  },[])

  async function  reviewCode() {
    
    try{
        const response = await axios.post("http://localhost:3000/ai/get-review",
        {
          code: code
        })

      // console.log(response.data)

      setData(response.data)
    }catch(error){
      console.error(error);
    }
  }
  return (
    <main>
         <div className='left'>
          <div className='code'>
           <Editer
           value={code}
           onValueChange={code => setCode(code)}
           highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
           padding={10}
           style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 20,
            borderRadius: "5px",
            height:"100%",
            width: "100",
            color:"white"
           }}
           />
          </div>
          <div
          onClick={reviewCode}
           className="review">Review</div>
         </div>
         <div
           style={{
            color:"white"
           }}
         className="right">
          <Markdown 
          rehypePlugins={[ rehypeHighlight]}>{data}</Markdown></div>
    </main>
  )
}

export default App
