
import './App.css';
import { useEffect, useState , useRef } from 'react';
import * as d3 from "d3"
import Bars from './barra'

function App() {

    //  1] Setup Initial data and settings ------------//

    const initialData = [
      {
        name: "Carro",
        value: 10,
      },
      {
        name: "Ifood",
        value: 3,
      },
      {
        name: "Telefone",
        value: 10,
      },
      {
        name: "Energia",
        value: 3,
      },
      {
        name: "Cinema",
        value: 10,
      },
    ];

    const width = 500;
    const height = 150;
    const padding = 20;
    const maxValue = 20; 
  
    const [chartdata,setChartdata] = useState(initialData)
 
    const svgRef= useRef()

  
    const newData = () => chartdata.map(
      function (d) {
        d.value = Math.floor(
          Math.random() * (maxValue + 1)
        )
        return d
      } 
    )

      useEffect(
        ()=>{ 
          
       
          
            
            const xScale = d3.scalePoint()
                            .domain(chartdata.map( (d) => d.name ))
                            .range([(0+padding),(width - padding)])
            console.log('Start - End',xScale('Car'),xScale('Cinema'))                

          
            const yScale = d3.scaleLinear()
                             .domain([0, d3.max( chartdata, function (d) {return d.value})])
                             .range([(height - padding), (0 + padding)])
                             
            console.log('Start - End',yScale(0),yScale(10)) 
         
 

            const line = d3.line()
                           .x((d)=> xScale(d.name))
                           .y( (d)=>yScale(d.value) )
                           .curve(d3.curveMonotoneX)
            
            console.log('chart draw commands', line(chartdata) )               

        
           d3.select(svgRef.current)
              .select('path')
              .attr('d', (value) => line(chartdata))
              .attr('fill','none')
              .attr('stroke', 'black')

        
           const xAxis = d3.axisBottom(xScale)
           const yAxis = d3.axisLeft(yScale)

        
           d3.select('#xaxis').remove()
           d3.select(svgRef.current)
              .append('g')
              .attr('transform',`translate(0,${height - padding})`)
              .attr('id','xaxis')
              .call(xAxis)
            
          d3.select('#yaxis').remove()
          d3.select(svgRef.current)
              .append('g')
              .attr('transform',`translate(${padding},0)`)
              .attr('id','yaxis')
              .call(yAxis)   

        },[chartdata]
      )



  return (
    <div className="App">
      <header className="App-header">

        <svg id="chart" ref={svgRef} viewBox="0 0 500 150">

            <path  fill="" stroke="black" strokeWidth="3" />
            
        </svg>
       
        <p>
          <button type='butto' onClick={()=> setChartdata(newData())}>
                Click to refresh expenses data
          </button>

        </p>

      </header>
      <body>
        <Bars/>
      </body>
    </div>
    
    
   
    
    
  ); 
}

export default App;