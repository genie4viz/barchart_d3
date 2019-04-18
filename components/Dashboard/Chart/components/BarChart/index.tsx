import React from 'react';
import * as d3 from 'd3';
import ResponsiveWrapper from '@app/components/Dashboard/Chart/components/ResponsiveWrapper';

class BarChart extends React.Component{    
    ref: SVGSVGElement;
    constructor(props: any){
        super(props);        
        this.state = {
            data: null,
            width: 0,
            height: 0
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState.data != nextProps.data || prevState.width != nextProps.parentWidth) {            
            return {
                data: nextProps.data,
                width: nextProps.parentWidth,
                height: nextProps.parentHeight
            };
        }
        return null;
    }
    componentDidUpdate() {
        const {data, width, height} = this.state;
        
        if(data == null) return;

        d3.select(this.ref).selectAll("*").remove();

        let margins = {top:20, left:20, bottom:20, right:20},
            min = 0,// d3.min
            max = d3.max(data, (d) => d.value);


        let x = d3
                .scaleBand()
                .range([0, width - margins.right - margins.left])                
                .domain(data.map(d => d.name))
                .padding(0.3),
            y = d3
                .scaleLinear()
                .domain([min, max])          
                .rangeRound([height - margins.top, margins.bottom]),
            xAxis = d3
                .axisBottom(x)
                .tickSize(0),                
            yAxis = d3
                .axisLeft(y)
                .tickSize(-width + margins.right + margins.left)
                .ticks(5);

        d3.select(this.ref)
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', "translate(40," + (height - margins.top) + ")")
            .call(xAxis);

        let yArea = d3.select(this.ref)
            .append('g');
        yArea
            .attr('class', 'y axis')            
            .attr('transform', "translate(40, 0)")
            .call(yAxis)
            .select('.domain')
            .remove();
        yArea.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", height/2)            
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Sum Profit")
            

        d3.select(this.ref)
            .selectAll('.tick line')            
            .attr('stroke', '#ccc');
            
        d3.select(this.ref)
            .selectAll('bar')
            .data(data)
            .enter().append("rect")
            .style("fill", d => d.color)
            .attr("x", d => (x(d.name) + x.bandwidth() - 5))
            .attr("width", x.bandwidth)
            .attr("y", d => y(d.value))
            .attr("height", d => (height - margins.top - y(d.value)));

        
        
    }
    render() {
        const {width, height} = this.state;
        
        return (            
            <svg className="BarChart" ref={(ref: SVGSVGElement) => this.ref = ref}
                width={width} height={height}>
            </svg>            
        );
    }
}

export default ResponsiveWrapper(BarChart);
