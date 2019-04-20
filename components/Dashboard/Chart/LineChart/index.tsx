import React, { createRef } from 'react';
import * as d3 from 'd3';
import { IChartData } from '@app/components/Dashboard/Chart';

interface IProps {
    data: IChartData;
    width: number;
    height: number;
}

interface IState {
    data: IChartData;
    width: number;
    height: number;
}

class LineChart extends React.Component<IProps, IState> {
    private ref: React.RefObject<SVGSVGElement>;

    constructor(props: any) {
        super(props);        
        this.state = {
            data: this.props.data,
            width: this.props.width,
            height: this.props.height
        };
        this.ref = createRef();
    }    
    static getDerivedStateFromProps(props: IProps){
        return {
            data: props.data,
            width: props.width,
            height: props.height
        }
    }
    componentDidMount(){        
        this.drawChart();
    }
    componentDidUpdate() {
        this.drawChart();
    }
    drawChart(){
        const { data, width, height } = this.state;
        
        if (data == null) return;

        d3.select(this.ref.current).selectAll("*").remove();

        let margins = { top: 20, left: 20, bottom: 30, right: 20 },
            min: number = 0,// d3.min
            max: any = d3.max(data.values, (d) => d.value);

        let x: any = d3
                .scaleBand()
                .range([0, width - margins.right - margins.left])
                .domain(data.values.map(d => d.label))
                .padding(0.3),
            y = d3
                .scaleLinear()
                .domain([min, max])
                .rangeRound([height - margins.bottom, margins.top]),
            xAxis = d3
                .axisBottom(x)
                .tickSize(-height + margins.top),
            yAxis = d3
                .axisLeft(y)
                .tickSize(-width + margins.right + margins.left)
                .ticks(5);

        let xArea = d3.select(this.ref.current)
            .append('g');
        
        xArea
            .attr('class', 'x axis')
            .attr('transform', "translate(50," + (height - margins.bottom) + ")")
            .call(xAxis)
            .select('.domain')
            .remove();

        let yArea = d3.select(this.ref.current)
            .append('g');
        yArea
            .attr('class', 'y axis')
            .attr('transform', "translate(50, 0)")
            .call(yAxis)
            .select('.domain')
            .remove();

        d3.select(this.ref.current)
            .selectAll('.tick line')
            .attr('stroke', '#ccc');

        let valueline: any = d3.line()
            .x((d: any) => x(d.label) + x.bandwidth()/2)
            .y((d: any) => y(d.value))
            .curve(d3.curveMonotoneX)

        d3.select(this.ref.current)
            .append("g")
            .attr('transform', 'translate(50, 0)')
            .append("path")
            .data([data.values])
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", 'steelblue')
            .attr("stroke-width", 2)
            .attr("d", valueline);

        const tooltip = d3.select(this.ref.current).append('g');
        
        d3.select(this.ref.current)
            .append("g")
            .attr('transform', 'translate(50, 0)')
            .selectAll(".dot")
            .data(data.values)
            .enter().append("circle")
            .attr("class", (d, i) => "dot" + i)
            .attr("fill", 'steelblue')
            .attr("cursor", "pointer")
            .attr("cx", d => x(d.label) + x.bandwidth()/2)
            .attr("cy", d => y(d.value))
            .attr("r", 5)
            .on("mouseover", (d, i) => {
                d3.select('.dot' + i)
                    .attr('fill', d.color)
                    .attr('r', 7)
                tooltip.attr('transform', 'translate(' + (50 + x(d.label) + x.bandwidth()/2) + ',' + y(d.value) +')').call(callout, d);
                tooltip.raise();
            })
            .on("mouseout", (d, i) => {
                d3.select('.dot' + i)
                    .attr('fill', 'steelblue')
                    .attr('r', 5)
                tooltip.call(callout, null);
            })

        d3.select(this.ref.current)
            .append("text")            
            .attr("x", margins.left)
            .attr("y", margins.top)            
            .attr('font-size', '16pt')
            .attr('fill', 'black')
            .style("text-anchor", "start")
            .text(data.name)
        
        xArea.append("text")            
            .attr("x", width/2)
            .attr("y", margins.bottom)            
            .attr('font-size', '12pt')
            .attr('fill', 'black')
            .style("text-anchor", "end")
            .text(data.XAxis)

        yArea.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height/2)
            .attr("y", -45)
            .attr("dy", ".71em")
            .attr('font-size', '12pt')
            .attr('fill', 'black')
            .style("text-anchor", "middle")
            .text(data.YAxis)
        
        const callout = (g: any, d: any) => {
            if (!d){
                g.selectAll("*").remove();
                return g.style('display', 'none');
            }
            
            g.style('display', null).style('pointer-events', 'none')

            const path = g.selectAll("path")
                .data([null])
                .join("path")
                .attr("fill", 'steelblue')
                .attr("stroke", "white");

            let strText = '(' + d.label + ':' + d.value + ')';
            
            const text = g.selectAll("text")
                .data([null])
                .join("text")
                .call((text: any) => text
                    .selectAll("tspan")
                    .data((strText + "").split(/\n/))
                    .join("tspan")
                        .attr('fill', 'white')
                        .attr('text-anchor', 'start')
                        .attr('alignment-baseline', 'central')
                        .attr("x", 0)
                        .attr("y", (d: any, i: any) => `${i * 1.1}em`)                            
                        .text((d: any) => d));

            const {width: tw, height: th} = text.node().getBBox();            
            
            if((x(d.label) + x.bandwidth() + tw + 20) > width - margins.right){
                text.attr("transform", 'translate(' + (- tw - 10) + ',0)');
                path
                    .attr("transform", 'translate(0,0)')
                    .attr("d", 'M0,0l-5,-5v' + (-(th - 10)/2) + 'h' + (-tw - 10) + 'v' + th + 'h' + (tw + 10) + 'v' + (-(th- 10)/2) +'l5,-5z')
            }else{
                text.attr("transform", 'translate(10,0)');
                path.attr("d", 'M0,0l5,-5v' + (-(th - 10)/2) + 'h' + (tw + 10) + 'v' + th + 'h' + (-(tw + 10)) + 'v' + (-(th- 10)/2) +'l-5,-5z')
            }
        }       
    }
    render() {
        const {width, height } = this.state;
        return (
            <svg className="LineChart" ref={this.ref}
                width={width} height={height}>
            </svg>
        );
    }
}

export default LineChart;
