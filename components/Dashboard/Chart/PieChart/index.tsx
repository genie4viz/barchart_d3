import React, { createRef } from 'react';
import * as d3 from 'd3';
import { IChartData } from '@app/components/Dashboard/Chart';
import useDimensions from "react-use-dimensions";

interface IProps {
    data: IChartData;
    width: number;
    height: number;
    showValue: boolean;
}

interface IState {
    data: IChartData;
    width: number;
    height: number;
    showValue: boolean;
}

class PieChart extends React.Component<IProps, IState> {
    private ref: React.RefObject<SVGSVGElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            data: this.props.data,
            width: this.props.width,
            height: this.props.height,
            showValue: this.props.showValue
        };        
        this.ref = createRef();
    }    
    static getDerivedStateFromProps(props: IProps){     
        return {
            data: props.data,
            width: props.width,
            height: props.height,
            showValue: props.showValue
        }
    }    
    componentDidMount() {
        this.drawChart();
    }
    componentDidUpdate() {
        this.drawChart();
    }
    drawChart() {
        const { data, width, height, showValue} = this.state;            
        let margins = { top: 20, left: 20, bottom: 20, right: 20 };

        if (data == null) return;
        let radius = Math.min(width, height) / 2;

        let arc: any = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let labelArc = d3.arc()
            .outerRadius(radius - radius / 2)
            .innerRadius(radius - radius / 2);

        let pie = d3.pie()
            .sort(null)
            .value((d: any) => d.value);

        d3.select(this.ref.current).selectAll("*").remove();

        let svg = d3.select(this.ref.current).append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");        
        
        let g = svg.selectAll(".arc")
            .data(pie(data.values))
            .enter().append("g")
            .attr("class", "arc");

        const tooltip = svg.append('g');

        g.append("path")
            .attr("d", arc)
            .attr("stroke", 'white')
            .attr("stroke-width", 2)
            .style("fill", (d: any) => d.data.color)
            .attr('cursor', 'pointer')
            .on("mouseover", (d: any, i) => {
                tooltip.attr('transform', "translate(" + arc.centroid(d) + ")").call(callout, d);
                tooltip.raise();
            })
            .on("mouseout", (d, i) => {                
                tooltip.call(callout, null);
            })
        
        g.append("text")
            .attr("transform", (d: any) => "translate(" + labelArc.centroid(d) + ")")            
            .attr('fill', "white")
            .attr('font-size', '12pt')
            .attr('text-anchor', 'middle')
            .text((d: any) => (d.data.label));

        if(showValue){
            g.append("text")
                .attr("transform", (d: any) => "translate(" + labelArc.centroid(d)[0] + "," + (labelArc.centroid(d)[1]  + 20) + ")")            
                .attr('fill', "white")
                .attr('font-size', '12pt')
                .attr('text-anchor', 'middle')
                .text((d: any) => (d.data.value));
        }

        d3.select(this.ref.current)
            .append("text")            
            .attr("x", margins.left)
            .attr("y", margins.top)            
            .attr('font-size', '16pt')
            .attr('fill', 'black')
            .style("text-anchor", "start")
            .text(data.name)

        const callout = (g: any, d: any) => {
            if (!d){
                g.selectAll("*").remove();
                return g.style('display', 'none');
            }
            
            g.style('display', null).style('pointer-events', 'none')

            const path = g.selectAll("path")
                .data([null])
                .join("path")
                .attr("fill", d.data.color)
                .attr("stroke", "white");

            let strText = d.data.label + '\n' + d.data.value;
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

            const {width: w, height: h} = text.node().getBBox();                 
            path
                .attr("transform", 'translate(-10,' + (h/2 - 10) + ')')                
                .attr("d", 'M0,0l5,-5v' + (-(h - 10)/2) + 'h' + (w + 10) + 'v' + h + 'h' + (-(w + 10)) + 'v' + (-(h - 10)/2) +'l-5,-5z')
            
        }  
    }
    render() {
        const {width, height } = this.state;                
        return (
            <svg className="pieChart" ref={this.ref}
                width={width} height={height}>
            </svg>
        );
    }
}

export default PieChart;
