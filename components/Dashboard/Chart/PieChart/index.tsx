import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { IChartData } from '..';
import useDimensions from '../UseDimensions';

interface IProps {
    data: IChartData;    
    showValue: boolean;
    idx?: number;
    showLimit: number;
}

const PieChart: React.SFC<IProps> = (props) => {
    const {data, showValue, idx, showLimit} = props,
          idx_str = idx != null ? idx : '';
    const svgRef = useRef(null);    
    const [containerRef, dimens] = useDimensions();    
    const width = Math.max(dimens.width, 280), height = Math.max(dimens.height, 280);
    
    useEffect(() => drawChart(), [dimens, data]);

    const drawChart = () => {        
        
        let margins = { top: 20, left: 20, bottom: 20, right: 20 };
        
        if (data == null) return;        
        
        let radius = Math.min(width, height) / 2;
        d3.select(svgRef.current).selectAll("*").remove();
        let svg = d3.select(svgRef.current).append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        const tooltip = svg.append('g');
        
        let arc0: any = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius-1)

        let arc: any = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0)

        // let labelArc0 = d3.arc()
        //     .outerRadius(radius - radius / 2)
        //     .innerRadius(radius - radius / 2);
        let labelArc = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius/2);

        let pie = d3.pie()
            .sort(null)
            .value((d: any) => d.value);       

        let g: any = svg.selectAll(".arc")
            .data(pie(data.values))
            .enter()

        g.append("path")            
            .attr("d", arc0)
            .attr("stroke", 'white')
            .attr("stroke-width", 1)
            .style("fill", (d: any) => d.data.color)
            .attr('cursor', 'pointer')
            .on("mouseover", (d: any) => {
                tooltip.attr('transform', "translate(" + labelArc.centroid(d)[0] + ',' + (labelArc.centroid(d)[1]) + ")").call(callout, d);
                tooltip.raise();
            })
            .on("mouseout", () => tooltip.call(callout, null))

        g.selectAll('path')
            .transition().duration(500)
            .attr('d', arc)
            
        if(data.values.length < showLimit){
            g.append("text")
                .attr("transform", (d: any) => "translate(" + labelArc.centroid(d) + ")")            
                .attr('fill', "white")
                .attr('font-size', '12pt')
                .attr('text-anchor', 'middle')
                .text((d: any) => (d.data.label));
            if(showValue){
                g.append("text")
                    .attr("transform", (d: any) => "translate(" + labelArc.centroid(d)[0] + "," + (labelArc.centroid(d)[1] + 15) + ")")            
                    .attr('fill', "white")
                    .attr('font-size', '12pt')
                    .attr('text-anchor', 'middle')
                    .text((d: any) => (d.data.value));
            }
        }
        
        d3.select(svgRef.current)
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
                        .attr("x", 0)
                        .attr("y", (d: any, i: any) => `${i * 1.1}em`)                            
                        .text((d: any) => d));

            const {width: tw, height: th} = text.node().getBBox();            
            
            text.attr("transform", 'translate(0, 5)')
            path
                .attr("transform", 'translate(-10,' + (th/2 - 10) + ')')
                .attr("d", 'M0,0l5,-5v' + (-(th - 10)/2) + 'h' + (tw + 10) + 'v' + th + 'h' + (-(tw + 10)) + 'v' + (-(th - 10)/2) +'l-5,-5z')
    
        }
    }
    return (
        <div ref={containerRef}>
            <svg className={"pieChart" + idx_str} ref={svgRef} width={width} height={height} />
        </div>
    );
}

export default PieChart;
