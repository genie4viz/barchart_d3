import React from 'react';
import * as d3 from 'd3';
import ResponsiveWrapper from '@app/components/Dashboard/Chart/components/ResponsiveWrapper';

class PieChart extends React.Component{    
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
        if(this.state.data == null) return;
        
        let radius = Math.min(width, height) / 2;
        
        let arc: any = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let labelArc = d3.arc()
            .outerRadius(radius - radius/3)
            .innerRadius(radius - radius/3);

        let pie = d3.pie()
            .sort(null)
            .value((d: any) => d.value);

        d3.select(this.ref).selectAll("*").remove();

        let svg = d3.select(this.ref).append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        let g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .attr("stroke", 'white')
            .attr("stroke-width", 2)
            .style("fill", d => d.data.color);

        g.append("text")
            .attr("transform", (d: any) => "translate(" + labelArc.centroid(d) + ")")
            .attr("dy", ".35em")
            .attr('fill', "white")
            .attr('font-size', 12)
            .attr('text-align', 'middle')
            .text((d: any) => (d.data.name))

    }
    render() {
        const {width, height} = this.state;
        
        return (            
            <svg className="pieChart" ref={(ref: SVGSVGElement) => this.ref = ref}
                width={width} height={height}>
            </svg>            
        );
    }
}

export default ResponsiveWrapper(PieChart);
